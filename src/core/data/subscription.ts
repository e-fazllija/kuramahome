import ApiService from "@/core/services/ApiService";

/**
 * Subscription API Service
 * Gestisce tutte le chiamate API relative agli abbonamenti utente
 */

/**
 * Interface per l'abbonamento corrente dell'utente
 */
export interface UserSubscription {
  Id: number;
  UserId: string;
  SubscriptionPlanId: number;
  SubscriptionPlan: {
    Id: number;
    Name: string;
    Description: string;
    Price: number;
    BillingPeriod: string;
    Features: Array<{
      Id: number;
      FeatureName: string;
      FeatureValue?: string;
    }>;
  };
  Status: string;
  StartDate: string;
  EndDate: string;
  AutoRenew: boolean;
  StripeSubscriptionId?: string;
  LastPaymentId?: number;
  CreationDate: string;
  UpdateDate: string;
}

/**
 * Interface per la lista di piani disponibili
 */
export interface SubscriptionPlan {
  Id: number;
  Name: string;
  Description: string;
  Price: number;
  BillingPeriod: string;
  Features: Array<{
    Id: number;
    FeatureName: string;
    FeatureValue?: string;
  }>;
  IsActive: boolean;
}

/**
 * Ottiene l'abbonamento attivo dell'utente corrente
 * GET /api/UserSubscription/user/{userId}/active
 */
export const getCurrentSubscription = async (): Promise<UserSubscription | null> => {
  try {
    // Recupera userId dall'auth store
    const { useAuthStore } = await import('@/stores/auth');
    const authStore = useAuthStore();
    const userId = authStore.user?.Id;
    
    if (!userId) {
      console.warn('UserId non disponibile');
      return null;
    }
    
    const response = await ApiService.get(`UserSubscription/user/${userId}/active`, "json");
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
  const response = await ApiService.get("subscriptionplan", "json");
  return response.data;
};

/**
 * Ottiene l'abbonamento di un utente specifico (admin only)
 * GET /api/subscription/user/{userId}
 */
export const getUserSubscription = async (userId: string): Promise<UserSubscription | null> => {
  try {
    const response = await ApiService.get(`subscription/user/${userId}`, "json");
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


