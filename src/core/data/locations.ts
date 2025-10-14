import ApiService from "@/core/services/ApiService";
import { useAuthStore } from "@/stores/auth";

const store = useAuthStore();

// Province interfaces
export interface Province {
  Id: number;
  Name: string;
}

export interface ProvinceCreateModel {
  Name: string;
}

export interface ProvinceUpdateModel {
  Id: number;
  Name: string;
}

// City interfaces
export interface City {
  Id: number;
  Name: string;
  ProvinceId: number;
  ProvinceName: string;
}

export interface CityCreateModel {
  Name: string;
  ProvinceId: number;
}

export interface CityUpdateModel {
  Id: number;
  Name: string;
  ProvinceId: number;
}

// Location interfaces
export interface Location {
  Id: number;
  Name: string;
  CityId: number;
  CityName: string;
  ProvinceId: number;
  ProvinceName: string;
  CreationDate: string;
  UpdateDate: string;
}

export interface LocationCreateModel {
  Name: string;
  CityId: number;
}

export interface LocationUpdateModel {
  Id: number;
  Name: string;
  CityId: number;
}

export interface LocationGroupedModel {
  City: string;
  Locations: LocationItemModel[];
}

export interface LocationItemModel {
  Id: string;
  Name: string;
}

export interface ListViewModel<T> {
  data: T[];
  total: number;
}

