import type { App } from "vue";
import type { AxiosResponse } from "axios";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService, { getToken } from "@/core/services/JwtService";
import { useAuthStore } from "@/stores/auth";

/**
 * @description service to call HTTP request via Axios
 */
class ApiService {
  /**
   * @description property to share vue instance
   */
  public static vueInstance: App;

  /**
   * @description initialize vue axios
   */
  public static init(app: App<Element>) {
    ApiService.vueInstance = app;
    ApiService.vueInstance.use(VueAxios, axios);
    ApiService.vueInstance.axios.defaults.baseURL =
      //"https://thinkhomebe.azurewebsites.net/api/";
      "https://localhost:7267/api/";
    
    // Interceptor per aggiungere automaticamente il token a ogni richiesta
    ApiService.vueInstance.axios.interceptors.request.use(
      (config) => {
        const token = getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Interceptor per gestire le risposte HTTP
    ApiService.vueInstance.axios.interceptors.response.use(
      (response) => {
        // Status 200 - continua normalmente
        return response;
      },
      async (error) => {
        const authStore = useAuthStore();
        const originalRequest = error.config;

        if (error.response) {
          const status = error.response.status;
          
          if (status === 401 && !originalRequest._retry && !originalRequest.url.includes("/auth/refresh")) {
            originalRequest._retry = true;
            try {
              await authStore.refreshToken();
              return ApiService.vueInstance.axios(originalRequest); // ripeti la richiesta originale
            } catch (refreshError) {
              authStore.logout();
            }
            // Status 401 - effettua logout
            authStore.logout();
          } else if (status === 403) {
            // Status 403 - marca sottoscrizione come scaduta
            authStore.setSubscriptionExpired(true);
          }
        }
        
        return Promise.reject(error);
      }
    );
  }

  /**
   * @description set the default HTTP request headers
   */
  public static setHeader(): void {
    ApiService.vueInstance.axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${getToken()}`;
    ApiService.vueInstance.axios.defaults.headers.common["Accept"] =
      "application/json";
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static query(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(resource, params);
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @returns Promise<AxiosResponse>
   */
  public static async get(
    resource: string,
    response_type
  ): Promise<AxiosResponse> {
    return await ApiService.vueInstance.axios.get(`${resource}`, { responseType: response_type});
  }

  /**
   * @description set the POST HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static async post(resource: string, params: any): Promise<AxiosResponse> {
    return await ApiService.vueInstance.axios.post(`${resource}`, params);
  }

  /**
   * @description send the UPDATE HTTP request
   * @param resource: string
   * @param slug: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static async update(
    resource: string,
    slug: string,
    params: any
  ): Promise<AxiosResponse> {
    return await ApiService.vueInstance.axios.put(`${resource}/${slug}`, params);
  }

  /**
   * @description Send the PUT HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static async put(resource: string, params: any): Promise<AxiosResponse> {
    return await ApiService.vueInstance.axios.put(`${resource}`, params);
  }

  /**
   * @description Send the DELETE HTTP request
   * @param resource: string
   * @returns Promise<AxiosResponse>
   */
  public static async delete(resource: string): Promise<AxiosResponse> {
    return await ApiService.vueInstance.axios.delete(resource);
  }
}

export default ApiService;
