<template>
  <div class="clients-page-wrapper">
    <div class="card shadow-sm" style="border-radius: 0.95rem; border: 1px solid #e9ecef;">
    <!--begin::Header-->
    <div class="card-header border-0 pt-6 pb-4" style="background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%); border-radius: 0.95rem 0.95rem 0 0;">
      <div class="card-title">
        <div class="d-flex align-items-center">
          <div class="symbol symbol-45px me-3">
            <span class="symbol-label" style="background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%); box-shadow: 0 4px 12px rgba(54, 153, 255, 0.3);">
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
      <div class="card-toolbar">
        <button
          type="button"
          class="btn btn-sm btn-primary"
          @click="handleNewCustomerClick"
          :disabled="isCheckingLimit"
          style="background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%); border: none; border-radius: 0.75rem; padding: 0.75rem 1.5rem; box-shadow: 0 4px 12px rgba(54, 153, 255, 0.25);"
        >
          <span v-if="!isCheckingLimit">
            <i class="ki-duotone ki-plus fs-3 me-2">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            <span class="fw-bold">Nuovo Cliente</span>
          </span>
          <span v-else>
            <span class="spinner-border spinner-border-sm me-2" role="status"></span>
            Verifica in corso...
          </span>
        </button>
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
                @keyup.enter="searchItems()"
                class="form-control search-input" 
                :placeholder="currentPlaceholder" 
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
        
          <!-- Bottone Cerca con loading -->
          <div class="flex-shrink-0">
            <button 
              @click="searchItems()" 
              class="btn btn-primary btn-search"
              :disabled="isSearching"
            >
              <span v-if="!isSearching">
                <i class="ki-duotone ki-magnifier fs-3 me-2">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
                <span class="fw-bold">Cerca</span>
              </span>
              <span v-else class="d-flex align-items-center">
                <span class="spinner-border spinner-border-sm me-2" role="status"></span>
                <span class="fw-bold">Ricerca...</span>
              </span>
            </button>
        </div>
        
          <!-- Filtro Tipologia -->
          <div class="flex-shrink-0">
            <div class="type-filter-wrapper position-relative">
              <i class="ki-duotone ki-briefcase type-filter-icon position-absolute">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              <select class="form-select form-select-modern type-select" v-model="contract" @change="applyFilters" style="min-width: 220px;">
                <option value="">📋 Tutte le tipologie</option>
                <option value="Compratore">🏠 Compratore</option>
                <option value="Venditore">💰 Venditore</option>
                <option value="Costruttore">🏗️ Costruttore</option>
                <option value="Cliente gold">⭐ Cliente gold</option>
          </select>
            </div>
        </div>
        
          <!-- Filtro Proprietario -->
          <div v-if="user.Role !== 'Agent'" class="flex-shrink-0">
            <div class="agency-filter-wrapper position-relative">
              <i class="ki-duotone ki-office-bag agency-filter-icon position-absolute">
                <span class="path1"></span>
                <span class="path2"></span>
                <span class="path3"></span>
                <span class="path4"></span>
                <span class="path5"></span>
              </i>
              <select class="form-select form-select-modern agency-select" v-model="ownerFilter" @change="applyFilters" style="min-width: 220px;">
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
                <span class="results-label">Clienti</span>
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
      <Datatable @on-sort="sort" @on-items-select="onItemSelect" :data="tableData" :header="tableHeader"
        :enable-items-per-page-dropdown="true" :checkbox-enabled="false" checkbox-label="Id">
        <template v-slot:Name="{ row: customer }">
          <div class="d-flex align-items-center">
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
              <router-link :to="{ name: 'client', params: { id: customer.Id } }" target="_blank" 
                class="text-decoration-none fw-bold text-hover-primary" 
                :title="`Vai ai dettagli di ${customer.Name}`">
          {{ customer.Name }}
              </router-link>
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
            >
              <span class="btn-icon">
                <i class="ki-duotone ki-eye fs-3">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                </i>
              </span>
              <span class="btn-label">Dettagli</span>
            </router-link>
            <button
              type="button"
              class="btn btn-action btn-action-danger"
              @click="deleteItem(customer.Id)"
              title="Elimina cliente"
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

  <ExportCustomerModal></ExportCustomerModal>
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
import { defineComponent, onMounted, ref, watch } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import ExportCustomerModal from "@/components/modals/forms/ExportCustomerModal.vue";
import AddCustomerModal from "@/components/modals/forms/customer/AddCustomerModal.vue";
import arraySort from "array-sort";
import { MenuComponent } from "@/assets/ts/components";
import { getCustomers, Customer, deleteCustomer, CustomerTabelData } from "@/core/data/customers";
import { getSearchItems, SearchModel } from "@/core/data/events";
import Swal from "sweetalert2";
import UpgradeRequiredModal from "@/components/modals/UpgradeRequiredModal.vue";
import { checkFeatureLimit, type SubscriptionLimitStatusResponse } from "@/core/data/subscription-limits";
import { Modal } from "bootstrap";
import { useAuthStore, type User } from "@/stores/auth";