// Mantieni la struttura esistente per compatibilità
export const cityLocations = {
  "Ardea": [
    { Id: 'Centro Storico', Name: 'Centro Storico' },
    { Id: 'Nuova California', Name: 'Nuova California' },
    { Id: 'Tor San Lorenzo', Name: 'Tor San Lorenzo' },
    { Id: 'Marina di Ardea', Name: 'Marina di Ardea' },
    { Id: 'Castagnetta', Name: 'Castagnetta' }
  ],
  "Cave": [
    { Id: 'Colle Palme', Name: 'Colle Palme' },
    { Id: 'San Bartolomeo', Name: 'San Bartolomeo' }
  ],
  "Fiumicino": [
    { Id: 'Fiumicino Paese', Name: 'Fiumicino Paese' },
    { Id: 'Isola Sacra', Name: 'Isola Sacra' },
    { Id: 'Focene', Name: 'Focene' },
    { Id: 'Fregene', Name: 'Fregene' },
    { Id: 'Palidoro', Name: 'Palidoro' },
    { Id: 'Parco Leonardo', Name: 'Parco Leonardo' }
  ],
  "Genazzano": [
    { Id: 'Centro Storico', Name: 'Centro Storico' },
    { Id: 'San Vito', Name: 'San Vito' },
    { Id: 'Colle Pizzuto', Name: 'Colle Pizzuto' },
    { Id: 'Ponte Sfondato', Name: 'Ponte Sfondato' }
  ],
  "Guidonia Montecelio": [
    { Id: 'Albuccione', Name: 'Albuccione' },
    { Id: 'Casacalda', Name: 'Casacalda' },
    { Id: 'Castel Arcione', Name: 'Castel Arcione' },
    { Id: 'Colle Verde', Name: 'Colle Verde' },
    { Id: 'La Botte', Name: 'La Botte' },
    { Id: 'Marco Simone', Name: 'Marco Simone' },
    { Id: 'Montecelio', Name: 'Montecelio' },
    { Id: 'Setteville', Name: 'Setteville' },
    { Id: 'Villa Nova', Name: 'Villa Nova' },
    { Id: 'Villalba', Name: 'Villalba' }
  ],
  "Labico": [
    { Id: 'Colle Spina', Name: 'Colle Spina' }
  ],
  "Monte Compatri": [
    { Id: 'Colle Mattia', Name: 'Colle Mattia' },
    { Id: 'Laghetto', Name: 'Laghetto' }
  ],
  "Palestrina": [
    { Id: 'Carchitti', Name: 'Carchitti' },
    { Id: 'Valvarino', Name: 'Valvarino' }
  ],
  "Rocca Priora": [
    { Id: 'Colle di Fuori', Name: 'Colle di Fuori' }
  ],
  "Roma": [
    { Id: 'Acilia', Name: 'Acilia' },
    { Id: 'Alessandrino', Name: 'Alessandrino' },
    { Id: 'Axa', Name: 'Axa' },
    { Id: 'Boccea', Name: 'Boccea' },
    { Id: 'Borghesiana', Name: 'Borghesiana' },
    { Id: 'Casal Bernocchi', Name: 'Casal Bernocchi' },
    { Id: 'Casal Palocco', Name: 'Casal Palocco' },
    { Id: 'Casalotti', Name: 'Casalotti' },
    { Id: 'Castel Fusano', Name: 'Castel Fusano' },
    { Id: 'Castelverde', Name: 'Castelverde' },
    { Id: 'Centocelle', Name: 'Centocelle' },
    { Id: 'Centro Giano', Name: 'Centro Giano' },
    { Id: 'Cinecittà', Name: 'Cinecittà' },
    { Id: 'Colle Monfortani', Name: 'Colle Monfortani' },
    { Id: 'Colle Prenestino', Name: 'Colle Prenestino' },
    { Id: 'Colle del Sole', Name: 'Colle del Sole' },
    { Id: 'Corcolle', Name: 'Corcolle' },
    { Id: 'Corcolle Alto', Name: 'Corcolle Alto' },
    { Id: 'Don Bosco', Name: 'Don Bosco' },
    { Id: 'Dragona', Name: 'Dragona' },
    { Id: 'Dragoncello', Name: 'Dragoncello' },
    { Id: 'Eur', Name: 'Eur' },
    { Id: 'Finocchio', Name: 'Finocchio' },
    { Id: 'Fonte Laurentina', Name: 'Fonte Laurentina' },
    { Id: 'Fosso San Giuliano', Name: 'Fosso San Giuliano' },
    { Id: 'Giardinetti', Name: 'Giardinetti' },
    { Id: 'Giardini di Corcolle', Name: 'Giardini di Corcolle' },
    { Id: 'Infernetto', Name: 'Infernetto' },
    { Id: 'La Pisana', Name: 'La Pisana' },
    { Id: 'La Storta', Name: 'La Storta' },
    { Id: 'Longarina', Name: 'Longarina' },
    { Id: 'Lunghezza', Name: 'Lunghezza' },
    { Id: 'Madonnetta', Name: 'Madonnetta' },
    { Id: 'Malafede', Name: 'Malafede' },
    { Id: 'Monte Sacro', Name: 'Monte Sacro' },
    { Id: 'Osteria del Curato', Name: 'Osteria del Curato' },
    { Id: 'Ostia', Name: 'Ostia' },
    { Id: 'Ostia Antica', Name: 'Ostia Antica' },
    { Id: 'Ostia Levante', Name: 'Ostia Levante' },
    { Id: 'Ostia Ponente', Name: 'Ostia Ponente' },
    { Id: 'Pantano Borghese', Name: 'Pantano Borghese' },
    { Id: 'Piana del Sole', Name: 'Piana del Sole' },
    { Id: 'Pigneto', Name: 'Pigneto' },
    { Id: 'Ponte Galeria', Name: 'Ponte Galeria' },
    { Id: 'Ponte di Nona', Name: 'Ponte di Nona' },
    { Id: 'Portuense', Name: 'Portuense' },
    { Id: 'Prato Fiorito', Name: 'Prato Fiorito' },
    { Id: 'Prima Porta', Name: 'Prima Porta' },
    { Id: 'Rocca Cencia', Name: 'Rocca Cencia' },
    { Id: 'Romanina', Name: 'Romanina' },
    { Id: 'Roma Est', Name: 'Roma Est' },
    { Id: 'San Vittorino', Name: 'San Vittorino' },
    { Id: 'Saxa Rubra', Name: 'Saxa Rubra' },
    { Id: 'Settecamini', Name: 'Settecamini' },
    { Id: 'Tor Bella Monaca', Name: 'Tor Bella Monaca' },
    { Id: 'Tor Tre Teste', Name: 'Tor Tre Teste' },
    { Id: 'Tor Vergata', Name: 'Tor Vergata' },
    { Id: 'Tor de Cenci', Name: 'Tor de Cenci' },
    { Id: 'Torre Angela', Name: 'Torre Angela' },
    { Id: 'Torre Gaia', Name: 'Torre Gaia' },
    { Id: 'Torre Maura', Name: 'Torre Maura' },
    { Id: 'Torre Spaccata', Name: 'Torre Spaccata' },
    { Id: 'Tuscolana', Name: 'Tuscolana' },
    { Id: 'Vallerano', Name: 'Vallerano' },
    { Id: 'Vermicino', Name: 'Vermicino' },
    { Id: 'Villa Verde', Name: 'Villa Verde' },
    { Id: 'Villaggio Breda', Name: 'Villaggio Breda' },
    { Id: 'Villaggio Prenestino', Name: 'Villaggio Prenestino' }
  ],
  "Tivoli": [
    { Id: 'Centro Storico', Name: 'Centro Storico' },
    { Id: 'Tivoli Terme', Name: 'Tivoli Terme' },
    { Id: 'Villa Adriana', Name: 'Villa Adriana' },
    { Id: 'Campolimpido', Name: 'Campolimpido' },
    { Id: 'Colle di Tivoli', Name: 'Colle di Tivoli' },
    { Id: 'Ponte Lucano', Name: 'Ponte Lucano' },
    { Id: 'San Paolo', Name: 'San Paolo' }
  ],
  "Zagarolo": [
    { Id: 'Centro Paese', Name: 'Centro Paese' },
    { Id: 'Valle Martella', Name: 'Valle Martella' },
    { Id: 'Via Prenestina', Name: 'Via Prenestina' }
  ]
};

