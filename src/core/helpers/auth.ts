import { useAuthStore } from "@/stores/auth";

/**
 * Verifica se l'utente è un Admin
 * @returns {boolean} True se l'utente è Admin
 */
export const hasAdminRole = (): boolean => {
  const authStore = useAuthStore();
  return authStore.user?.Role === "Admin";
};

/**
 * Verifica se l'utente è un Agency
 * @returns {boolean} True se l'utente è Agency
 */
export const hasAgencyRole = (): boolean => {
  const authStore = useAuthStore();
  return authStore.user?.Role === "Agency";
};

/**
 * Verifica se l'utente è un Agent
 * @returns {boolean} True se l'utente è Agent o Ryolo Agent
 */
export const isAgent = (): boolean => {
  const authStore = useAuthStore();
  const role = authStore.user?.Role;
  return role !== undefined && role.toLowerCase().includes("agent");
};

/**
 * Verifica se l'utente può accedere a una route che richiede Admin
 * @returns {boolean} True se l'utente è Admin
 */
export const canAccessAdminRoute = (): boolean => {
  return hasAdminRole();
};

/**
 * Verifica se l'utente può accedere a una route che richiede Admin o Agency
 * @returns {boolean} True se l'utente è Admin o Agency
 */
export const canAccessAdminOrAgencyRoute = (): boolean => {
  return hasAdminRole() || hasAgencyRole();
};

/**
 * Verifica se l'utente può creare agenti
 * @returns {boolean} True se Admin o Agency, False per Agent
 */
export const canCreateAgent = (): boolean => {
  return hasAdminRole() || hasAgencyRole();
};

/**
 * Verifica se l'utente può creare agenzie
 * @returns {boolean} True solo se Admin
 */
export const canCreateAgency = (): boolean => {
  return hasAdminRole();
};

/**
 * Ottiene l'AgencyId dell'utente corrente per il filtro dati
 * @returns {string | undefined} AgencyId se utente è Agency, undefined se Admin
 */
export const getUserAgencyId = (): string | undefined => {
  const authStore = useAuthStore();
  const role = authStore.user?.Role;
  
  // Se è Agency, restituisce il suo AgencyId
  if (role === "Agency") {
    return authStore.user.AgencyId || undefined;
  }
  
  // Se è Admin, restituisce undefined per vedere tutto
  if (role === "Admin") {
    return undefined;
  }
  
  // Se è Agent, restituisce il suo AgencyId
  if (isAgent()) {
    return authStore.user.AgencyId || undefined;
  }
  
  return undefined;
};

