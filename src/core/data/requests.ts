import ApiService from "@/core/services/ApiService";
import { useAuthStore, type User } from "@/stores/auth";
import type { Customer } from "@/core/data/customers";
import type { RealEstateProperty } from "@/core/data/properties";
const store = useAuthStore();

/**
 * Pulisce i campi numerici convertendo valori vuoti/undefined/null in 0
 * per evitare errori di deserializzazione nel backend C#
 */
const cleanNumericFields = (data: any): any => {
  const cleaned = { ...data };
  
  // Lista dei campi numerici da pulire
  const numericFields = [
    'CustomerId',
    'PriceTo',
    'PriceFrom',
    'GardenFrom',
    'GardenTo',
    'MQFrom',
    'MQTo',
    'ParkingSpaces'
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

export class Request {
  Id?: number;
  CustomerId: number;
  Contract: string;
  PropertyType: string;
  Province: string;
  City: string;
  Location: string;
  PriceTo: number;
  PriceFrom: number;
  GardenFrom: number;
  GardenTo: number;
  Archived: boolean;
  Closed: boolean;
  RoomsNumber?: string;
  MQFrom: number;
  MQTo: number;
  PropertyState?: string;
  Heating?: string;
  ParkingSpaces: number;
  Notes?: string;
  CreationDate?: Date;
  UpdateDate?: Date;
  Customer?: Customer
  RealEstateProperties?: RealEstateProperty[];
  StringDate?: string;
  MortgageAdviceRequired: boolean;
  RequestNotes?: Notes[];
  UserId?: string;
  label?: string;
}

export class RequestTabelData {
  Id?: number;
  CustomerName: string;
  CustomerLastName: string;
  CustomerEmail: string;
  CustomerPhone: string;
  Contract: string;
  CreationDate?: Date;
  City:string;
  Locations: string;
  PriceTo: number;
  PriceFrom: number;
  PropertyType: string;
  Status:string;
  UserId?: string;
}

export class InsertModel {
  Customers: Customer[];
  Users: User[];
}

export class Notes {
  Id?: number;
  UserId: string;
  Text: string;
}

const getRequests = (userId: string, filterRequest: string): Promise<Array<Request>> => {
  return ApiService.get(
    `Requests/Get?currentPage=0&userId=${userId}&filterRequest=${filterRequest}`,
    ""
  )
    .then(({ data }) => {
      const result = data.Data as Array<Request>
      return result;
    })
    .catch(({ response }) => {
      const errorMessage = response?.data?.Message || "Errore durante il caricamento delle richieste";
      store.setError(errorMessage, response?.status);
      throw new Error(errorMessage);
    });
};

const getRequestsList = (filterRequest: string, userIdOverride?: string): Promise<Array<RequestTabelData>> => {
  const store = useAuthStore();
  const role = store.user?.Role;
  const effectiveUserId =
    userIdOverride !== undefined
      ? userIdOverride
      : role === "Agent" || role === "Admin"
        ? store.user.Id
        : "";

  return ApiService.get(
    `Requests/GetList?currentPage=0&userId=${effectiveUserId}&filterRequest=${filterRequest}`,
    ""
  )
    .then(({ data }) => {
      const result = data.Data as Array<any>;
      return result.map(item => ({
        Id: item.Id,
        CustomerName: item.CustomerName,
        CustomerLastName: item.CustomerLastName,
        CustomerEmail: item.CustomerEmail,
        CustomerPhone: item.CustomerPhone,
        Contract: item.Contract,
        CreationDate: item.CreationDate,
        StringDate: item.CreationDate.toString().substring(0, 10).split('-').reverse().join('-'),
        Locations: item.Location,
        City: item.City ?? item.Town,
        PriceTo: item.PriceTo,
        PriceFrom: item.PriceFrom,
        PropertyType: item.PropertyType,
        Status: item.Archived == true ? "Archviviata" : item.Closed == true ? "Chiusa" : "Aperta",
        UserId: item.UserId
      } as RequestTabelData));
    })
    .catch(({ response }) => {
      const errorMessage = response?.data?.Message || "Errore durante il caricamento della lista richieste";
      store.setError(errorMessage, response?.status);
      throw new Error(errorMessage);
    });
};

const getCustomerRequests = (customerId: number): Promise<Array<Request>> => {
  return ApiService.get(
    `Requests/GetCustomerRequests?customerId=${customerId}`,
    ""
  )
    .then(({ data }) => {
      const result = data.Data as Array<Request>
      return result;
    })
    .catch(({ response }) => {
      const errorMessage = response?.data?.Message || "Errore durante il caricamento delle richieste del cliente";
      store.setError(errorMessage, response?.status);
      throw new Error(errorMessage);
    });
};

const getRequest = (id: number): Promise<Request> => {
  return ApiService.get(`Requests/GetById?id=${id}`, "")
    .then(({ data }) => {
      const result = data as Request;
      result.Customer = data.Customer as Customer;
      result.RealEstateProperties = data.RealEstateProperties;
      result.RequestNotes = data.RequestNotes;
      return result;
    })
    .catch(({ response }) => {
      const errorMessage = response?.data?.Message || "Errore durante il caricamento della richiesta";
      store.setError(errorMessage, response?.status);
      throw new Error(errorMessage);
    });
};

const createRequest = async (formData: Request) => {
  // Pulisce i campi numerici prima dell'invio
  const cleanedData = cleanNumericFields(formData);
  return ApiService.post("Requests/Create", cleanedData)
    .then(({ data }) => {
      const result = data as Request;
      return result;
    })
    .catch(async ({ response }) => {
      if (response?.status === 429) {
        const error = new Error('Subscription limit exceeded') as any;
        error.response = response;
        throw error;
      }
      const errorMessage = response?.data?.Message || "Errore durante la creazione della richiesta";
      store.setError(errorMessage, response?.status);
      throw new Error(errorMessage);
    });
};

const updateRequest = async (formData: Request) => {
  // Pulisce i campi numerici prima dell'invio
  const cleanedData = cleanNumericFields(formData);
  return ApiService.post("Requests/Update", cleanedData)
    .then(({ data }) => {
      const result = data as Request;
      return result;
    })
    .catch(({ response }) => {
      const errorMessage = response?.data?.Message || "Errore durante l'aggiornamento della richiesta";
      store.setError(errorMessage, response?.status);
      throw new Error(errorMessage);
    });
};

const deleteRequest = async (id: number) => {
  return await ApiService.delete(`Requests/Delete?id=${id}`)
    .then(({ data }) => {
      const result = data as Request;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response?.data?.Message, response?.status);
      // Re-throw l'errore per permettere al componente di gestirlo
      throw response;
    });
};

export interface RequestExportPayload {
  format?: "csv" | "excel";
  fromDate?: string | null;
  toDate?: string | null;
  priceFrom?: number | null;
  priceTo?: number | null;
  contract?: string;
  propertyTypes?: string[];
  province?: string;
  city?: string;
  status?: string;
  search?: string;
}

const exportRequests = (payload: RequestExportPayload) => {
  return ApiService.postBlob("Requests/Export", payload);
};

const getToInsert = (): Promise<InsertModel> => {
  return ApiService.get(`RealEstateProperty/GetToInsert`, "")
    .then(({ data }) => {
      const agents = data.Agents as Array<User>;
      const customers = data.Customers as Array<Customer>;
      agents.forEach(agent => agent.label = agent.FirstName + ' ' + agent.LastName);
      customers.forEach(customer => customer.label = customer.FirstName + ' ' + customer.LastName);
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

export { getRequests, getRequestsList, getRequest, createRequest, updateRequest, deleteRequest, getToInsert, getCustomerRequests, exportRequests }
