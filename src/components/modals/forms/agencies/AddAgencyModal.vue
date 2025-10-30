<template>
  <div
    class="modal fade"
    id="kt_modal_add_agency"
    ref="addAgencyModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-850px">
      <!--begin::Modal content-->
      <div class="modal-content card-palette" style="border-radius: 0.95rem; box-shadow: 0 10px 30px var(--bs-shadow-color);">
        <!--begin::Modal header-->
        <div class="modal-header card-palette-header" id="kt_modal_add_agency_header" style="background: linear-gradient(135deg, rgba(0, 119, 204, 0.1) 0%, rgba(0, 119, 204, 0.05) 100%); border-radius: 0.95rem 0.95rem 0 0;">
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
              <h2 class="fw-bold m-0 text-gray-900 fs-3"> Aggiungi Agenzia</h2>
              <span class="text-muted fs-7 fw-semibold">Inserisci i dati della nuova agenzia</span>
            </div>
          </div>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_agency_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
            style="border-radius: 0.5rem; background: var(--bs-bg-primary); border: 1px solid var(--bs-border-color);"
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
              id="kt_modal_add_agency_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_agency_header"
              data-kt-scroll-wrappers="#kt_modal_add_agency_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group - Tipo Utente-->
              <div class="fv-row mb-8">
                <label class="form-label fw-bold text-gray-900 fs-5 mb-4">
                  <i class="ki-duotone ki-user-tick fs-2 text-primary me-2">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                  </i>
                  Tipo di Utente *
                </label>
                <div class="row g-4">
                  <div class="col-6">
                    <label class="btn btn-outline btn-outline-dashed btn-active-light-primary d-flex flex-column align-items-center p-5 h-100 w-100" :class="{ 'active': formData.UserType === 1 }">
                      <input
                        v-model="formData.UserType"
                        class="btn-check"
                        type="radio"
                        name="userType"
                        :value="1"
                      />
                      <i class="ki-duotone ki-profile-user fs-3x text-primary mb-3">
                        <span class="path1"></span>
                        <span class="path2"></span>
                        <span class="path3"></span>
                        <span class="path4"></span>
                      </i>
                      <span class="fw-bold fs-5 text-gray-800">Persona Fisica</span>
                      <span class="text-muted fs-7 mt-1">Per privati</span>
                    </label>
                  </div>
                  <div class="col-6">
                    <label class="btn btn-outline btn-outline-dashed btn-active-light-primary d-flex flex-column align-items-center p-5 h-100 w-100" :class="{ 'active': formData.UserType === 2 }">
                      <input
                        v-model="formData.UserType"
                        class="btn-check"
                        type="radio"
                        name="userType"
                        :value="2"
                      />
                      <i class="ki-duotone ki-office-bag fs-3x text-primary mb-3">
                        <span class="path1"></span>
                        <span class="path2"></span>
                        <span class="path3"></span>
                        <span class="path4"></span>
                      </i>
                      <span class="fw-bold fs-5 text-gray-800">Persona Giuridica</span>
                      <span class="text-muted fs-7 mt-1">Per aziende</span>
                    </label>
                  </div>
                </div>
              </div>
              <!--end::Input group-->

              <!--begin::Campi PERSONA FISICA-->
              <div v-if="formData.UserType === 1">
                <!--begin::Input group - Nome e Cognome-->
                <div class="row fv-row mb-7">
                  <div class="col-xl-6">
                    <label class="form-label fw-bold text-gray-800 fs-6">Nome *</label>
                    <el-form-item prop="FirstName">
                      <el-input
                        v-model="formData.FirstName"
                        type="text"
                        placeholder="Inserisci il nome"
                        class="modern-input"
                      />
                    </el-form-item>
                  </div>
                  <div class="col-xl-6">
                    <label class="form-label fw-bold text-gray-800 fs-6">Cognome *</label>
                    <el-form-item prop="LastName">
                      <el-input
                        v-model="formData.LastName"
                        type="text"
                        placeholder="Inserisci il cognome"
                        class="modern-input"
                      />
                    </el-form-item>
                  </div>
                </div>
                <!--end::Input group-->
              </div>
              <!--end::Campi Persona Fisica-->

              <!--begin::Campi PERSONA GIURIDICA-->
              <div v-if="formData.UserType === 2">
                <!--begin::Input group - Ragione Sociale-->
                <div class="fv-row mb-7">
                  <label class="form-label fw-bold text-gray-800 fs-6">Ragione Sociale *</label>
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

                <!--begin::Separator-->
                <div class="separator separator-dashed my-6"></div>
                <h5 class="text-gray-800 fw-bold mb-4">
                  <i class="ki-duotone ki-user fs-2 text-primary me-2">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Referente Aziendale
                </h5>
                <!--end::Separator-->

                <!--begin::Input group - Nome e Cognome Referente-->
                <div class="row fv-row mb-7">
                  <div class="col-xl-6">
                    <label class="form-label fw-bold text-gray-800 fs-6">Nome Referente *</label>
                    <el-form-item prop="FirstName">
                      <el-input
                        v-model="formData.FirstName"
                        type="text"
                        placeholder="Nome del referente"
                        class="modern-input"
                      />
                    </el-form-item>
                  </div>
                  <div class="col-xl-6">
                    <label class="form-label fw-bold text-gray-800 fs-6">Cognome Referente *</label>
                    <el-form-item prop="LastName">
                      <el-input
                        v-model="formData.LastName"
                        type="text"
                        placeholder="Cognome del referente"
                        class="modern-input"
                      />
                    </el-form-item>
                  </div>
                </div>
                <!--end::Input group-->
              </div>
              <!--end::Campi Persona Giuridica-->
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
                  <i
                    class="fas fa-exclamation-circle ms-1 fs-7 text-warning"
                    data-bs-toggle="tooltip"
                    title="indirizzo email non valido"
                  ></i>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="email">
                  <el-input 
                    v-model="formData.Email" 
                    placeholder="esempio@agenzia.com"
                    class="modern-input"
                  />
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
                  <i
                    class="fas fa-exclamation-circle ms-1 fs-7 text-warning"
                    data-bs-toggle="tooltip"
                    title="numero di telefono non valido"
                  ></i>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="phone">
                  <el-input 
                    v-model="formData.PhoneNumber" 
                    type="tel"
                    placeholder="0123456789"
                    class="modern-input"
                  />
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
                  <i
                    class="fas fa-exclamation-circle ms-1 fs-7 text-warning"
                    data-bs-toggle="tooltip"
                    title="numero di telefono non valido"
                  ></i>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="phone">
                  <el-input 
                    v-model="formData.MobilePhone" 
                    type="tel"
                    placeholder="3331234567"
                    class="modern-input"
                  />
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
                  <el-input 
                    v-model="formData.Referent" 
                    type="text" 
                    placeholder="Nome del referente"
                    class="modern-input"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Billing toggle-->
              <div
                class="fw-bold fs-4 rotate collapsible mb-7 p-4"
                data-bs-toggle="collapse"
                href="#kt_modal_add_agency_billing_info"
                role="button"
                aria-expanded="false"
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
              <div
                id="kt_modal_add_agency_billing_info"
                class="collapse show"
              >
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
                    <el-input 
                      v-model="formData.Address" 
                      placeholder="Via, numero civico"
                      class="modern-input"
                    />
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
                      <el-input 
                        v-model="formData.City" 
                        placeholder="Nome del comune"
                        class="modern-input"
                      />
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
                      <span class="required">Provincia</span>
                    </label>
                    <!--end::Label-->

                    <!--begin::Input-->
                    <select 
                      v-model="formData.Province"
                      class="form-select form-select-lg form-select-solid"
                      name="province"
                    >
                      <option value="">Seleziona provincia</option>
                      <option v-for="(province, index) in provinces" :key="index" :value="province.Name">
                        {{ province.Name }}
                      </option>
                    </select>
                    <!--end teatroInput-->
                  </div>
                  <!--end::Col-->

                  <!--begin::Col-->
                  <div class="col-md-4 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-bold mb-3 text-palette-primary">
                      <i class="ki-duotone ki-geo fs-5 me-2 text-primary">
                        <span class="path1"></span>
                        <span class="path2"></span>
                        <span class="path3"></span>
                        <span class="path4"></span>
                      </i>
                      <span class="required">CAP</span>
                    </label>
                    <!--end::Label-->

                    <!--begin::Input-->
                    <el-form-item prop="zipCode">
                      <el-input 
                        v-model="formData.ZipCode" 
                        placeholder="Es. 00100"
                        class="modern-input"
                      />
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

              <!--begin::Campi PERSONA FISICA-->
              <div v-if="formData.UserType === 1">
                <!--begin::Input group - Codice Fiscale-->
                <div class="fv-row mb-7">
                  <label class="form-label fw-bold text-gray-800 fs-6"><span class="required">Codice Fiscale</span></label>
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
              </div>
              <!--end::Campi Persona Fisica-->

              <!--begin::Campi PERSONA GIURIDICA-->
              <div v-if="formData.UserType === 2">
                <!--begin::Input group - Partita IVA-->
                <div class="fv-row mb-7">
                  <label class="form-label fw-bold text-gray-800 fs-6"><span class="required">Partita IVA</span></label>
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
              <!--end::Campi Persona Giuridica-->

            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 0 0 0.95rem 0.95rem; border-top: 1px solid #dee2e6; padding: 1.5rem 2rem;">
            <!--begin::Button-->
            <button
              type="reset"
              id="kt_modal_add_agency_cancel"
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
                <span class="btn-label">Crea Agenzia</span>
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
import { defineComponent, ref } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { countries } from "@/core/data/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
import {createAgency, Agency } from "@/core/data/agencies";
import { useAuthStore, type User } from "@/stores/auth";
import { useProvinces } from "@/composables/useProvinces";

