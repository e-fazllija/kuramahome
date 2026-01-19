import ApiService from "@/core/services/ApiService";
import { useAuthStore, type User } from "@/stores/auth";
const store = useAuthStore();

/**
 * Pulisce i campi numerici convertendo valori vuoti/undefined/null in 0
 * per evitare errori di deserializzazione nel backend C#
 */
const cleanNumericFields = (data: any): any => {
  const cleaned = { ...data };
  
  // Lista dei campi numerici da pulire
  const numericFields = [
    'Phone'
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

export class Customer{
  Id?: number;
  Buyer: boolean;
  Seller: boolean;
  Builder: boolean;
  Other: boolean;
  GoldCustomer: boolean;
  FirstName: string;  // Corretto da Name a FirstName
  LastName: string;
  Email: string;
  Phone: number;  // Cambiato da number | null a number per corrispondere al backend
  Description: string;
  Address: string;  // Corretto da AdressLine a Address
  City: string;     // Corretto da Town a City
  State: string;
  CreationDate?: Date;
  UpdateDate?: Date;
  Token?: string;
  AcquisitionDone: boolean;
  OngoingAssignment: boolean;
  CustomerNotes?: Notes[];
  UserId?: string;
  label?: string;
  AdminId?: string;
  AccessLevel?: number; // 1=completo, 2=solo lettura, 3=limitato
}

export class CustomerTabelData {
  Id?: number;
  Name: string;
  Type: string;
  Email: string;
  Phone: string;
  UserId?: string;
  AccessLevel?: number; // 1=completo, 2=solo lettura, 3=limitato
  OwnerInfo?: {
    Id: string;
    FirstName: string;
    LastName: string;
    Role: string;
    AgencyName?: string;
  };
}

export class Notes {
  Id?: number;
  UserId: string;
  Text: string;
}

export interface CustomerExportPayload {
  format?: "csv" | "excel";
  fromDate?: string | null;
  toDate?: string | null;
  type?: string;
  ownerId?: string;
  goldCustomer?: boolean | null;
  filter?: string;
}

const getCustomers = (filterRequest: string) : Promise<Array<Customer>> => {
   return ApiService.get(
    `Customers/Get?filterRequest=${filterRequest}`,
    ""
  )
    .then(({ data }) => {
      const result = data.Data as Array<Customer>
      return result;
    })
    .catch(({ response }) => {
      const errorMessage = response?.data?.Message || "Errore durante il caricamento dei clienti";
      store.setError(errorMessage, response?.status);
      throw new Error(errorMessage);
    });
};

const getCustomer = (id: number) : Promise<Customer> => {
  return ApiService.get(`Customers/GetById?id=${id}`, "")
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
      const result = data as Customer;
      result.CustomerNotes = data.CustomerNotes;
      result.AccessLevel = data.AccessLevel || 1; // Default a 1 se non presente
      return result;
    })
    .catch(({ response }) => {
      const errorMessage = response?.data?.Message || "Errore durante il caricamento del cliente";
      store.setError(errorMessage, response?.status);
      throw new Error(errorMessage);
    });
};

const createCustomer = async (formData:Customer) => {
  // Pulisce i campi numerici prima dell'invio
  const cleanedData = cleanNumericFields(formData);
  return ApiService.post("Customers/Create", cleanedData)
    .then(({ data }) => {
      const result = data as Customer;
      return result;
    })
    .catch(({ response }) => {
      if (response?.status === 429) {
        const error = new Error('Subscription limit exceeded') as any;
        error.response = response;
        throw error;
      }
      const errorMessage = response?.data?.Message || "Errore durante la creazione del cliente";
      store.setError(errorMessage, response?.status);
      throw new Error(errorMessage);
    });
};

const updateCustomer = async (formData:Customer) => {
  // Pulisce i campi numerici prima dell'invio
  const cleanedData = cleanNumericFields(formData);
  return ApiService.post("Customers/Update", cleanedData)
    .then(({ data }) => {
      const result = data as Customer;
      return result;
    })
    .catch(({ response }) => {
      const errorMessage = response?.data?.Message || "Errore durante l'aggiornamento del cliente";
      store.setError(errorMessage, response?.status);
      throw new Error(errorMessage);
    });
};

const deleteCustomer = async (id: number) => {
  return await ApiService.delete(`Customers/Delete?id=${id}`)
    .then(({ data }) => {
      const result = data as Customer;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response?.data?.Message, response?.status);
      // Re-throw l'errore per permettere al componente di gestirlo
      throw response;
    });
};

const exportCustomers = (payload: CustomerExportPayload) => {
  return ApiService.postBlob("Customers/Export", payload);
};

export { getCustomers, getCustomer, createCustomer, updateCustomer, deleteCustomer, exportCustomers }
