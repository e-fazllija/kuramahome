import { ref, computed } from "vue";
import { defineStore } from "pinia";
import {
  getMyLimitsStatus,
  checkFeatureLimit,
  type SubscriptionLimitStatusResponse,
} from "@/core/data/subscription-limits";

/**
 * Interface per lo stato di un limite
 */
export interface LimitStatus {
  canProceed: boolean;
  featureName: string;
  limit: string | null;
  currentUsage: number;
  limitReached: boolean;
  remaining: number | null;
  message?: string;
}

export const useSubscriptionLimitsStore = defineStore("subscriptionLimits", () => {
  const limits = ref<Record<string, LimitStatus>>({});
  const lastUpdated = ref<Date | null>(null);
  const isLoading = ref(false);

  /**
   * Controlla se può creare l'entità specificata
   */
  const canCreate = computed(() => (featureName: string): boolean => {
    const limit = limits.value[featureName];
    return limit ? limit.canProceed : true; // Default: permette se non configurato
  });

  /**
   * Ottiene lo stato di un limite specifico
   */
  const getLimitStatus = computed(() => (featureName: string): LimitStatus | null => {
    return limits.value[featureName] || null;
  });

  /**
   * Ottiene il numero del limite (null se unlimited)
   */
  const getLimitNumber = computed(() => (featureName: string): number | null => {
    const limit = limits.value[featureName];
    if (!limit || !limit.limit) return null;
    
    if (limit.limit === "unlimited" || limit.limit === "-1") return null;
    
    const parsed = parseInt(limit.limit);
    return isNaN(parsed) ? null : parsed;
  });

  /**
   * Ottiene i limiti rimanenti
   */
  const getRemaining = computed(() => (featureName: string): number | null => {
    const limit = limits.value[featureName];
    return limit?.remaining ?? null;
  });

  /**
   * Controlla se è vicino al limite (threshold default 80%)
   */
  const isNearLimit = computed(() => (
    featureName: string,
    threshold: number = 0.8
  ): boolean => {
    const limit = limits.value[featureName];
    if (!limit || !limit.limit || limit.limit === "unlimited" || limit.limit === "-1")
      return false;

    const limitNum = parseInt(limit.limit);
    if (isNaN(limitNum) || limitNum === 0) return false;

    const percentage = limit.currentUsage / limitNum;
    return percentage >= threshold;
  });

  /**
   * Recupera tutti i limiti dal backend
   */
  async function fetchLimits(): Promise<void> {
    try {
      isLoading.value = true;
      const response = await getMyLimitsStatus();
      
      // Converti response in LimitStatus
      limits.value = Object.fromEntries(
        Object.entries(response).map(([key, value]) => [
          key,
          {
            canProceed: value.canProceed,
            featureName: value.featureName,
            limit: value.limit,
            currentUsage: value.currentUsage,
            limitReached: value.limitReached,
            remaining: value.remaining,
            message: value.message,
          } as LimitStatus,
        ])
      );
      
      lastUpdated.value = new Date();
    } catch (error) {
      console.error("Error fetching limits:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Verifica il limite per una feature specifica
   */
  async function checkLimit(featureName: string): Promise<SubscriptionLimitStatusResponse> {
    try {
      isLoading.value = true;
      const response = await checkFeatureLimit(featureName);
      
      // Aggiorna lo store con la risposta
      limits.value[featureName] = {
        canProceed: response.canProceed,
        featureName: response.featureName,
        limit: response.limit,
        currentUsage: response.currentUsage,
        limitReached: response.limitReached,
        remaining: response.remaining,
        message: response.message,
      };
      
      lastUpdated.value = new Date();
      return response;
    } catch (error) {
      console.error("Error checking limit:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Incrementa l'utilizzo locale dopo creazione
   */
  function incrementUsage(featureName: string): void {
    const limit = limits.value[featureName];
    if (limit) {
      limit.currentUsage++;
      limit.remaining = limit.remaining !== null ? Math.max(0, limit.remaining - 1) : null;
      limit.limitReached = 
        limit.limit !== null && 
        limit.limit !== "unlimited" && 
        limit.limit !== "-1" &&
        limit.currentUsage >= parseInt(limit.limit);
      limit.canProceed = !limit.limitReached;
    }
  }

  /**
   * Decrementa l'utilizzo locale dopo cancellazione
   */
  function decrementUsage(featureName: string): void {
    const limit = limits.value[featureName];
    if (limit) {
      limit.currentUsage = Math.max(0, limit.currentUsage - 1);
      limit.remaining = limit.remaining !== null ? limit.remaining + 1 : null;
      
      // Se era raggiunto, ora non lo è più
      if (limit.limitReached) {
        limit.limitReached = false;
        limit.canProceed = true;
      }
    }
  }

  /**
   * Aggiorna da response backend
   */
  function updateFromResponse(response: SubscriptionLimitStatusResponse): void {
    limits.value[response.featureName] = {
      canProceed: response.canProceed,
      featureName: response.featureName,
      limit: response.limit,
      currentUsage: response.currentUsage,
      limitReached: response.limitReached,
      remaining: response.remaining,
      message: response.message,
    };
    lastUpdated.value = new Date();
  }

  /**
   * Refresh limiti dal backend
   */
  async function refreshLimits(): Promise<void> {
    await fetchLimits();
  }

  /**
   * Reset store
   */
  function reset(): void {
    limits.value = {};
    lastUpdated.value = null;
    isLoading.value = false;
  }

  return {
    // State
    limits,
    lastUpdated,
    isLoading,
    
    // Getters
    canCreate,
    getLimitStatus,
    getLimitNumber,
    getRemaining,
    isNearLimit,
    
    // Actions
    fetchLimits,
    checkLimit,
    incrementUsage,
    decrementUsage,
    updateFromResponse,
    refreshLimits,
    reset,
  };
});




