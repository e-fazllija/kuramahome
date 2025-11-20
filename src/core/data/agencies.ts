import ApiService from "@/core/services/ApiService";
import { useAuthStore, type User } from "@/stores/auth";
const store = useAuthStore();

export class Agency {
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

export interface AgencyExportPayload {
  format?: "csv" | "excel";
  fromDate?: string | null;
  toDate?: string | null;
  onlyActive?: boolean | null;
  search?: string;
}

const getAgencies = (filterRequest: string) : Promise<Array<Agency>> => {
   return ApiService.get(
    `Agencies/Get?filterRequest=${filterRequest}`,
    ""
  )
    .then(({ data }) => {
      const result = data.Data as Array<Agency>
      return result;
    })
    .catch(({ response }) => {
      const errorMessage = response?.data?.Message || "Errore durante il caricamento delle agenzie";
      store.setError(errorMessage, response?.status);
      throw new Error(errorMessage);
    });
};

const getAgency = (id: String) : Promise<Agency> => {
  return ApiService.get(`Agencies/GetById?id=${id}`, "")
    .then(({ data }) => {
      const result = data as Agency;
      return result;
    })
    .catch(({ response }) => {
      const errorMessage = response?.data?.Message || "Errore durante il caricamento dell'agenzia";
      store.setError(errorMessage, response?.status);
      throw new Error(errorMessage);
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
      if (response?.status === 429) {
        const error = new Error('Subscription limit exceeded') as any;
        error.response = response;
        throw error;
      }
      const errorMessage = response?.data?.Message || "Errore durante la creazione dell'agenzia";
      store.setError(errorMessage, response?.status);
      throw new Error(errorMessage);
    });
};

const updateAgency = async (formData: any) => {
  const values = formData as User;
  return await ApiService.post("Agencies/Update", values)
    .then(({ data }) => {
      const result = data as Agency;
      return result;
    })
    .catch(({ response }) => {
      const errorMessage = response?.data?.Message || "Errore durante l'aggiornamento dell'agenzia";
      store.setError(errorMessage, response?.status);
      throw new Error(errorMessage);
    });
};

const deleteAgency = async (id: String) => {
  return await ApiService.delete(`Agencies/Delete?id=${id}`)
    .then(({ data }) => {
      const result = data as Agency;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response?.data?.Message, response?.status);
      // Re-throw l'errore per permettere al componente di gestirlo
      throw response;
    });
};

const exportAgencies = (payload: AgencyExportPayload) => {
  return ApiService.postBlob("Agencies/Export", payload);
};

export { getAgencies, getAgency, createAgency, updateAgency, deleteAgency, exportAgencies }