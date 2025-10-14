import ApiService from "@/core/services/ApiService";
import { useAuthStore, type User } from "@/stores/auth";
import type { Customer } from "@/core/data/customers";
import type { RealEstateProperty } from "@/core/data/properties";
const store = useAuthStore();

export class Request {
  Id?: number;
  CustomerId: number;
  Contract: string;
  PropertyType: string;
  Province: string;
  Town: string;
  Location:string;
  PriceTo: number;
  PriceFrom: number;
  MQGarden: number;
  GardenTo?: number;
  GardenFrom?: number;
  Archived: boolean;
  Closed: boolean;
  RoomsNumber?: string;
  MQFrom?: number;
  MQTo?: number;
  PropertyState?: string;
  Heating?: string;
  ParkingSpaces?: number;
  Notes?: string;
  CreationDate?: Date;
  UpdateDate?: Date;
  Customer?: Customer
  RealEstateProperties?: RealEstateProperty[];
  StringDate?: string;
  MortgageAdviceRequired: boolean;
  RequestNotes?: Notes[];
  AgencyId?: string;
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
  Town:string;
  Locations: string;
  PriceTo: number;
  PriceFrom: number;
  PropertyType: string;
  Status:string;
}

export class InsertModel {
  Customers: Customer[];
  Users: User[];
}

export class Notes {
  Id?: number;
  ApplicationUserId: string;
  Text: string;
}

const getRequests = (agencyId: string, filterRequest: string): Promise<Array<Request>> => {
  return ApiService.get(
    `Requests/Get?currentPage=0&agencyId=${agencyId}&filterRequest=${filterRequest}`,
    ""
  )
    .then(({ data }) => {
      const result = data.Data as Partial<Array<Request>>
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const getRequestsList = (agencyId: string, filterRequest: string): Promise<Array<RequestTabelData>> => {
  return ApiService.get(
    `Requests/GetList?currentPage=0&agencyId=${agencyId}&filterRequest=${filterRequest}`,
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
        Town: item.Town,
        PriceTo: item.PriceTo,
        PriceFrom: item.PriceFrom,
        PropertyType: item.PropertyType,
        Status: item.Archived == true ? "Archviviata" : item.Closed == true ? "Chiusa" : "Aperta"
      } as RequestTabelData));
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const getCustomerRequests = (customerId: number): Promise<Array<Request>> => {
  return ApiService.get(
    `Requests/GetCustomerRequests?customerId=${customerId}`,
    ""
  )
    .then(({ data }) => {
      const result = data.Data as Partial<Array<Request>>
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const getRequest = (id: number): Promise<Request> => {
  return ApiService.get(`Requests/GetById?id=${id}`, "")
    .then(({ data }) => {
      const result = data as Partial<Request>;
      result.Customer = data.Customer as Customer;
      result.RealEstateProperties = data.RealEstateProperties;
      result.RequestNotes = data.RequestNotes;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const createRequest = async (formData: Request) => {
  return ApiService.post("Requests/Create", formData)
    .then(({ data }) => {
      const result = data as Partial<Request>;
      return result;
    })
    .catch(async ({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const updateRequest = async (formData: Request) => {
  return ApiService.post("Requests/Update", formData)
    .then(({ data }) => {
      const result = data as Partial<Request>;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const deleteRequest = async (id: number) => {
  return await ApiService.delete(`Requests/Delete?id=${id}`)
    .then(({ data }) => {
      const result = data as Partial<Request>;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const getToInsert = (agencyId?: string): Promise<InsertModel> => {
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

export { getRequests, getRequestsList, getRequest, createRequest, updateRequest, deleteRequest, getToInsert, getCustomerRequests }
