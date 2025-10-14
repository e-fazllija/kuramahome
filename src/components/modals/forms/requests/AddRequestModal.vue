<template>
    <div
      class="modal fade"
      id="kt_modal_add_request"
      ref="addRequestModalRef"
      tabindex="-1"
    >
      <!--begin::Modal dialog-->
      <div class="modal-dialog modal-dialog-centered mw-650px">
        <!--begin::Modal content-->
        <div class="modal-content" style="border-radius: 0.95rem; border: 1px solid #e9ecef; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_request_header" style="background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%); border-radius: 0.95rem 0.95rem 0 0; border-bottom: 1px solid #e9ecef;">
          <!--begin::Modal title-->
          <div class="d-flex align-items-center">
            <div class="symbol symbol-40px me-3">
              <span class="symbol-label" style="background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%); box-shadow: 0 4px 12px rgba(54, 153, 255, 0.3);">
                <i class="ki-duotone ki-document fs-2 text-white">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </span>
            </div>
            <div>
              <h2 class="fw-bold m-0 text-gray-900 fs-3">📋 Aggiungi Richiesta</h2>
              <span class="text-muted fs-7 fw-semibold">Inserisci i dati della nuova richiesta</span>
            </div>
          </div>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_request_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
            style="border-radius: 0.5rem; background: rgba(255, 255, 255, 0.8); border: 1px solid #e9ecef;"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
          <div  v-if="loading" class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <!--begin::Form-->
          <el-form v-else
            @submit.prevent="submit()"
            :model="formData"
            :rules="rules"
            ref="formRef"
          >
            <!--begin::Modal body-->
            <div class="modal-body py-10 px-lg-17">
              <!--begin::Scroll-->
              <div
                class="scroll-y me-n7 pe-7"
                id="kt_modal_add_request_scroll"
                data-kt-scroll="true"
                data-kt-scroll-activate="{default: false, lg: true}"
                data-kt-scroll-max-height="auto"
                data-kt-scroll-dependencies="#kt_modal_add_request_header"
                data-kt-scroll-wrappers="#kt_modal_add_request_scroll"
                data-kt-scroll-offset="300px"
              >
                <!--begin::Input group-->
                <div class="fv-row mb-9">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-3 text-gray-800">
                  <i class="ki-duotone ki-profile-user fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                    <span class="path4"></span>
                    <span class="path5"></span>
                  </i>
                  <span class="required">Cliente</span>
                </label>
                <!--end::Label-->
                    <!--begin::Input-->
                    <Multiselect
                v-model="formData.CustomerId"
                :options="inserModel.Customers"
                label="label"
                valueProp="Id"
                :searchable="true"
                :close-on-select="true"
                :clear-on-select="false"
                placeholder="Seleziona il cliente"
                class="multiselect-modern"
              />
                    <!--end::Input-->
                </div>
                <!--end::Input group-->
                
                <!--begin::Input group-->
                <div class="d-flex flex-column mb-5 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-bold mb-3 text-gray-800">
                        <i class="ki-duotone ki-document fs-5 me-2 text-primary">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        <span class="required">Contratto:</span>
                    </label>
                    <!--end::Label-->
  
                  <!--begin::Input-->
                  <select class="form-select modern-select" v-model="formData.Contract">
                        <option value="Vendita">💰 Vendita</option>
                        <option value="Affitto">🏠 Affitto</option>
                    </select>
                    <!--end::Input-->
                </div>
                <!--end::Input group-->

                
               <!--begin::Input group-->
               <div class="d-flex flex-column mb-5 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-bold mb-3 text-gray-800">
                        <i class="ki-duotone ki-home-2 fs-5 me-2 text-primary">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        <span class="required">Tipologia Immobiliare:</span>
                        </label>
                    <!--end::Label-->
                    <!--begin::Input-->
                  <select class="form-select modern-select" multiple v-model="formData.PropertyType" style="height: auto;">
                       <option value="Appartamenti">🏢 Appartamenti</option>
                        <option value="AttivitaCommerciale">🏪 Attività Commerciale</option>
                        <option value="Box">🚗 Box</option>
                        <option value="CapannoniLocArtigianali">🏭 Capannoni, Loc. Artigianali</option>
                        <option value="CasaliRuderi">🏚️ Casali e Ruderi</option>
                        <option value="CaseSemindipendenti">🏘️ Case Semindipendenti</option>
                        <option value="LocaliCommerciali">🏬 Locali Commerciali</option>
                        <option value="NuoveCostruzioni">🏗️ Nuove Costruzioni</option>
                        <option value="Terreni">🌾 Terreni</option>
                        <option value="VilleCaseIndipendenti">🏰 Ville e Case Indipendenti</option>
                  </select>
                    <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
               <div class="d-flex flex-column mb-5 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-bold mb-3 text-gray-800">
                        <i class="ki-duotone ki-map fs-5 me-2 text-primary">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        <span class="required">Provincia</span>
                        </label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <select class="form-select modern-select" v-model="formData.Province">
                      <option value="">🗺️ Seleziona provincia</option>
                      <option v-for="(province, index) in provinces" :key="index" :value="province.Id">{{ province.Name }}</option>
                    </select>
                    <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
               <div class="d-flex flex-column mb-5 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-bold mb-3 text-gray-800">
                        <i class="ki-duotone ki-geolocation fs-5 me-2 text-primary">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        <span class="required">Comune</span>
                        </label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <select class="form-select modern-select" multiple aria-label="Multiple select example" v-model="formData.Town" required>
                        <option v-for="(city, index) in cities" :key="index" :value="city.Id">🏙️ {{ city.Name }} </option>
                    </select>
                    <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
               <div class="d-flex flex-column mb-5 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-bold mb-3 text-gray-800">
                        <i class="ki-duotone ki-position fs-5 me-2 text-primary">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        <span class="required">Località</span>
                        </label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <select class="form-select modern-select" multiple aria-label="Multiple select example" v-model="formData.Location">
                        <option v-for="(location, index) in locations" :key="index" :value="location.Id">📍 {{ location.Name }} </option>
                    </select>
                    <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-dollar fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span>Canone - Prezzo: Da</span>
                  </label>
                  <!--end::Label-->
  
                  <!--begin::Input-->
                  <el-form-item prop="PriceFrom">
                    <el-input v-model="formData.PriceFrom" 
                    type= "number" 
                    class="modern-input"
                    placeholder="Inserisci il prezzo minimo" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-dollar fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span>Canone - Prezzo: A</span>
                  </label>
                  <!--end::Label-->
  
                  <!--begin::Input-->
                  <el-form-item prop="PriceTo">
                    <el-input v-model="formData.PriceTo" 
                    type= "number" 
                    class="modern-input"
                    placeholder="Inserisci il prezzo massimo" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-semobold mb-2">
                    <span>Archiviata</span>
                  </label>
                  <!--end::Label-->
  
                    <!--begin::Input-->
                    <div class="form-check form-switch form-check-custom form-check-solid">
                        <input class="form-check-input" type="checkbox" value="" v-model="formData.Archived" />
                    </div>
                    <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-semobold mb-2">
                    <span>Evasa</span>
                  </label>
                  <!--end::Label-->
  
                    <!--begin::Input-->
                    <div class="form-check form-switch form-check-custom form-check-solid">
                        <input class="form-check-input" type="checkbox" value="" v-model="formData.Closed" />
                    </div>
                    <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-semobold mb-2">
                    <span>Consulenza mutuo richiesta</span>
                  </label>
                  <!--end::Label-->
  
                    <!--begin::Input-->
                    <div class="form-check form-switch form-check-custom form-check-solid">
                        <input class="form-check-input" type="checkbox" value="" v-model="formData.MortgageAdviceRequired" />
                    </div>
                    <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-home-2 fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span>Numero Locali</span>
                  </label>
                  <!--end::Label-->
  
                  <!--begin::Input-->
                  <el-form-item prop="RoomsNumber">
                    <el-input v-model="formData.RoomsNumber" 
                    type= "text" 
                    class="modern-input"
                    placeholder="Es: 3+1, 4+2, etc." />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                  <!--begin::Input group-->
                  <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-garden fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span>Giardino Da (mq)</span>
                  </label>
                  <!--end::Label-->
  
                  <!--begin::Input-->
                  <el-form-item prop="GardenFrom">
                    <el-input v-model="formData.GardenFrom" 
                    type= "number" 
                    class="modern-input"
                    placeholder="Metri quadrati minimi" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-garden fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span>Giardino A (mq)</span>
                  </label>
                  <!--end::Label-->
  
                  <!--begin::Input-->
                  <el-form-item prop="GardenTo">
                    <el-input v-model="formData.GardenTo" 
                    type= "number" 
                    class="modern-input"
                    placeholder="Metri quadrati massimi" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-home-2 fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span>MQ Da</span>
                  </label>
                  <!--end::Label-->
  
                  <!--begin::Input-->
                  <el-form-item prop="MQFrom">
                    <el-input v-model="formData.MQFrom" 
                    type= "number" 
                    class="modern-input"
                    placeholder="Metri quadrati minimi" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-home-2 fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span>MQ A</span>
                  </label>
                  <!--end::Label-->
  
                  <!--begin::Input-->
                  <el-form-item prop="MQTo">
                    <el-input v-model="formData.MQTo" 
                    type= "number" 
                    class="modern-input"
                    placeholder="Metri quadrati massimi" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-home-2 fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span>Stato dell'immobile</span>
                  </label>
                  <!--end::Label-->
                    <select class="form-select modern-select" v-model="formData.PropertyState">
                        <option value="">🏠 Seleziona Stato Immobile</option>
                        <option value="0">🔒 Affittato</option>
                        <option value="1">🏗️ In corso di costruzione</option>
                        <option value="2">✅ Libero</option>
                        <option value="3">📋 Libero al Rogito</option>
                        <option value="4">🏛️ Nuda Proprietà</option>
                        <option value="5">👥 Occupato</option>
                    </select>
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-fire fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span>Riscaldamento</span>
                  </label>
                  <!--end::Label-->
                    <select class="form-select modern-select" v-model="formData.Heating">
                        <option value="">🔥 Seleziona Il Tipo Di Riscaldamento</option>
                        <option value="Autonomo">🏠 Autonomo</option>
                        <option value="Centralizzato">🏢 Centralizzato</option>
                        <option value="Inesistente">❌ Inesistente</option>
                    </select>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                 <!--begin::Input group-->
                 <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-car fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span>Posto Auto</span>
                  </label>
                  <!--end::Label-->
                    <select class="form-select modern-select" v-model="formData.ParkingSpaces">
                        <option value="">🚗 Seleziona Posto Auto</option>
                        <option value="Assegnato">🎯 Assegnato</option>
                        <option value="Box Auto">🏠 Box Auto</option>
                        <option value="Condominiale">🏢 Condominiale</option>
                        <option value="Posto auto coperto">🏠 Posto auto coperto</option>
                        <option value="Posto auto scoperto">☀️ Posto auto scoperto</option>
                    </select>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                 <!--begin::Input group-->
                 <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-notepad fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                      <span class="path3"></span>
                      <span class="path4"></span>
                      <span class="path5"></span>
                    </i>
                    <span>Note</span>
                  </label>
                  <!--end::Label-->
                  <textarea 
                    class="form-control modern-textarea" 
                    v-model="formData.Notes"
                    placeholder="Inserisci eventuali note aggiuntive sulla richiesta..."
                    rows="4"></textarea>
                </div>
                <!--end::Input group-->
  
              </div>
              <!--end::Scroll-->
            </div>
            <!--end::Modal body-->
  
            <!--begin::Modal footer-->
            <div class="modal-footer flex-center" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 0 0 0.95rem 0.95rem; border-top: 1px solid #dee2e6; padding: 1.5rem 2rem;">
              <!--begin::Button-->
              <button
                type="reset"
                id="kt_modal_add_request_cancel"
                class="btn btn-modal-cancel me-3"
                data-bs-dismiss="modal"
              >
                <span class="btn-icon">
                  <i class="ki-duotone ki-cross fs-3">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                </span>
                <span class="btn-label">Annulla</span>
              </button>
              <!--end::Button-->
  
              <!--begin::Button-->
              <button
                :data-kt-indicator="loading ? 'on' : null"
                class="btn btn-modal-primary"
                type="submit"
                :disabled="loading"
              >
                <span v-if="!loading" class="d-flex align-items-center">
                  <span class="btn-icon">
                    <i class="ki-duotone ki-plus fs-3">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                  </span>
                  <span class="btn-label">Crea Richiesta</span>
                </span>
                <span v-if="loading" class="d-flex align-items-center">
                  <span class="spinner-border spinner-border-sm me-2"></span>
                  <span class="btn-label">Attendere...</span>
                </span>
              </button>
              <!--end::Button-->
            </div>
            <!--end::Modal footer-->
          </el-form>
          <!--end::Form-->
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { getAssetPath } from "@/core/helpers/assets";
  import { defineComponent, ref, watch, onMounted } from "vue";
  import { hideModal } from "@/core/helpers/dom";
  import { countries } from "@/core/data/countries";
  import Swal from "sweetalert2/dist/sweetalert2.js";
  import {createRequest, Request, InsertModel, getToInsert } from "@/core/data/requests";
  import { getCities, getLocationsByCity, getGroupedLocations, getProvincesForSelect, getCitiesByProvinceName, getLocationsByCityName } from "@/core/data/locations";
  
  import { useAuthStore, type User } from "@/stores/auth";
  import Multiselect from '@vueform/multiselect'

  
  export default defineComponent({
    name: "add-request-modal",
    components: {Multiselect},
    setup(_, { emit }) {
      const formRef = ref<null | HTMLFormElement>(null);
      const addRequestModalRef = ref<null | HTMLElement>(null);
      const loading = ref<boolean>(false);
      const store = useAuthStore();
      const provincesLoading = ref<boolean>(false);
      const citiesLoading = ref<boolean>(false);
      const locationsLoading = ref<boolean>(false);
      const provinces = ref<Array<{Id: string, Name: string}>>([]);
      const cities = ref<Array<{Id: string, Name: string}>>([]);
      const locations = ref<Array<{Id: string, Name: string}>>([]);
      const cityLocationsMap = ref<{[key: string]: Array<{Id: string, Name: string}>}>({});
      const formData = ref<Request>({
        CustomerId: null,  
        Contract: "Vendita",
        PropertyType: "",
        Province: "",
        Town:  "",
        PriceFrom: 0,
        PriceTo: 0,
        Archived: false,
        Closed: false,
        RoomsNumber: "",
        MQGarden: 0,
        GardenTo:0,
        GardenFrom:0,
        MQFrom: 0, 
        MQTo: 0, 
        PropertyState: "",
        Heating: "",
        ParkingSpaces: 0, 
        Notes: "",
        Location:"",
        MortgageAdviceRequired: false,
        AgencyId: store.user.AgencyId
      });

        const inserModel = ref<InsertModel>({
            Customers: [],
            Users: []
        });

        // Carica le province dal database
        const loadProvinces = async () => {
          try {
            provincesLoading.value = true;
            const provincesData = await getProvincesForSelect();
            provinces.value = provincesData;
          } catch (error) {
            console.error("Errore nel caricamento delle province:", error);
          } finally {
            provincesLoading.value = false;
          }
        };

        // Carica le città di una provincia specifica
        const loadCitiesByProvince = async (provinceName: string) => {
          try {
            citiesLoading.value = true;
            if (provinceName) {
              const citiesData = await getCitiesByProvinceName(provinceName);
              cities.value = citiesData;
            } else {
              cities.value = [];
            }
          } catch (error) {
            console.error("Errore nel caricamento delle città:", error);
            cities.value = [];
          } finally {
            citiesLoading.value = false;
          }
        };

        // Carica le località di una città specifica
        const loadLocationsByCity = async (cityName: string) => {
          try {
            locationsLoading.value = true;
            if (cityName) {
              const locationsData = await getLocationsByCityName(cityName);
              locations.value = locationsData;
            } else {
              locations.value = [];
            }
          } catch (error) {
            console.error("Errore nel caricamento delle località:", error);
            locations.value = [];
          } finally {
            locationsLoading.value = false;
          }
        };

        onMounted(async () => {
        loading.value = true;
        inserModel.value = await getToInsert(store.user.AgencyId);
        if(inserModel.value.Customers.length > 0){
          formData.value.CustomerId = inserModel.value.Customers[0].Id;
        } 
        
        // Carica le province dal database
        await loadProvinces();
        
        loading.value = false;
      })
        
      const rules = ref({
        Type: [
          {
            required: true,
            message: "Tipologia obligatoria",
            trigger: "change",
          },
        ],
        Name: [
          {
            required: true,
            message: "Nome obligatorio",
            trigger: "change",
          },
        ],
        LastName: [
          {
            required: true,
            message: "Cognome obligatorio",
            trigger: "change",
          },
        ],
        Phone: [
          {
            required: true,
            message: "Telefono obligatorio",
            trigger: "change",
          },
        ],
      });

      


      watch(
        () => formData.value.Province,
        async (newProvince) => {
            if (newProvince) {
                // Carica le città della provincia selezionata
                await loadCitiesByProvince(newProvince);
                formData.value.Town = null;
                formData.value.Location = null;
            } else {
                cities.value = [];
                locations.value = [];
                formData.value.Town = null;
                formData.value.Location = null;
            }
        }
        );

      watch(
        () => formData.value.Town,
        async (newTown) => {
          if (Array.isArray(newTown) && newTown.length > 0) {
            // Per le richieste, prendiamo la prima città selezionata per caricare le località
            const firstCity = newTown[0];
            await loadLocationsByCity(firstCity);
            formData.value.Location = null;
          } else {
            locations.value = [];
            formData.value.Location = null;
          }
        }
      );
  
      const submit = () => {
        if (!formRef.value) {
          return;
        }
        formRef.value.validate(async (valid: boolean) => {
          if (valid) {
            loading.value = true;
            formData.value.Town = formData.value.Town.toString()
            if(formData.value.Location != null && formData.value.Location != undefined){
              formData.value.Location = formData.value.Location.toString()
            }
            formData.value.PropertyType = formData.value.PropertyType.toString()

          await createRequest(formData.value);
  
          const error = store.errors;
          
          if (!error) {
              Swal.fire({
                text: "Il modulo è stato inviato con successo!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Continua!",
                heightAuto: false,
                customClass: {
                  confirmButton: "btn fw-semobold btn-light-primary",
                },
              }).then(function () {
                hideModal(addRequestModalRef.value);
                emit('formAddSubmitted', formData.value);
                loading.value = false;
              });
          } else {
            loading.value = false;
            Swal.fire({
              text: error,
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
      });
    };
        return {
        formData,
        rules,
        submit,
        formRef,
        loading,
        addRequestModalRef,
        getAssetPath,
        countries,
        cities,
        inserModel,
        provinces,
        locations,
        loadProvinces,
        loadCitiesByProvince,
        loadLocationsByCity,
        provincesLoading,
        citiesLoading,
        locationsLoading,
      };
    },
  });
  </script>
  <style src="@vueform/multiselect/themes/default.css"></style>
  <style lang="scss">
.el-select {
  width: 100%;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>

  <style scoped>
/* Stili per select moderni */
.modern-select {
  background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%);
  border: 1px solid #e8f4ff;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(54, 153, 255, 0.1);
  transition: all 0.3s ease;
  padding: 0.75rem 1rem;
  color: #3f4254;
  font-weight: 500;
  font-size: 0.95rem;
}

.modern-select:hover {
  background: linear-gradient(135deg, #e8f4ff 0%, #f1f3ff 100%);
  border-color: #3699ff;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(54, 153, 255, 0.15);
}

.modern-select:focus {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-color: #3699ff;
  box-shadow: 0 0 0 0.2rem rgba(54, 153, 255, 0.15), 0 4px 12px rgba(54, 153, 255, 0.2);
  transform: translateY(-1px);
  outline: none;
}

/* Stili per input moderni */
:deep(.modern-input .el-input__wrapper) {
  background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%);
  border: 1px solid #e8f4ff;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(54, 153, 255, 0.1);
  transition: all 0.3s ease;
  padding: 0.75rem 1rem;
}

:deep(.modern-input .el-input__inner) {
  color: #3f4254;
  font-weight: 500;
  font-size: 0.95rem;
  background: transparent;
  border: none;
  outline: none;
}

:deep(.modern-input .el-input__wrapper:hover) {
  background: linear-gradient(135deg, #e8f4ff 0%, #f1f3ff 100%);
  border-color: #3699ff;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(54, 153, 255, 0.15);
}

:deep(.modern-input .el-input__wrapper.is-focus) {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-color: #3699ff;
  box-shadow: 0 0 0 0.2rem rgba(54, 153, 255, 0.15), 0 4px 12px rgba(54, 153, 255, 0.2);
  transform: translateY(-1px);
}

/* Stili per textarea moderna */
.modern-textarea {
  background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%);
  border: 1px solid #e8f4ff;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(54, 153, 255, 0.1);
  transition: all 0.3s ease;
  padding: 0.75rem 1rem;
  color: #3f4254;
  font-weight: 500;
  font-size: 0.95rem;
  resize: vertical;
  min-height: 100px;
}

.modern-textarea:hover {
  background: linear-gradient(135deg, #e8f4ff 0%, #f1f3ff 100%);
  border-color: #3699ff;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(54, 153, 255, 0.15);
}

.modern-textarea:focus {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-color: #3699ff;
  box-shadow: 0 0 0 0.2rem rgba(54, 153, 255, 0.15), 0 4px 12px rgba(54, 153, 255, 0.2);
  transform: translateY(-1px);
  outline: none;
}

.modern-textarea::placeholder {
  color: #a1a5b7;
  font-style: italic;
}

/* Stili per multiselect moderno */
:deep(.multiselect-modern) {
  background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%);
  border: 1px solid #e8f4ff;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(54, 153, 255, 0.1);
  transition: all 0.3s ease;
}

:deep(.multiselect-modern .multiselect__tags) {
  background: transparent;
  border: none;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  min-height: 50px;
}

:deep(.multiselect-modern .multiselect__placeholder) {
  color: #a1a5b7;
  font-weight: 500;
  font-size: 0.95rem;
}

:deep(.multiselect-modern .multiselect__input) {
  background: transparent;
  color: #3f4254;
  font-weight: 500;
  font-size: 0.95rem;
}

:deep(.multiselect-modern:hover) {
  background: linear-gradient(135deg, #e8f4ff 0%, #f1f3ff 100%);
  border-color: #3699ff;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(54, 153, 255, 0.15);
}

:deep(.multiselect-modern.is-active) {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-color: #3699ff;
  box-shadow: 0 0 0 0.2rem rgba(54, 153, 255, 0.15), 0 4px 12px rgba(54, 153, 255, 0.2);
  transform: translateY(-1px);
}

/* Stili per labels */
label {
  transition: all 0.3s ease;
}

label:hover {
  color: #3699ff !important;
}

/* Icone */
.ki-duotone {
  transition: all 0.3s ease;
}

/* Bottoni Modal Moderni */
.btn-modal-cancel,
.btn-modal-primary {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  border-radius: 0.75rem;
  font-weight: 700;
  font-size: 0.95rem;
  border: none;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.3px;
}

.btn-modal-cancel::before,
.btn-modal-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.btn-modal-cancel:hover::before,
.btn-modal-primary:hover::before {
  left: 100%;
}

.btn-modal-cancel .btn-icon,
.btn-modal-primary .btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.btn-modal-cancel .btn-label,
.btn-modal-primary .btn-label {
  font-weight: 700;
  letter-spacing: 0.3px;
}

/* Bottone Annulla */
.btn-modal-cancel {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: 1px solid #dee2e6;
  color: #6c757d;
  box-shadow: 0 2px 8px rgba(108, 117, 125, 0.15);
}

.btn-modal-cancel:hover {
  background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(108, 117, 125, 0.25);
  color: #495057;
}

.btn-modal-cancel:hover .btn-icon {
  transform: scale(1.1) rotate(-90deg);
}

.btn-modal-cancel:active {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(108, 117, 125, 0.2);
}

/* Bottone Primario */
.btn-modal-primary {
  background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(54, 153, 255, 0.35);
}

.btn-modal-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #2b7ce6 0%, #0aa39a 100%);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(54, 153, 255, 0.45);
  color: #ffffff;
}

.btn-modal-primary:hover:not(:disabled) .btn-icon {
  transform: scale(1.15) rotate(5deg);
}

.btn-modal-primary:active:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(54, 153, 255, 0.35);
}

.btn-modal-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Spinner loading */
.btn-modal-primary .spinner-border-sm {
  width: 1rem;
  height: 1rem;
  border-width: 0.15rem;
}

/* Form controls */
.form-check-input:checked {
  background-color: #3699ff;
  border-color: #3699ff;
}

.form-check-input:focus {
  border-color: #3699ff;
  box-shadow: 0 0 0 0.2rem rgba(54, 153, 255, 0.25);
}
</style>

  