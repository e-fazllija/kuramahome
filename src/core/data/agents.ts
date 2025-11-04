import ApiService from "@/core/services/ApiService";
import { useAuthStore, type User } from "@/stores/auth";
const store = useAuthStore();

export class Agent {
  Id?: number;
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: number;
  MobilePhone?: number;
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
  AgencyId: string;
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

const getAgents = (agencyFilter: string, filterRequest: string) : Promise<Array<Agent>> => {
   return ApiService.get(
    `Agents/Get?filterRequest=${filterRequest}&agencyFilter=${agencyFilter}`,
    ""
  )
    .then(({ data }) => {
      const result = data.Data as Partial<Array<Agent>>
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const getAgent = (id: String) : Promise<Agent> => {
  return ApiService.get(`Agents/GetById?id=${id}`, "")
    .then(({ data }) => {
      const result = data as Partial<Agent>;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
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
      if (response.status === 429) {
        const error = new Error('Subscription limit exceeded') as any;
        error.response = response;
        throw error;
      }
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const updateAgent = async (formData: any) => {
  const values = formData as User;
  return await ApiService.post("Agents/Update", values)
    .then(({ data }) => {
      const result = data as Partial<Agent>;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const deleteAgent = async (id: String) => {
  console.log(id)
  return await ApiService.delete(`Agents/Delete?id=${id}`)
    .then(({ data }) => {
      const result = data as Partial<Agent>;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

export { getAgents, getAgent, createAgent, updateAgent, deleteAgent }