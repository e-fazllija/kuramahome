import ApiService from "@/core/services/ApiService";
import { useAuthStore, type User } from "@/stores/auth";
const store = useAuthStore();

export class Documentation {
  Id?: number;
  File?: File;
  FileName?: string;
  FolderName?: string;
  FileUrl?: string;
  IsFolder?: boolean;
  IsPrivate?: boolean;
  ParentPath?: string;
  DisplayName?: string;
  FileSizeBytes?: number;
  AgencyId?: string;
  UserId?: string;
  CreationDate?: Date;
  // Campi per permessi e proprietà
  IsOwner?: boolean;
  CanModify?: boolean;
  CreatorName?: string;
}

export class CreateFolderRequest {
  FolderName: string;
  ParentPath?: string;
}

export interface GetDocumentsResponse {
  Documents: Documentation[];
  TotalStorageUsedBytes: number;
  LimitBytes: number | null;
}

const getDocumentations = (parentPath?: string): Promise<GetDocumentsResponse> => {
  const params = parentPath ? `?parentPath=${encodeURIComponent(parentPath)}` : "";
  return ApiService.get(`BlobStorage/GetDocuments${params}`, "")
    .then(({ data }) => {
      const raw = data as any;
      if (raw?.Documents) {
        return {
          Documents: raw.Documents,
          TotalStorageUsedBytes: raw.TotalStorageUsedBytes ?? 0,
          LimitBytes: raw.LimitBytes ?? null,
        };
      }
      return { Documents: raw ?? [], TotalStorageUsedBytes: 0, LimitBytes: null };
    })
    .catch(({ response }) => {
      const errorMessage = response?.data?.Message || "Errore durante il caricamento dei documenti";
      store.setError(errorMessage, response?.status);
      throw new Error(errorMessage);
    });
};

const createFolder = async (folderRequest: CreateFolderRequest) => {
  return ApiService.post("BlobStorage/CreateFolder", folderRequest)
    .then(({ data }) => {
      const result = data as Partial<Documentation>;
      return result;
    })
    .catch(({ response }) => {
      const errorMessage = response?.data?.Message || "Errore durante la creazione della cartella";
      store.setError(errorMessage, response?.status);
      throw new Error(errorMessage);
    });
};

const uploadFile = async (file: File, parentPath?: string, isPrivate: boolean = false) => {
  const formData = new FormData();
  formData.append("File", file);
  if (parentPath) {
    formData.append("ParentPath", parentPath);
  }
  formData.append("IsPrivate", isPrivate.toString());
  
  return ApiService.post("BlobStorage/InsertDocument", formData)
    .then(({ data }) => {
      const result = data as Partial<Documentation>;
      return result;
    })
    .catch(({ response }) => {
      let errorMessage = response?.data?.Message;
      if (!errorMessage && response?.status === 400) {
        // Errore validazione ASP.NET (es. file troppo grande, form non parsabile)
        errorMessage = "È stato superato il limite. Puoi caricare un solo file alla volta con dimensione massima di 30 MB.";
      }
      errorMessage = errorMessage || "Errore durante l'upload del file";
      store.setError(errorMessage, response?.status);
      throw new Error(errorMessage);
    });
};

const deleteDocumentation = async (id: number) => {
  return await ApiService.delete(`BlobStorage/DeleteModule?id=${id}`)
    .then(({ data }) => {
      const result = data as Partial<Documentation>;
      return result;
    })
    .catch(({ response }) => {
      const errorMessage = response?.data?.Message || "Errore durante l'eliminazione";
      store.setError(errorMessage, response?.status);
      throw new Error(errorMessage);
    });
};

export { getDocumentations, deleteDocumentation, uploadFile, createFolder };
