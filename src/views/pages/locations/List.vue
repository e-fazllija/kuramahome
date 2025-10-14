<template>
  <div class="card shadow-sm">
    <!-- Header moderno stile Dashboard -->
    <div class="card-header border-0 pt-6 pb-4" style="background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);">
      <div class="card-title">
        <div class="d-flex align-items-center">
          <div class="symbol symbol-45px me-3">
            <span class="symbol-label" style="background: linear-gradient(135deg, #1bc5bd 0%, #0bb7af 100%);">
              <i class="ki-duotone ki-geolocation fs-2 text-white">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
            </span>
          </div>
          <div>
            <h3 class="fw-bold m-0 text-gray-900 fs-3">Gestione Località</h3>
            <span class="text-muted fs-7 fw-semibold">Province, città e località del sistema</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab Navigation - Spostato in alto per migliore UX -->
    <div class="card-header border-0 pt-0">
      <ul class="nav nav-tabs nav-line-tabs nav-stretch border-transparent fs-5 fw-bold" role="tablist">
        <li class="nav-item" role="presentation">
          <button 
            type="button"
            class="nav-link border-0 bg-transparent" 
            :class="{ active: activeTab === 'provinces' }"
            @click="switchTab('provinces')"
          >
            <KTIcon icon-name="map" icon-class="fs-2 me-2" />
            Province
            <span class="badge badge-light-primary ms-2">{{ provinces.length }}</span>
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button 
            type="button"
            class="nav-link border-0 bg-transparent" 
            :class="{ active: activeTab === 'cities' }"
            @click="switchTab('cities')"
          >
            <KTIcon icon-name="building" icon-class="fs-2 me-2" />
            Città
            <span class="badge badge-light-success ms-2">{{ cities.length }}</span>
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button 
            type="button"
            class="nav-link border-0 bg-transparent" 
            :class="{ active: activeTab === 'locations' }"
            @click="switchTab('locations')"
          >
            <KTIcon icon-name="location" icon-class="fs-2 me-2" />
            Località
            <span class="badge badge-light-info ms-2">{{ locations.length }}</span>
          </button>
        </li>
      </ul>
    </div>

    <!-- Barra di ricerca moderna stile Agenzie -->
    <div class="card-body pt-0 pb-4">
      <div class="d-flex align-items-center gap-3 mb-4">
        <!-- Bottone Cerca -->
        <div class="flex-shrink-0">
          <button 
            @click="searchItems()" 
            class="btn btn-primary btn-search"
          >
            <i class="ki-duotone ki-magnifier fs-3 me-2">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            <span class="fw-bold">Cerca</span>
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
              placeholder="Cerca per nome..." 
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

        <!-- Filtri Province e Città -->
        <div class="flex-shrink-0">
          <select 
            class="form-select form-select-modern" 
            v-model="selectedProvince" 
            style="min-width: 180px;"
          >
            <option :value="0">Tutte le province</option>
            <option v-for="province in provinces" :key="province.Id" :value="province.Id">
              {{ province.Name }}
            </option>
          </select>
        </div>
        
        <div class="flex-shrink-0">
          <select 
            class="form-select form-select-modern" 
            v-model="selectedCity" 
            :disabled="!selectedProvince" 
            style="min-width: 160px;"
          >
            <option :value="0">Tutte le città</option>
            <option v-for="city in filteredCities" :key="city.Id" :value="city.Id">
              {{ city.Name }}
            </option>
          </select>
        </div>

        <!-- Bottone pulisci -->
        <div class="flex-shrink-0" v-if="hasActiveFilters">
          <button 
            @click="clearFilters()" 
            class="btn btn-light"
            style="border-radius: 1.2rem; padding: 0.75rem 1.25rem;"
          >
            <i class="ki-duotone ki-cross fs-4 me-2">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            <span class="fw-semibold">Pulisci</span>
          </button>
        </div>
        
        <!-- Spacer -->
        <div class="flex-grow-1"></div>
      </div>
    </div>

    <!-- Pulsanti di aggiunta moderni -->
    <div class="card-body pt-0 pb-3" v-if="canManageLocations">
      <div class="d-flex gap-2">
        <button
          type="button"
          class="btn btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_add_province"
          style="background: linear-gradient(135deg, #3699ff 0%, #0080ff 100%); color: white; border: none; border-radius: 8px; padding: 0.6rem 1.25rem;"
        >
          <i class="ki-duotone ki-plus fs-4 me-2">
            <span class="path1"></span>
            <span class="path2"></span>
          </i>
          <span class="fw-bold">Provincia</span>
        </button>
        <button
          type="button"
          class="btn btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_add_city"
          style="background: linear-gradient(135deg, #1bc5bd 0%, #0bb7af 100%); color: white; border: none; border-radius: 8px; padding: 0.6rem 1.25rem;"
        >
          <i class="ki-duotone ki-plus fs-4 me-2">
            <span class="path1"></span>
            <span class="path2"></span>
          </i>
          <span class="fw-bold">Città</span>
        </button>
        <button
          type="button"
          class="btn btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_add_location"
          style="background: linear-gradient(135deg, #ffa800 0%, #ff9500 100%); color: white; border: none; border-radius: 8px; padding: 0.6rem 1.25rem;"
        >
          <i class="ki-duotone ki-plus fs-4 me-2">
            <span class="path1"></span>
            <span class="path2"></span>
          </i>
          <span class="fw-bold">Località</span>
        </button>
      </div>
    </div>

    <!-- Contenuto delle tabelle con design migliorato -->
    <div class="card-body pt-0">
      <!-- Loading state -->
      <div v-if="loading" class="d-flex justify-content-center align-items-center py-10">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Caricamento...</span>
        </div>
        <span class="ms-3 text-muted">Caricamento dati...</span>
      </div>

      <!-- Tabella Province -->
      <div v-else-if="activeTab === 'provinces'" class="table-responsive">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h4 class="fw-bold text-dark mb-0">
            <KTIcon icon-name="map" icon-class="fs-2 text-primary me-2" />
            Elenco Province
          </h4>
          <span class="badge badge-light-primary fs-6">{{ provincesTableData.length }} province trovate</span>
        </div>
        <Datatable 
          @on-sort="sort" 
          @on-items-select="onItemSelect" 
          :data="provincesTableData" 
          :header="provincesTableHeader"
          :enable-items-per-page-dropdown="true" 
          :checkbox-enabled="false" 
          checkbox-label="Id"
          class="table-hover"
        >
          <template v-slot:Name="{ row: province }">
            <div class="d-flex align-items-center">
              <div class="symbol symbol-40px me-3">
                <div class="symbol-label bg-light-primary">
                  <KTIcon icon-name="map" icon-class="fs-2 text-primary" />
                </div>
              </div>
              <div>
                <span class="fw-bold text-dark">{{ province.Name }}</span>
              </div>
            </div>
          </template>
          <template v-slot:Actions="{ row: province }">
            <div class="d-flex gap-2 justify-content-center action-buttons">
              <button
                v-if="canManageLocations"
                @click="editProvince(province)"
                class="btn btn-action btn-action-info"
                title="Modifica"
              >
                <i class="ki-duotone ki-pencil fs-4">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </button>
              <button
                v-if="canManageLocations"
                @click="handleDeleteProvince(province)"
                class="btn btn-action btn-action-danger"
                title="Elimina"
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
        </Datatable>
      </div>

      <!-- Tabella Città -->
      <div v-else-if="activeTab === 'cities'" class="table-responsive">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h4 class="fw-bold text-dark mb-0">
            <KTIcon icon-name="building" icon-class="fs-2 text-success me-2" />
            Elenco Città
          </h4>
          <span class="badge badge-light-success fs-6">{{ citiesTableData.length }} città trovate</span>
        </div>
        <Datatable 
          @on-sort="sort" 
          @on-items-select="onItemSelect" 
          :data="citiesTableData" 
          :header="citiesTableHeader"
          :enable-items-per-page-dropdown="true" 
          :checkbox-enabled="false" 
          checkbox-label="Id"
          class="table-hover"
        >
          <template v-slot:Name="{ row: city }">
            <div class="d-flex align-items-center">
              <div class="symbol symbol-40px me-3">
                <div class="symbol-label bg-light-success">
                  <KTIcon icon-name="building" icon-class="fs-2 text-success" />
                </div>
              </div>
              <div>
                <span class="fw-bold text-dark">{{ city.Name }}</span>
              </div>
            </div>
          </template>
          <template v-slot:ProvinceName="{ row: city }">
            <span class="badge badge-light-primary">{{ city.ProvinceName }}</span>
          </template>
          <template v-slot:Actions="{ row: city }">
            <div class="d-flex gap-2 justify-content-center action-buttons">
              <button
                v-if="canManageLocations"
                @click="editCity(city)"
                class="btn btn-action btn-action-info"
                title="Modifica"
              >
                <i class="ki-duotone ki-pencil fs-4">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </button>
              <button
                v-if="canManageLocations"
                @click="handleDeleteCity(city)"
                class="btn btn-action btn-action-danger"
                title="Elimina"
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
        </Datatable>
      </div>

      <!-- Tabella Località -->
      <div v-else-if="activeTab === 'locations'" class="table-responsive">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h4 class="fw-bold text-dark mb-0">
            <KTIcon icon-name="location" icon-class="fs-2 text-info me-2" />
            Elenco Località
          </h4>
          <span class="badge badge-light-info fs-6">{{ locationsTableData.length }} località trovate</span>
        </div>
        <Datatable 
          @on-sort="sort" 
          @on-items-select="onItemSelect" 
          :data="locationsTableData" 
          :header="locationsTableHeader"
          :enable-items-per-page-dropdown="true" 
          :checkbox-enabled="false" 
          checkbox-label="Id"
          class="table-hover"
        >
          <template v-slot:Name="{ row: location }">
            <div class="d-flex align-items-center">
              <div class="symbol symbol-40px me-3">
                <div class="symbol-label bg-light-info">
                  <KTIcon icon-name="location" icon-class="fs-2 text-info" />
                </div>
              </div>
              <div>
                <span class="fw-bold text-dark">{{ location.Name }}</span>
              </div>
            </div>
          </template>
          <template v-slot:CityName="{ row: location }">
            <span class="badge badge-light-success">{{ location.CityName }}</span>
          </template>
          <template v-slot:ProvinceName="{ row: location }">
            <span class="badge badge-light-primary">{{ location.ProvinceName }}</span>
          </template>
          <template v-slot:CreationDate="{ row: location }">
            <span class="text-muted">{{ formatDate(location.CreationDate) }}</span>
          </template>
          <template v-slot:Actions="{ row: location }">
            <div class="d-flex gap-2 justify-content-center action-buttons">
              <button
                v-if="canManageLocations"
                @click="editLocation(location)"
                class="btn btn-action btn-action-info"
                title="Modifica"
              >
                <i class="ki-duotone ki-pencil fs-4">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </button>
              <button
                v-if="canManageLocations"
                @click="handleDeleteLocation(location)"
                class="btn btn-action btn-action-danger"
                title="Elimina"
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
        </Datatable>
      </div>

      <!-- Empty state -->
      <div v-if="!loading && getCurrentTableData.length === 0" class="text-center py-10">
        <div class="symbol symbol-100px mb-5">
          <div class="symbol-label bg-light">
            <KTIcon icon-name="search" icon-class="fs-2 text-muted" />
          </div>
        </div>
        <h4 class="fw-bold text-dark mb-2">Nessun risultato trovato</h4>
        <p class="text-muted">Prova a modificare i filtri di ricerca o aggiungi nuovi elementi.</p>
      </div>
    </div>
  </div>

  <!--begin::Add Province Modal-->
  <AddProvinceModal @province-added="onProvinceAdded" />
  <!--end::Add Province Modal-->

  <!--begin::Add City Modal-->
  <AddCityModal @city-added="onCityAdded" />
  <!--end::Add City Modal-->

  <!--begin::Add Location Modal-->
  <AddLocationModal @location-added="onLocationAdded" />
  <!--end::Add Location Modal-->

  <!--begin::Edit Location Modal-->
  <EditLocationModal 
    v-if="editingLocation" 
    :location="editingLocation" 
    @location-updated="onLocationUpdated"
    @modal-closed="editingLocation = null"
  />
  <!--end::Edit Location Modal-->

  <!--begin::Edit Province Modal-->
  <EditProvinceModal 
    v-if="editingProvince" 
    :province="editingProvince" 
    @province-updated="onProvinceUpdated"
    @modal-closed="editingProvince = null"
  />
  <!--end::Edit Province Modal-->

  <!--begin::Edit City Modal-->
  <EditCityModal 
    v-if="editingCity" 
    :city="editingCity" 
    @city-updated="onCityUpdated"
    @modal-closed="editingCity = null"
  />
  <!--end::Edit City Modal-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import { useAuthStore } from "@/stores/auth";
