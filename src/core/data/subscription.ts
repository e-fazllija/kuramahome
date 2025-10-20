import ApiService from "@/core/services/ApiService";

/**
 * Subscription API Service
 * Gestisce tutte le chiamate API relative agli abbonamenti utente
 */

/**
 * Interface per l'abbonamento corrente dell'utente
 */
export interface UserSubscription {
  id: number;
  userId: string;
  subscriptionPlanId: number;
  subscriptionPlan: {
    id: number;
    name: string;
    description: string;
    price: number;
    billingPeriod: string;
    features: string;
  };
  status: string;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  stripeSubscriptionId?: string;
  lastPaymentId?: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Interface per la lista di piani disponibili
 */
export interface SubscriptionPlan {
  id: number;
  name: string;
  description: string;
  price: number;
  billingPeriod: string;
  features: string;
  isActive: boolean;
}

/**
 * Ottiene l'abbonamento attivo dell'utente corrente
 * GET /api/subscription/current
 */
export const getCurrentSubscription = async (): Promise<UserSubscription | null> => {
  try {
    const response = await ApiService.get("subscription/current");
    return response.data;
  } catch (error: any) {
    // Se non ha abbonamento attivo, ritorna null invece di lanciare errore
    if (error?.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

/**
 * Ottiene tutti i piani di abbonamento disponibili
 * GET /api/subscriptionplan
 */
export const getAvailablePlans = async (): Promise<SubscriptionPlan[]> => {
  const response = await ApiService.get("subscriptionplan");
  return response.data;
};

/**
 * Ottiene l'abbonamento di un utente specifico (admin only)
 * GET /api/subscription/user/{userId}
 */
export const getUserSubscription = async (userId: string): Promise<UserSubscription | null> => {
  try {
    const response = await ApiService.get(`subscription/user/${userId}`);
    return response.data;
  } catch (error: any) {
    if (error?.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

/**
 * Cancella l'abbonamento corrente
 * POST /api/subscription/cancel
 */
export const cancelSubscription = async (subscriptionId: number): Promise<void> => {
  await ApiService.post(`subscription/cancel/${subscriptionId}`, {});
};

/**
 * Riattiva un abbonamento cancellato
 * POST /api/subscription/reactivate
 */
export const reactivateSubscription = async (subscriptionId: number): Promise<void> => {
  await ApiService.post(`subscription/reactivate/${subscriptionId}`, {});
};


