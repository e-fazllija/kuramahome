<template>
  <!--begin::Basic info-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div class="card-header border-0">
      <!--begin::Card title-->
      <div class="card-title m-0">
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
            <h3 class="fw-bold m-0 text-gray-900 fs-3"> Aggiorna Cliente</h3>
            <span class="text-muted fs-7 fw-semibold">
              <span v-if="user.Role === 'Agent' && !canModifyCustomer">Visualizzazione in sola lettura</span>
              <span v-else>Modifica i dati del cliente</span>
            </span>
          </div>
        </div>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->
  </div>
  <KTSpinner v-if="loading" :centered="true" size="md" />
  <!--begin::Content-->
  <div v-else class="collapse show">
    <!--begin::Form-->
    <form @submit.prevent="submit()">
      <!--begin::Card body-->
      <div class="card-body border-top p-9" :class="{ 'opacity-50': !canModifyCustomer && user.Role === 'Agent' }">

         <!--begin::Input group - Proprietario (solo Admin)-->
         <div v-if="user?.Role === 'Admin'" class="row mb-6">
           <!--begin::Label-->
           <label class="col-lg-4 col-form-label fw-bold fs-6 text-gray-800">
             <i class="ki-duotone ki-user-tick fs-5 me-2 text-primary">
               <span class="path1"></span>
               <span class="path2"></span>
               <span class="path3"></span>
             </i>
             Proprietario *
           </label>
           <!--end::Label-->
           <!--begin::Col-->
           <div class="col-lg-8 fv-row">
             <select 
               v-model="formData.UserId"
               class="form-select form-select-lg"
               name="owner"
               required
             >
               <option value="">👤 Seleziona proprietario</option>
               <optgroup v-if="ownerSearchItems.Agencies.length" label="Agenzie">
                 <option v-for="agency in ownerSearchItems.Agencies" :key="agency.Id" :value="agency.Id">
                   🏢 {{ agency.CompanyName || `${agency.FirstName} ${agency.LastName}` }}
                 </option>
               </optgroup>
               <optgroup v-if="ownerSearchItems.Agents.length" label="Agenti">
                 <option v-for="agent in ownerSearchItems.Agents" :key="agent.Id" :value="agent.Id">
                   👤 {{ agent.FirstName }} {{ agent.LastName }}
                 </option>
               </optgroup>
             </select>
           </div>
           <!--end::Col-->
         </div>
         <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-bold fs-6 text-gray-800">
            <i class="ki-duotone ki-user fs-5 me-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
              <span class="path3"></span>
              <span class="path4"></span>
            </i>
            Nome
          </label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg" v-model="formData.FirstName" type="text" placeholder="Inserisci il nome" required :disabled="!canModifyCustomer && user.Role === 'Agent'" />
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-bold fs-6 text-gray-800">
            <i class="ki-duotone ki-user fs-5 me-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
              <span class="path3"></span>
              <span class="path4"></span>
            </i>
            Cognome
          </label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg" v-model="formData.LastName" type="text" placeholder="Inserisci il cognome" required :disabled="!canModifyCustomer && user.Role === 'Agent'" />
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-bold fs-6 text-gray-800">
            <i class="ki-duotone ki-sms fs-5 me-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            Email
          </label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg" v-model="formData.Email" type="email" placeholder="esempio@email.com" :disabled="!canModifyCustomer && user.Role === 'Agent'" />
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-bold fs-6 text-gray-800">
            <i class="ki-duotone ki-phone fs-5 me-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            Telefono
          </label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg" v-model="formData.Phone" type="tel" placeholder="3331234567" required :disabled="!canModifyCustomer && user.Role === 'Agent'" />
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Aquirente</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" v-model="formData.Buyer" :disabled="!canModifyCustomer && user.Role === 'Agent'" />
            </div>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Venditore</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" v-model="formData.Seller" :disabled="!canModifyCustomer && user.Role === 'Agent'" />
            </div>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Costruttore</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" v-model="formData.Builder" :disabled="!canModifyCustomer && user.Role === 'Agent'" />
            </div>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Altro</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" v-model="formData.Other" :disabled="!canModifyCustomer && user.Role === 'Agent'" />
            </div>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Cliente gold</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" v-model="formData.GoldCustomer" :disabled="!canModifyCustomer && user.Role === 'Agent'" />
            </div>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Acquisizione svolta</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" v-model="formData.AcquisitionDone" :disabled="!canModifyCustomer && user.Role === 'Agent'" />
            </div>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->
        
        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Incarico in corso</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" v-model="formData.OngoingAssignment" :disabled="!canModifyCustomer && user.Role === 'Agent'" />
            </div>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-bold fs-6 text-gray-800">
            <i class="ki-duotone ki-geolocation fs-5 me-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            Indirizzo
          </label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <input class="form-control form-control-lg" v-model="formData.Address" type="text" placeholder="Via, numero civico" :disabled="!canModifyCustomer && user.Role === 'Agent'" />
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-bold fs-6 text-gray-800">
            <i class="ki-duotone ki-map fs-5 me-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            Provincia
          </label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <select 
              v-model="formData.State"
              class="form-select form-select-lg"
              name="province"
              :disabled="!canModifyCustomer && user.Role === 'Agent'"
            >
              <option value="">🗺️ Seleziona provincia</option>
              <option v-for="(province, index) in provinces" :key="index" :value="province.Name">
                {{ province.Name }}
              </option>
            </select>
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-bold fs-6 text-gray-800">
            <i class="ki-duotone ki-geo fs-5 me-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            Comune
          </label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <select class="form-select form-select-lg" v-model="formData.City" :disabled="!canModifyCustomer && user.Role === 'Agent'">
              <option value="">🏙️ Seleziona comune</option>
              <option v-for="(city, index) in cities" :key="index" :value="city.Name">
                {{ city.Name }}
              </option>
            </select>
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-bold fs-6 text-gray-800">
            <i class="ki-duotone ki-notepad fs-5 me-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
              <span class="path3"></span>
              <span class="path4"></span>
              <span class="path5"></span>
            </i>
            Note
          </label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <textarea class="form-control form-control-lg" v-model="formData.Description" rows="3" placeholder="Inserisci eventuali note..." :disabled="!canModifyCustomer && user.Role === 'Agent'"></textarea>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-bold fs-6 text-gray-800">
            <i class="ki-duotone ki-notepad fs-5 me-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
              <span class="path3"></span>
              <span class="path4"></span>
              <span class="path5"></span>
            </i>
            Riepilogo Note
          </label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <div v-for="(note, index) in formData.CustomerNotes" :key="index" class="modern-note mb-3">
              <div class="note-content" v-html="note.Text"></div>
            </div>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

      </div>
      <!--begin::Actions-->
      <div class="d-flex justify-content-end py-6 px-9">
        <button 
          v-if="canModifyCustomer" 
          type="button" 
          @click="deleteItem()" 
          class="btn btn-modal-danger me-3"
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
        <!--begin::Button-->
        <button 
          :data-kt-indicator="loading ? 'on' : null" 
          class="btn btn-modal-primary" 
          type="submit" 
          :disabled="loading || !canModifyCustomer"
        >
          <span v-if="!loading" class="d-flex align-items-center">
            <span class="btn-icon">
              <i class="ki-duotone ki-check fs-3">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
            </span>
            <span class="btn-label">Salva Modifiche</span>
          </span>
          <span v-if="loading" class="d-flex align-items-center">
            <KTSpinner size="sm" :inline="true" />
            <span class="btn-label">Attendere...</span>
          </span>
        </button>
        <!--end::Button-->
      </div>
      <!--end::Actions-->
    </form>
    <!--end::Form-->
  </div>
  <!--end::Content-->

  <div v-if="!loading" class="card mb-5 mb-xl-10">
      <!--begin::Card header-->
      <div class="card-header border-0 pt-6 pb-4">
        <!--begin::Card title-->
        <div class="card-title m-0">
          <div class="d-flex align-items-center">
            <div class="symbol symbol-40px me-3">
              <span class="symbol-label">
                <i class="ki-duotone ki-document fs-2 text-white">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </span>
            </div>
            <div>
              <h3 class="fw-bold m-0 text-gray-900 fs-3">Richieste Cliente</h3>
              <span class="text-muted fs-7 fw-semibold">Elenco delle richieste associate</span>
            </div>
          </div>
        </div>
        <!--end::Card title-->
        
        <!--begin::Card toolbar-->
        <div class="card-toolbar">
          <div class="search-wrapper-simple">
            <i class="ki-duotone ki-magnifier fs-3 search-icon-simple">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            <input 
              type="text" 
              v-model="search" 
              @input="searchItems()"
              class="form-control search-input-simple" 
              placeholder="Cerca richiesta..." 
            />
          </div>
        </div>
        <!--end::Card toolbar-->
      </div>
      <!--end::Card header-->
      
      <!--begin::Card body-->
      <div class="card-body pt-5">
        <Datatable @on-sort="sort" @on-items-select="onItemSelect" :data="requests"
          :header="tableHeader" :enable-items-per-page-dropdown="true" :checkbox-enabled="false" checkbox-label="Id">
          <template v-slot:CustomerName="{ row: request }">
            <div class="d-flex align-items-center justify-content-center">
              <span class="fw-semibold">{{ request.CustomerName }} {{ request.CustomerLastName }}</span>
            </div>
          </template>
          <template v-slot:Contract="{ row: request }">
            <span class="badge badge-light-info">{{ request.Contract }}</span>
          </template>
          <template v-slot:CreationDate="{ row: request }">
            {{ request.CreationDate.substring(0, 10).split('-').reverse().join('-') }}
          </template>
          <template v-slot:CustomerEmail="{ row: request }">
            {{ request.CustomerEmail }}
          </template>
          <template v-slot:CustomerPhone="{ row: request }">
            {{ request.CustomerPhone }}
          </template>
          <template v-slot:Actions="{ row: request }">
            <div class="d-flex gap-2 justify-content-center action-buttons">
              <router-link 
                :to="{ name: 'request', params: { id: request.Id } }" 
                class="btn btn-action btn-action-info"
                title="Visualizza dettagli richiesta"
              >
                <span class="btn-icon">
                  <i class="ki-duotone ki-notepad-edit fs-4">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
                </span>
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
      <!--end::Card body-->
    </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, watch, computed } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { updateCustomer, Customer, getCustomer, deleteCustomer } from "@/core/data/customers";
