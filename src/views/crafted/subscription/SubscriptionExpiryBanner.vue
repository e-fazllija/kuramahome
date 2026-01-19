<template>
  <!-- Banner Scadenza Abbonamento - Compatto -->
  <Transition name="fade">
    <div v-if="showBanner" class="subscription-expiry-alert">
      <div class="alert alert-warning d-flex align-items-center py-2 px-4 mb-0" role="alert">
        <!-- Info Icon (Cliccabile) -->
        <button 
          type="button"
          class="btn btn-link p-0 me-3 info-icon-btn"
          @click="showInfoModal = true"
          style="border: none; background: none; cursor: pointer;"
        >
          <i class="ki-duotone ki-information-5 fs-3 text-warning">
            <span class="path1"></span>
            <span class="path2"></span>
            <span class="path3"></span>
          </i>
        </button>
        
        <!-- Content -->
        <div class="flex-grow-1">
          <span class="fw-semibold text-gray-800 fs-7">
            <span v-if="isTrialPeriod">
              🎁 Il suo abbonamento scadrà tra {{ daysRemaining }} {{ daysRemaining === 1 ? 'giorno' : 'giorni' }}. Una volta scaduto, potrà sottoscriverne uno nuovo di pari livello o superiore.
            </span>
            <span v-else>
              Il suo abbonamento scadrà tra {{ daysRemaining }} {{ daysRemaining === 1 ? 'giorno' : 'giorni' }}. Una volta scaduto, potrà sottoscriverne uno nuovo di pari livello o superiore.
            </span>
          </span>
        </div>

        <!-- Button -->
        <router-link 
          to="/dashboard/subscription/manage" 
          class="btn btn-sm btn-warning fw-bold ms-3"
        >
          <span v-if="isTrialPeriod">Aggiorna</span>
          <span v-else>Rinnova</span>
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

  <!-- Modale Informazioni -->
  <div 
    v-if="showInfoModal" 
    class="modal fade show d-block" 
    tabindex="-1" 
    style="background-color: rgba(0,0,0,0.5);"
    @click.self="showInfoModal = false"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fw-bold">
            <i class="ki-duotone ki-information-5 fs-2 text-warning me-2">
              <span class="path1"></span>
              <span class="path2"></span>
              <span class="path3"></span>
            </i>
            Informazioni sui Piani di Abbonamento
          </h5>
          <button 
            type="button" 
            class="btn-close" 
            @click="showInfoModal = false"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- Tabella Massimali Piani -->
          <div v-if="plans.length > 0" class="mb-5">
            <h6 class="fw-bold text-gray-900 mb-3">Massimali dei Piani</h6>
            <div class="table-responsive">
              <table class="table table-bordered table-hover">
                <thead class="table-light">
                  <tr>
                    <th class="fw-bold">Piano</th>
                    <th v-for="feature in availableFeatures" :key="feature" class="fw-bold text-center">
                      {{ getFeatureDisplayName(feature) }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="plan in sortedPlans" :key="plan.Id">
                    <td class="fw-semibold">{{ plan.Name }}</td>
                    <td 
                      v-for="feature in availableFeatures" 
                      :key="feature" 
                      class="text-center"
                    >
                      {{ getPlanFeatureLimit(plan, feature) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Spiegazione -->
          <div class="alert alert-info d-flex align-items-start">
            <i class="ki-duotone ki-information-5 fs-2 text-info me-3 mt-1">
              <span class="path1"></span>
              <span class="path2"></span>
              <span class="path3"></span>
            </i>
            <div>
              <h6 class="fw-bold text-gray-900 mb-2">Perché non è possibile fare il downgrade?</h6>
              <p class="text-gray-700 mb-0" style="line-height: 1.6;">
                Quando il tuo abbonamento scade e decidi di sottoscriverne uno nuovo, il sistema verifica che l'utilizzo attuale 
                delle risorse (immobili, agenti, clienti, ecc.) rispetti i limiti del piano scelto. Se hai utilizzato più risorse 
                di quelle consentite dal piano inferiore, non potrai sottoscriverlo. Ad esempio, se hai 50 immobili e il piano Basic 
                ne consente solo 20, dovrai scegliere il piano attuale (Premium) o superiore per continuare ad utilizzare tutte 
                le tue risorse.
              </p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="showInfoModal = false">
            Ho capito
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { getCurrentSubscription } from '@/core/data/subscription';
import { getActivePlans, type SubscriptionPlan } from '@/core/data/subscription-plans';

export default defineComponent({
  name: 'subscription-expiry-banner',
  setup() {
    const authStore = useAuthStore();
    const daysRemaining = ref<number>(0);
    const showBanner = ref<boolean>(false);
    const isDismissed = ref<boolean>(false);
    const isTrialPeriod = ref<boolean>(false);
    const showInfoModal = ref<boolean>(false);
    const plans = ref<SubscriptionPlan[]>([]);

    // Controllo ruolo: solo Admin può vedere il banner
    const isAdmin = computed(() => {
      return authStore.user?.Role === 'Admin';
    });

    // Carica i piani
    const loadPlans = async () => {
      try {
        plans.value = await getActivePlans();
        // Escludi il piano Free se presente
        plans.value = plans.value.filter(p => p.Name.toLowerCase() !== 'free');
      } catch (error) {
        console.error('Errore nel caricamento dei piani:', error);
      }
    };

    // Estrae tutte le features disponibili dai piani
    const availableFeatures = computed(() => {
      const featuresSet = new Set<string>();
      plans.value.forEach(plan => {
        plan.Features?.forEach(feature => {
          featuresSet.add(feature.FeatureName);
        });
      });
      return Array.from(featuresSet);
    });

    // Ordina i piani per prezzo (dal più basso al più alto)
    const sortedPlans = computed(() => {
      return [...plans.value].sort((a, b) => (a.Price || 0) - (b.Price || 0));
    });

    // Ottiene il nome visualizzabile della feature
    const getFeatureDisplayName = (featureName: string): string => {
      const normalized = featureName.replace(/_/g, '').replace(/-/g, '').toLowerCase();
      const mapping: Record<string, string> = {
        'maxagencies': 'Agenzie',
        'maxproperties': 'Immobili',
        'maxagents': 'Agenti',
        'maxcustomers': 'Clienti',
        'maxrequests': 'Richieste',
        'maxexports': 'Export',
        'storagelimit': 'Storage (GB)',
      };
      return mapping[normalized] || featureName;
    };

    // Ottiene il limite della feature per un piano specifico
    const getPlanFeatureLimit = (plan: SubscriptionPlan, featureName: string): string => {
      const feature = plan.Features?.find(f => f.FeatureName === featureName);
      if (!feature || !feature.FeatureValue) return '-';
      
      const value = feature.FeatureValue.trim().toLowerCase();
      if (value === 'unlimited' || value === 'illimitato' || value === '-1') {
        return 'Illimitato';
      }
      
      const numValue = parseInt(value);
      if (!isNaN(numValue)) {
        return numValue.toString();
      }
      
      return feature.FeatureValue;
    };

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

        // Verifica se è un trial (piano Free con durata di 10 giorni o meno)
        isTrialPeriod.value = subscription.SubscriptionPlan?.Name?.toLowerCase() === 'free' && 
                        diffDays <= 10 && diffDays >= 0;

        // Mostra banner se:
        // 1. È un trial (sempre durante i 10 giorni)
        // 2. OPPURE se mancano 5 giorni o meno alla scadenza normale
        // E non è stato dismissato
        showBanner.value = (isTrialPeriod.value || diffDays <= 5) && diffDays >= 0 && !isDismissed.value;
        
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
      
      // Carica i piani
      loadPlans();
      
      // Controlla scadenza abbonamento
      checkSubscriptionExpiry();
    });

    // Ricontrolla quando l'utente cambia (login/logout)
    watch(() => authStore.user, () => {
      isDismissed.value = false;
      sessionStorage.removeItem('subscription-banner-dismissed');
      loadPlans();
      checkSubscriptionExpiry();
    });

    return {
      isAdmin,
      showBanner,
      daysRemaining,
      dismissBanner,
      isTrialPeriod,
      showInfoModal,
      plans,
      availableFeatures,
      sortedPlans,
      getFeatureDisplayName,
      getPlanFeatureLimit
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
  max-width: 600px;
}

.info-icon-btn {
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.info-icon-btn:hover {
  transform: scale(1.1);
  opacity: 0.8;
}

.info-icon-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 199, 0, 0.25);
  border-radius: 50%;
}

.alert-warning {
  background: linear-gradient(135deg, #fff8e1 0%, #fffbf0 100%);
  border: 1px solid #ffc700;
  border-radius: 0.65rem;
  box-shadow: 0 4px 15px rgba(255, 199, 0, 0.2);
  padding: 0.75rem 1rem !important;
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

/* Dark Mode - Tabella Modale */
[data-bs-theme="dark"] .table {
  color: #f5f8fa;
}

[data-bs-theme="dark"] .table thead th {
  background-color: #2b2b40 !important;
  color: #f5f8fa !important;
  border-color: #3f3f5e !important;
}

[data-bs-theme="dark"] .table tbody td {
  background-color: #1e1e2d;
  color: #f5f8fa;
  border-color: #3f3f5e;
}

[data-bs-theme="dark"] .table tbody tr:hover {
  background-color: #2b2b40;
}

[data-bs-theme="dark"] .table-bordered {
  border-color: #3f3f5e;
}

[data-bs-theme="dark"] .table-bordered th,
[data-bs-theme="dark"] .table-bordered td {
  border-color: #3f3f5e;
}

[data-bs-theme="dark"] .modal-content {
  background-color: #1e1e2d;
  border-color: #3f3f5e;
}

[data-bs-theme="dark"] .modal-header {
  border-bottom-color: #3f3f5e;
}

[data-bs-theme="dark"] .modal-header .modal-title {
  color: #f5f8fa;
}

[data-bs-theme="dark"] .modal-body {
  color: #f5f8fa;
}

[data-bs-theme="dark"] .modal-body h6 {
  color: #f5f8fa;
}

[data-bs-theme="dark"] .modal-body .text-gray-700 {
  color: #b5b5c3 !important;
}

[data-bs-theme="dark"] .modal-body .text-gray-900 {
  color: #f5f8fa !important;
}

[data-bs-theme="dark"] .modal-footer {
  border-top-color: #3f3f5e;
}

[data-bs-theme="dark"] .alert-info {
  background-color: rgba(13, 202, 240, 0.1);
  border-color: rgba(13, 202, 240, 0.3);
  color: #b5b5c3;
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

