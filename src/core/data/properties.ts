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
  Town: string;
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
  Town: string;
  Region?: string;
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
        Town: item.Town,
        Region: item.Region,
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
      customers.forEach(customer => customer.label = customer.Name + ' ' + customer.LastName );
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

  for (const key in values) {
    if (key === "Files" && values.Files) {
      const filesArray = Array.from(values.Files);
      const compressedFiles = await Promise.all(
        filesArray.map(file => compressTo500KB(file))
      );
      
      compressedFiles.forEach(file => {
        formData.append("Files", file);
      });
    } else if (values[key as keyof RealEstateProperty] !== undefined) {
      formData.append(key, values[key as keyof RealEstateProperty]?.toString() || "");
    }
  }

  return await ApiService.post("RealEstateProperty/Create", formData)
    .then(({ data }) => data as Partial<RealEstateProperty>)
    .catch(({ response }) => {
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