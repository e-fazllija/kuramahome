import ApiService from "@/core/services/ApiService";
import { useAuthStore, type User } from "@/stores/auth";
import type { Customer } from "./customers";
import imageCompression from 'browser-image-compression';
const store = useAuthStore();

export class RealEstateProperty {
  Id?: number;
  Title: string;
  Category: string;
  Typology?: string;
  InHome: boolean;
  Highlighted: boolean;
  Auction: boolean;
  Negotiation: boolean;
  Sold: boolean;
  Archived: boolean;
  Status: string;
  AddressLine: string;
  City: string;
  State: string;
  Location?: string;
  PostCode: string;
  CommercialSurfaceate: number | 0;
  Floor?: string;
  TotalBuildingfloors: number | 0;
  Elevators: number | 0; 
  MoreDetails?: string;
  MoreFeatures?: string;
  Bedrooms: number | 0;
  WarehouseRooms: number | 0;
  Kitchens: number | 0;
  Bathrooms: number | 0;
  Furniture?: string;
  OtherFeatures?: string;
  ParkingSpaces: number | 0;
  Heating?: string;
  Exposure?: string;
  EnergyClass?: string;
  TypeOfProperty?: string;
  StateOfTheProperty?: string;
  YearOfConstruction: number | 0;
  Price: number | 0;
  PriceReduced: number | 0;
  MQGarden: number | 0;
  CondominiumExpenses: number | 0;
  Availability?: string;
  Description: string;
  AssignmentEnd?: string;
  CreationDate?: Date;
  UpdateDate?: Date;
  Photos?: Array<RealEstatePropertyPhotos>; 
  CustomerId: number | 0;
  AgentId?: string;
  UserId: string;
  User?: User;
  Files?: FileList;
  RealEstatePropertyNotes?: Notes[];
  VideoUrl?: string;
  label?: string;
  TypeOfAssignment?: string;
  AgreedCommission: number;
  FlatRateCommission: number;
  CommissionReversal: number;
  EffectiveCommission?: number;
  MatchPercentage?: number;
  AgencyName?: string;
  AccessLevel?: number; // 1=completo, 2=solo lettura, 3=limitato
}

export class RequestTabelData {
  Id: number;
  CreationDate: Date;
  CommercialSurfaceate: number;
  AddressLine: string;
  Price: number;
  Category: string;
  Typology: string;
  StateOfTheProperty?: string;
  AssignmentEnd?: string;
  UpdateDate?: Date;
  Status: string;
  City: string;
  State?: string;
  Photos?: string | null;
  Auction:Boolean;
  Sold?: boolean;
  AdminId?: string;
  UserId?: string;
  EffectiveCommission?: number;
  AccessLevel?: number; // 1=completo, 2=solo lettura, 3=limitato
  OwnerInfo?: {
    Id: string;
    FirstName: string;
    LastName: string;
    Role: string;
    AgencyName?: string;
  };
}

export class InsertModel {
  Customers: Customer[];
  Users: User[];
}

export class RealEstatePropertyPhotos {
  Id: number;
  Url: string;
  FileName: string;
  Highlighted: boolean;
  Position: number;
  CreationDate?: Date;
  UpdateDate?: Date;
}

export class Notes {
  Id?: number;
  UserId: string;
  Text: string;
  CreationDate?: string;
  Calendar?: {
    EventStartDate: string;
    EventEndDate?: string;
    EventName?: string;
  };
}

export class SearchModel {
  Agencies: User[];
  Agents: User[];
}

export interface PublicPropertySearchFilters {
  keyword?: string;
  province?: string;
  city?: string;
  category?: string;
  typology?: string;
  status?: string;
  priceMin?: number | null;
  priceMax?: number | null;
  page?: number;
  pageSize?: number;
}

export interface PublicPropertyCard {
  Id: number;
  Title: string;
  Category: string;
  Typology?: string;
  City: string;
  State: string;
  Price: number;
  PriceReduced?: number;
  CommercialSurfaceate: number;
  Bedrooms: number;
  Bathrooms: number;
  Highlighted: boolean;
  Auction: boolean;
  Negotiation?: boolean;
  Status: string;
  MainPhotoUrl?: string | null;
}

export interface PublicPropertySearchResponse {
  Data: PublicPropertyCard[];
  Total: number;
}

