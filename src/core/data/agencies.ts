import ApiService from "@/core/services/ApiService";
import { useAuthStore, type User } from "@/stores/auth";
const store = useAuthStore();

export class Agency {
  Id?: string;
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: number;
  MobilePhone?: number;
  Referent?: string;
  Address: string;
  City: string;
  Province?: string;
  CreationDate?: Date;
  UpdateDate?: Date;
  Token?: string;
  Role? = "Agency";
  Password?: string;
  EmailConfirmed?: boolean;
  Color?: string;
  // Dati Fiscali
  UserType?: number;
  CompanyName?: string;
  FiscalCode?: string;
  VATNumber?: string;
  PEC?: string;
  SDICode?: string;
}

const getAgencies = (filterRequest: string) : Promise<Array<Agency>> => {
   return ApiService.get(
    `Agencies/Get?filterRequest=${filterRequest}`,
    ""
  )
    .then(({ data }) => {
      const result = data.Data as Partial<Array<Agency>>
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const getAgency = (id: String) : Promise<Agency> => {
  return ApiService.get(`Agencies/GetById?id=${id}`, "")
    .then(({ data }) => {
      const result = data as Partial<Agency>;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const createAgency = async (formData: any) => {
  return ApiService.post("Agencies/Create", formData)
    .then(({ data }) => {
      // Il backend restituisce AuthResponseModel, non Agency
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

const updateAgency = async (formData: any) => {
  const values = formData as User;
  return await ApiService.post("Agencies/Update", values)
    .then(({ data }) => {
      const result = data as Partial<Agency>;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const deleteAgency = async (id: String) => {
  return await ApiService.delete(`Agencies/Delete?id=${id}`)
    .then(({ data }) => {
      const result = data as Partial<Agency>;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

export { getAgencies, getAgency, createAgency, updateAgency, deleteAgency }