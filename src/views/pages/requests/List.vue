<template>
  <div class="requests-page-wrapper">
    <div class="card shadow-sm">
    <!--begin::Header-->
    <div class="card-header border-0 pt-6 pb-4" style="background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);">
      <div class="card-title">
        <div class="d-flex align-items-center">
          <div class="symbol symbol-45px me-3">
            <span class="symbol-label" style="background: linear-gradient(135deg, #0095e8 0%, #00d4ff 100%);">
              <i class="ki-duotone ki-document fs-2 text-white">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
            </span>
      </div>
          <div>
            <h3 class="fw-bold m-0 text-gray-900 fs-3">Gestione Richieste</h3>
            <span class="text-muted fs-7 fw-semibold">Amministrazione e ricerca richieste</span>
    </div>
        </div>
      </div>
      <div class="card-toolbar">
        <button
          type="button"
          class="btn btn-sm btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_add_request"
          style="background: linear-gradient(135deg, #0095e8 0%, #00d4ff 100%); border: none; border-radius: 8px; padding: 0.6rem 1.25rem;"
        >
          <i class="ki-duotone ki-plus fs-4 me-2">
            <span class="path1"></span>
            <span class="path2"></span>
          </i>
          <span class="fw-bold">Nuova Richiesta</span>
        </button>
      </div>
    </div>
    <!--end::Header-->
    
    <div class="card-body pt-0 pb-4">
      <!-- Barra di ricerca moderna stile Locations -->
      <div class="d-flex align-items-center gap-3 mb-4">
        <!-- Bottone Cerca -->
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
        
        <!-- Search Input -->
        <div class="flex-grow-1" style="max-width: 400px;">
          <div class="search-wrapper">
            <input 
              type="text" 
              v-model="search" 
              @keyup.enter="searchItems()"
              class="form-control search-input" 
              placeholder="Cerca per nome cliente..." 
            />
            <button 
              v-if="search"
              @click="search = ''" 
              class="btn btn-sm btn-clear"
            >
              <i class="ki-duotone ki-cross fs-5">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
            </button>
          </div>
        </div>

        <!-- Badge Risultati -->
        <div class="flex-shrink-0">
          <span class="badge badge-light-info fs-6">{{ tableData.length }} richieste trovate</span>
        </div>
        
        <!-- Spacer -->
        <div class="flex-grow-1"></div>
      </div>

        <!-- Filtri avanzati -->
        <div class="d-flex align-items-center gap-2 mb-3 flex-wrap">
          <!-- Filtro Contratto -->
          <div class="flex-shrink-0">
            <select 
              class="form-select form-select-modern" 
              v-model="contract" 
              style="min-width: 135px;"
            >
              <option value="">Tutti contratti</option>
              <option value="Vendita">Vendita</option>
              <option value="Affitto">Affitto</option>
            </select>
          </div>

          <!-- Filtro Prezzo Da -->
          <div class="flex-shrink-0">
            <input 
              type="number" 
              v-model="fromPrice" 
              class="form-control form-select-modern" 
              placeholder="€ Da" 
              min="0"
              style="min-width: 100px;"
            />
          </div>
        
          <!-- Filtro Prezzo A -->
          <div class="flex-shrink-0">
            <input 
              type="number" 
              v-model="toPrice" 
              class="form-control form-select-modern" 
              placeholder="€ A" 
              min="0"
              style="min-width: 100px;"
            />
          </div>

          <!-- Filtro Provincia -->
          <div class="flex-shrink-0">
            <select 
              class="form-select form-select-modern" 
              v-model="selectedProvince" 
              @change="onProvinceChange"
              style="min-width: 130px;"
            >
              <option value="">Province</option>
              <option v-for="province in structuredLocationData.provinces" :key="province.value" :value="province.value">
                {{ province.label }}
              </option>
            </select>
          </div>
        
          <!-- Filtro Città -->
          <div class="flex-shrink-0">
            <select 
              class="form-select form-select-modern" 
              v-model="selectedCity" 
              @change="onCityChange" 
              :disabled="!selectedProvince"
              style="min-width: 120px;"
            >
              <option value="">Città</option>
              <option v-for="city in filteredCities" :key="city.value" :value="city.value">
                {{ city.label }}
              </option>
            </select>
          </div>
        
          <!-- Filtro Località -->
          <div class="flex-shrink-0">
            <select 
              class="form-select form-select-modern" 
              v-model="selectedLocation" 
              :disabled="!selectedCity"
              style="min-width: 120px;"
            >
              <option value="">Località</option>
              <option v-for="location in filteredLocations" :key="location.value" :value="location.value">
                {{ location.label }}
              </option>
            </select>
          </div>

          <!-- Filtro Agenzia -->
          <div v-if="user.Role == 'Admin'" class="flex-shrink-0">
            <select 
              class="form-select form-select-modern" 
              v-model="agencyId" 
              style="min-width: 140px;"
            >
              <option value="">Agenzie</option>
              <option v-for="(item, index) in defaultSearchItems.Agencies" :key="index" :value="item.Id">
                {{ item.Name }} {{ item.LastName }}
              </option>
            </select>
          </div>

          <!-- Bottone Pulisci Filtri -->
          <div class="flex-shrink-0 ms-auto" v-if="hasActiveFilters">
            <button 
              @click="clearAllFilters" 
              class="btn btn-light btn-sm"
              style="border-radius: 0.75rem; padding: 0.6rem 1rem;"
            >
              <i class="ki-duotone ki-cross fs-5 me-1">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              <span class="fw-semibold">Pulisci</span>
            </button>
          </div>
        </div>
          
        <!-- Filtro Tipologia Immobile con multiselect -->
        <div v-if="propertyType.length > 0" class="mt-3">
          <div class="selected-tags">
            <span 
              v-for="(type, index) in propertyType" 
              :key="index" 
              class="badge badge-light-info me-2 mb-2"
            >
              {{ type }}
              <i @click="removePropertyType(index)" class="ki-duotone ki-cross fs-7 ms-1 cursor-pointer">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              </span>
          </div>
        </div>
            
      <!-- Separatore morbido -->
      <div class="separator separator-dashed my-6"></div>
      
      <!-- Filtro Tipologia Immobile expandibile -->
      <div class="mb-6">
        <div
          class="fw-bold fs-6 rotate collapsible p-3"
          data-bs-toggle="collapse"
          href="#kt_property_type_filters"
          role="button"
          aria-expanded="false"
          style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 0.75rem; border: 1px solid #dee2e6; cursor: pointer; transition: all 0.3s ease;"
        >
          <i class="ki-duotone ki-home-2 fs-3 me-3 text-primary">
            <span class="path1"></span>
            <span class="path2"></span>
          </i>
          Tipologia Immobile
          <span class="ms-2 rotate-180">
            <i class="ki-duotone ki-down fs-3">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
          </span>
          </div>
        
        <div id="kt_property_type_filters" class="collapse mt-3">
          <Multiselect 
            v-model="propertyType" 
            :options="optionsPropertyType" 
            mode="multiple" 
            placeholder="Seleziona tipologie immobile..."
            class="multiselect-modern"
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
    <!--end::Search-->
    <div class="card-body pt-0">
      <Datatable @on-sort="sort" @on-items-select="onItemSelect" :data="tableData" :header="tableHeader"
        :enable-items-per-page-dropdown="true" :checkbox-enabled="true" checkbox-label="Id" :loading="loading">
        <template v-slot:CustomerName="{ row: request }">
          <div class="d-flex align-items-center">
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
              <span class="fw-bold">{{ request.CustomerName }} {{ request.CustomerLastName }}</span>
            </div>
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
              <i class="ki-duotone ki-eye fs-4">
                <span class="path1"></span>
                <span class="path2"></span>
                <span class="path3"></span>
              </i>
              <span>Dettagli</span>
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

  <ExportCustomerModal></ExportCustomerModal>
  <AddRequestModal @formAddSubmitted="getItems(agencyId, '')"></AddRequestModal>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, watch, computed } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import ExportCustomerModal from "@/components/modals/forms/ExportCustomerModal.vue";
