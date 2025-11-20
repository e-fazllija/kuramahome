import ApiService from "@/core/services/ApiService";
import { useAuthStore, type User } from "@/stores/auth";
const store = useAuthStore();

export class Agent {
  Id?: string;
  UserName?: string;
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
  MobilePhone?: string;
  Referent?: string;
  Address: string;
  City: string;
  ZipCode?: string;
  Province?: string;
  CreationDate?: Date;
  UpdateDate?: Date;
  Token?: string;
  Role? = "Agent";
  Password?: string;
  AdminId?: string;
  Color: string;
  // Dati Fiscali
  UserType?: number;
  FiscalCode?: string;
  CompanyName?: string;
  VATNumber?: string;
  PEC?: string;
  SDICode?: string;
}

export class InsertModel {
  Users: User[];
}

export interface AgentExportPayload {
  format?: "csv" | "excel";
  fromDate?: string | null;
  toDate?: string | null;
  agencyId?: string;
  onlyActive?: boolean | null;
  search?: string;
}

const getAgents = (agencyFilter: string, filterRequest: string) : Promise<Array<Agent>> => {
   return ApiService.get(
    `Agents/Get?filterRequest=${filterRequest}&agencyFilter=${agencyFilter}`,
    ""
  )
    .then(({ data }) => {
      const result = data.Data as Array<Agent>
      return result;
    })
    .catch(({ response }) => {
      const errorMessage = response?.data?.Message || "Errore durante il caricamento degli agenti";
      store.setError(errorMessage, response?.status);
      throw new Error(errorMessage);
    });
};

const getAgent = (id: String) : Promise<Agent> => {
  return ApiService.get(`Agents/GetById?id=${id}`, "")
    .then(({ data }) => {
      const result = data as Agent;
      return result;
    })
    .catch(({ response }) => {
      const errorMessage = response?.data?.Message || "Errore durante il caricamento dell'agente";
      store.setError(errorMessage, response?.status);
      throw new Error(errorMessage);
    });
};

const createAgent = async (formData: any) => {
  return ApiService.post("Agents/Create", formData)
    .then(({ data }) => {
      // Il backend restituisce AuthResponseModel, non Agent
      return data;
    })
    .catch(({ response }) => {
      // Se errore 429 (limite raggiunto), rilanciamo con response data per gestirlo nel componente
      if (response?.status === 429) {
        const error = new Error('Subscription limit exceeded') as any;
        error.response = response;
        throw error;
      }
      const errorMessage = response?.data?.Message || "Errore durante la creazione dell'agente";
      store.setError(errorMessage, response?.status);
      throw new Error(errorMessage);
    });
};

const updateAgent = async (formData: any) => {
  const values = formData as User;
  return await ApiService.post("Agents/Update", values)
    .then(({ data }) => {
      const result = data as Agent;
      return result;
    })
    .catch(({ response }) => {
      const errorMessage = response?.data?.Message || "Errore durante l'aggiornamento dell'agente";
      store.setError(errorMessage, response?.status);
      throw new Error(errorMessage);
    });
};

const deleteAgent = async (id: String) => {
  console.log(id)
  return await ApiService.delete(`Agents/Delete?id=${id}`)
    .then(({ data }) => {
      const result = data as Agent;
      return result;
    })
    .catch(({ response }) => {
      const errorMessage = response?.data?.Message || "Errore durante l'eliminazione dell'agente";
      store.setError(errorMessage, response?.status);
      throw new Error(errorMessage);
    });
};

const exportAgents = (payload: AgentExportPayload) => {
  return ApiService.postBlob("Agents/Export", payload);
};

export { getAgents, getAgent, createAgent, updateAgent, deleteAgent, exportAgents }