export interface PropertyExportPayload {
  format?: "csv" | "excel";
  fromDate?: string | null;
  toDate?: string | null;
  filter?: string;
  contract?: string;
  priceFrom?: number | null;
  priceTo?: number | null;
  category?: string;
  typologie?: string;
  city?: string;
  province?: string;
  sold?: boolean | null;
  auction?: boolean | null;
  status?: string;
  agencyId?: string;
  agentId?: string;
}

const getRealEstateProperties = (agencyId: string, filterRequest: string, contract?: string, priceFrom?: number, priceTo?: number, category?: string, typologie?: string, town?: string[]) : Promise<Array<RealEstateProperty>> => {
   return ApiService.get(
    `RealEstateProperty/Get?currentPage=0&agencyId=${agencyId}&filterRequest=${filterRequest}&contract=${contract}&priceFrom=${priceFrom}&priceTo=${priceTo}&category=${category}&typologie=${typologie}&town=${town}`,
    ""
  )
    .then(({ data }) => {
      const result = data.Data as Array<RealEstateProperty>
      return result;
    })
    .catch(({ response }) => {
      const errorMessage = response?.data?.Message || "Errore durante il caricamento degli immobili";
      store.setError(errorMessage, response?.status);
      throw new Error(errorMessage);
    });
};

const getRealEstatePropertiesList = (agencyId: string, filterRequest: string, contract?: string, priceFrom?: number, priceTo?: number, category?: string, typologie?: string, town?: string[]) : Promise<Array<RequestTabelData>> => {
   return ApiService.get(
    `RealEstateProperty/GetList?currentPage=0&agencyId=${agencyId}&filterRequest=${filterRequest}&contract=${contract}&priceFrom=${priceFrom}&priceTo=${priceTo}&category=${category}&typologie=${typologie}&town=${town}`,
    ""
  )
    .then(({ data }) => {
      const result = data.Data as Array<any>;
      return result.map(item => ({
        Id: item.Id,
        CreationDate: item.CreationDate,
        CommercialSurfaceate: item.CommercialSurfaceate,
        AddressLine: item.AddressLine,
        Price: item.Price,
        Category: item.Category,
        Typology: item.Typology,
        StateOfTheProperty: item.StateOfTheProperty,
        AssignmentEnd: item.AssignmentEnd,
        UpdateDate: item.UpdateDate,
        Status: item.Status,
        City: item.City,
        State: item.State,
        Photos: item.FirstPhotoUrl || null,
        Auction: item.Auction,
        Sold: item.Sold,
        AdminId: item.AgencyId,
        UserId: item.AgentId,
        EffectiveCommission: item.EffectiveCommission,
        AccessLevel: item.AccessLevel || 1, // Default a 1 se non presente
        OwnerInfo: item.OwnerInfo
      } as RequestTabelData));
    })
    .catch(({ response }) => {
      const errorMessage = response?.data?.Message || "Errore durante il caricamento della lista immobili";
      store.setError(errorMessage, response?.status);
      throw new Error(errorMessage);
    });
};

const getRealEstateProperty = (id: number) => {
  return ApiService.get(`RealEstateProperty/GetById?id=${id}`, "")
    .then(({ data }) => {
      // Se la risposta è un LimitedAccessResponse (AccessLevel === 3)
      if (data.AccessLevel === 3 && data.OwnerInfo) {
        // Restituisci un oggetto speciale che indica accesso limitato
        return {
          _isLimitedAccess: true,
          Id: data.Id,
          AccessLevel: data.AccessLevel,
          OwnerInfo: data.OwnerInfo,
          EntityType: data.EntityType,
        } as any;
      }
      
      // Risposta normale con dettagli completi
      const photos = data.Photos as Array<RealEstatePropertyPhotos>;
      const result = data as RealEstateProperty;
      result.Photos = photos;
      result.RealEstatePropertyNotes = data.RealEstatePropertyNotes;
      result.AccessLevel = data.AccessLevel || 1; // Default a 1 se non presente
      if (result.UserId && !result.AgentId) {
        result.AgentId = result.UserId;
      }
      return result;
    })
    .catch(({ response }) => {
      console.log(response)
      const errorMessage = response?.data?.Message || "Errore durante il caricamento dell'immobile";
      store.setError(errorMessage, response?.status);
      throw new Error(errorMessage);
    });
};