// Province API Functions
export const getProvinces = async (filterRequest?: string): Promise<Province[]> => {
  try {
    const params = new URLSearchParams();
    if (filterRequest) params.append('filterRequest', filterRequest);

    const response = await ApiService.get(`Province/Get?${params.toString()}`, {});
    return response.data;
  } catch (error: any) {
    store.setError(error.response?.data?.message || 'Errore nel caricamento delle province', error.response?.status || 500);
    throw error;
  }
};

export const getAllProvinces = async (): Promise<Province[]> => {
  try {
    const response = await ApiService.get('Province/GetAll', 'json');
    return Array.isArray(response.data) ? response.data : [];
  } catch (error: any) {
    store.setError(error.response?.data?.message || 'Errore nel caricamento delle province', error.response?.status || 500);
    throw error;
  }
};

export const getProvinceById = async (id: number): Promise<Province> => {
  try {
    const response = await ApiService.get(`Province/GetById?id=${id}`, 'json');
    return response.data;
  } catch (error: any) {
    store.setError(error.response?.data?.message || 'Errore nel caricamento della provincia', error.response?.status);
    throw error;
  }
};

export const createProvince = async (province: ProvinceCreateModel): Promise<Province> => {
  try {
    const response = await ApiService.post('Province/Create', province);
    return response.data;
  } catch (error: any) {
    store.setError(error.response?.data?.message || 'Errore nella creazione della provincia', error.response?.status);
    throw error;
  }
};

export const updateProvince = async (province: ProvinceUpdateModel): Promise<Province> => {
  try {
    const response = await ApiService.post('Province/Update', province);
    return response.data;
  } catch (error: any) {
    store.setError(error.response?.data?.message || 'Errore nell\'aggiornamento della provincia', error.response?.status);
    throw error;
  }
};

export const deleteProvince = async (id: number): Promise<void> => {
  try {
    await ApiService.delete(`Province/Delete?id=${id}`);
  } catch (error: any) {
    store.setError(error.response?.data?.message || 'Errore nell\'eliminazione della provincia', error.response?.status);
    throw error;
  }
};

// City API Functions
export const getCities = async (filterRequest?: string, provinceId?: number): Promise<City[]> => {
  try {
    const params = new URLSearchParams();
    if (filterRequest) params.append('filterRequest', filterRequest);
    if (provinceId) params.append('provinceId', provinceId.toString());

    const response = await ApiService.get(`City/Get?${params.toString()}`, {});
    return response.data;
  } catch (error: any) {
    store.setError(error.response?.data?.message || 'Errore nel caricamento delle città', error.response?.status || 500);
    throw error;
  }
};

export const getAllCities = async (): Promise<City[]> => {
  try {
    const response = await ApiService.get('City/GetAll', 'json');
    return Array.isArray(response.data) ? response.data : [];
  } catch (error: any) {
    store.setError(error.response?.data?.message || 'Errore nel caricamento delle città', error.response?.status || 500);
    throw error;
  }
};

export const getCitiesByProvince = async (provinceId: number): Promise<City[]> => {
  try {
    const response = await ApiService.get(`City/GetByProvince?provinceId=${provinceId}`, 'json');
    return response.data;
  } catch (error: any) {
    store.setError(error.response?.data?.message || 'Errore nel caricamento delle città per provincia', error.response?.status || 500);
    throw error;
  }
};

export const getCityById = async (id: number): Promise<City> => {
  try {
    const response = await ApiService.get(`City/GetById?id=${id}`, 'json');
    return response.data;
  } catch (error: any) {
    store.setError(error.response?.data?.message || 'Errore nel caricamento della città', error.response?.status);
    throw error;
  }
};

