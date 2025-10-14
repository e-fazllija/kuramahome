import ApiService from "@/core/services/ApiService";
import { useAuthStore, type User } from "@/stores/auth";
const store = useAuthStore();

export class Documentation{
  Id?: number;
  File: File;
  FileName?: string;
  FolderName: string;
}

const getDocumentations = () : Promise<Array<Documentation>> => {
  return ApiService.get(
    `BlobStorage/GetDocuments`, ""
  )
    .then(({ data }) => {
      const result = data as Partial<Array<Documentation>>;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const uploadFile = async (file: Documentation) => {
  const formData = new FormData();
  formData.append("File", file.File);
  formData.append("FolderName", file.FolderName);
  return ApiService.post("BlobStorage/InsertDocument", formData)
    .then(({ data }) => {
      const result = data as Partial<Documentation>;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

const deleteDocumentation = async (id: number) => {
  return await ApiService.delete(`BlobStorage/DeleteModule?id=${id}&folderName=Moduli`)
    .then(({ data }) => {
      const result = data as Partial<Documentation>;
      return result;
    })
    .catch(({ response }) => {
      store.setError(response.data.Message, response.status);
      return undefined;
    });
};

export { getDocumentations, deleteDocumentation, uploadFile };