const getToInsert = () : Promise<InsertModel> => {
  return ApiService.get(`RealEstateProperty/GetToInsert`, "")
    .then(({ data }) => {
      const agents = data.Agents as Array<User>;
      const customers = data.Customers as Array<Customer>;
      agents.forEach(agent => agent.label = agent.FirstName + ' ' + agent.LastName );
      customers.forEach(customer => customer.label = customer.FirstName + ' ' + customer.LastName );
      const result = <InsertModel>({
        Users: agents,
        Customers: customers
      })
      return result;
    })
    .catch(({ response }) => {
      const errorMessage = response?.data?.Message || "Errore durante il caricamento dei dati per l'inserimento";
      store.setError(errorMessage, response?.status);
      throw new Error(errorMessage);
    });
};

const setRealEstatePropertyPhotoHighlighted = (id : number) => {
  const formData = new FormData();
  formData.append("realEstatePropertyPhotoId", id.toString())
  return ApiService.post(`RealEstateProperty/SetRealEstatePropertyPhotoHighlighted`, 
    formData)
  .then(({ data }) => {
    return data;
  })
  .catch(({ response }) => {
    const errorMessage = response?.data?.Message || "Errore durante l'aggiornamento della foto in evidenza";
    store.setError(errorMessage, response?.status);
    throw new Error(errorMessage);
  });
}

const compressTo500KB = async (file: File): Promise<File> => {
  // Salta la compressione se non è un'immagine o è già sotto 550KB
  if (!file.type.startsWith('image/') || file.size <= 550 * 1024) {
    return file;
  }
  const options = {
    maxSizeMB: 0.5, // 500KB (in MB)
    maxWidthOrHeight: 1600, // Risoluzione ridotta
    useWebWorker: true,
    fileType: file.type.includes('jpeg') ? 'image/jpeg' : 'image/webp', // Preferisci JPEG o WebP
    initialQuality: 0.7, // Qualità iniziale più bassa
  };

  try {
    const compressedBlob = await imageCompression(file, options);
    // Mantieni il nome originale ma aggiorna l'estensione se necessario
    const newName = options.fileType === 'image/webp' 
      ? file.name.replace(/\.[^/.]+$/, ".webp") 
      : file.name.replace(/\.[^/.]+$/, ".jpg");

    return new File([compressedBlob], newName, {
      type: options.fileType,
      lastModified: Date.now()
    });
  } catch (error) {
    console.error('Errore compressione:', error);
    return file;
  }
};

const uploadFiles = async (files: FileList, id: number) => {
  const formData = new FormData();
  formData.append("PropertyId", id.toString());
  
  const filesArray = Array.from(files);
  const compressedFiles = await Promise.all(
    filesArray.map(file => compressTo500KB(file))
  );

  compressedFiles.forEach(file => {
    formData.append("Files", file);
    console.log(`File: ${file.name} | Dimensione: ${(file.size/1024).toFixed(2)}KB`);
  });

  return await ApiService.post("RealEstateProperty/UploadFiles", formData)
    .then(({ data }) => data)
    .catch(({ response }) => {
      const errorMessage = response?.data?.Message || "Errore durante il caricamento dei file";
      store.setError(errorMessage, response?.status);
      throw new Error(errorMessage);
    });
};

/**
 * Pulisce i campi numerici convertendo valori vuoti/undefined/null in 0
 * per evitare errori di deserializzazione nel backend C#
 */
const cleanNumericFields = (data: any): any => {
  const cleaned = { ...data };
  
  // Lista dei campi numerici da pulire
  const numericFields = [
    'CommercialSurfaceate',
    'TotalBuildingfloors',
    'Elevators',
    'Bedrooms',
    'WarehouseRooms',
    'Kitchens',
    'Bathrooms',
    'ParkingSpaces',
    'YearOfConstruction',
    'Price',
    'PriceReduced',
    'MQGarden',
    'CondominiumExpenses',
    'AgreedCommission',
    'FlatRateCommission',
    'CommissionReversal',
    'EffectiveCommission',
    'CustomerId'
  ];

  numericFields.forEach(field => {
    if (cleaned[field] === undefined || cleaned[field] === null || cleaned[field] === '' || Number.isNaN(Number(cleaned[field]))) {
      cleaned[field] = 0;
    } else {
      // Assicurati che il valore sia un numero valido
      const numValue = Number(cleaned[field]);
      cleaned[field] = Number.isNaN(numValue) ? 0 : numValue;
    }
  });

  return cleaned;
};

const searchPublicProperties = (filters: PublicPropertySearchFilters): Promise<PublicPropertySearchResponse> => {
  return ApiService.post("public/properties/search", filters)
    .then(({ data }) => data as PublicPropertySearchResponse)
    .catch(({ response }) => {
      const errorMessage = response?.data?.Message || "Errore durante la ricerca degli immobili";
      throw new Error(errorMessage);
    });
};

