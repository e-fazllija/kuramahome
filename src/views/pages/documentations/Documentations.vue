<template>
  <div class="documentations-page-wrapper">
    <div class="card shadow-sm" style="border-radius: 0.95rem; border: 1px solid #e9ecef;">
    <!--begin::Header-->
    <div class="card-header border-0 pt-6 pb-4" style="background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%); border-radius: 0.95rem 0.95rem 0 0;">
      <div class="card-title">
        <div class="d-flex align-items-center">
          <div class="symbol symbol-45px me-3">
            <span class="symbol-label" style="background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%); box-shadow: 0 4px 12px rgba(54, 153, 255, 0.3);">
              <i class="ki-duotone ki-folder fs-2 text-white">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
            </span>
          </div>
          <div>
            <h3 class="fw-bold m-0 text-gray-900 fs-3">📁 Gestione Documenti</h3>
            <span class="text-muted fs-7 fw-semibold">Amministrazione e ricerca documenti</span>
          </div>
        </div>
      </div>
      <div class="card-toolbar">
        <div class="d-flex gap-2">
          <button 
            @click="showCreateFolderModal = true" 
            class="btn btn-sm btn-success"
            style="background: linear-gradient(135deg, #1bc5bd 0%, #0bb783 100%); border: none; border-radius: 0.75rem; padding: 0.75rem 1.5rem; box-shadow: 0 4px 12px rgba(27, 197, 189, 0.25);">
            <i class="ki-duotone ki-folder-added fs-3 me-2">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            <span class="fw-bold">Nuova Cartella</span>
          </button>
          <button 
            @click="openFileUploadDialog" 
            class="btn btn-sm btn-primary"
            style="background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%); border: none; border-radius: 0.75rem; padding: 0.75rem 1.5rem; box-shadow: 0 4px 12px rgba(54, 153, 255, 0.25);">
            <i class="ki-duotone ki-file-up fs-3 me-2">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            <span class="fw-bold">Carica File</span>
          </button>
        </div>
      </div>
    </div>
    <!--end::Header-->
    
    <div class="card-body pt-0 pb-6">
      <!-- Breadcrumb Navigation -->
      <div class="breadcrumb-section" style="margin-top: 1.5rem; margin-bottom: 1.5rem;">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb-custom">
            <li class="breadcrumb-item-custom">
              <a href="#" @click.prevent="navigateToFolder(null)" class="breadcrumb-link">
                <i class="ki-duotone ki-home fs-4 me-1">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
                Home
              </a>
            </li>
            <li 
              v-for="(folder, index) in breadcrumbPath" 
              :key="index"
              class="breadcrumb-item-custom"
              :class="{ 'active': index === breadcrumbPath.length - 1 }"
            >
              <i class="ki-duotone ki-right fs-5 breadcrumb-separator">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              <a 
                v-if="index < breadcrumbPath.length - 1"
                href="#" 
                @click.prevent="navigateToFolder(folder.path)" 
                class="breadcrumb-link"
              >
                {{ folder.name }}
              </a>
              <span v-else class="breadcrumb-active">{{ folder.name }}</span>
            </li>
          </ol>
        </nav>
      </div>
      
      <!-- Barra di ricerca moderna con più respiro -->
      <div class="search-section" style="margin-top: 2rem; margin-bottom: 2.5rem;">
        <div class="d-flex align-items-center gap-3 flex-wrap">
          <!-- Search Input con icona interna -->
          <div class="flex-grow-1" style="min-width: 300px; max-width: 550px;">
            <div class="search-wrapper">
              <i class="ki-duotone ki-magnifier fs-3 search-icon">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              <input 
                type="text" 
                v-model="search" 
                @input="searchItems()"
                class="form-control search-input" 
                placeholder="Cerca per nome file o tipo documento..." 
              />
              <button 
                v-if="search"
                @click="clearAllFilters()" 
                class="btn btn-sm btn-clear"
                title="Cancella ricerca"
              >
                <i class="ki-duotone ki-cross fs-5">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </button>
            </div>
          </div>
          
          <!-- Badge Risultati migliorato -->
          <div class="flex-shrink-0">
            <div class="results-badge">
              <i class="ki-duotone ki-chart-simple fs-2 me-2 text-primary">
                <span class="path1"></span>
                <span class="path2"></span>
                <span class="path3"></span>
                <span class="path4"></span>
              </i>
              <div class="results-info">
                <span class="results-number">{{ tableData.length }}</span>
                <span class="results-label">Elementi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Separatore morbido -->
      <div class="separator separator-dashed my-6"></div>
    </div>
    <!--end::Search-->
    
    <div class="card-body pt-0">
      <!--begin::Group actions-->
      <div
        v-if="selectedIds.length > 0"
        class="alert alert-dismissible bg-light-primary border border-primary border-dashed d-flex flex-column flex-sm-row w-100 p-5 mb-6"
        style="border-radius: 0.75rem;"
      >
        <i class="ki-duotone ki-notification-bing fs-2hx text-primary me-4 mb-5 mb-sm-0">
          <span class="path1"></span>
          <span class="path2"></span>
          <span class="path3"></span>
        </i>
        <div class="d-flex flex-column pe-0 pe-sm-10">
          <h5 class="mb-1 fw-bold">{{ selectedIds.length }} documenti selezionati</h5>
          <span class="text-muted">Vuoi eliminare i documenti selezionati?</span>
        </div>
        <button
          type="button"
          class="btn btn-modal-danger"
          @click="deleteFewItems()"
        >
          <span class="btn-icon">
            <i class="ki-duotone ki-trash fs-3">
              <span class="path1"></span>
              <span class="path2"></span>
              <span class="path3"></span>
              <span class="path4"></span>
              <span class="path5"></span>
            </i>
          </span>
          <span class="btn-label">Elimina Selezionati</span>
        </button>
      </div>
      <!--end::Group actions-->
      
      <Datatable @on-sort="sort" @on-items-select="onItemSelect" :data="tableData" :header="tableHeader"
        :loading="loading" :enable-items-per-page-dropdown="true" :checkbox-enabled="true" checkbox-label="Id">
        <template v-slot:DisplayName="{ row: documentations }">
          <div 
            class="d-flex align-items-center"
            :style="documentations.IsFolder ? 'cursor: pointer;' : ''"
            @dblclick="documentations.IsFolder ? navigateToFolder(getCurrentPath(documentations)) : null"
          >
            <div class="symbol symbol-35px me-3">
              <div 
                class="symbol-label" 
                :style="documentations.IsFolder 
                  ? 'background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%);' 
                  : documentations.IsPrivate 
                    ? 'background: linear-gradient(135deg, #f64e60 0%, #d63447 100%);'
                    : 'background: linear-gradient(135deg, #8950fc 0%, #6610f2 100%);'"
              >
                <i 
                  v-if="documentations.IsFolder"
                  class="ki-duotone ki-folder fs-3 text-white"
                >
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
                <i 
                  v-else-if="documentations.IsPrivate"
                  class="ki-duotone ki-lock fs-3 text-white"
                >
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                </i>
                <i 
                  v-else
                  class="ki-duotone ki-file fs-3 text-white"
                >
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </div>
            </div>
            <div class="d-flex flex-column">
              <span class="fw-semibold">{{ documentations.DisplayName }}</span>
              <span v-if="documentations.IsPrivate && !documentations.IsFolder" class="text-muted fs-8">
                <i class="ki-duotone ki-lock fs-8 me-1">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                </i>
                Privato
              </span>
            </div>
          </div>
        </template>
        <template v-slot:Actions="{ row: documentations }">
          <div class="d-flex gap-2 justify-content-center action-buttons">
            <!-- Apri cartella -->
            <button 
              v-if="documentations.IsFolder"
              @click="navigateToFolder(getCurrentPath(documentations))"
              class="btn btn-action btn-action-info"
              title="Apri cartella"
            >
              <span class="btn-icon">
                <i class="ki-duotone ki-folder-open fs-3">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </span>
              <span class="btn-label">Apri</span>
            </button>
            
            <!-- Anteprima nel browser (solo per file) -->
            <a 
              v-if="!documentations.IsFolder"
              class="btn btn-action btn-action-success" 
              :href="getBrowserPreviewUrl(documentations.FileName, documentations.FileUrl)"
              target="_blank"
              title="Anteprima nel browser"
            >
              <span class="btn-icon">
                <i class="ki-duotone ki-eye fs-3">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                </i>
              </span>
              <span class="btn-label">Anteprima</span>
            </a>
            
            <!-- Scarica (solo per file) -->
            <a 
              v-if="!documentations.IsFolder"
              class="btn btn-action btn-action-info" 
              download 
              :href="documentations.FileUrl"
              title="Scarica documento"
            >
              <span class="btn-icon">
                <i class="ki-duotone ki-download fs-3">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                  <span class="path4"></span>
                  <span class="path5"></span>
                </i>
              </span>
              <span class="btn-label">Scarica</span>
            </a>
            
            <!-- Elimina -->
            <button 
              @click="deleteItem(documentations.Id)" 
              class="btn btn-action btn-action-danger"
              :title="documentations.IsFolder ? 'Elimina cartella' : 'Elimina documento'"
            >
              <span class="btn-icon">
                <i class="ki-duotone ki-trash fs-3">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                  <span class="path4"></span>
                  <span class="path5"></span>
                </i>
              </span>
              <span class="btn-label">Elimina</span>
            </button>
          </div>
        </template>
        <!--begin::Menu-->
        <div
          class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold fs-7 w-125px py-4"
          data-kt-menu="true">
          <!--end::Menu item-->
        </div>
      </Datatable>
    </div>
    </div>
    
    <!-- Modal Crea Cartella -->
    <div v-if="showCreateFolderModal" class="modal-overlay" @click.self="showCreateFolderModal = false">
      <div class="modal-dialog-custom">
        <div class="modal-content-custom">
          <div class="modal-header-custom">
            <h3 class="modal-title">
              <i class="ki-duotone ki-folder-added fs-2 me-2">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              Crea Nuova Cartella
            </h3>
            <button @click="showCreateFolderModal = false" class="btn-close-custom">
              <i class="ki-duotone ki-cross fs-1">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
            </button>
          </div>
          <div class="modal-body-custom">
            <div class="form-group">
              <label class="form-label">Nome Cartella</label>
              <input 
                v-model="newFolderName" 
                type="text" 
                class="form-control" 
                placeholder="Inserisci il nome della cartella"
                @keyup.enter="createNewFolder"
              />
            </div>
          </div>
          <div class="modal-footer-custom">
            <button @click="showCreateFolderModal = false" class="btn btn-secondary">
              Annulla
            </button>
            <button @click="createNewFolder" class="btn btn-primary" :disabled="!newFolderName">
              <i class="ki-duotone ki-check fs-3 me-2">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              Crea Cartella
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal Upload File -->
    <div v-if="showUploadModal" class="modal-overlay" @click.self="showUploadModal = false">
      <div class="modal-dialog-custom">
        <div class="modal-content-custom">
          <div class="modal-header-custom">
            <h3 class="modal-title">
              <i class="ki-duotone ki-file-up fs-2 me-2">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              Carica File
            </h3>
            <button @click="showUploadModal = false" class="btn-close-custom">
              <i class="ki-duotone ki-cross fs-1">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
            </button>
          </div>
          <div class="modal-body-custom">
            <div class="form-group mb-4">
              <label class="form-label">Seleziona File</label>
              <input 
                type="file" 
                ref="fileInputRef"
                @change="handleFileSelect"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.xls,.xlsx"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <div class="form-check form-switch">
                <input 
                  class="form-check-input" 
                  type="checkbox" 
                  v-model="isPrivateFile"
                  id="privateFileSwitch"
                />
                <label class="form-check-label" for="privateFileSwitch">
                  <i class="ki-duotone ki-lock fs-3 me-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                  </i>
                  File Privato (visibile solo a te)
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer-custom">
            <button @click="showUploadModal = false" class="btn btn-secondary">
              Annulla
            </button>
            <button @click="uploadSelectedFile" class="btn btn-primary" :disabled="!selectedFile">
              <i class="ki-duotone ki-cloud-upload fs-3 me-2">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              Carica File
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Documentation, getDocumentations, uploadFile, deleteDocumentation, createFolder, CreateFolderRequest } from "@/core/data/documentations";
import Swal from "sweetalert2";
import { defineComponent, ref, onMounted, computed } from "vue";
import { MenuComponent } from "@/assets/ts/components";
import arraySort from "array-sort";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import { useAuthStore, type User } from "@/stores/auth";

