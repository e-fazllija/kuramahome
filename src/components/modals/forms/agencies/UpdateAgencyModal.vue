<template>
  <div class="modal fade" id="kt_modal_update_agency" ref="updateAgencyModalRef" tabindex="-1" aria-hidden="true">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-850px">
      <!--begin::Modal content-->
      <div class="modal-content card-palette" style="border-radius: 0.95rem; box-shadow: 0 10px 30px var(--bs-shadow-color);">
        <!--begin::Modal header-->
        <div class="modal-header card-palette-header" id="kt_modal_update_agency_header" style="background: linear-gradient(135deg, rgba(0, 119, 204, 0.1) 0%, rgba(0, 119, 204, 0.05) 100%); border-radius: 0.95rem 0.95rem 0 0;">
          <!--begin::Modal title-->
          <div class="d-flex align-items-center">
            <div class="symbol symbol-40px me-3">
              <span class="symbol-label" style="background: linear-gradient(135deg, #0077CC 0%, #0077CC 100%); box-shadow: 0 4px 12px rgba(0, 119, 204, 0.3);">
                <i class="ki-duotone ki-shop fs-2 text-white">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                  <span class="path4"></span>
                  <span class="path5"></span>
                </i>
              </span>
            </div>
            <div>
              <h2 class="fw-bold m-0 text-palette-primary fs-3">🏢 Aggiorna Agenzia</h2>
              <span class="text-palette-secondary fs-7 fw-semibold">Modifica i dati dell'agenzia selezionata</span>
            </div>
          </div>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div id="kt_modal_update_agency_close" data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
            style="border-radius: 0.5rem; background: var(--bs-bg-primary); border: 1px solid var(--bs-border-color);">
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <!--begin::Form-->
        <el-form @submit.prevent="submit()" :model="formData" :rules="rules" ref="formRef">

          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div class="scroll-y me-n7 pe-7" id="kt_modal_add_agency_scroll" data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_agency_header"
              data-kt-scroll-wrappers="#kt_modal_add_agency_scroll" data-kt-scroll-offset="300px">

               <!--begin::Input group-->
               <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-3 text-palette-primary">
                  <i class="ki-duotone ki-toggle-on fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                    <span class="path4"></span>
                  </i>
                  Stato Attivo / Non Attivo
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <div class="fv-row">
                  <div class="form-check form-switch form-check-custom form-check-solid">
                    <input class="form-check-input" type="checkbox" value="" v-model="formData.EmailConfirmed" />
                  </div>
                </div>
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
                  Nome
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="FirstName">
                  <el-input v-model="formData.FirstName" type="text" placeholder="Inserisci il nome dell'agenzia" class="modern-input" />
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
                  <el-input v-model="formData.LastName" type="text" placeholder="Inserisci il cognome" class="modern-input" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-3 text-palette-primary">
                  <i class="ki-duotone ki-sms fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                    <span class="path4"></span>
                  </i>
                  <span class="required">Email</span>
                  <i class="fas fa-exclamation-circle ms-1 fs-7 text-warning" data-bs-toggle="tooltip"
                    title="indirizzo email non valido"></i>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="Email">
                  <el-input v-model="formData.Email" placeholder="esempio@agenzia.com" class="modern-input" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-3 text-palette-primary">
                  <i class="ki-duotone ki-phone fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                    <span class="path4"></span>
                    <span class="path5"></span>
                  </i>
                  <span class="required">Telefono</span>
                  <i class="fas fa-exclamation-circle ms-1 fs-7 text-warning" data-bs-toggle="tooltip"
                    title="numero di telefono non valido"></i>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="PhoneNumber">
                  <el-input v-model="formData.PhoneNumber" type="tel" placeholder="0123456789" class="modern-input" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-3 text-palette-primary">
                  <i class="ki-duotone ki-mobile fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                    <span class="path4"></span>
                    <span class="path5"></span>
                  </i>
                  <span>Cellulare</span>
                  <i class="fas fa-exclamation-circle ms-1 fs-7 text-warning" data-bs-toggle="tooltip"
                    title="numero di telefono non valido"></i>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="MobilePhone">
                  <el-input v-model="formData.MobilePhone" type="tel" placeholder="3331234567" class="modern-input" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-15">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-3 text-palette-primary">
                  <i class="ki-duotone ki-profile-user fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                    <span class="path4"></span>
                    <span class="path5"></span>
                    <span class="path6"></span>
                    <span class="path7"></span>
                    <span class="path8"></span>
                  </i>
                  Referente
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="referent">
                  <el-input v-model="formData.Referent" type="text" placeholder="Nome del referente" class="modern-input" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Billing toggle-->
              <div class="fw-bold fs-4 rotate collapsible mb-7 p-4" data-bs-toggle="collapse"
                href="#kt_modal_add_agency_billing_info" role="button" aria-expanded="false"
                aria-controls="kt_agent_view_details"
                style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 0.75rem; border: 1px solid #dee2e6; cursor: pointer; transition: all 0.3s ease;">
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
              <div id="kt_modal_add_agency_billing_info" class="collapse show">
                <!--begin::Input group-->
                <div class="d-flex flex-column mb-7 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-geolocation fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                      <span class="path3"></span>
                      <span class="path4"></span>
                    </i>
                    Indirizzo
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="addressLine">
                    <el-input v-model="formData.Address" placeholder="Via, numero civico" class="modern-input" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="d-flex flex-column mb-7 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-geo fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                      <span class="path3"></span>
                      <span class="path4"></span>
                    </i>
                    Comune
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="City">
                    <el-input v-model="formData.City" placeholder="Nome del comune" class="modern-input" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="row g-9 mb-7">
                  <!--begin::Col-->
                  <div class="col-md-4 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-bold mb-3 text-palette-primary">
                      <i class="ki-duotone ki-map fs-5 me-2 text-primary">
                        <span class="path1"></span>
                        <span class="path2"></span>
                        <span class="path3"></span>
                        <span class="path4"></span>
                      </i>
                      Provincia
                    </label>
                    <!--end::Label-->

                    <!--begin::Input-->
                    <el-form-item prop="province">
                      <el-input v-model="formData.Province" placeholder="Es. MI, RM, NA" class="modern-input" />
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                  <!--end::Col-->

                  <!--begin::Col-->
                  <div class="col-md-4 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-bold mb-3 text-gray-800">
                      <i class="ki-duotone ki-geo fs-5 me-2 text-primary">
                        <span class="path1"></span>
                        <span class="path2"></span>
                        <span class="path3"></span>
                        <span class="path4"></span>
                      </i>
                      CAP
                    </label>
                    <!--end::Label-->

                    <!--begin::Input-->
                    <el-form-item prop="zipCode">
                      <el-input v-model="formData.ZipCode" placeholder="Es. 00100" class="modern-input" />
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                  <!--end::Col-->

                  <!--begin::Col-->
                  <div class="col-md-4 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-bold mb-3 text-palette-primary">
                      <i class="ki-duotone ki-palette fs-5 me-2 text-primary">
                        <span class="path1"></span>
                        <span class="path2"></span>
                        <span class="path3"></span>
                        <span class="path4"></span>
                        <span class="path5"></span>
                      </i>
                      Colore
                    </label>
                    <!--end::Label-->

                    <!--begin::Input-->
                    <el-form-item prop="color">
                      <div class="color-picker-container">
                        <div class="color-options">
                          <div 
                            v-for="color in colorOptions" 
                            :key="color.value"
                            class="color-option"
                            :class="{ 'selected': formData.Color === color.value }"
                            :style="{ backgroundColor: color.value }"
                            @click="selectColor(color.value)"
                            :title="color.name"
                          >
                            <i v-if="formData.Color === color.value" class="ki-duotone ki-check fs-4 text-white">
                              <span class="path1"></span>
                              <span class="path2"></span>
                            </i>
                          </div>
                        </div>
                        <div class="selected-color-display">
                          <span class="color-label">Colore selezionato:</span>
                          <div class="current-color" :style="{ backgroundColor: formData.Color }"></div>
                          <span class="color-value">{{ formData.Color }}</span>
                        </div>
                      </div>
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                  <!--end::Col-->

                </div>
                <!--end::Input group-->

              </div>
              <!--end::Billing form-->

              <!--begin::Separator-->
              <div class="separator separator-content my-8">
                <span class="w-250px fw-bold text-gray-700 fs-6">
                  <i class="ki-duotone ki-bill fs-2 text-info me-2">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                    <span class="path4"></span>
                    <span class="path5"></span>
                    <span class="path6"></span>
                  </i>
                  Dati Fiscali <span class="text-muted fs-7 fw-normal">(Opzionali)</span>
                </span>
              </div>
              <!--end::Separator-->

              <!--begin::Input group - Ragione Sociale-->
              <div class="fv-row mb-7">
                <label class="form-label fw-bold text-gray-800 fs-6">Ragione Sociale</label>
                <el-form-item prop="companyName">
                  <el-input
                    v-model="formData.CompanyName"
                    type="text"
                    placeholder="Es. Rossi Immobiliare S.r.l."
                    class="modern-input"
                  />
                </el-form-item>
              </div>
              <!--end::Input group-->

              <!--begin::Input group - Codice Fiscale-->
              <div class="fv-row mb-7">
                <label class="form-label fw-bold text-gray-800 fs-6">Codice Fiscale</label>
                <el-form-item prop="fiscalCode">
                  <el-input
                    v-model="formData.FiscalCode"
                    type="text"
                    placeholder="16 caratteri"
                    maxlength="16"
                    class="modern-input"
                    @input="formData.FiscalCode = formData.FiscalCode.toUpperCase()"
                    style="text-transform: uppercase;"
                  />
                </el-form-item>
              </div>
              <!--end::Input group-->

              <!--begin::Input group - Partita IVA-->
              <div class="fv-row mb-7">
                <label class="form-label fw-bold text-gray-800 fs-6">Partita IVA</label>
                <el-form-item prop="vatNumber">
                  <el-input
                    v-model="formData.VATNumber"
                    type="text"
                    placeholder="11 cifre"
                    maxlength="11"
                    class="modern-input"
                  />
                </el-form-item>
              </div>
              <!--end::Input group-->

              <!--begin::Input group - PEC o Codice SDI-->
              <div class="fv-row mb-7">
                <label class="form-label fw-bold text-gray-800 fs-6">PEC o Codice Destinatario SDI</label>
                <div class="row">
                  <div class="col-xl-8">
                    <el-form-item prop="pec">
                      <el-input
                        v-model="formData.PEC"
                        type="email"
                        placeholder="pec@example.com"
                        class="modern-input"
                      />
                    </el-form-item>
                  </div>
                  <div class="col-xl-4">
                    <el-form-item prop="sdiCode">
                      <el-input
                        v-model="formData.SDICode"
                        type="text"
                        placeholder="SDI (7 caratteri)"
                        maxlength="7"
                        class="modern-input"
                        @input="formData.SDICode = formData.SDICode.toUpperCase()"
                        style="text-transform: uppercase;"
                      />
                    </el-form-item>
                  </div>
                </div>
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
              id="kt_modal_update_agency_cancel" 
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

            <!--begin::Button Elimina-->
            <button 
              v-if="user.Role == 'Admin'" 
              type="button" 
              @click="deleteItem" 
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
                  <i class="ki-duotone ki-check fs-3">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                </span>
                <span class="btn-label">Salva Modifiche</span>
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
import Swal from "sweetalert2/dist/sweetalert2.js";
import { updateAgency, getAgency, deleteAgency } from "@/core/data/agencies";
import { useAuthStore, type User } from "@/stores/auth";

