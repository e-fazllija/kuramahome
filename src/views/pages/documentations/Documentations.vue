<template>
  <div class="list-page-wrapper">
    <div class="card shadow-sm">
    <!--begin::Header-->
    <div class="card-header border-0 pt-6 pb-4">
      <div class="card-title">
        <div class="d-flex align-items-center">
          <div class="symbol symbol-45px me-3">
            <span class="symbol-label">
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
          >
            <i class="ki-duotone ki-folder-added fs-3 me-2">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            <span class="fw-bold">Nuova Cartella</span>
          </button>
          <button 
            @click="openFileUploadDialog" 
            class="btn btn-sm btn-primary"
          >
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
      <div class="breadcrumb-section">
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
      
      <!-- Barra di ricerca moderna UNIFORMATA -->
      <div class="container-fluid px-0 filter-container">
        <div class="row g-3 align-items-center mb-4">
          <!-- Bottone Cerca -->
          <div class="col-12 col-md-auto">
            <button 
              @click="searchItems()" 
              class="btn btn-filter-search w-100 w-md-auto"
              :disabled="loading"
            >
              <i class="ki-duotone ki-magnifier fs-4 me-2">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              <span v-if="!loading">Cerca</span>
              <span v-else>Ricerca...</span>
            </button>
          </div>
          
          <!-- Search Input -->
          <div class="col-12 col-md">
            <div class="input-group">
              <span class="input-group-text bg-transparent border-end-0">
                <i class="ki-duotone ki-magnifier fs-4">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </span>
              <input 
                type="text" 
                v-model="search" 
                @keyup.enter="searchItems()"
                class="form-control filter-input border-start-0 ps-0" 
                placeholder="Cerca per nome file o tipo documento..." 
              />
              <button 
                v-if="search"
                @click="clearAllFilters()" 
                class="btn btn-sm btn-outline-danger rounded-end"
                type="button"
                title="Cancella ricerca"
              >
                <i class="ki-duotone ki-cross fs-5">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </button>
            </div>
          </div>

          <!-- Badge Risultati UNIFORMATO -->
          <div class="col-12 col-md-auto">
            <span class="badge badge-filter-results">
              <i class="ki-duotone ki-chart-simple fs-4 me-2">
                <span class="path1"></span>
                <span class="path2"></span>
                <span class="path3"></span>
                <span class="path4"></span>
              </i>
              {{ tableData.length }} documenti
            </span>
          </div>
        </div>
      
        <!-- Separatore morbido -->
        <hr class="my-4 filter-separator" />
      </div>
    </div>
    <!--end::Search-->
    
    <div class="card-body pt-0">
      <!--begin::Group actions-->
      <div
        v-if="selectedIds.length > 0"
        class="alert alert-dismissible bg-light-primary border border-primary border-dashed d-flex flex-column flex-sm-row w-100 p-5 mb-6"
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
          class="btn btn-danger d-flex align-items-center"
          @click="deleteFewItems()"
        >
          <i class="ki-duotone ki-trash fs-3 me-2">
            <span class="path1"></span>
            <span class="path2"></span>
            <span class="path3"></span>
            <span class="path4"></span>
            <span class="path5"></span>
          </i>
          <span class="fw-bold">Elimina Selezionati</span>
        </button>
      </div>
      <!--end::Group actions-->
      
      <Datatable @on-sort="sort" @on-items-select="onItemSelect" :data="tableData" :header="tableHeader"
        :loading="loading" :enable-items-per-page-dropdown="true" :checkbox-enabled="false" checkbox-label="Id">
        <template v-slot:DisplayName="{ row: documentations }">
          <div 
            class="d-flex align-items-center"
            :class="{ 'cursor-pointer': documentations.IsFolder }"
            @dblclick="documentations.IsFolder ? navigateToFolder(getCurrentPath(documentations)) : null"
          >
            <div class="symbol symbol-35px me-3">
              <div 
                class="symbol-label"
                :class="getSymbolVariant(documentations)"
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
              <div class="d-flex align-items-center gap-2">
                <span class="fw-semibold">{{ documentations.DisplayName }}</span>
                <span v-if="documentations.IsOwner" class="badge badge-sm document-owner-badge">
                  Mio
                </span>
              </div>
              <div class="d-flex align-items-center gap-2 mt-1">
                <span v-if="documentations.CreatorName" class="text-muted fs-8">
                  <i class="ki-duotone ki-user fs-8 me-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  {{ documentations.CreatorName }}
                </span>
                <span v-if="documentations.IsPrivate && !documentations.IsFolder" class="text-danger fs-8">
                  <i class="ki-duotone ki-lock fs-8 me-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                  </i>
                  Privato
                </span>
              </div>
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
              <i class="ki-duotone ki-folder-open fs-4">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
            </button>
            
            <!-- Scarica (solo per file) -->
            <a 
              v-if="!documentations.IsFolder"
              class="btn btn-action btn-action-info" 
              download 
              :href="documentations.FileUrl"
              title="Scarica documento"
            >
              <i class="ki-duotone ki-file-down fs-4">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
            </a>
            
            <!-- Elimina (solo se ha i permessi) -->
            <button 
              v-if="documentations.CanModify"
              @click="deleteItem(documentations.Id)" 
              class="btn btn-action btn-action-danger"
              :title="documentations.IsFolder ? 'Elimina cartella' : 'Elimina documento'"
            >
            <i class="ki-duotone ki-trash fs-4">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                  <span class="path4"></span>
                  <span class="path5"></span>
                </i>
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
import '@/assets/css/documentations.css';
import '@/assets/css/filters.css';
import '@/assets/css/table-actions.css';
import '@/assets/css/lists-common.css';

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

    // Helper: costruisce il path corretto basato su userId
    // Nota: non usiamo più agencyId come root, ma userId
    const ensureUserPath = (path: string | null): string | undefined => {
      if (!path) return undefined;
      
      // Il path è già nella forma corretta: userId/subfolder/...
      // Non serve modificarlo
      return path;
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

      const parts = path.split('/').filter(p => p);
      
      // Il primo elemento è sempre un userId (può essere il nostro o di un collega)
      // Iniziamo dal secondo elemento per il breadcrumb (saltiamo lo userId)
      const displayParts = parts.slice(1);
      
      breadcrumbPath.value = displayParts.map((part, index) => {
        // Costruisce il path completo includendo lo userId
        const fullPathParts = parts.slice(0, index + 2);
        return {
          name: decodeURIComponent(part),
          path: fullPathParts.join('/')
        };
      });
    };

    // Ottiene il path completo di un documento/cartella
    const getCurrentPath = (doc: Documentation): string => {
      // Se c'è un ParentPath, usalo e aggiungi DisplayName
      if (doc.ParentPath) {
        return `${doc.ParentPath}/${doc.DisplayName}`;
      }
      
      // Se non c'è ParentPath, è nella root dell'utente: userId/DisplayName
      // Il backend ci fornisce già il UserId
      return doc.UserId ? `${doc.UserId}/${doc.DisplayName}` : doc.DisplayName || '';
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
      } catch (error: any) {
        loading.value = false;
        const errorMessage = error?.message || "Errore durante l'upload del file";
        Swal.fire({
          text: errorMessage,
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
      } catch (error: any) {
        loading.value = false;
        const errorMessage = error?.message || "Errore durante la creazione della cartella";
        Swal.fire({
          text: errorMessage,
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

    const getSymbolVariant = (item: any) => {
      if (item?.IsFolder) {
        return "symbol-label-folder";
      }
      if (item?.IsPrivate) {
        return "symbol-label-private";
      }
      return "symbol-label-shared";
    };

    async function deleteItem(id: number) {
      const result = await Swal.fire({
        title: "Elimina documentazione",
        html: "Stai per eliminare definitivamente questa documentazione e tutti i dati collegati ad essa. L'operazione è irreversibile.",
        icon: "warning",
        showCancelButton: true,
        focusCancel: true,
        buttonsStyling: false,
        confirmButtonText: "Elimina",
        cancelButtonText: "Annulla",
        heightAuto: false,
        customClass: {
          confirmButton: "btn btn-danger",
          cancelButton: "btn btn-light",
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
      getSymbolVariant
    };
  },
});
</script>