import AddRequestModal from "@/components/modals/forms/requests/AddRequestModal.vue";
import arraySort from "array-sort";
import { MenuComponent } from "@/assets/ts/components";
import { getRequestsList, Request, deleteRequest, RequestTabelData } from "@/core/data/requests";
import Swal from "sweetalert2";
import { useAuthStore } from "@/stores/auth";
import { getSearchItems, SearchModel } from "@/core/data/events";
import { getGroupedLocations, type LocationGroupedModel, getStructuredLocationData } from "@/core/data/locations";
import Multiselect from '@vueform/multiselect'

export default defineComponent({
  name: "requests",
  components: {
    Datatable,
    ExportCustomerModal,
    AddRequestModal,
    Multiselect
  },
  setup() {
    const authStore = useAuthStore();
    const tableHeader = ref([
      {
        columnName: "Cliente",
        columnLabel: "CustomerName",
        sortEnabled: true,
        columnWidth: 170,
      },
      {
        columnName: "Contratto",
        columnLabel: "Contract",
        sortEnabled: true,
        columnWidth: 110
      },
      {
        columnName: "Data Richiesta",
        columnLabel: "StringDate",
        sortEnabled: true,
        columnWidth: 150,
      },
      {
        columnName: "Email",
        columnLabel: "CustomerEmail",
        sortEnabled: true,
        columnWidth: 150,
      },
      {
        columnName: "Telefono",
        columnLabel: "CustomerPhone",
        sortEnabled: true,
        columnWidth: 160,
      },
      {
        columnName: "Prezzo Da",
        columnLabel: "PriceFrom",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "Prezzo A",
        columnLabel: "PriceTo",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "Stato",
        columnLabel: "Status",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "Azioni",
        columnLabel: "Actions",
        sortEnabled: false,
        columnWidth: 135,
      },
    ]);

    const selectedIds = ref<Array<number>>([]);
    let loading = ref<boolean>(true);
    const user = authStore.user;
    const tableData = ref<Array<RequestTabelData>>([]);
    const initItems = ref([]);
    let agencyId = ref("");
    const defaultSearchItems = ref<SearchModel>({
      Agencies: [],
      Agents: [],
    })
    const groupedLocations = ref<LocationGroupedModel[]>([]);

    // Nuovi dati strutturati per i filtri a tre livelli
    const structuredLocationData = ref<{
      provinces: Array<{value: string, label: string, id: number}>,
      cities: Array<{value: string, label: string, provinceId: number, provinceName: string}>,
      locations: Array<{value: string, label: string, cityId: number, provinceId: number, cityName: string, provinceName: string}>
    }>({
      provinces: [],
      cities: [],
      locations: []
    });

    // Opzioni filtrate per città e località
    const filteredCities = ref<Array<{value: string, label: string}>>([]);
    const filteredLocations = ref<Array<{value: string, label: string}>>([]);

    // Opzioni delle località
    const options = ref<Array<{value: string, label: string}>>([{value: "", label: "Qualsiasi"}]);

    // Watch per aggiornare le opzioni quando groupedLocations cambia
    watch(groupedLocations, (newValue) => {
      if (newValue && Array.isArray(newValue) && newValue.length > 0) {
        const optionsArray = [{value: "", label: "Qualsiasi"}];
        
        newValue.forEach((cityGroup) => {
          // Add the city itself
          optionsArray.push({
            value: cityGroup.City.toUpperCase(),
            label: `${cityGroup.City.toUpperCase()}`
          });
          
          // Add all zones for this city
          if (cityGroup.Locations && Array.isArray(cityGroup.Locations)) {
            cityGroup.Locations.forEach(location => {
              optionsArray.push({
                value: location.Id.toUpperCase(),
                label: `${cityGroup.City.toUpperCase()} \\ ${location.Name.toUpperCase()}`
              });
            });
          }
        });
        
        options.value = optionsArray;
      }
    }, { immediate: true });

    async function getItems(agencyId, filterRequest: string) {
      loading.value = true;
      tableData.value = [];
      const results = await getRequestsList(agencyId, filterRequest);
      tableData.value = results || [];
      initItems.value.splice(0, tableData.value.length, ...tableData.value);
      loading.value = false;
    };

    onMounted(async () => {
      if (authStore.user.Role == "Admin") {
        defaultSearchItems.value = await getSearchItems(authStore.user.Id);
      }
      agencyId.value = "";

      // Carica le località dal database
      try {
        groupedLocations.value = await getGroupedLocations();
      } catch (error) {
        console.error("Errore nel caricamento delle località:", error);
        groupedLocations.value = [];
      }

      await getItems(agencyId.value, "");
    });



    const deleteFewItems = async () => {
      selectedIds.value.forEach(async (item) => {
        await deleteRequest(item)
      });
      selectedIds.value.length = 0;
      await getItems(agencyId.value, "");
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
      await getItems(agencyId.value, "");

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
        await deleteRequest(id)
        await getItems(agencyId.value, "");
        MenuComponent.reinitialization();
      });
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
        filteredLocations.value = [];
      }
    };

    const onCityChange = () => {
      selectedLocation.value = "";
      
      if (selectedCity.value) {
        // Filtra le località per la città selezionata
        filteredLocations.value = structuredLocationData.value.locations.filter(location => 
          location.cityName === selectedCity.value
        );
      } else {
        filteredLocations.value = [];
      }
    };

    // Carica i dati strutturati
    const loadStructuredData = async () => {
      try {
        structuredLocationData.value = await getStructuredLocationData();
      } catch (error) {
        console.error("Errore nel caricamento dei dati strutturati:", error);
      }
    };

    // Computed per verificare se ci sono filtri attivi
    const hasActiveFilters = computed(() => {
      return search.value || fromPrice.value || toPrice.value || contract.value || 
             propertyType.value.length > 0 || selectedProvince.value || 
             selectedCity.value || selectedLocation.value || agencyId.value;
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
      filteredLocations.value = [];
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

    onMounted(async () => {
      if (authStore.user.Role == "Admin") {
        defaultSearchItems.value = await getSearchItems(authStore.user.Id);
      }
      agencyId.value = "";

      // Carica i dati strutturati per i filtri
      await loadStructuredData();

      await getItems(agencyId.value, "");
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
        agencyId,
        defaultSearchItems,
        groupedLocations,
        options,
        removeLocation,
        removePropertyType,
        selectedProvince,
        selectedCity,
        selectedLocation,
        structuredLocationData,
        filteredCities,
        filteredLocations,
        onProvinceChange,
        onCityChange,
        hasActiveFilters,
        clearAllFilters,
        getContractClass,
        getStatusClass,
        getInitials,
        getCustomerColor,
        copyToClipboard
      };
  },
    data() {
    return {
  optionsPropertyType: [
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
  ]
    };
  },


});
</script>

