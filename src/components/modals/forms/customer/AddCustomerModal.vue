<template>
  <div
    class="modal fade"
    id="kt_modal_add_customer"
    ref="addCustomerModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <!--begin::Modal content-->
      <div class="modal-content card-palette modal-shell">
        <!--begin::Modal header-->
        <div class="modal-header card-palette-header modal-header-accent" id="kt_modal_add_customer_header">
          <!--begin::Modal title-->
          <div class="d-flex align-items-center">
            <div class="symbol symbol-40px me-3">
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
              <h2 class="fw-bold m-0 text-gray-900 fs-3">👥 Aggiungi Cliente</h2>
              <span class="text-muted fs-7 fw-semibold">Inserisci i dati del nuovo cliente</span>
            </div>
          </div>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_customer_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <!--begin::Form-->
        <el-form
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
              id="kt_modal_add_customer_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_customer_header"
              data-kt-scroll-wrappers="#kt_modal_add_customer_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group - Proprietario (solo Admin)-->
              <div v-if="user?.Role === 'Admin'" class="fv-row mb-8">
                <label class="form-label fw-bold text-gray-900 fs-5 mb-4">
                  <i class="ki-duotone ki-user-tick fs-2 text-primary me-2">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                  </i>
                  Proprietario *
                </label>
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
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-3 text-gray-800">
                  <i class="ki-duotone ki-user fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                    <span class="path4"></span>
                  </i>
                  Nome
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="FirstName">
                  <el-input
                    v-model="formData.FirstName"
                    type="text"
                    placeholder="Inserisci il nome"
                    size="large"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-3 text-gray-800">
                  <i class="ki-duotone ki-user fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                    <span class="path4"></span>
                  </i>
                  Cognome
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="LastName">
                  <el-input
                    v-model="formData.LastName"
                    type="text"
                    placeholder="Inserisci il cognome"
                    size="large"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-3 text-gray-800">
                  <i class="ki-duotone ki-sms fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <span>Email</span>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="Email">
                  <el-input 
                    v-model="formData.Email"
                    placeholder="esempio@email.com"
                    size="large"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
               <!--begin::Input group-->
               <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-3 text-gray-800">
                  <i class="ki-duotone ki-phone fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <span class="required">Telefono</span>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="Phone">
                  <el-input 
                    v-model="formData.Phone" 
                    type="number"
                    placeholder="3331234567"
                    size="large"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="row mb-6">
                  <!--begin::Label-->
                  <label class="col-lg-4 col-form-label fw-semobold fs-6">Aquirente</label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <div class="col-lg-8 fv-row">
                    <div class="form-check form-switch form-check-custom form-check-solid">
                      <input class="form-check-input" type="checkbox" value="" v-model="formData.Buyer" />
                    </div>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="row mb-6">
                  <!--begin::Label-->
                  <label class="col-lg-4 col-form-label fw-semobold fs-6">Venditore</label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <div class="col-lg-8 fv-row">
                    <div class="form-check form-switch form-check-custom form-check-solid">
                      <input class="form-check-input" type="checkbox" value="" v-model="formData.Seller" />
                    </div>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="row mb-6">
                  <!--begin::Label-->
                  <label class="col-lg-4 col-form-label fw-semobold fs-6">Costruttore</label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <div class="col-lg-8 fv-row">
                    <div class="form-check form-switch form-check-custom form-check-solid">
                      <input class="form-check-input" type="checkbox" value="" v-model="formData.Builder" />
                    </div>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="row mb-6">
                  <!--begin::Label-->
                  <label class="col-lg-4 col-form-label fw-semobold fs-6">Altro</label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <div class="col-lg-8 fv-row">
                    <div class="form-check form-switch form-check-custom form-check-solid">
                      <input class="form-check-input" type="checkbox" value="" v-model="formData.Other" />
                    </div>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
                
                <!--begin::Input group-->
                <div class="row mb-6">
                  <!--begin::Label-->
                  <label class="col-lg-4 col-form-label fw-semobold fs-6">Cliente gold</label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <div class="col-lg-8 fv-row">
                    <div class="form-check form-switch form-check-custom form-check-solid">
                      <input class="form-check-input" type="checkbox" value="" v-model="formData.GoldCustomer" />
                    </div>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="row mb-6">
                  <!--begin::Label-->
                  <label class="col-lg-4 col-form-label fw-semobold fs-6">Acquisizione svolta</label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <div class="col-lg-8 fv-row">
                    <div class="form-check form-switch form-check-custom form-check-solid">
                      <input class="form-check-input" type="checkbox" value="" v-model="formData.AcquisitionDone" />
                    </div>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
                
                
                <!--begin::Input group-->
                <div class="row mb-6">
                  <!--begin::Label-->
                  <label class="col-lg-4 col-form-label fw-semobold fs-6">Incarico in corso</label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <div class="col-lg-8 fv-row">
                    <div class="form-check form-switch form-check-custom form-check-solid">
                      <input class="form-check-input" type="checkbox" value="" v-model="formData.OngoingAssignment" />
                    </div>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-15">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-3 text-gray-800">
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
                
                <!--begin::Input-->
                <textarea 
                  class="form-control form-control-lg" 
                  v-model="formData.Description"
                  placeholder="Inserisci eventuali note..."
                  rows="3"
                  >
                </textarea>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Billing toggle-->
              <div
                class="fw-bold fs-4 rotate collapsible mb-7 p-4"
                data-bs-toggle="collapse"
                href="#kt_modal_add_customer_billing_info"
                role="button"
                aria-expanded="false"
                aria-controls="kt_customer_view_details"
                >
                <i class="ki-duotone ki-information fs-3 me-3 text-primary">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                </i>
                Maggiori Informazioni
                <span class="ms-2 rotate-180">
                  <KTIcon icon-name="down" icon-class="fs-3" />
                </span>
              </div>
              <!--end::Billing toggle-->

              <!--begin::Billing form-->
              <div
                id="kt_modal_add_customer_billing_info"
                class="collapse show"
              >
                <!--begin::Input group-->
                <div class="d-flex flex-column mb-7 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-geolocation fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    Indirizzo
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="Address">
                    <el-input 
                      v-model="formData.Address"
                      placeholder="Via, numero civico"
                      size="large"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="d-flex flex-column mb-7 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-map fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    Provincia
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <select 
                    v-model="formData.State"
                    class="form-select form-select-lg"
                    name="province"
                  >
                    <option value="">🗺️ Seleziona provincia</option>
                    <option v-for="(province, index) in provinces" :key="index" :value="province.Name">
                      {{ province.Name }}
                    </option>
                  </select>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="d-flex flex-column mb-7 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-geo fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    Comune
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <select class="form-select form-select-lg" v-model="formData.City">
                    <option value="">🏙️ Seleziona comune</option>
                    <option v-for="(city, index) in cities" :key="index" :value="city.Name">
                      {{ city.Name }}
                    </option>
                  </select>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
              </div>
              <!--end::Billing form-->
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              type="reset"
              id="kt_modal_add_customer_cancel"
              class="btn btn-secondary me-3"
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
              class="btn btn-primary"
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
                <span class="btn-label">Crea Cliente</span>
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
import { defineComponent, ref, watch } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { countries } from "@/core/data/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
import {createCustomer, Customer } from "@/core/data/customers";
import { useAuthStore, type User } from "@/stores/auth";
import { useProvinces } from "@/composables/useProvinces";
import { getCAPByCity, getCitiesByProvince, getProvinceCities } from "@/core/data/italian-geographic-data-loader";
import { getSearchItems, type SearchModel } from "@/core/data/events";

