/**
 * Enum per i livelli di accesso alle entità
 */
export enum AccessLevel {
  FULL = 1,      // Lista + Dettaglio + Modifica (permessi completi)
  READ_ONLY = 2, // Lista + Dettaglio (solo lettura, no modifica)
  LIMITED = 3    // Solo lista (popup informativo al click, no dettaglio, no modifica)
}

/**
 * Interfaccia per le informazioni del proprietario (usato per livello 3)
 */
export interface OwnerInfo {
  Id: string;
  FirstName: string;
  LastName: string;
  Role: string; // "Admin", "Agency", "Agent"
  AgencyName?: string; // Nome dell'Agency se il proprietario è un Agent
}

/**
 * Interfaccia per la risposta con accesso limitato (livello 3)
 */
export interface LimitedAccessResponse {
  Id: number;
  AccessLevel: number;
  OwnerInfo: OwnerInfo;
  EntityType: string; // "Property", "Request", "Customer"
}

/**
 * Verifica se l'utente può visualizzare i dettagli completi
 */
export function canViewDetails(level: AccessLevel | number): boolean {
  return level === AccessLevel.FULL || level === AccessLevel.READ_ONLY;
}

/**
 * Verifica se l'utente può modificare l'entità
 */
export function canModify(level: AccessLevel | number): boolean {
  return level === AccessLevel.FULL;
}

/**
 * Verifica se deve essere mostrato il popup informativo (livello 3)
 */
export function shouldShowPopup(level: AccessLevel | number): boolean {
  return level === AccessLevel.LIMITED;
}

/**
 * Ottiene il testo descrittivo del livello di accesso
 */
export function getAccessLevelLabel(level: AccessLevel | number): string {
  switch (level) {
    case AccessLevel.FULL:
      return "Accesso completo";
    case AccessLevel.READ_ONLY:
      return "Solo lettura";
    case AccessLevel.LIMITED:
      return "Accesso limitato";
    default:
      return "Sconosciuto";
  }
}

/**
 * Ottiene il badge color per il livello di accesso
 */
export function getAccessLevelBadgeColor(level: AccessLevel | number): string {
  switch (level) {
    case AccessLevel.FULL:
      return "success"; // Verde
    case AccessLevel.READ_ONLY:
      return "info"; // Blu
    case AccessLevel.LIMITED:
      return "warning"; // Giallo/Arancione
    default:
      return "secondary";
  }
}

/**
 * Formatta il nome del proprietario per il popup
 */
export function formatOwnerName(ownerInfo: OwnerInfo): string {
  if (ownerInfo.Role === "Agent" && ownerInfo.AgencyName) {
    return `👤 ${ownerInfo.FirstName} ${ownerInfo.LastName} (${ownerInfo.AgencyName})`;
  } else if (ownerInfo.Role === "Agency") {
    return `🏢 ${ownerInfo.FirstName} ${ownerInfo.LastName}`;
  } else if (ownerInfo.Role === "Admin") {
    return `👑 ${ownerInfo.FirstName} ${ownerInfo.LastName}`;
  }
  return `${ownerInfo.FirstName} ${ownerInfo.LastName}`;
}

/**
 * Ottiene il tipo di entità in italiano
 */
export function getEntityTypeLabel(entityType: string): string {
  switch (entityType.toLowerCase()) {
    case "property":
      return "immobile";
    case "request":
      return "richiesta";
    case "customer":
      return "cliente";
    default:
      return "elemento";
  }
}

/**
 * Formatta il tooltip per mostrare a chi appartiene l'elemento
 */
export function getOwnerTooltip(ownerInfo?: OwnerInfo): string {
  if (!ownerInfo || !ownerInfo.FirstName) {
    return "Proprietario sconosciuto";
  }

  if (ownerInfo.Role === "Agent" && ownerInfo.AgencyName) {
    return `👤 Agente: ${ownerInfo.FirstName} ${ownerInfo.LastName}\n🏢 Agenzia: ${ownerInfo.AgencyName}`;
  } else if (ownerInfo.Role === "Agency") {
    return `🏢 Agenzia: ${ownerInfo.FirstName} ${ownerInfo.LastName}`;
  } else if (ownerInfo.Role === "Admin") {
    return `👑 Admin: ${ownerInfo.FirstName} ${ownerInfo.LastName}`;
  }
  
  return `${ownerInfo.FirstName} ${ownerInfo.LastName}`;
}
