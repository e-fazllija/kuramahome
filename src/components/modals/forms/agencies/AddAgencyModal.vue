<template>
  <div
    class="modal fade"
    id="kt_modal_add_agency"
    ref="addAgencyModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <!--begin::Modal content-->
      <div class="modal-content card-palette modal-shell">
        <!--begin::Modal header-->
        <div class="modal-header card-palette-header modal-header-accent" id="kt_modal_add_agency_header">
          <!--begin::Modal title-->
          <div class="d-flex align-items-center">
            <div class="symbol symbol-40px me-3">
              <span class="symbol-label symbol-label-accent">
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
                <div class="row g-4 fv-row mb-7">
                  <div class="col-12 col-md-6">
                    <label class="form-label fw-bold text-gray-800 fs-6">Nome *</label>
                    <el-form-item prop="FirstName">
                      <el-input
                        v-model="formData.FirstName"
                        type="text"
                        placeholder="Inserisci il nome"
                        size="large"
                        @blur="capitalizeFirstName"
                      />
                    </el-form-item>
                  </div>
                  <div class="col-12 col-md-6">
                    <label class="form-label fw-bold text-gray-800 fs-6">Cognome *</label>
                    <el-form-item prop="LastName">
                      <el-input
                        v-model="formData.LastName"
                        type="text"
                        placeholder="Inserisci il cognome"
                        size="large"
                        @blur="capitalizeLastName"
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
                      size="large"
                      @blur="capitalizeCompanyName"
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
                <div class="row g-4 fv-row mb-7">
                  <div class="col-12 col-md-6">
                    <label class="form-label fw-bold text-gray-800 fs-6">Nome Referente *</label>
                    <el-form-item prop="FirstName">
                      <el-input
                        v-model="formData.FirstName"
                        type="text"
                        placeholder="Nome del referente"
                        size="large"
                      />
                    </el-form-item>
                  </div>
                  <div class="col-12 col-md-6">
                    <label class="form-label fw-bold text-gray-800 fs-6">Cognome Referente *</label>
                    <el-form-item prop="LastName">
                      <el-input
                        v-model="formData.LastName"
                        type="text"
                        placeholder="Cognome del referente"
                        size="large"
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
                    size="large"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

               <!--begin::Input group-->
               <div class="row g-4 fv-row mb-7">
                <div class="col-12 col-md-6">
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
                      size="large"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>

                <div class="col-12 col-md-6">
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
                      size="large"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
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
                    size="large"
                    @blur="capitalizeReferent"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Billing toggle-->
              <div
                class="fw-bold fs-4 rotate collapsible surface-tile mb-7 p-4"
                data-bs-toggle="collapse"
                href="#kt_modal_add_agency_billing_info"
                role="button"
                aria-expanded="false"
                aria-controls="kt_agent_view_details">
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
                      size="large"
                      @blur="capitalizeAddress"
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
                      <span class="path3"></span>
                      <span class="path4"></span>
                    </i>
                    <span class="required">Provincia</span>
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <select 
                    v-model="formData.Province"
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
                      <span class="path3"></span>
                      <span class="path4"></span>
                    </i>
                    <span class="required">Comune</span>
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <select class="form-select form-select-lg" v-model="formData.City">
                    <option value="">🏙️ Seleziona comune</option>
                    <option v-for="(city, index) in cities" :key="index" :value="city.Name">
                      {{ city.Name }}{{ city.CAP ? ` (${city.CAP})` : '' }}
                    </option>
                  </select>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="row g-4 mb-7">
                  <!--begin::Col-->
                  <div class="col-12 col-md-6 col-lg-4 fv-row">
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
                        size="large"
                      />
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                  <!--end::Col-->

                  <!--begin::Col-->
                  <div class="col-12 col-md-6 col-lg-8 fv-row">
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
                      <div class="dropdown">
                        <button 
                          class="btn btn-light btn-active-light-primary d-flex align-items-center justify-content-between w-100 p-3 border border-gray-300 rounded"
                          type="button" 
                          id="colorDropdownAgency"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <span class="d-flex align-items-center gap-3">
                            <span 
                              class="rounded border border-2 border-gray-300 shadow-sm"
                              :style="{ 
                                width: '40px', 
                                height: '40px', 
                                backgroundColor: formData.Color || '#e0e0e0'
                              }"
                            ></span>
                            <span class="fw-semibold text-gray-800">
                              {{ formData.Color ? 'Colore selezionato' : 'Seleziona un colore' }}
                            </span>
                          </span>
                          <i class="ki-duotone ki-down fs-3 text-gray-600">
                            <span class="path1"></span>
                            <span class="path2"></span>
                          </i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end w-100 p-3 shadow-lg" aria-labelledby="colorDropdownAgency" style="max-height: 400px; overflow-y: auto;">
                          <div class="row g-2">
                            <div 
                              v-for="color in colorOptions" 
                              :key="color.value"
                              class="col-3 col-md-4"
                            >
                              <button
                                type="button"
                                class="btn btn-outline btn-outline-dashed w-100 d-flex align-items-center justify-content-center p-2 rounded position-relative"
                                :class="formData.Color === color.value ? 'btn-active-light-primary border-primary shadow-sm' : 'border-gray-300'"
                                @click="selectColor(color.value)"
                                :title="color.value"
                              >
                                <span 
                                  class="rounded border border-2 border-gray-300 shadow-sm"
                                  :style="{ 
                                    width: '50px', 
                                    height: '50px', 
                                    backgroundColor: color.value
                                  }"
                                ></span>
                                <i v-if="formData.Color === color.value" class="ki-duotone ki-check fs-3 text-white position-absolute" style="z-index: 10;">
                                  <span class="path1"></span>
                                  <span class="path2"></span>
                                </i>
                              </button>
                            </div>
                          </div>
                        </ul>
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
                      size="large"
                      @input="formData.FiscalCode = formData.FiscalCode.toUpperCase()"
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
                      size="large"
                    />
                  </el-form-item>
                </div>
                <!--end::Input group-->

                <!--begin::Input group - PEC o Codice SDI-->
                <div class="fv-row mb-7">
                  <label class="form-label fw-bold text-gray-800 fs-6">PEC o Codice Destinatario SDI</label>
                  <div class="row g-4">
                    <div class="col-12 col-md-8">
                      <el-form-item prop="pec">
                        <el-input
                          v-model="formData.PEC"
                          type="email"
                          placeholder="pec@example.com"
                          size="large"
                        />
                      </el-form-item>
                    </div>
                    <div class="col-12 col-md-4">
                      <el-form-item prop="sdiCode">
                        <el-input
                          v-model="formData.SDICode"
                          type="text"
                          placeholder="SDI (7 caratteri)"
                          maxlength="7"
                          size="large"
                          @input="formData.SDICode = formData.SDICode.toUpperCase()"
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
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              type="reset"
              id="kt_modal_add_agency_cancel"
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
import { defineComponent, ref, watch } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { toTitleCase, smartTitleCase } from "@/core/helpers/text";
import { countries } from "@/core/data/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
import {createAgency, Agency } from "@/core/data/agencies";
import { useAuthStore, type User } from "@/stores/auth";
import { useProvinces } from "@/composables/useProvinces";
import { getCAPByCity, getAllCitiesByCAP, provinceCities, getCitiesByProvince, getProvinceCities } from "@/core/data/italian-geographic-data-loader";

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
    const cities = ref<Array<{Id: string, Name: string, CAP?: string}>>([]);
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
      Color: "#60A5FA", // Default: Blu morbido
      EmailConfirmed: true,
      // Dati Fiscali
      UserType: 1, // Default: Persona Fisica
      CompanyName: "",
      FiscalCode: "",
      VATNumber: "",
      PEC: "",
      SDICode: ""
    });

    // Solo colori leggeri/morbidi (no bianco, nero, rossi/verdi scuri)
    const colorOptions = ref([
      { name: "Azzurro chiaro", value: "#93C5FD" },
      { name: "Blu morbido", value: "#60A5FA" },
      { name: "Verde menta", value: "#6EE7B7" },
      { name: "Verde salvia", value: "#86EFAC" },
      { name: "Lavanda", value: "#C4B5FD" },
      { name: "Viola chiaro", value: "#E9D5FF" },
      { name: "Rosa chiaro", value: "#FBCFE8" },
      { name: "Pesca", value: "#FDBA74" },
      { name: "Giallo chiaro", value: "#FDE68A" },
      { name: "Turchese chiaro", value: "#99F6E4" },
      { name: "Salmone", value: "#FDA4AF" },
      { name: "Celeste", value: "#7DD3FC" }
    ]);

    // Funzione per selezionare un colore
    const selectColor = (color: string) => {
      formData.value.Color = color;
      // Chiudi il dropdown dopo la selezione
      const dropdownElement = document.getElementById('colorDropdownAgency');
      if (dropdownElement) {
        const dropdown = (window as any).bootstrap?.Dropdown?.getInstance(dropdownElement);
        if (dropdown) {
          dropdown.hide();
        }
      }
    };

    // Watcher per caricare le città quando si seleziona la provincia
    watch(
      () => formData.value.Province,
      async (newProvince) => {
        // Assicurati che i dati siano caricati
        await getProvinceCities();
        
        if (newProvince) {
          const loadedCities = getCitiesByProvince(newProvince);
          if (loadedCities && loadedCities.length > 0) {
            cities.value = loadedCities;
          } else {
            cities.value = provinceCities[newProvince] || [];
          }
          formData.value.City = ""; // Reset città
          formData.value.ZipCode = ""; // Reset CAP
        } else {
          cities.value = [];
          formData.value.City = "";
          formData.value.ZipCode = "";
        }
      }
    );

    // Watcher per auto-compilare il CAP quando si seleziona il comune
    watch(
      () => formData.value.City,
      (newCity) => {
        if (newCity && formData.value.Province) {
          const cap = getCAPByCity(formData.value.Province, newCity);
          if (cap && formData.value.ZipCode !== cap) {
            formData.value.ZipCode = cap;
          }
        }
      }
    );

    // Watcher per auto-compilare il comune quando si modifica il CAP
    // Se più comuni condividono lo stesso CAP, NON sovrascrivere City
    watch(
      () => formData.value.ZipCode,
      (newCAP) => {
        if (newCAP && formData.value.Province) {
          const citiesWithCAP = getAllCitiesByCAP(formData.value.Province, newCAP);
          if (citiesWithCAP.length === 1 && formData.value.City !== citiesWithCAP[0]) {
            formData.value.City = citiesWithCAP[0];
          }
        }
      }
    );

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

    // Funzioni per capitalizzare i campi quando l'utente perde il focus
    const capitalizeFirstName = () => {
      if (formData.value.FirstName && typeof formData.value.FirstName === 'string' && formData.value.FirstName.trim()) {
        formData.value.FirstName = toTitleCase(formData.value.FirstName);
      }
    };

    const capitalizeLastName = () => {
      if (formData.value.LastName && typeof formData.value.LastName === 'string' && formData.value.LastName.trim()) {
        formData.value.LastName = toTitleCase(formData.value.LastName);
      }
    };

    const capitalizeCompanyName = () => {
      if (formData.value.CompanyName && typeof formData.value.CompanyName === 'string' && formData.value.CompanyName.trim()) {
        formData.value.CompanyName = toTitleCase(formData.value.CompanyName);
      }
    };

    const capitalizeReferent = () => {
      if (formData.value.Referent && typeof formData.value.Referent === 'string' && formData.value.Referent.trim()) {
        formData.value.Referent = toTitleCase(formData.value.Referent);
      }
    };

    const capitalizeAddress = () => {
      if (formData.value.Address && typeof formData.value.Address === 'string' && formData.value.Address.trim()) {
        formData.value.Address = smartTitleCase(formData.value.Address);
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
      cities,
      capitalizeFirstName,
      capitalizeLastName,
      capitalizeCompanyName,
      capitalizeReferent,
      capitalizeAddress,
    };
  },
});
</script>


<!-- Tutti gli stili sono stati spostati in file CSS dedicati -->

