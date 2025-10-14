import ApiService from "@/core/services/ApiService";
import { useAuthStore, type User } from "@/stores/auth";
const store = useAuthStore();

export class Customer{
  Id?: number;
  Buyer: boolean;
  Seller: boolean;
  Builder: boolean;
  Other: boolean;
  GoldCustomer: boolean;
  Name: string;
  LastName: string;
  Email: string;
  Phone: number;
  Description: string;
  AdressLine: string;
  Town: string;
  State: string;
  CreationDate?: Date;
  UpdateDate?: Date;
  Token?: string;
  Code: string;
  AcquisitionDone: boolean;
  OngoingAssignment: boolean;
  CustomerNotes?: Notes[];
  AgencyId?: string;
  label?: string;
}

export class CustomerTabelData {
  Id?: number;
  Name: string;
  Type: string;
  Email: string;
  Phone: string;
}

export class Notes {
  Id?: number;
  ApplicationUserId: string;
  Text: string;
}

const getCustomers = (agencyId: string, filterRequest: string) : Promise<Array<Customer>> => {
   return ApiService.get(
    `Customers/Get?currentPage=0&agencyId=${agencyId}&filterRequest=${filterRequest}`,
    ""
  )
    .then(({ data }) => {
      const result = data.Data as Partial<Array<Customer>>
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const getCustomer = (id: number) : Promise<Customer> => {
  return ApiService.get(`Customers/GetById?id=${id}`, "")
    .then(({ data }) => {
      const result = data as Partial<Customer>;
      result.CustomerNotes = data.CustomerNotes;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const createCustomer = async (formData:Customer) => {
  return ApiService.post("Customers/Create", formData)
    .then(({ data }) => {
      const result = data as Partial<Customer>;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const updateCustomer = async (formData:Customer) => {
  return ApiService.post("Customers/Update", formData)
    .then(({ data }) => {
      const result = data as Partial<Customer>;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const deleteCustomer = async (id: number) => {
  return await ApiService.delete(`Customers/Delete?id=${id}`)
    .then(({ data }) => {
      const result = data as Partial<Customer>;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

export { getCustomers, getCustomer, createCustomer, updateCustomer, deleteCustomer }
