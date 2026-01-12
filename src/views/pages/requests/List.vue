<template>
  <div class="list-page-wrapper">
    <div class="card shadow-sm">
    <!--begin::Header-->
    <div class="card-header border-0 pt-6 pb-4">
      <div class="card-title">
        <div class="d-flex align-items-center">
          <div class="symbol symbol-45px me-3">
            <span class="symbol-label">
              <i class="ki-duotone ki-document fs-2 text-white">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
            </span>
          </div>
          <div>
            <h3 class="fw-bold m-0 text-gray-900 fs-3">📋 Gestione Richieste</h3>
            <span class="text-muted fs-7 fw-semibold">Amministrazione e ricerca richieste</span>
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
            <i class="ki-duotone ki-exit-down fs-4 me-2">
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
          @click="handleNewRequestClick"
          :disabled="isCheckingLimit"
        >
          <span v-if="!isCheckingLimit">
            <i class="ki-duotone ki-plus fs-4 me-2">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            <span class="fw-bold">Nuova Richiesta</span>
          </span>
          <span v-else>
            <KTSpinner size="sm" :inline="true" />
            Verifica in corso...
          </span>
        </button>
      </div>
    </div>
    <!--end::Header-->
    
    <div class="card-body pt-5 pb-4">
      <!-- Barra di ricerca moderna con Bootstrap -->
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
              <span v-else>
                <KTSpinner size="sm" :inline="true" />
                Ricerca...
              </span>
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
                placeholder="Cerca per nome cliente..." 
              />
              <button 
                v-if="search"
                @click="search = ''" 
                class="btn btn-sm btn-outline-danger rounded-end"
                type="button"
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
              {{ tableData.length }} richieste
            </span>
          </div>
        </div>

        <!-- Filtri avanzati con Bootstrap Grid -->
        <div class="row g-2 mb-3">
          <!-- Filtro Contratto -->
          <div class="col-12 col-sm-6 col-md-4 col-lg-auto">
            <select 
              class="form-select filter-select" 
              v-model="contract"
            >
              <option value="">📋 Tutti contratti</option>
              <option value="Vendita">💰 Vendita</option>
              <option value="Affitto">🏠 Affitto</option>
            </select>
          </div>

          <!-- Filtro Prezzo Da -->
          <div class="col-6 col-sm-6 col-md-4 col-lg-auto">
            <input 
              type="number" 
              v-model="fromPrice" 
              class="form-control filter-input" 
              placeholder="€ Da" 
              min="0"
            />
          </div>
        
          <!-- Filtro Prezzo A -->
          <div class="col-6 col-sm-6 col-md-4 col-lg-auto">
            <input 
              type="number" 
              v-model="toPrice" 
              class="form-control filter-input" 
              placeholder="€ A" 
              min="0"
            />
          </div>

          <!-- Filtro Provincia -->
          <div class="col-12 col-sm-6 col-md-4 col-lg-auto">
            <select 
              class="form-select filter-select" 
              v-model="selectedProvince" 
              @change="onProvinceChange"
            >
              <option value="">🗺️ Province</option>
              <option v-for="province in structuredLocationData.provinces" :key="province.value" :value="province.value">
                {{ province.label }}
              </option>
            </select>
          </div>
        
          <!-- Filtro Città -->
          <div class="col-12 col-sm-6 col-md-4 col-lg-auto">
            <select 
              class="form-select filter-select" 
              v-model="selectedCity" 
              @change="onCityChange" 
              :disabled="!selectedProvince"
            >
              <option value="">🏙️ Città</option>
              <option v-for="city in filteredCities" :key="city.value" :value="city.value">
                {{ city.label }}
              </option>
            </select>
          </div>
        
          <!-- Filtro Località -->
          <div class="col-12 col-sm-6 col-md-4 col-lg-auto">
            <input 
              type="text" 
              v-model="selectedLocation" 
              class="form-control filter-input" 
              placeholder="📍 Località" 
              :disabled="!selectedCity"
            />
          </div>

          <!-- Filtro Agenzia -->
          <div v-if="user.Role == 'Admin'" class="col-12 col-sm-6 col-md-4 col-lg-auto">
            <select 
              class="form-select filter-select" 
              v-model="userId"
            >
              <option value="">🏢 Agenzie</option>
              <option v-for="(item, index) in defaultSearchItems.Agencies" :key="index" :value="item.Id">
                {{ item.FirstName }} {{ item.LastName }}
              </option>
            </select>
          </div>

          <!-- Bottone Pulisci Filtri -->
          <div v-if="hasActiveFilters" class="col-12 col-sm-auto ms-sm-auto">
            <button 
              @click="clearAllFilters" 
              class="btn btn-filter-clear w-100 w-sm-auto"
            >
              <i class="ki-duotone ki-cross fs-5 me-1">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              Pulisci
            </button>
          </div>
        </div>
          
        <!-- Filtro Tipologia Immobile con multiselect -->
        <div v-if="propertyType.length > 0" class="row g-2 mt-2">
          <div class="col-12">
            <div class="d-flex flex-wrap gap-2">
              <span 
                v-for="(type, index) in propertyType" 
                :key="index" 
                class="selected-tag"
              >
                {{ type }}
                <span @click="removePropertyType(index)" class="remove-icon">
                  <i class="ki-duotone ki-cross fs-7">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                </span>
              </span>
            </div>
          </div>
        </div>
            
        <!-- Separatore morbido -->
        <hr class="my-4 filter-separator" />
        
        <!-- Filtro Tipologia Immobile expandibile -->
        <div class="mb-4">
          <div
            class="filter-collapsible-header"
            data-bs-toggle="collapse"
            href="#kt_property_type_filters"
            role="button"
            aria-expanded="false"
          >
            <div>
              <i class="ki-duotone ki-home-2 fs-3 me-2 filter-icon">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              <span class="fw-bold">Tipologia Immobile</span>
            </div>
            <i class="ki-duotone ki-down fs-3 filter-collapsible-icon">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
          </div>
          
          <div id="kt_property_type_filters" class="collapse mt-3">
            <div class="multiselect-wrapper">
              <Multiselect 
                v-model="propertyType" 
                :options="optionsPropertyType" 
                mode="multiple" 
                placeholder="Seleziona tipologie immobile..."
                :searchable="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                trackBy="value"
                label="label"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--end::Search-->
    <div class="card-body pt-0">
      <Datatable @on-sort="sort" @on-items-select="onItemSelect" :data="tableData" :header="tableHeader"
        :enable-items-per-page-dropdown="true" :checkbox-enabled="false" checkbox-label="Id" :loading="loading">
        <template v-slot:CustomerName="{ row: request }">
          <div class="d-flex align-items-center gap-2">
            <div class="d-flex align-items-center clickable-row" @click="goToRequestDetails(request.Id, request)" style="cursor: pointer;">
            <!-- Avatar con iniziali -->
            <div class="symbol symbol-40px me-3">
              <div class="symbol-label" :style="{ 
                background: getCustomerColor(request.CustomerName + ' ' + request.CustomerLastName),
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: '14px'
              }">
                {{ getInitials(request.CustomerName + ' ' + request.CustomerLastName) }}
              </div>
            </div>
            <div class="d-flex flex-column">
              <span class="fw-bold text-hover-primary">{{ request.CustomerName }} {{ request.CustomerLastName }}</span>
            </div>
          </div>
            <span 
              v-if="request.AccessLevel === AccessLevel.READ_ONLY" 
              class="badge badge-light-info" 
              :title="request.OwnerInfo ? getOwnerTooltip(request.OwnerInfo) : 'Solo lettura'"
            >
              <i class="ki-duotone ki-eye fs-7">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
            </span>
            <span 
              v-if="request.AccessLevel === AccessLevel.LIMITED" 
              class="badge badge-light-warning" 
              :title="request.OwnerInfo ? getOwnerTooltip(request.OwnerInfo) : 'Accesso limitato'"
            >
              <i class="ki-duotone ki-information-5 fs-7">
                <span class="path1"></span>
                <span class="path2"></span>
                <span class="path3"></span>
              </i>
            </span>
          </div>
        </template>
        <template v-slot:Contract="{ row: request }">
          <span :class="getContractClass(request.Contract)" class="badge">{{ request.Contract }}</span>
        </template>
        <template v-slot:StringDate="{ row: request }">
          <span class="text-gray-700">{{ request.StringDate }}</span>
        </template>
        <template v-slot:CustomerEmail="{ row: request }">
          <div class="d-flex align-items-center justify-content-center gap-2">
            <a :href="`mailto:${request.CustomerEmail}`" class="text-gray-600 text-hover-primary">
              {{ request.CustomerEmail }}
            </a>
            <button 
              @click="copyToClipboard(request.CustomerEmail, 'Email')"
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
        <template v-slot:CustomerPhone="{ row: request }">
          <div class="d-flex align-items-center justify-content-center gap-2">
            <span>{{ request.CustomerPhone }}</span>
            <button 
              @click="copyToClipboard(request.CustomerPhone, 'Telefono')"
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
        <template v-slot:PriceFrom="{ row: request }">
          <span class="fw-bold text-success">€ {{ request.PriceFrom }}</span>
        </template>
        <template v-slot:PriceTo="{ row: request }">
          <span class="fw-bold text-success">€ {{ request.PriceTo }}</span>
        </template>
        <template v-slot:Status="{ row: request }">
          <span :class="getStatusClass(request.Status)" class="badge">{{ request.Status }}</span>
        </template>
        <template v-slot:Actions="{ row: request }">
          <div class="d-flex gap-2 justify-content-center action-buttons">
            <router-link 
              :to="{ name: 'request', params: { id: request.Id } }" 
              target="_blank" 
              rel="noopener noreferrer"
              class="btn btn-action btn-action-info"
              title="Visualizza dettagli richiesta"
            >
              <i class="ki-duotone ki-notepad-edit fs-4">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
            </router-link>
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

  <ExportDataModal
    v-model="exportFilters"
    :modal-id="exportModalId"
    title="Esporta richieste"
    description="Seleziona i filtri per scaricare il report delle richieste."
    entity-label="richieste"
    :fields="requestExportFields"
    :loading="exportLoading"
    date-tooltip="Limita le richieste create dopo la data indicata."
    @export="handleExportRequests"
  />
  <AddRequestModal 
      @formAddSubmitted="getItems('')"
    @limitExceeded="handleLimitExceeded"
  ></AddRequestModal>

  <UpgradeRequiredModal
    :isOpen="showUpgradeModal"
    :featureDisplayName="'Richieste'"
    :limitStatus="limitStatus"
    @close="showUpgradeModal = false"
  />
  
  <!-- Info Popup per livello 3 -->
  <InfoPopup
    ref="infoPopupRef"
    modalId="info_popup_request"
    :ownerInfo="selectedOwnerInfo"
    entityType="Request"
  />
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import AddRequestModal from "@/components/modals/forms/requests/AddRequestModal.vue";
import UpgradeRequiredModal from "@/components/modals/UpgradeRequiredModal.vue";
import ExportDataModal from "@/components/modals/export/ExportDataModal.vue";
import { checkFeatureLimit, type SubscriptionLimitStatusResponse } from "@/core/data/subscription-limits";
import { Modal } from "bootstrap";
import InfoPopup from "@/components/modals/InfoPopup.vue";
import { AccessLevel, shouldShowPopup, canViewDetails, getOwnerTooltip, type OwnerInfo } from "@/core/helpers/accessLevel";
import arraySort from "array-sort";
import { MenuComponent } from "@/assets/ts/components";
import {
  getRequestsList,
  Request,
  deleteRequest,
  RequestTabelData,
  exportRequests,
  type RequestExportPayload,
} from "@/core/data/requests";
import Swal from "sweetalert2";
import { useAuthStore } from "@/stores/auth";
import { getSearchItems, SearchModel } from "@/core/data/events";
import { getAllProvinceNames, getCitiesByProvince } from "@/core/data/italian-geographic-data-loader";
import Multiselect from "@vueform/multiselect";
import KTSpinner from "@/components/Spinner.vue";
import { downloadBlobResponse } from "@/core/helpers/download";
import type { ExportFieldDefinition } from "@/types/export";
import '@/assets/css/filters.css';
import '@/assets/css/table-actions.css';
import '@/assets/css/lists-common.css';

