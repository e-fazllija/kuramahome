<template>
  <div class="modal fade" id="kt_modal_update_agent" ref="updateAgentModalRef" tabindex="-1" aria-hidden="true">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <!--begin::Modal content-->
      <div class="modal-content card-palette modal-shell">
        <!--begin::Modal header-->
        <div class="modal-header card-palette-header modal-header-accent" id="kt_modal_update_agent_header">
          <!--begin::Modal title-->
          <div class="d-flex align-items-center">
            <div class="symbol symbol-40px me-3">
              <span class="symbol-label symbol-label-accent">
                <i class="ki-duotone ki-user fs-2 text-white">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </span>
            </div>
            <div>
              <h2 class="fw-bold m-0 text-palette-primary fs-3">👤 Aggiorna Agente</h2>
              <span class="text-palette-secondary fs-7 fw-semibold">Modifica i dati dell'agente selezionato</span>
            </div>
          </div>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div id="kt_modal_update_agent_close" data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary">
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
            <div class="scroll-y me-n7 pe-7" id="kt_modal_add_agent_scroll" data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_agent_header"
              data-kt-scroll-wrappers="#kt_modal_add_agent_scroll" data-kt-scroll-offset="300px">

              <!--begin::Input group - Agenzia (solo Admin)-->
              <div v-if="user.Role === 'Admin'" class="fv-row mb-8">
                <label class="form-label fw-bold text-gray-900 fs-5 mb-4">
                  <i class="ki-duotone ki-office-bag fs-2 text-primary me-2">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                    <span class="path4"></span>
                  </i>
                  Agenzia *
                </label>
                <select 
                  v-model="formData.AgencyId"
                  class="form-select form-select-lg"
                  name="agency"
                  required
                >
                  <option value="">🏢 Seleziona agenzia</option>
                  <option v-for="agency in agenciesList" :key="agency.Id" :value="agency.Id">
                    {{ agency.CompanyName || `${agency.FirstName} ${agency.LastName}` }}
                  </option>
                </select>
              </div>
              <!--end::Input group-->

               <!--begin::Input group-->
               <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-3 text-gray-800">
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

              <!--begin::Input group-->
              <div class="row g-4 fv-row mb-7">
                <div class="col-12 col-md-6">
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
                    <el-input v-model="formData.FirstName" type="text" placeholder="Inserisci il nome dell'agente" size="large" @blur="capitalizeFirstName" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <div class="col-12 col-md-6">
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
                    <el-input v-model="formData.LastName" type="text" placeholder="Inserisci il cognome" size="large" @blur="capitalizeLastName" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
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
                  <el-input v-model="formData.Email" placeholder="esempio@agente.com" size="large" />
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
                    <i class="fas fa-exclamation-circle ms-1 fs-7 text-warning" data-bs-toggle="tooltip"
                      title="numero di telefono non valido"></i>
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="PhoneNumber">
                    <el-input v-model="formData.PhoneNumber" type="tel" placeholder="0123456789" size="large" />
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
                    <i class="fas fa-exclamation-circle ms-1 fs-7 text-warning" data-bs-toggle="tooltip"
                      title="numero di telefono non valido"></i>
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="MobilePhone">
                    <el-input v-model="formData.MobilePhone" type="tel" placeholder="3331234567" size="large" />
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
                  <el-input v-model="formData.Referent" type="text" placeholder="Nome del referente" size="large" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Billing toggle-->
              <div class="fw-bold fs-4 rotate collapsible surface-tile mb-7 p-4" data-bs-toggle="collapse"
                href="#kt_modal_add_agent_billing_info" role="button" aria-expanded="false"
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
              <div id="kt_modal_add_agent_billing_info" class="collapse show">
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
                    <el-input v-model="formData.Address" placeholder="Via, numero civico" size="large" @blur="capitalizeAddress" />
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
                <div class="row g-9 mb-7">
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
                      <div class="dropdown">
                        <button 
                          class="btn btn-light btn-active-light-primary d-flex align-items-center justify-content-between w-100 p-3 border border-gray-300 rounded"
                          type="button" 
                          id="colorDropdownAgentUpdate"
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
                        <ul class="dropdown-menu dropdown-menu-end w-100 p-3 shadow-lg" aria-labelledby="colorDropdownAgentUpdate" style="max-height: 400px; overflow-y: auto;">
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
                  <i class="ki-duotone ki-key fs-2 text-primary me-2">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                    <span class="path4"></span>
                  </i>
                  Configurazione Idealista
                </span>
              </div>
              <!--end::Separator-->

              <!--begin::Notice-->
              <div class="notice d-flex bg-light-warning rounded border-warning border border-dashed mb-8 p-6">
                <i class="ki-duotone ki-information-5 fs-2tx text-warning me-4">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                </i>
                <div class="d-flex flex-column">
                  <h5 class="fw-bold text-gray-900 mb-2">Informazioni Chiavi Idealista</h5>
                  <span class="text-gray-700 fs-6">
                    I dati sono reperibili unicamente da Idealista. Sono obbligatorie entrambe le informazioni (Client ID e Client Secret) per poter procedere con la sincronizzazione degli immobili.
                  </span>
                </div>
              </div>
              <!--end::Notice-->

              <!--begin::Configurazione Idealista-->
              <div>
                <!--begin::Input group - Client ID-->
                <div class="fv-row mb-7">
                  <label class="form-label fw-bold text-gray-800 fs-6">Client ID</label>
                  <el-form-item prop="clientId">
                    <div class="d-flex align-items-center">
                      <el-input
                        v-model="formData.ClientId"
                        :type="showClientId ? 'text' : 'password'"
                        placeholder="Client ID"
                        size="large"
                        class="me-3"
                      />
                      <button 
                        type="button" 
                        class="btn btn-icon btn-light btn-sm flex-shrink-0"
                        @click="showClientId = !showClientId"
                      >
                        <i v-if="showClientId" class="ki-duotone ki-eye-slash fs-2">
                          <span class="path1"></span>
                          <span class="path2"></span>
                          <span class="path3"></span>
                          <span class="path4"></span>
                        </i>
                        <i v-else class="ki-duotone ki-eye fs-2">
                          <span class="path1"></span>
                          <span class="path2"></span>
                          <span class="path3"></span>
                        </i>
                      </button>
                    </div>
                  </el-form-item>
                </div>
                <!--end::Input group-->

                <!--begin::Input group - Client Secret-->
                <div class="fv-row mb-7">
                  <label class="form-label fw-bold text-gray-800 fs-6">Client Secret</label>
                  <el-form-item prop="clientSecret">
                    <div class="d-flex align-items-center">
                      <el-input
                        v-model="formData.ClientSecret"
                        :type="showClientSecret ? 'text' : 'password'"
                        placeholder="Client Secret"
                        size="large"
                        class="me-3"
                      />
                      <button 
                        type="button" 
                        class="btn btn-icon btn-light btn-sm flex-shrink-0"
                        @click="showClientSecret = !showClientSecret"
                      >
                        <i v-if="showClientSecret" class="ki-duotone ki-eye-slash fs-2">
                          <span class="path1"></span>
                          <span class="path2"></span>
                          <span class="path3"></span>
                          <span class="path4"></span>
                        </i>
                        <i v-else class="ki-duotone ki-eye fs-2">
                          <span class="path1"></span>
                          <span class="path2"></span>
                          <span class="path3"></span>
                        </i>
                      </button>
                    </div>
                  </el-form-item>
                </div>
                <!--end::Input group-->

                <!--begin::Input group - Sincronizzazione Idealista-->
                <div class="fv-row mb-7">
                  <label class="form-label fw-bold text-gray-800 fs-6">
                    Sincronizzazione Idealista
                    <i 
                      class="fas fa-exclamation-circle ms-1 fs-7 text-primary" 
                      data-bs-toggle="tooltip" 
                      data-bs-placement="top"
                      title="Tutte le azioni apportate sugli immobili verranno apportate anche su Idealista"
                    ></i>
                  </label>
                  <el-form-item prop="syncToIdealista">
                    <div class="form-check form-switch form-check-custom form-check-solid">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="sync-to-idealista-update"
                        v-model="formData.SyncToIdealista"
                        @change="handleSyncChange"
                      />
                      <label class="form-check-label ms-3 fw-semibold" for="sync-to-idealista-update">
                        Attiva sincronizzazione con Idealista
                      </label>
                    </div>
                  </el-form-item>
                </div>
                <!--end::Input group-->
              </div>
              <!--end::Configurazione Idealista-->

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
                <!--begin::Input group - Ragione Sociale-->
                <div class="fv-row mb-7">
                  <label class="form-label fw-bold text-gray-800 fs-6">Ragione Sociale</label>
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
              id="kt_modal_update_agent_cancel" 
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

            <!--begin::Button Elimina (Admin: sempre; Agency: solo per i propri agenti)-->
            <button 
              v-if="canDeleteAgentInModal" 
              type="button" 
              @click="deleteItem" 
              class="btn btn-danger me-3"
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

            <!--begin::Button Salva (nascosto se l'utente non può modificare l'agente, es. Agency su agente di altra agenzia)-->
            <button 
              v-if="canEditAgentInModal"
              :data-kt-indicator="loading ? 'on' : null" 
              class="btn btn-primary" 
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
import { toTitleCase, smartTitleCase } from "@/core/helpers/text";
import { defineComponent, ref, watch, nextTick, computed } from "vue";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Tooltip } from "bootstrap";
import { updateAgent, getAgent, deleteAgent } from "@/core/data/agents";
import { useAuthStore, type User } from "@/stores/auth";
import { useProvinces } from "@/composables/useProvinces";
import { getCAPByCity, getCityByCAP, provinceCities } from "@/core/data/italian-geographic-data-loader";
import { getAgencies, type Agency } from "@/core/data/agencies";

