<template>
  <div class="monitoring-wrapper">
    <!-- Page header -->
    <div class="monitoring-header d-flex align-items-center justify-content-between mb-4">
      <div>
        <h3 class="mb-1">Monitoraggio conversazioni</h3>
        <p class="text-muted mb-0" style="font-size: 0.875rem;">
          Visualizza tutte le conversazioni della tua cerchia in sola lettura.
        </p>
      </div>
      <div class="d-flex align-items-center gap-2">
        <input
          v-model="search"
          type="text"
          class="form-control form-control-sm"
          placeholder="Cerca..."
          style="width: 200px;"
        />
        <select v-model="typeFilter" class="form-select form-select-sm" style="width: 160px;">
          <option value="">Tutti i tipi</option>
          <option value="1">Chat diretta</option>
          <option value="2">Broadcast</option>
          <option value="3">Sistema</option>
        </select>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="d-flex justify-content-center py-5">
      <div class="spinner-border text-primary"></div>
    </div>

    <!-- No results -->
    <div v-else-if="!filtered.length" class="text-center py-5 text-muted">
      <i class="ki-outline ki-message-text-2 fs-2x mb-3 d-block" style="opacity: 0.3;"></i>
      Nessuna conversazione trovata.
    </div>

    <!-- Split layout: list + detail -->
    <div v-else class="monitoring-layout">
      <!-- Left: conversations list -->
      <div class="monitoring-list">
        <div
          v-for="conv in filtered"
          :key="conv.Id"
          class="monitoring-conv-item"
          :class="{ active: selected?.Id === conv.Id }"
          @click="selectConversation(conv)"
        >
          <div class="d-flex align-items-center gap-3">
            <div class="chat-avatar" :style="{ background: getTypeColor(conv.Type), width: '36px', height: '36px', fontSize: '0.8rem' }">
              <span v-if="conv.Type === 2">📢</span>
              <span v-else-if="conv.Type === 3">🔔</span>
              <span v-else>{{ getConvInitials(conv) }}</span>
            </div>
            <div style="flex: 1; min-width: 0;">
              <div class="fw-semibold" style="font-size: 0.875rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                {{ getConvName(conv) }}
              </div>
              <div style="font-size: 0.75rem; opacity: 0.6; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                {{ getParticipantsLabel(conv) }}
              </div>
            </div>
            <div style="font-size: 0.7rem; opacity: 0.5; flex-shrink: 0;">
              {{ formatDate(conv.UpdateDate) }}
            </div>
          </div>
          <div v-if="conv.LastMessage" style="font-size: 0.78rem; opacity: 0.6; margin-top: 4px; padding-left: 44px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            {{ conv.LastMessage.SenderFirstName }}: {{ conv.LastMessage.Content }}
          </div>
        </div>
      </div>

      <!-- Right: message detail -->
      <div class="monitoring-detail">
        <div v-if="!selected" class="chat-empty-state">
          <i class="ki-outline ki-message-text-2" style="font-size: 2.5rem; opacity: 0.3;"></i>
          <span style="font-size: 0.85rem; opacity: 0.6;">Seleziona una conversazione</span>
        </div>

        <template v-else>
          <!-- Detail header -->
          <div class="monitoring-detail-header">
            <div class="d-flex align-items-center gap-2 mb-2">
              <span class="badge" :class="typeLabel(selected.Type).badge">
                {{ typeLabel(selected.Type).text }}
              </span>
              <span class="fw-semibold">{{ getConvName(selected) }}</span>
            </div>
            <div class="d-flex flex-wrap gap-2">
              <span
                v-for="p in selected.Participants.filter(x => !x.IsMonitor)"
                :key="p.UserId"
                class="badge"
                :class="roleBadgeClass(p.Role)"
                style="color: #fff; font-size: 0.72rem;"
              >
                {{ p.FirstName }} {{ p.LastName }} ({{ p.Role }})
              </span>
            </div>
          </div>

          <!-- Messages -->
          <div class="monitoring-messages" ref="messagesEl">
            <div v-if="loadingMessages" class="d-flex justify-content-center py-4">
              <div class="spinner-border spinner-border-sm text-primary"></div>
            </div>

            <MessageBubble
              v-else
              v-for="(msg, idx) in messages"
              :key="msg.Id"
              :message="msg"
              :prev-message="idx > 0 ? messages[idx - 1] : null"
              :show-sender-name="true"
            />
          </div>

          <!-- Read-only notice -->
          <div class="monitoring-read-only-notice">
            <i class="ki-outline ki-eye me-2"></i>
            Visualizzazione in sola lettura
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, nextTick } from "vue";
import { getMonitoringConversations, getMessages, type ConversationDto, type MessageDto } from "@/core/data/chat";
import { useAuthStore } from "@/stores/auth";
import MessageBubble from "@/components/chat/MessageBubble.vue";

