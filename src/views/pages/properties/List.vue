<template>
  <div class="list-page-wrapper">
    <div class="card shadow-sm">
    <!--begin::Header-->
    <div class="card-header border-0 pt-6 pb-4">
      <div class="card-title">
        <div class="d-flex align-items-center">
          <div class="symbol symbol-45px me-3">
            <span class="symbol-label">
              <i class="ki-duotone ki-home fs-2 text-white">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
            </span>
          </div>
          <div>
            <h3 class="fw-bold m-0 text-gray-900 fs-3">🏠 Gestione Immobili</h3>
            <span class="text-muted fs-7 fw-semibold">Ricerca e amministrazione proprietà</span>
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
          @click="handleNewPropertyClick"
          :disabled="isCheckingLimit"
        >
          <span v-if="!isCheckingLimit">
          <i class="ki-duotone ki-plus fs-3 me-2">
            <span class="path1"></span>
            <span class="path2"></span>
          </i>
          <span class="fw-bold">Nuovo Immobile</span>
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
          
          <!-- Search Input principale -->
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
                @keyup.enter="searchItems"
                class="form-control filter-input border-start-0 ps-0" 
                placeholder="Cerca per indirizzo, città, provincia..." 
              />
              <button 
                v-if="search"
                @click="search = ''" 
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
              {{ tableData.length }} immobili
            </span>
          </div>
        </div>
        
        <!-- Filtri avanzati con Bootstrap Grid -->
        <div class="row g-2 mb-3">
          <!-- Filtro Contratto -->
          <div class="col-12 col-sm-6 col-md-4 col-lg-auto">
            <select class="form-select filter-select" v-model="contract">
              <option value="">📋 Tutti i contratti</option>
              <option value="Vendita">💰 Vendita</option>
              <option value="Affitto">🏠 Affitto</option>
              <option value="Aste">🔨 Aste</option>
            </select>
          </div>
          
          <!-- Filtro Tipologia -->
          <div class="col-12 col-sm-6 col-md-4 col-lg-auto">
            <select class="form-select filter-select" v-model="typology">
              <option value="">Tutte le tipologie</option>
            <!-- Residenziale -->
            <option value="Appartamento">Appartamento</option>
            <option value="Attico">Attico</option>
            <option value="Mansarda">Mansarda</option>
            <option value="Loft">Loft</option>
            <option value="Soffitta">Soffitta</option>
            <option value="Casale">Casale</option>
            <option value="Rustico">Rustico</option>
            <option value="Villa Unifamiliare">Villa Unifamiliare</option>
            <option value="Villa Bifamiliare">Villa Bifamiliare</option>
            <option value="Villa Plurifamiliare">Villa Plurifamiliare</option>
            <option value="Villa a Schiera">Villa a Schiera</option>
            <!-- Commerciale -->
            <option value="Locale commerciale">Locale commerciale</option>
            <option value="Negozio">Negozio</option>
            <!-- Capannone -->
            <option value="Capannone artigianale">Capannone artigianale</option>
            <option value="Capannone industriale">Capannone industriale</option>
            <!-- Garage -->
            <option value="Box singolo">Box singolo</option>
            <option value="Box doppio">Box doppio</option>
            <option value="Posto auto">Posto auto</option>
            <!-- Magazzino -->
            <option value="Magazzino">Magazzino</option>
            <!-- Rustico / Casale -->
            <option value="Rustico / Casale">Rustico / Casale</option>
            <!-- Terreno -->
            <option value="Edificabile">Edificabile</option>
            <option value="Agricolo">Agricolo</option>
            <option value="Non Edificabile">Non Edificabile</option>
            <!-- Ufficio -->
            <option value="Ufficio">Ufficio</option>
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
              <option value="">🗺️ Provincia</option>
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

          <!-- Filtro Proprietario -->
          <div class="col-12 col-sm-6 col-md-4 col-lg-auto">
            <select class="form-select filter-select" v-model="ownerFilter" @change="applyFilters">
              <option value="">📋 Tutti gli immobili</option>
              <option :value="user.Id">👤 I miei immobili</option>
              <template v-if="user.Role === 'Agent' && user.AdminId">
                <option :value="user.AdminId">🏢 Immobili dell'Agenzia</option>
              </template>
              <template v-else>
                <optgroup v-if="user.Role === 'Admin' && defaultSearchItems.Agencies && defaultSearchItems.Agencies.length > 0" label="Agenzie">
                  <option v-for="agency in defaultSearchItems.Agencies" :key="agency.Id" :value="agency.Id">
                    🏢 {{ agency.FirstName }} {{ agency.LastName }}
                  </option>
                </optgroup>
                <optgroup v-if="defaultSearchItems.Agents && defaultSearchItems.Agents.length > 0" :label="user.Role === 'Admin' ? 'Agenti' : 'Agenti collegati'">
                  <option v-for="agent in defaultSearchItems.Agents" :key="agent.Id" :value="agent.Id">
                    👤 {{ agent.FirstName }} {{ agent.LastName }}
                  </option>
                </optgroup>
              </template>
            </select>
          </div>

          <!-- Filtro Stato Incarico -->
          <div class="col-12 col-sm-6 col-md-4 col-lg-auto">
            <select class="form-select filter-select" v-model="assignmentStatusFilter" @change="applyFilters">
              <option value="">📅 Tutti gli incarichi</option>
              <option value="valid">✅ Incarichi validi</option>
              <option value="expired">⚠️ Incarichi scaduti</option>
            </select>
          </div>

          <!-- Bottone Pulisci Filtri -->
          <div class="col-12 col-sm-auto ms-sm-auto">
            <button 
              type="button" 
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
        
        <!-- Separatore morbido -->
        <hr class="my-4 filter-separator" />
      </div>
    </div>
    <!--end::Card body-->
    <div class="card-body pt-0">
      <Datatable @on-sort="sort" @on-items-select="onItemSelect" :data="tableData" :header="tableHeader"
        :enable-items-per-page-dropdown="true" :checkbox-enabled="false" checkbox-label="Id" :loading="loading">
        <template v-slot:Id="{ row: item }">
          <div class="d-flex align-items-center gap-2">
            <span 
              class="clickable-row" 
              @click="goToPropertyDetails(item.Id, item)" 
              style="cursor: pointer; color: #3699ff; font-weight: 600;"
            >
              {{ item.Id }}
            </span>
            <span 
              v-if="item.AccessLevel === AccessLevel.READ_ONLY" 
              class="badge badge-light-info" 
              :title="item.OwnerInfo ? getOwnerTooltip(item.OwnerInfo) : 'Solo lettura'"
            >
              <i class="ki-duotone ki-information-5 fs-7">
                <span class="path1"></span>
                <span class="path2"></span>
                <span class="path3"></span>
              </i>
            </span>
            <span 
              v-if="item.AccessLevel === AccessLevel.LIMITED" 
              class="badge badge-light-warning" 
              :title="item.OwnerInfo ? getOwnerTooltip(item.OwnerInfo) : 'Accesso limitato'"
            >
              <i class="ki-duotone ki-information-5 fs-7">
                <span class="path1"></span>
                <span class="path2"></span>
                <span class="path3"></span>
              </i>
            </span>
          </div>
        </template>
        <template v-slot:AssignmentStatus="{ row: item }">
          <span v-if="item.Sold === true" class="badge badge-light-success">
            <i class="ki-duotone ki-check fs-6 me-1">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            Venduto
          </span>
          <span v-else-if="isAssignmentExpired(item)" class="badge badge-light-danger">
            <i class="ki-duotone ki-cross-circle fs-6 me-1">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            Scaduto
          </span>
          <span v-else-if="isAssignmentExpiringSoon(item)" class="badge badge-light-warning">
            <i class="ki-duotone ki-information fs-6 me-1">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            In scadenza
          </span>
          <span v-else class="badge badge-light-success">
            <i class="ki-duotone ki-check-circle fs-6 me-1">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            Valido
          </span>
        </template>
        <template v-slot:AssignmentEnd="{ row: item }">
          <span v-if="item.Sold === true">
            <template v-if="item.UpdateDate">
              {{ new Date(item.UpdateDate).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' }) }}
            </template>
            <template v-else class="text-muted">-</template>
          </span>
          <span v-else-if="item.AssignmentEnd && item.AssignmentEnd !== '0001-01-01T00:00:00'">
            {{ item.AssignmentEnd.substring(0, 10).split('-').reverse().join('-') }}
          </span>
          <span v-else class="text-muted">Senza scadenza</span>
        </template>
        <template v-slot:CommercialSurfaceate="{ row: item }">
          {{ item.CommercialSurfaceate }}
        </template>
        <template v-slot:AddressLine="{ row: item }">
          {{ item.AddressLine }} <br />
          {{ item.City }} <br />
          {{ item.State }}
        </template>
        <template v-slot:Price="{ row: item }">
          <template v-if="item.Price === -1">
            <span>Trattativa riservata</span>
          </template>
          <template v-else>
            € {{ item.Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }}
          </template>
        </template>
        <template v-slot:EffectiveCommission="{ row: item }">
          <span v-if="item.EffectiveCommission !== undefined && item.EffectiveCommission !== null">
            € {{ formatNumber(item.EffectiveCommission) }}
          </span>
          <span v-else class="text-muted">-</span>
        </template>
        <template v-slot:Photos="{ row: item }">
          <img v-if="item.Photos && item.Photos !== 'null'" :src="item.Photos" style="height: 100px; width: 200px; object-fit: cover;" />
          <div v-else style="height: 100px; width: 200px; background-color: #f5f5f5; display: flex; align-items: center; justify-content: center; color: #999;">
            Nessuna foto
          </div>
        </template>
        <template v-slot:actions="{ row: item }">
          <div class="d-flex gap-2 justify-content-center action-buttons">
            <router-link 
              :to="{ name: 'property', params: { id: item.Id } }" 
              target="_blank" 
              rel="noopener noreferrer"
              class="btn btn-action btn-action-info"
              title="Visualizza dettagli immobile"
            >
              <i class="ki-duotone ki-notepad-edit fs-4">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
            </router-link>
          </div>
        </template>
      </Datatable>
    </div>
    <!--end::Card body-->
  </div>
  <!--end::Card-->
  </div>
  <!--end::Properties page wrapper-->

  <ExportDataModal
    v-model="exportFilters"
    :modal-id="exportModalId"
    title="Esporta immobili"
    description="Configura i filtri e scarica l'elenco degli immobili in CSV o Excel."
    entity-label="immobili"
    :fields="propertyExportFields"
    :loading="exportLoading"
    date-tooltip="Considera gli immobili inseriti dopo la data selezionata."
    @export="handleExportProperties"
  />
  <AddPropertyModal 
    @formAddSubmitted="getItems(agencyId, '')" 
    @limitExceeded="handleLimitExceeded"
  ></AddPropertyModal>

  <!-- Modale Upgrade Required -->
  <UpgradeRequiredModal
    :isOpen="showUpgradeModal"
    :featureDisplayName="'Immobili'"
    :limitStatus="limitStatus"
    @close="showUpgradeModal = false"
  />
  
  <!-- Info Popup per livello 3 -->
  <InfoPopup
    ref="infoPopupRef"
    modalId="info_popup_property"
    :ownerInfo="selectedOwnerInfo"
    entityType="Property"
  />
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import ExportDataModal from "@/components/modals/export/ExportDataModal.vue";
import AddPropertyModal from "@/components/modals/forms/AddPropertyModal.vue";
import { getRealEstatePropertiesList, deleteRealEstateProperty, RequestTabelData, exportProperties, type PropertyExportPayload } from "@/core/data/properties";
import { getSearchItems, SearchModel } from "@/core/data/events";
import arraySort from "array-sort";
import { MenuComponent } from "@/assets/ts/components";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useAuthStore } from "@/stores/auth";
import UpgradeRequiredModal from "@/components/modals/UpgradeRequiredModal.vue";
import { checkFeatureLimit, type SubscriptionLimitStatusResponse } from "@/core/data/subscription-limits";
import { Modal } from "bootstrap";
import InfoPopup from "@/components/modals/InfoPopup.vue";
import { AccessLevel, shouldShowPopup, canViewDetails, getOwnerTooltip, type OwnerInfo } from "@/core/helpers/accessLevel";
import { getAllProvinceNames, getCitiesByProvince } from "@/core/data/italian-geographic-data-loader";
import KTSpinner from "@/components/Spinner.vue";
import { downloadBlobResponse } from "@/core/helpers/download";
import type { ExportFieldDefinition } from "@/types/export";
import '@/assets/css/filters.css';
import '@/assets/css/table-actions.css';
import '@/assets/css/lists-common.css';

export default defineComponent({
  name: "properties",
  components: {
    Datatable,
    ExportDataModal,
    AddPropertyModal,
    UpgradeRequiredModal,
    KTSpinner,
    InfoPopup,
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const tableHeader = ref([
      {
        columnName: "Codice",
        columnLabel: "Id",
        sortEnabled: true,
        columnWidth: 70,
        textAlign: "center",
      },
      {
        columnName: "Stato Incarico",
        columnLabel: "AssignmentStatus",
        sortEnabled: true,
        columnWidth: 120,
        textAlign: "center",
      },
      {
        columnName: "Scad. incarico/Vendita",
        columnLabel: "AssignmentEnd",
        sortEnabled: true,
        columnWidth: 120,
        textAlign: "center",
      },
      {
        columnName: "Mq",
        columnLabel: "CommercialSurfaceate",
        sortEnabled: true,
        columnWidth: 60,
        textAlign: "center",
      },
      {
        columnName: "Indirizzo",
        columnLabel: "AddressLine",
        sortEnabled: true,
        columnWidth: 160,
        textAlign: "center",
      },
      {
        columnName: "Prezzo",
        columnLabel: "Price",
        sortEnabled: true,
        columnWidth: 130,
        textAlign: "center",
      },
      {
        columnName: "Provv. effettiva",
        columnLabel: "EffectiveCommission",
        sortEnabled: true,
        columnWidth: 130,
        textAlign: "center",
      },
      {
        columnName: "Immagine",
        columnLabel: "Photos",
        sortEnabled: false,
        columnWidth: 150,
        textAlign: "center",
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 135,
        textAlign: "center",
      },
    ]);
    const selectedIds = ref<Array<Number>>([]);
    const loading = ref<boolean>(true);
    const tableData = ref<Array<RequestTabelData>>([]);
    const rawItems = ref<Array<RequestTabelData>>([]);
    const infoPopupRef = ref<InstanceType<typeof InfoPopup> | null>(null);
    const selectedOwnerInfo = ref<OwnerInfo>({
      Id: "",
      FirstName: "",
      LastName: "",
      Role: "",
    });
    const initItems = ref([]);
    const user = authStore.user;
    let agencyId = ref("");
    const ownerFilter = ref<string>("");
    const defaultSearchItems = ref<SearchModel>({
      Agencies: [],
      Agents: [],
    });
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

    const search = ref<string>("");
    const fromPrice = ref<number | undefined>(undefined);
    const toPrice = ref<number | undefined>(undefined);
    const contract = ref<string>("");
    const typology = ref<string>("");
    const category = ref<string>("");
    const selectedProvince = ref<string>("");
    const selectedCity = ref<string>("");
    const selectedLocation = ref<string>("");
    const assignmentStatusFilter = ref<string>("");

    // Subscription limits state
    const isCheckingLimit = ref(false);
    const showUpgradeModal = ref(false);
    const limitStatus = ref<SubscriptionLimitStatusResponse | null>(null);
    const exportModalId = "properties_export_modal";
    const exportLoading = ref(false);
    const buildDefaultExportFilters = (): PropertyExportPayload => ({
      format: "excel",
      fromDate: null,
      toDate: null,
      contract: "",
      typologie: "",
      priceFrom: null,
      priceTo: null,
      city: "",
      province: "",
      sold: null,
      auction: null,
      status: "",
      filter: "",
      agencyId: user.Role === "Agency" ? user.Id : "",
      agentId: "",
    });
    const exportFilters = ref<PropertyExportPayload>(buildDefaultExportFilters());
    const typologyOptions = [
      "Appartamento",
      "Attico",
      "Mansarda",
      "Loft",
      "Soffitta",
      "Casale",
      "Rustico",
      "Villa Unifamiliare",
      "Villa Bifamiliare",
      "Villa Plurifamiliare",
      "Villa a Schiera",
      "Locale commerciale",
      "Negozio",
      "Capannone artigianale",
      "Capannone industriale",
      "Box singolo",
      "Box doppio",
      "Posto auto",
      "Magazzino",
      "Rustico / Casale",
      "Edificabile",
      "Agricolo",
      "Non Edificabile",
      "Ufficio"
    ];
    const agencyOptions = computed(() =>
      defaultSearchItems.value.Agencies.map((agency) => ({
        label: `${agency.FirstName} ${agency.LastName}`.trim(),
        value: agency.Id,
      }))
    );
    const agentOptions = computed(() =>
      defaultSearchItems.value.Agents.map((agent) => ({
        label: `${agent.FirstName} ${agent.LastName}`.trim(),
        value: agent.Id,
      }))
    );
    const propertyExportFields = computed<ExportFieldDefinition[]>(() => {
      const fields: ExportFieldDefinition[] = [
        {
          key: "contract",
          label: "Contratto",
          type: "select",
          placeholder: "Tutti i contratti",
          options: [
            { label: "Vendita", value: "Vendita" },
            { label: "Affitto", value: "Affitto" },
            { label: "Aste", value: "Aste" },
          ],
        },
        {
          key: "typologie",
          label: "Tipologia",
          type: "select",
          placeholder: "Tutte le tipologie",
          options: typologyOptions.map((label) => ({ label, value: label })),
        },
        {
          type: "range",
          label: "Prezzo (€)",
          minKey: "priceFrom",
          maxKey: "priceTo",
          minPlaceholder: "Da",
          maxPlaceholder: "A",
          tooltip: "Limita l'export agli immobili compresi nel range indicato.",
        },
        {
          key: "city",
          label: "Città",
          type: "text",
          placeholder: "Es. Milano",
        },
        {
          key: "province",
          label: "Provincia",
          type: "text",
          placeholder: "Es. MI",
        },
        {
          key: "status",
          label: "Stato incarico",
          type: "text",
          placeholder: "Es. Attivo, Venduto...",
        },
        {
          key: "sold",
          label: "Solo venduti",
          type: "checkbox",
          placeholder: "Includi immobili venduti",
        },
        {
          key: "auction",
          label: "Solo aste",
          type: "checkbox",
          placeholder: "Includi immobili in asta",
        },
        {
          key: "filter",
          label: "Ricerca testuale",
          type: "text",
          placeholder: "Indirizzo, cliente, note...",
        },
      ];
      if (user.Role === "Admin") {
        fields.push({
          key: "agencyId",
          label: "Agenzia",
          type: "select",
          placeholder: "Tutte le agenzie",
          options: agencyOptions.value,
        });
      }
      if (user.Role === "Admin" || user.Role === "Agency") {
        fields.push({
          key: "agentId",
          label: "Agente",
          type: "select",
          placeholder: "Tutti gli agenti",
          options: agentOptions.value,
        });
      }
      return fields;
    });

    // Gestione click "Nuovo Immobile" con controllo limiti
    const handleNewPropertyClick = async () => {
      try {
        isCheckingLimit.value = true;

        // Verifica limite PRIMA di aprire la modale
        const response = await checkFeatureLimit('max_properties');
        
        // Debug: log della risposta
        console.log('Limit check response:', response);
        console.log('canProceed:', response.canProceed, typeof response.canProceed);

        if (!response.canProceed) {
          // Limite raggiunto → mostra modale upgrade
          console.log('Limite raggiunto, mostro modale upgrade');
          limitStatus.value = response;
          showUpgradeModal.value = true;
          isCheckingLimit.value = false;
          return;
        }

        // Limite OK → apri modale creazione immobile
        console.log('Limite OK, apro form creazione immobile');
        const modalElement = document.getElementById('kt_modal_add_property');
        if (modalElement) {
          const modal = new Modal(modalElement);
          modal.show();
        }
      } catch (error: any) {
        console.error('Errore durante la verifica del limite:', error);
        Swal.fire({
          text: error?.response?.data?.Message || error?.message || "Errore durante la verifica del limite. Riprova più tardi.",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok, capito!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
      } finally {
        isCheckingLimit.value = false;
      }
    };

    const handleLimitExceeded = (limitStatusData: SubscriptionLimitStatusResponse) => {
      limitStatus.value = limitStatusData;
      showUpgradeModal.value = true;
    };

    async function getItems(agencyId: string, filterRequest: string, contract?: string, priceFrom?: number, priceTo?: number, category?: string, typology?: string, town?: string[]) {
      loading.value = true;
      tableData.value = [];

      // Converti undefined in 0 per il backend
      const validPriceFrom = priceFrom !== undefined ? priceFrom : 0;
      const validPriceTo = priceTo !== undefined ? priceTo : 0;

      const results = await getRealEstatePropertiesList(agencyId, filterRequest, contract, validPriceFrom, validPriceTo, category, typology, town);
      rawItems.value = results || [];
      initItems.value.splice(0, rawItems.value.length, ...rawItems.value);
      
      // Applica i filtri frontend
      applyFilters();
      
      loading.value = false;
    };

    // Funzione helper per verificare se l'incarico è scaduto
    const isAssignmentExpired = (item: RequestTabelData): boolean => {
      if (!item.AssignmentEnd || item.AssignmentEnd === '0001-01-01T00:00:00' || item.AssignmentEnd === '') {
        return false; // Senza scadenza = sempre valido
      }
      const assignmentEnd = new Date(item.AssignmentEnd);
      const now = new Date();
      return assignmentEnd < now;
    };

    // Funzione helper per verificare se l'incarico sta per scadere (entro 30 giorni)
    const isAssignmentExpiringSoon = (item: RequestTabelData): boolean => {
      if (!item.AssignmentEnd || item.AssignmentEnd === '0001-01-01T00:00:00' || item.AssignmentEnd === '') {
        return false; // Senza scadenza = non in scadenza
      }
      const assignmentEnd = new Date(item.AssignmentEnd);
      const now = new Date();
      const daysUntilExpiry = Math.ceil((assignmentEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntilExpiry > 0 && daysUntilExpiry <= 30;
    };

    const applyFilters = () => {
      let items = [...rawItems.value];

      // Applica il filtro proprietario selezionato
      if (ownerFilter.value) {
        // Per tutti i ruoli: filtra per UserId
        // - "I miei immobili": item.UserId === user.Id
        // - "Immobili dell'agency" (solo Agent): item.UserId === user.AdminId (l'agency ha creato l'immobile, quindi UserId = agency.Id)
        // - Per Admin/Agency: item.UserId === ownerFilter.value (ID dell'agenzia/agente selezionato)
        items = items.filter((item) => {
          // Assicurati che entrambi i valori siano stringhe per il confronto
          const itemUserId = String(item.UserId || '');
          const filterValue = String(ownerFilter.value || '');
          return itemUserId === filterValue;
        });
      }
      // Se ownerFilter è vuoto, mostra tutti gli immobili della cerchia (già filtrati dal backend)

      // Applica il filtro stato incarico
      if (assignmentStatusFilter.value) {
        if (assignmentStatusFilter.value === 'valid') {
          items = items.filter((item) => !isAssignmentExpired(item));
        } else if (assignmentStatusFilter.value === 'expired') {
          items = items.filter((item) => isAssignmentExpired(item));
        }
      }

      tableData.value = items;
      MenuComponent.reinitialization();
    };

    const deleteFewItems = async () => {
      loading.value = true;
      selectedIds.value.forEach(async (item) => {
        await deleteRealEstateProperty(item)
      });
      selectedIds.value.length = 0;
      await getItems(agencyId.value, search.value, contract.value, fromPrice.value, toPrice.value, category.value, typology.value, getLocationFilter());
      loading.value = false;
    };

    

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
      // Prepara i parametri di località per il filtro
      let locationFilter: string[] = [];
      if (selectedLocation.value) {
        locationFilter = [selectedLocation.value];
      } else if (selectedCity.value) {
        locationFilter = [selectedCity.value];
      } else if (selectedProvince.value) {
        locationFilter = [selectedProvince.value];
      }

      await getItems(agencyId.value, search.value, contract.value, fromPrice.value, toPrice.value, category.value, typology.value, locationFilter);
    };


    async function deleteItem(id: Number) {
      const result = await Swal.fire({
        title: "Elimina immobile",
        html: "Stai per eliminare definitivamente questo immobile e tutti i dati collegati ad esso. L'operazione è irreversibile e potresti perdere irrimediabilmente i dati associati.",
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
        loading.value = true;
        await deleteRealEstateProperty(id);
        await getItems(agencyId.value, search.value, contract.value, fromPrice.value, toPrice.value, category.value, typology.value, getLocationFilter());
        MenuComponent.reinitialization();
        
        Swal.fire({
          text: "Immobile eliminato con successo",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          heightAuto: false,
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
      } catch (error: any) {
        const errorMessage = error?.data?.Message || error?.response?.data?.Message || authStore.errors || "Si è verificato un errore durante l'eliminazione dell'immobile.";
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
      } finally {
        loading.value = false;
      }
    }

    const sort = (sort: Sort) => {
      const reverse: boolean = sort.order === "asc";
      if (sort.label) {
        // Gestione speciale per AssignmentEnd
        if (sort.label === "AssignmentEnd") {
          tableData.value.sort((a, b) => {
            const dateA = a.AssignmentEnd && a.AssignmentEnd !== '0001-01-01T00:00:00' && a.AssignmentEnd !== '' 
              ? new Date(a.AssignmentEnd).getTime() 
              : Number.MAX_SAFE_INTEGER; // Senza scadenza = sempre in fondo
            const dateB = b.AssignmentEnd && b.AssignmentEnd !== '0001-01-01T00:00:00' && b.AssignmentEnd !== '' 
              ? new Date(b.AssignmentEnd).getTime() 
              : Number.MAX_SAFE_INTEGER;
            return reverse ? dateA - dateB : dateB - dateA;
          });
        } else if (sort.label === "AssignmentStatus") {
          // Ordina per stato: scaduti prima, poi in scadenza, poi validi
          tableData.value.sort((a, b) => {
            const expiredA = isAssignmentExpired(a) ? 0 : (isAssignmentExpiringSoon(a) ? 1 : 2);
            const expiredB = isAssignmentExpired(b) ? 0 : (isAssignmentExpiringSoon(b) ? 1 : 2);
            return reverse ? expiredA - expiredB : expiredB - expiredA;
          });
        } else {
          arraySort(tableData.value, sort.label, { reverse });
        }
      }
    };

    const onItemSelect = (selectedItems: Array<number>) => {
      selectedIds.value = selectedItems;
    };

    // Funzione per preparare il filtro location basato sui filtri selezionati
    const getLocationFilter = (): string[] => {
      if (selectedLocation.value) {
        return [selectedLocation.value];
      } else if (selectedCity.value) {
        return [selectedCity.value];
      } else if (selectedProvince.value) {
        return [selectedProvince.value];
      }
      return [];
    };

    // Funzione per navigare ai dettagli della proprietà
    const goToPropertyDetails = (id: number, item?: RequestTabelData) => {
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
          const route = router.resolve({ name: 'property', params: { id: id.toString() } });
          window.open(route.href, '_blank');
          return;
        }
      }
      // Default: naviga normalmente (per retrocompatibilità)
      const route = router.resolve({ name: 'property', params: { id: id.toString() } });
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
        Modal.getInstance(modalElement)?.hide();
      }
    };

    const resetExportFilters = () => {
      exportFilters.value = {
        ...buildDefaultExportFilters(),
      };
    };

    const handleExportProperties = async (payload: PropertyExportPayload) => {
      exportLoading.value = true;
      try {
        const response = await exportProperties(payload);
        const fallbackName = payload.format === "csv" ? "immobili.csv" : "immobili.xlsx";
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
        let message = "Errore durante l'esportazione degli immobili.";
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
        structuredLocationData.value.provinces = provinceNames.map((name) => ({
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

    // Funzione per pulire tutti i filtri
    const clearAllFilters = () => {
      search.value = "";
      fromPrice.value = undefined;
      toPrice.value = undefined;
      contract.value = "";
      typology.value = "";
      selectedProvince.value = "";
      selectedCity.value = "";
      selectedLocation.value = "";
      filteredCities.value = [];
      ownerFilter.value = "";
      assignmentStatusFilter.value = "";
      searchItems();
    };

    onMounted(async () => {
      // if (authStore.user.Role == "Admin") {
        agencyId.value = authStore.user.AdminId;
        // Chiama getSearchItems come in Clients.vue (senza agencyId per vedere tutti gli agenti)
        if (user.Role !== "Agent") {
          defaultSearchItems.value = await getSearchItems(authStore.user.Id);
        }
      // }

      // Carica i dati strutturati per i filtri
      await loadStructuredData();

      await getItems(agencyId.value, search.value, contract.value, fromPrice.value, toPrice.value, category.value, typology.value, getLocationFilter());
    });

    // Funzione per formattare i numeri con separatore delle migliaia e 2 decimali
    const formatNumber = (value: number | undefined | null): string => {
      if (value === undefined || value === null || isNaN(value)) {
        return '0,00';
      }
      return value.toLocaleString('it-IT', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    };

          return {
        tableData,
        tableHeader,
        deleteItem,
        search,
        searchItems,
        contract,
        fromPrice,
        category,
        toPrice,
        selectedIds,
        deleteFewItems,
        sort,
        onItemSelect,
        getAssetPath,
        getItems,
        loading,
        user,
        agencyId,
        defaultSearchItems,
        typology,
        getLocationFilter,
        selectedProvince,
        selectedCity,
        selectedLocation,
        structuredLocationData,
        filteredCities,
        onProvinceChange,
        onCityChange,
        clearAllFilters,
        handleNewPropertyClick,
        handleLimitExceeded,
        isCheckingLimit,
        showUpgradeModal,
        limitStatus,
        goToPropertyDetails,
        infoPopupRef,
        selectedOwnerInfo,
        AccessLevel,
        getOwnerTooltip,
        exportModalId,
        exportFilters,
        propertyExportFields,
        exportLoading,
        openExportModal,
        handleExportProperties,
        ownerFilter,
        applyFilters,
        formatNumber,
        assignmentStatusFilter,
        isAssignmentExpired,
        isAssignmentExpiringSoon
      };
  },
  data() {
    return {
    };
  },


});
</script>

<!-- Stili comuni gestiti da lists-common.css -->