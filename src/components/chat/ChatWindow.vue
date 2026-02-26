<template>
  <div class="chat-window">
    <!-- No conversation selected -->
    <div v-if="!chatStore.activeConversation" class="chat-empty-state">
      <i class="ki-outline ki-message-text-2"></i>
      <p style="margin: 0; font-weight: 500;">Seleziona una conversazione</p>
      <p style="margin: 0; font-size: 0.82rem; opacity: 0.7;">
        oppure iniziane una nuova con i tuoi colleghi
      </p>
    </div>

    <!-- Active conversation -->
    <template v-else>
      <!-- Header -->
      <div class="chat-window-header">
        <div
          class="chat-avatar"
          :style="{ background: headerColor }"
        >
          <span v-if="chatStore.activeConversation.Type === 2">📢</span>
          <span v-else-if="chatStore.activeConversation.Type === 3">🔔</span>
          <span v-else>{{ headerInitials }}</span>
        </div>

        <div class="chat-window-title">
          <h5>{{ headerName }}</h5>
          <div class="d-flex align-items-center gap-1 flex-wrap" style="margin-top: 2px;">
            <span
              v-for="p in activeParticipants"
              :key="p.UserId"
              class="badge chat-role-badge"
              :class="roleBadgeClass(p.Role)"
              style="color: #fff;"
            >
              {{ p.Role }}
            </span>
          </div>
        </div>

        <!-- Monitor indicator -->
        <span
          v-if="isMonitor"
          class="badge bg-warning text-dark"
          style="font-size: 0.7rem;"
          title="Stai visualizzando questa conversazione in modalità monitoraggio"
        >
          👁 Monitor
        </span>
      </div>

      <!-- Messages -->
      <div class="chat-messages-container" ref="messagesEl">
        <div v-if="chatStore.isLoading" class="d-flex justify-content-center p-4">
          <div class="spinner-border spinner-border-sm text-primary"></div>
        </div>

        <template v-else>
          <MessageBubble
            v-for="(msg, idx) in chatStore.activeMessages"
            :key="msg.Id"
            :message="msg"
            :prev-message="idx > 0 ? chatStore.activeMessages[idx - 1] : null"
            :show-sender-name="chatStore.activeConversation.Type !== 1 || chatStore.activeConversation.Participants.filter(p => !p.IsMonitor).length > 2"
          />

          <div ref="bottomEl"></div>
        </template>
      </div>

      <!-- Input area -->
      <div v-if="!isMonitor" class="chat-input-area">
        <textarea
          v-model="messageText"
          placeholder="Scrivi un messaggio..."
          rows="1"
          @keydown.enter.exact.prevent="handleSend"
          @input="autoResize"
          ref="textareaEl"
        ></textarea>
        <button
          class="chat-send-btn"
          :disabled="!messageText.trim() || isSending"
          @click="handleSend"
          title="Invia (Invio)"
        >
          <i class="ki-outline ki-send" style="color: #fff; font-size: 1rem;"></i>
        </button>
      </div>
      <div v-else class="chat-input-area" style="justify-content: center; padding: 8px;">
        <span style="font-size: 0.8rem; opacity: 0.6; font-style: italic;">
          Stai visualizzando in sola lettura
        </span>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick, watch } from "vue";
import { useChatStore } from "@/stores/chat";
import { useAuthStore } from "@/stores/auth";
import MessageBubble from "@/components/chat/MessageBubble.vue";
import type { ConversationDto } from "@/core/data/chat";

export default defineComponent({
  name: "ChatWindow",
  components: { MessageBubble },
  setup() {
    const chatStore = useChatStore();
    const authStore = useAuthStore();

    const messageText = ref("");
    const isSending = ref(false);
    const messagesEl = ref<HTMLElement | null>(null);
    const bottomEl = ref<HTMLElement | null>(null);
    const textareaEl = ref<HTMLTextAreaElement | null>(null);

    const activeParticipants = computed(() =>
      chatStore.activeConversation?.Participants.filter((p) => !p.IsMonitor) ?? []
    );

    const otherParticipant = computed(() =>
      activeParticipants.value.find((p) => p.UserId !== authStore.user.Id)
    );

    const headerName = computed(() => {
      const conv = chatStore.activeConversation;
      if (!conv) return "";
      if (conv.Title) return conv.Title;
      if (conv.Type === 1) {
        return otherParticipant.value
          ? `${otherParticipant.value.FirstName} ${otherParticipant.value.LastName}`
          : "Conversazione";
      }
      return "Broadcast";
    });

    const headerColor = computed(() => {
      const conv = chatStore.activeConversation;
      if (!conv) return "#666";
      if (conv.Type !== 1) return "#0077cc";
      return otherParticipant.value?.Color ?? "#666";
    });

    const headerInitials = computed(() => {
      const other = otherParticipant.value;
      if (!other) return "G";
      return ((other.FirstName[0] ?? "") + (other.LastName[0] ?? "")).toUpperCase();
    });

    const isMonitor = computed(() => {
      const myParticipation = chatStore.activeConversation?.Participants.find(
        (p) => p.UserId === authStore.user.Id
      );
      return myParticipation?.IsMonitor ?? false;
    });

    function roleBadgeClass(role: string): string {
      const map: Record<string, string> = {
        Admin: "role-badge-admin",
        Agency: "role-badge-agency",
        Agent: "role-badge-agent",
      };
      return map[role] ?? "bg-secondary";
    }

    async function handleSend() {
      const text = messageText.value.trim();
      if (!text || isSending.value || !chatStore.activeConversationId) return;

      isSending.value = true;
      messageText.value = "";

      if (textareaEl.value) {
        textareaEl.value.style.height = "auto";
      }

      try {
        await chatStore.sendMessage(chatStore.activeConversationId, text);
      } finally {
        isSending.value = false;
      }
    }

    function autoResize(event: Event) {
      const el = event.target as HTMLTextAreaElement;
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
    }

    function scrollToBottom(smooth = true) {
      nextTick(() => {
        bottomEl.value?.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
      });
    }

    watch(
      () => chatStore.activeMessages.length,
      () => scrollToBottom()
    );

    watch(
      () => chatStore.activeConversationId,
      () => scrollToBottom(false)
    );

    return {
      chatStore,
      authStore,
      messageText,
      isSending,
      messagesEl,
      bottomEl,
      textareaEl,
      activeParticipants,
      headerName,
      headerColor,
      headerInitials,
      isMonitor,
      roleBadgeClass,
      handleSend,
      autoResize,
    };
  },
});
</script>
