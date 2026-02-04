import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import JwtService, { getToken, getRefreshToken, saveToken, saveRefreshToken, destroyToken } from "@/core/services/JwtService";

export interface User {
  Id: string,
  Username: string;
  Code?: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Role: string;
  Password: string;
  Token: string;
  RefreshToken?: string;
  PhoneNumber: number;
  MobilePhone?: number;
  Referent?: string;
  Address: string;
  City: string;
  ZipCode?: string;
  Province?: string;
  CreationDate?: Date;
  UpdateDate?: Date;
  AdminId?: string;
  label?: string;
  Color?: "#ffffff";
  // Dati Fiscali
  UserType?: number;
  FiscalCode?: string;
  CompanyName?: string;
  VATNumber?: string;
  PEC?: string;
  SDICode?: string;
  // Configurazione Idealista
  ClientId?: string;
  ClientSecret?: string;
  SyncToIdealista?: boolean;
}

export const useAuthStore = defineStore("auth", () => {
  const errors = ref("");
  const user = ref<User>({} as User);
  const isAuthenticated = ref(!!getToken());
  const isSubscriptionExpired = ref(false);

  function setAuth(authUser: User) {
    isAuthenticated.value = true;
    user.value = authUser;
    errors.value = "";
    isSubscriptionExpired.value = false;
    
    saveToken(user.value.Token);
    if (authUser.RefreshToken) {
      saveRefreshToken(authUser.RefreshToken);
    }
  }

  function setError(error: any, status?: number) {
    const message = typeof error === "string" ? error : error?.Message ?? error?.message ?? "";
    if (status == 400) {
      errors.value = message?.trim() || "Assicurati di aver inserito tutti i campi obbligatori.";
    } else if (status == 403) {
      errors.value = message || "Non hai i permessi per eseguire questa operazione. Puoi modificare o eliminare solo elementi di tua proprietà o della tua cerchia.";
    } else if (status == 404) {
      errors.value = message || "Elemento non trovato";
    } else if (status == 500) {
      errors.value = message || "Errore interno del server. Riprova più tardi.";
    } else {
      errors.value = message || "Si è verificato un errore. Riprova.";
    }
    
  }

  function purgeAuth() {
    isAuthenticated.value = false;
    user.value = {} as User;
    errors.value = "";
    isSubscriptionExpired.value = false;
    destroyToken();
  }

  function setSubscriptionExpired(value: boolean) {
    console.log("setSubscriptionExpired", value);
    isSubscriptionExpired.value = value;
  }

  async function login(credentials: User) {
    return await ApiService.post("auth/Login", credentials)
      .then(({ data }) => {
        setAuth(data);
      })
      .catch(({ response }) => {
        setError(response?.data?.Message ?? response?.data?.message, response?.status);
      });
  }

  function logout() {
    purgeAuth();
  }

  async function register(credentials: User) {
    // Username è già costruito nel componente SignUp
    // credentials.Username = credentials.LastName + credentials.Name;
    return await ApiService.post("auth/register", credentials)
      .then(({ data }) => {
        // setAuth(data);
      })
      .catch(({ response }) => {
        setError(response.data.Message, response.status);
      });
  }

  function forgotPassword(email: string) {
    // Pulisci eventuali errori precedenti all'inizio
    setError("");
    
    return ApiService.post("auth/forgot_password", { Email: email })
      .then((response) => {
        // Verifica se la risposta ha Status: "Success"
        if (response?.data?.Status === "Success") {
          // Assicurati che non ci siano errori residui
          setError("");
          // Tutto ok, nessun errore
          return response;
        } else if (response?.data?.Status === "Error") {
          // C'è un errore nella risposta
          setError(response.data.Message || "Si è verificato un errore durante l'invio della richiesta.");
          throw new Error(response.data.Message);
        } else {
          // Se non c'è Status, considera come errore
          setError("Risposta non valida dal server.");
          throw new Error("Risposta non valida dal server.");
        }
      })
      .catch((error) => {
        // Gestisci errori di rete o altri errori
        const errorMessage = error?.response?.data?.Message || 
                            error?.response?.data?.message || 
                            error?.message ||
                            "Si è verificato un errore durante l'invio della richiesta.";
        setError(errorMessage);
        throw error;
      });
  }

  async function verifyAuth() {
    if (getToken()) {
      // Non serve più setHeader() perché l'interceptor aggiunge automaticamente il token
      await ApiService.post("auth/VerifyToken", { api_token: getToken() })
        .then(({ data }) => {
          setAuth(data);
        })
        .catch(({ response }) => {
          setError(response.data.Message);
          refreshToken();
        });
    } else {
      purgeAuth();
    }
  }

  async function refreshToken() {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      // Non aggiungere l'header di authorization per questa richiesta
      await ApiService.post("auth/RefreshToken", { Token: refreshToken })
        .then(({ data }) => {
          setAuth(data);
        })
        .catch(({ response }) => {
          setError(response.data.Message);
          // In caso di errore, facciamo il logout se il refresh token è scaduto
          if (response.status === 401) {
            purgeAuth();
          }
        });
    } else {
      // Se non c'è refresh token, facciamo logout
      purgeAuth();
    }
  }
  
  const sendResetLink = async (_email: string) : Promise<string> =>  {
    return await ApiService.post("auth/SendResetLink?email=" + _email, "")
      .then(({ data }) => {
        return data as string;
      })
      .catch(({ response }) => {
        setError(response.data.Message, response.status);
        return undefined;
      });
  }

  const resetPassword = async (email: string, token: string, password: string) : Promise<string> =>  {
    return await ApiService.post("auth/ResetPassword", { Email: email, Token: token, Password: password })
      .then(({ data }) => {
        return data;
      })
      .catch(({ response }) => {
        setError(response.data.Message, response.status);
        return undefined;
      });
  }

  const getUser = async (id: string) : Promise<User> =>  {
      return await ApiService.get("auth/getUser?id=" + id, "")
        .then(({ data }) => {
          const result = data as Partial<User>
          return result;
        })
        .catch(({ response }) => {
          setError(response.data.Message, response.status);
          return undefined;
        });
  }

  async function verifyCredentials(email: string, token: string) {
    try {
      const response = await ApiService.post("auth/ConfirmCredentials", { Email: email, Token: token });
      
      // Clear any existing errors on success
      setError("");
      
      return response;
    } catch (error: any) {
      console.error("Errore nella verifica delle credenziali:", error);
      
      // Set appropriate error message
      if (error.response?.data?.Message) {
        setError(error.response.data.Message);
      } else if (error.response?.status === 500) {
        setError("Token non valido o scaduto. Riprova con un nuovo link di conferma.");
      } else {
        setError("Si è verificato un errore durante la verifica delle credenziali. Riprova più tardi.");
      }
      
      throw error;
    }
  }

  return {
    errors,
    user,
    isAuthenticated,
    isSubscriptionExpired,
    login,
    logout,
    register,
    forgotPassword,
    verifyAuth,
    refreshToken,
    verifyCredentials,
    setError,
    getUser,
    sendResetLink,
    resetPassword,
    setSubscriptionExpired
  };
});
