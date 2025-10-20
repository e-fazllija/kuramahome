<template>
  <div class="manage-subscription-wrapper">
    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-20">
      <div class="spinner-border text-primary mb-5" role="status" style="width: 3rem; height: 3rem;">
        <span class="visually-hidden">Caricamento...</span>
      </div>
      <h3 class="fw-bold text-gray-900 mb-2">Caricamento dati abbonamento...</h3>
    </div>

    <!-- Content -->
    <div v-else class="container-fluid px-4">

      <!-- No Subscription State -->
      <div v-if="!subscription" class="row">
        <div class="col-12">
          <!-- Countdown Banner - No Subscription -->
          <div class="card shadow-sm countdown-card mb-6">
            <div class="card-body p-6">
              <div class="row align-items-center">
                <!-- Data Sottoscrizione -->
                <div class="col-lg-4 text-center text-lg-start mb-4 mb-lg-0">
                  <label class="text-muted fs-7 fw-semibold mb-2 d-block">DATA SOTTOSCRIZIONE</label>
                  <div class="d-flex align-items-center justify-content-center justify-content-lg-start">
                    <i class="ki-duotone ki-calendar fs-2x text-gray-400 me-3">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span class="fs-4 text-muted">-</span>
                  </div>
                </div>

                <!-- Status -->
                <div class="col-lg-4 text-center mb-4 mb-lg-0">
                  <label class="text-muted fs-7 fw-semibold mb-2 d-block">STATO ABBONAMENTO</label>
                  <div class="countdown-display">
                    <span class="badge badge-light-danger fs-3 px-6 py-4">
                      <i class="ki-duotone ki-cross-circle fs-2 me-2">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      NON ATTIVO
                    </span>
                  </div>
                </div>

                <!-- Data Scadenza -->
                <div class="col-lg-4 text-center text-lg-end">
                  <label class="text-muted fs-7 fw-semibold mb-2 d-block">DATA SCADENZA</label>
                  <div class="d-flex align-items-center justify-content-center justify-content-lg-end">
                    <i class="ki-duotone ki-calendar-tick fs-2x text-gray-400 me-3">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span class="fs-4 text-muted">-</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Call to Action -->
          <div class="card shadow-sm">
            <div class="card-body text-center py-20">
              <div class="symbol symbol-100px mx-auto mb-7">
                <span class="symbol-label bg-light-warning">
                  <i class="ki-duotone ki-information fs-3x text-warning">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                  </i>
                </span>
              </div>
              <h3 class="fw-bold text-gray-900 mb-4">Nessun abbonamento attivo</h3>
              <p class="text-muted fs-5 mb-8">Non hai ancora sottoscritto un abbonamento. Scegli il piano perfetto per te!</p>
              <button @click="openPricingModal" class="btn btn-lg btn-primary">
                <i class="ki-duotone ki-rocket fs-2 me-2">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
                Scegli un Piano
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Subscription State -->
      <div v-else>
        <div class="row g-5">
          <!-- Left Sidebar - Countdown Banner Vertical -->
          <div class="col-lg-3">
            <div class="card shadow-sm countdown-card h-100">
              <div class="card-body p-5">
                <!-- Status Badge -->
                <div class="text-center mb-5">
                  <span class="badge fs-5 px-4 py-3 w-100" :class="statusBadgeClass">
                    {{ statusText }}
                  </span>
                </div>

                <!-- Countdown Display -->
                <div class="text-center mb-6">
                  <label class="text-muted fs-8 fw-semibold mb-3 d-block">GIORNI RIMANENTI</label>
                  <div class="countdown-display">
                    <div class="countdown-number" :class="daysRemainingClass">
                      {{ daysRemaining }}
                    </div>
                    <div class="countdown-label">giorni</div>
                  </div>
                </div>

                <div class="separator separator-dashed my-5"></div>

                <!-- Data Sottoscrizione -->
                <div class="mb-5">
                  <label class="text-muted fs-8 fw-semibold mb-2 d-block">DATA SOTTOSCRIZIONE</label>
                  <div class="d-flex align-items-center">
                    <i class="ki-duotone ki-calendar fs-2 text-primary me-2">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span class="fs-7 fw-bold text-gray-900">{{ formatDate(subscription.StartDate) }}</span>
                  </div>
                </div>

                <!-- Data Scadenza -->
                <div class="mb-5">
                  <label class="text-muted fs-8 fw-semibold mb-2 d-block">DATA SCADENZA</label>
                  <div class="d-flex align-items-center">
                    <i class="ki-duotone ki-calendar-tick fs-2 text-success me-2">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span class="fs-7 fw-bold text-gray-900">{{ formatDate(subscription.EndDate) }}</span>
                  </div>
                </div>

                <div class="separator separator-dashed my-5"></div>

                <!-- Pulsante Rinnova -->
                <div class="text-center">
                  <button 
                    @click="renewSubscription" 
                    class="btn w-100"
                    :class="daysRemaining <= 7 ? 'btn-danger' : daysRemaining <= 15 ? 'btn-warning' : 'btn-primary'"
                  >
                    <i class="ki-duotone fs-2 me-2" :class="daysRemaining <= 7 ? 'ki-notification-on' : 'ki-arrows-circle'">
                      <span class="path1"></span>
                      <span class="path2"></span>
                      <span v-if="daysRemaining <= 7" class="path3"></span>
                    </i>
                    {{ daysRemaining <= 7 ? 'Rinnova Ora!' : daysRemaining <= 15 ? 'Rinnova Presto' : 'Rinnova Abbonamento' }}
                  </button>
                  <p class="text-muted fs-9 mt-3 mb-0">
                    Prolunga il tuo piano {{ subscription.SubscriptionPlan.Name }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column - Subscription Info -->
          <div class="col-lg-9">
            <div class="row g-5">
              <!-- Current Plan Card -->
              <div class="col-12">
                <div class="card shadow-sm subscription-card">
                  <div class="card-header border-0 pt-5 pb-3 subscription-card-header">
                    <div class="card-title">
                      <h3 class="fw-bold text-gray-900 mb-0 fs-4">
                        <i class="ki-duotone ki-crown fs-2 me-2 text-warning">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        Il tuo Piano
                      </h3>
                    </div>
                  </div>
                  <div class="card-body p-6">
                    <!-- Agency/User Name -->
                    <div class="mb-5">
                      <label class="form-label text-muted fs-8 fw-semibold mb-2">INTESTATARIO</label>
                      <div class="fs-5 fw-bold text-gray-900">
                        {{ user.Name }} {{ user.LastName }}
                        <span v-if="user.CompanyName" class="text-muted fs-6 ms-2">({{ user.CompanyName }})</span>
                      </div>
                      <div class="text-muted fs-7">{{ user.Email }}</div>
                    </div>

                    <!-- Plan Details -->
                    <div class="row mb-5">
                      <div class="col-md-6 mb-4 mb-md-0">
                        <label class="form-label text-muted fs-8 fw-semibold mb-2">PIANO ATTUALE</label>
                        <div class="d-flex align-items-baseline">
                          <span class="fs-2 fw-bolder text-primary me-2">{{ subscription.SubscriptionPlan.Name }}</span>
                          <span class="fs-5 fw-bold text-gray-900">€{{ subscription.SubscriptionPlan.Price }}</span>
                          <span class="text-muted fs-7 ms-1">/mese</span>
                        </div>
                        <div class="text-muted fs-8 mt-1">{{ subscription.SubscriptionPlan.Description }}</div>
                      </div>
                      <div class="col-md-6">
                        <label class="form-label text-muted fs-8 fw-semibold mb-3">FUNZIONALITÀ INCLUSE</label>
                        <div class="features-list-compact">
                          <div v-for="(feature, index) in planFeatures.slice(0, 3)" :key="index" class="feature-item-compact mb-2">
                            <i class="ki-duotone ki-check-circle fs-3 text-success me-2">
                              <span class="path1"></span>
                              <span class="path2"></span>
                            </i>
                            <span class="fs-8 text-gray-700">{{ feature }}</span>
                          </div>
                          <div v-if="planFeatures.length > 3" class="text-muted fs-8 ms-7">+{{ planFeatures.length - 3 }} altre</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Upgrade Card -->
              <div class="col-md-6">
                <div class="card shadow-sm subscription-card upgrade-card h-100">
                  <div class="card-body p-5 text-center d-flex flex-column">
                    <div class="symbol symbol-65px mx-auto mb-4 upgrade-icon">
                      <span class="symbol-label">
                        <i class="ki-duotone ki-rocket fs-2x text-white">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                      </span>
                    </div>
                    <h4 class="fw-bold text-gray-900 mb-2">Potenzia il tuo piano</h4>
                    <p class="text-muted fs-7 mb-4 flex-grow-1">Passa a un piano superiore</p>
                    <button @click="openPricingModal" class="btn btn-primary w-100 upgrade-btn">
                      <i class="ki-duotone ki-arrow-up fs-3 me-2">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      Upgrade
                    </button>
                  </div>
                </div>
              </div>

              <!-- Info Card -->
              <div class="col-md-6">
                <div class="card shadow-sm subscription-card info-card h-100">
                  <div class="card-body p-5">
                    <div class="d-flex align-items-center mb-4">
                      <i class="ki-duotone ki-information-5 fs-2x text-info me-3">
                        <span class="path1"></span>
                        <span class="path2"></span>
                        <span class="path3"></span>
                      </i>
                      <div>
                        <h5 class="fw-bold text-gray-900 mb-0">Supporto</h5>
                        <p class="text-muted fs-8 mb-0">Contattaci</p>
                      </div>
                    </div>
                    <div class="separator separator-dashed mb-4"></div>
                    <div class="info-item mb-3">
                      <i class="ki-duotone ki-sms fs-3 text-primary me-2">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      <span class="text-gray-700 fs-8">support@kurama.com</span>
                    </div>
                    <div class="info-item">
                      <i class="ki-duotone ki-phone fs-3 text-primary me-2">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      <span class="text-gray-700 fs-8">+39 123 456 7890</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pricing Modal -->
    <PricingModal
      :isOpen="showPricingModal"
      :email="user.Email"
      :mode="pricingMode"
      :currentPlan="currentPlanName"
      :userId="user.Id"
      @close="closePricingModal"
      @success="handleUpgradeSuccess"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { getCurrentSubscription, type UserSubscription } from '@/core/data/subscription';
import PricingModal from '@/components/modals/PricingModal.vue';
import Swal from 'sweetalert2/dist/sweetalert2.js';

export default defineComponent({
  name: 'manage-subscription',
  components: {
    PricingModal
  },
  setup() {
    const authStore = useAuthStore();
    const user = computed(() => authStore.user);
    
    const isLoading = ref(true);
    const subscription = ref<UserSubscription | null>(null);
    const showPricingModal = ref(false);
    const pricingMode = ref<'new' | 'upgrade'>('upgrade');

    const currentPlanName = computed(() => {
      return subscription.value?.SubscriptionPlan?.Name?.toLowerCase() || '';
    });

    const statusBadgeClass = computed(() => {
      const status = subscription.value?.Status || '';
      switch (status.toLowerCase()) {
        case 'active':
          return 'badge-light-success';
        case 'expired':
          return 'badge-light-danger';
        case 'cancelled':
          return 'badge-light-warning';
        default:
          return 'badge-light-secondary';
      }
    });

    const statusText = computed(() => {
      const status = subscription.value?.Status || '';
      switch (status.toLowerCase()) {
        case 'active':
          return '✓ Attivo';
        case 'expired':
          return 'Scaduto';
        case 'cancelled':
          return 'Cancellato';
        default:
          return status;
      }
    });

    const planFeatures = computed(() => {
      if (!subscription.value?.SubscriptionPlan?.Features) return [];
      
      // Features è già un array di oggetti SubscriptionFeature dal backend
      // Estraiamo solo i nomi delle feature
      if (Array.isArray(subscription.value.SubscriptionPlan.Features)) {
        return subscription.value.SubscriptionPlan.Features.map((f: any) => f.FeatureName || f.featureName);
      }
      
      return [];
    });

    const formatDate = (dateString: string): string => {
      if (!dateString) return '-';
      const date = new Date(dateString);
      return date.toLocaleDateString('it-IT', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    };

    const daysRemaining = computed(() => {
      if (!subscription.value?.EndDate) return 0;
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const endDate = new Date(subscription.value.EndDate);
      endDate.setHours(0, 0, 0, 0);
      
      const diffTime = endDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return diffDays > 0 ? diffDays : 0;
    });

    const daysRemainingClass = computed(() => {
      const days = daysRemaining.value;
      
      if (days === 0 || subscription.value?.Status?.toLowerCase() !== 'active') {
        return 'countdown-expired';
      } else if (days <= 7) {
        return 'countdown-warning';
      } else if (days <= 15) {
        return 'countdown-caution';
      } else {
        return 'countdown-active';
      }
    });

    const loadSubscription = async () => {
      isLoading.value = true;
      try {
        subscription.value = await getCurrentSubscription();
        
        if (!subscription.value) {
          pricingMode.value = 'new';
        }
      } catch (error) {
        console.error('Errore nel caricamento abbonamento:', error);
        Swal.fire({
          text: "Errore nel caricamento dei dati dell'abbonamento",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        });
      } finally {
        isLoading.value = false;
      }
    };

    const openPricingModal = () => {
      showPricingModal.value = true;
    };

    const closePricingModal = () => {
      showPricingModal.value = false;
    };

    const renewSubscription = () => {
      // Apre la modale in modalità rinnovo
      // La modale mostrerà il piano attuale per il rinnovo
      pricingMode.value = 'upgrade';
      showPricingModal.value = true;
    };

    const handleUpgradeSuccess = async () => {
      showPricingModal.value = false;
      
      Swal.fire({
        title: "Upgrade completato!",
        text: "Il tuo piano è stato aggiornato con successo.",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ottimo!",
        heightAuto: false,
        customClass: {
          confirmButton: "btn fw-semobold btn-light-primary",
        },
      });

      // Ricarica i dati dell'abbonamento
      await loadSubscription();
    };

    onMounted(() => {
      loadSubscription();
    });

    return {
      user,
      isLoading,
      subscription,
      showPricingModal,
      pricingMode,
      currentPlanName,
      statusBadgeClass,
      statusText,
      planFeatures,
      formatDate,
      daysRemaining,
      daysRemainingClass,
      openPricingModal,
      closePricingModal,
      renewSubscription,
      handleUpgradeSuccess,
    };
  },
});
</script>

<style scoped>
.manage-subscription-wrapper {
  min-height: 100vh;
  padding: 1rem 0;
}

.subscription-header {
  padding: 1rem 0 0.5rem;
}

.subscription-header h1 {
  font-size: 1.75rem;
}

.subscription-card {
  border-radius: 1rem;
  transition: all 0.3s ease;
}

.subscription-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(54, 153, 255, 0.15) !important;
}

.subscription-card-header {
  background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%);
  border-radius: 1rem 1rem 0 0;
}

