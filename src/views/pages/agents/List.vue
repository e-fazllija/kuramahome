<template>
  <div class="list-page-wrapper">
    <div class="card shadow-sm">
    <!--begin::Header-->
    <div class="card-header border-0 pt-6 pb-4">
      <div class="card-title">
        <div class="d-flex align-items-center">
          <div class="symbol symbol-45px me-3">
            <span class="symbol-label">
              <i class="ki-duotone ki-user fs-2 text-white">
                <span class="path1"></span>
                <span class="path2"></span>
                <span class="path3"></span>
                <span class="path4"></span>
              </i>
            </span>
          </div>
          <div>
            <h3 class="fw-bold m-0 text-gray-900 fs-3">👥 Gestione Agenti</h3>
            <span class="text-muted fs-7 fw-semibold">Amministrazione e ricerca agenti</span>
          </div>
        </div>
      </div>
      <div class="card-toolbar">
        <button
          v-if="canCreateAgent"
          type="button"
          class="btn btn-sm btn-primary"
          @click="handleNewAgentClick"
          :disabled="isCheckingLimit"
        >
          <span v-if="!isCheckingLimit">
          <i class="ki-duotone ki-plus fs-3 me-2">
            <span class="path1"></span>
            <span class="path2"></span>
          </i>
          <span class="fw-bold">Nuovo Agente</span>
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
        <div class="row g-3 align-items-center mb-4">
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
              {{ tableData.length }} agenti
            </span>
          </div>
        </div>

        <!-- Filtro Agenzia -->
        <div v-if="user.Role == 'Admin'" class="row g-2">
          <div class="col-12 col-md-auto">
            <select 
              class="form-select filter-select" 
              v-model="agencyFilter" 
              @change="searchItems()"
            >
              <option value="">👥 Tutti gli agenti</option>
              <option :value="user.Id">👤 I miei agenti</option>
              <option v-for="(item, index) in defaultSearchItems.Agencies" :key="index" :value="item.Id">
                🏢 {{ item.FirstName }} {{ item.LastName }}
              </option>
            </select>
          </div>
        </div>
      
        <!-- Separatore morbido -->
        <hr class="my-4 filter-separator" />
      </div>
    </div>
    <!--end::Search-->

    <div class="card-body pt-0">
      <Datatable @on-sort="sort" @on-items-select="onItemSelect" :data="tableData" :header="tableHeader"
        :enable-items-per-page-dropdown="true" :checkbox-enabled="false" checkbox-label="Id">
        <template v-slot:UserName="{ row: agent }">
          <div class="d-flex align-items-center clickable-row" @click="openAgentDetails(agent.Id)" style="cursor: pointer;">
            <!-- Avatar con iniziali -->
            <div class="symbol symbol-40px me-3">
              <div class="symbol-label" :style="{ 
                background: getAgentColor(agent.UserName),
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: '14px'
              }">
                {{ getInitials(agent.UserName) }}
              </div>
            </div>
            <div class="d-flex flex-column">
              <span class="fw-bold text-hover-primary">{{ agent.UserName }}</span>
              <span
                class="badge badge-sm mt-1"
                :class="agent.EmailConfirmed ? 'badge-light-success' : 'badge-light-danger'"
                style="width: fit-content;"
              >
                {{ agent.EmailConfirmed ? 'Attivo' : 'Non attivo' }}
              </span>
            </div>
          </div>
        </template>
        <template v-slot:FirstName="{ row: agent }">
          {{ agent.FirstName }}
        </template>
        <template v-slot:LastName="{ row: agent }">
          {{ agent.LastName }}
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
            <span>{{ agent.PhoneNumber }}</span>
            <button 
              @click="copyToClipboard(agent.PhoneNumber, 'Telefono')"
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

        <template v-slot:actions="{ row: agent }">
          <div class="d-flex gap-2 justify-content-center action-buttons">
            <button
              type="button"
              class="btn btn-action btn-action-info"
              data-bs-toggle="modal"
              data-bs-target="#kt_modal_update_agent"
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
              title="Elimina agente"
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

    <ExportCustomerModal></ExportCustomerModal>
    <AddAgentModal 
      @formAddSubmitted="getItems(agencyFilter, '')"
      @limitExceeded="handleLimitExceeded"
    ></AddAgentModal>
    <UpdateAgentModal :Id="selectedId" @formUpdateSubmitted="getItems(agencyFilter, '')"></UpdateAgentModal>
    
    <!-- Modale Upgrade Required -->
    <UpgradeRequiredModal
      :isOpen="showUpgradeModal"
      :featureDisplayName="'Agenti'"
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
import { getAgents, deleteAgent, Agent } from "@/core/data/agents";
import { getCustomers } from "@/core/data/customers";
import AddAgentModal from "@/components/modals/forms/agents/AddAgentModal.vue";
import UpdateAgentModal from "@/components/modals/forms/agents/UpdateAgentModal.vue";
import UpgradeRequiredModal from "@/components/modals/UpgradeRequiredModal.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { getSearchItems, SearchModel } from "@/core/data/events";
import { useAuthStore, type User } from "@/stores/auth";
import { canCreateAgent as canUserCreateAgent } from "@/core/helpers/auth";
import { checkFeatureLimit, type SubscriptionLimitStatusResponse } from "@/core/data/subscription-limits";
import { Modal } from "bootstrap";
import KTSpinner from "@/components/Spinner.vue";
import '@/assets/css/filters.css';
import '@/assets/css/table-actions.css';
import '@/assets/css/lists-common.css';

