<template>
  <div class="manage-subscription-wrapper">
    <!-- Access Denied for non-Admin users -->
    <div v-if="!isAdmin" class="text-center py-20">
      <div class="card shadow-sm mx-auto" style="max-width: 500px;">
        <div class="card-body p-10">
          <div class="mb-5">
            <i class="ki-duotone ki-information-5 fs-6x text-danger">
              <span class="path1"></span>
              <span class="path2"></span>
              <span class="path3"></span>
            </i>
          </div>
          <h3 class="fw-bold text-gray-900 mb-3">Accesso Negato</h3>
          <p class="text-muted fs-5 mb-6">
            Non hai i permessi necessari per accedere a questa sezione.
          </p>
          <p class="text-muted fs-7">
            Questa pagina è riservata agli Amministratori.
          </p>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else-if="isLoading" class="text-center py-20">
      <div class="spinner-border text-primary mb-5" role="status" style="width: 3rem; height: 3rem;">
        <span class="visually-hidden">Caricamento...</span>
      </div>
      <h3 class="fw-bold text-gray-900 mb-2">Caricamento dati abbonamento...</h3>
    </div>

    <!-- Content - Only for Admin -->
    <div v-else-if="isAdmin && !isLoading" class="container-fluid px-4">

      <!-- Subscription Management Layout -->
      <div>
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
                    <span class="fs-7 fw-bold text-gray-900">{{ subscription ? formatDate(subscription.StartDate) : '-' }}</span>
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
                    <span class="fs-7 fw-bold text-gray-900">{{ subscription ? formatDate(subscription.EndDate) : '-' }}</span>
                  </div>
                </div>

                <div class="separator separator-dashed my-5"></div>

                <!-- Pulsante Rinnova -->
                <div class="text-center">
                  <button 
                    @click="renewSubscription" 
                    class="btn w-100"
                    :class="!subscription ? 'btn-primary' : daysRemaining <= 7 ? 'btn-danger' : daysRemaining <= 15 ? 'btn-warning' : 'btn-primary'"
                  >
                    <i class="ki-duotone fs-2 me-2" :class="!subscription ? 'ki-rocket' : daysRemaining <= 7 ? 'ki-notification-on' : 'ki-arrows-circle'">
                      <span class="path1"></span>
                      <span class="path2"></span>
                      <span v-if="!subscription || daysRemaining <= 7" class="path3"></span>
                    </i>
                    {{ !subscription ? 'Scegli un Piano' : daysRemaining <= 7 ? 'Rinnova Ora!' : daysRemaining <= 15 ? 'Rinnova Presto' : 'Rinnova Abbonamento' }}
                  </button>
                  <p class="text-muted fs-9 mt-3 mb-0">
                    {{ !subscription ? 'Sottoscrivi il tuo primo abbonamento' : `Prolunga il tuo piano ${subscription.SubscriptionPlan?.Name || ''}` }}
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
                    <!-- Plan Details -->
                    <div class="row mb-5">
                      <div class="col-md-6 mb-4 mb-md-0">
                        <!-- Tipo Piano - Grande -->
                        <div class="mb-4">
                          <label class="form-label text-muted fs-8 fw-semibold mb-3 d-block">PIANO ATTUALE</label>
                          <div v-if="subscription">
                            <div class="plan-name-large mb-3">
                              <span class="fs-1 fw-bolder text-primary">{{ subscription.SubscriptionPlan.Name }}</span>
                            </div>
                            <div class="d-flex align-items-baseline mb-3">
                              <span class="fs-4 fw-bold text-gray-900">€{{ subscription.SubscriptionPlan.Price }}</span>
                              <span class="text-muted fs-6 ms-2">/mese</span>
                            </div>
                            <div class="text-muted fs-7">{{ subscription.SubscriptionPlan.Description }}</div>
                          </div>
                          <div v-else>
                            <div class="plan-name-large mb-3">
                              <span class="fs-1 fw-bolder text-muted">Nessun piano attivo</span>
                            </div>
                            <div class="text-muted fs-7">Scegli un piano per iniziare</div>
                          </div>
                        </div>

                        <!-- Data Prima Sottoscrizione - Grande -->
                        <div class="mb-4">
                          <label class="form-label text-muted fs-8 fw-semibold mb-3 d-block">DATA PRIMA SOTTOSCRIZIONE</label>
                          <div class="d-flex align-items-center">
                            <i class="ki-duotone ki-calendar fs-2x text-primary me-3">
                              <span class="path1"></span>
                              <span class="path2"></span>
                            </i>
                            <div>
                              <div class="fs-3 fw-bold text-gray-900">{{ subscription ? formatDate(subscription.StartDate) : '-' }}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <label class="form-label text-muted fs-8 fw-semibold mb-3">FUNZIONALITÀ INCLUSE</label>
                        <div v-if="subscription && planFeatures.length > 0" class="features-list-compact">
                          <div v-for="(feature, index) in planFeatures" :key="index" class="feature-item-compact mb-2">
                            <i class="ki-duotone ki-check-circle fs-3 text-success me-2">
                              <span class="path1"></span>
                              <span class="path2"></span>
                            </i>
                            <span class="fs-8 text-gray-700">{{ feature }}</span>
                          </div>
                        </div>
                        <div v-else class="text-muted fs-8">
                          <i class="ki-duotone ki-information fs-3 text-muted me-2">
                            <span class="path1"></span>
                            <span class="path2"></span>
                            <span class="path3"></span>
                          </i>
                          Scegli un piano per vedere le funzionalità
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
                        <h5 class="fw-bold text-gray-900 mb-0">Supporto & Assistenza</h5>
                        <p class="text-muted fs-8 mb-0">Siamo qui per aiutarti</p>
                      </div>
                    </div>
                    <div class="separator separator-dashed mb-4"></div>
                    
                    <!-- Contatti -->
                    <div class="mb-4">
                      <h6 class="fw-bold text-gray-900 mb-3 fs-7">CONTATTI</h6>
                      <div class="info-item mb-3 d-flex align-items-center">
                        <i class="ki-duotone ki-sms fs-3 text-primary me-2">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        <div class="flex-grow-1">
                          <div class="text-gray-700 fs-8 fw-semibold">Email</div>
                          <div class="text-muted fs-9">support@kurama.com</div>
                        </div>
                        <button 
                          @click="contactSupport"
                          class="btn btn-sm btn-light flex-shrink-0"
                        >
                          <i class="ki-duotone ki-sms fs-5 me-1">
                            <span class="path1"></span>
                            <span class="path2"></span>
                          </i>
                          Contatta Supporto
                        </button>
                      </div>
                      <div class="info-item mb-3">
                        <i class="ki-duotone ki-phone fs-3 text-primary me-2">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        <div>
                          <div class="text-gray-700 fs-8 fw-semibold">Telefono</div>
                          <div class="text-muted fs-9">+39 123 456 7890</div>
                        </div>
                      </div>
                      <div class="info-item">
                        <i class="ki-duotone ki-clock fs-3 text-primary me-2">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        <div>
                          <div class="text-gray-700 fs-8 fw-semibold">Orari</div>
                          <div class="text-muted fs-9">Lun-Ven 9:00-18:00</div>
                        </div>
                      </div>
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
    
    // Controllo ruolo: solo Admin può vedere questa pagina
    const isAdmin = computed(() => {
      return authStore.user?.Role === 'Admin';
    });
    
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
      // Estraiamo solo le descrizioni delle feature
      if (Array.isArray(subscription.value.SubscriptionPlan.Features)) {
        return subscription.value.SubscriptionPlan.Features
          .map((f: any) => f.Description || f.description || f.FeatureName || f.featureName)
          .filter((desc: string) => desc && desc.trim() !== ''); // Rimuove valori vuoti o null
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

    const subscriptionDuration = computed(() => {
      if (!subscription.value?.StartDate) return 'N/A';
      
      const startDate = new Date(subscription.value.StartDate);
      const today = new Date();
      
      const diffTime = today.getTime() - startDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 30) {
        return `${diffDays} giorni`;
      } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return `${months} ${months === 1 ? 'mese' : 'mesi'}`;
      } else {
        const years = Math.floor(diffDays / 365);
        const remainingMonths = Math.floor((diffDays % 365) / 30);
        let result = `${years} ${years === 1 ? 'anno' : 'anni'}`;
        if (remainingMonths > 0) {
          result += ` e ${remainingMonths} ${remainingMonths === 1 ? 'mese' : 'mesi'}`;
        }
        return result;
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
      
      // Mostra loading mentre aggiorna i dati
      isLoading.value = true;
      
      // Attendi un momento per permettere al webhook di processare
      setTimeout(async () => {
        try {
          // Ricarica i dati dell'abbonamento
          await loadSubscription();
          
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
        } catch (error) {
          console.error('Errore durante l\'aggiornamento:', error);
          Swal.fire({
            title: "Aggiornamento completato!",
            text: "Il tuo piano è stato aggiornato. Ricarica la pagina per vedere le modifiche.",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok",
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semobold btn-light-primary",
            },
          });
        }
      }, 2000); // Attendi 2 secondi per il webhook
    };

    const contactSupport = () => {
      const planName = subscription.value?.SubscriptionPlan?.Name || 'Nessun piano attivo';
      const planPrice = subscription.value?.SubscriptionPlan?.Price || 0;
      const status = subscription.value?.Status || 'N/A';
      const endDate = subscription.value?.EndDate ? formatDate(subscription.value.EndDate) : 'N/A';
      
      const subject = encodeURIComponent('Richiesta Supporto - Gestione Abbonamento');
      const body = encodeURIComponent(
        `Gentile Team di Supporto,\n\n` +
        `Ho bisogno di assistenza riguardo al mio abbonamento.\n\n` +
        `Dati Utente:\n` +
        `Nome: ${user.value.FirstName} ${user.value.LastName}\n` +
        `Email: ${user.value.Email}\n` +
        `${user.value.CompanyName ? `Azienda: ${user.value.CompanyName}\n` : ''}\n` +
        `Dettagli Abbonamento:\n` +
        `Piano: ${planName}\n` +
        `Prezzo: €${planPrice}/mese\n` +
        `Stato: ${status}\n` +
        `Data Scadenza: ${endDate}\n` +
        `Giorni Rimanenti: ${daysRemaining.value}\n\n` +
        `Richiesta:\n` +
        `[Descrivere qui la richiesta di supporto]\n\n` +
        `Cordiali saluti`
      );

      window.location.href = `mailto:support@kurama.com?subject=${subject}&body=${body}`;
    };

    onMounted(() => {
      loadSubscription();
    });

    return {
      user,
      isAdmin,
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
      subscriptionDuration,
      openPricingModal,
      closePricingModal,
      renewSubscription,
      handleUpgradeSuccess,
      contactSupport,
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

.plan-name-large {
  line-height: 1.2;
}

.plan-name-large span {
  display: block;
  letter-spacing: -0.02em;
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

