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
        <label class="btn btn-sm btn-primary" style="background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%); border: none; border-radius: 0.75rem; padding: 0.75rem 1.5rem; box-shadow: 0 4px 12px rgba(54, 153, 255, 0.25); cursor: pointer;">
          <i class="ki-duotone ki-file-up fs-3 me-2">
            <span class="path1"></span>
            <span class="path2"></span>
          </i>
          <span class="fw-bold">Carica Documenti</span>
          <input 
            type="file" 
            multiple 
            @change="handleFileUpload"
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
            style="display: none;"
          />
        </label>
      </div>
    </div>
    <!--end::Header-->
    
    <div class="card-body pt-0 pb-6">
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
                <span class="results-label">Documenti</span>
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
        <template v-slot:FileName="{ row: documentations }">
          <div class="d-flex align-items-center">
            <div class="symbol symbol-35px me-3">
              <div class="symbol-label" style="background: linear-gradient(135deg, #8950fc 0%, #6610f2 100%);">
                <i class="ki-duotone ki-file fs-3 text-white">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </div>
            </div>
            <span class="fw-semibold">{{ documentations.FileName.split("/")[1] }}</span>
          </div>
        </template>
        <template v-slot:Actions="{ row: documentations }">
          <div class="d-flex gap-2 justify-content-center action-buttons">
            <!-- Anteprima nel browser -->
            <a 
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
            <a 
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
            <button 
              @click="deleteItem(documentations.Id)" 
              class="btn btn-action btn-action-danger"
              title="Elimina documento"
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
  </div>
</template>

<script lang="ts">
import { Documentation, getDocumentations, uploadFile, deleteDocumentation } from "@/core/data/documentations";
import Swal from "sweetalert2";
import { defineComponent, ref, onMounted } from "vue";
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
    const fileInput = ref<HTMLInputElement | null>(null);
    let loading = ref<boolean>(true);
    const tableData = ref<Array<Documentation>>([]);
    const initItems = ref([]);

    const formData = ref<Documentation>({
      File: null,
      FileName: "",
      FolderName: "Moduli",
    });

    const tableHeader = ref([
      {
        columnName: "File",
        columnLabel: "FileName",
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

    const handleFileUpload = async (event: Event) => {
      loading.value = true;
      const input = event.target as HTMLInputElement;
      if (input?.files) {
        formData.value.File = input.files[0];
        event = null;
        await addFile();
        loading.value = false;
      }
    };

    const getItems = async () => {
      try {
        const result = await getDocumentations();
        tableData.value = result || [];
        initItems.value.splice(0, tableData.value.length, ...tableData.value);
      } catch (error) {
        console.error('Error fetching documentations:', error);
        tableData.value = [];
        initItems.value = [];
      }
    };

    onMounted(async () => {
      loading.value = true;
      await getItems();
      loading.value = false;

    });

    const addFile = async () => {
      await uploadFile(formData.value);
      Swal.fire({
        text: "File caricati con successo!",
        icon: "success",
        confirmButtonText: "Continua!",
      });
      const error = store.errors;

      if (!error) {
        Swal.fire({
          text: "Il modulo è stato inviato con successo!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Continua!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-primary",
          },
        }).then(async function () {
          await getItems();
          loading.value = false;
        });
      } else {
        loading.value = false;
        Swal.fire({
          text: "Siamo spiacenti, sembra che siano stati rilevati alcuni errori, riprova.",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          heightAuto: false,
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
      }
    };

    const deleteFewItems = async () => {
      loading.value = true;
      selectedIds.value.forEach(async (item) => {
        await deleteDocumentation(item)
      });
      selectedIds.value.length = 0;
      await getItems();
      loading.value = false;
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
      loading.value = true;
      Swal.fire({
        text: "Confermare l'eliminazione?",
        icon: "warning",
        buttonsStyling: false,
        confirmButtonText: "Continua!",
        heightAuto: false,
        customClass: {
          confirmButton: "btn btn-danger",
        },
      }).then(async () => {
        await deleteDocumentation(id)
        await getItems();
        loading.value = false;
        MenuComponent.reinitialization();
      });
    }


    return {
      handleFileUpload,
      fileInput,
      addFile,
      loading,
      tableData,
      search,
      searchItems,
      selectedIds,
      deleteFewItems,
      sort,
      onItemSelect,
      tableHeader,
      deleteItem,
      clearAllFilters,
      getBrowserPreviewUrl
    };
  },
});
</script>

<style scoped>
/* Sfondo univoco della pagina */
.documentations-page-wrapper {
  background: linear-gradient(135deg, #fafbfc 0%, #f8f9fa 100%);
  min-height: 100vh;
  padding: 2rem 0;
  position: relative;
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

.documentations-page-wrapper > .card {
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
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

.search-input:focus {
  background-color: #ffffff !important;
  border-color: #3699ff !important;
  box-shadow: 0 0 0 0.2rem rgba(54, 153, 255, 0.15);
}

.search-input::placeholder {
  color: #a1a5b7;
  font-weight: 400;
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

.results-badge:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(11, 183, 175, 0.25);
  border-color: #0aa39a;
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