export default defineComponent({
  name: "add-customer-modal",
  components: {},
  emits: ['formAddSubmitted', 'limitExceeded'],
  setup(_, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addCustomerModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const store = useAuthStore();
    const user = store.user;
    
    // Usa il composable per le province
    const { provinces } = useProvinces();
    const cities = ref<Array<{Id: string, Name: string}>>([]);
    const ownerSearchItems = ref<SearchModel>({
      Agencies: [],
      Agents: []
    });
    const formData = ref<Customer>({
      Buyer: false,
      Seller: false,
      Builder: false,
      Other: false,
      GoldCustomer: false,
      FirstName: "",
      LastName:"",
      Email: "",
      Phone: 0,
      Description: "",
      Address: "",
      City: "",
      State: "",
      AcquisitionDone: false,
      OngoingAssignment: false,
      UserId: user.Id
    });

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

    // Imposta UserId automaticamente se l'utente non è Admin
    const setDefaultUserId = () => {
      if (user?.Role !== "Admin" && user?.Id) {
        formData.value.UserId = user.Id;
      }
    };

    // Carica dati e imposta UserId al mount
    loadOwnerSearchItems();
    setDefaultUserId();

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
          formData.value.City = ""; // Reset città
        } else {
          cities.value = [];
          formData.value.City = "";
        }
      }
    );

    const rules = ref({
      Type: [
        {
          required: true,
          message: "Tipologia obligatoria",
          trigger: "change",
        },
      ],
      FirstName: [
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

    const submit = () => {
      if (!formRef.value) {
        return;
      }
      formRef.value.validate(async (valid: boolean) => {
        if (valid) {
          // Validazione manuale per UserId se Admin
          if (user?.Role === "Admin" && !formData.value.UserId?.trim()) {
            Swal.fire({
              title: "Proprietario Obbligatorio",
              text: "Seleziona un proprietario (agenzia o agente) per associare il cliente.",
              icon: "warning",
              buttonsStyling: false,
              confirmButtonText: "Ok",
              heightAuto: false,
              customClass: {
                confirmButton: "btn fw-semibold btn-light-warning",
              },
            });
            return;
          }

          loading.value = true;
          try {
            // Imposta UserId automaticamente se l'utente non è Admin
            if (user?.Role !== "Admin") {
              formData.value.UserId = user.Id;
            }
            
            await createCustomer(formData.value);

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
                hideModal(addCustomerModalRef.value);
                emit('formAddSubmitted', formData.value);
                loading.value = false;
              });
            } else {
              loading.value = false;
              Swal.fire({
                text: "Siamo spiacenti, sembra che siano stati rilevati alcuni errori, riprova.",
                icon: "error",
                buttonsStyling: false,
                confirmButtonText: "Ok",
                heightAuto: false,
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              });
            }
          } catch (err: any) {
            loading.value = false;
            if (err?.response?.status === 429) {
              hideModal(addCustomerModalRef.value);
              emit('limitExceeded', err.response.data);
            } else {
              Swal.fire({
                text: "Siamo spiacenti, sembra che siano stati rilevati alcuni errori, riprova.",
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
      }
    });
  };

    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      addCustomerModalRef,
      getAssetPath,
      countries,
      provinces,
      cities,
      user,
      ownerSearchItems,
    };
  },
});
</script>


<!-- Tutti gli stili sono stati spostati in file CSS dedicati -->