export default defineComponent({
  name: "update-agency-modal",
  components: {},
  props: {
    Id:
    {
      type: String,
      Required: true
    }
  },
  setup(props, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const updateAgencyModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const store = useAuthStore();
    const user = store.user;
    const formData = ref<any>({
      Id: "",
      UserName: "",
      FirstName: "",
      LastName: "",
      Email: "",
      PhoneNumber: "",
      MobilePhone: "",
      Referent: "",
      Address: "",
      City: "",
      ZipCode: "",
      Province: "",
      Color: "#00FFFF", // Default: Ciano
      AgencyId: "",
      EmailConfirmed: false,
      UpdateDate: new Date(),
      // Dati Fiscali
      CompanyName: "",
      FiscalCode: "",
      VATNumber: "",
      PEC: "",
      SDICode: ""
    });

    // Opzioni colori predefinite
    const colorOptions = ref([
      { name: "Ciano", value: "#00FFFF" },
      { name: "Magenta", value: "#FF00FF" },
      { name: "Oro", value: "#FFD700" },
      { name: "Azzurro", value: "#007FFF" },
      { name: "Verde Lime", value: "#00FF00" },
      { name: "Indaco", value: "#4B0082" },
      { name: "Turchese", value: "#40E0D0" },
      { name: "Salmone", value: "#FA8072" },
      { name: "Oliva", value: "#808000" },
      { name: "Lavanda", value: "#E6E6FA" }
    ]);

    // Funzione per selezionare un colore
    const selectColor = (color: string) => {
      formData.value.Color = color;
    };

    watch(() => props.Id, async (first, second) => {
      if (first) {
        formData.value = await getAgency(props.Id)
      }
      else {
        formData.value = null;
      }
    })

    const rules = ref({
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
      Email: [
        {
          required: true,
          message: "Email obligatorio",
          trigger: "change",
        },
      ],
      PhoneNumber: [
        {
          required: true,
          message: "Telefono obligatorio",
          trigger: "change",
        },
      ],
      Address: [
        {
          required: true,
          message: "Indirizzo obligatorio",
          trigger: "change",
        },
      ],
      City: [
        {
          required: true,
          message: "Città obligatoria",
          trigger: "change",
        },
      ],
      FiscalCode: [
        {
          pattern: /^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/,
          message: "Codice Fiscale non valido",
          trigger: "blur",
        },
      ],
      VATNumber: [
        {
          pattern: /^[0-9]{11}$/,
          message: "Partita IVA deve contenere 11 cifre",
          trigger: "blur",
        },
      ],
      PEC: [
        {
          type: "email",
          message: "PEC non valida",
          trigger: "blur",
        },
      ],
      SDICode: [
        {
          pattern: /^[A-Z0-9]{7}$/,
          message: "Codice SDI deve contenere 7 caratteri alfanumerici",
          trigger: "blur",
        },
      ]
    });

    const submit = () => {
      if (!formRef.value) {
        return;
      }
      formRef.value.validate(async (valid: boolean) => {
        if (valid) {
          loading.value = true;
          await updateAgency(formData.value)
          
          const error = store.errors;

          if (!error) {
            Swal.fire({
              text: "Operazione completata!",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Continua!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn fw-semobold btn-light-primary",
              },
            }).then(function () {
              hideModal(updateAgencyModalRef.value);
              emit('formUpdateSubmitted', formData.value);
              loading.value = false;
            });
          } else {
            loading.value = false;
            Swal.fire({
              text: error as string,
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Riprova!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn fw-semobold btn-light-danger",
              },
            });
          }
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
          return false;
        }
      });
    };

     const deleteItem = async () => {
      
          loading.value = true;
          await deleteAgency(formData.value.Id)
          
          const error = store.errors;

          if (!error) {
            Swal.fire({
              text: "Operazione completata!",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Continua!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn fw-semobold btn-light-primary",
              },
            }).then(function () {
              hideModal(updateAgencyModalRef.value);
              emit('formUpdateSubmitted', formData.value);
              loading.value = false;
            });
          } else {
            loading.value = false;
            Swal.fire({
              text: error as string,
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Riprova!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn fw-semobold btn-light-danger",
              },
            });
          }
    };

    return {
      formData,
      rules,
      submit,
      deleteItem,
      formRef,
      loading,
      updateAgencyModalRef,
      getAssetPath,
      user,
      colorOptions,
      selectColor,
    };
  },
});
</script>


