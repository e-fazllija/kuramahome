<template>
  <div class="list-page-wrapper">
    <div class="card shadow-sm">
    <!--begin::Header-->
    <div class="card-header border-0 pt-6 pb-4">
      <div class="card-title">
        <div class="d-flex align-items-center">
          <div class="symbol symbol-45px me-3">
            <span class="symbol-label">
              <i class="ki-duotone ki-shop fs-2 text-white">
                <span class="path1"></span>
                <span class="path2"></span>
                <span class="path3"></span>
                <span class="path4"></span>
                <span class="path5"></span>
              </i>
            </span>
          </div>
          <div>
            <h3 class="fw-bold m-0 text-gray-900 fs-3">🏢 Gestione Agenzie</h3>
            <span class="text-muted fs-7 fw-semibold">Amministrazione e ricerca agenzie</span>
          </div>
        </div>
      </div>
      <div class="card-toolbar">
        <button
          v-if="isAdmin"
          type="button"
          class="btn btn-sm btn-primary"
          @click="handleNewAgencyClick"
          :disabled="isCheckingLimit"
        >
          <span v-if="!isCheckingLimit">
          <i class="ki-duotone ki-plus fs-3 me-2">
            <span class="path1"></span>
            <span class="path2"></span>
          </i>
          <span class="fw-bold">Nuova Agenzia</span>
          </span>
          <span v-else>
            <KTSpinner size="sm" :inline="true" />
            Verifica in corso...
          </span>
        </button>
      </div>
    </div>
    <!--end::Header-->
    
    <div class="card-body pt-5 pb-6">
      <!-- Barra di ricerca moderna con Bootstrap -->
      <div class="container-fluid px-0 filter-container">
        <div class="row g-3 align-items-center">
          <!-- Bottone Cerca con loading -->
          <div class="col-12 col-md-auto">
            <button 
              @click="searchItems()" 
              class="btn btn-filter-search w-100 w-md-auto"
              :disabled="isSearching"
            >
              <i class="ki-duotone ki-magnifier fs-4 me-2">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              <span v-if="!isSearching">Cerca</span>
              <span v-else>
                <KTSpinner size="sm" :inline="true" />
                Ricerca...
              </span>
            </button>
          </div>
          
          <!-- Search Input con icona interna -->
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
                :placeholder="currentPlaceholder" 
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
          
          <!-- Badge Risultati -->
          <div class="col-12 col-md-auto">
            <span class="badge badge-filter-results">
              <i class="ki-duotone ki-chart-simple fs-4 me-2">
                <span class="path1"></span>
                <span class="path2"></span>
                <span class="path3"></span>
                <span class="path4"></span>
              </i>
              {{ tableData.length }} agenzie
            </span>
          </div>
        </div>
      
        <!-- Separatore morbido -->
        <hr class="my-4 filter-separator" />
      </div>
    </div>
    <!--end::Search-->
    
<!--begin::Selection Toolbar-->
<div class="card-body pt-0 pb-4" v-if="selectedIds.length > 0">
  <div class="card border-0 selection-toolbar">
    <div class="card-body p-4">
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
          <div class="symbol symbol-45px me-4">
            <span class="symbol-label bg-danger d-flex align-items-center justify-content-center">
              <i class="ki-duotone ki-check-square fs-2 text-white">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
            </span>
          </div>
          <div>
            <span class="fw-bold fs-4 text-gray-900 d-block">{{ selectedIds.length }} agenzie selezionate</span>
            <span class="text-danger fs-7 fw-semibold">Azioni di gruppo disponibili</span>
          </div>
        </div>
        <div class="d-flex gap-3">
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
            <span class="fw-bold fs-6">Elimina Selezionate</span>
          </button>
          <button
            type="button"
            class="btn btn-light-danger d-flex align-items-center"
            @click="clearSelection()"
          >
            <i class="ki-duotone ki-cross-circle fs-3 me-2 text-danger">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            <span class="fw-bold fs-6 text-danger">Deseleziona Tutto</span>
          </button>
        </div>
      </div>
      
      <!-- Progress Bar Opzionale -->
      <div class="mt-3">
        <div class="progress">
          <div 
            class="progress-bar bg-danger" 
            role="progressbar" 
            :style="{ width: Math.min((selectedIds.length / tableData.length) * 100, 100) + '%' }"
          ></div>
        </div>
        <div class="d-flex justify-content-between mt-1">
          <small class="text-muted fs-8">Selezione in corso</small>
          <small class="text-danger fw-bold fs-8">{{ Math.round((selectedIds.length / tableData.length) * 100) }}%</small>
        </div>
      </div>
    </div>
  </div>
