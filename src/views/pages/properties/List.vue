<template>
  <div class="properties-page-wrapper">
    <div class="card shadow-sm" style="border-radius: 0.95rem; border: 1px solid #e9ecef;">
    <!--begin::Header-->
    <div class="card-header border-0 pt-6 pb-4" style="background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%); border-radius: 0.95rem 0.95rem 0 0;">
      <div class="card-title">
        <div class="d-flex align-items-center">
          <div class="symbol symbol-45px me-3">
            <span class="symbol-label" style="background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%); box-shadow: 0 4px 12px rgba(54, 153, 255, 0.3);">
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
      <div class="card-toolbar">
        <button
          type="button"
          class="btn btn-sm btn-primary"
          @click="handleNewPropertyClick"
          :disabled="isCheckingLimit"
          style="background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%); border: none; border-radius: 0.75rem; padding: 0.75rem 1.5rem; box-shadow: 0 4px 12px rgba(54, 153, 255, 0.25);"
        >
          <span v-if="!isCheckingLimit">
          <i class="ki-duotone ki-plus fs-3 me-2">
            <span class="path1"></span>
            <span class="path2"></span>
          </i>
          <span class="fw-bold">Nuovo Immobile</span>
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
      <!-- Barra di ricerca moderna -->
      <div class="search-section" style="margin-top: 2rem; margin-bottom: 2.5rem;">
        <div class="d-flex align-items-center gap-3 flex-wrap">
          <!-- Search Input principale -->
          <div class="flex-grow-1" style="min-width: 300px; max-width: 550px;">
            <div class="search-wrapper">
              <i class="ki-duotone ki-magnifier fs-3 search-icon">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
            <input 
              type="text" 
              v-model="search" 
              @keyup.enter="searchItems"
                class="form-control search-input" 
                placeholder="Cerca per indirizzo, città, provincia..." 
              />
              <button 
                v-if="search"
                @click="search = ''" 
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
              :disabled="loading"
            >
              <span v-if="!loading">
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
        
          <!-- Filtro Contratto -->
          <div class="flex-shrink-0">
            <div class="filter-wrapper position-relative">
              <i class="ki-duotone ki-briefcase filter-icon position-absolute">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              <select class="form-select form-select-modern filter-select" v-model="contract" style="min-width: 200px;">
                <option value="">📋 Tutti i contratti</option>
                <option value="Vendita">💰 Vendita</option>
                <option value="Affitto">🏠 Affitto</option>
                <option value="Aste">🔨 Aste</option>
          </select>
            </div>
        </div>
        
          <!-- Filtro Tipologia -->
          <div class="flex-shrink-0">
            <div class="filter-wrapper position-relative">
              <i class="ki-duotone ki-category filter-icon position-absolute">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              <select class="form-select form-select-modern filter-select" v-model="typology" style="min-width: 220px;">
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
      </div>

          <!-- Badge Risultati -->
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
                <span class="results-label">Immobili</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
        <!-- Filtri avanzati compatti -->
        <div class="d-flex align-items-center gap-2 flex-wrap mt-3">
          <!-- Filtro Prezzo Da -->
          <div class="filter-compact">
            <input 
              type="number" 
              v-model="fromPrice" 
              class="form-control form-control-compact" 
              placeholder="€ Prezzo da" 
              min="0"
            />
        </div>
        
          <!-- Filtro Prezzo A -->
          <div class="filter-compact">
            <input 
              type="number" 
              v-model="toPrice" 
              class="form-control form-control-compact" 
              placeholder="€ Prezzo a" 
              min="0"
            />
        </div>

          <!-- Filtro Provincia -->
          <div class="filter-compact">
          <select 
              class="form-select form-select-compact" 
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
          <div class="filter-compact">
          <select 
              class="form-select form-select-compact" 
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
        
          <!-- Filtro Località (input di testo perché sono stringhe libere nel database) -->
          <div class="filter-compact">
            <input 
              type="text" 
              v-model="selectedLocation" 
              class="form-control form-control-compact" 
              placeholder="📍 Località" 
              :disabled="!selectedCity"
            />
          </div>

          <!-- Filtro Agenzia -->
          <div v-if="user.Role == 'Admin'" class="filter-compact">
            <select class="form-select form-select-compact" v-model="agencyId">
              <option value="">🏢 Tutte le agenzie</option>
            <option v-for="(item, index) in defaultSearchItems.Agencies" :key="index" :value="item.Id">
              {{ item.FirstName }} {{ item.LastName }}
            </option>
          </select>
      </div>

          <!-- Bottone Pulisci Filtri -->
          <div class="filter-compact">
            <button 
              type="button" 
              @click="clearAllFilters" 
              class="btn btn-secondary btn-clear-filters"
            >
              <i class="ki-duotone ki-cross fs-5 me-1">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              <span class="fw-bold">Pulisci</span>
            </button>
          </div>
            </div>
            
      <!-- Separatore morbido -->
      <div class="separator separator-dashed my-6"></div>
          </div>
    <!--end::Card body-->
    <div class="card-body pt-0">
      <Datatable @on-sort="sort" @on-items-select="onItemSelect" :data="tableData" :header="tableHeader"
        :enable-items-per-page-dropdown="true" :checkbox-enabled="true" checkbox-label="Id" :loading="loading">
        <template v-slot:Id="{ row: item }">
          {{ item.Id }}
        </template>
        <template v-slot:CreationDate="{ row: item }">
          {{ item.CreationDate.substring(0, 10).split('-').reverse().join('-') }}<br />
          {{ item.AssignmentEnd.substring(0, 10).split('-').reverse().join('-') }}
        </template>
        <template v-slot:CommercialSurfaceate="{ row: item }">
          {{ item.CommercialSurfaceate }}
        </template>
        <template v-slot:AddressLine="{ row: item }">
          {{ item.AddressLine }} <br />
          {{ item.Town }} <br />
          {{ item.Province }}
        </template>
        <template v-slot:Price="{ row: item }">
          <template v-if="item.Price === -1">
            <span>Trattativa riservata</span>
          </template>
          <template v-else>
            € {{ item.Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }}
          </template>
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
              <span class="btn-icon">
                <i class="ki-duotone ki-eye fs-3">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                </i>
              </span>
              <span class="btn-label">Dettagli</span>
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

  <ExportCustomerModal></ExportCustomerModal>
  <AddPropertyModal 
    @formAddSubmitted="getItems(agencyId, '')" 
    @redirectToEdit="redirectToEdit"
    @limitExceeded="handleLimitExceeded"
  ></AddPropertyModal>

  <!-- Modale Upgrade Required -->
  <UpgradeRequiredModal
    :isOpen="showUpgradeModal"
    :featureDisplayName="'Immobili'"
    :limitStatus="limitStatus"
    @close="showUpgradeModal = false"
  />
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import ExportCustomerModal from "@/components/modals/forms/ExportCustomerModal.vue";
import AddPropertyModal from "@/components/modals/forms/AddPropertyModal.vue";
import { getRealEstatePropertiesList, deleteRealEstateProperty, RequestTabelData, getSearchItems, SearchModel } from "@/core/data/properties";
import arraySort from "array-sort";
import { MenuComponent } from "@/assets/ts/components";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useAuthStore } from "@/stores/auth";
import UpgradeRequiredModal from "@/components/modals/UpgradeRequiredModal.vue";
import { checkFeatureLimit, type SubscriptionLimitStatusResponse } from "@/core/data/subscription-limits";
import { Modal } from "bootstrap";
import { getAllProvinceNames, getCitiesByProvince } from "@/core/data/italian-geographic-data-loader";