export default defineComponent({
  name: "clients",
  components: {
    Datatable,
    ExportCustomerModal,
    AddCustomerModal,
    UpgradeRequiredModal
  },
  setup() {
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
    const ownerFilter = ref<string>(user.Role === "Admin" ? "" : user.Id);
    const defaultSearchItems = ref<SearchModel>({
      Agencies: [],
      Agents: [],
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
        text: `Sei sicuro di voler eliminare definitivamente ${displayName}? L'operazione non può essere annullata e rimuoverà tutte le informazioni collegate.`,
        icon: "warning",
        showCancelButton: true,
        focusCancel: true,
        confirmButtonText: "Elimina",
        cancelButtonText: "Annulla",
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

      await deleteCustomer(id);
      await getItems("");
      MenuComponent.reinitialization();
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
      loading
    };
  },
});
</script>

<style scoped>
/* Sfondo univoco della pagina */
.clients-page-wrapper {
  background: linear-gradient(135deg, #fafbfc 0%, #f8f9fa 100%);
  min-height: 100vh;
  padding: 2rem 0;
  position: relative;
}

.clients-page-wrapper::before {
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

.clients-page-wrapper > .card {
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

.btn-search {
  background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%);
  border: none;
  border-radius: 0.75rem;
  padding: 0.75rem 1.5rem;
  box-shadow: 0 4px 12px rgba(54, 153, 255, 0.25);
  transition: all 0.3s ease;
}

.btn-search:hover {
  background: linear-gradient(135deg, #2b7ce6 0%, #0aa39a 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(54, 153, 255, 0.35);
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

/* Stili per i select moderni */
.form-select-modern {
  background-color: #f8f9fa !important;
  border: 1px solid #e9ecef !important;
  border-radius: 0.75rem !important;
  padding: 0.75rem 1rem !important;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.form-select-modern:focus {
  border-color: #3699ff !important;
  box-shadow: 0 0 0 0.2rem rgba(54, 153, 255, 0.15) !important;
  background-color: #ffffff !important;
}

/* Filtro Tipologia migliorato */
.type-filter-wrapper {
  position: relative;
}

.type-filter-icon {
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a1a5b7;
  z-index: 10;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.type-select {
  padding-left: 3rem !important;
  background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%) !important;
  border: 1px solid #e8f4ff !important;
  font-weight: 500;
  color: #3f4254;
  box-shadow: 0 2px 8px rgba(54, 153, 255, 0.1);
  transition: all 0.3s ease;
}

.type-select:focus {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%) !important;
  border-color: #3699ff !important;
  box-shadow: 0 0 0 0.2rem rgba(54, 153, 255, 0.15), 0 4px 12px rgba(54, 153, 255, 0.2) !important;
  transform: translateY(-1px);
}

.type-select:hover {
  background: linear-gradient(135deg, #e8f4ff 0%, #f1f3ff 100%) !important;
  border-color: #3699ff !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(54, 153, 255, 0.15);
}

/* Filtro Agenzia migliorato */
.agency-filter-wrapper {
  position: relative;
}

.agency-filter-icon {
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a1a5b7;
  z-index: 10;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.agency-select {
  padding-left: 3rem !important;
  background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%) !important;
  border: 1px solid #e8f4ff !important;
  font-weight: 500;
  color: #3f4254;
  box-shadow: 0 2px 8px rgba(54, 153, 255, 0.1);
  transition: all 0.3s ease;
}

.agency-select:focus {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%) !important;
  border-color: #3699ff !important;
  box-shadow: 0 0 0 0.2rem rgba(54, 153, 255, 0.15), 0 4px 12px rgba(54, 153, 255, 0.2) !important;
  transform: translateY(-1px);
}

.agency-select:hover {
  background: linear-gradient(135deg, #e8f4ff 0%, #f1f3ff 100%) !important;
  border-color: #3699ff !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(54, 153, 255, 0.15);
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

/* Bottone copia */
.btn-copy {
  opacity: 0;
  transition: all 0.2s ease;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
}

tbody tr:hover .btn-copy {
  opacity: 1;
}

.btn-copy:hover {
  transform: scale(1.1);
}

/* Avatar con iniziali */
.symbol-label {
  border-radius: 0.75rem !important;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

tbody tr:hover .symbol-label {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.25);
}

/* Badge stato */
.badge {
  padding: 0.35rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.badge-light-success {
  background: linear-gradient(135deg, #e8fff5 0%, #d4f7e8 100%);
  color: #1bc5bd;
  border: 1px solid #1bc5bd;
}

.badge-light-warning {
  background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%);
  color: #ffa800;
  border: 1px solid #ffa800;
}

.badge-light-info {
  background: linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%);
  color: #3699ff;
  border: 1px solid #3699ff;
}

.badge-light-primary {
  background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
  color: #8950fc;
  border: 1px solid #8950fc;
}

.badge-light-secondary {
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  color: #7e8299;
  border: 1px solid #7e8299;
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

/* Prima colonna (Cliente) - header centrato, contenuto a sinistra */
:deep(tbody td:nth-child(1)) {
  color: #181c32;
  font-weight: 500;
  font-size: 1rem;
  text-align: left !important;
}

:deep(thead th:nth-child(1)) {
  text-align: center !important;
}

/* Seconda colonna (Tipologia) centrata */
:deep(tbody td:nth-child(2)) {
  text-align: center !important;
}

:deep(thead th:nth-child(2)) {
  text-align: center !important;
}

/* Terza colonna (Email) - header centrato, contenuto a sinistra */
:deep(tbody td:nth-child(3)) {
  text-align: left !important;
}

:deep(thead th:nth-child(3)) {
  text-align: center !important;
}

/* Quarta colonna (Telefono) - header centrato, contenuto a sinistra */
:deep(tbody td:nth-child(4)) {
  text-align: left !important;
}

:deep(thead th:nth-child(4)) {
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
  box-shadow: 0 3px 10px rgba(246, 78, 96, 0.35);
}

/* Animazione shake per l'icona elimina */
@keyframes shake {
  0%, 100% { transform: rotate(0deg) scale(1.15); }
  25% { transform: rotate(-5deg) scale(1.15); }
  75% { transform: rotate(5deg) scale(1.15); }
}

/* Effetto hover su icona ricerca */
.search-input:focus ~ .search-icon,
.search-input:hover ~ .search-icon {
  color: #3699ff;
}

/* Spinner loading */
.spinner-border-sm {
  width: 1rem;
  height: 1rem;
  border-width: 0.15rem;
}

/* Bottone cerca disabled */
.btn-search:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none !important;
}

/* Microinterazione placeholder */
.search-input::placeholder {
  transition: opacity 0.3s ease;
}

.search-input:focus::placeholder {
  opacity: 0.5;
}

/* Link email */
:deep(a) {
  color: #495057 !important;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
}

:deep(a:hover) {
  color: #3699ff !important;
  font-weight: 600;
}

/* Link Cliente */
:deep(tbody td:nth-child(1) a) {
  color: #181c32 !important;
  text-decoration: none !important;
  font-weight: 700;
  transition: all 0.2s ease;
}

:deep(tbody td:nth-child(1) a:hover) {
  color: #3699ff !important;
  text-decoration: none !important;
  transform: translateY(-1px);
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
