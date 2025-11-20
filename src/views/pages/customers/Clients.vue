<template>
  <div class="list-page-wrapper">
    <div class="card shadow-sm">
    <!--begin::Header-->
    <div class="card-header border-0 pt-6 pb-4">
      <div class="card-title">
        <div class="d-flex align-items-center">
          <div class="symbol symbol-45px me-3">
            <span class="symbol-label">
              <i class="ki-duotone ki-profile-user fs-2 text-white">
                <span class="path1"></span>
                <span class="path2"></span>
                <span class="path3"></span>
                <span class="path4"></span>
              </i>
            </span>
          </div>
          <div>
            <h3 class="fw-bold m-0 text-gray-900 fs-3">👥 Gestione Clienti</h3>
            <span class="text-muted fs-7 fw-semibold">Amministrazione e ricerca clienti</span>
          </div>
        </div>
      </div>
      <div class="card-toolbar d-flex flex-wrap gap-3">
        <button
          type="button"
          class="btn btn-sm btn-light"
          @click="openExportModal"
          :disabled="exportLoading"
        >
          <span v-if="!exportLoading" class="d-flex align-items-center">
            <i class="ki-duotone ki-exit-down fs-3 me-2">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            <span class="fw-bold">Esporta</span>
          </span>
          <span v-else class="d-flex align-items-center gap-2">
            <KTSpinner size="sm" :inline="true" />
            Preparazione...
          </span>
        </button>
        <button
          type="button"
          class="btn btn-sm btn-primary"
          @click="handleNewCustomerClick"
          :disabled="isCheckingLimit"
        >
          <span v-if="!isCheckingLimit">
            <i class="ki-duotone ki-plus fs-3 me-2">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            <span class="fw-bold">Nuovo Cliente</span>
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
              {{ tableData.length }} clienti
            </span>
          </div>
        </div>
        
        <!-- Filtri avanzati con Bootstrap Grid -->
        <div class="row g-2">
          <!-- Filtro Tipologia -->
          <div class="col-12 col-sm-6 col-md-auto">
            <select class="form-select filter-select" v-model="contract" @change="applyFilters">
              <option value="">📋 Tutte le tipologie</option>
              <option value="Compratore">🏠 Compratore</option>
              <option value="Venditore">💰 Venditore</option>
              <option value="Costruttore">🏗️ Costruttore</option>
              <option value="Cliente gold">⭐ Cliente gold</option>
            </select>
          </div>
          
          <!-- Filtro Proprietario -->
          <div v-if="user.Role !== 'Agent'" class="col-12 col-sm-6 col-md">
            <select class="form-select filter-select" v-model="ownerFilter" @change="applyFilters">
              <option v-if="user.Role === 'Admin'" value="">📋 Tutti i clienti</option>
              <option :value="user.Id">👤 I miei clienti</option>
              <optgroup v-if="user.Role === 'Admin' && defaultSearchItems.Agencies.length" label="Agenzie">
                <option v-for="agency in defaultSearchItems.Agencies" :key="agency.Id" :value="agency.Id">
                  🏢 {{ agency.FirstName }} {{ agency.LastName }}
                </option>
              </optgroup>
              <optgroup v-if="defaultSearchItems.Agents.length" :label="user.Role === 'Admin' ? 'Agenti' : 'Agenti collegati'">
                <option v-for="agent in defaultSearchItems.Agents" :key="agent.Id" :value="agent.Id">
                  👤 {{ agent.FirstName }} {{ agent.LastName }}
                </option>
              </optgroup>
            </select>
          </div>
        </div>
      
        <!-- Separatore morbido -->
        <hr class="my-4 filter-separator" />
      </div>
    </div>
    <!--end::Search-->
    <div class="card-body pt-5 pb-6">
      <Datatable @on-sort="sort" @on-items-select="onItemSelect" :data="tableData" :header="tableHeader"
        :enable-items-per-page-dropdown="true" :checkbox-enabled="false" checkbox-label="Id">
        <template v-slot:Name="{ row: customer }">
          <div class="d-flex align-items-center clickable-row" @click="goToClientDetails(customer.Id)" style="cursor: pointer;">
            <!-- Avatar con iniziali -->
            <div class="symbol symbol-40px me-3">
              <div class="symbol-label" :style="{ 
                background: getCustomerColor(customer.Name),
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: '14px'
              }">
                {{ getInitials(customer.Name) }}
              </div>
            </div>
            <div class="d-flex flex-column">
              <span class="fw-bold text-hover-primary">{{ customer.Name }}</span>
            </div>
          </div>
        </template>
        <template v-slot:Type="{ row: customer }">
          <div class="d-flex justify-content-center">
            <span :class="getTypeClass(customer.Type)" class="badge">
          {{ customer.Type }}
            </span>
          </div>
        </template>
        <template v-slot:Email="{ row: customer }">
          <div class="d-flex align-items-center justify-content-center gap-2">
            <a :href="`mailto:${customer.Email}`" class="text-gray-600 text-hover-primary" :title="`Invia email a ${customer.Email}`">
            {{ customer.Email }}
          </a>
            <button 
              @click="copyToClipboard(customer.Email, 'Email')"
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
        <template v-slot:Phone="{ row: customer }">
          <div class="d-flex align-items-center justify-content-center gap-2">
            <span>{{ customer.Phone }}</span>
            <button 
              @click="copyToClipboard(customer.Phone, 'Telefono')"
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
        <template v-slot:Actions="{ row: customer }">
          <div class="d-flex gap-2 justify-content-center action-buttons">
            <router-link 
              :to="{ name: 'client', params: { id: customer.Id } }" 
              target="_blank"
              class="btn btn-action btn-action-info"
              title="Visualizza dettagli"
              @click.stop
            >
              <i class="ki-duotone ki-notepad-edit fs-4">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
            </router-link>
            <button
              type="button"
              class="btn btn-action btn-action-danger"
              @click.stop="deleteItem(customer.Id)"
              title="Elimina cliente"
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

  <ExportDataModal
    v-model="exportFilters"
    :modal-id="exportModalId"
    title="Esporta clienti"
    description="Genera un report dei clienti applicando i filtri desiderati."
    entity-label="clienti"
    :fields="customerExportFields"
    :loading="exportLoading"
    date-tooltip="Esporta solo i clienti creati dopo la data indicata."
    @export="handleExportCustomers"
  />
  <AddCustomerModal 
    @formAddSubmitted="getItems('')"
    @limitExceeded="handleLimitExceeded"
  ></AddCustomerModal>

  <UpgradeRequiredModal
    :isOpen="showUpgradeModal"
    :featureDisplayName="'Clienti'"
    :limitStatus="limitStatus"
    @close="showUpgradeModal = false"
  /> 
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import ExportDataModal from "@/components/modals/export/ExportDataModal.vue";
import AddCustomerModal from "@/components/modals/forms/customer/AddCustomerModal.vue";
import arraySort from "array-sort";
import { MenuComponent } from "@/assets/ts/components";
import { getCustomers, Customer, deleteCustomer, CustomerTabelData, exportCustomers, type CustomerExportPayload } from "@/core/data/customers";
import { getSearchItems, SearchModel } from "@/core/data/events";
import Swal from "sweetalert2";
import UpgradeRequiredModal from "@/components/modals/UpgradeRequiredModal.vue";
import { checkFeatureLimit, type SubscriptionLimitStatusResponse } from "@/core/data/subscription-limits";
import { Modal } from "bootstrap";
import { useAuthStore, type User } from "@/stores/auth";
import KTSpinner from "@/components/Spinner.vue";
import { downloadBlobResponse } from "@/core/helpers/download";
import type { ExportFieldDefinition } from "@/types/export";
import '@/assets/css/filters.css';
import '@/assets/css/table-actions.css';
import '@/assets/css/lists-common.css';