export const createCity = async (city: CityCreateModel): Promise<City> => {
  try {
    const response = await ApiService.post('City/Create', city);
    return response.data;
  } catch (error: any) {
    store.setError(error.response?.data?.message || 'Errore nella creazione della città', error.response?.status);
    throw error;
  }
};

export const updateCity = async (city: CityUpdateModel): Promise<City> => {
  try {
    const response = await ApiService.post('City/Update', city);
    return response.data;
  } catch (error: any) {
    store.setError(error.response?.data?.message || 'Errore nell\'aggiornamento della città', error.response?.status);
    throw error;
  }
};

export const deleteCity = async (id: number): Promise<void> => {
  try {
    await ApiService.delete(`City/Delete?id=${id}`);
  } catch (error: any) {
    store.setError(error.response?.data?.message || 'Errore nell\'eliminazione della città', error.response?.status);
    throw error;
  }
};

// Location API Functions
export const getLocations = async (currentPage: number = 1, filterRequest?: string, city?: string): Promise<ListViewModel<Location>> => {
  try {
    const params = new URLSearchParams();
    params.append('currentPage', currentPage.toString());
    if (filterRequest) params.append('filterRequest', filterRequest);
    if (city) params.append('city', city);

    const response = await ApiService.get(`Location/Get?${params.toString()}`, {});
    return response.data;
  } catch (error: any) {
    store.setError(error.response?.data?.message || 'Errore nel caricamento delle località', error.response?.status || 500);
    throw error;
  }
};

export const getAllLocations = async (): Promise<Location[]> => {
  try {
    const response = await ApiService.get('Location/GetAll', 'json');
    
    // Se response.data è una stringa, la parsiamo
    if (typeof response.data === 'string') {
      return JSON.parse(response.data);
    }
    
    // Se è già un array, lo restituiamo direttamente
    if (Array.isArray(response.data)) {
      return response.data;
    }
    
    // Se è un oggetto con una proprietà data, restituiamo quella
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    
    // Fallback: restituiamo un array vuoto
    return [];
  } catch (error: any) {
    store.setError(error.response?.data?.message || 'Errore nel caricamento delle località', error.response?.status || 500);
    throw error;
  }
};

export const getGroupedLocations = async (): Promise<LocationGroupedModel[]> => {
  try {
    const response = await ApiService.get('Location/GetGroupedByCity', 'json');
    return response.data;
  } catch (error: any) {
    store.setError(error.response?.data?.message || 'Errore nel caricamento delle località raggruppate', error.response?.status || 500);
    throw error;
  }
};

export const getLocationById = async (id: number): Promise<Location> => {
  try {
    const response = await ApiService.get(`Location/GetById?id=${id}`, 'json');
    return response.data;
  } catch (error: any) {
    store.setError(error.response?.data?.message || 'Errore nel caricamento della località', error.response?.status);
    throw error;
  }
};

export const createLocation = async (location: LocationCreateModel): Promise<Location | undefined> => {
  return ApiService.post('Location/Create', location)
    .then(({ data }) => {
      return data as Location;
    })
    .catch(({ response }) => {
      store.setError(response.data?.message || 'Errore nella creazione della località', response.status);
      return undefined;
    });
};

export const updateLocation = async (location: LocationUpdateModel): Promise<Location | undefined> => {
  return ApiService.post('Location/Update', location)
    .then(({ data }) => {
      return data as Location;
    })
    .catch(({ response }) => {
      store.setError(response.data?.message || 'Errore nell\'aggiornamento della località', response.status);
      return undefined;
    });
};

export const deleteLocation = async (id: number): Promise<void> => {
  try {
    await ApiService.delete(`Location/Delete?id=${id}`);
  } catch (error: any) {
    store.setError(error.response?.data?.message || 'Errore nell\'eliminazione della località', error.response?.status);
    throw error;
  }
};

// Funzione per ottenere le città disponibili (compatibilità)
export const getCitiesForFilter = async (): Promise<Array<{Id: string, Name: string}>> => {
  try {
    const groupedData = await getGroupedLocations();
    return groupedData.map(cityGroup => ({
      Id: cityGroup.City,
      Name: cityGroup.City
    }));
  } catch (error: any) {
    store.setError(error.response?.data?.message || 'Errore nel caricamento delle città', error.response?.status || 500);
    throw error;
  }
};

