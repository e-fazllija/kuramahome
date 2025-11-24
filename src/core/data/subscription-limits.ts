import ApiService from "@/core/services/ApiService";

/**
 * Subscription Limits API Service
 * Gestisce le chiamate API per verificare i limiti delle subscription
 */

/**
 * Interface per la response del limite di una feature
 */
export interface SubscriptionLimitStatusResponse {
  canProceed: boolean;
  featureName: string;
  limit: string | null;
  currentUsage: number;
  limitReached: boolean;
  remaining: number | null;
  message?: string;
}

/**
 * Verifica il limite per una feature specifica
 * @param featureName Nome della feature (es: "max_agencies", "max_properties")
 * @returns Status del limite
 */
export const checkFeatureLimit = async (
  featureName: string
): Promise<SubscriptionLimitStatusResponse> => {
  try {
    const response = await ApiService.get(
      `SubscriptionLimit/check?featureName=${featureName}`,
      "json"
    );
    
    // Il backend restituisce PascalCase, convertiamo in camelCase
    const data = response.data;
    return {
      canProceed: data.CanProceed ?? data.canProceed,
      featureName: data.FeatureName ?? data.featureName,
      limit: data.Limit ?? data.limit,
      currentUsage: data.CurrentUsage ?? data.currentUsage,
      limitReached: data.LimitReached ?? data.limitReached,
      remaining: data.Remaining ?? data.remaining,
      message: data.Message ?? data.message,
    };
  } catch (error: any) {
    console.error("Error checking feature limit:", error);
    throw error;
  }
};

/**
 * Recupera tutti i limiti dello stato per l'utente corrente
 * @returns Dictionary con tutti i limiti (chiave = featureName)
 */
export const getMyLimitsStatus = async (): Promise<
  Record<string, SubscriptionLimitStatusResponse>
> => {
  try {
    const response = await ApiService.get("SubscriptionLimit/my-status", "json");
    return response.data;
  } catch (error: any) {
    console.error("Error fetching limits status:", error);
    throw error;
  }
};

/**
 * Interface per la response di compatibilità downgrade
 */
export interface FeatureCompatibilityItem {
  featureName: string;
  featureDisplayName: string;
  newPlanLimit: number | null;
  currentUsage: number;
  isExceeded: boolean;
  message: string;
}

export interface DowngradeCompatibilityResponse {
  canDowngrade: boolean;
  targetPlanId: number;
  targetPlanName: string;
  features: FeatureCompatibilityItem[];
  exceededLimitsCount: number;
  message?: string | null;
}

/**
 * Verifica se il downgrade al piano specificato è possibile
 * @param planId ID del piano di destinazione
 * @returns Response con compatibilità e dettagli delle features
 */
export const checkDowngradeCompatibility = async (
  planId: number
): Promise<DowngradeCompatibilityResponse> => {
  try {
    const response = await ApiService.get(
      `SubscriptionLimit/check-downgrade?planId=${planId}`,
      "json"
    );
    
    // Il backend restituisce PascalCase, convertiamo in camelCase
    const data = response.data;
    return {
      canDowngrade: data.CanDowngrade ?? data.canDowngrade,
      targetPlanId: data.TargetPlanId ?? data.targetPlanId,
      targetPlanName: data.TargetPlanName ?? data.targetPlanName,
      features: (data.Features ?? data.features ?? []).map((f: any) => ({
        featureName: f.FeatureName ?? f.featureName,
        featureDisplayName: f.FeatureDisplayName ?? f.featureDisplayName,
        newPlanLimit: f.NewPlanLimit ?? f.newPlanLimit,
        currentUsage: f.CurrentUsage ?? f.currentUsage,
        isExceeded: f.IsExceeded ?? f.isExceeded,
        message: f.Message ?? f.message,
      })),
      exceededLimitsCount: data.ExceededLimitsCount ?? data.exceededLimitsCount,
      message: data.Message ?? data.message,
    };
  } catch (error: any) {
    console.error("Error checking downgrade compatibility:", error);
    throw error;
  }
};

