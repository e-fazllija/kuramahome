<template>
  <teleport to="body">
    <div v-if="visible" class="modal fade show d-block" tabindex="-1" style="background: rgba(0,0,0,0.5); z-index: 1060;">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="ki-outline ki-message-add fs-5 me-2"></i>
              Nuova conversazione
            </h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <!-- Type selector -->
            <div class="mb-3">
              <label class="form-label fw-semibold">Tipo</label>
              <div class="d-flex gap-2">
                <button
                  v-for="opt in typeOptions"
                  :key="opt.value"
                  class="btn btn-sm"
                  :class="form.type === opt.value ? 'btn-primary' : 'btn-outline-secondary'"
                  @click="form.type = opt.value"
                >
                  {{ opt.label }}
                </button>
              </div>
            </div>

            <!-- Title (for broadcast) -->
            <div v-if="form.type !== 1" class="mb-3">
              <label class="form-label fw-semibold">Titolo</label>
              <input
                v-model="form.title"
                type="text"
                class="form-control"
                placeholder="Es. Comunicazione importante..."
              />
            </div>

            <!-- Participants -->
            <div class="mb-3">
              <label class="form-label fw-semibold">
                {{ form.type === 1 ? 'Destinatario' : 'Destinatari' }}
              </label>
              <div v-if="chatStore.isLoading" class="text-center py-3">
                <div class="spinner-border spinner-border-sm text-primary"></div>
              </div>
              <div v-else style="max-height: 220px; overflow-y: auto; border: 1px solid #e0e0e0; border-radius: 8px;">
                <div
                  v-for="contact in filteredContacts"
                  :key="contact.Id"
                  class="d-flex align-items-center gap-3 px-3 py-2 contact-item"
                  :class="{ 'contact-selected': isSelected(contact.Id) }"
                  @click="toggleContact(contact.Id)"
                >
                  <div
                    class="chat-avatar"
                    style="width: 32px; height: 32px; font-size: 0.75rem; flex-shrink: 0;"
                    :style="{ background: contact.Color }"
                  >
                    {{ (contact.FirstName[0] ?? '') + (contact.LastName[0] ?? '') }}
                  </div>
                  <div style="flex: 1; min-width: 0;">
                    <div style="font-weight: 500; font-size: 0.875rem;">
                      {{ contact.FirstName }} {{ contact.LastName }}
                    </div>
                    <div style="font-size: 0.75rem; opacity: 0.6;">
                      {{ contact.Role }}
                      <span v-if="contact.CompanyName"> · {{ contact.CompanyName }}</span>
                    </div>
                  </div>
                  <i
                    v-if="isSelected(contact.Id)"
                    class="ki-solid ki-check-circle text-primary fs-5"
                  ></i>
                </div>
                <div v-if="!filteredContacts.length" class="text-center py-3 text-muted" style="font-size: 0.85rem;">
                  Nessun contatto disponibile
                </div>
              </div>
            </div>

            <!-- Initial message -->
            <div class="mb-3">
              <label class="form-label fw-semibold">Messaggio iniziale (opzionale)</label>
              <textarea
                v-model="form.initialMessage"
                class="form-control"
                rows="3"
                placeholder="Scrivi un messaggio..."
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light" @click="$emit('close')">Annulla</button>
            <button
              type="button"
              class="btn btn-primary"
              :disabled="!canSubmit || isSubmitting"
              @click="submit"
            >
              <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
              Crea conversazione
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import { useChatStore } from "@/stores/chat";

export default defineComponent({
  name: "NewConversationModal",
  props: {
    visible: { type: Boolean, default: false },
  },
  emits: ["close", "created"],
  setup(props, { emit }) {
    const chatStore = useChatStore();

    const form = ref({
      type: 1,
      title: "",
      participantIds: [] as string[],
      initialMessage: "",
    });

    const isSubmitting = ref(false);

    const typeOptions = [
      { value: 1, label: "💬 Chat diretta" },
      { value: 2, label: "📢 Broadcast" },
    ];

    const filteredContacts = computed(() => chatStore.contacts);

    const canSubmit = computed(() => {
      if (form.value.type === 1) return form.value.participantIds.length === 1;
      return form.value.participantIds.length >= 1;
    });

    function isSelected(id: string): boolean {
      return form.value.participantIds.includes(id);
    }

    function toggleContact(id: string) {
      if (form.value.type === 1) {
        form.value.participantIds = isSelected(id) ? [] : [id];
      } else {
        if (isSelected(id)) {
          form.value.participantIds = form.value.participantIds.filter((x) => x !== id);
        } else {
          form.value.participantIds.push(id);
        }
      }
    }

    async function submit() {
      if (!canSubmit.value) return;
      isSubmitting.value = true;
      try {
        const conversation = await chatStore.startNewConversation({
          Title: form.value.title || undefined,
          Type: form.value.type,
          ParticipantIds: form.value.participantIds,
          InitialMessage: form.value.initialMessage || undefined,
        });
        emit("created", conversation);
        emit("close");
      } finally {
        isSubmitting.value = false;
      }
    }

    watch(
      () => props.visible,
      (v) => {
        if (v) {
          form.value = { type: 1, title: "", participantIds: [], initialMessage: "" };
          chatStore.loadContacts();
        }
      }
    );

    return { chatStore, form, typeOptions, filteredContacts, isSubmitting, canSubmit, isSelected, toggleContact, submit };
  },
});
</script>

<style scoped>
.contact-item {
  cursor: pointer;
  transition: background 0.15s ease;
  border-radius: 6px;
}

.contact-item:hover {
  background: #f5f5f5;
}

.contact-selected {
  background: rgba(0, 119, 204, 0.07);
}

[data-bs-theme="dark"] .contact-item:hover {
  background: #2c2c2c;
}

[data-bs-theme="dark"] .contact-selected {
  background: rgba(0, 119, 204, 0.15);
}
</style>