// Funzione per ottenere le località di una città specifica (compatibilità)
export const getLocationsByCity = async (cityName: string): Promise<Array<{Id: string, Name: string}>> => {
  try {
    const groupedData = await getGroupedLocations();
    const cityGroup = groupedData.find(city => city.City === cityName);
    return cityGroup ? cityGroup.Locations : [];
  } catch (error: any) {
    store.setError(error.response?.data?.message || 'Errore nel caricamento delle località per città', error.response?.status || 500);
    throw error;
  }
};

// Funzione per ottenere tutte le località in formato compatibile con cityLocations
export const getCityLocationsMap = async (): Promise<{[key: string]: Array<{Id: string, Name: string}>}> => {
  try {
    const groupedData = await getGroupedLocations();
    const cityLocationsMap: {[key: string]: Array<{Id: string, Name: string}>} = {};
    
    groupedData.forEach(cityGroup => {
      cityLocationsMap[cityGroup.City] = cityGroup.Locations;
    });
    
    return cityLocationsMap;
  } catch (error: any) {
    store.setError(error.response?.data?.message || 'Errore nel caricamento della mappa città-località', error.response?.status || 500);
    throw error;
  }
};

// Funzione per ottenere le province dal database
export const getProvincesForSelect = async (): Promise<Array<{Id: string, Name: string}>> => {
  try {
    const provincesData = await getAllProvinces();
    return provincesData.map(province => ({
      Id: province.Name,
      Name: province.Name
    }));
  } catch (error: any) {
    store.setError(error.response?.data?.message || 'Errore nel caricamento delle province', error.response?.status || 500);
    throw error;
  }
};

// Funzione per ottenere le città di una provincia specifica
export const getCitiesByProvinceName = async (provinceName: string): Promise<Array<{Id: string, Name: string}>> => {
  try {
    // Prima ottieni tutte le province per trovare l'ID della provincia
    const provinces = await getAllProvinces();
    const province = provinces.find(p => p.Name === provinceName);
    
    if (!province) {
      return [];
    }
    
    // Poi ottieni le città per quella provincia
    const citiesData = await getCitiesByProvince(province.Id);
    return citiesData.map(city => ({
      Id: city.Name,
      Name: city.Name
    }));
  } catch (error: any) {
    store.setError(error.response?.data?.message || 'Errore nel caricamento delle città per provincia', error.response?.status || 500);
    throw error;
  }
};

// Funzione per ottenere le località di una città specifica
export const getLocationsByCityName = async (cityName: string): Promise<Array<{Id: string, Name: string}>> => {
  try {
    const groupedData = await getGroupedLocations();
    const cityGroup = groupedData.find(city => city.City === cityName);
    return cityGroup ? cityGroup.Locations : [];
  } catch (error: any) {
    store.setError(error.response?.data?.message || 'Errore nel caricamento delle località per città', error.response?.status || 500);
    throw error;
  }
};

// Funzione per ottenere i dati strutturati per i filtri a tre livelli
export const getStructuredLocationData = async (): Promise<{
  provinces: Array<{value: string, label: string, id: number}>,
  cities: Array<{value: string, label: string, provinceId: number, provinceName: string}>,
  locations: Array<{value: string, label: string, cityId: number, provinceId: number, cityName: string, provinceName: string}>
}> => {
  try {
    const [provincesData, citiesData, locationsData] = await Promise.all([
      getAllProvinces(),
      getAllCities(),
      getAllLocations()
    ]);

    const provinces = provincesData.map(province => ({
      value: province.Name.toUpperCase(),
      label: province.Name.toUpperCase(),
      id: province.Id
    }));

    const cities = citiesData.map(city => ({
      value: city.Name.toUpperCase(),
      label: `${city.Name.toUpperCase()} (${city.ProvinceName.toUpperCase()})`,
      provinceId: city.ProvinceId,
      provinceName: city.ProvinceName.toUpperCase()
    }));

    const locations = locationsData.map(location => ({
      value: location.Name.toUpperCase(),
      label: `${location.Name.toUpperCase()} - ${location.CityName.toUpperCase()} (${location.ProvinceName.toUpperCase()})`,
      cityId: location.CityId,
      provinceId: location.ProvinceId,
      cityName: location.CityName.toUpperCase(),
      provinceName: location.ProvinceName.toUpperCase()
    }));

    return { provinces, cities, locations };
  } catch (error: any) {
    store.setError(error.response?.data?.message || 'Errore nel caricamento dei dati strutturati', error.response?.status || 500);
    throw error;
  }
};