export default defineComponent({
  name: "properties",
  components: {
    Datatable,
    ExportCustomerModal,
    AddPropertyModal,
    UpgradeRequiredModal,
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const tableHeader = ref([
      {
        columnName: "Codice",
        columnLabel: "Id",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "Ins. / Inc.",
        columnLabel: "CreationDate",
        sortEnabled: true,
        columnWidth: 120,
      },
      {
        columnName: "Mq",
        columnLabel: "CommercialSurfaceate",
        sortEnabled: true,
        columnWidth: 80,
      },
      {
        columnName: "Indirizzo",
        columnLabel: "AddressLine",
        sortEnabled: true,
        columnWidth: 200,
      },
      {
        columnName: "Prezzo",
        columnLabel: "Price",
        sortEnabled: true,
        columnWidth: 150,
      },
      {
        columnName: "Immagine",
        columnLabel: "Photos",
        sortEnabled: false,
        columnWidth: 150,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 135,
      },
    ]);
    const selectedIds = ref<Array<Number>>([]);
    const loading = ref<boolean>(true);
    const tableData = ref<Array<RequestTabelData>>([]);
    const initItems = ref([]);
    const user = authStore.user;
    let agencyId = ref("");
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

    // Subscription limits state
    const isCheckingLimit = ref(false);
    const showUpgradeModal = ref(false);
    const limitStatus = ref<SubscriptionLimitStatusResponse | null>(null);

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
      tableData.value = results || [];
      initItems.value.splice(0, tableData.value.length, ...tableData.value);
      loading.value = false;
    };

    onMounted(async () => {
      // if (authStore.user.Role == "Admin") {
        defaultSearchItems.value = await getSearchItems(authStore.user.Id);
      // }
      agencyId.value = authStore.user.AdminId;

      await getItems(agencyId.value, search.value, contract.value, fromPrice.value, toPrice.value, category.value, typology.value, getLocationFilter());
    });



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

      MenuComponent.reinitialization();
    };


    async function deleteItem(id: Number) {
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
        await deleteRealEstateProperty(id)
        await getItems(agencyId.value, search.value, contract.value, fromPrice.value, toPrice.value, category.value, typology.value, getLocationFilter());
        loading.value = false;
        MenuComponent.reinitialization();
      });
      loading.value = false;
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
    };

    onMounted(async () => {
      // if (authStore.user.Role == "Admin") {
        defaultSearchItems.value = await getSearchItems(authStore.user.Id);
      // }
      agencyId.value = authStore.user.AdminId;

      // Carica i dati strutturati per i filtri
      await loadStructuredData();

      await getItems(agencyId.value, search.value, contract.value, fromPrice.value, toPrice.value, category.value, typology.value, getLocationFilter());
    });

    const redirectToEdit = (propertyId: number) => {
      router.push({ name: "update-property", params: { id: propertyId } });
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
        redirectToEdit,
        handleNewPropertyClick,
        handleLimitExceeded,
        isCheckingLimit,
        showUpgradeModal,
        limitStatus
      };
  },
  data() {
    return {
    };
  },


});
</script>