export default defineComponent({
  name: "DocumentTable",
  components: { Datatable },

  setup() {
    const store = useAuthStore();
    const selectedIds = ref<Array<number>>([]);
    const fileInputRef = ref<HTMLInputElement | null>(null);
    let loading = ref<boolean>(true);
    const tableData = ref<Array<Documentation>>([]);
    const initItems = ref<Array<Documentation>>([]);
    
    // Navigazione
    const currentPath = ref<string | null>(null);
    const breadcrumbPath = ref<Array<{name: string, path: string | null}>>([]);
    
    // Modals
    const showCreateFolderModal = ref<boolean>(false);
    const showUploadModal = ref<boolean>(false);
    const newFolderName = ref<string>("");
    const selectedFile = ref<File | null>(null);
    const isPrivateFile = ref<boolean>(false);

    const tableHeader = ref([
      {
        columnName: "Nome",
        columnLabel: "DisplayName",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Azioni",
        columnLabel: "Actions",
        sortEnabled: false,
        columnWidth: 135,
      },
    ]);

    // Helper: assicura che il path includa sempre l'agencyId
    const ensureAgencyPath = (path: string | null): string | undefined => {
      if (!path) return undefined;
      
      const agencyId = store.user?.AgencyId;
      if (!agencyId) return path;
      
      // Se il path già inizia con agencyId, restituiscilo così com'è
      const agencyPrefix = `${agencyId}/`;
      if (path.startsWith(agencyPrefix)) {
        return path;
      }
      
      // Altrimenti, aggiungi agencyId all'inizio
      return `${agencyId}/${path}`;
    };

    // Naviga a una cartella specifica
    const navigateToFolder = async (path: string | null) => {
      currentPath.value = path;
      updateBreadcrumb(path);
      await getItems();
    };

    // Aggiorna il breadcrumb in base al path corrente
    const updateBreadcrumb = (path: string | null) => {
      if (!path) {
        breadcrumbPath.value = [];
        return;
      }

      const agencyId = store.user?.AgencyId;
      const parts = path.split('/').filter(p => p);
      
      // Rimuove l'agencyId dal breadcrumb se presente (primo elemento)
      const startIndex = (agencyId && parts[0] === agencyId) ? 1 : 0;
      const displayParts = parts.slice(startIndex);
      
      breadcrumbPath.value = displayParts.map((part, index) => {
        // Costruisce il path completo con agencyId per la navigazione
        const fullPathParts = parts.slice(0, startIndex + index + 1);
        return {
          name: decodeURIComponent(part),
          path: fullPathParts.join('/')
        };
      });
    };

    // Ottiene il path completo di un documento/cartella con agencyId incluso
    const getCurrentPath = (doc: Documentation): string => {
      const agencyId = store.user?.AgencyId;
      
      // Se c'è un ParentPath, usalo e aggiungi DisplayName
      if (doc.ParentPath) {
        // Assicura che il ParentPath abbia l'agencyId
        const fullParentPath = ensureAgencyPath(doc.ParentPath);
        return fullParentPath ? `${fullParentPath}/${doc.DisplayName}` : `${agencyId}/${doc.DisplayName}`;
      }
      
      // Se non c'è ParentPath, crea il path con agencyId/DisplayName
      return agencyId ? `${agencyId}/${doc.DisplayName}` : doc.DisplayName || '';
    };

    // Carica i documenti dalla cartella corrente
    const getItems = async () => {
      try {
        loading.value = true;
        // Passa il path al backend (con agencyId se presente)
        const result = await getDocumentations(currentPath.value || undefined);
        tableData.value = result || [];
        initItems.value = [...tableData.value];
      } catch (error) {
        console.error('Error fetching documentations:', error);
        tableData.value = [];
        initItems.value = [];
      } finally {
        loading.value = false;
      }
    };

    // Apre il dialog di upload
    const openFileUploadDialog = () => {
      selectedFile.value = null;
      isPrivateFile.value = false;
      showUploadModal.value = true;
    };

    // Gestisce la selezione del file
    const handleFileSelect = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input?.files && input.files.length > 0) {
        selectedFile.value = input.files[0];
      }
    };

    // Upload del file selezionato
    const uploadSelectedFile = async () => {
      if (!selectedFile.value) return;

      try {
        loading.value = true;
        showUploadModal.value = false;

        // Passa il path al backend (con agencyId se presente)
        await uploadFile(selectedFile.value, currentPath.value || undefined, isPrivateFile.value);

        Swal.fire({
          text: "File caricato con successo!",
          icon: "success",
          confirmButtonText: "Ok",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn fw-semibold btn-light-primary",
          },
        });

        await getItems();
        selectedFile.value = null;
        isPrivateFile.value = false;
      } catch (error) {
        loading.value = false;
        Swal.fire({
          text: "Errore durante l'upload del file",
          icon: "error",
          confirmButtonText: "Ok",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
      }
    };

    // Crea una nuova cartella
    const createNewFolder = async () => {
      if (!newFolderName.value.trim()) return;

      try {
        loading.value = true;
        showCreateFolderModal.value = false;

        // Passa il path al backend (con agencyId se presente)
        const request: CreateFolderRequest = {
          FolderName: newFolderName.value.trim(),
          ParentPath: currentPath.value || undefined
        };

        await createFolder(request);

        Swal.fire({
          text: "Cartella creata con successo!",
          icon: "success",
          confirmButtonText: "Ok",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn fw-semibold btn-light-primary",
          },
        });

        await getItems();
        newFolderName.value = "";
      } catch (error) {
        loading.value = false;
        Swal.fire({
          text: "Errore durante la creazione della cartella",
          icon: "error",
          confirmButtonText: "Ok",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
      }
    };

    onMounted(async () => {
      await getItems();
    });


    const deleteFewItems = async () => {
      try {
        loading.value = true;
        // Elimina tutti i documenti selezionati in parallelo
        await Promise.all(
          selectedIds.value.map(item => deleteDocumentation(item))
        );
        selectedIds.value.length = 0;
        await getItems();
      } catch (error) {
        console.error('Error deleting items:', error);
      } finally {
        loading.value = false;
      }
    };

    const search = ref<string>("");
    const searchItems = () => {
      tableData.value.splice(0, tableData.value.length, ...initItems.value);
      if (search.value !== "") {
        let results: Array<Documentation> = [];
        for (let j = 0; j < tableData.value.length; j++) {
          if (searchingFunc(tableData.value[j], search.value)) {
            results.push(tableData.value[j]);
          }
        }
        tableData.value.splice(0, tableData.value.length, ...results);
      }
      MenuComponent.reinitialization();
    };

    const searchingFunc = (obj: any, value: string): boolean => {
      for (let key in obj) {
        if (
          !Number.isInteger(obj[key]) &&
          !(typeof obj[key] === "object") &&
          (typeof obj[key] === "string" || typeof obj[key] === "number" || Array.isArray(obj[key]))
        ) {
          if (obj[key].toString().toLowerCase().indexOf(value) !== -1) {
            return true;
          }
        }
      }
      return false;
    };
    const sort = (sort: Sort) => {
      const reverse: boolean = sort.order === "asc";
      if (sort.label) {
        arraySort(tableData.value, sort.label, { reverse });
      }
    };
    const onItemSelect = (selectedItems: Array<number>) => {
      selectedIds.value = selectedItems;
    };

    const clearAllFilters = () => {
      search.value = "";
      searchItems();
    };

    // Funzione per anteprima nel browser
    const getBrowserPreviewUrl = (fileName: string, fileUrl: string): string => {
      const extension = getFileExtension(fileName).toLowerCase();
      
      // Per PDF, immagini e testo - anteprima diretta nel browser
      if (['pdf', 'jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg', 'txt'].includes(extension)) {
        return fileUrl;
      }
      
      // Per documenti Office - usa Google Viewer
      if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(extension)) {
        return `https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`;
      }
      
      // Per tutti gli altri file - prova ad aprire direttamente
      return fileUrl;
    };

    const getFileExtension = (fileName: string): string => {
      return fileName.split('.').pop() || '';
    };

    async function deleteItem(id: number) {
      const result = await Swal.fire({
        text: "Confermare l'eliminazione?",
        icon: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Elimina",
        cancelButtonText: "Annulla",
        heightAuto: false,
        customClass: {
          confirmButton: "btn btn-danger",
          cancelButton: "btn btn-secondary",
        },
      });

      // Procedi con l'eliminazione solo se l'utente ha confermato
      if (result.isConfirmed) {
        try {
          loading.value = true;
          await deleteDocumentation(id);
          await getItems();
          MenuComponent.reinitialization();
        } catch (error) {
          console.error('Error deleting item:', error);
        } finally {
          loading.value = false;
        }
      }
    }


    return {
      // Variabili
      loading,
      tableData,
      search,
      selectedIds,
      tableHeader,
      currentPath,
      breadcrumbPath,
      showCreateFolderModal,
      showUploadModal,
      newFolderName,
      selectedFile,
      isPrivateFile,
      fileInputRef,
      
      // Funzioni
      navigateToFolder,
      getCurrentPath,
      openFileUploadDialog,
      handleFileSelect,
      uploadSelectedFile,
      createNewFolder,
      searchItems,
      deleteFewItems,
      sort,
      onItemSelect,
      deleteItem,
      clearAllFilters,
      getBrowserPreviewUrl
    };
  },
});
</script>

