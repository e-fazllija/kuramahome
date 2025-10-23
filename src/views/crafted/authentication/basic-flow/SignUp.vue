<template>
  <div class="w-100">
      <!--begin::Heading-->
      <div class="mb-10 text-center">
        <!--begin::Title-->
      <h1 class="text-gray-800 mb-3">Crea un Account</h1>
        <!--end::Title-->

        <!--begin::Link-->
      <div class="text-muted fw-semobold fs-6">
        Hai già un account?
        <router-link to="/sign-in" class="link-primary fw-bold ms-1">
          Accedi qui
          </router-link>
        </div>
        <!--end::Link-->
      </div>
      <!--end::Heading-->

    <!--begin::Stepper-->
    <div class="stepper-wrapper mb-10">
      <div class="stepper-item" :class="{ 'active': currentStep >= 1, 'completed': currentStep > 1 }">
        <div class="step-counter">
          <i v-if="currentStep > 1" class="ki-duotone ki-check fs-2 text-white">
            <span class="path1"></span>
            <span class="path2"></span>
          </i>
          <span v-else>1</span>
        </div>
        <div class="step-name">
          <span class="fw-bold">Dati Personali</span>
          <span class="text-muted fs-8 d-block">Nome, Email, Tipo</span>
        </div>
      </div>
      <div class="stepper-item" :class="{ 'active': currentStep >= 2, 'completed': currentStep > 2 }">
        <div class="step-counter">
          <i v-if="currentStep > 2" class="ki-duotone ki-check fs-2 text-white">
            <span class="path1"></span>
            <span class="path2"></span>
          </i>
          <span v-else>2</span>
        </div>
        <div class="step-name">
          <span class="fw-bold">Indirizzo</span>
          <span class="text-muted fs-8 d-block">Residenza e Fisco</span>
        </div>
      </div>
      <div class="stepper-item" :class="{ 'active': currentStep >= 3, 'completed': currentStep > 3 }">
        <div class="step-counter">
          <i v-if="currentStep > 3" class="ki-duotone ki-check fs-2 text-white">
            <span class="path1"></span>
            <span class="path2"></span>
          </i>
          <span v-else>3</span>
        </div>
        <div class="step-name">
          <span class="fw-bold">Sicurezza</span>
          <span class="text-muted fs-8 d-block">Password</span>
        </div>
      </div>
    </div>
    <!--end::Stepper-->

    <!--begin::Form-->
    <VForm
      class="form w-100"
      @submit="handleSubmit"
      :validation-schema="currentValidationSchema"
      v-slot="{ errors }"
      ref="formRef"
    >

      <!--begin::Step 1-->
      <div v-show="currentStep === 1">
        <div class="mb-10 text-center">
          <div class="symbol symbol-75px mx-auto mb-5">
            <span class="symbol-label" style="background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%); box-shadow: 0 4px 20px rgba(54, 153, 255, 0.3);">
              <i class="ki-duotone ki-profile-user fs-2x text-white">
                <span class="path1"></span>
                <span class="path2"></span>
                <span class="path3"></span>
                <span class="path4"></span>
              </i>
            </span>
          </div>
          <h3 class="text-gray-900 fw-bolder mb-3">Informazioni Personali</h3>
          <p class="text-muted fw-semibold fs-5">Inserisci i tuoi dati personali</p>
        </div>

        <!--begin::Input group - Tipo Utente (PRIMO CAMPO)-->
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
              <label class="btn btn-outline btn-outline-dashed btn-active-light-primary d-flex flex-column align-items-center p-5 h-100 w-100" :class="{ 'active': formData.userType === '1' }">
                <Field
                  v-model="formData.userType"
                  class="btn-check"
                  type="radio"
                  name="userType"
                  value="1"
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
              <label class="btn btn-outline btn-outline-dashed btn-active-light-primary d-flex flex-column align-items-center p-5 h-100 w-100" :class="{ 'active': formData.userType === '2' }">
                <Field
                  v-model="formData.userType"
                  class="btn-check"
                  type="radio"
                  name="userType"
                  value="2"
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
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="userType" />
            </div>
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Campi PERSONA FISICA-->
        <div v-if="formData.userType === '1'">
          <!--begin::Input group - Nome e Cognome-->
          <div class="row fv-row mb-7">
            <div class="col-xl-6">
              <label class="form-label fw-bold text-gray-800 fs-6">Nome *</label>
              <Field
                v-model="formData.name"
                class="form-control form-control-lg form-control-solid"
                type="text"
                name="name"
                autocomplete="off"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="name" />
                </div>
              </div>
            </div>
            <div class="col-xl-6">
              <label class="form-label fw-bold text-gray-800 fs-6">Cognome *</label>
              <Field
                v-model="formData.lastName"
                class="form-control form-control-lg form-control-solid"
                type="text"
                name="lastName"
                autocomplete="off"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="lastName" />
                </div>
              </div>
            </div>
          </div>
          <!--end::Input group-->

          <!--begin::Input group - Email-->
          <div class="fv-row mb-7">
            <label class="form-label fw-bold text-gray-800 fs-6">Email *</label>
            <Field
              v-model="formData.email"
              class="form-control form-control-lg form-control-solid"
              type="email"
              name="email"
              autocomplete="off"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="email" />
              </div>
            </div>
          </div>
          <!--end::Input group-->

          <!--begin::Input group - Telefono-->
          <div class="fv-row mb-7">
            <label class="form-label fw-bold text-gray-800 fs-6">Telefono</label>
            <Field
              v-model="formData.phone"
              class="form-control form-control-lg form-control-solid"
              type="tel"
              name="phone"
              autocomplete="off"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="phone" />
              </div>
            </div>
          </div>
          <!--end::Input group-->
        </div>
        <!--end::Campi Persona Fisica-->

        <!--begin::Campi PERSONA GIURIDICA-->
        <div v-if="formData.userType === '2'">
          <!--begin::Input group - Ragione Sociale-->
          <div class="fv-row mb-7">
            <label class="form-label fw-bold text-gray-800 fs-6">Ragione Sociale *</label>
            <Field
              v-model="formData.companyName"
              class="form-control form-control-lg form-control-solid"
              type="text"
              name="companyName"
              autocomplete="off"
              placeholder="Es. Rossi Immobiliare S.r.l."
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="companyName" />
              </div>
            </div>
          </div>
          <!--end::Input group-->

          <!--begin::Input group - Email Aziendale-->
          <div class="fv-row mb-7">
            <label class="form-label fw-bold text-gray-800 fs-6">Email Aziendale *</label>
            <Field
              v-model="formData.email"
              class="form-control form-control-lg form-control-solid"
              type="email"
              name="email"
              autocomplete="off"
              placeholder="info@azienda.it"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="email" />
              </div>
            </div>
          </div>
          <!--end::Input group-->

          <!--begin::Input group - Telefono-->
          <div class="fv-row mb-7">
            <label class="form-label fw-bold text-gray-800 fs-6">Telefono Aziendale</label>
            <Field
              v-model="formData.phone"
              class="form-control form-control-lg form-control-solid"
              type="tel"
              name="phone"
              autocomplete="off"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="phone" />
              </div>
            </div>
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
              <Field
                v-model="formData.name"
                class="form-control form-control-lg form-control-solid"
                type="text"
                name="name"
                autocomplete="off"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="name" />
                </div>
              </div>
            </div>
            <div class="col-xl-6">
              <label class="form-label fw-bold text-gray-800 fs-6">Cognome Referente *</label>
              <Field
                v-model="formData.lastName"
                class="form-control form-control-lg form-control-solid"
                type="text"
                name="lastName"
                autocomplete="off"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="lastName" />
                </div>
              </div>
            </div>
          </div>
          <!--end::Input group-->
        </div>
        <!--end::Campi Persona Giuridica-->
      </div>
      <!--end::Step 1-->

      <!--begin::Step 2-->
      <div v-show="currentStep === 2">
        <div class="mb-10 text-center">
          <div class="symbol symbol-75px mx-auto mb-5">
            <span class="symbol-label" style="background: linear-gradient(135deg, #50cd89 0%, #0bb7af 100%); box-shadow: 0 4px 20px rgba(80, 205, 137, 0.3);">
              <i class="ki-duotone ki-geolocation fs-2x text-white">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
            </span>
          </div>
          <h3 class="text-gray-900 fw-bolder mb-3">Indirizzo e Dati Fiscali</h3>
          <p class="text-muted fw-semibold fs-5">Inserisci i tuoi dati di residenza e fiscali</p>
        </div>

        <!--begin::Input group - Indirizzo-->
        <div class="fv-row mb-7">
          <label class="form-label fw-bold text-gray-800 fs-6">Indirizzo *</label>
          <Field
            v-model="formData.address"
            class="form-control form-control-lg form-control-solid"
            type="text"
            name="address"
            autocomplete="off"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="address" />
            </div>
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Input group - Città e CAP-->
        <div class="row fv-row mb-7">
          <div class="col-xl-6">
            <label class="form-label fw-bold text-gray-800 fs-6">Città *</label>
            <Field
              v-model="formData.city"
              class="form-control form-control-lg form-control-solid"
              type="text"
              name="city"
              autocomplete="off"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="city" />
              </div>
            </div>
          </div>
          <div class="col-xl-6">
            <label class="form-label fw-bold text-gray-800 fs-6">CAP *</label>
            <Field
              v-model="formData.zipCode"
              class="form-control form-control-lg form-control-solid"
              type="text"
              name="zipCode"
              autocomplete="off"
              maxlength="10"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="zipCode" />
              </div>
            </div>
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Input group - Provincia-->
        <div class="fv-row mb-7">
          <label class="form-label fw-bold text-gray-800 fs-6">Provincia</label>
          <Field
            v-model="formData.province"
            class="form-control form-control-lg form-control-solid"
            type="text"
            name="province"
            autocomplete="off"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="province" />
            </div>
          </div>
        </div>
        <!--end::Input group-->

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
        <div v-if="formData.userType === '1'">
          <!--begin::Input group - Codice Fiscale-->
          <div class="fv-row mb-7">
            <label class="form-label fw-bold text-gray-800 fs-6">Codice Fiscale</label>
            <Field
              v-model="formData.fiscalCode"
              class="form-control form-control-lg form-control-solid"
              type="text"
              name="fiscalCode"
              autocomplete="off"
              maxlength="16"
              placeholder="16 caratteri"
              @input="formData.fiscalCode = formData.fiscalCode.toUpperCase()"
              style="text-transform: uppercase;"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="fiscalCode" />
              </div>
            </div>
          </div>
          <!--end::Input group-->
        </div>
        <!--end::Campi Persona Fisica-->

        <!--begin::Campi PERSONA GIURIDICA-->
        <div v-if="formData.userType === '2'">
          <!--begin::Input group - Partita IVA-->
          <div class="fv-row mb-7">
            <label class="form-label fw-bold text-gray-800 fs-6">Partita IVA</label>
            <Field
              v-model="formData.vatNumber"
              class="form-control form-control-lg form-control-solid"
              type="text"
              name="vatNumber"
              autocomplete="off"
              maxlength="11"
              placeholder="11 cifre"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="vatNumber" />
              </div>
            </div>
          </div>
          <!--end::Input group-->

          <!--begin::Input group - PEC o Codice SDI-->
          <div class="fv-row mb-7">
            <label class="form-label fw-bold text-gray-800 fs-6">PEC o Codice Destinatario SDI</label>
            <div class="row">
              <div class="col-xl-8">
                <Field
                  v-model="formData.pec"
                  class="form-control form-control-lg form-control-solid"
                  type="email"
                  name="pec"
                  placeholder="pec@example.com"
                  autocomplete="off"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="pec" />
                  </div>
                </div>
              </div>
              <div class="col-xl-4">
                <Field
                  v-model="formData.sdiCode"
                  class="form-control form-control-lg form-control-solid"
                  type="text"
                  name="sdiCode"
                  placeholder="SDI (7 caratteri)"
                  autocomplete="off"
                  maxlength="7"
                  @input="formData.sdiCode = formData.sdiCode.toUpperCase()"
                  style="text-transform: uppercase;"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="sdiCode" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--end::Input group-->
        </div>
        <!--end::Campi Persona Giuridica-->
      </div>
      <!--end::Step 2-->

      <!--begin::Step 3-->
      <div v-show="currentStep === 3">
        <div class="mb-10 text-center">
          <div class="symbol symbol-75px mx-auto mb-5">
            <span class="symbol-label" style="background: linear-gradient(135deg, #f1416c 0%, #ff6b9d 100%); box-shadow: 0 4px 20px rgba(241, 65, 108, 0.3);">
              <i class="ki-duotone ki-lock fs-2x text-white">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
            </span>
          </div>
          <h3 class="text-gray-900 fw-bolder mb-3">Sicurezza</h3>
          <p class="text-muted fw-semibold fs-5">Crea una password sicura per il tuo account</p>
        </div>

        <!--begin::Input group-->
        <div class="mb-7 fv-row" data-kt-password-meter="true">
        <!--begin::Wrapper-->
        <div class="mb-1">
          <!--begin::Label-->
            <label class="form-label fw-bold text-gray-800 fs-6">Password *</label>
          <!--end::Label-->

          <!--begin::Input wrapper-->
          <div class="position-relative mb-3">
            <Field
                v-model="formData.password"
              class="form-control form-control-lg form-control-solid"
              type="password"
              name="password"
              autocomplete="off"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="password" />
              </div>
            </div>
          </div>
          <!--end::Input wrapper-->
          <!--begin::Meter-->
          <div
            class="d-flex align-items-center mb-3"
            data-kt-password-meter-control="highlight"
          >
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
            ></div>
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
            ></div>
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
            ></div>
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px"
            ></div>
          </div>
          <!--end::Meter-->
        </div>
        <!--end::Wrapper-->
        <!--begin::Hint-->
        <div class="alert alert-dismissible bg-light-info d-flex flex-column flex-sm-row p-5 mb-0">
          <i class="ki-duotone ki-shield-tick fs-2hx text-info me-4 mb-5 mb-sm-0">
            <span class="path1"></span>
            <span class="path2"></span>
          </i>
          <div class="d-flex flex-column pe-0 pe-sm-10">
            <h5 class="fw-bold mb-2">Requisiti Password</h5>
            <span class="text-gray-700 fs-7">
              <i class="ki-duotone ki-check-circle fs-5 text-success me-1">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              Almeno 8 caratteri
            </span>
            <span class="text-gray-700 fs-7">
              <i class="ki-duotone ki-check-circle fs-5 text-success me-1">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              Almeno una lettera maiuscola (A-Z)
            </span>
            <span class="text-gray-700 fs-7">
              <i class="ki-duotone ki-check-circle fs-5 text-success me-1">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              Almeno un numero (0-9)
            </span>
            <span class="text-gray-700 fs-7">
              <i class="ki-duotone ki-check-circle fs-5 text-success me-1">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              Almeno un carattere speciale (!@#$%^&*...)
            </span>
          </div>
        </div>
        <!--end::Hint-->
      </div>
      <!--end::Input group--->

      <!--begin::Input group-->
        <div class="fv-row mb-7">
          <label class="form-label fw-bold text-gray-800 fs-6">Conferma Password *</label>
        <Field
            v-model="formData.password_confirmation"
          class="form-control form-control-lg form-control-solid"
          type="password"
          name="password_confirmation"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="password_confirmation" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
        <div class="fv-row mb-7">
          <div class="notice d-flex bg-light-primary rounded border-primary border border-dashed p-6">
            <i class="ki-duotone ki-information-5 fs-2tx text-primary me-4">
              <span class="path1"></span>
              <span class="path2"></span>
              <span class="path3"></span>
            </i>
            <div class="d-flex flex-stack flex-grow-1">
              <div class="fw-semobold">
                <label class="form-check form-check-custom form-check-solid mb-0">
                  <Field
                    v-model="formData.toc"
                    class="form-check-input"
                    type="checkbox"
                    name="toc"
                    value="1"
                  />
                  <span class="form-check-label text-gray-700 fs-6 ms-2">
                    Accetto i
                    <a href="#" class="link-primary fw-bold">Termini e Condizioni</a>, la
                    <router-link to="/privacy-policy" target="_blank" class="link-primary fw-bold">Privacy Policy</router-link> e la
                    <router-link to="/cookie-policy" target="_blank" class="link-primary fw-bold">Cookie Policy</router-link> *
                  </span>
                </label>
                <div class="fv-plugins-message-container mt-2">
                  <div class="fv-help-block">
                    <ErrorMessage name="toc" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--end::Input group-->
      </div>
      <!--end::Step 3-->

      <!--begin::Actions-->
      <div class="d-flex justify-content-between pt-5">
        <button
          v-if="currentStep > 1"
          type="button"
          @click="previousStep"
          class="btn btn-lg btn-light-primary fw-bold"
        >
          <i class="ki-outline ki-arrow-left fs-3 me-2"></i>
          Indietro
        </button>
        <div v-else></div>

        <button
          v-if="currentStep < 3"
          type="button"
          @click="nextStep"
          class="btn btn-lg btn-primary fw-bold"
          style="background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%); border: none;"
        >
          Avanti
          <i class="ki-outline ki-arrow-right fs-3 ms-2"></i>
        </button>

        <button
          v-else
          type="submit"
          ref="submitButton"
          class="btn btn-lg btn-success fw-bold"
          style="background: linear-gradient(135deg, #50cd89 0%, #0bb7af 100%); border: none;"
        >
          <span class="indicator-label">
            <i class="ki-duotone ki-check-circle fs-2 me-2">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            Completa Registrazione
          </span>
          <span class="indicator-progress">
            <span class="spinner-border spinner-border-sm align-middle me-2"></span>
            Attendere...
          </span>
        </button>
      </div>
      <!--end::Actions-->
    </VForm>
    <!--end::Form-->
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, nextTick, onMounted, ref, computed, reactive } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { useAuthStore, type User } from "@/stores/auth";
import { useRouter } from "vue-router";
import { PasswordMeterComponent } from "@/assets/ts/components";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "sign-up",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  setup() {
    const store = useAuthStore();
    const router = useRouter();

    const submitButton = ref<HTMLButtonElement | null>(null);
    const formRef = ref<InstanceType<typeof VForm> | null>(null);
    const currentStep = ref(1);

    // Form data
    const formData = reactive({
      name: "",
      lastName: "",
      email: "",
      phone: "",
      userType: "1", // 1 = Persona Fisica (DEFAULT), 2 = Persona Giuridica
      address: "",
      city: "",
      zipCode: "",
      province: "",
      fiscalCode: "",
      companyName: "",
      vatNumber: "",
      pec: "",
      sdiCode: "",
      password: "",
      password_confirmation: "",
      toc: false,
    });

    // Validation schemas per step
    const step1Schema = Yup.object().shape({
      userType: Yup.string().required("Seleziona il tipo di utente").label("Tipo Utente"),
      name: Yup.string().required("Il nome è obbligatorio").label("Nome"),
      lastName: Yup.string().required("Il cognome è obbligatorio").label("Cognome"),
      email: Yup.string().required("L'email è obbligatoria").email("Inserisci un'email valida").label("Email"),
      phone: Yup.string().nullable().label("Telefono"),
      // Campi per Persona Giuridica
      companyName: Yup.string().when('userType', {
        is: '2',
        then: (schema) => schema.required("La ragione sociale è obbligatoria"),
        otherwise: (schema) => schema.nullable(),
      }),
    });

    const step2Schema = Yup.object().shape({
      address: Yup.string().required("L'indirizzo è obbligatorio").label("Indirizzo"),
      city: Yup.string().required("La città è obbligatoria").label("Città"),
      zipCode: Yup.string().required("Il CAP è obbligatorio").label("CAP"),
      province: Yup.string().nullable().label("Provincia"),
      // Campi fiscali opzionali
      fiscalCode: Yup.string().nullable().matches(/^[A-Z0-9]{0,16}$/, "Formato codice fiscale non valido").label("Codice Fiscale"),
      vatNumber: Yup.string().nullable().matches(/^(\d{11})?$/, "La partita IVA deve contenere 11 cifre").label("Partita IVA"),
      pec: Yup.string().nullable().email("Inserisci una PEC valida").label("PEC"),
      sdiCode: Yup.string().nullable().matches(/^[A-Z0-9]{0,7}$/, "Il codice SDI deve contenere max 7 caratteri").label("Codice SDI"),
    });

    const step3Schema = Yup.object().shape({
      password: Yup.string()
        .required("La password è obbligatoria")
        .min(8, "La password deve contenere almeno 8 caratteri")
        .matches(/[A-Z]/, "La password deve contenere almeno una lettera maiuscola")
        .matches(/[0-9]/, "La password deve contenere almeno un numero")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "La password deve contenere almeno un carattere speciale (!@#$%^&*...)")
        .label("Password"),
      password_confirmation: Yup.string()
        .required("Conferma la password")
        .oneOf([Yup.ref("password")], "Le password non coincidono")
        .label("Conferma Password"),
      toc: Yup.boolean()
        .oneOf([true], "Devi accettare i termini e condizioni")
        .required("Devi accettare i termini e condizioni"),
    });

    // Get current validation schema based on step
    const currentValidationSchema = computed(() => {
      switch (currentStep.value) {
        case 1:
          return step1Schema;
        case 2:
          return step2Schema;
        case 3:
          return step3Schema;
        default:
          return step1Schema;
      }
    });

    onMounted(() => {
      nextTick(() => {
        PasswordMeterComponent.bootstrap();
      });
    });

    // Navigate to next step
    const nextStep = async () => {
      if (formRef.value) {
        const { valid } = await formRef.value.validate();
        if (valid) {
          currentStep.value++;
          // Scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    // Navigate to previous step
    const previousStep = () => {
      if (currentStep.value > 1) {
        currentStep.value--;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    // Handle form submission
    const handleSubmit = async () => {
      if (formRef.value) {
        const { valid } = await formRef.value.validate();
        if (!valid) return;
      }

      // Clear existing errors
      store.logout();

      // eslint-disable-next-line
      submitButton.value!.disabled = true;

      // Activate indicator
      submitButton.value?.setAttribute("data-kt-indicator", "on");

      // Prepare data for API - mappato ai campi del backend
      const userData = {
        FirstName: formData.name,
        LastName: formData.lastName,
        Email: formData.email,
        PhoneNumber: formData.phone,
        Password: formData.password,
        Role: "Agency",                     // Campo obbligatorio - default Agency
        UserName: formData.email,           // Usa email come username
        // Campi obbligatori
        Address: formData.address,
        City: formData.city,
        ZipCode: formData.zipCode,
        UserType: parseInt(formData.userType), // 1 o 2
        // Campi opzionali
        Province: formData.province || null,
        MobilePhone: formData.phone,
        // Campi fiscali condizionali in base al UserType
        FiscalCode: formData.userType === '1' ? (formData.fiscalCode || null) : null,
        CompanyName: formData.userType === '2' ? (formData.companyName || null) : null,
        VATNumber: formData.userType === '2' ? (formData.vatNumber || null) : null,
        PEC: formData.userType === '2' ? (formData.pec || null) : null,
        SDICode: formData.userType === '2' ? (formData.sdiCode || null) : null,
      };

      // Send registration request
      await store.register(userData as any);

      const error = store.errors;

      if (!error) {
        // Log per modalità test
        console.log('========================================');
        console.log('MODALITÀ TEST ATTIVA');
        console.log('Controlla la console del BACKEND per il link di conferma!');
        console.log('Email registrata:', formData.email);
        console.log('========================================');

        Swal.fire({
          title: "Registrazione Completata!",
          html: `
            <p class="mb-3">Il tuo account è stato creato con successo.</p>
            <div class="alert alert-warning d-flex align-items-center mt-4 mb-4" role="alert" style="background-color: #fff4de; border: 1px solid #ffa800;">
              <i class="ki-duotone ki-information-5 fs-2x text-warning me-3">
                <span class="path1"></span>
                <span class="path2"></span>
                <span class="path3"></span>
              </i>
              <div class="text-start">
                <strong>MODALITÀ TEST</strong><br>
                <span style="font-size: 0.9em;">Controlla la <strong>console del backend</strong> per il link di conferma email.</span>
              </div>
            </div>
            <p class="text-muted" style="font-size: 0.9em;">
              Email: <strong>${formData.email}</strong>
            </p>
          `,
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "OK, Ho Capito",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-primary",
          },
        }).then(function () {
          // Non reindirizzare automaticamente, l'utente deve usare il link dalla console
          // router.push({ name: "sign-in" });
        });
      } else {
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

      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
      submitButton.value!.disabled = false;
    };

    return {
      currentStep,
      formData,
      formRef,
      currentValidationSchema,
      nextStep,
      previousStep,
      handleSubmit,
      submitButton,
      getAssetPath,
    };
  },
});
</script>