<style scoped>
/* Sfondo univoco della pagina */
.properties-page-wrapper {
  background: linear-gradient(135deg, #fafbfc 0%, #f8f9fa 100%);
  min-height: 100vh;
  padding: 2rem 0;
  position: relative;
}

.properties-page-wrapper::before {
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

.properties-page-wrapper > .card {
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

/* Search Bar Moderna */
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

.search-input:focus ~ .search-icon,
.search-input:hover ~ .search-icon {
  color: #3699ff;
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

/* Filtri Wrapper Moderni */
.filter-wrapper {
  position: relative;
}

.filter-icon {
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a1a5b7;
  z-index: 10;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.filter-select {
  padding-left: 3rem !important;
  background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%) !important;
  border: 1px solid #e8f4ff !important;
  font-weight: 500;
  color: #3f4254;
  box-shadow: 0 2px 8px rgba(54, 153, 255, 0.1);
  transition: all 0.3s ease;
  border-radius: 0.75rem !important;
}

.filter-select:focus {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%) !important;
  border-color: #3699ff !important;
  box-shadow: 0 0 0 0.2rem rgba(54, 153, 255, 0.15), 0 4px 12px rgba(54, 153, 255, 0.2) !important;
  transform: translateY(-1px);
}

.filter-select:hover {
  background: linear-gradient(135deg, #e8f4ff 0%, #f1f3ff 100%) !important;
  border-color: #3699ff !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(54, 153, 255, 0.15);
}

/* Filtri compatti */
.filter-compact {
  flex: 0 0 auto;
}

.form-select-compact,
.form-control-compact {
  background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%) !important;
  border: 1px solid #e8f4ff !important;
  border-radius: 0.65rem !important;
  padding: 0.65rem 1rem !important;
  font-size: 0.9rem;
  font-weight: 500;
  color: #3f4254;
  transition: all 0.3s ease;
  min-width: 160px;
}

.form-select-compact:hover,
.form-control-compact:hover {
  background: linear-gradient(135deg, #e8f4ff 0%, #f1f3ff 100%) !important;
  border-color: #3699ff !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(54, 153, 255, 0.15);
}

.form-select-compact:focus,
.form-control-compact:focus {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%) !important;
  border-color: #3699ff !important;
  box-shadow: 0 0 0 0.2rem rgba(54, 153, 255, 0.15), 0 4px 12px rgba(54, 153, 255, 0.2);
  outline: none;
}

.form-select-compact:disabled,
.form-control-compact:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-clear-filters {
  background: linear-gradient(135deg, #7e8299 0%, #5e6278 100%);
  border: none;
  border-radius: 0.65rem;
  padding: 0.65rem 1.25rem;
  color: #ffffff;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(126, 130, 153, 0.2);
  transition: all 0.3s ease;
}

.btn-clear-filters:hover {
  background: linear-gradient(135deg, #5e6278 0%, #464f60 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(126, 130, 153, 0.3);
  color: #ffffff;
}

/* Results Badge */
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

/* Bottone Cerca */
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

.btn-search:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none !important;
}

/* Stili per i pulsanti */
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

/* Animazioni per i filtri */
.form-label {
  transition: all 0.3s ease;
}

.form-label:hover {
  color: #3699ff !important;
}

/* Icone nei label */
.ki-duotone {
  transition: all 0.3s ease;
}

label:hover .ki-duotone {
  transform: scale(1.1);
}

/* Stili tabella uniformati */
:deep(table) {
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 0.5rem;
  overflow: hidden;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Header stile moderno */
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

/* Hover righe */
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

/* Badge stato */
.badge {
  padding: 0.35rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.badge:hover {
  transform: scale(1.05);
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

.badge-light-danger {
  background: linear-gradient(135deg, #ffe2e5 0%, #ffcdd2 100%);
  color: #f64e60;
  border: 1px solid #f64e60;
}

.badge-light-secondary {
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  color: #7e8299;
  border: 1px solid #7e8299;
}

.badge-light-primary {
  background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
  color: #8950fc;
  border: 1px solid #8950fc;
}

/* Link styling */
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

/* Spinner loading */
.spinner-border-sm {
  width: 1rem;
  height: 1rem;
  border-width: 0.15rem;
}

.btn-search-modern:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none !important;
}

/* Spaziatura coerente */
.card-body {
  padding: 1rem 1.5rem;
}

.mb-6 {
  margin-bottom: 1.5rem !important;
}

/* Responsive design */
@media (max-width: 768px) {
  .row.g-4 {
    margin: 0;
  }
  
  .col-md-2, .col-md-3, .col-md-4, .col-md-6 {
    margin-bottom: 1rem;
  }
  
  .d-flex.justify-content-between,
  .d-flex.align-items-center.gap-3 {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch !important;
  }
  
  .d-flex.justify-content-between > div {
    width: 100%;
    justify-content: center;
  }
  
  .search-wrapper {
    max-width: 100% !important;
  }
  
  .flex-shrink-0 {
    flex-shrink: 1 !important;
  }
  
  .filter-compact {
    flex: 1 1 100%;
  }
  
  .form-select-compact,
  .form-control-compact {
    min-width: 100%;
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