</div>
<!--end::Selection Toolbar-->
    <!--end::Selection Toolbar-->
    
    <!-- Messaggio Nessun Risultato -->
    <div v-if="tableData.length === 0 && !isSearching" class="card-body pt-0">
      <div class="empty-state text-center py-10">
        <div class="empty-state-icon mb-4">
          <i class="ki-duotone ki-magnifier fs-5x text-muted">
            <span class="path1"></span>
            <span class="path2"></span>
          </i>
        </div>
        <h3 class="fw-bold text-gray-800 mb-2">Nessuna agenzia trovata</h3>
        <p class="text-muted fs-6 mb-4">
          {{ search ? `Non ci sono risultati per "${search}"` : 'Non sono state trovate agenzie nel sistema' }}
        </p>
        <button 
          v-if="search"
          @click="clearAllFilters()" 
          class="btn btn-light-primary"
        >
          <i class="ki-duotone ki-arrows-circle fs-3 me-2">
            <span class="path1"></span>
            <span class="path2"></span>
          </i>
          Cancella filtri
        </button>
      </div>
    </div>
    
    <div v-else class="card-body pt-0 fade-in">
      <Datatable
        @on-sort="sort"
        @on-items-select="onItemSelect"
        :data="tableData"
        :header="tableHeader"
        :enable-items-per-page-dropdown="true"
        :checkbox-enabled="false"
        checkbox-label="Id"
      >
      <template v-slot:AgencyName="{ row: agent }">
          <div class="d-flex align-items-center clickable-row" @click="openAgencyDetails(agent.Id)" style="cursor: pointer;">
            <!-- Avatar con iniziali -->
            <div class="symbol symbol-40px me-3">
              <div class="symbol-label" :style="{ 
                background: getAgencyColor(getAgencyDisplayName(agent)),
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: '14px'
              }">
                {{ getInitials(getAgencyDisplayName(agent)) }}
              </div>
            </div>
            <div class="d-flex flex-column">
              <span class="fw-bold text-hover-primary">{{ getAgencyDisplayName(agent) }}</span>
              <span
                class="badge badge-sm mt-1"
                :class="agent.EmailConfirmed ? 'badge-light-success' : 'badge-light-danger'"
                style="width: fit-content;"
              >
                {{ agent.EmailConfirmed ? 'Attiva' : 'Non attiva' }}
              </span>
            </div>
          </div>
        </template>
        <template v-slot:Email="{ row: agent }">
          <div class="d-flex align-items-center justify-content-center gap-2">
            <a :href="`mailto:${agent.Email}`" class="text-gray-600 text-hover-primary" :title="`Invia email a ${agent.Email}`">
            {{ agent.Email }}
          </a>
            <button 
              @click="copyToClipboard(agent.Email, 'Email')"
              class="btn btn-sm btn-icon btn-light-primary btn-copy"
              title="Copia email"
            >
              <i class="ki-duotone ki-copy fs-6">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
            </button>
          </div>
        </template>
        <template v-slot:PhoneNumber="{ row: agent }">
          <div class="d-flex align-items-center justify-content-center gap-2">
            <span>{{ agent.PhoneNumber || '-' }}</span>
            <button 
              v-if="agent.PhoneNumber"
              @click="copyToClipboard(agent.PhoneNumber.toString(), 'Telefono')"
              class="btn btn-sm btn-icon btn-light-primary btn-copy"
              title="Copia telefono"
            >
              <i class="ki-duotone ki-copy fs-6">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
            </button>
          </div>
        </template>
        <template v-slot:MobilePhone="{ row: agent }">
          <div class="d-flex align-items-center justify-content-center gap-2">
            <span>{{ agent.MobilePhone || '-' }}</span>
            <button 
              v-if="agent.MobilePhone"
              @click="copyToClipboard(agent.MobilePhone.toString(), 'Cellulare')"
              class="btn btn-sm btn-icon btn-light-primary btn-copy"
              title="Copia cellulare"
            >
              <i class="ki-duotone ki-copy fs-6">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
            </button>
          </div>
        </template>
        
          <template v-slot:actions="{ row: agent }">
            <div class="d-flex gap-2 justify-content-center action-buttons">
              <button
                type="button"
                class="btn btn-action btn-action-info"
                data-bs-toggle="modal"
                data-bs-target="#kt_modal_update_agency"
                @click.stop="selectId(agent.Id)"
                title="Visualizza dettagli"
              >
                <i class="ki-duotone ki-notepad-edit fs-4">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </button>
              <button
                type="button"
                class="btn btn-action btn-action-danger"
                @click.stop="deleteItem(agent)"
                title="Elimina agenzia"
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
            data-kt-menu="true"
          >
            <!--end::Menu item-->
          </div>
      </Datatable>
    </div>
    </div>

    <ExportCustomerModal></ExportCustomerModal>
    <AddAgencyModal 
      @formAddSubmitted="getItems('')"
      @limitExceeded="handleLimitExceeded"
    ></AddAgencyModal>
    <UpdateAgencyModal :Id="selectedId" @formUpdateSubmitted="getItems('')"></UpdateAgencyModal>
    
    <!-- Modale Upgrade Required -->
    <UpgradeRequiredModal
      :isOpen="showUpgradeModal"
      :featureDisplayName="'Agenzie'"
      :limitStatus="limitStatus"
      @close="showUpgradeModal = false"
    />
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, computed } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import ExportCustomerModal from "@/components/modals/forms/ExportCustomerModal.vue";
import arraySort from "array-sort";
import { MenuComponent } from "@/assets/ts/components";
import { getAgencies, deleteAgency, Agency } from "@/core/data/agencies";
import { getAgents } from "@/core/data/agents";
import AddAgencyModal from "@/components/modals/forms/agencies/AddAgencyModal.vue";
import UpdateAgencyModal from "@/components/modals/forms/agencies/UpdateAgencyModal.vue";
import UpgradeRequiredModal from "@/components/modals/UpgradeRequiredModal.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useAuthStore } from "@/stores/auth";
import { hasAdminRole } from "@/core/helpers/auth";
import { checkFeatureLimit, type SubscriptionLimitStatusResponse } from "@/core/data/subscription-limits";
import { Modal } from "bootstrap";
import KTSpinner from "@/components/Spinner.vue";
import '@/assets/css/filters.css';
import '@/assets/css/table-actions.css';
import '@/assets/css/lists-common.css';

