import ApiService from "@/core/services/ApiService";

// Types - Usando PascalCase come nel backend C#
export interface SubscriptionFeature {
  Id: number;
  SubscriptionPlanId: number;
  FeatureName: string;
  FeatureValue?: string;
  Description?: string;
  CreationDate: string;
  UpdateDate: string;
}

export interface SubscriptionPlan {
  Id: number;
  Name: string;
  Description?: string;
  Price: number;
  BillingPeriod: string;
  Active: boolean;
  CreationDate: string;
  UpdateDate: string;
  Features?: SubscriptionFeature[];
}

/**
 * Recupera tutti i piani di abbonamento attivi
 */
export const getActivePlans = async (): Promise<SubscriptionPlan[]> => {
  try {
    const response = await ApiService.get("/SubscriptionPlan/active", "json");
    return response.data;
  } catch (error) {
    console.error("Errore nel recupero dei piani attivi:", error);
    throw error;
  }
};

/**
 * Recupera un piano specifico con le sue features
 */
export const getPlanWithFeatures = async (planId: number): Promise<SubscriptionPlan> => {
  try {
    const response = await ApiService.get(`/SubscriptionPlan/${planId}/with-features`, "json");
    return response.data;
  } catch (error) {
    console.error(`Errore nel recupero del piano ${planId}:`, error);
    throw error;
  }
};

/**
 * Recupera tutti i piani (admin only)
 */
export const getAllPlans = async (): Promise<SubscriptionPlan[]> => {
  try {
    const response = await ApiService.get("/SubscriptionPlan", "json");
    return response.data;
  } catch (error) {
    console.error("Errore nel recupero di tutti i piani:", error);
    throw error;
  }
};