<style scoped>
/* Search Bar stile Locations */
.search-wrapper {
  position: relative;
  width: 100%;
}

.search-input {
  background-color: #f4f6f9 !important;
  border: 1px solid #e4e6ef !important;
  border-radius: 1.2rem !important;
  padding: 0.75rem 3.5rem 0.75rem 1.25rem !important;
  font-weight: 500;
  color: #3f4254;
  transition: all 0.3s ease;
}

.search-input:focus {
  background-color: #ffffff !important;
  border-color: #0095e8 !important;
  box-shadow: 0 0 0 0.2rem rgba(0, 149, 232, 0.15);
}

.search-input::placeholder {
  color: #a1a5b7;
  font-weight: 400;
}

.btn-search {
  background: linear-gradient(135deg, #0095e8 0%, #00d4ff 100%);
  border: none;
  border-radius: 1.2rem;
  padding: 0.75rem 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 149, 232, 0.2);
  transition: all 0.3s ease;
}

.btn-search:hover {
  background: linear-gradient(135deg, #006db3 0%, #0095e8 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 149, 232, 0.35);
}

.btn-clear {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background-color: #f64e60;
  border: none;
  border-radius: 50%;
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

/* Form Select Moderno */
.form-select-modern,
.form-control.form-select-modern {
  background-color: #f4f6f9;
  border: 1px solid #e4e6ef;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  font-weight: 600;
  color: #3f4254;
  transition: all 0.3s ease;
}

.form-select-modern:focus,
.form-control.form-select-modern:focus {
  background-color: #ffffff;
  border-color: #0095e8;
  box-shadow: 0 0 0 0.2rem rgba(0, 149, 232, 0.15);
}

.form-select-modern:disabled,
.form-control.form-select-modern:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Badge moderni */
.badge-light-info {
  background-color: #e1f5fe;
  color: #0095e8;
  padding: 0.4rem 0.8rem;
  border-radius: 0.5rem;
  font-weight: 600;
}

.badge-light-success {
  background-color: #e8f8f5;
  color: #1bc5bd;
  padding: 0.4rem 0.8rem;
  border-radius: 0.5rem;
  font-weight: 600;
}

.badge-light-warning {
  background-color: #fff8e1;
  color: #ffa800;
  padding: 0.4rem 0.8rem;
  border-radius: 0.5rem;
  font-weight: 600;
}

.badge-light-danger {
  background-color: #ffe2e5;
  color: #f64e60;
  padding: 0.4rem 0.8rem;
  border-radius: 0.5rem;
  font-weight: 600;
}

.badge-light-secondary {
  background-color: #f4f6f9;
  color: #7e8299;
  padding: 0.4rem 0.8rem;
  border-radius: 0.5rem;
  font-weight: 600;
}

.badge-light-primary {
  background-color: #e1f0ff;
  color: #3699ff;
  padding: 0.4rem 0.8rem;
  border-radius: 0.5rem;
  font-weight: 600;
}

/* Selected tags */
.selected-tags .badge {
  padding: 0.5rem 0.85rem;
  cursor: pointer;
}

.selected-tags .cursor-pointer {
  cursor: pointer;
  transition: all 0.2s ease;
}

.selected-tags .cursor-pointer:hover {
  color: #f64e60 !important;
  transform: scale(1.2);
}

/* Bottoni stile Locations */
.btn {
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-sm {
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-weight: 600;
}

.btn-light {
  background-color: #f4f6f9;
  border: 1px solid #e4e6ef;
  color: #7e8299;
}

.btn-light:hover {
  background-color: #e4e6ef;
  border-color: #d1d3e0;
  color: #5e6278;
}

.btn-light-info {
  background-color: #e1f5fe;
  border: 1px solid #b3e5fc;
  color: #0095e8;
}

.btn-light-info:hover {
  background-color: #b3e5fc;
  border-color: #0095e8;
  color: #006db3;
  box-shadow: 0 4px 12px rgba(0, 149, 232, 0.25);
}

.btn-light-danger {
  background-color: #ffe2e5;
  border: 1px solid #ffcdd2;
  color: #f64e60;
}

.btn-light-danger:hover {
  background-color: #ffcdd2;
  border-color: #f64e60;
  color: #d63447;
  box-shadow: 0 4px 12px rgba(246, 78, 96, 0.25);
}

/* Tabella uniformata */
:deep(thead th) {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-bottom: 2px solid #e4e6ef;
  padding: 0.75rem 1rem;
  font-weight: 700;
  font-size: 0.7rem;
  color: #5e6278;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-align: center;
}

:deep(tbody td) {
  padding: 0.85rem 1rem;
  vertical-align: middle;
  border-bottom: 1px solid #f4f6f9;
  color: #3f4254;
  font-weight: 500;
  font-size: 0.875rem;
  text-align: center;
}

:deep(tbody tr) {
  transition: all 0.25s ease;
}

:deep(tbody tr:hover) {
  background-color: #f9fafb !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transform: translateX(2px);
}

/* Bottoni Azioni */
.action-buttons {
  gap: 0.5rem !important;
}

.btn-action {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  border: none;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-action-info {
  background-color: #e1f5fe;
  border: 1px solid #b3e5fc;
  color: #0095e8;
}

.btn-action-info:hover {
  background-color: #b3e5fc;
  border-color: #0095e8;
  color: #006db3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 149, 232, 0.25);
}

/* Collapsible section */
.collapsible:hover {
  background: linear-gradient(135deg, #e8f4ff 0%, #f1f3ff 100%) !important;
  border-color: #0095e8 !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 149, 232, 0.15);
}

.collapsible:hover .ki-duotone {
  transform: scale(1.1);
}

/* Multiselect moderno */
:deep(.multiselect-modern) {
  background-color: #f4f6f9;
  border: 1px solid #e4e6ef;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
}

:deep(.multiselect-modern:hover) {
  border-color: #0095e8;
  box-shadow: 0 4px 12px rgba(0, 149, 232, 0.15);
}

/* Spinner loading */
.spinner-border-sm {
  width: 1rem;
  height: 1rem;
  border-width: 0.15rem;
}

.btn-search:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none !important;
}

/* Link styling */
:deep(a) {
  color: #495057 !important;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
}

:deep(a:hover) {
  color: #0095e8 !important;
  font-weight: 600;
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
  transition: all 0.3s ease;
}

tbody tr:hover .symbol-label {
  transform: scale(1.05);
}

</style>
