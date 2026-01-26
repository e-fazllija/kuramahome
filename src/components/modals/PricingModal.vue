<template>
  <!-- Modal Backdrop -->
  <Transition name="modal-fade">
    <div v-if="isOpen" class="pricing-modal-backdrop" @click.self="handleClose">
      <!-- Modal Container -->
      <div class="pricing-modal-container" :class="{ 'payment-mode': selectedPlan }">
        <!-- Close Button -->
        <button 
          @click="handleClose" 
          class="pricing-modal-close"
          aria-label="Chiudi"
        >
          <i class="ki-duotone ki-cross fs-1">
            <span class="path1"></span>
            <span class="path2"></span>
          </i>
        </button>

        <!-- Modal Content -->
        <div class="pricing-modal-content">
          
          <!-- Loading State -->
          <div v-if="isVerifying" class="text-center py-20">
            <div class="spinner-border text-primary mb-5" role="status" style="width: 3rem; height: 3rem;">
              <span class="visually-hidden">Caricamento...</span>
            </div>
            <h3 class="fw-bold mb-2 pricing-text-primary">Verifica in corso...</h3>
            <p class="fs-5 pricing-text-secondary">Stiamo verificando il tuo indirizzo email</p>
          </div>

          <!-- Content (shown only after verification) -->
          <div v-if="!isVerifying && isVerified">
            <!-- Header Section -->
            <div class="text-center mb-10">
              <div class="symbol symbol-60px mx-auto mb-5">
                <span class="symbol-label" style="background: linear-gradient(135deg, #0077CC 0%, #0077CC 100%); box-shadow: 0 4px 20px rgba(0, 119, 204, 0.4);">
                  <i class="ki-duotone ki-dollar fs-2x text-white">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                  </i>
                </span>
              </div>
              <h1 class="fw-bolder mb-3 fs-2x pricing-text-primary">Scegli il piano perfetto per te</h1>
              <p class="fs-5 fw-semibold pricing-text-secondary">Benvenuto <span class="text-primary">{{ displayEmail }}</span>! Seleziona il piano che meglio si adatta alle tue esigenze</p>
            </div>

            <!-- Loading State -->
            <div v-if="isLoadingPlans" class="text-center py-20">
              <div class="spinner-border text-primary mb-5" role="status" style="width: 3rem; height: 3rem;">
                <span class="visually-hidden">Caricamento piani...</span>
              </div>
              <h3 class="fw-bold mb-2 pricing-text-primary">Caricamento piani di abbonamento...</h3>
            </div>

            <!-- Pricing Cards - Solo piani mensili base -->
            <div v-else-if="!selectedPlan && !showMultiMonthGrid" class="row g-5 mb-10">
              <!-- Dynamic Plan Cards -->
              <div v-for="(plan, index) in monthlyBasePlans" :key="plan.Id" class="col-lg-4">
                <div class="card pricing-card h-100 shadow-sm hover-elevate-up" :class="{ 'pricing-card-featured shadow-lg': index === 1 }">
                  <!-- Badge "Consigliato" solo per il secondo piano -->
                  <div v-if="index === 1" class="pricing-badge">
                    <span class="badge badge-primary">Consigliato</span>
                  </div>
                  
                  <div class="card-body d-flex flex-column p-8">
                    <div class="text-center mb-7">
                      <div class="pricing-icon-wrapper mb-5">
                        <!-- Icone dinamiche basate sull'indice -->
                        <i v-if="index === 0" class="ki-duotone ki-rocket fs-3x text-primary">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        <i v-else-if="index === 1" class="ki-duotone ki-crown fs-3x text-primary">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        <i v-else class="ki-duotone ki-shield-tick fs-3x text-primary">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                      </div>
                      <h3 class="fw-bold mb-2 pricing-text-primary">{{ plan.Name }}</h3>
                      <div class="pricing-price mb-3">
                        <span class="fs-2x fw-bolder pricing-text-primary">€{{ plan.Price }}</span>
                        <span class="fs-6 fw-semibold pricing-text-secondary">/{{ plan.BillingPeriod === 'monthly' ? 'mese' : 'anno' }}</span>
                      </div>
                      <p class="fs-7 mb-0 pricing-text-secondary" style="min-height: 60px; line-height: 1.5;">
                        {{ plan.Description ? plan.Description.substring(0, 100) + (plan.Description.length > 100 ? '...' : '') : 'Piano di abbonamento' }}
                      </p>
                    </div>
                    
                    <div class="flex-grow-1 mb-7">
                      <div class="pricing-features">
                        <!-- Features dinamiche dal database -->
                        <div v-for="feature in plan.Features" :key="feature.Id" class="pricing-feature mb-4">
                          <i class="ki-duotone ki-check-circle fs-2 text-success me-2">
                            <span class="path1"></span>
                            <span class="path2"></span>
                          </i>
                          <span class="fw-semibold pricing-text-primary">
                            {{ feature.Description }}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button 
                      @click="selectPlan(plan.Name.toLowerCase())"
                      class="btn btn-lg w-100 pricing-btn"
                      :class="index === 1 ? 'btn-primary' : 'btn-light-primary'"
                    >
                      <span class="fw-bold">Seleziona {{ plan.Name }}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Multi-Month Grid (mostrata quando si seleziona un piano mensile) -->
            <div v-else-if="showMultiMonthGrid" class="row g-4 mb-10">
              <div class="col-12 mb-6">
                <div class="d-flex align-items-center justify-content-between">
                  <h3 class="fw-bold pricing-text-primary mb-0">
                    Scegli la durata per {{ selectedBasePlanName }}
                  </h3>
                  <button 
                    @click="cancelMultiMonthSelection" 
                    class="btn btn-sm btn-light"
                  >
                    <i class="ki-duotone ki-arrow-left fs-2">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    Indietro
                  </button>
                </div>
              </div>
              
              <!-- Grid con 4 card: 1 mese, 3 mesi, 6 mesi, 12 mesi -->
              <div v-for="(durationPlan, index) in multiMonthPlans" :key="durationPlan.Id" class="col-lg-3 col-md-6">
                <div 
                  class="card pricing-card h-100 shadow-sm hover-elevate-up cursor-pointer"
                  :class="{ 'pricing-card-featured shadow-lg border-primary': selectedDurationPlan?.Id === durationPlan.Id }"
                  @click="selectDurationPlan(durationPlan)"
                  style="transition: all 0.3s ease;"
                >
                  <!-- Badge sconto se presente -->
                  <div v-if="durationPlan.discountPercent > 0" class="pricing-badge">
                    <span class="badge badge-success">Risparmia {{ durationPlan.discountPercent }}%</span>
                  </div>
                  
                  <div class="card-body d-flex flex-column p-6 text-center">
                    <h4 class="fw-bold mb-3 pricing-text-primary">{{ durationPlan.durationLabel }}</h4>
                    <div class="pricing-price mb-3">
                      <span class="fs-2x fw-bolder pricing-text-primary">€{{ durationPlan.Price }}</span>
                      <span v-if="durationPlan.months === 1" class="fs-6 fw-semibold pricing-text-secondary">/mese</span>
                    </div>
                    <div v-if="durationPlan.months > 1" class="mb-3">
                      <span class="fs-7 pricing-text-secondary">
                        €{{ (durationPlan.Price / durationPlan.months).toFixed(2) }}/mese
                      </span>
                    </div>
                    <div v-if="durationPlan.originalPrice && durationPlan.originalPrice > durationPlan.Price" class="mb-2">
                      <span class="fs-7 text-muted text-decoration-line-through">
                        €{{ durationPlan.originalPrice.toFixed(2) }}
                      </span>
                    </div>
                    <button 
                      class="btn btn-lg w-100 mt-auto"
                      :class="selectedDurationPlan?.Id === durationPlan.Id ? 'btn-primary' : 'btn-light-primary'"
                    >
                      <span class="fw-bold">Seleziona</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Payment Section -->
            <div class="row" v-if="selectedPlan">
              <div class="col-12">
                <div class="card shadow-sm">
                  <div class="card-header border-0 pt-6 pb-4" style="background: linear-gradient(135deg, rgba(0, 119, 204, 0.1) 0%, rgba(0, 119, 204, 0.05) 100%);">
                    <div class="card-title">
                      <h3 class="fw-bold mb-0 pricing-text-primary">
                        <i class="ki-duotone ki-credit-cart fs-2 me-2 text-primary">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        Completa il pagamento
                      </h3>
                    </div>
                    <div class="card-toolbar">
                      <button 
                        @click="cancelPayment" 
                        class="btn btn-sm btn-light-danger"
                      >
                        <i class="ki-duotone ki-arrow-left fs-2">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        Indietro
                      </button>
                    </div>
                  </div>
                  <div class="card-body p-8">
                    <!-- Upgrade Credit Breakdown -->
                    <div v-if="selectedPlan && upgradeCreditCalculation" class="payment-summary mb-8 p-6 rounded" style="background: linear-gradient(135deg, rgba(0, 119, 204, 0.1) 0%, rgba(0, 119, 204, 0.05) 100%);">
                      <div v-if="upgradeCreditCalculation.CreditAmount > 0" class="mb-2">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                          <span class="pricing-text-secondary">Prezzo nuovo piano:</span>
                          <span class="fw-semibold pricing-text-primary">€{{ upgradeCreditCalculation.OriginalAmount?.toFixed(2) || getPlanPrice(selectedPlan).toFixed(2) }}</span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mb-2">
                          <span class="pricing-text-secondary">
                            <i class="ki-duotone ki-check-circle fs-5 text-success me-1">
                              <span class="path1"></span>
                              <span class="path2"></span>
                            </i>
                            Credito residuo ({{ upgradeCreditCalculation.DaysRemaining }} giorni):
                          </span>
                          <span class="fw-semibold text-success">-€{{ upgradeCreditCalculation.CreditAmount?.toFixed(2) || '0.00' }}</span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center pt-2 border-top">
                          <span class="fw-bold pricing-text-primary">Totale da pagare:</span>
                          <span class="fs-3 fw-bolder text-primary">€{{ upgradeCreditCalculation.FinalAmount?.toFixed(2) || getPlanPrice(selectedPlan).toFixed(2) }}</span>
                        </div>
                      </div>
                      <div v-else class="mb-2">
                        <div class="d-flex justify-content-between align-items-center">
                          <span class="fw-bold pricing-text-primary">Totale da pagare:</span>
                          <span class="fs-3 fw-bolder text-primary">€{{ getPlanPrice(selectedPlan).toFixed(2) }}</span>
                        </div>
                      </div>
                      <p v-if="upgradeCreditCalculation.CreditAmount > 0" class="fs-8 text-muted mb-0 mt-3">
                        <i class="ki-duotone ki-information-5 fs-6 me-1">
                          <span class="path1"></span>
                          <span class="path2"></span>
                          <span class="path3"></span>
                        </i>
                        Il credito del tuo abbonamento attuale è stato applicato all'importo.
                      </p>
                    </div>

                    <!-- Stripe Payment Element -->
                    <div class="payment-form">
                      <div id="payment-element-modal" class="mb-6">
                        <!-- Stripe.js injects the Payment Element here -->
                      </div>

                      <div id="payment-message-modal" class="alert alert-danger d-none mb-6"></div>

                      <button 
                        id="submit-button-modal" 
                        @click="handleSubmit"
                        :disabled="isProcessing"
                        class="btn btn-lg btn-primary w-100"
                        style="background: linear-gradient(135deg, #0077CC 0%, #0077CC 100%); border: none;"
                      >
                        <span v-if="!isProcessing" class="fw-bold">
                          <i class="ki-duotone ki-lock fs-2 me-2">
                            <span class="path1"></span>
                            <span class="path2"></span>
                          </i>
                          Paga in sicurezza
                        </span>
                        <span v-else class="fw-bold">
                          <span class="spinner-border spinner-border-sm me-2"></span>
                          Elaborazione...
                        </span>
                      </button>

                      <div class="text-center mt-4">
                        <p class="fs-7 mb-0 pricing-text-secondary">
                          <i class="ki-duotone ki-shield-tick fs-5 text-success me-1">
                            <span class="path1"></span>
                            <span class="path2"></span>
                          </i>
                          Pagamento sicuro gestito da Stripe
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <!-- End verified content -->
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, onMounted } from 'vue';
import { loadStripe } from '@stripe/stripe-js';
import type { Stripe, StripeElements } from '@stripe/stripe-js';
import { createPaymentIntent, calculateUpgradeCredit, type UpgradeCreditCalculationResponse } from '@/core/data/billing';
import { getActivePlans, type SubscriptionPlan } from '@/core/data/subscription-plans';
import { checkDowngradeCompatibility, type DowngradeCompatibilityResponse } from '@/core/data/subscription-limits';
import { getCurrentSubscription, type UserSubscription } from '@/core/data/subscription';
import { useAuthStore } from '@/stores/auth';
import Swal from 'sweetalert2/dist/sweetalert2.js';