.upgrade-card {
  background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%);
  border: 2px solid #3699ff;
}

.upgrade-icon .symbol-label {
  background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%);
  box-shadow: 0 4px 20px rgba(54, 153, 255, 0.4);
}

.upgrade-btn {
  background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%);
  border: none;
  transition: all 0.3s ease;
}

.upgrade-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(54, 153, 255, 0.4);
}

.features-list {
  display: flex;
  flex-direction: column;
}

.feature-item {
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
}

.features-list-compact {
  display: flex;
  flex-direction: column;
}

.feature-item-compact {
  display: flex;
  align-items: center;
}

.info-card {
  background: linear-gradient(135deg, #fff8f1 0%, #fff 100%);
}

.info-item {
  display: flex;
  align-items: center;
}

/* Countdown Card */
.countdown-card {
  border-radius: 1rem;
  border: 2px solid #e9ecef;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
}

.countdown-display {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.countdown-number {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.countdown-label {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #7e8299;
}

/* Countdown Colors */
.countdown-active {
  color: #50cd89;
  background: linear-gradient(135deg, #50cd89 0%, #3fcc7a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.countdown-caution {
  color: #ffc700;
  background: linear-gradient(135deg, #ffc700 0%, #ffb800 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.countdown-warning {
  color: #f1416c;
  background: linear-gradient(135deg, #f1416c 0%, #e0315d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: pulse-warning 2s ease-in-out infinite;
}

.countdown-expired {
  color: #a1a5b7;
}

@keyframes pulse-warning {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

/* Pulsante Rinnova */
.countdown-card .btn.w-100 {
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
}

.countdown-card .btn-primary.w-100 {
  background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%);
  box-shadow: 0 4px 15px rgba(54, 153, 255, 0.3);
}

.countdown-card .btn-primary.w-100:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(54, 153, 255, 0.4);
}

.countdown-card .btn-warning.w-100 {
  background: linear-gradient(135deg, #ffc700 0%, #ffb800 100%);
  box-shadow: 0 4px 15px rgba(255, 199, 0, 0.3);
  color: #1e1e2d;
}

.countdown-card .btn-warning.w-100:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 199, 0, 0.4);
  color: #1e1e2d;
}

.countdown-card .btn-danger.w-100 {
  background: linear-gradient(135deg, #f1416c 0%, #e0315d 100%);
  box-shadow: 0 4px 15px rgba(241, 65, 108, 0.3);
  animation: pulse-button 2s ease-in-out infinite;
}

.countdown-card .btn-danger.w-100:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(241, 65, 108, 0.4);
}

@keyframes pulse-button {
  0%, 100% {
    box-shadow: 0 4px 15px rgba(241, 65, 108, 0.3);
  }
  50% {
    box-shadow: 0 6px 25px rgba(241, 65, 108, 0.6);
  }
}

.fs-9 {
  font-size: 0.75rem;
}

/* Dark Mode */
[data-bs-theme="dark"] .countdown-card {
  background: linear-gradient(135deg, #1e1e2d 0%, #2b2b40 100%);
  border-color: #2d2d3f;
}

[data-bs-theme="dark"] .subscription-card-header {
  background: linear-gradient(135deg, rgba(54, 153, 255, 0.15) 0%, rgba(11, 183, 175, 0.15) 100%);
}

[data-bs-theme="dark"] .upgrade-card {
  background: linear-gradient(135deg, rgba(54, 153, 255, 0.1) 0%, rgba(11, 183, 175, 0.1) 100%);
  border-color: #3699ff;
}

[data-bs-theme="dark"] .info-card {
  background: linear-gradient(135deg, rgba(255, 184, 34, 0.1) 0%, transparent 100%);
}

/* Responsive */
@media (max-width: 991px) {
  .manage-subscription-wrapper {
    padding: 1rem 0;
  }
  
  .subscription-header {
    padding: 1rem 0;
  }
  
  .subscription-header h1 {
    font-size: 1.75rem;
  }
}
</style>

