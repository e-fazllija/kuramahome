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
            <h3 class="fw-bold text-gray-900 mb-2">Verifica in corso...</h3>
            <p class="text-muted fs-5">Stiamo verificando il tuo indirizzo email</p>
          </div>

          <!-- Content (shown only after verification) -->
          <div v-if="!isVerifying && isVerified">
            <!-- Header Section -->
            <div class="text-center mb-10">
              <div class="symbol symbol-60px mx-auto mb-5">
                <span class="symbol-label" style="background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%); box-shadow: 0 4px 20px rgba(54, 153, 255, 0.4);">
                  <i class="ki-duotone ki-dollar fs-2x text-white">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                  </i>
                </span>
              </div>
              <h1 class="fw-bolder text-gray-900 mb-3 fs-2x">Scegli il piano perfetto per te</h1>
              <p class="text-muted fs-5 fw-semibold">Benvenuto <span class="text-primary">{{ displayEmail }}</span>! Seleziona il piano che meglio si adatta alle tue esigenze</p>
            </div>

            <!-- Loading State -->
            <div v-if="isLoadingPlans" class="text-center py-20">
              <div class="spinner-border text-primary mb-5" role="status" style="width: 3rem; height: 3rem;">
                <span class="visually-hidden">Caricamento piani...</span>
              </div>
              <h3 class="fw-bold text-gray-900 mb-2">Caricamento piani di abbonamento...</h3>
            </div>

            <!-- Pricing Cards -->
            <div v-else-if="!selectedPlan" class="row g-5 mb-10">
              <!-- Dynamic Plan Cards -->
              <div v-for="(plan, index) in plans" :key="plan.Id" class="col-lg-4">
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
                      <h3 class="fw-bold text-gray-900 mb-2">{{ plan.Name }}</h3>
                      <div class="pricing-price mb-3">
                        <span class="fs-2x fw-bolder text-gray-900">€{{ plan.Price }}</span>
                        <span class="fs-6 text-muted fw-semibold">/{{ plan.BillingPeriod === 'monthly' ? 'mese' : 'anno' }}</span>
                      </div>
                      <p class="text-muted fs-7 mb-0" style="min-height: 60px; line-height: 1.5;">
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
                          <span class="fw-semibold text-gray-700">{{ feature.FeatureName }}</span>
                        </div>
                        
                        <!-- Info aggiuntive se presenti -->
                        <div v-if="plan.MaxProperties" class="pricing-feature mb-4">
                          <i class="ki-duotone ki-check-circle fs-2 text-success me-2">
                            <span class="path1"></span>
                            <span class="path2"></span>
                          </i>
                          <span class="fw-semibold text-gray-700">
                            {{ plan.MaxProperties === -1 ? 'Immobili illimitati' : `Fino a ${plan.MaxProperties} immobili` }}
                          </span>
                        </div>
                        
                        <div v-if="plan.MaxUsers" class="pricing-feature mb-4">
                          <i class="ki-duotone ki-check-circle fs-2 text-success me-2">
                            <span class="path1"></span>
                            <span class="path2"></span>
                          </i>
                          <span class="fw-semibold text-gray-700">
                            {{ plan.MaxUsers === -1 ? 'Utenti illimitati' : `Fino a ${plan.MaxUsers} utenti` }}
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

            <!-- Payment Section -->
            <div class="row" v-if="selectedPlan">
              <div class="col-12">
                <div class="card shadow-sm">
                  <div class="card-header border-0 pt-6 pb-4" style="background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%);">
                    <div class="card-title">
                      <h3 class="fw-bold text-gray-900 mb-0">
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
                    <!-- Selected Plan Summary -->
                    <div class="payment-summary mb-8 p-6 rounded" style="background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%);">
                      <div class="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <h4 class="fw-bold text-gray-900 mb-1">Piano {{ selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1) }}</h4>
                          <p class="text-muted mb-0">{{ getPlanDescription(selectedPlan) }}</p>
                        </div>
                        <div class="text-end">
                          <div class="fs-1 fw-bolder text-primary">€{{ getPlanPrice(selectedPlan) }}</div>
                          <span class="text-muted fs-7">/mese</span>
                        </div>
                      </div>
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
                        style="background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%); border: none;"
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
                        <p class="text-muted fs-7 mb-0">
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
import { createPaymentIntent } from '@/core/data/billing';
import { getActivePlans, type SubscriptionPlan } from '@/core/data/subscription-plans';
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
    }
  },
  emits: ['close', 'success', 'cancel'],
  setup(props, { emit }) {
    const selectedPlan = ref<string | null>(null);
    const isProcessing = ref(false);
    const isVerifying = ref(false);
    const isVerified = ref(true); // Start as verified for modal usage
    const isLoadingPlans = ref(true);
    const plans = ref<SubscriptionPlan[]>([]);
    let stripe: Stripe | null = null;
    let elements: StripeElements | null = null;

    const displayEmail = computed(() => props.email || 'utente');

    // Carica i piani dal database
    const loadPlans = async () => {
      isLoadingPlans.value = true;
      try {
        const activePlans = await getActivePlans();
        plans.value = activePlans;
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

    onMounted(() => {
      loadPlans();
    });

    const selectPlan = async (plan: string) => {
      selectedPlan.value = plan;
      
      // Initialize Stripe after plan selection
      setTimeout(async () => {
        await initializeStripe();
      }, 100);
    };

    const cancelPayment = () => {
      selectedPlan.value = null;
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
            colorPrimary: '#3699ff',
            colorBackground: '#ffffff',
            colorText: '#3f4254',
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
        // Il webhook gestirà la creazione dell'abbonamento
        isProcessing.value = false;
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

    // Watch for modal close to reset state
    watch(() => props.isOpen, (newVal) => {
      if (!newVal) {
        selectedPlan.value = null;
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
      selectPlan,
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