// Importa gli stili
import '@/assets/css/pricing.css';
import '@/assets/css/pricing-modal.css';

export default defineComponent({
  name: 'pricing-modal',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
      default: false
    },
    email: {
      type: String,
      default: ''
    },
    token: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: 'new', // 'new' | 'upgrade' | 'manage'
      validator: (value: string) => ['new', 'upgrade', 'manage'].includes(value)
    },
    currentPlan: {
      type: String,
      default: ''
    },
    userId: {
      type: String,
      default: ''
    },
    autoSelectCurrentPlan: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'success', 'cancel'],
  setup(props, { emit }) {
    const authStore = useAuthStore();
    const selectedPlan = ref<string | null>(null);
    const isProcessing = ref(false);
    const isVerifying = ref(false);
    const isVerified = ref(true); // Start as verified for modal usage
    const isLoadingPlans = ref(true);
    const plans = ref<SubscriptionPlan[]>([]);
    const currentSubscription = ref<UserSubscription | null>(null);
    const upgradeCreditCalculation = ref<UpgradeCreditCalculationResponse | null>(null);
    const showMultiMonthGrid = ref(false);
    const selectedBasePlanName = ref<string>('');
    const selectedDurationPlan = ref<SubscriptionPlan | null>(null);
    let stripe: Stripe | null = null;
    let elements: StripeElements | null = null;

    const displayEmail = computed(() => props.email || 'utente');

    // Filtra solo i piani mensili base (Basic, Pro, Premium) - esclude i prepagati
    const monthlyBasePlans = computed(() => {
      return plans.value.filter(plan => {
        const name = plan.Name.toLowerCase();
        const isBasePlan = (name === 'basic' || name === 'pro' || name === 'premium');
        const isMonthly = plan.BillingPeriod?.toLowerCase() === 'monthly';
        return isBasePlan && isMonthly;
      });
    });

    // Trova i piani correlati (base + prepagati) per un piano mensile
    const getRelatedPlans = (basePlanName: string): SubscriptionPlan[] => {
      const baseName = basePlanName.toLowerCase();
      return plans.value.filter(plan => {
        const planName = plan.Name.toLowerCase();
        // Match esatto o che inizia con il nome base seguito da spazio e numero
        return planName === baseName || 
               planName.startsWith(baseName + ' ') ||
               (baseName === 'basic' && planName.startsWith('basic')) ||
               (baseName === 'pro' && planName.startsWith('pro') && !planName.startsWith('premium')) ||
               (baseName === 'premium' && planName.startsWith('premium'));
      });
    };

    // Prepara i piani multi-mese per la griglia
    const multiMonthPlans = computed(() => {
      if (!selectedBasePlanName.value) return [];
      
      const relatedPlans = getRelatedPlans(selectedBasePlanName.value);
      const basePlan = relatedPlans.find(p => p.Name.toLowerCase() === selectedBasePlanName.value.toLowerCase() && p.BillingPeriod === 'monthly');
      
      if (!basePlan) return [];

      const monthlyPrice = basePlan.Price;
      const result: Array<SubscriptionPlan & { months: number; durationLabel: string; discountPercent: number; originalPrice?: number }> = [];

      // 1 mese (piano base mensile)
      result.push({
        ...basePlan,
        months: 1,
        durationLabel: '1 Mese',
        discountPercent: 0,
        originalPrice: undefined
      });

      // 3 mesi
      const plan3Months = relatedPlans.find(p => 
        p.Name.toLowerCase().includes('3 months') || 
        (p.BillingPeriod === 'quarterly' && p.Name.toLowerCase().startsWith(selectedBasePlanName.value.toLowerCase()))
      );
      if (plan3Months) {
        const originalPrice = monthlyPrice * 3;
        const discount = ((originalPrice - plan3Months.Price) / originalPrice) * 100;
        result.push({
          ...plan3Months,
          months: 3,
          durationLabel: '3 Mesi',
          discountPercent: Math.round(discount),
          originalPrice: originalPrice
        });
      }

      // 6 mesi
      const plan6Months = relatedPlans.find(p => 
        p.Name.toLowerCase().includes('6 months') || 
        (p.BillingPeriod === 'semiannual' && p.Name.toLowerCase().startsWith(selectedBasePlanName.value.toLowerCase()))
      );
      if (plan6Months) {
        const originalPrice = monthlyPrice * 6;
        const discount = ((originalPrice - plan6Months.Price) / originalPrice) * 100;
        result.push({
          ...plan6Months,
          months: 6,
          durationLabel: '6 Mesi',
          discountPercent: Math.round(discount),
          originalPrice: originalPrice
        });
      }

      // 12 mesi
      const plan12Months = relatedPlans.find(p => 
        p.Name.toLowerCase().includes('12 months') || 
        ((p.BillingPeriod === 'annual' || p.BillingPeriod === 'yearly') && p.Name.toLowerCase().startsWith(selectedBasePlanName.value.toLowerCase()))
      );
      if (plan12Months) {
        const originalPrice = monthlyPrice * 12;
        const discount = ((originalPrice - plan12Months.Price) / originalPrice) * 100;
        result.push({
          ...plan12Months,
          months: 12,
          durationLabel: '12 Mesi',
          discountPercent: Math.round(discount),
          originalPrice: originalPrice
        });
      }

      return result;
    });

    // Carica i piani dal database
    const loadPlans = async () => {
      isLoadingPlans.value = true;
      try {
        const activePlans = await getActivePlans();
        // Escludi il piano Free - è solo per trial automatici, non selezionabile
        plans.value = activePlans.filter(plan => plan.Name.toLowerCase() !== 'free');
      } catch (error) {
        console.error('Errore nel caricamento dei piani:', error);
        Swal.fire({
          text: "Errore nel caricamento dei piani di abbonamento. Riprova più tardi.",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        });
      } finally {
        isLoadingPlans.value = false;
      }
    };

    // Carica l'abbonamento corrente
    const loadCurrentSubscription = async () => {
      try {
        currentSubscription.value = await getCurrentSubscription();
      } catch (error) {
        console.error('Errore nel caricamento abbonamento corrente:', error);
        currentSubscription.value = null;
      }
    };

    // Verifica se l'abbonamento è scaduto
    const isSubscriptionExpired = computed(() => {
      if (!currentSubscription.value || !currentSubscription.value.EndDate) {
        return true; // Se non c'è abbonamento o data scadenza, considera scaduto
      }
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const endDate = new Date(currentSubscription.value.EndDate);
      endDate.setHours(0, 0, 0, 0);
      
      return endDate < today || currentSubscription.value.Status?.toLowerCase() === 'expired';
    });

    // Verifica se è un downgrade (nuovo piano costa meno del corrente)
    const isDowngrade = (newPlan: SubscriptionPlan): boolean => {
      if (!currentSubscription.value?.SubscriptionPlan) {
        return false; // Se non c'è abbonamento corrente, non è un downgrade
      }
      
      const currentPlanPrice = currentSubscription.value.SubscriptionPlan.Price || 0;
      const newPlanPrice = newPlan.Price || 0;
      
      return newPlanPrice < currentPlanPrice;
    };

    onMounted(async () => {
      await Promise.all([loadPlans(), loadCurrentSubscription()]);
    });

    // Watch per selezionare automaticamente il piano quando i piani sono caricati
    // e la modale è aperta con autoSelectCurrentPlan
    watch([() => plans.value.length, () => props.isOpen, () => props.autoSelectCurrentPlan], 
      async ([plansLength, isOpen, autoSelect]) => {
        if (isOpen && autoSelect && plansLength > 0 && props.currentPlan && !selectedPlan.value) {
          // Aspetta un momento per assicurarsi che tutto sia pronto
          await new Promise(resolve => setTimeout(resolve, 100));
          await selectPlan(props.currentPlan);
        }
      },
      { immediate: false }
    );

    const selectPlan = async (plan: string) => {
      // Trova il piano selezionato dall'array
      const selectedPlanObj = plans.value.find(p => p.Name.toLowerCase() === plan.toLowerCase());
      if (!selectedPlanObj) {
        Swal.fire({
          text: "Piano selezionato non trovato",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          heightAuto: false,
        });
        return;
      }

      // Se è un piano mensile base (Basic, Pro, Premium), mostra la griglia multi-mese
      const isMonthlyBase = selectedPlanObj.BillingPeriod === 'monthly' && 
                            (selectedPlanObj.Name.toLowerCase() === 'basic' || 
                             selectedPlanObj.Name.toLowerCase() === 'pro' || 
                             selectedPlanObj.Name.toLowerCase() === 'premium');
      
      if (isMonthlyBase) {
        selectedBasePlanName.value = selectedPlanObj.Name;
        showMultiMonthGrid.value = true;
        selectedDurationPlan.value = null;
        return;
      }

      // Per i piani prepagati o altri piani, procedi direttamente al pagamento
      await proceedWithPlanSelection(plan, selectedPlanObj);
    };

    const selectDurationPlan = async (plan: SubscriptionPlan & { months?: number; durationLabel?: string; discountPercent?: number; originalPrice?: number }) => {
      selectedDurationPlan.value = plan;
      
      // Trova il piano completo dall'array plans (per avere tutte le proprietà corrette)
      const fullPlan = plans.value.find(p => p.Id === plan.Id);
      if (!fullPlan) {
        Swal.fire({
          text: "Piano selezionato non trovato",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          heightAuto: false,
        });
        return;
      }
      
      // Procedi direttamente al pagamento
      const planMonths = (plan as any).months;
      selectedPlan.value = fullPlan.Name.toLowerCase();
      showMultiMonthGrid.value = false;
      await proceedWithPlanSelection(fullPlan.Name.toLowerCase(), fullPlan);
    };

    const cancelMultiMonthSelection = () => {
      showMultiMonthGrid.value = false;
      selectedBasePlanName.value = '';
      selectedDurationPlan.value = null;
    };

    const proceedWithPlanSelection = async (plan: string, selectedPlanObj: SubscriptionPlan) => {
      // Carica l'abbonamento corrente se non è già caricato
      if (!currentSubscription.value) {
        await loadCurrentSubscription();
      }

      // Verifica se è un downgrade
      const isDowngradeAttempt = isDowngrade(selectedPlanObj);
      
      // Se è un downgrade E l'abbonamento è ancora attivo (non scaduto), blocca
      if (isDowngradeAttempt && !isSubscriptionExpired.value) {
        const currentPlanName = currentSubscription.value?.SubscriptionPlan?.Name || 'attuale';
        const endDate = currentSubscription.value?.EndDate 
          ? new Date(currentSubscription.value.EndDate).toLocaleDateString('it-IT')
          : 'N/A';
        
        Swal.fire({
          title: '<div class="text-warning"><i class="ki-duotone ki-information-5 fs-2x me-2"><span class="path1"></span><span class="path2"></span><span class="path3"></span></i> Downgrade Non Disponibile</div>',
          html: `
            <div class="text-start">
              <p class="mb-4 pricing-text-primary">
                Non puoi fare il downgrade mentre il tuo abbonamento è ancora attivo.
              </p>
              <div class="bg-light-warning p-4 rounded mb-4">
                <div class="d-flex align-items-center mb-2">
                  <i class="ki-duotone ki-crown fs-2 text-warning me-3">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <div>
                    <div class="fw-bold pricing-text-primary">Piano Attuale: ${currentPlanName}</div>
                    <div class="fs-7 pricing-text-secondary">Scadenza: ${endDate}</div>
                  </div>
                </div>
              </div>
              <p class="mb-0 pricing-text-secondary fs-7">
                <strong>Nota:</strong> Puoi cambiare piano solo quando l'abbonamento è scaduto. 
                Al momento della scadenza, potrai scegliere qualsiasi piano disponibile (rispettando i requisiti).
              </p>
            </div>
          `,
          icon: 'warning',
          confirmButtonText: 'Ho capito',
          buttonsStyling: false,
          heightAuto: false,
          customClass: {
            confirmButton: 'btn btn-primary fw-bold',
            popup: 'text-start'
          },
          width: '600px'
        });
        return;
      }

      // Verifica i requisiti del piano in questi casi:
      // 1. Se l'abbonamento è scaduto (indipendentemente da upgrade/downgrade)
      // 2. Se è un downgrade (anche se l'abbonamento è ancora attivo, ma questo caso è già gestito sopra)
      // Se è un upgrade e l'abbonamento è attivo, non serve verificare (i limiti aumentano)
      const needsCompatibilityCheck = isSubscriptionExpired.value || isDowngradeAttempt;
      
      if (needsCompatibilityCheck) {
        try {
          Swal.fire({
            title: "Verifica compatibilità...",
            text: "Stiamo verificando se il cambio piano è possibile",
            icon: "info",
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            heightAuto: false,
            didOpen: () => {
              Swal.showLoading();
            }
          });

          const compatibility = await checkDowngradeCompatibility(selectedPlanObj.Id);

          Swal.close();

          // Se i requisiti non sono rispettati, mostra la modale di warning
          if (!compatibility.canDowngrade) {
            showDowngradeWarningModal(compatibility, selectedPlanObj);
            return;
          }

          // Se i requisiti sono rispettati, procedi normalmente
          selectedPlan.value = plan;
          
          // Calcola il credito per upgrade (se applicabile)
          await calculateCreditForPlan(plan);
          
          // Initialize Stripe after plan selection
          setTimeout(async () => {
            await initializeStripe();
          }, 100);
        } catch (error: any) {
          Swal.close();
          console.error('Errore nella verifica compatibilità:', error);
          // In caso di errore, procedi comunque (non bloccare l'utente)
          selectedPlan.value = plan;
          
          // Calcola il credito per upgrade (se applicabile)
          await calculateCreditForPlan(plan);
          
          setTimeout(async () => {
            await initializeStripe();
          }, 100);
        }
      } else {
        // Upgrade con abbonamento attivo: procedi senza verifiche (i limiti aumentano)
        selectedPlan.value = plan;
        
        // Calcola il credito per upgrade (se applicabile)
        await calculateCreditForPlan(plan);
        
        // Initialize Stripe after plan selection
        setTimeout(async () => {
          await initializeStripe();
        }, 100);
      }
    };

    const showDowngradeWarningModal = (compatibility: DowngradeCompatibilityResponse, plan: SubscriptionPlan) => {
      // Costruisci l'HTML della modale con il confronto features
      let featuresHtml = '<div style="text-align: left; margin-top: 1rem;">';
      
      compatibility.features.forEach((feature) => {
        const limitText = feature.newPlanLimit === null ? 'Illimitato' : feature.newPlanLimit.toString();
        const statusIcon = feature.isExceeded 
          ? '<i class="ki-duotone ki-cross-circle fs-2 text-danger me-2"><span class="path1"></span><span class="path2"></span></i>'
          : '<i class="ki-duotone ki-check-circle fs-2 text-success me-2"><span class="path1"></span><span class="path2"></span></i>';
        const statusClass = feature.isExceeded ? 'text-danger' : 'text-success';
        
        featuresHtml += `
          <div class="d-flex align-items-center mb-4 p-3 ${feature.isExceeded ? 'bg-light-danger rounded' : ''}" style="border-left: 4px solid ${feature.isExceeded ? '#f1416c' : '#50cd89'};">
            ${statusIcon}
            <div class="flex-grow-1">
              <div class="fw-bold mb-1 pricing-text-primary">${feature.featureDisplayName}</div>
              <div class="fs-7 ${statusClass}">
                <strong>Limite nuovo piano:</strong> ${limitText} | 
                <strong>Utilizzo attuale:</strong> ${feature.currentUsage}
                ${feature.isExceeded ? ` <span class="text-danger fw-bold">(Superato di ${feature.currentUsage - (feature.newPlanLimit || 0)})</span>` : ''}
              </div>
            </div>
          </div>
        `;
      });
      
      featuresHtml += '</div>';

      // Determina il titolo in base allo stato dell'abbonamento
      const isExpired = isSubscriptionExpired.value;
      const titleText = isExpired 
        ? 'Requisiti Non Rispettati' 
        : 'Downgrade Non Possibile';
      const mainMessage = isExpired
        ? `Non puoi sottoscrivere il piano <strong>${plan.Name}</strong> perché hai ${compatibility.exceededLimitsCount} limite/i superato/i rispetto ai requisiti del piano.`
        : `Non puoi passare al piano <strong>${plan.Name}</strong> perché hai ${compatibility.exceededLimitsCount} limite/i superato/i.`;

      Swal.fire({
        title: `<div class="text-danger"><i class="ki-duotone ki-information-5 fs-2x me-2"><span class="path1"></span><span class="path2"></span></i> ${titleText}</div>`,
        html: `
          <div class="text-start">
            <p class="mb-4 pricing-text-primary">
              ${mainMessage}
            </p>
            <p class="mb-4 pricing-text-secondary">
              <strong>Elimina alcune risorse prima di procedere:</strong>
            </p>
            ${featuresHtml}
            <p class="mt-4 pricing-text-secondary fs-7">
              ${compatibility.message || (isExpired 
                ? 'Riduci il numero di risorse utilizzate per poter sottoscrivere questo piano.' 
                : 'Riduci il numero di risorse utilizzate per poter fare il downgrade.')}
            </p>
          </div>
        `,
        icon: 'warning',
        confirmButtonText: 'Ho capito',
        buttonsStyling: false,
        heightAuto: false,
        customClass: {
          confirmButton: 'btn btn-primary fw-bold',
          popup: 'text-start'
        },
        width: '600px'
      });
    };

    const calculateCreditForPlan = async (planName: string) => {
      try {
        // Solo se l'utente è autenticato
        if (!authStore.user?.Email) {
          upgradeCreditCalculation.value = null;
          return;
        }

        const calculation = await calculateUpgradeCredit(planName);
        upgradeCreditCalculation.value = calculation;
      } catch (error: any) {
        // In caso di errore, nascondi il breakdown ma non bloccare il flusso
        upgradeCreditCalculation.value = null;
      }
    };

    const cancelPayment = () => {
      selectedPlan.value = null;
      upgradeCreditCalculation.value = null;
      showMultiMonthGrid.value = false;
      selectedBasePlanName.value = '';
      selectedDurationPlan.value = null;
      stripe = null;
      elements = null;
    };

    const handleClose = () => {
      if (!isProcessing.value) {
        emit('close');
      }
    };

    const getPlanPrice = (planName: string): number => {
      const plan = plans.value.find(p => p.Name.toLowerCase() === planName.toLowerCase());
      return plan ? Number(plan.Price) : 0;
    };

    const getPlanDescription = (planName: string): string => {
      const plan = plans.value.find(p => p.Name.toLowerCase() === planName.toLowerCase());
      return plan?.Description || '';
    };

    const getPlanById = (planId: number): SubscriptionPlan | undefined => {
      return plans.value.find(p => p.Id === planId);
    };

    const getPlanByName = (planName: string): SubscriptionPlan | undefined => {
      return plans.value.find(p => p.Name.toLowerCase() === planName.toLowerCase());
    };



    const initializeStripe = async () => {
      try {
        const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51SHzsSAgB3yYA7UTCqLukEvta52GEgLfLrtBk0b2EpSOaGfSvJq3Fxt0s92TvNOBuzZV6UamEf6oEOOsvploebJW00BXjVNBBL';
        
        stripe = await loadStripe(publishableKey);

        if (!stripe) {
          console.error('Stripe failed to load');
          showMessage('Errore nel caricamento di Stripe. Riprova più tardi.');
          return;
        }

        const clientSecret = await fetchClientSecret();
        
        const appearance = {
          theme: 'stripe' as const,
          variables: {
            colorPrimary: '#0077CC', // accent_principale
            colorBackground: '#FFFFFF', // sfondo_principale light
            colorText: '#333333', // testo_principale light
            colorDanger: '#f1416c',
            fontFamily: 'Inter, sans-serif',
            spacingUnit: '4px',
            borderRadius: '8px',
          },
        };

        elements = stripe.elements({ 
          clientSecret,
          appearance 
        });

        const paymentElement = elements.create('payment');
        paymentElement.mount('#payment-element-modal');

      } catch (error) {
        console.error('Error initializing Stripe:', error);
        showMessage('Errore nell\'inizializzazione del pagamento. Riprova più tardi.');
      }
    };

    const fetchClientSecret = async (): Promise<string> => {
      try {
        const paymentIntent = await createPaymentIntent({
          plan: selectedPlan.value as string,
          amount: getPlanPrice(selectedPlan.value as string) * 100,
          currency: 'eur',
          email: props.email
        });
        
        if (!paymentIntent || !paymentIntent.ClientSecret) {
          throw new Error('Risposta non valida dal server');
        }
        
        return paymentIntent.ClientSecret;
      } catch (error: any) {
        console.error('Error fetching client secret:', error);
        const errorMessage = error?.response?.data?.message || error?.message || 'Impossibile creare il pagamento';
        showMessage(`Errore: ${errorMessage}`);
        throw new Error(errorMessage);
      }
    };

    const handleSubmit = async () => {
      if (!stripe || !elements) {
        return;
      }

      isProcessing.value = true;

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          receipt_email: props.email,
        },
        redirect: 'if_required' // Evita il redirect automatico
      });

      if (error) {
        showMessage(error.message || 'Si è verificato un errore durante il pagamento.');
        isProcessing.value = false;
      } else {
        // Pagamento completato con successo
        isProcessing.value = false;
        
        // Mostra messaggio di aggiornamento in corso
        Swal.fire({
          title: "Pagamento completato!",
          text: "Stiamo aggiornando il tuo abbonamento, attendi qualche secondo...",
          icon: "success",
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          heightAuto: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        // Attendi che il webhook processi il pagamento e aggiorna il token
        setTimeout(async () => {
          try {
            await authStore.refreshToken();
          } catch (error) {
            console.warn('Errore durante l\'aggiornamento del token:', error);
            // Non bloccare il flow anche se l'aggiornamento del token fallisce
          }
          
          // Chiudi il loading - i componenti si aggiorneranno automaticamente
          Swal.close();
        }, 3000);
        
        emit('success');
      }
    };

    const showMessage = (messageText: string) => {
      const messageContainer = document.querySelector('#payment-message-modal');
      if (messageContainer) {
        messageContainer.classList.remove('d-none');
        messageContainer.textContent = messageText;

        setTimeout(() => {
          messageContainer.classList.add('d-none');
          messageContainer.textContent = '';
        }, 4000);
      }
    };

    // Watch for modal open to reload subscription
    watch(() => props.isOpen, async (newVal) => {
      if (newVal) {
        // Ricarica i piani e l'abbonamento corrente quando si apre la modale
        await Promise.all([loadPlans(), loadCurrentSubscription()]);
        
        // Se deve selezionare automaticamente il piano e i piani sono già disponibili
        if (props.autoSelectCurrentPlan && props.currentPlan && plans.value.length > 0) {
          // Aspetta un momento per assicurarsi che tutto sia pronto
          await new Promise(resolve => setTimeout(resolve, 200));
          await selectPlan(props.currentPlan);
        }
      } else {
        selectedPlan.value = null;
        upgradeCreditCalculation.value = null;
        showMultiMonthGrid.value = false;
        selectedBasePlanName.value = '';
        selectedDurationPlan.value = null;
        isProcessing.value = false;
        stripe = null;
        elements = null;
      }
    });

    // Prevent body scroll when modal is open
    watch(() => props.isOpen, (newVal) => {
      if (newVal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    return {
      selectedPlan,
      isProcessing,
      isVerifying,
      isVerified,
      isLoadingPlans,
      plans,
      displayEmail,
      upgradeCreditCalculation,
      monthlyBasePlans,
      showMultiMonthGrid,
      selectedBasePlanName,
      selectedDurationPlan,
      multiMonthPlans,
      selectPlan,
      selectDurationPlan,
      cancelMultiMonthSelection,
      cancelPayment,
      handleClose,
      getPlanPrice,
      getPlanDescription,
      getPlanById,
      getPlanByName,
      handleSubmit,
    };
  },
});
</script>


