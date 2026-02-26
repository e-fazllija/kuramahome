<template>
  <div class="chat-sidebar">
    <!-- Header -->
    <div class="chat-sidebar-header">
      <h4>Messaggi</h4>
      <button class="chat-new-conv-btn" title="Nuova conversazione" @click="$emit('new-conversation')">
        <i class="ki-outline ki-plus fs-6" style="color: #fff;"></i>
      </button>
    </div>

    <!-- Conversation list -->
    <div class="chat-conversation-list" ref="listEl">
      <div
        v-if="chatStore.isLoading && !chatStore.conversations.length"
        class="d-flex justify-content-center p-4"
      >
        <div class="spinner-border spinner-border-sm text-primary"></div>
      </div>

      <div
        v-else-if="!chatStore.conversations.length"
        class="chat-empty-state"
        style="min-height: 120px;"
      >
        <i class="ki-outline ki-message-text-2 fs-2x" style="color: #ccc;"></i>
        <span style="font-size: 0.85rem;">Nessuna conversazione</span>
      </div>

      <div
        v-for="conv in chatStore.sortedConversations"
        :key="conv.Id"
        class="chat-conversation-item"
        :class="{ active: chatStore.activeConversationId === conv.Id }"
        @click="$emit('select', conv.Id)"
      >
        <!-- Avatar -->
        <div class="chat-avatar" :style="{ background: getConvColor(conv) }">
          <span v-if="conv.Type === 2">📢</span>
          <span v-else-if="conv.Type === 3">🔔</span>
          <span v-else>{{ getConvInitials(conv) }}</span>
        </div>

        <!-- Info -->
        <div class="chat-conv-info">
          <div class="chat-conv-name">
            <span v-if="conv.Type === 2" class="conv-type-icon">📢 </span>
            {{ getConvName(conv) }}
          </div>
          <div v-if="conv.LastMessage" class="chat-conv-last-msg">
            <span v-if="conv.LastMessage.SenderId === authStore.user.Id">Tu: </span>
            {{ conv.LastMessage.IsDeleted ? 'Messaggio eliminato' : conv.LastMessage.Content }}
          </div>
          <div v-else class="chat-conv-last-msg" style="font-style: italic; opacity: 0.6;">
            Nessun messaggio
          </div>
        </div>

        <!-- Meta -->
        <div class="chat-conv-meta">
          <span v-if="conv.LastMessage" class="chat-conv-time">
            {{ formatTime(conv.LastMessage.CreationDate) }}
          </span>
          <span v-if="conv.UnreadCount > 0" class="chat-unread-badge">
            {{ conv.UnreadCount > 99 ? '99+' : conv.UnreadCount }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useChatStore } from "@/stores/chat";
import { useAuthStore } from "@/stores/auth";
import type { ConversationDto } from "@/core/data/chat";

export default defineComponent({
  name: "ConversationList",
  emits: ["select", "new-conversation"],
  setup() {
    const chatStore = useChatStore();
    const authStore = useAuthStore();
    const listEl = ref<HTMLElement | null>(null);

    function getOtherParticipant(conv: ConversationDto) {
      return conv.Participants.find(
        (p) => p.UserId !== authStore.user.Id && !p.IsMonitor
      );
    }

    function getConvName(conv: ConversationDto): string {
      if (conv.Title) return conv.Title;
      if (conv.Type === 1) {
        const other = getOtherParticipant(conv);
        return other ? `${other.FirstName} ${other.LastName}` : "Conversazione";
      }
      return "Broadcast";
    }

    function getConvColor(conv: ConversationDto): string {
      if (conv.Type !== 1) return "#0077cc";
      const other = getOtherParticipant(conv);
      return other?.Color ?? "#666666";
    }

    function getConvInitials(conv: ConversationDto): string {
      if (conv.Type !== 1) return "G";
      const other = getOtherParticipant(conv);
      if (!other) return "?";
      return ((other.FirstName[0] ?? "") + (other.LastName[0] ?? "")).toUpperCase();
    }

    function formatTime(dateStr: string): string {
      const d = new Date(dateStr);
      const today = new Date();
      if (d.toDateString() === today.toDateString()) {
        return d.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" });
      }
      return d.toLocaleDateString("it-IT", { day: "2-digit", month: "2-digit" });
    }

    return { chatStore, authStore, listEl, getConvName, getConvColor, getConvInitials, formatTime };
  },
});
</script>