export default defineComponent({
  name: "add-agency-modal",
  components: {},
  setup(_, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addAgencyModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const store = useAuthStore();
    
    // Usa il composable per le province
    const { provinces } = useProvinces();
    const formData = ref<any>({
      FirstName: "",
      LastName: "",
      Email: "",
      UserName: "",
      PhoneNumber: null,
      MobilePhone: null,
      Referent: "",
      Address: "",
      City: "",
      Province: "",
      ZipCode: "",
      Password: "",
      Color: "#00FFFF", // Default: Ciano
      // Dati Fiscali
      UserType: 1, // Default: Persona Fisica
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
      Province: [
        {
          required: true,
          message: "Provincia obligatoria",
          trigger: "change",
        },
      ],
      ZipCode: [
        {
          required: true,
          message: "CAP obligatorio",
          trigger: "change",
        },
      ],
      CompanyName: [
        {
          required: true,
          message: "Ragione Sociale obligatoria per Persona Giuridica",
          trigger: "change",
          validator: (rule: any, value: any, callback: any) => {
            if (formData.value.UserType === 2 && !value) {
              callback(new Error("Ragione Sociale obligatoria per Persona Giuridica"));
            } else {
              callback();
            }
          }
        },
      ],
      FiscalCode: [
        {
          required: true,
          message: "Codice Fiscale obligatorio per Persona Fisica",
          trigger: "change",
          validator: (rule: any, value: any, callback: any) => {
            if (formData.value.UserType === 1 && !value) {
              callback(new Error("Codice Fiscale obligatorio per Persona Fisica"));
            } else {
              callback();
            }
          }
        },
        {
          pattern: /^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/,
          message: "Codice Fiscale non valido",
          trigger: "blur",
        },
      ],
      VATNumber: [
        {
          required: true,
          message: "Partita IVA obligatoria per Persona Giuridica",
          trigger: "change",
          validator: (rule: any, value: any, callback: any) => {
            if (formData.value.UserType === 2 && !value) {
              callback(new Error("Partita IVA obligatoria per Persona Giuridica"));
            } else {
              callback();
            }
          }
        },
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

    const submit = async () => {
      if (!formRef.value) {
        return;
      }
      
      // Validazione manuale per raccogliere tutti gli errori
      const validationErrors: string[] = [];
      
      // Campi sempre obbligatori
      if (!formData.value.FirstName?.trim()) validationErrors.push("Nome");
      if (!formData.value.LastName?.trim()) validationErrors.push("Cognome");
      if (!formData.value.Email?.trim()) validationErrors.push("Email");
      if (!formData.value.PhoneNumber?.trim()) validationErrors.push("Telefono");
      if (!formData.value.Address?.trim()) validationErrors.push("Indirizzo");
      if (!formData.value.City?.trim()) validationErrors.push("Città");
      if (!formData.value.Province?.trim()) validationErrors.push("Provincia");
      if (!formData.value.ZipCode?.trim()) validationErrors.push("CAP");
      
      // Validazioni condizionali
      if (formData.value.UserType === 2 && !formData.value.CompanyName?.trim()) {
        validationErrors.push("Ragione Sociale (obbligatoria per Persona Giuridica)");
      }
      if (formData.value.UserType === 1 && !formData.value.FiscalCode?.trim()) {
        validationErrors.push("Codice Fiscale (obbligatorio per Persona Fisica)");
      }
      if (formData.value.UserType === 2 && !formData.value.VATNumber?.trim()) {
        validationErrors.push("Partita IVA (obbligatoria per Persona Giuridica)");
      }
      
      // Se ci sono errori di validazione, mostrali tutti insieme
      if (validationErrors.length > 0) {
        const errorMessage = `I seguenti campi sono obbligatori e devono essere compilati:\n\n• ${validationErrors.join('\n• ')}`;
        
        Swal.fire({
          title: "Campi Obbligatori Mancanti",
          text: errorMessage,
          icon: "warning",
          buttonsStyling: false,
          confirmButtonText: "Correggi i campi",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semibold btn-light-warning",
          },
        });
        return;
      }
      
      // Se la validazione passa, procedi con il salvataggio
      loading.value = true;
      
      formData.value.Role = "Agency"
      try {
      const result = await createAgency(formData.value);
      
      if (result) {
        Swal.fire({
          text: "Agenzia creata con successo!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Continua!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-primary",
          },
        }).then(function () {
          hideModal(addAgencyModalRef.value);
          emit('formAddSubmitted', formData.value);
          loading.value = false;
        });
      } else {
        loading.value = false;
        const error = store.errors;
        Swal.fire({
          text: error || "Errore durante la creazione dell'agenzia",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Riprova!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        });
        }
      } catch (error: any) {
        loading.value = false;
        
        // Gestione errore 429 (limite raggiunto) - seconda linea di difesa
        if (error?.response?.status === 429) {
          // Chiudi questa modale e emetti evento per mostrare UpgradeRequiredModal
          hideModal(addAgencyModalRef.value);
          emit('limitExceeded', error.response.data);
        } else {
          const errorMessage = error?.response?.data?.message || store.errors || "Errore durante la creazione dell'agenzia";
          Swal.fire({
            text: errorMessage,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Riprova!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semobold btn-light-danger",
            },
          });
        }
      }
    };

    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      addAgencyModalRef,
      getAssetPath,
      countries,
      colorOptions,
      selectColor,
      provinces,
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
