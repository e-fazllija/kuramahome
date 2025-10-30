import ApiService from "@/core/services/ApiService";
import { useAuthStore, type User } from "@/stores/auth";
import type { Customer } from "./customers";
import imageCompression from 'browser-image-compression';
const store = useAuthStore();

export class RealEstateProperty {
  Id?: number;
  Title: string;
  Category: string;
  Typology: string;
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
  Location: string;
  PostCode: string;
  CommercialSurfaceate: number | 0;
  Floor?: string;
  TotalBuildingfloors: number | 0;
  Elevators: number | 0; 
  MoreDetails?: string;
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
  Description?: string;
  AssignmentEnd?: string;
  CreationDate?: Date;
  UpdateDate?: Date;
  Photos?: Array<RealEstatePropertyPhotos>; 
  CustomerId: number | 0;
  AgentId: string;
  Agent?: User;
  Files?: FileList;
  RealEstatePropertyNotes?: Notes[];
  VideoUrl?: string;
  label?: string;
  TypeOfAssignment: string;
  AgreedCommission: number;
  FlatRateCommission: number;
  StornoProvvigione: number;
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
  Status: string;
  City: string;
  Province?: string;
  Photos?: string | null;
  Auction:Boolean;
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
  CreationDate?: Date;
  UpdateDate?: Date;
}

export class Notes {
  Id?: number;
  ApplicationUserId: string;
  Text: string;
}

export class SearchModel {
  Agencies: User[];
  Agents: User[];
}

const getRealEstateProperties = (agencyId: string, filterRequest: string, contract?: string, priceFrom?: number, priceTo?: number, category?: string, typologie?: string, town?: string[]) : Promise<Array<RealEstateProperty>> => {
   return ApiService.get(
    `RealEstateProperty/Get?currentPage=0&agencyId=${agencyId}&filterRequest=${filterRequest}&contract=${contract}&priceFrom=${priceFrom}&priceTo=${priceTo}&category=${category}&typologie=${typologie}&town=${town}`,
    ""
  )
    .then(({ data }) => {
      const result = data.Data as Partial<Array<RealEstateProperty>>
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
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
        Status: item.Status,
        City: item.City,
        Province: item.Province,
        Photos: item.FirstPhotoUrl || null,
        Auction: item.Auction
      } as RequestTabelData));
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const getRealEstateProperty = (id: number) => {
  return ApiService.get(`RealEstateProperty/GetById?id=${id}`, "")
    .then(({ data }) => {
      const photos = data.Photos as Array<RealEstatePropertyPhotos>;
      const result = data as Partial<RealEstateProperty>;
      result.Photos = photos;
      result.RealEstatePropertyNotes = data.RealEstatePropertyNotes;
      return result;
    })
    .catch(({ response }) => {
      console.log(response)
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const getToInsert = (agencyId?: string) : Promise<InsertModel> => {
  return ApiService.get(`RealEstateProperty/GetToInsert?agencyId=${agencyId}`, "")
    .then(({ data }) => {
      const agents = data.Agents as Array<User>;
      const customers = data.Customers as Array<Customer>;
      customers.forEach(customer => customer.label = customer.FirstName + ' ' + customer.LastName );
      agents.forEach(agent => agent.label = agent.Name + ' ' + agent.LastName );
      const result = <InsertModel>({
        Users: agents,
        Customers: customers
      })
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
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
    store.setError(response.data.Message, response.status);
    return undefined;
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
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const createRealEstateProperty = async (form: any) => {
  const values = form as RealEstateProperty;
  values.AgentId = store.user.Id;
  const formData = new FormData();

  // Campi da ignorare (non inviati al backend)
  const ignoreFields = ['Files', 'Photos', 'Agent', 'Customer', 'RealEstatePropertyNotes', 'UpdateDate', 'CreationDate', 'Id', 'label'];

  for (const key in values) {
    if (ignoreFields.includes(key) || values[key as keyof RealEstateProperty] === undefined) {
      continue;
    }

    const value = values[key as keyof RealEstateProperty];
    
    // Salta valori null o undefined
    if (value === null || value === undefined) {
      continue;
    }
    
    // Mappatura campi frontend -> backend
    if (key === 'StornoProvvigione') {
      formData.append('CommissionReversal', value?.toString() || "");
    } else if (key === 'Town') {
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
      return data as Partial<RealEstateProperty> & { Id?: number };
    })
    .catch(({ response }) => {
      if (response.status === 429) {
        const error = new Error('Subscription limit exceeded') as any;
        error.response = response;
        throw error;
      }
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const updateRealEstateProperty = async (formData: any) => {
  const values = formData as RealEstateProperty;
  return await ApiService.post("RealEstateProperty/Update", values)
    .then(({ data }) => {
      const result = data as Partial<RealEstateProperty>;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
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
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const deleteRealEstateProperty = async (id: Number) => {
  return await ApiService.delete(`RealEstateProperty/Delete?id=${id}`)
    .then(({ data }) => {
      const result = data as Partial<RealEstateProperty>;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const deletePhoto = async (id: number) => {
  return await ApiService.delete(`RealEstateProperty/DeletePhoto?id=${id}`)
    .then(({ data }) => {
      return data;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
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
      store.setError(response.data.Message, response.status);
      return undefined;
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
  getSearchItems }