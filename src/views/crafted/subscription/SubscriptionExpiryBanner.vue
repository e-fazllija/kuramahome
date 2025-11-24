<template>
  <!-- Banner Scadenza Abbonamento - Compatto -->
  <Transition name="fade">
    <div v-if="showBanner" class="subscription-expiry-alert">
      <div class="alert alert-warning d-flex align-items-center py-2 px-4 mb-0" role="alert">
        <!-- Icon -->
        <i class="ki-duotone ki-information-5 fs-3 text-warning me-3">
          <span class="path1"></span>
          <span class="path2"></span>
          <span class="path3"></span>
        </i>
        
        <!-- Content -->
        <div class="flex-grow-1">
          <span class="fw-semibold text-gray-800 fs-7">
            Abbonamento in scadenza tra {{ daysRemaining }} {{ daysRemaining === 1 ? 'giorno' : 'giorni' }}
          </span>
        </div>

        <!-- Button -->
        <router-link 
          to="/dashboard/subscription/manage" 
          class="btn btn-sm btn-warning fw-bold ms-3"
        >
          Rinnova
        </router-link>

        <!-- Close Button -->
        <button 
          type="button" 
          class="btn-close btn-close-sm ms-2"
          @click="dismissBanner"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { getCurrentSubscription } from '@/core/data/subscription';

export default defineComponent({
  name: 'subscription-expiry-banner',
  setup() {
    const authStore = useAuthStore();
    const daysRemaining = ref<number>(0);
    const showBanner = ref<boolean>(false);
    const isDismissed = ref<boolean>(false);

    // Controllo ruolo: solo Admin può vedere il banner
    const isAdmin = computed(() => {
      return authStore.user?.Role === 'Admin';
    });

    const checkSubscriptionExpiry = async () => {
      // Se non è Admin, non mostrare il banner
      if (!isAdmin.value) {
        showBanner.value = false;
        return;
      }

      try {
        const subscription = await getCurrentSubscription();
        
        if (!subscription || !subscription.EndDate) {
          showBanner.value = false;
          return;
        }

        // Calcola giorni rimanenti
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const endDate = new Date(subscription.EndDate);
        endDate.setHours(0, 0, 0, 0);
        
        const diffTime = endDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        daysRemaining.value = diffDays > 0 ? diffDays : 0;

        // Mostra banner solo se mancano 5 giorni o meno (e non è stato dismissato)
        showBanner.value = diffDays <= 5 && diffDays >= 0 && !isDismissed.value;
        
      } catch (error) {
        console.error('Errore nel controllo scadenza abbonamento:', error);
        showBanner.value = false;
      }
    };

    const dismissBanner = () => {
      isDismissed.value = true;
      showBanner.value = false;
      
      // Salva lo stato nel sessionStorage (solo per questa sessione)
      sessionStorage.setItem('subscription-banner-dismissed', 'true');
    };

    onMounted(() => {
      // Controlla se il banner è stato dismissato in questa sessione
      const wasDismissed = sessionStorage.getItem('subscription-banner-dismissed');
      isDismissed.value = wasDismissed === 'true';
      
      // Controlla scadenza abbonamento
      checkSubscriptionExpiry();
    });

    // Ricontrolla quando l'utente cambia (login/logout)
    watch(() => authStore.user, () => {
      isDismissed.value = false;
      sessionStorage.removeItem('subscription-banner-dismissed');
      checkSubscriptionExpiry();
    });

    return {
      isAdmin,
      showBanner,
      daysRemaining,
      dismissBanner
    };
  },
});
</script>

<style scoped>
.subscription-expiry-alert {
  position: fixed;
  top: 100px;
  left: 265px;
  z-index: 99;
  max-width: 400px;
}

.alert-warning {
  background: linear-gradient(135deg, #fff8e1 0%, #fffbf0 100%);
  border: 1px solid #ffc700;
  border-radius: 0.65rem;
  box-shadow: 0 4px 15px rgba(255, 199, 0, 0.2);
}

.btn-warning {
  background: #ffc700;
  border: none;
  color: #1e1e2d;
  padding: 0.375rem 1rem;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.btn-warning:hover {
  background: #ffb800;
  color: #1e1e2d;
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(255, 199, 0, 0.3);
}

.btn-close-sm {
  font-size: 0.75rem;
  opacity: 0.5;
}

.btn-close-sm:hover {
  opacity: 1;
}

/* Transition */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

/* Dark Mode */
[data-bs-theme="dark"] .alert-warning {
  background: linear-gradient(135deg, rgba(255, 199, 0, 0.15) 0%, rgba(255, 184, 0, 0.1) 100%);
  border-color: rgba(255, 199, 0, 0.3);
  box-shadow: 0 4px 15px rgba(255, 199, 0, 0.1);
}

[data-bs-theme="dark"] .alert-warning .text-gray-800 {
  color: #f5f8fa !important;
}

[data-bs-theme="dark"] .btn-warning {
  background: #ffc700;
  color: #1e1e2d;
}

[data-bs-theme="dark"] .btn-warning:hover {
  background: #ffb800;
  color: #1e1e2d;
}

/* Responsive */
@media (max-width: 991px) {
  .subscription-expiry-alert {
    left: 10px;
    right: 10px;
    top: 80px;
    max-width: calc(100vw - 20px);
  }

  .alert {
    flex-wrap: wrap;
    padding: 0.75rem !important;
  }

  .alert .btn-sm {
    margin-top: 0.5rem;
    margin-left: 0 !important;
    width: 100%;
  }
}
</style>

