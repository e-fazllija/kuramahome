import ApiService from "@/core/services/ApiService";

export interface PaymentIntent {
  clientSecret: string;
  paymentIntentId: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
}

export interface CreatePaymentIntentRequest {
  plan: string;
  amount: number;
  currency?: string;
  email?: string;
}

export interface SubscriptionStatus {
  id: string;
  status: string;
  currentPeriodEnd: Date;
  plan: string;
  cancelAtPeriodEnd: boolean;
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
 * @param userId ID dell'utente
 * @returns Stato dell'abbonamento
 */
export const getSubscriptionStatus = async (
  userId: string
): Promise<SubscriptionStatus> => {
  try {
    const response = await ApiService.get(`/billing/subscription/${userId}`, "json");
    return response.data;
  } catch (error) {
    console.error("Error fetching subscription status:", error);
    throw error;
  }
};

/**
 * Annulla un abbonamento
 * @param subscriptionId ID dell'abbonamento da annullare
 * @returns Stato aggiornato dell'abbonamento
 */
export const cancelSubscription = async (
  subscriptionId: string
): Promise<SubscriptionStatus> => {
  try {
    const response = await ApiService.post(`/billing/subscription/${subscriptionId}/cancel`, {});
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