const createRealEstateProperty = async (form: any) => {
  const values = form as RealEstateProperty;
  const currentUser = store.user;
  if (!values.AgentId) {
    values.AgentId = currentUser?.Id;
  }
  if (!values.UserId && values.AgentId) {
    values.UserId = values.AgentId;
  }
  
  // Pulisce i campi numerici prima dell'invio
  const cleanedValues = cleanNumericFields(values);
  
  const formData = new FormData();

  // Campi da ignorare (non inviati al backend)
  const ignoreFields = ['Files', 'Photos', 'User', 'Customer', 'RealEstatePropertyNotes', 'UpdateDate', 'CreationDate', 'Id', 'label', 'EffectiveCommission'];

  for (const key in cleanedValues) {
    if (ignoreFields.includes(key) || cleanedValues[key as keyof RealEstateProperty] === undefined) {
      continue;
    }

    const value = cleanedValues[key as keyof RealEstateProperty];
    
    // Salta valori null o undefined
    if (value === null || value === undefined) {
      continue;
    }
    
    // Mappatura campi frontend -> backend
    if (key === 'Town') {
      // Se per caso c'è ancora Town, usa City
      formData.append('City', value?.toString() || "");
    } else if (key === 'AssignmentEnd') {
      // Per le date, assicurati che siano in formato YYYY-MM-DD
      if (!value) {
        // Se manca, usa data di default (oggi + 1 anno)
        const defaultDate = new Date();
        defaultDate.setFullYear(defaultDate.getFullYear() + 1);
        formData.append(key, defaultDate.toISOString().split('T')[0]);
      } else if (value instanceof Date) {
        formData.append(key, value.toISOString().split('T')[0]); // Formato YYYY-MM-DD
      } else if (typeof value === 'string' && value.trim() !== '') {
        // Se è già una stringa (da input type="date"), verifica che sia valida
        const dateStr = value.toString().trim();
        // Verifica formato YYYY-MM-DD
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
          formData.append(key, dateStr);
        } else {
          // Prova a parsare e convertire
          const parsed = new Date(dateStr);
          if (!isNaN(parsed.getTime())) {
            formData.append(key, parsed.toISOString().split('T')[0]);
          } else {
            // Fallback: usa data default
            const defaultDate = new Date();
            defaultDate.setFullYear(defaultDate.getFullYear() + 1);
            formData.append(key, defaultDate.toISOString().split('T')[0]);
          }
        }
      } else {
        // Fallback: usa data default
        const defaultDate = new Date();
        defaultDate.setFullYear(defaultDate.getFullYear() + 1);
        formData.append(key, defaultDate.toISOString().split('T')[0]);
      }
    } else {
      // Per valori numerici e booleani, mantieni il valore originale, altrimenti stringa
      if (typeof value === 'boolean') {
        formData.append(key, value ? 'true' : 'false');
      } else if (typeof value === 'number') {
        formData.append(key, value.toString());
      } else {
        formData.append(key, value.toString());
      }
    }
  }

  return await ApiService.post("RealEstateProperty/Create", formData)
    .then(({ data }) => {
      return data as RealEstateProperty & { Id?: number };
    })
    .catch(({ response }) => {
      if (response?.status === 429) {
        const error = new Error('Subscription limit exceeded') as any;
        error.response = response;
        throw error;
      }
      const errorMessage = response?.data?.Message || "Errore durante la creazione dell'immobile";
      store.setError(errorMessage, response?.status);
      throw new Error(errorMessage);
    });
};

const updateRealEstateProperty = async (formData: any) => {
  const values = formData as RealEstateProperty;
  if (!values.AgentId && values.UserId) {
    values.AgentId = values.UserId;
  }
  if (!values.UserId && values.AgentId) {
    values.UserId = values.AgentId;
  }
  
  // Pulisce i campi numerici prima dell'invio
  const cleanedValues = cleanNumericFields(values);
  
  return await ApiService.post("RealEstateProperty/Update", cleanedValues)
    .then(({ data }) => {
      const result = data as RealEstateProperty;
      return result;
    })
    .catch(({ response }) => {
      const errorMessage = response?.data?.Message || "Errore durante l'aggiornamento dell'immobile";
      store.setError(errorMessage, response?.status);
      throw new Error(errorMessage);
    });
};