export default defineComponent({
  name: "requests",
  components: {
    Datatable,
    AddRequestModal,
    KTSpinner,
    UpgradeRequiredModal,
    Multiselect,
    ExportDataModal,
    InfoPopup,
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const optionsPropertyType = ref([
      { value: "Appartamenti", label: "Appartamenti" },
      { value: "AttivitaCommerciale", label: "Attività Commerciale" },
      { value: "Box", label: "Box" },
      { value: "CapannoniLocArtigianali", label: "Capannoni, Loc. Artigianali" },
      { value: "CasaliRuderi", label: "Casali e Ruderi" },
      { value: "CaseSemindipendenti", label: "Case Semindipendenti" },
      { value: "LocaliCommerciali", label: "Locali Commerciali" },
      { value: "NuoveCostruzioni", label: "Nuove Costruzioni" },
      { value: "Terreni", label: "Terreni" },
      { value: "VilleCaseIndipendenti", label: "Ville e Case Indipendenti" },
      { value: "VillaASchiera", label: "Villa a Schiera" }
    ]);
    const tableHeader = ref([
      {
        columnName: "Cliente",
        columnLabel: "CustomerName",
        sortEnabled: true,
        columnWidth: 170,
        textAlign: "center",
      },
      {
        columnName: "Contratto",
        columnLabel: "Contract",
        sortEnabled: true,
        columnWidth: 110,
        textAlign: "center"
      },
      {
        columnName: "Data Richiesta",
        columnLabel: "StringDate",
        sortEnabled: true,
        columnWidth: 150,
        textAlign: "center",
      },
      {
        columnName: "Email",
        columnLabel: "CustomerEmail",
        sortEnabled: true,
        columnWidth: 150,
        textAlign: "center",
      },
      {
        columnName: "Telefono",
        columnLabel: "CustomerPhone",
        sortEnabled: true,
        columnWidth: 160,
        textAlign: "center",
      },
      {
        columnName: "Prezzo Da",
        columnLabel: "PriceFrom",
        sortEnabled: true,
        columnWidth: 100,
        textAlign: "center",
      },
      {
        columnName: "Prezzo A",
        columnLabel: "PriceTo",
        sortEnabled: true,
        columnWidth: 100,
        textAlign: "center",
      },
      {
        columnName: "Stato",
        columnLabel: "Status",
        sortEnabled: true,
        columnWidth: 100,
        textAlign: "center",
      },
      {
        columnName: "Azioni",
        columnLabel: "Actions",
        sortEnabled: false,
        columnWidth: 135,
        textAlign: "center",
      },
    ]);

    const selectedIds = ref<Array<number>>([]);
    let loading = ref<boolean>(true);
    const user = authStore.user;
    const tableData = ref<Array<RequestTabelData>>([]);
    const initItems = ref([]);
    let userId = ref("");
    const infoPopupRef = ref<InstanceType<typeof InfoPopup> | null>(null);
    const selectedOwnerInfo = ref<OwnerInfo>({
      Id: "",
      FirstName: "",
      LastName: "",
      Role: "",
    });
    const defaultSearchItems = ref<SearchModel>({
      Agencies: [],
      Agents: [],
    })
    const isCheckingLimit = ref(false);
    const showUpgradeModal = ref(false);
    const limitStatus = ref<SubscriptionLimitStatusResponse | null>(null);
    const exportModalId = "requests_export_modal";
    const exportLoading = ref(false);
    const buildDefaultExportFilters = (): RequestExportPayload => ({
      format: "excel",
      fromDate: null,
      toDate: null,
      priceFrom: null,
      priceTo: null,
      contract: "",
      propertyTypes: [],
      province: "",
      city: "",
      status: "",
      search: ""
    });
    const exportFilters = ref<RequestExportPayload>(buildDefaultExportFilters());
    const requestExportFields = computed<ExportFieldDefinition[]>(() => [
      {
        key: "contract",
        label: "Contratto",
        type: "select",
        placeholder: "Tutti i contratti",
        options: [
          { label: "Vendita", value: "Vendita" },
          { label: "Affitto", value: "Affitto" },
          { label: "Aste", value: "Aste" }
        ]
      },
      {
        key: "propertyTypes",
        label: "Tipologie immobile",
        type: "multiselect",
        placeholder: "Seleziona tipologie",
        options: optionsPropertyType.value
      },
      {
        type: "range",
        label: "Budget (€)",
        minKey: "priceFrom",
        maxKey: "priceTo",
        minPlaceholder: "Da",
        maxPlaceholder: "A",
        tooltip: "Filtra per budget minimo e massimo indicato dal cliente."
      },
      {
        key: "province",
        label: "Provincia",
        type: "text",
        placeholder: "Es. Torino"
      },
      {
        key: "city",
        label: "Città",
        type: "text",
        placeholder: "Es. Rivoli"
      },
      {
        key: "status",
        label: "Stato richiesta",
        type: "select",
        placeholder: "Tutti gli stati",
        options: [
          { label: "Aperta", value: "Aperta" },
          { label: "Chiusa", value: "Chiusa" },
          { label: "Archiviata", value: "Archiviata" }
        ]
      },
      {
        key: "search",
        label: "Ricerca testuale",
        type: "text",
        placeholder: "Nome cliente, email..."
      }
    ]);

    // Dati strutturati per i filtri a tre livelli (Provincia, Città, Località)
    const structuredLocationData = ref<{
      provinces: Array<{value: string, label: string}>,
      cities: Array<{value: string, label: string, provinceName: string}>
    }>({
      provinces: [],
      cities: []
    });

    // Opzioni filtrate per città
    const filteredCities = ref<Array<{value: string, label: string}>>([]);

    async function getItems(filterRequest: string) {
      loading.value = true;
      tableData.value = [];
      const effectiveFilterUserId = userId.value || undefined;
      const results = await getRequestsList(filterRequest, effectiveFilterUserId);
      let fetchedData = results || [];

      // Il backend già filtra per cerchia, non serve filtrare ulteriormente qui
      // Le richieste vengono mostrate con i loro AccessLevel appropriati

      tableData.value = fetchedData;
      initItems.value.splice(0, tableData.value.length, ...tableData.value);
      loading.value = false;
    };

    const handleNewRequestClick = async () => {
      try {
        isCheckingLimit.value = true;
        const response = await checkFeatureLimit('max_requests');
        if (!response.canProceed) {
          limitStatus.value = response;
          showUpgradeModal.value = true;
          return;
        }
        const modalElement = document.getElementById('kt_modal_add_request');
        if (modalElement) {
          const modal = new Modal(modalElement);
          modal.show();
        }
      } catch (error: any) {
        console.error('Errore durante la verifica del limite richieste:', error);
      } finally {
        isCheckingLimit.value = false;
      }
    };

    const handleLimitExceeded = (limitStatusData: SubscriptionLimitStatusResponse) => {
      limitStatus.value = limitStatusData;
      showUpgradeModal.value = true;
    };




    const deleteFewItems = async () => {
      selectedIds.value.forEach(async (item) => {
        await deleteRequest(item)
      });
      selectedIds.value.length = 0;
      await getItems("");
    };

    const search = ref<string>("");
    const fromPrice = ref<number | undefined>(undefined);
    const toPrice = ref<number | undefined>(undefined);
    const contract = ref<string>("");
    const typologie = ref<string>("");
    const selectedProvince = ref<string>("");
    const selectedCity = ref<string>("");
    const selectedLocation = ref<string>("");
    const propertyType = ref<Array<string>>([]);
    const locations = ref<Array<string>>([]);




    const searchingFunc = (obj: any, value: string): boolean => {
      for (let key in obj) {
        // Verifica se la proprietà è una stringa o un numero
        if (
          !Number.isInteger(obj[key]) &&
          !(typeof obj[key] === "object") &&
          (typeof obj[key] === "string" || typeof obj[key] === "number" || Array.isArray(obj[key]))
        ) {
          // Confronta la proprietà dell'oggetto con la stringa di ricerca
          if (obj[key].toString().toLowerCase().indexOf(value) !== -1) {
            return true;
          }
        }
      }
      return false;
    };

    const searchItems = async () => {
      await getItems("");

      // Filtraggio per testo (search)
      if (search.value !== "") {
        tableData.value = tableData.value.filter(item => 
          item.CustomerName.toLowerCase().includes(search.value.toLowerCase()) ||
          item.CustomerLastName.toLowerCase().includes(search.value.toLowerCase())
        );
      }
      // Filtraggio per prezzo
      if (fromPrice.value > 0) {
        tableData.value = tableData.value.filter(item => item.PriceFrom >= fromPrice.value);
      }
      if (toPrice.value > 0) {
        tableData.value = tableData.value.filter(item => item.PriceTo <= toPrice.value);
      }
      // Filtraggio per contratto con criteri specifici
      if (contract.value) {
        tableData.value = tableData.value.filter(item => {
          switch (contract.value) {
            case 'Affitto':
              return item.Contract === 'Affitto';
            case 'Vendita':
              return item.Contract === 'Vendita';
            case 'Aste':
              return item.Contract === 'Aste';
            default:
              return true; // Se il filtro non è valido, mostra tutto
          }
        });
      }
      // Filtraggio per tipologia
      if (propertyType.value.length > 0) {
        tableData.value = tableData.value.filter(item => {
          // Verifica che l'elemento corrisponda a una delle località selezionate
          return propertyType.value.some(propertyTypes => searchingFunc(item, propertyTypes.toLowerCase()));
        });
      }
      // Filtraggio per località (nuovo sistema a tre livelli)
      if (selectedLocation.value) {
        tableData.value = tableData.value.filter(item => {
          return searchingFunc(item, selectedLocation.value.toLowerCase());
        });
      } else if (selectedCity.value) {
        tableData.value = tableData.value.filter(item => {
          return searchingFunc(item, selectedCity.value.toLowerCase());
        });
      } else if (selectedProvince.value) {
        tableData.value = tableData.value.filter(item => {
          return searchingFunc(item, selectedProvince.value.toLowerCase());
        });
      }
      MenuComponent.reinitialization();
    };

    async function deleteItem(id: number) {
      const result = await Swal.fire({
        title: "Elimina richiesta",
        html: "Stai per eliminare definitivamente questa richiesta e tutti i dati collegati ad essa. L'operazione è irreversibile.",
        icon: "warning",
        showCancelButton: true,
        focusCancel: true,
        buttonsStyling: false,
        confirmButtonText: "Elimina",
        cancelButtonText: "Annulla",
        heightAuto: false,
        customClass: {
          confirmButton: "btn btn-danger",
          cancelButton: "btn btn-light"
        },
      });

      if (!result.isConfirmed) {
        return;
      }

      try {
        await deleteRequest(id);
        await getItems("");
        MenuComponent.reinitialization();
      } catch (error: any) {
        const errorMessage = error?.data?.Message || error?.response?.data?.Message || authStore.errors || "Si è verificato un errore durante l'eliminazione della richiesta.";
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

    const onItemSelect = (selectedItems: Array<number>) => {
      selectedIds.value = selectedItems;
    };

    const removeLocation = (index: number) => {
      locations.value.splice(index, 1);
    };

    const removePropertyType = (index: number) => {
      console.log("Removing propertyType at index:", index, "Current propertyType:", propertyType.value);
      propertyType.value.splice(index, 1);
      console.log("propertyType after removal:", propertyType.value);
    };

    // Funzioni per gestire i filtri a cascata
    const onProvinceChange = () => {
      selectedCity.value = "";
      selectedLocation.value = "";
      
      if (selectedProvince.value) {
        // Filtra le città per la provincia selezionata
        filteredCities.value = structuredLocationData.value.cities.filter(city => 
          city.provinceName === selectedProvince.value
        );
      } else {
        filteredCities.value = [];
      }
    };

    const onCityChange = () => {
      selectedLocation.value = "";
    };

    // Carica i dati strutturati da italia-geographic-data.json
    const loadStructuredData = async () => {
      try {
        // Carica le province dal JSON
        const provinceNames = getAllProvinceNames();
        structuredLocationData.value.provinces = provinceNames.map((name, index) => ({
          value: name,
          label: name
        }));

        // Carica tutte le città per ogni provincia
        const allCities: Array<{value: string, label: string, provinceName: string}> = [];
        
        for (const provinceName of provinceNames) {
          const cities = getCitiesByProvince(provinceName);
          cities.forEach(city => {
            allCities.push({
              value: city.Name,
              label: city.Name,
              provinceName: provinceName
            });
          });
        }

        structuredLocationData.value.cities = allCities;
      } catch (error) {
        console.error("Errore nel caricamento dei dati strutturati:", error);
        structuredLocationData.value = {
          provinces: [],
          cities: []
        };
      }
    };

    // Computed per verificare se ci sono filtri attivi
    const hasActiveFilters = computed(() => {
      return search.value || fromPrice.value || toPrice.value || contract.value || 
             propertyType.value.length > 0 || selectedProvince.value || 
             selectedCity.value || selectedLocation.value || userId.value;
    });

    // Funzione per pulire tutti i filtri
    const clearAllFilters = () => {
      search.value = "";
      fromPrice.value = undefined;
      toPrice.value = undefined;
      contract.value = "";
      propertyType.value = [];
      selectedProvince.value = "";
      selectedCity.value = "";
      selectedLocation.value = "";
      filteredCities.value = [];
      searchItems();
    };

    // Funzione per ottenere classe badge contratto
    const getContractClass = (contractType: string): string => {
      switch(contractType) {
        case "Vendita":
          return "badge-light-success";
        case "Affitto":
          return "badge-light-warning";
        case "Aste":
          return "badge-light-info";
        default:
          return "badge-light-secondary";
      }
    };

    // Funzione per ottenere classe badge stato
    const getStatusClass = (status: string): string => {
      switch(status) {
        case "Aperta":
          return "badge-light-success";
        case "Chiusa":
          return "badge-light-danger";
        case "Archviviata":
          return "badge-light-secondary";
        default:
          return "badge-light-info";
      }
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

    // Funzione per navigare ai dettagli della richiesta
    const goToRequestDetails = (id: number, item?: RequestTabelData) => {
      // Se l'item è fornito, controlla il livello di accesso
      if (item && item.AccessLevel !== undefined) {
        // Se livello 3, mostra popup invece di navigare
        if (shouldShowPopup(item.AccessLevel)) {
          if (item.OwnerInfo) {
            selectedOwnerInfo.value = item.OwnerInfo;
            infoPopupRef.value?.show();
          }
          return;
        }
        // Se livello 1-2, procedi con la navigazione normale
        if (canViewDetails(item.AccessLevel)) {
          const route = router.resolve({ name: 'request', params: { id: id.toString() } });
          window.open(route.href, '_blank');
          return;
        }
      }
      // Default: naviga normalmente (per retrocompatibilità)
      const route = router.resolve({ name: 'request', params: { id: id.toString() } });
      window.open(route.href, '_blank');
    };
    const openExportModal = () => {
      const modalElement = document.getElementById(exportModalId);
      if (modalElement) {
        const modalInstance = Modal.getOrCreateInstance(modalElement);
        modalInstance.show();
      }
    };

    const closeExportModal = () => {
      const modalElement = document.getElementById(exportModalId);
      if (modalElement) {
        const modalInstance = Modal.getInstance(modalElement);
        modalInstance?.hide();
      }
    };

    const resetExportFilters = () => {
      exportFilters.value = {
        ...buildDefaultExportFilters(),
      };
    };

    const handleExportRequests = async (payload: RequestExportPayload) => {
      exportLoading.value = true;
      try {
        const response = await exportRequests(payload);
        const fallbackName = payload.format === "csv" ? "richieste.csv" : "richieste.xlsx";
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
        let message = "Errore durante l'esportazione delle richieste.";
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

    onMounted(async () => {
      if (authStore.user.Role == "Admin") {
        defaultSearchItems.value = await getSearchItems(authStore.user.Id);
      }
      userId.value = "";

      // Carica i dati strutturati per i filtri
      await loadStructuredData();

      await getItems("");
    });

          return {
        tableData,
        tableHeader,
        search,
        searchItems,
        contract,
        locations,
        propertyType,
        typologie,
        fromPrice,
        toPrice,
        selectedIds,
        deleteFewItems,
        sort,
        onItemSelect,
        getAssetPath,
        deleteItem,
        getItems,
        loading,
        user,
        userId,
        defaultSearchItems,
        removeLocation,
        removePropertyType,
        selectedProvince,
        selectedCity,
        selectedLocation,
        structuredLocationData,
        filteredCities,
        onProvinceChange,
        onCityChange,
        hasActiveFilters,
        clearAllFilters,
        getContractClass,
        getStatusClass,
        getInitials,
        getCustomerColor,
      copyToClipboard,
      isCheckingLimit,
      handleNewRequestClick,
      showUpgradeModal,
      limitStatus,
      handleLimitExceeded,
      goToRequestDetails,
      infoPopupRef,
      selectedOwnerInfo,
      AccessLevel,
      getOwnerTooltip,
      optionsPropertyType,
      exportFilters,
      exportModalId,
      requestExportFields,
      exportLoading,
      openExportModal,
      handleExportRequests
      };
  },
});
</script>
