import ApiService from "@/core/services/ApiService";

export interface PaymentIntent {
  ClientSecret?: string | null;
  PaymentIntentId?: string | null;
  /** True quando la prima invoice ha importo 0 (credito) e non serve pagare. */
  NoPaymentRequired?: boolean;
}

export interface SubscriptionPlan {
  Id: number;
  Name: string;
  Description?: string;
  Price: number;
  BillingPeriod: string;
  Active: boolean;
}

export interface CreatePaymentIntentRequest {
  plan: string;
  amount: number;
  currency?: string;
  email?: string;
  isRecurringPayment?: boolean; // true = Subscription, false/null = Payment Intent
}

export interface SubscriptionStatus {
  Id: number;
  UserId: string;
  SubscriptionPlanId: number;
  Status: string;
  StartDate: Date;
  EndDate?: Date;
  AutoRenew: boolean;
  StripeSubscriptionId?: string;
  StripeCustomerId?: string;
}

/**
 * Crea un Payment Intent per elaborare il pagamento
 * @param data Dati per la creazione del Payment Intent
 * @returns Payment Intent con client secret
 */
export const createPaymentIntent = async (
  data: CreatePaymentIntentRequest
): Promise<PaymentIntent> => {
  try {
    const response = await ApiService.post("/billing/create-payment-intent", data);
    return response.data;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw error;
  }
};

/**
 * Recupera i piani di abbonamento disponibili
 * @returns Lista dei piani disponibili
 */
export const getSubscriptionPlans = async (): Promise<SubscriptionPlan[]> => {
  try {
    const response = await ApiService.get("/billing/plans", "json");
    return response.data;
  } catch (error) {
    console.error("Error fetching subscription plans:", error);
    throw error;
  }
};

/**
 * Recupera lo stato dell'abbonamento corrente dell'utente
 * @returns Stato dell'abbonamento (usa il token JWT per identificare l'utente)
 */
export const getSubscriptionStatus = async (): Promise<SubscriptionStatus> => {
  try {
    const response = await ApiService.get("/billing/subscription-status", "json");
    return response.data;
  } catch (error) {
    console.error("Error fetching subscription status:", error);
    throw error;
  }
};

/**
 * Annulla l'abbonamento corrente dell'utente
 * @returns Messaggio di conferma
 */
export const cancelSubscription = async (): Promise<string> => {
  try {
    const response = await ApiService.post("/billing/cancel-subscription", {});
    return response.data;
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    throw error;
  }
};

/**
 * Conferma un pagamento completato
 * @param paymentIntentId ID del Payment Intent
 * @returns Stato del pagamento
 */
export const confirmPayment = async (
  paymentIntentId: string
): Promise<any> => {
  try {
    const response = await ApiService.post("/billing/confirm-payment", {
      paymentIntentId
    });
    return response.data;
  } catch (error) {
    console.error("Error confirming payment:", error);
    throw error;
  }
};

/**
 * Sincronizza la subscription in pending dell'utente (dopo pagamento ricorrente).
 * Usato dopo "Pagamento completato" per ricorrenti, così l'abbonamento diventa attivo subito senza attendere il webhook invoice.paid.
 */
export const syncMyPendingSubscription = async (): Promise<{ Success: boolean; Message: string; PaymentId?: number }> => {
  try {
    const response = await ApiService.post("/billing/sync-my-pending-subscription", {});
    return response.data;
  } catch (error: any) {
    if (error?.response?.status === 401) return { Success: false, Message: "Non autorizzato" };
    return { Success: false, Message: error?.response?.data?.message || error?.message || "Sync fallito" };
  }
};

export interface UpgradeCreditCalculationResponse {
  IsUpgrade: boolean;
  HasActiveSubscription: boolean;
  CreditAmount: number;
  OriginalAmount: number;
  FinalAmount: number;
  DaysRemaining: number;
  CurrentPlanName?: string;
  NewPlanName?: string;
  Message: string;
}/**
 * Calcola il credito residuo e l'importo netto per un upgrade
 * @param planName Nome del piano selezionato
 * @returns Calcolo del credito e importo finale
 */
export const calculateUpgradeCredit = async (
  planName: string
): Promise<UpgradeCreditCalculationResponse> => {
  try {
    const response = await ApiService.get(
      `/billing/calculate-upgrade-credit?planName=${encodeURIComponent(planName)}`,
      "json"
    );
    return response.data;
  } catch (error) {
    console.error("Error calculating upgrade credit:", error);
    throw error;
  }
};

/** Risposta create-setup-intent: clientSecret per Stripe Elements (SetupIntent). API restituisce camelCase. */
export interface CreateSetupIntentResponse {
  clientSecret: string;
}

/**
 * Crea un SetupIntent per aggiornare il metodo di pagamento (carta) senza uscire dall'app.
 * Richiede utente autenticato con abbonamento attivo su Stripe.
 */
export const createSetupIntent = async (): Promise<CreateSetupIntentResponse> => {
  const response = await ApiService.post("/billing/create-setup-intent", {});
  return response.data;
};

/**
 * Imposta il metodo di pagamento (carta) appena salvato come predefinito per customer e subscription.
 * Da chiamare dopo conferma SetupIntent dal frontend.
 */
export const setDefaultPaymentMethod = async (paymentMethodId: string): Promise<void> => {
  await ApiService.post("/billing/set-default-payment-method", { PaymentMethodId: paymentMethodId });
};