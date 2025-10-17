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
  AgencyId?: string;
  UserId?: string;
  CreationDate?: Date;
}

export class CreateFolderRequest {
  FolderName: string;
  ParentPath?: string;
}

const getDocumentations = (parentPath?: string): Promise<Array<Documentation>> => {
  const params = parentPath ? `?parentPath=${encodeURIComponent(parentPath)}` : "";
  return ApiService.get(`BlobStorage/GetDocuments${params}`, "")
    .then(({ data }) => {
      const result = data as Partial<Array<Documentation>>;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const createFolder = async (folderRequest: CreateFolderRequest) => {
  return ApiService.post("BlobStorage/CreateFolder", folderRequest)
    .then(({ data }) => {
      const result = data as Partial<Documentation>;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data?.Message || "Errore durante la creazione della cartella", response.status);
      return undefined;
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
      store.setError(response.data?.Message || "Errore durante l'upload del file", response.status);
      return undefined;
    });
};

const deleteDocumentation = async (id: number) => {
  return await ApiService.delete(`BlobStorage/DeleteModule?id=${id}`)
    .then(({ data }) => {
      const result = data as Partial<Documentation>;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data?.Message || "Errore durante l'eliminazione", response.status);
      return undefined;
    });
};

export { getDocumentations, deleteDocumentation, uploadFile, createFolder };