export default defineComponent({
  name: "agencies",
  components: {
    Datatable,
    ExportCustomerModal,
    AddAgencyModal,
    UpdateAgencyModal,
    UpgradeRequiredModal,
    KTSpinner,
  },
  setup() {
    const authStore = useAuthStore();
    
    // Verifica se l'utente è Admin usando helper
    const isAdmin = computed(() => hasAdminRole());
    
    const tableHeader = ref([
      {
        columnName: "Agenzia",
        columnLabel: "AgencyName",
        sortEnabled: true,
        columnWidth: 200,
      },
      {
        columnName: "Email",
        columnLabel: "Email",
        sortEnabled: true,
        columnWidth: 220,
      },
      {
        columnName: "Telefono",
        columnLabel: "PhoneNumber",
        sortEnabled: true,
        columnWidth: 160,
      },
      {
        columnName: "Cellulare",
        columnLabel: "MobilePhone",
        sortEnabled: true,
        columnWidth: 160,
      },
      {
        columnName: "Azioni",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 100,
        textAlign: "center",
      },
    ]);
    const selectedIds = ref<Array<String>>([]);
    let selectedId = ref<string>();
    const tableData = ref([]);
    const initAgents = ref([]);
    const isSearching = ref(false);
    
    // Subscription limits state
    const isCheckingLimit = ref(false);
    const showUpgradeModal = ref(false);
    const limitStatus = ref<SubscriptionLimitStatusResponse | null>(null);
    
    async function getItems(filterRequest: string) {
      isSearching.value = true;
      try {
        const result = await getAgencies(filterRequest);
        tableData.value = result || [];
        // Aggiorna anche initAgents per mantenere il dataset completo
        if (!filterRequest) {
          initAgents.value.splice(0, initAgents.value.length, ...tableData.value);
        }
      } catch (error) {
        console.error('Error fetching agencies:', error);
        tableData.value = [];
      } finally {
        isSearching.value = false;
      }
    };

    onMounted(async () => {
      isSearching.value = true;
      await getItems("");
      initAgents.value.splice(0, tableData.value.length, ...tableData.value);
      isSearching.value = false;
      
      // Avvia animazione placeholder
      initPlaceholderAnimation();
    });

    const deleteFewItems = async () => {
      selectedIds.value.forEach(async (item) => {
        await deleteAgency(item)
      });
      selectedIds.value.length = 0;
      await getItems("");
    };

    const deleteAgent = (id: number) => {
      for (let i = 0; i < tableData.value.length; i++) {
        if (tableData.value[i].Id === id) {
          tableData.value.splice(i, 1);
        }
      }
    };

    const search = ref<string>("");
    const searchItems = () => {
      isSearching.value = true;
      
      // Breve delay per mostrare l'animazione di loading
      setTimeout(() => {
        tableData.value.splice(0, tableData.value.length, ...initAgents.value);
        
        if (search.value !== "") {
          let results: Array<Agency> = [];
          for (let j = 0; j < tableData.value.length; j++) {
            if (searchingFunc(tableData.value[j], search.value)) {
              results.push(tableData.value[j]);
            }
          }
          tableData.value.splice(0, tableData.value.length, ...results);
        }
        
        MenuComponent.reinitialization();
        isSearching.value = false;
      }, 300);
    };

    const searchingFunc = (obj: any, value: string): boolean => {
      const searchValue = value.toLowerCase();
      
      for (let key in obj) {
        if (obj[key] !== null && obj[key] !== undefined) {
          // Cerca nelle stringhe
          if (typeof obj[key] === "string") {
            if (obj[key].toLowerCase().includes(searchValue)) {
              return true;
            }
          }
          // Cerca negli array di stringhe
          else if (Array.isArray(obj[key])) {
            for (let item of obj[key]) {
              if (typeof item === "string" && item.toLowerCase().includes(searchValue)) {
                return true;
              }
            }
          }
          // Cerca nei numeri convertendoli in stringa
          else if (typeof obj[key] === "number") {
            if (obj[key].toString().includes(searchValue)) {
              return true;
            }
          }
        }
      }
      return false;
    };

    async function deleteItem(agency: Agency){
      const displayName = getAgencyDisplayName(agency);

      let requiresTyping = false;
      if (agency?.Id) {
        try {
          const linkedAgents = await getAgents(agency.Id, "");
          requiresTyping = !!linkedAgents?.length;
        } catch (error) {
          console.error("Errore durante il controllo degli agenti collegati:", error);
          requiresTyping = true;
        }
      }

      const result = await Swal.fire({
        title: "Elimina agenzia",
        html: requiresTyping
          ? `Stai per eliminare definitivamente l'agenzia <strong>${displayName}</strong> e tutti gli agenti collegati. L'operazione è irreversibile.<br><br>Per confermare digita esattamente <strong>${displayName}</strong>.`
          : `Stai per eliminare definitivamente l'agenzia <strong>${displayName}</strong>. Questa azione non può essere annullata.`,
        icon: "warning",
        input: requiresTyping ? "text" : undefined,
        inputLabel: requiresTyping ? "Conferma eliminazione" : undefined,
        inputPlaceholder: requiresTyping ? displayName : undefined,
        showCancelButton: true,
        focusCancel: true,
        confirmButtonText: requiresTyping ? "Elimina definitivamente" : "Elimina",
        cancelButtonText: "Annulla",
        inputValidator: requiresTyping
          ? (value) => {
              if (value !== displayName) {
                return "Il nome inserito non corrisponde. Riprova.";
              }
              return undefined;
            }
          : undefined,
        buttonsStyling: false,
        heightAuto: false,
        customClass: {
          confirmButton: "btn btn-danger",
          cancelButton: "btn btn-light",
        },
      });

      if (result.isConfirmed) {
        await deleteAgency(agency.Id);
        await getItems("");
        MenuComponent.reinitialization(); 
      }
    }

    const getAgencyDisplayName = (agency: Agency): string => {
      if (agency.CompanyName) {
        return agency.CompanyName;
      }
      const nameParts = [agency.FirstName, agency.LastName].filter(Boolean);
      if (nameParts.length) {
        return nameParts.join(" ");
      }
      return agency.UserName || "Agenzia";
    };
    
    const sort = (sort: Sort) => {
      const reverse: boolean = sort.order === "asc";
      if (sort.label) {
        arraySort(tableData.value, sort.label, { reverse });
      }
    };

    const selectId = (id: string) => {
      selectedId.value = id;
    };

    // Funzione per aprire i dettagli dell'agenzia
    const openAgencyDetails = (id: string) => {
      selectId(id);
      // Usa setTimeout per assicurarsi che il DOM sia aggiornato
      setTimeout(() => {
        const modalElement = document.getElementById('kt_modal_update_agency');
        if (modalElement) {
          const modal = new Modal(modalElement);
          modal.show();
        }
      }, 10);
    };

    const onItemSelect = (selectedItems: Array<String>) => {
      selectedIds.value = selectedItems;
    };

    const clearSelection = () => {
      selectedIds.value = [];
    };

    const clearAllFilters = () => {
      search.value = "";
      searchItems();
    };

    // Placeholder dinamico
    const placeholders = [
      "Cerca per username...",
      "Cerca per nome o cognome...",
      "Cerca per email...",
      "Cerca per telefono..."
    ];
    const currentPlaceholder = ref(placeholders[0]);
    let placeholderIndex = 0;
    
    // Inizializza placeholder animato separatamente
    const initPlaceholderAnimation = () => {
      setInterval(() => {
        placeholderIndex = (placeholderIndex + 1) % placeholders.length;
        currentPlaceholder.value = placeholders[placeholderIndex];
      }, 3000);
    };

    // Funzione per ottenere iniziali
    const getInitials = (name: string): string => {
      if (!name) return "??";
      const words = name.trim().split(" ");
      if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
      return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    };

    // Funzione per generare colore basato sul nome
    const getAgencyColor = (name: string): string => {
      const colors = [
        "#3699ff", "#0bb7af", "#f64e60", "#ffa800", 
        "#8950fc", "#1bc5bd", "#f1416c", "#009ef7"
      ];
      if (!name) return colors[0];
      const hash = name.split('').reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
      }, 0);
      return colors[Math.abs(hash) % colors.length];
    };

    // Funzione per copiare negli appunti
    const copyToClipboard = async (text: string, type: string) => {
      try {
        await navigator.clipboard.writeText(text);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: `${type} copiato!`,
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      } catch (err) {
        console.error('Errore nella copia:', err);
      }
    };

    // Gestione click "Nuova Agenzia" con controllo limiti
    const handleNewAgencyClick = async () => {
      try {
        isCheckingLimit.value = true;

        // Verifica limite PRIMA di aprire la modale
        const response = await checkFeatureLimit('max_agencies');
        
        // Debug: log della risposta
        console.log('Limit check response:', response);
        console.log('canProceed:', response.canProceed, typeof response.canProceed);

        if (!response.canProceed) {
          // Limite raggiunto → mostra modale upgrade
          console.log('Limite raggiunto, mostro modale upgrade');
          limitStatus.value = response;
          showUpgradeModal.value = true;
          isCheckingLimit.value = false;
          return; // NON apre il form
        }

        // OK → apre modale form
        console.log('Limite OK, apro form creazione agenzia');
        const modalElement = document.getElementById('kt_modal_add_agency');
        if (modalElement) {
          const modal = new Modal(modalElement);
          modal.show();
        }
      } catch (error: any) {
        console.error('Error checking limit:', error);
        console.error('Error details:', {
          message: error?.message,
          response: error?.response,
          status: error?.response?.status,
          data: error?.response?.data,
          url: error?.config?.url
        });
        
        // Se errore 429 dal backend (doppio controllo)
        if (error?.response?.status === 429) {
          limitStatus.value = error.response.data;
          showUpgradeModal.value = true;
        } else {
          // Messaggio errore più dettagliato
          let errorMessage = "Errore durante la verifica del limite";
          
          if (error?.response?.status === 404) {
            errorMessage = "Endpoint non trovato. Verifica che il backend sia avviato correttamente.";
          } else if (error?.response?.status === 401) {
            errorMessage = "Non autorizzato. Effettua nuovamente il login.";
          } else if (error?.response?.status === 500) {
            errorMessage = error?.response?.data || "Errore interno del server. Riprova più tardi.";
          } else if (error?.response?.data?.message) {
            errorMessage = error.response.data.message;
          } else if (error?.message) {
            errorMessage = error.message;
          }
          
          Swal.fire({
            title: "Errore",
            text: errorMessage,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok",
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        }
      } finally {
        isCheckingLimit.value = false;
      }
    };

    // Gestione limite raggiunto dal form (seconda linea di difesa)
    const handleLimitExceeded = (limitStatusData: SubscriptionLimitStatusResponse) => {
      limitStatus.value = limitStatusData;
      showUpgradeModal.value = true;
    };

    return {
      tableData,
      tableHeader,
      deleteAgent,
      search,
      searchItems,
      selectedId,
      selectedIds,
      deleteFewItems,
      sort,
      onItemSelect,
      clearSelection,
      getAssetPath,
      deleteItem,
      selectId,
      getItems,
      clearAllFilters,
      currentPlaceholder,
      isSearching,
      getInitials,
      getAgencyColor,
      getAgencyDisplayName,
      isAdmin,
      copyToClipboard,
      handleNewAgencyClick,
      handleLimitExceeded,
      isCheckingLimit,
      showUpgradeModal,
      limitStatus,
      openAgencyDetails
    };
  },
});
</script>

<!-- Stili comuni gestiti da lists-common.css -->
