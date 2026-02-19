<template>
  <div>
    <!-- Date separator -->
    <div v-if="showDateSeparator" class="chat-date-separator">
      {{ formatDate(message.CreationDate) }}
    </div>

    <!-- System / Broadcast messages -->
    <div v-if="message.Type === 2 || message.Type === 3" class="d-flex justify-content-center my-1">
      <div :class="message.Type === 3 ? 'chat-bubble broadcast' : 'chat-bubble system'">
        <span v-if="message.Type === 3" class="conv-type-icon">📢</span>
        {{ message.Content }}
      </div>
    </div>

    <!-- Regular text messages -->
    <div v-else class="chat-message-wrapper" :class="{ own: isOwn }">
      <!-- Avatar (shown for non-own messages) -->
      <div
        v-if="!isOwn"
        class="chat-avatar"
        :style="{ background: message.SenderColor || '#666' }"
        :title="`${message.SenderFirstName} ${message.SenderLastName}`"
      >
        {{ initials }}
      </div>

      <div style="display: flex; flex-direction: column; max-width: 65%;">
        <!-- Sender name (for group chats) -->
        <span v-if="!isOwn && showSenderName" class="chat-sender-name">
          {{ message.SenderFirstName }} {{ message.SenderLastName }}
        </span>

        <div :class="isOwn ? 'chat-bubble outgoing' : 'chat-bubble incoming'">
          {{ message.Content }}

          <!-- Attachments -->
          <div v-for="att in message.Attachments" :key="att.Id" class="chat-attachment">
            <i class="ki-outline ki-document" style="font-size: 0.9rem;"></i>
            <a :href="att.FileUrl" target="_blank" rel="noopener">{{ att.FileName }}</a>
            <span style="opacity: 0.7;">({{ formatFileSize(att.FileSize) }})</span>
          </div>

          <div class="chat-bubble-meta">
            {{ formatTime(message.CreationDate) }}
            <span v-if="isOwn" class="chat-read-indicator ms-1">
              {{ isReadByAll ? '✓✓' : '✓' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, type PropType } from "vue";
import type { MessageDto } from "@/core/data/chat";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "MessageBubble",
  props: {
    message: {
      type: Object as PropType<MessageDto>,
      required: true,
    },
    prevMessage: {
      type: Object as PropType<MessageDto | null>,
      default: null,
    },
    showSenderName: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const authStore = useAuthStore();

    const isOwn = computed(() => props.message.SenderId === authStore.user.Id);

    const initials = computed(() => {
      const f = props.message.SenderFirstName?.[0] ?? "";
      const l = props.message.SenderLastName?.[0] ?? "";
      return (f + l).toUpperCase() || "?";
    });

    const showDateSeparator = computed(() => {
      if (!props.prevMessage) return true;
      const prev = new Date(props.prevMessage.CreationDate).toDateString();
      const curr = new Date(props.message.CreationDate).toDateString();
      return prev !== curr;
    });

    const isReadByAll = computed(() =>
      props.message.ReadByUserIds.length >= 2
    );

    function formatTime(dateStr: string): string {
      return new Date(dateStr).toLocaleTimeString("it-IT", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    function formatDate(dateStr: string): string {
      const d = new Date(dateStr);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      if (d.toDateString() === today.toDateString()) return "Oggi";
      if (d.toDateString() === yesterday.toDateString()) return "Ieri";
      return d.toLocaleDateString("it-IT", { day: "2-digit", month: "long", year: "numeric" });
    }

    function formatFileSize(bytes: number): string {
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }

    return { isOwn, initials, showDateSeparator, isReadByAll, formatTime, formatDate, formatFileSize };
  },
});
</script>
