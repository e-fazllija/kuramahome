import ApiService from "@/core/services/ApiService";
import { useAuthStore, type User } from "@/stores/auth";
const store = useAuthStore();

export class Agent {
  Id?: number;
  Name: string;
  LastName: string;
  Email: string;
  PhoneNumber: number;
  MobilePhone?: number;
  Referent?: string;
  Address: string;
  Town: string;
  Region?: string;
  CreationDate?: Date;
  UpdateDate?: Date;
  Token?: string;
  Role? = "Agent";
  Password?: string;
  AgencyId: string;
  Color: string;
}

export class InsertModel {
  Users: User[];
}

const getAgents = (agencyId: string, filterRequest: string) : Promise<Array<Agent>> => {
   return ApiService.get(
    `Agents/Get?currentPage=0&agencyId=${agencyId}&filterRequest=${filterRequest}`,
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
  const values = formData as User;
  values.Password = "ThinkHome!24";
  return await store.register(values);
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