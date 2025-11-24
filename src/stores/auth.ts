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
    if(status == 400){
      errors.value = "Si è verificato un errore. Assicurati di aver inserito i campi obbligatori!";
    } else if (status == 403) {
      errors.value = error || "Non hai i permessi per eseguire questa operazione. Puoi modificare o eliminare solo elementi di tua proprietà o della tua cerchia.";
    } else if (status == 404) {
      errors.value = error || "Elemento non trovato";
    } else if (status == 500) {
      errors.value = error;
    } else {
      errors.value = "Si è verificato un errore";
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
    return ApiService.post("forgot_password", email)
      .then(() => {
        setError({});
      })
      .catch(({ response }) => {
        setError(response.data.Message);
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
