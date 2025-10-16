<template>
  <div class="pricing-page-wrapper">
    <div class="container-fluid px-4 px-lg-8 px-xl-12">
      
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
          <h1 class="fw-bolder text-gray-900 mb-3">Scegli il piano perfetto per te</h1>
          <p class="text-muted fs-5 fw-semibold">Benvenuto <span class="text-primary">{{ userEmail }}</span>! Seleziona il piano che meglio si adatta alle tue esigenze</p>
        </div>

        <!-- Pricing Cards -->
        <div class="row g-5 mb-10" v-if="!selectedPlan">
        <!-- Basic Plan -->
        <div class="col-lg-4">
          <div class="card pricing-card h-100 shadow-sm hover-elevate-up">
            <div class="card-body d-flex flex-column p-8">
              <div class="text-center mb-7">
                <div class="pricing-icon-wrapper mb-5">
                  <i class="ki-duotone ki-rocket fs-3x text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                </div>
                <h3 class="fw-bold text-gray-900 mb-2">Basic</h3>
                <div class="pricing-price mb-3">
                  <span class="fs-2x fw-bolder text-gray-900">€19</span>
                  <span class="fs-6 text-muted fw-semibold">/mese</span>
                </div>
                <p class="text-muted fs-7">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
              </div>
              
              <div class="flex-grow-1 mb-7">
                <div class="pricing-features">
                  <div class="pricing-feature mb-4">
                    <i class="ki-duotone ki-check-circle fs-2 text-success me-2">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span class="fw-semibold text-gray-700">Fino a 10 immobili</span>
                  </div>
                  <div class="pricing-feature mb-4">
                    <i class="ki-duotone ki-check-circle fs-2 text-success me-2">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span class="fw-semibold text-gray-700">Supporto email</span>
                  </div>
                  <div class="pricing-feature mb-4">
                    <i class="ki-duotone ki-check-circle fs-2 text-success me-2">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span class="fw-semibold text-gray-700">Dashboard base</span>
                  </div>
                  <div class="pricing-feature mb-4">
                    <i class="ki-duotone ki-check-circle fs-2 text-success me-2">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span class="fw-semibold text-gray-700">Gestione clienti</span>
                  </div>
                </div>
              </div>

              <button 
                @click="selectPlan('basic')"
                class="btn btn-lg btn-light-primary w-100 pricing-btn"
              >
                <span class="fw-bold">Seleziona Basic</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Pro Plan -->
        <div class="col-lg-4">
          <div class="card pricing-card pricing-card-featured h-100 shadow-lg hover-elevate-up">
            <div class="pricing-badge">
              <span class="badge badge-primary">Consigliato</span>
            </div>
            <div class="card-body d-flex flex-column p-8">
              <div class="text-center mb-7">
                <div class="pricing-icon-wrapper mb-5">
                  <i class="ki-duotone ki-crown fs-3x text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                </div>
                <h3 class="fw-bold text-gray-900 mb-2">Pro</h3>
                <div class="pricing-price mb-3">
                  <span class="fs-2x fw-bolder text-gray-900">€49</span>
                  <span class="fs-6 text-muted fw-semibold">/mese</span>
                </div>
                <p class="text-muted fs-7">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
              </div>
              
              <div class="flex-grow-1 mb-7">
                <div class="pricing-features">
                  <div class="pricing-feature mb-4">
                    <i class="ki-duotone ki-check-circle fs-2 text-success me-2">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span class="fw-semibold text-gray-700">Immobili illimitati</span>
                  </div>
                  <div class="pricing-feature mb-4">
                    <i class="ki-duotone ki-check-circle fs-2 text-success me-2">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span class="fw-semibold text-gray-700">Supporto prioritario</span>
                  </div>
                  <div class="pricing-feature mb-4">
                    <i class="ki-duotone ki-check-circle fs-2 text-success me-2">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span class="fw-semibold text-gray-700">Dashboard avanzata</span>
                  </div>
                  <div class="pricing-feature mb-4">
                    <i class="ki-duotone ki-check-circle fs-2 text-success me-2">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span class="fw-semibold text-gray-700">Report personalizzati</span>
                  </div>
                  <div class="pricing-feature mb-4">
                    <i class="ki-duotone ki-check-circle fs-2 text-success me-2">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span class="fw-semibold text-gray-700">API access</span>
                  </div>
                </div>
              </div>

              <button 
                @click="selectPlan('pro')"
                class="btn btn-lg btn-primary w-100 pricing-btn"
              >
                <span class="fw-bold">Seleziona Pro</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Premium Plan -->
        <div class="col-lg-4">
          <div class="card pricing-card h-100 shadow-sm hover-elevate-up">
            <div class="card-body d-flex flex-column p-8">
              <div class="text-center mb-7">
                <div class="pricing-icon-wrapper mb-5">
                  <i class="ki-duotone ki-shield-tick fs-3x text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                </div>
                <h3 class="fw-bold text-gray-900 mb-2">Premium</h3>
                <div class="pricing-price mb-3">
                  <span class="fs-2x fw-bolder text-gray-900">€99</span>
                  <span class="fs-6 text-muted fw-semibold">/mese</span>
                </div>
                <p class="text-muted fs-7">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
              </div>
              
              <div class="flex-grow-1 mb-7">
                <div class="pricing-features">
                  <div class="pricing-feature mb-4">
                    <i class="ki-duotone ki-check-circle fs-2 text-success me-2">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span class="fw-semibold text-gray-700">Tutto di Pro</span>
                  </div>
                  <div class="pricing-feature mb-4">
                    <i class="ki-duotone ki-check-circle fs-2 text-success me-2">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span class="fw-semibold text-gray-700">Supporto 24/7</span>
                  </div>
                  <div class="pricing-feature mb-4">
                    <i class="ki-duotone ki-check-circle fs-2 text-success me-2">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span class="fw-semibold text-gray-700">Account manager dedicato</span>
                  </div>
                  <div class="pricing-feature mb-4">
                    <i class="ki-duotone ki-check-circle fs-2 text-success me-2">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span class="fw-semibold text-gray-700">White label</span>
                  </div>
                  <div class="pricing-feature mb-4">
                    <i class="ki-duotone ki-check-circle fs-2 text-success me-2">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span class="fw-semibold text-gray-700">Personalizzazione completa</span>
                  </div>
                  <div class="pricing-feature mb-4">
                    <i class="ki-duotone ki-check-circle fs-2 text-success me-2">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span class="fw-semibold text-gray-700">Training personalizzato</span>
                  </div>
                </div>
              </div>

              <button 
                @click="selectPlan('premium')"
                class="btn btn-lg btn-light-primary w-100 pricing-btn"
              >
                <span class="fw-bold">Seleziona Premium</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Payment Section -->
      <div class="row" v-if="selectedPlan">
        <div class="col-lg-8 mx-auto">
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
                  <i class="ki-duotone ki-cross fs-2">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Annulla
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
                <div id="payment-element" class="mb-6">
                  <!-- Stripe.js injects the Payment Element here -->
                </div>

                <div id="payment-message" class="alert alert-danger d-none mb-6"></div>

                <button 
                  id="submit-button" 
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
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { loadStripe } from '@stripe/stripe-js';
import type { Stripe, StripeElements } from '@stripe/stripe-js';
import { createPaymentIntent } from '@/core/data/billing';
import { useAuthStore } from '@/stores/auth';
import Swal from 'sweetalert2/dist/sweetalert2.js';