export default defineComponent({
  name: "update-agent-modal",
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
    const updateAgentModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const store = useAuthStore();
    const user = store.user;
    
    // Usa il composable per le province
    const { provinces } = useProvinces();
    const cities = ref<Array<{Id: string, Name: string, CAP?: string}>>([]);
    const agenciesList = ref<Array<Agency>>([]);
    const showClientId = ref(false);
    const showClientSecret = ref(false);
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
      Province: "",
      Color: "#60A5FA", // Default: Blu morbido
      AgencyId: "",
      AdminId: "", // Campo per compatibilità con backend
      EmailConfirmed: false,
      UpdateDate: new Date(),
      // Dati Fiscali
      UserType: 1, // Default: Persona Fisica
      CompanyName: "",
      FiscalCode: "",
      VATNumber: "",
      PEC: "",
      SDICode: "",
      // Configurazione Idealista
      ClientId: "",
      ClientSecret: "",
      SyncToIdealista: false
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
      const dropdownElement = document.getElementById('colorDropdownAgentUpdate');
      if (dropdownElement) {
        const dropdown = (window as any).bootstrap?.Dropdown?.getInstance(dropdownElement);
        if (dropdown) {
          dropdown.hide();
        }
      }
    };

    // Carica le agenzie se l'utente è Admin
    const loadAgencies = async () => {
      if (user?.Role === "Admin") {
        try {
          const agencies = await getAgencies("");
          agenciesList.value = agencies;
        } catch (error) {
          console.error("Errore nel caricamento delle agenzie:", error);
        }
      }
    };

    watch(() => props.Id, async (first, second) => {
      if (first) {
        const agentData = await getAgent(props.Id);
        formData.value = agentData;
        
        // Imposta AgencyId da AdminId se presente
        if (agentData.AdminId && !formData.value.AgencyId) {
          formData.value.AgencyId = agentData.AdminId;
        }
        
        // Carica le città della provincia esistente
        if (formData.value.Province && provinceCities[formData.value.Province]) {
          cities.value = provinceCities[formData.value.Province];
        }
      }
      else {
        formData.value = null;
      }
    })

    // Carica agenzie al mount
    loadAgencies();

    // Watcher per caricare le città quando si seleziona la provincia
    watch(
      () => formData.value.Province,
      (newProvince) => {
        if (newProvince && provinceCities[newProvince]) {
          cities.value = provinceCities[newProvince];
        } else {
          cities.value = [];
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

    const submit = () => {
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
      
      // Validazioni condizionali
      if (user?.Role === "Admin" && !formData.value.AgencyId?.trim()) {
        validationErrors.push("Agenzia (obbligatoria per Admin)");
      }
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
      
      // Imposta AgencyId se non è Admin (usa l'ID dell'utente corrente)
      if (user?.Role !== "Admin") {
        formData.value.AgencyId = user?.Id || "";
      }
      
      // Imposta AdminId da AgencyId per compatibilità con backend (UserUpdateModel usa AdminId)
      if (formData.value.AgencyId) {
        formData.value.AdminId = formData.value.AgencyId;
      }
      
      updateAgent(formData.value).then(() => {
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
            hideModal(updateAgentModalRef.value);
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
      });
    };

     const deleteItem = async () => {
      const displayName = `${formData.value.FirstName ?? ""} ${formData.value.LastName ?? ""}`.trim() || formData.value.Email || `Agente #${formData.value.Id}`;

      const result = await Swal.fire({
        title: "Elimina agente",
        html: `Stai per eliminare definitivamente questo agente e tutti i dati collegati ad esso. L'operazione è irreversibile.<br><br>Per confermare digita esattamente <strong>${displayName}</strong>.`,
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
        await deleteAgent(formData.value.Id);
        
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
            hideModal(updateAgentModalRef.value);
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
      } catch (error: any) {
        loading.value = false;
        const errorMessage = error?.data?.Message || error?.response?.data?.Message || store.errors || "Si è verificato un errore durante l'eliminazione dell'agente.";
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
      }
    };

    // Handler per il cambio del checkbox di sincronizzazione
    const handleSyncChange = () => {
      nextTick(() => {
        if (formData.value.SyncToIdealista) {
          const clientIdEmpty = !formData.value.ClientId || !formData.value.ClientId.trim();
          const clientSecretEmpty = !formData.value.ClientSecret || !formData.value.ClientSecret.trim();
          
          if (clientIdEmpty || clientSecretEmpty) {
            formData.value.SyncToIdealista = false;
            
            Swal.fire({
              text: "Per attivare la sincronizzazione con Idealista è necessario compilare entrambi i campi: Client ID e Client Secret",
              icon: "warning",
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

    // Inizializza i tooltip quando il modal viene aperto
    watch(() => props.Id, async () => {
      if (props.Id) {
        await nextTick();
        const tooltipTriggerList = Array.from(
          document.querySelectorAll("[data-bs-toggle='tooltip']")
        ) as HTMLElement[];
        tooltipTriggerList.forEach((tooltipTriggerEl) => {
          new Tooltip(tooltipTriggerEl);
        });
      }
    });

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

    const capitalizeAddress = () => {
      if (formData.value.Address && typeof formData.value.Address === 'string' && formData.value.Address.trim()) {
        formData.value.Address = smartTitleCase(formData.value.Address);
      }
    };

    // Admin: sempre; Agency: solo se l'agente appartiene alla propria agenzia (non si può modificare/eliminare agente di altra agenzia)
    const canModifyAgentInModal = computed(() => {
      if (user?.Role === "Admin") return true;
      if (user?.Role === "Agency") {
        const agentAgencyId = formData.value?.AdminId ?? formData.value?.AgencyId ?? "";
        return agentAgencyId === (user?.Id ?? "");
      }
      return false;
    });

    return {
      formData,
      rules,
      submit,
      deleteItem,
      canDeleteAgentInModal: canModifyAgentInModal,
      canEditAgentInModal: canModifyAgentInModal,
      formRef,
      loading,
      updateAgentModalRef,
      getAssetPath,
      user,
      colorOptions,
      selectColor,
      provinces,
      cities,
      agenciesList,
      showClientId,
      showClientSecret,
      handleSyncChange,
      capitalizeFirstName,
      capitalizeLastName,
      capitalizeCompanyName,
      capitalizeAddress
    };
  },
});
</script>


<!-- Tutti gli stili sono stati spostati in file CSS dedicati -->