const updatePhotosOrder = async (formData: any) => {
  const values = formData as Array<RealEstatePropertyPhotos>;
  return await ApiService.post("RealEstateProperty/UpdatePhotosOrder", values)
    .then(({ data }) => {
      const result = data;
      return result;
    })
    .catch(({ response }) => {
      const errorMessage = response?.data?.Message || "Errore durante l'aggiornamento dell'ordine delle foto";
      store.setError(errorMessage, response?.status);
      throw new Error(errorMessage);
    });
};

const deleteRealEstateProperty = async (id: Number) => {
  return await ApiService.delete(`RealEstateProperty/Delete?id=${id}`)
    .then(({ data }) => {
      const result = data as RealEstateProperty;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response?.data?.Message, response?.status);
      // Re-throw l'errore per permettere al componente di gestirlo
      throw response;
    });
};

const deletePhoto = async (id: number) => {
  return await ApiService.delete(`RealEstateProperty/DeletePhoto?id=${id}`)
    .then(({ data }) => {
      return data;
    })
    .catch(({ response }) => {
      const errorMessage = response?.data?.Message || "Errore durante l'eliminazione della foto";
      store.setError(errorMessage, response?.status);
      throw new Error(errorMessage);
    });
}

const getSearchItems = (userId: string, agencyId?: string): Promise<SearchModel> => {
  return ApiService.get(
    `RealEstateProperty/GetSearchItems?userId=${userId}&agencyId=${agencyId}`,
    ""
  )
    .then(({ data }) => {
      const agencies = data.Agencies as Array<User>;
      const agents = data.Agents as Array<User>;
      const result = <SearchModel>({
        Agencies: agencies,
        Agents: agents
      })
      return result;
    })
    .catch(({ response }) => {
      const errorMessage = response?.data?.Message || "Errore durante il caricamento dei dati di ricerca";
      store.setError(errorMessage, response?.status);
      throw new Error(errorMessage);
    });
};

const exportProperties = (payload: PropertyExportPayload) => {
  return ApiService.postBlob("RealEstateProperty/Export", payload);
};

// Public Property Detail Interface
export interface PublicPropertyDetail {
  Id: number;
  Title: string;
  Category: string;
  Typology?: string;
  Status: string;
  AddressLine: string;
  City: string;
  Location?: string;
  State: string;
  PostCode: string;
  CommercialSurfaceate: number;
  Floor?: string;
  TotalBuildingfloors: number;
  Elevators: number;
  MoreDetails?: string;
  MoreFeatures?: string;
  Bedrooms: number;
  WarehouseRooms: number;
  Kitchens: number;
  Bathrooms: number;
  Furniture?: string;
  OtherFeatures?: string;
  ParkingSpaces: number;
  Heating?: string;
  Exposure?: string;
  EnergyClass?: string;
  TypeOfProperty?: string;
  StateOfTheProperty?: string;
  YearOfConstruction: number;
  Price: number;
  PriceReduced: number;
  MQGarden: number;
  CondominiumExpenses: number;
  Availability?: string;
  Description: string;
  VideoUrl?: string;
  Highlighted: boolean;
  Auction: boolean;
  Negotiation: boolean;
  CreationDate: string;
  Photos: Array<{ Url: string; Position: number }>;
  Agency?: {
    Id: string;
    Name: string;
    CompanyName?: string;
    Email?: string;
    PhoneNumber?: string;
    MobilePhone?: string;
    Address?: string;
    City?: string;
    Province?: string;
    ZipCode?: string;
  };
  Agent?: {
    Id: string;
    FirstName: string;
    LastName: string;
    Email?: string;
    PhoneNumber?: string;
    MobilePhone?: string;
  };
}

const getPublicPropertyDetail = (id: number): Promise<PublicPropertyDetail> => {
  return ApiService.get(`public/properties/${id}`, "")
    .then(({ data }) => data as PublicPropertyDetail)
    .catch(({ response }) => {
      const errorMessage = response?.data?.Message || "Errore durante il caricamento dei dettagli dell'immobile";
      throw new Error(errorMessage);
    });
};

export { 
  getRealEstateProperties, 
  getRealEstatePropertiesList,
  getRealEstateProperty, 
  createRealEstateProperty, 
  updateRealEstateProperty, 
  deleteRealEstateProperty, 
  getToInsert, 
  setRealEstatePropertyPhotoHighlighted, 
  deletePhoto,
  uploadFiles,
  updatePhotosOrder,
  getSearchItems,
  exportProperties,
  searchPublicProperties,
  getPublicPropertyDetail }