import { 
  getAllProvinces, 
  getAllCities, 
  getAllLocations, 
  deleteProvince, 
  deleteCity, 
  deleteLocation,
  type Province,
  type City,
  type Location
} from "@/core/data/locations";
import Swal from "sweetalert2/dist/sweetalert2.js";
import AddProvinceModal from "@/components/modals/forms/AddProvinceModal.vue";
import AddCityModal from "@/components/modals/forms/AddCityModal.vue";
import AddLocationModal from "@/components/modals/forms/AddLocationModal.vue";
import EditLocationModal from "@/components/modals/forms/EditLocationModal.vue";
import EditProvinceModal from "@/components/modals/forms/EditProvinceModal.vue";
import EditCityModal from "@/components/modals/forms/EditCityModal.vue";
import arraySort from "array-sort";
import { MenuComponent } from "@/assets/ts/components";

export default defineComponent({
  name: "locations",
  components: {
    Datatable,
    AddProvinceModal,
    AddCityModal,
    AddLocationModal,
    EditLocationModal,
    EditProvinceModal,
    EditCityModal,
  },
  setup() {
    const authStore = useAuthStore();
    const search = ref<string>("");
    const selectedProvince = ref<number>(0);
    const selectedCity = ref<number>(0);
    const activeTab = ref<string>("provinces");
    
    // Data
    const provinces = ref<Province[]>([]);
    const cities = ref<City[]>([]);
    const locations = ref<Location[]>([]);
    const editingLocation = ref<Location | null>(null);
    const editingProvince = ref<Province | null>(null);
    const editingCity = ref<City | null>(null);
    const loading = ref<boolean>(false);
    const selectedIds = ref<Array<number>>([]);

    // Table headers
    const provincesTableHeader = ref([
      {
        columnName: "Nome",
        columnLabel: "Name",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Azioni",
        columnLabel: "Actions",
        sortEnabled: false,
        columnWidth: 120,
      },
    ]);

    const citiesTableHeader = ref([
      {
        columnName: "Nome",
        columnLabel: "Name",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Provincia",
        columnLabel: "ProvinceName",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Azioni",
        columnLabel: "Actions",
        sortEnabled: false,
        columnWidth: 120,
      },
    ]);

    const locationsTableHeader = ref([
      {
        columnName: "Nome",
        columnLabel: "Name",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Città",
        columnLabel: "CityName",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Provincia",
        columnLabel: "ProvinceName",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Data Creazione",
        columnLabel: "CreationDate",
        sortEnabled: true,
        columnWidth: 150,
      },
      {
        columnName: "Azioni",
        columnLabel: "Actions",
        sortEnabled: false,
        columnWidth: 120,
      },
    ]);

    const canManageLocations = computed(() => {
      return authStore.user.Role === "Admin" || authStore.user.Role === "Agenzia";
    });

    // Computed properties for filtered data
    const filteredCities = computed(() => {
      if (selectedProvince.value) {
        return cities.value.filter(city => city.ProvinceId === selectedProvince.value);
      }
      return cities.value;
    });

    const provincesTableData = computed(() => {
      let data = provinces.value;
      if (search.value) {
        data = data.filter(province => 
          province.Name.toLowerCase().includes(search.value.toLowerCase())
        );
      }
      return data;
    });

    const citiesTableData = computed(() => {
      let data = cities.value;
      if (selectedProvince.value) {
        data = data.filter(city => city.ProvinceId === selectedProvince.value);
      }
      if (search.value) {
        data = data.filter(city => 
          city.Name.toLowerCase().includes(search.value.toLowerCase()) ||
          city.ProvinceName.toLowerCase().includes(search.value.toLowerCase())
        );
      }
      return data;
    });

    const locationsTableData = computed(() => {
      let data = locations.value;
      if (selectedProvince.value) {
        data = data.filter(location => location.ProvinceId === selectedProvince.value);
      }
      if (selectedCity.value) {
        data = data.filter(location => location.CityId === selectedCity.value);
      }
      if (search.value) {
        data = data.filter(location => 
          location.Name.toLowerCase().includes(search.value.toLowerCase()) ||
          location.CityName.toLowerCase().includes(search.value.toLowerCase()) ||
          location.ProvinceName.toLowerCase().includes(search.value.toLowerCase())
        );
      }
      return data;
    });

    // Computed per verificare se ci sono filtri attivi
    const hasActiveFilters = computed(() => {
      return search.value || selectedProvince.value || selectedCity.value;
    });

    // Computed per ottenere i dati della tabella corrente
    const getCurrentTableData = computed(() => {
      switch (activeTab.value) {
        case 'provinces':
          return provincesTableData.value;
        case 'cities':
          return citiesTableData.value;
        case 'locations':
          return locationsTableData.value;
        default:
          return [];
      }
    });

    // Methods
    const loadData = async () => {
      try {
        loading.value = true;
        const [provincesData, citiesData, locationsData] = await Promise.all([
          getAllProvinces(),
          getAllCities(),
          getAllLocations()
        ]);
        
        provinces.value = provincesData;
        cities.value = citiesData;
        locations.value = locationsData;
      } catch (error) {
        console.error("Errore nel caricamento dei dati:", error);
        Swal.fire({
          text: "Errore nel caricamento dei dati",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
      } finally {
        loading.value = false;
      }
    };

    const searchItems = async () => {
      await loadData();
      MenuComponent.reinitialization();
    };

    const clearFilters = () => {
      search.value = "";
      selectedProvince.value = 0;
      selectedCity.value = 0;
    };

    const switchTab = (tab: string) => {
      activeTab.value = tab;
    };

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('it-IT');
    };

    // Province methods
    const editProvince = (province: Province) => {
      editingProvince.value = { ...province };
    };

    const handleDeleteProvince = async (province: Province) => {
      if (!canManageLocations.value) {
        Swal.fire({
          text: "Non hai i permessi per eliminare le province",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
        return;
      }

      const result = await Swal.fire({
        text: `Sei sicuro di voler eliminare la provincia "${province.Name}"?`,
        icon: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Sì, elimina!",
        cancelButtonText: "Annulla",
        customClass: {
          confirmButton: "btn btn-danger",
          cancelButton: "btn btn-light",
        },
      });

      if (result.isConfirmed) {
        try {
          await deleteProvince(province.Id);
          await loadData();
          Swal.fire({
            text: "Provincia eliminata con successo!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok",
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        } catch (error) {
          console.error("Errore nell'eliminazione:", error);
          Swal.fire({
            text: "Errore nell'eliminazione della provincia",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok",
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        }
      }
    };

    // City methods
    const editCity = (city: City) => {
      editingCity.value = { ...city };
    };

    const handleDeleteCity = async (city: City) => {
      if (!canManageLocations.value) {
        Swal.fire({
          text: "Non hai i permessi per eliminare le città",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
        return;
      }

      const result = await Swal.fire({
        text: `Sei sicuro di voler eliminare la città "${city.Name}"?`,
        icon: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Sì, elimina!",
        cancelButtonText: "Annulla",
        customClass: {
          confirmButton: "btn btn-danger",
          cancelButton: "btn btn-light",
        },
      });

      if (result.isConfirmed) {
        try {
          await deleteCity(city.Id);
          await loadData();
          Swal.fire({
            text: "Città eliminata con successo!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok",
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        } catch (error) {
          console.error("Errore nell'eliminazione:", error);
          Swal.fire({
            text: "Errore nell'eliminazione della città",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok",
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        }
      }
    };

    // Location methods
    const editLocation = (location: Location) => {
      editingLocation.value = { ...location };
    };

    const handleDeleteLocation = async (location: Location) => {
      if (!canManageLocations.value) {
        Swal.fire({
          text: "Non hai i permessi per eliminare le località",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
        return;
      }

      const result = await Swal.fire({
        text: `Sei sicuro di voler eliminare la località "${location.Name}"?`,
        icon: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Sì, elimina!",
        cancelButtonText: "Annulla",
        customClass: {
          confirmButton: "btn btn-danger",
          cancelButton: "btn btn-light",
        },
      });

      if (result.isConfirmed) {
        try {
          await deleteLocation(location.Id);
          await loadData();
          Swal.fire({
            text: "Località eliminata con successo!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok",
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        } catch (error) {
          console.error("Errore nell'eliminazione:", error);
          Swal.fire({
            text: "Errore nell'eliminazione della località",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok",
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        }
      }
    };

    const sort = (sort: Sort) => {
      const reverse: boolean = sort.order === "asc";
      if (sort.label) {
        switch (activeTab.value) {
          case 'provinces':
            arraySort(provinces.value, sort.label, { reverse });
            break;
          case 'cities':
            arraySort(cities.value, sort.label, { reverse });
            break;
          case 'locations':
            arraySort(locations.value, sort.label, { reverse });
            break;
        }
      }
    };

    const onItemSelect = (selectedItems: Array<number>) => {
      selectedIds.value = selectedItems;
    };

    // Event handlers
    const onProvinceAdded = () => {
      loadData();
    };

    const onCityAdded = () => {
      loadData();
    };

    const onLocationAdded = () => {
      loadData();
    };

    const onLocationUpdated = () => {
      loadData();
      editingLocation.value = null;
    };

    const onProvinceUpdated = () => {
      loadData();
      editingProvince.value = null;
    };

    const onCityUpdated = () => {
      loadData();
      editingCity.value = null;
    };

    // Lifecycle
    onMounted(() => {
      loadData();
    });

    return {
      search,
      selectedProvince,
      selectedCity,
      activeTab,
      provinces,
      cities,
      locations,
      editingLocation,
      editingProvince,
      editingCity,
      loading,
      selectedIds,
      canManageLocations,
      provincesTableHeader,
      citiesTableHeader,
      locationsTableHeader,
      provincesTableData,
      citiesTableData,
      locationsTableData,
      filteredCities,
      hasActiveFilters,
      getCurrentTableData,
      searchItems,
      clearFilters,
      switchTab,
      formatDate,
      editProvince,
      handleDeleteProvince,
      editCity,
      handleDeleteCity,
      editLocation,
      handleDeleteLocation,
      sort,
      onItemSelect,
      onProvinceAdded,
      onCityAdded,
      onLocationAdded,
      onLocationUpdated,
      onProvinceUpdated,
      onCityUpdated,
    };
  },
  });
</script>

<style scoped>
/* Search Bar stile Agenzie */
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

/* Tabs moderni */
.nav-tabs .nav-link {
  border: none;
  border-bottom: 3px solid transparent;
  color: #7e8299;
  transition: all 0.3s ease;
  cursor: pointer;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  font-size: 0.875rem;
}

.nav-tabs .nav-link:hover {
  border-bottom-color: #b3e5fc;
  color: #0095e8;
}

.nav-tabs .nav-link.active {
  border-bottom-color: #0095e8;
  color: #0095e8;
}

/* Bottoni stile Agenzie */
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

.btn-action-danger {
  background-color: #ffe2e5;
  border: 1px solid #ffcdd2;
  color: #f64e60;
}

.btn-action-danger:hover {
  background-color: #ffcdd2;
  border-color: #f64e60;
  color: #d63447;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(246, 78, 96, 0.25);
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