<!-- Tutti gli stili sono stati spostati in file CSS dedicati -->

<style scoped>
/* Color Picker Styles */
.color-picker-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.color-options {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.75rem;
  padding: 1rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 0.75rem;
  border: 1px solid #dee2e6;
}

.color-option {
  width: 50px;
  height: 50px;
  border-radius: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: 3px solid transparent;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.color-option:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  border-color: #ffffff;
}

.color-option.selected {
  transform: scale(1.15);
  border-color: #3699ff;
  box-shadow: 0 6px 20px rgba(54, 153, 255, 0.4);
}

.color-option.selected::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border: 2px solid #3699ff;
  border-radius: 0.75rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(54, 153, 255, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(54, 153, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(54, 153, 255, 0);
  }
}

.selected-color-display {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%);
  border-radius: 0.75rem;
  border: 1px solid #0bb7af;
}

.color-label {
  font-weight: 600;
  color: #0bb7af;
  font-size: 0.9rem;
}

.current-color {
  width: 30px;
  height: 30px;
  border-radius: 0.5rem;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.color-value {
  font-family: 'Courier New', monospace;
  font-weight: 600;
  color: #0bb7af;
  font-size: 0.85rem;
  background: rgba(255, 255, 255, 0.8);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

/* Responsive */
@media (max-width: 768px) {
  .color-options {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }
  
  .color-option {
    width: 40px;
    height: 40px;
  }
  
  .selected-color-display {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}

/* Dark mode support */
[data-bs-theme="dark"] .color-options {
  background: linear-gradient(135deg, #1e1e2d 0%, #2d2d3f 100%);
  border-color: #3c3c4a;
}

[data-bs-theme="dark"] .selected-color-display {
  background: linear-gradient(135deg, #1e1e2d 0%, #2d2d3f 100%);
  border-color: #0bb7af;
}

[data-bs-theme="dark"] .color-label,
[data-bs-theme="dark"] .color-value {
  color: #0bb7af;
}
</style>