export default defineComponent({
  name: "ChatMonitoring",
  components: { MessageBubble },
  setup() {
    const authStore = useAuthStore();
    const isLoading = ref(false);
    const loadingMessages = ref(false);
    const conversations = ref<ConversationDto[]>([]);
    const selected = ref<ConversationDto | null>(null);
    const messages = ref<MessageDto[]>([]);
    const search = ref("");
    const typeFilter = ref("");
    const messagesEl = ref<HTMLElement | null>(null);

    const filtered = computed(() => {
      let list = conversations.value;
      if (search.value.trim()) {
        const q = search.value.toLowerCase();
        list = list.filter((c) => {
          const name = getConvName(c).toLowerCase();
          const participants = getParticipantsLabel(c).toLowerCase();
          return name.includes(q) || participants.includes(q);
        });
      }
      if (typeFilter.value) {
        list = list.filter((c) => c.Type === Number(typeFilter.value));
      }
      return list;
    });

    async function load() {
      isLoading.value = true;
      try {
        conversations.value = await getMonitoringConversations();
      } finally {
        isLoading.value = false;
      }
    }

    async function selectConversation(conv: ConversationDto) {
      selected.value = conv;
      loadingMessages.value = true;
      try {
        messages.value = await getMessages(conv.Id);
        nextTick(() => {
          if (messagesEl.value) {
            messagesEl.value.scrollTop = messagesEl.value.scrollHeight;
          }
        });
      } finally {
        loadingMessages.value = false;
      }
    }

    function getConvName(conv: ConversationDto): string {
      if (conv.Title) return conv.Title;
      if (conv.Type === 1) {
        const participants = conv.Participants.filter(
          (p) => p.UserId !== authStore.user.Id && !p.IsMonitor
        );
        return participants.map((p) => `${p.FirstName} ${p.LastName}`).join(" · ") || "Conversazione";
      }
      return "Broadcast";
    }

    function getConvInitials(conv: ConversationDto): string {
      const others = conv.Participants.filter(
        (p) => p.UserId !== authStore.user.Id && !p.IsMonitor
      );
      if (!others.length) return "?";
      return ((others[0].FirstName[0] ?? "") + (others[0].LastName[0] ?? "")).toUpperCase();
    }

    function getParticipantsLabel(conv: ConversationDto): string {
      return conv.Participants
        .filter((p) => !p.IsMonitor)
        .map((p) => `${p.FirstName} ${p.LastName}`)
        .join(", ");
    }

    function getTypeColor(type: number): string {
      return type === 1 ? "#666" : "#0077cc";
    }

    function typeLabel(type: number): { text: string; badge: string } {
      const map: Record<number, { text: string; badge: string }> = {
        1: { text: "Chat", badge: "bg-secondary" },
        2: { text: "Broadcast", badge: "bg-primary" },
        3: { text: "Sistema", badge: "bg-warning text-dark" },
      };
      return map[type] ?? { text: "Chat", badge: "bg-secondary" };
    }

    function roleBadgeClass(role: string): string {
      const map: Record<string, string> = {
        Admin: "role-badge-admin",
        Agency: "role-badge-agency",
        Agent: "role-badge-agent",
      };
      return map[role] ?? "bg-secondary";
    }

    function formatDate(dateStr: string): string {
      const d = new Date(dateStr);
      const today = new Date();
      if (d.toDateString() === today.toDateString()) {
        return d.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" });
      }
      return d.toLocaleDateString("it-IT", { day: "2-digit", month: "2-digit" });
    }

    load();

    return {
      isLoading,
      loadingMessages,
      conversations,
      selected,
      messages,
      search,
      typeFilter,
      filtered,
      messagesEl,
      selectConversation,
      getConvName,
      getConvInitials,
      getParticipantsLabel,
      getTypeColor,
      typeLabel,
      roleBadgeClass,
      formatDate,
    };
  },
});
</script>

<style scoped>
.monitoring-wrapper {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.monitoring-layout {
  display: flex;
  gap: 0;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  height: calc(100vh - 220px);
  min-height: 400px;
}

.monitoring-list {
  width: 340px;
  min-width: 280px;
  border-right: 1px solid #e0e0e0;
  overflow-y: auto;
  background: #fafafa;
}

.monitoring-conv-item {
  padding: 12px 16px;
  cursor: pointer;
  border-left: 3px solid transparent;
  transition: background 0.15s ease;
  border-bottom: 1px solid #f0f0f0;
}

.monitoring-conv-item:hover {
  background: #f0f0f0;
}

.monitoring-conv-item.active {
  background: rgba(0, 119, 204, 0.07);
  border-left-color: #0077cc;
}

.monitoring-detail {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #fff;
}

.monitoring-detail-header {
  padding: 14px 16px;
  border-bottom: 1px solid #f0f0f0;
  flex-shrink: 0;
}

.monitoring-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #f9f9f9;
}

.monitoring-read-only-notice {
  padding: 10px 16px;
  text-align: center;
  font-size: 0.8rem;
  color: #666;
  background: #f5f5f5;
  border-top: 1px solid #e0e0e0;
  flex-shrink: 0;
}

/* Dark mode */
[data-bs-theme="dark"] .monitoring-layout {
  border-color: #2c2c2c;
}

[data-bs-theme="dark"] .monitoring-list {
  background: #1f1f1f;
  border-right-color: #2c2c2c;
}

[data-bs-theme="dark"] .monitoring-conv-item {
  border-bottom-color: #2c2c2c;
}

[data-bs-theme="dark"] .monitoring-conv-item:hover {
  background: #2c2c2c;
}

[data-bs-theme="dark"] .monitoring-conv-item.active {
  background: rgba(0, 119, 204, 0.15);
}

[data-bs-theme="dark"] .monitoring-detail {
  background: #1a1a1a;
}

[data-bs-theme="dark"] .monitoring-detail-header {
  border-bottom-color: #2c2c2c;
}

[data-bs-theme="dark"] .monitoring-messages {
  background: #141414;
}

[data-bs-theme="dark"] .monitoring-read-only-notice {
  background: #1f1f1f;
  border-top-color: #2c2c2c;
  color: #aaaaaa;
}

@media (max-width: 768px) {
  .monitoring-layout {
    flex-direction: column;
    height: auto;
  }

  .monitoring-list {
    width: 100%;
    min-width: unset;
    max-height: 250px;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
  }
}
</style>
