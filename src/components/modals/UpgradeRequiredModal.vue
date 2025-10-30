<template>
  <!-- Modal Backdrop -->
  <Transition name="modal-fade">
    <div v-if="isOpen" class="upgrade-modal-backdrop" @click.self="handleClose">
      <!-- Modal Container -->
      <div class="upgrade-modal-container">
        <!-- Close Button -->
        <button 
          @click="handleClose" 
          class="upgrade-modal-close"
          aria-label="Chiudi"
        >
          <i class="ki-duotone ki-cross fs-1">
            <span class="path1"></span>
            <span class="path2"></span>
          </i>
        </button>

        <!-- Modal Content -->
        <div class="upgrade-modal-content">
          <!-- Header -->
          <div class="text-center mb-8">
            <div class="symbol symbol-70px mx-auto mb-5">
              <span class="symbol-label" style="background: linear-gradient(135deg, #f1416c 0%, #ee5e52 100%); box-shadow: 0 4px 20px rgba(241, 65, 108, 0.4);">
                <i class="ki-duotone ki-information-5 fs-2x text-white">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                  <span class="path4"></span>
                </i>
              </span>
            </div>
            <h1 class="fw-bolder mb-3 fs-2x upgrade-text-primary">Limite Raggiunto</h1>
            <p class="fs-5 fw-semibold upgrade-text-secondary">
              Hai raggiunto il limite massimo di <strong>{{ featureDisplayName }}</strong>
            </p>
          </div>

          <!-- Admin: Mostra upgrade options -->
          <div v-if="isAdmin" class="mb-8">
            <div class="text-center mb-6">
              <h3 class="fw-bold mb-2 upgrade-text-primary">Vuoi aumentare il limite?</h3>
              <p class="fs-6 upgrade-text-secondary mb-0">
                Aggiorna il tuo piano per sbloccare più funzionalità
              </p>
            </div>
            
            <div class="d-grid gap-3">
              <button
                @click="handleManageSubscription"
                class="btn btn-lg btn-primary fw-bold"
                style="background: linear-gradient(135deg, #0077CC 0%, #005fa3 100%); border: none; border-radius: 0.75rem; padding: 1rem 2rem;"
              >
                <i class="ki-duotone ki-setting-2 fs-3 me-2">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                  <span class="path4"></span>
                </i>
                Gestisci Abbonamento
              </button>
            </div>
          </div>

          <!-- Agency/Agent: Messaggio contattare agenzia -->
          <div v-else class="mb-8">
            <div class="alert alert-info d-flex align-items-center p-6" style="border-radius: 0.75rem; border: none; background: linear-gradient(135deg, rgba(13, 110, 253, 0.1) 0%, rgba(13, 110, 253, 0.05) 100%);">
              <i class="ki-duotone ki-information-2 fs-2x text-info me-4">
                <span class="path1"></span>
                <span class="path2"></span>
                <span class="path3"></span>
                <span class="path4"></span>
              </i>
              <div class="flex-grow-1">
                <h4 class="fw-bold mb-2 upgrade-text-primary">Contattare l'Agenzia</h4>
                <p class="mb-0 fs-6 upgrade-text-secondary">
                  Il limite è stato raggiunto. Per maggiori informazioni o per aumentare i limiti, 
                  contattare l'agenzia di riferimento.
                </p>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="d-flex justify-content-end gap-3">
            <button
              @click="handleClose"
              class="btn btn-light-secondary fw-semibold"
              style="border-radius: 0.75rem; padding: 0.75rem 1.5rem;"
            >
              Chiudi
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import type { SubscriptionLimitStatusResponse } from '@/core/data/subscription-limits';

export default defineComponent({
  name: 'UpgradeRequiredModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    featureDisplayName: {
      type: String,
      required: true,
      default: 'elementi',
    },
    limitStatus: {
      type: Object as () => SubscriptionLimitStatusResponse | null,
      default: null,
    },
  },
  emits: ['close', 'upgrade'],
  setup(props, { emit }) {
    const authStore = useAuthStore();

    const isAdmin = computed(() => authStore.user?.Role === 'Admin');

    const getUsagePercentage = computed(() => {
      if (!props.limitStatus?.limit || 
          props.limitStatus.limit === 'unlimited' || 
          props.limitStatus.limit === '-1') {
        return 0;
      }

      const limitNum = parseInt(props.limitStatus.limit);
      if (isNaN(limitNum) || limitNum === 0) return 0;

      return Math.min(100, (props.limitStatus.currentUsage / limitNum) * 100);
    });

    const handleClose = () => {
      emit('close');
    };

    const handleManageSubscription = () => {
      emit('close');
      // Reindirizza alla pagina gestione subscription
      window.location.href = '/dashboard/subscription/manage';
    };

    return {
      isAdmin,
      getUsagePercentage,
      handleClose,
      handleManageSubscription,
    };
  },
});
</script>

<style scoped>
.upgrade-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.upgrade-modal-container {
  background: var(--bs-bg-primary, #ffffff);
  border-radius: 1rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  z-index: 1051;
}

.upgrade-modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid var(--bs-border-color, #e9ecef);
  border-radius: 0.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1052;
  transition: all 0.3s ease;
}

.upgrade-modal-close:hover {
  background: var(--bs-danger, #f1416c);
  color: white;
  border-color: var(--bs-danger, #f1416c);
}

.upgrade-modal-content {
  padding: 2.5rem;
}

.upgrade-info-box {
  background: linear-gradient(135deg, rgba(241, 65, 108, 0.05) 0%, rgba(238, 94, 82, 0.05) 100%);
  border: 1px solid rgba(241, 65, 108, 0.2);
  border-radius: 0.75rem;
  padding: 1.5rem;
}

.upgrade-text-primary {
  color: var(--bs-text-primary, #333333);
}

.upgrade-text-secondary {
  color: var(--bs-text-secondary, #666666);
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .upgrade-modal-container {
    background: var(--bs-bg-primary, #1A1A1A);
  }

  .upgrade-text-primary {
    color: var(--bs-text-primary, #E0E0E0);
  }

  .upgrade-text-secondary {
    color: var(--bs-text-secondary, #AAAAAA);
  }

  .upgrade-modal-close {
    background: rgba(26, 26, 26, 0.9);
    border-color: var(--bs-border-color, #2C2C2C);
  }
}

/* Transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .upgrade-modal-container {
    max-width: 95%;
    margin: 1rem;
  }

  .upgrade-modal-content {
    padding: 1.5rem;
  }
}
</style>