export default defineComponent({
  name: "agents",
  components: {
    Datatable,
    ExportCustomerModal,
    AddAgentModal,
    UpdateAgentModal,
    UpgradeRequiredModal,
    KTSpinner,
  },
  setup() {
    const tableHeader = ref([
      {
        columnName: "UserName",
        columnLabel: "UserName",
        sortEnabled: true,
        columnWidth: 165,
      },
      {
        columnName: "Nome",
        columnLabel: "FirstName",
        sortEnabled: true,
        columnWidth: 165,
      },
      {
        columnName: "Cognome",
        columnLabel: "LastName",
        sortEnabled: true,
        columnWidth: 165,
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
    const initItems = ref([]);
    const store = useAuthStore();
    const user = store.user;
    
    // Verifica se l'utente può creare agenti usando helper
    const canCreateAgent = computed(() => canUserCreateAgent());
    
    let agencyFilter = ref("");
    const isSearching = ref(false);
    const defaultSearchItems = ref<SearchModel>({
      Agencies: [],
      Agents: [],
    });
    
    // Subscription limits state
    const isCheckingLimit = ref(false);
    const showUpgradeModal = ref(false);
    const limitStatus = ref<SubscriptionLimitStatusResponse | null>(null);

    async function getItems(agencyFilter: string, filterRequest: string) {
      try {
        const result = await getAgents(agencyFilter, filterRequest);
        tableData.value = result || [];
      } catch (error) {
        console.error('Error fetching agents:', error);
        tableData.value = [];
      }
    };

    onMounted(async () => {
      isSearching.value = true;
      if (store.user.Role == "Admin") {
        defaultSearchItems.value = await getSearchItems(store.user.Id, "");
      }
      // Imposta filtro su "Tutti gli agenti" all'apertura
      agencyFilter.value = "";
      await getItems(agencyFilter.value, "");
      initItems.value.splice(0, tableData.value.length, ...tableData.value);
      isSearching.value = false;
      
      // Avvia animazione placeholder
      initPlaceholderAnimation();
    });

    const deleteFewItems = async () => {
      selectedIds.value.forEach(async (item) => {
        await deleteAgent(item)
      });
      selectedIds.value.length = 0;
      await getItems(agencyFilter.value, "");
    };

    const search = ref<string>("");

    const searchItems = async () => {
      isSearching.value = true;
      
      // Breve delay per mostrare l'animazione di loading
      setTimeout(async () => {
        await getItems(agencyFilter.value, search.value);

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

    async function deleteItem(agent: Agent) {
      const userName = (agent as Record<string, any>)?.UserName as string | undefined;
      const displayName = `${agent.FirstName ?? ""} ${agent.LastName ?? ""}`.trim() || agent.Email || userName || `Agente #${agent.Id}`;

      let requiresTyping = false;
      if (agent?.Id !== undefined && agent?.Id !== null) {
        try {
          const customers = await getCustomers("");
          requiresTyping = !!customers?.some((customer) => {
            const ownerId = customer.UserId ?? customer.AdminId ?? "";
            return ownerId && ownerId === String(agent.Id);
          });
        } catch (error) {
          console.error("Errore durante il controllo dei clienti collegati all'agente:", error);
          requiresTyping = true;
        }
      }

      const result = await Swal.fire({
        title: "Elimina agente",
        html: requiresTyping
          ? `Stai per eliminare definitivamente l'agente <strong>${displayName}</strong> e tutti i clienti collegati. L'operazione è irreversibile.<br><br>Per confermare digita esattamente <strong>${displayName}</strong>.`
          : `Sei sicuro di voler eliminare definitivamente l'agente <strong>${displayName}</strong>? L'operazione non può essere annullata.`,
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

      if (!result.isConfirmed) {
        return;
      }

      if (agent?.Id === undefined || agent?.Id === null) {
        console.error("Impossibile eliminare l'agente: Id non disponibile", agent);
        return;
      }

      await deleteAgent(String(agent.Id));
      await getItems(agencyFilter.value, "");
      MenuComponent.reinitialization();
    }

    const sort = (sort: Sort) => {
      const reverse: boolean = sort.order === "asc";
      if (sort.label) {
        arraySort(tableData.value, sort.label, { reverse });
      }
    };

    const selectId = (id: string) => {
      selectedId.value = id;
    };

    // Funzione per aprire i dettagli dell'agente
    const openAgentDetails = (id: string) => {
      selectId(id);
      // Usa setTimeout per assicurarsi che il DOM sia aggiornato
      setTimeout(() => {
        const modalElement = document.getElementById('kt_modal_update_agent');
        if (modalElement) {
          const modal = new Modal(modalElement);
          modal.show();
        }
      }, 10);
    };

    const onItemSelect = (selectedItems: Array<String>) => {
      selectedIds.value = selectedItems;
    };

    const clearAllFilters = () => {
      search.value = "";
      agencyFilter.value = "";
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
    const getAgentColor = (name: string): string => {
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

    // Gestione click "Nuovo Agente" con controllo limiti
    const handleNewAgentClick = async () => {
      try {
        isCheckingLimit.value = true;

        // Verifica limite PRIMA di aprire la modale
        const response = await checkFeatureLimit('max_agents');
        
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
        console.log('Limite OK, apro form creazione agente');
        const modalElement = document.getElementById('kt_modal_add_agent');
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
      getAssetPath,
      deleteItem,
      selectId,
      getItems,
      user,
      agencyFilter,
      defaultSearchItems,
      clearAllFilters,
      currentPlaceholder,
      isSearching,
      getInitials,
      getAgentColor,
      copyToClipboard,
      canCreateAgent,
      handleNewAgentClick,
      handleLimitExceeded,
      isCheckingLimit,
      showUpgradeModal,
      limitStatus,
      openAgentDetails
    };
  },
});
</script>

<!-- Stili comuni gestiti da lists-common.css -->
