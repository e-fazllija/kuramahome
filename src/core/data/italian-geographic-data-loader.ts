interface ComuneData {
  nome: string;
  cap: string | number;
}

interface ProvinciaData {
  nome: string;
  sigla: string;
  comuni: ComuneData[];
}

interface RegioneData {
  nome: string;
  province: ProvinciaData[];
}

export interface CityWithCAP {
  Id: string;
  Name: string;
  CAP: string;
}

// Cache per i dati caricati
let provinceCitiesCache: Record<string, CityWithCAP[]> | null = null;
let isLoading = false;
let loadPromise: Promise<Record<string, CityWithCAP[]>> | null = null;
const provinceCodeMap: Record<string, string> = {};
const provinceNameMap: Record<string, string> = {};

// Estrae i dati dal JSON e li converte nel formato atteso
function parseProvinceCities(data: { regioni: RegioneData[] }): Record<string, CityWithCAP[]> {
  const result: Record<string, CityWithCAP[]> = {};

  // Itera su tutte le regioni
  data.regioni.forEach((regione) => {
    // Itera su tutte le province di ogni regione
    regione.province.forEach((provincia) => {
      const provinceName = provincia.nome.trim();
      const provinceCode = provincia.sigla.trim().toUpperCase();

      provinceCodeMap[provinceName.toLowerCase()] = provinceCode;
      provinceNameMap[provinceCode] = provinceName;

      const cities: CityWithCAP[] = provincia.comuni.map((comune) => ({
        Id: comune.nome,
        Name: comune.nome,
        CAP: typeof comune.cap === 'number' 
          ? comune.cap.toString().padStart(5, '0') 
          : comune.cap.toString().padStart(5, '0'), // Assicura che il CAP sia a 5 cifre
      }));

      // Se la provincia esiste già, unisci i comuni (per gestire casi di province duplicate in regioni diverse)
      if (result[provincia.nome]) {
        result[provincia.nome] = [...result[provincia.nome], ...cities];
      } else {
        result[provincia.nome] = cities;
      }
    });
  });

  return result;
}

// Carica i dati dal JSON usando import dinamico (gestito meglio da Vite)
async function loadProvinceCities(): Promise<Record<string, CityWithCAP[]>> {
  if (provinceCitiesCache) {
    return provinceCitiesCache;
  }

  if (isLoading && loadPromise) {
    return loadPromise;
  }

  isLoading = true;
  loadPromise = import('./italia-geographic-data.json')
    .then((module) => {
      const data = module.default as { regioni: RegioneData[] };
      provinceCitiesCache = parseProvinceCities(data);
      isLoading = false;
      return provinceCitiesCache;
    })
    .catch(error => {
      console.error('Errore nel caricamento del JSON:', error);
      isLoading = false;
      loadPromise = null;
      return {};
    });

  return loadPromise;
}

// Getter reattivo per provinceCities
export async function getProvinceCities(): Promise<Record<string, CityWithCAP[]>> {
  return await loadProvinceCities();
}

// Export sincrono per compatibilità (si popola dopo il caricamento)
export let provinceCities: Record<string, CityWithCAP[]> = {};

// Inizializza il caricamento immediatamente
loadProvinceCities().then(data => {
  provinceCities = data;
}).catch(err => {
  console.error('Errore nel caricamento iniziale:', err);
});

/**
 * Funzione per ottenere il CAP di un comune dato provincia e nome comune
 * Se i dati non sono ancora caricati, attende il caricamento
 * @param provinceName - Nome della provincia
 * @param cityName - Nome del comune
 * @returns Il CAP del comune o undefined se non trovato
 */
export function getCAPByCity(provinceName: string, cityName: string): string | undefined {
  // Se i dati sono già in cache, usali direttamente
  if (provinceCitiesCache && provinceCitiesCache[provinceName]) {
    const cities = provinceCitiesCache[provinceName];
    const city = cities.find(c => c.Name === cityName);
    return city?.CAP;
  }
  
  // Altrimenti prova con i dati sincroni (potrebbero essere ancora in caricamento)
  const cities = provinceCities[provinceName];
  if (!cities) return undefined;
  
  const city = cities.find(c => c.Name === cityName);
  return city?.CAP;
}

/**
 * Funzione per ottenere tutte le città di una provincia
 * Se i dati non sono ancora caricati, attende il caricamento
 * @param provinceName - Nome della provincia
 * @returns Array di città con CAP o array vuoto se non trovato
 */
export function getCitiesByProvince(provinceName: string): CityWithCAP[] {
  // Se i dati sono già in cache, usali direttamente
  if (provinceCitiesCache && provinceCitiesCache[provinceName]) {
    return provinceCitiesCache[provinceName];
  }
  
  // Altrimenti prova con i dati sincroni (potrebbero essere ancora in caricamento)
  return provinceCities[provinceName] || [];
}

/**
 * Funzione per ottenere tutti i nomi delle province disponibili
 * @returns Array di nomi di provincia
 */
export function getAllProvinceNames(): string[] {
  // Usa la cache se disponibile, altrimenti usa i dati sincroni
  const data = provinceCitiesCache || provinceCities;
  return Object.keys(data).sort();
}

/**
 * Restituisce il codice (sigla) dato un nome di provincia
 */
export function getProvinceCodeByName(provinceName: string): string | undefined {
  if (!provinceName) {
    return undefined;
  }

  return provinceCodeMap[provinceName.trim().toLowerCase()];
}

/**
 * Restituisce il nome della provincia dato il codice (sigla)
 */
export function getProvinceNameByCode(provinceCode: string): string | undefined {
  if (!provinceCode) {
    return undefined;
  }

  return provinceNameMap[provinceCode.trim().toUpperCase()];
}

/**
 * Funzione per ottenere il comune dato provincia e CAP
 * Se ci sono più comuni con lo stesso CAP, restituisce il primo trovato
 * @param provinceName - Nome della provincia
 * @param cap - CAP del comune
 * @returns Il nome del comune o undefined se non trovato
 */
export function getCityByCAP(provinceName: string, cap: string): string | undefined {
  if (!provinceName || !cap) {
    return undefined;
  }

  // Normalizza il CAP a 5 cifre
  const normalizedCAP = cap.toString().padStart(5, '0');

  // Se i dati sono già in cache, usali direttamente
  if (provinceCitiesCache && provinceCitiesCache[provinceName]) {
    const cities = provinceCitiesCache[provinceName];
    const city = cities.find(c => c.CAP === normalizedCAP);
    return city?.Name;
  }
  
  // Altrimenti prova con i dati sincroni (potrebbero essere ancora in caricamento)
  const cities = provinceCities[provinceName];
  if (!cities) return undefined;
  
  const city = cities.find(c => c.CAP === normalizedCAP);
  return city?.Name;
}