// Importa gli stili della pagina pricing
import '@/assets/css/pricing.css';

export default defineComponent({
  name: 'pricing-page',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useAuthStore();
    
    const selectedPlan = ref<string | null>(null);
    const isProcessing = ref(false);
    const isVerifying = ref(true);
    const isVerified = ref(false);
    const userEmail = ref<string>('');
    let stripe: Stripe | null = null;
    let elements: StripeElements | null = null;

    const planPrices = {
      basic: 19,
      pro: 49,
      premium: 99
    };

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

    const getPlanPrice = (plan: string): number => {
      return planPrices[plan as keyof typeof planPrices] || 0;
    };

    const getPlanDescription = (plan: string): string => {
      const descriptions = {
        basic: 'Perfetto per iniziare',
        pro: 'La scelta migliore per professionisti',
        premium: 'Soluzioni aziendali complete'
      };
      return descriptions[plan as keyof typeof descriptions] || '';
    };

    const initializeStripe = async () => {
      try {
        // Publishable Key di Stripe (deve corrispondere alla secret key nel backend)
        // In produzione, considera di usare una variabile d'ambiente
        const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51SHzsSAgB3yYA7UTCqLukEvta52GEgLfLrtBk0b2EpSOaGfSvJq3Fxt0s92TvNOBuzZV6UamEf6oEOOsvploebJW00BXjVNBBL';
        
        stripe = await loadStripe(publishableKey);

        if (!stripe) {
          console.error('Stripe failed to load');
          showMessage('Errore nel caricamento di Stripe. Riprova più tardi.');
          return;
        }

        // Chiama il backend per creare un PaymentIntent
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
        paymentElement.mount('#payment-element');

      } catch (error) {
        console.error('Error initializing Stripe:', error);
        showMessage('Errore nell\'inizializzazione del pagamento. Riprova più tardi.');
      }
    };

    const fetchClientSecret = async (): Promise<string> => {
      try {
        // Chiamata al backend per creare il Payment Intent
        const paymentIntent = await createPaymentIntent({
          plan: selectedPlan.value as string,
          amount: getPlanPrice(selectedPlan.value as string) * 100, // Stripe usa i centesimi
          currency: 'eur',
          email: userEmail.value // Invia l'email dell'utente verificato
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
          return_url: `${window.location.origin}/#/sign-in?payment=success&email=${encodeURIComponent(userEmail.value)}`,
          receipt_email: userEmail.value,
        },
      });

      if (error) {
        showMessage(error.message || 'Si è verificato un errore durante il pagamento.');
        isProcessing.value = false;
      }
      // Se il pagamento va a buon fine, Stripe reindirizzerà automaticamente
    };

    const showMessage = (messageText: string) => {
      const messageContainer = document.querySelector('#payment-message');
      if (messageContainer) {
        messageContainer.classList.remove('d-none');
        messageContainer.textContent = messageText;

        setTimeout(() => {
          messageContainer.classList.add('d-none');
          messageContainer.textContent = '';
        }, 4000);
      }
    };

    // Verifica email all'arrivo sulla pagina
    onBeforeMount(async () => {
      const email = route.params.email as string;
      const token = route.params.token as string;

      if (!email || !token) {
        Swal.fire({
          text: "Link non valido. Parametri mancanti.",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Torna alla registrazione",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        }).then(() => {
          router.push({ name: "sign-up" });
        });
        return;
      }

      userEmail.value = email;
      isVerifying.value = false;
      isVerified.value = true;
      // try {
      //   await store.verifyCredentials(email, token);
      //   const error = store.errors;

      //   if (!error) {
      //     isVerified.value = true;
      //     Swal.fire({
      //       title: "Email verificata con successo!",
      //       text: "Benvenuto! Ora seleziona il piano di abbonamento più adatto alle tue esigenze.",
      //       icon: "success",
      //       buttonsStyling: false,
      //       confirmButtonText: "Scegli il tuo piano",
      //       heightAuto: false,
      //       customClass: {
      //         confirmButton: "btn fw-semobold btn-light-primary",
      //       },
      //     });
      //   } else {
      //     isVerified.value = false;
      //     Swal.fire({
      //       text: error as string,
      //       icon: "error",
      //       buttonsStyling: false,
      //       confirmButtonText: "Torna alla registrazione",
      //       heightAuto: false,
      //       customClass: {
      //         confirmButton: "btn fw-semobold btn-light-danger",
      //       },
      //     }).then(() => {
      //       router.push({ name: "sign-up" });
      //     });
      //   }
      // } catch (error) {
      //   console.error("Error verifying email:", error);
      //   isVerified.value = false;
      //   Swal.fire({
      //     text: "Errore durante la verifica dell'email. Riprova più tardi.",
      //     icon: "error",
      //     buttonsStyling: false,
      //     confirmButtonText: "Torna alla registrazione",
      //     heightAuto: false,
      //     customClass: {
      //       confirmButton: "btn fw-semobold btn-light-danger",
      //     },
      //   }).then(() => {
      //     router.push({ name: "sign-up" });
      //   });
      // } finally {
      //   isVerifying.value = false;
      // }
    });

    return {
      selectedPlan,
      isProcessing,
      isVerifying,
      isVerified,
      userEmail,
      selectPlan,
      cancelPayment,
      getPlanPrice,
      getPlanDescription,
      handleSubmit,
    };
  },
});
</script>