import { Request, getCustomerRequests, RequestTabelData } from "@/core/data/requests";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import arraySort from "array-sort";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import KTSpinner from "@/components/Spinner.vue";
import { MenuComponent } from "@/assets/ts/components";
import { useProvinces } from "@/composables/useProvinces";
import { getCitiesByProvince, getProvinceCities } from "@/core/data/italian-geographic-data-loader";
import { getSearchItems, type SearchModel } from "@/core/data/events";

export default defineComponent({
  name: "update-customer",
  components: {Datatable, KTSpinner},
  setup() {
    const store = useAuthStore();
    const user = store.user;
    const route = useRoute();
    const router = useRouter();
    const id = parseInt(route.params.id.toString());
    const loading = ref<boolean>(true);
    const selectedIds = ref<Array<Number>>([]);
    const initItems = ref([]);
    
    // Usa il composable per le province
    const { provinces } = useProvinces();
    const cities = ref<Array<{Id: string, Name: string}>>([]);
    const ownerSearchItems = ref<SearchModel>({
      Agencies: [],
      Agents: []
    });
    const formData = ref<Customer>({
      Id: 0,
      Buyer: false,
      Seller: false,
      Builder: false,
      Other: false,
      GoldCustomer: false,
      FirstName: "",
      LastName: "",
      Email: "",
      Phone: 0,
      Description: "",
      Address: "",
      City: "",
      State: "",
      AcquisitionDone: false,
      OngoingAssignment: false,
      UserId: ""
    });
    const requests = ref<Array<RequestTabelData>>([]);

      const tableHeader = ref([
        {
          columnName: "Cliente",
          columnLabel: "CustomerName",
          sortEnabled: true,
          columnWidth: 175,
        },
        {
          columnName: "Contratto",
          columnLabel: "Contract",
          sortEnabled: true,
          columnWidth: 175,
        },
        {
          columnName: "Data Richiesta",
          columnLabel: "CreationDate",
          sortEnabled: true,
          columnWidth: 230,
        },
        {
          columnName: "Email",
          columnLabel: "CustomerEmail",
          sortEnabled: true,
          columnWidth: 175,
        },
        {
          columnName: "Telefono",
          columnLabel: "CustomerPhone",
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

    // Salva il UserId originale del cliente (non deve essere modificato)
    const originalUserId = ref<string>("");

    // Carica agenzie e agenti se l'utente è Admin
    const loadOwnerSearchItems = async () => {
      if (user?.Role === "Admin") {
        try {
          ownerSearchItems.value = await getSearchItems(user.Id);
        } catch (error) {
          console.error("Errore nel caricamento di agenzie e agenti:", error);
        }
      }
    };

    onMounted(async () => {
      loading.value = true;
      const customerData = await getCustomer(id);
      formData.value = customerData;

      // Preserva il UserId originale del cliente
      originalUserId.value = formData.value.UserId || "";

      // Carica agenzie e agenti se Admin
      if (user?.Role === "Admin") {
        await loadOwnerSearchItems();
      }

      // Carica i dati dal JSON se non sono già caricati
      await getProvinceCities();
      
      // Carica le città della provincia esistente
      if (formData.value.State) {
        const provinceCities = getCitiesByProvince(formData.value.State);
        cities.value = provinceCities.map(city => ({
          Id: city.Name,
          Name: city.Name
        }));
      }
      
      const results = await getCustomerRequests(id);
          for(const key in results){
            const item = {
              Id: results[key].Id,
              CustomerName: results[key].Customer.FirstName,
              CustomerLastName: results[key].Customer.LastName,
              CustomerEmail: results[key].Customer.Email,
              CustomerPhone: results[key].Customer.Phone.toString(),
              Contract: results[key].Contract,
              CreationDate: results[key].CreationDate,
              City: results[key].City,
              Locations: results[key].Location,
              PriceTo: results[key].PriceTo,
              PriceFrom: results[key].PriceFrom,
              PropertyType: results[key].PropertyType,
              Status: results[key].Archived == true ? "Archviviata" : results[key].Closed == true ? "Chiusa" : "Aperta"
            } as RequestTabelData;

            requests.value.push(item)
          }

      loading.value = false;
    })

    // Watcher per caricare le città quando si seleziona la provincia
    watch(
      () => formData.value.State,
      async (newProvince) => {
        if (newProvince) {
          // Assicurati che i dati siano caricati
          await getProvinceCities();
          // Carica le città della provincia selezionata
          const provinceCities = getCitiesByProvince(newProvince);
          cities.value = provinceCities.map(city => ({
            Id: city.Name,
            Name: city.Name
          }));
        } else {
          cities.value = [];
        }
      }
    );

    async function deleteItem() {
      const displayName = `${formData.value.FirstName ?? ""} ${formData.value.LastName ?? ""}`.trim() || formData.value.Email || `Cliente #${id}`;

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
        loading.value = true;
        await deleteCustomer(id);
        await router.push({ name: "clients" });
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
      } finally {
        loading.value = false;
      }
    }

    // Verifica se l'utente può modificare questo cliente
    const canModifyCustomer = computed(() => {
      // Gli Agent possono modificare solo i propri clienti
      if (user.Role === "Agent") {
        return originalUserId.value === user.Id;
      }
      // Admin e Agency possono modificare tutti i clienti della loro cerchia
      return true;
    });

    const submit = async () => {
      // Verifica permessi prima di inviare
      if (!canModifyCustomer.value) {
        Swal.fire({
          text: "Non hai i permessi per modificare questo cliente.",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          heightAuto: false,
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
        return;
      }

      loading.value = true;
      // Preserva il UserId originale - non sovrascriverlo
      formData.value.UserId = originalUserId.value;
      await updateCustomer(formData.value)
        .then(() => {
          loading.value = false;

          Swal.fire({
            text: "Il modulo è stato inviato con successo!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Continua!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-primary",
            },
          }).then(() => {
            // router.push({ name: 'clients' })
          });
        })
        .catch(({ response }) => {
          console.log(response);
          loading.value = false;
          Swal.fire({
            text: "Attenzione, si Ã¨ verificato un errore.",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Continua!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        });
    };

    const search = ref<string>("");
    const searchItems = () => {
      requests.value.splice(0, requests.value.length, ...initItems.value);
      if (search.value !== "") {
        let results: Array<RequestTabelData> = [];
        for (let j = 0; j < requests.value.length; j++) {
          if (searchingFunc(requests.value[j], search.value)) {
            results.push(requests.value[j]);
          }
        }
        requests.value.splice(0, requests.value.length, ...results);
      }
      MenuComponent.reinitialization();
    };

    const searchingFunc = (obj: any, value: string): boolean => {
      for (let key in obj) {
        if (
            !Number.isInteger(obj[key]) && 
            !(typeof obj[key] === "object") && 
            (typeof obj[key] === "string" || Array.isArray(obj[key]))
        ) {
            if (obj[key].indexOf(value) !== -1) {
                return true;
            }
        }
      }
      return false;
    };

    const sort = (sort: Sort) => {
      const reverse: boolean = sort.order === "asc";
      if (sort.label) {
        arraySort(requests.value, sort.label, { reverse });
      }
    };

    const onItemSelect = (selectedItems: Array<number>) => {
      selectedIds.value = selectedItems;
    };

    return {
      formData,
      submit,
      loading,
      getAssetPath,
      deleteItem,
      user,
      sort,
      tableHeader,
      onItemSelect,
      searchItems,
      search,
      requests,
      provinces,
      cities,
      canModifyCustomer,
      ownerSearchItems
    };
  },
});
</script>