export default defineComponent({
  name: "clients",
  components: {
    Datatable,
    ExportDataModal,
    AddCustomerModal,
    UpgradeRequiredModal,
    KTSpinner
  },
  setup() {
    const router = useRouter();
    const loading = ref<boolean>(true);
    const tableHeader = ref([
      {
        columnName: "Cliente",
        columnLabel: "Name",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Tipologia",
        columnLabel: "Type",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Email",
        columnLabel: "Email",
        sortEnabled: true,
        columnWidth: 230,
      },
      {
        columnName: "Telefono",
        columnLabel: "Phone",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Azioni",
        columnLabel: "Actions",
        sortEnabled: false,
        columnWidth: 100,
        textAlign: "center",
      },
    ]);
    const selectedIds = ref<Array<number>>([]);
    const selectedId = ref(0);
    const tableData = ref<Array<CustomerTabelData>>([]);
    const rawItems = ref<Array<CustomerTabelData>>([]);
    const store = useAuthStore();
    const user = store.user;
    const contract = ref<string>("");
    const search = ref<string>("");
    const isSearching = ref(false);
    const isCheckingLimit = ref(false);
    const showUpgradeModal = ref(false);
    const limitStatus = ref<SubscriptionLimitStatusResponse | null>(null);
    const exportModalId = "customers_export_modal";
    const exportLoading = ref(false);
    const buildDefaultExportFilters = (): CustomerExportPayload => ({
      format: "excel",
      fromDate: null,
      toDate: null,
      type: "",
      ownerId: user.Role === "Agent" ? user.Id : user.Role === "Admin" ? "" : user.Id,
      goldCustomer: null,
      filter: "",
    });
    const exportFilters = ref<CustomerExportPayload>(buildDefaultExportFilters());
    const ownerFilter = ref<string>(user.Role === "Admin" ? "" : user.Id);
    const defaultSearchItems = ref<SearchModel>({
      Agencies: [],
      Agents: [],
    });
    const ownerOptions = computed(() => {
      const options: Array<{ label: string; value: string }> = [];
      if (user.Role === "Admin") {
        options.push({ label: "Tutti i clienti", value: "" });
      }
      options.push({ label: "I miei clienti", value: user.Id });
      defaultSearchItems.value.Agencies.forEach((agency) => {
        options.push({
          label: `🏢 ${agency.FirstName} ${agency.LastName}`.trim(),
          value: agency.Id,
        });
      });
      defaultSearchItems.value.Agents.forEach((agent) => {
        options.push({
          label: `👤 ${agent.FirstName} ${agent.LastName}`.trim(),
          value: agent.Id,
        });
      });
      return options;
    });
    const customerExportFields = computed<ExportFieldDefinition[]>(() => {
      const fields: ExportFieldDefinition[] = [
        {
          key: "type",
          label: "Tipologia cliente",
          type: "select",
          placeholder: "Tutte le tipologie",
          options: [
            { label: "Compratore", value: "Compratore" },
            { label: "Venditore", value: "Venditore" },
            { label: "Costruttore", value: "Costruttore" },
            { label: "Cliente gold", value: "Cliente gold" },
          ],
        },
        {
          key: "goldCustomer",
          label: "Solo clienti gold",
          type: "checkbox",
          placeholder: "Includi solo clienti gold",
        },
        {
          key: "filter",
          label: "Ricerca testuale",
          type: "text",
          placeholder: "Nome, email, telefono...",
        },
      ];
      if (user.Role !== "Agent") {
        fields.splice(1, 0, {
          key: "ownerId",
          label: "Proprietario",
          type: "select",
          placeholder: "Seleziona proprietario",
          options: ownerOptions.value,
        });
      }
      return fields;
    });

    const searchingFunc = (obj: any, value: string): boolean => {
      for (const key in obj) {
        if (
          !Number.isInteger(obj[key]) &&
          !(typeof obj[key] === "object") &&
          (typeof obj[key] === "string" || typeof obj[key] === "number" || Array.isArray(obj[key]))
        ) {
          if (obj[key]?.toString().toLowerCase().includes(value)) {
            return true;
          }
        }
      }
      return false;
    };

    const applyFilters = () => {
      let items = [...rawItems.value];

      const filterId = ownerFilter.value || (user.Role === "Agent" ? user.Id : "");
      if (filterId) {
        items = items.filter((item) => item.UserId === filterId);
      }

      if (contract.value) {
        items = items.filter((item) => {
          if (!item.Type) {
            return false;
          }
          return item.Type.split(",").map((t) => t.trim()).includes(contract.value);
        });
      }

      if (search.value.trim()) {
        const value = search.value.trim().toLowerCase();
        items = items.filter((item) => searchingFunc(item, value));
      }

      tableData.value = items;
      MenuComponent.reinitialization();
    };

    async function getItems(filterRequest: string) {
      loading.value = true;
      try {
        const results = await getCustomers(filterRequest);
        const mapped: Array<CustomerTabelData> = [];
        if (results && Array.isArray(results)) {
          results.forEach((customer) => {
            const types: string[] = [];
            if (customer.Buyer) types.push("Compratore");
            if (customer.Seller) types.push("Venditore");
            if (customer.Builder) types.push("Costruttore");
            if (customer.GoldCustomer) types.push("Cliente gold");

            mapped.push({
              Id: customer.Id,
              Name: `${customer.FirstName ?? ""} ${customer.LastName ?? ""}`.trim(),
              Type: types.join(", "),
              Email: customer.Email ?? "",
              Phone: customer.Phone?.toString() ?? "",
              UserId: customer.UserId ?? "",
            });
          });
        }
        rawItems.value = mapped;
        applyFilters();
      } catch (error) {
        console.error('Error fetching customers:', error);
        rawItems.value = [];
        tableData.value = [];
        applyFilters();
      }
      loading.value = false;
    };

    const handleNewCustomerClick = async () => {
      try {
        isCheckingLimit.value = true;
        const response = await checkFeatureLimit('max_customers');
        if (!response.canProceed) {
          limitStatus.value = response;
          showUpgradeModal.value = true;
          return;
        }
        const modalElement = document.getElementById('kt_modal_add_customer');
        if (modalElement) {
          const modal = new Modal(modalElement);
          modal.show();
        }
      } catch (error: any) {
        console.error('Errore durante la verifica del limite clienti:', error);
      } finally {
        isCheckingLimit.value = false;
      }
    };

    const handleLimitExceeded = (limitStatusData: SubscriptionLimitStatusResponse) => {
      limitStatus.value = limitStatusData;
      showUpgradeModal.value = true;
    };

    onMounted(async () => {
      isSearching.value = true;
      if (user.Role !== "Agent") {
        defaultSearchItems.value = await getSearchItems(user.Id);
      }
      await getItems("");
      isSearching.value = false;
      
      // Avvia animazione placeholder
      initPlaceholderAnimation();
    });

    const deleteFewItems = async () => {
      selectedIds.value.forEach(async (item) => {
        await deleteCustomer(item)
      });
      selectedIds.value.length = 0;
      await getItems("");
    };

    const searchItems = () => {
      isSearching.value = true;
      setTimeout(() => {
        applyFilters();
        isSearching.value = false;
      }, 150);
    };

    async function deleteItem(id: number) {
      const customer = tableData.value.find((item) => item.Id === id);
      const displayName = customer?.Name?.trim() || customer?.Email || `Cliente #${id}`;

      const result = await Swal.fire({
        title: "Elimina cliente",
        html: `Stai per eliminare definitivamente questo cliente e tutti i dati collegati ad esso. L'operazione è irreversibile.<br><br>Per confermare digita esattamente <strong>${displayName}</strong>.`,
        icon: "warning",
        input: "text",
        inputLabel: "Conferma eliminazione",
        inputPlaceholder: displayName,
        showCancelButton: true,
        focusCancel: true,
        confirmButtonText: "Elimina definitivamente",
        cancelButtonText: "Annulla",
        inputValidator: (value) => {
          if (value !== displayName) {
            return "Il nome inserito non corrisponde. Riprova.";
          }
          return undefined;
        },
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

      try {
        await deleteCustomer(id);
        await getItems("");
        MenuComponent.reinitialization();
      } catch (error: any) {
        const errorMessage = error?.data?.Message || store.errors || "Si è verificato un errore durante l'eliminazione del cliente.";
        Swal.fire({
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
    }

    const sort = (sort: Sort) => {
      const reverse: boolean = sort.order === "asc";
      if (sort.label) {
        arraySort(tableData.value, sort.label, { reverse });
      }
    };

    const selectId = (id: number) => {
      selectedId.value = id;
    };

    const onItemSelect = (selectedItems: Array<number>) => {
      selectedIds.value = selectedItems;
    };

    const clearAllFilters = () => {
      search.value = "";
      contract.value = "";
      ownerFilter.value = user.Role === "Admin" ? "" : user.Id;
      applyFilters();
    };

    watch(ownerFilter, () => applyFilters());
    watch(contract, () => applyFilters());

    // Placeholder dinamico
    const placeholders = [
      "Cerca per nome cliente...",
      "Cerca per email...",
      "Cerca per telefono...",
      "Cerca per tipologia..."
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
    const getCustomerColor = (name: string): string => {
      const colors = [
        "#f64e60", "#d63447", "#ffa800", "#8950fc", 
        "#1bc5bd", "#009ef7", "#3699ff", "#0bb7af"
      ];
      if (!name) return colors[0];
      const hash = name.split('').reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
      }, 0);
      return colors[Math.abs(hash) % colors.length];
    };

    // Funzione per ottenere la classe del badge in base al tipo
    const getTypeClass = (type: string): string => {
      switch(type) {
        case "Compratore":
          return "badge-light-success";
        case "Venditore":
          return "badge-light-warning";
        case "Costruttore":
          return "badge-light-info";
        case "Cliente gold":
          return "badge-light-primary";
        default:
          return "badge-light-secondary";
      }
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

    // Funzione per navigare ai dettagli del cliente
    const goToClientDetails = (id: number) => {
      const route = router.resolve({ name: 'client', params: { id: id.toString() } });
      window.open(route.href, '_blank');
    };
    const openExportModal = () => {
      const modalElement = document.getElementById(exportModalId);
      if (modalElement) {
        Modal.getOrCreateInstance(modalElement).show();
      }
    };

    const closeExportModal = () => {
      const modalElement = document.getElementById(exportModalId);
      if (modalElement) {
        Modal.getInstance(modalElement)?.hide();
      }
    };

    const resetExportFilters = () => {
      exportFilters.value = {
        ...buildDefaultExportFilters(),
      };
    };

    const handleExportCustomers = async (payload: CustomerExportPayload) => {
      exportLoading.value = true;
      try {
        const response = await exportCustomers(payload);
        const fallbackName = payload.format === "csv" ? "clienti.csv" : "clienti.xlsx";
        downloadBlobResponse(response, fallbackName);
        closeExportModal();
        Swal.fire({
          icon: "success",
          title: "Export completato",
          text: "Il file è stato scaricato correttamente.",
          confirmButtonText: "Ok",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
        resetExportFilters();
      } catch (error: any) {
        let message = "Errore durante l'esportazione dei clienti.";
        const response = error?.response;
        if (response?.data instanceof Blob) {
          const text = await response.data.text();
          try {
            const parsed = JSON.parse(text);
            message = parsed?.Message || parsed?.message || message;
            if (parsed?.CanProceed === false) {
              limitStatus.value = parsed;
              showUpgradeModal.value = true;
            }
          } catch {
            message = text || message;
          }
        } else if (response?.data?.Message) {
          message = response.data.Message;
        }
        Swal.fire({
          icon: "error",
          title: "Export non riuscito",
          text: message,
          confirmButtonText: "Ok",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
      } finally {
        exportLoading.value = false;
      }
    };

    return {
      tableData,
      tableHeader,
      deleteCustomer,
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
      contract,
      user,
      ownerFilter,
      defaultSearchItems,
      clearAllFilters,
      currentPlaceholder,
      isSearching,
      getInitials,
      getCustomerColor,
      getTypeClass,
      copyToClipboard,
      isCheckingLimit,
      handleNewCustomerClick,
      showUpgradeModal,
      limitStatus,
      handleLimitExceeded,
      applyFilters,
      loading,
      goToClientDetails,
      exportModalId,
      exportFilters,
      customerExportFields,
      exportLoading,
      openExportModal,
      handleExportCustomers
    };
  },
});
</script>

<!-- Stili comuni gestiti da lists-common.css -->