<style scoped>
@import '@/assets/css/documentations.css';
/* Sfondo univoco della pagina */
.documentations-page-wrapper {
  background: linear-gradient(135deg, #fafbfc 0%, #f8f9fa 100%);
  min-height: 100vh;
  padding: 2rem 0;
  position: relative;
}

[data-bs-theme="dark"] .documentations-page-wrapper {
  background: linear-gradient(135deg, #1a1a27 0%, #1e1e2d 100%);
}

.documentations-page-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 20%, rgba(54, 153, 255, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(11, 183, 175, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 40% 60%, rgba(54, 153, 255, 0.02) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

[data-bs-theme="dark"] .documentations-page-wrapper::before {
  background: 
    radial-gradient(circle at 20% 20%, rgba(54, 153, 255, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(11, 183, 175, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 40% 60%, rgba(54, 153, 255, 0.03) 0%, transparent 50%);
}

.documentations-page-wrapper > .card {
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

[data-bs-theme="dark"] .documentations-page-wrapper > .card {
  background: rgba(30, 30, 45, 0.95);
}

/* Search Bar Moderna con icona interna */
.search-wrapper {
  position: relative;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a1a5b7;
  pointer-events: none;
  z-index: 1;
  transition: color 0.3s ease;
}

.search-input {
  background-color: #f1f3ff !important;
  border: 1px solid #e8f4ff !important;
  border-radius: 0.75rem !important;
  padding: 0.75rem 3.5rem 0.75rem 3.5rem !important;
  font-weight: 500;
  color: #3f4254;
  transition: all 0.3s ease;
}

[data-bs-theme="dark"] .search-input {
  background-color: #1e1e2d !important;
  border: 1px solid #323248 !important;
  color: #f5f8fa;
}

.search-input:focus {
  background-color: #ffffff !important;
  border-color: #3699ff !important;
  box-shadow: 0 0 0 0.2rem rgba(54, 153, 255, 0.15);
}

[data-bs-theme="dark"] .search-input:focus {
  background-color: #2b2b40 !important;
  border-color: #3699ff !important;
  box-shadow: 0 0 0 0.2rem rgba(54, 153, 255, 0.25);
}

.search-input::placeholder {
  color: #a1a5b7;
  font-weight: 400;
}

[data-bs-theme="dark"] .search-input::placeholder {
  color: #565674;
}

.btn-clear {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background-color: #f64e60;
  border: none;
  border-radius: 0.5rem;
  width: 32px;
  height: 32px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.btn-clear:hover {
  background-color: #d63447;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 4px 8px rgba(246, 78, 96, 0.3);
}

.btn-clear i {
  color: white;
}

/* Results Badge migliorato */
.results-badge {
  display: inline-flex;
  align-items: center;
  background: linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%);
  border: 1px solid #0bb7af;
  border-radius: 0.95rem;
  padding: 0.85rem 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(11, 183, 175, 0.15);
}

[data-bs-theme="dark"] .results-badge {
  background: linear-gradient(135deg, #1e2129 0%, #2b2b40 100%);
  border: 1px solid #0bb7af;
  box-shadow: 0 2px 8px rgba(11, 183, 175, 0.25);
}

.results-badge:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(11, 183, 175, 0.25);
  border-color: #0aa39a;
}

[data-bs-theme="dark"] .results-badge:hover {
  box-shadow: 0 6px 16px rgba(11, 183, 175, 0.35);
}

.results-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.2;
}

.results-number {
  font-weight: 800;
  font-size: 1.5rem;
  color: #0bb7af;
  letter-spacing: -0.5px;
}

.results-label {
  font-size: 0.7rem;
  color: #0aa39a;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.text-primary {
  color: #0bb7af !important;
}

/* Avatar documenti */
.symbol-label {
  border-radius: 0.75rem !important;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

tbody tr:hover .symbol-label {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.25);
}

/* Pulsanti Soft */
.btn {
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-sm {
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

/* Stili tabella uniformati con Dashboard */
:deep(table) {
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 0.5rem;
  overflow: hidden;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Header stile Dashboard */
:deep(thead th) {
  background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%);
  border-bottom: 2px solid #e9ecef;
  padding: 1rem 1.25rem;
  font-weight: 700;
  font-size: 0.8rem;
  color: #495057;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  vertical-align: middle;
  white-space: nowrap;
  text-align: center;
}

/* Celle body */
:deep(tbody td) {
  padding: 1rem 1.25rem;
  vertical-align: middle;
  border-bottom: 1px solid #f1f3f4;
  color: #495057;
  font-weight: 500;
  font-size: 1rem;
  text-align: center;
}

/* Prima colonna (File) allineata a sinistra */
:deep(tbody td:nth-child(2)) {
  text-align: left !important;
  color: #181c32;
  font-weight: 500;
}

:deep(thead th:nth-child(2)) {
  text-align: center !important;
}

/* Ultima colonna (Azioni) centrata */
:deep(thead th:last-child) {
  text-align: center !important;
}

:deep(tbody td:last-child) {
  text-align: center !important;
}

/* Hover righe stile Dashboard */
:deep(tbody tr) {
  transition: all 0.25s ease;
  background-color: #ffffff;
  border-bottom: 1px solid #f1f3f4;
}

:deep(tbody tr:hover) {
  background: linear-gradient(90deg, #f8f9fa 0%, #ffffff 100%) !important;
  box-shadow: 0 2px 8px rgba(54, 153, 255, 0.08);
  transform: translateX(2px);
}

/* Spaziatura coerente */
.card-body {
  padding: 1rem 1.5rem;
}

.mb-6 {
  margin-bottom: 1.5rem !important;
}

/* Bottoni Azioni Moderni */
.action-buttons {
  gap: 0.75rem !important;
}

.btn-action {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.25rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.875rem;
  border: none;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-decoration: none;
}

.btn-action::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.btn-action:hover::before {
  left: 100%;
}

.btn-action .btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.btn-action .btn-label {
  font-weight: 700;
  letter-spacing: 0.3px;
  transition: all 0.3s ease;
}

/* Bottone Info/Dettagli */
.btn-action-info {
  background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(54, 153, 255, 0.3);
}

.btn-action-info:hover {
  background: linear-gradient(135deg, #2b7ce6 0%, #0aa39a 100%);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(54, 153, 255, 0.4);
  color: #ffffff;
}

.btn-action-info:hover .btn-icon {
  transform: scale(1.15) rotate(5deg);
}

.btn-action-info:active {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(54, 153, 255, 0.3);
}

/* Bottone Success/Anteprima */
.btn-action-success {
  background: linear-gradient(135deg, #1bc5bd 0%, #0bb783 100%);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(27, 197, 189, 0.3);
}

.btn-action-success:hover {
  background: linear-gradient(135deg, #0bb783 0%, #0a9d6b 100%);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(27, 197, 189, 0.4);
  color: #ffffff;
}

.btn-action-success:hover .btn-icon {
  transform: scale(1.15) rotate(5deg);
}

.btn-action-success:active {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(27, 197, 189, 0.3);
}

/* Bottone Elimina */
.btn-action-danger {
  background: linear-gradient(135deg, #f64e60 0%, #d63447 100%);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(246, 78, 96, 0.35);
}

.btn-action-danger:hover {
  background: linear-gradient(135deg, #d63447 0%, #b92838 100%);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(246, 78, 96, 0.5);
  color: #ffffff;
}

.btn-action-danger:hover .btn-icon {
  transform: scale(1.15) rotate(-5deg);
  animation: shake 0.5s ease;
}

.btn-action-danger:active {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(126, 130, 153, 0.3);
}

/* Animazione shake per l'icona elimina */
@keyframes shake {
  0%, 100% { transform: rotate(0deg) scale(1.15); }
  25% { transform: rotate(-5deg) scale(1.15); }
  75% { transform: rotate(5deg) scale(1.15); }
}

/* Bottoni Modal */
.btn-modal-danger {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  border-radius: 0.75rem;
  font-weight: 700;
  font-size: 0.95rem;
  border: none;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.3px;
  background: linear-gradient(135deg, #f64e60 0%, #d63447 100%);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(246, 78, 96, 0.35);
}

.btn-modal-danger::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.btn-modal-danger:hover::before {
  left: 100%;
}

.btn-modal-danger .btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.btn-modal-danger .btn-label {
  font-weight: 700;
  letter-spacing: 0.3px;
}

.btn-modal-danger:hover {
  background: linear-gradient(135deg, #d63447 0%, #b92838 100%);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(246, 78, 96, 0.5);
  color: #ffffff;
}

.btn-modal-danger:hover .btn-icon {
  transform: scale(1.15) rotate(-5deg);
  animation: shake 0.5s ease;
}

.btn-modal-danger:active {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(246, 78, 96, 0.35);
}

/* Effetto hover su icona ricerca */
.search-input:focus ~ .search-icon,
.search-input:hover ~ .search-icon {
  color: #3699ff;
}

/* Alert selezione */
.alert {
  transition: all 0.3s ease;
}

.bg-light-primary {
  background: linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%) !important;
  border-color: #0bb7af !important;
}

[data-bs-theme="dark"] .bg-light-primary {
  background: linear-gradient(135deg, #1e2129 0%, #2b2b40 100%) !important;
  border-color: #0bb7af !important;
}

/* Responsive design */
@media (max-width: 768px) {
  .d-flex.align-items-center.gap-3 {
    flex-direction: column;
    align-items: stretch !important;
    gap: 1rem !important;
  }
  
  .search-wrapper {
    max-width: 100% !important;
  }
  
  .flex-shrink-0 {
    flex-shrink: 1 !important;
  }
  
  .btn-action {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
  
  .btn-action .btn-label {
    display: none;
  }
  
  .btn-action .btn-icon i {
    font-size: 1.25rem !important;
  }
}
</style>
