<template>
  <div class="modal fade" id="kt_modal_add_property" ref="addPropertyModalRef" tabindex="-1" aria-hidden="true">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <!--begin::Modal content-->
      <div class="modal-content card-palette modal-shell">
        <!--begin::Modal header-->
        <div class="modal-header card-palette-header modal-header-accent" id="kt_modal_add_property_header">
          <!--begin::Modal title-->
          <div class="d-flex align-items-center">
            <div class="symbol symbol-40px me-3">
              <span class="symbol-label symbol-label-accent">
                <i class="ki-duotone ki-home fs-2 text-white">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </span>
            </div>
            <div>
              <h2 class="fw-bold m-0 text-palette-primary fs-3">🏠 Aggiungi Immobile</h2>
              <span class="text-palette-secondary fs-7 fw-semibold">Inserisci i dati del nuovo immobile</span>
            </div>
          </div>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_property_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->

        <!--begin::Form-->
        <el-form @submit.prevent="submit()" :model="formData" :rules="rules" ref="formRef"
          enctype="multipart/form-data">
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div class="scroll-y me-n7 pe-7" id="kt_modal_add_property_scroll" data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_property_header"
              data-kt-scroll-wrappers="#kt_modal_add_property_scroll" data-kt-scroll-offset="300px">

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label :class="['required-label', 'fs-6', 'fw-bold', 'mb-3', 'text-palette-primary', { 'required-label--error': invalidFields.AgentId }]">
                  <i class="ki-duotone ki-user fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <span>Agente/Agenzia</span>
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <el-form-item prop="AgentId">
                  <select class="form-select form-select-lg form-control-palette" v-model="formData.AgentId">
                    <option value="">Seleziona agente o agenzia</option>
                    <option v-for="(user, index) in inserModel.Users" :key="index" :value="user.Id">
                      {{ user.Role === 'Agency' ? '🏢 Agenzia: ' : '👤 ' }}{{ user.FirstName }} {{ user.LastName }}
                    </option>
                  </select>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label :class="['required-label', 'fs-6', 'fw-bold', 'mb-3', 'text-palette-primary', { 'required-label--error': invalidFields.CustomerId }]">
                  <i class="ki-duotone ki-user fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <span>Cliente</span>
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <el-form-item prop="CustomerId">
                  <select class="form-select form-select-lg form-control-palette" v-model="formData.CustomerId">
                    <option v-for="(user, index) in inserModel.Customers" :key="index" :value="user.Id">👤 {{ user.FirstName }} {{ user.LastName }}</option>
                  </select>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-2 fv-row">
                <!--begin::Label-->
                <label :class="['required-label', 'fs-6', 'fw-bold', 'mb-3', 'text-palette-primary', { 'required-label--error': invalidFields.Title }]">
                  <i class="ki-duotone ki-text fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Titolo
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <el-form-item prop="Title">
                  <el-input v-model="formData.Title" type="text" size="large" class="form-control-palette" placeholder="Inserisci il titolo dell'immobile" @blur="capitalizeTitle" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-2 fv-row">
                <!--begin::Label-->
                <label :class="['required-label', 'fs-6', 'fw-bold', 'mb-3', 'text-palette-primary', { 'required-label--error': invalidFields.Description }]">
                  <i class="ki-duotone ki-notepad fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                    <span class="path4"></span>
                    <span class="path5"></span>
                  </i>
                  Descrizione
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <el-form-item prop="Description">
                  <textarea class="form-control form-control-lg form-control-palette" v-model="formData.Description" rows="3" placeholder="Descrivi le caratteristiche dell'immobile..."></textarea>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->



              <!--begin::Col-->
              <div class="d-flex flex-column mb-2 fv-row">
                <!--begin::Label-->
                <label class="fs-6 fw-semobold mb-2 text-palette-primary">Trattativa riservata</label>
                <!--end::Label-->
                <!--begin::Input-->
                <div class="form-check form-switch form-check-custom form-check-solid">
                  <input class="form-check-input" type="checkbox" value="" v-model="isTrattativaRiservata" />
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->

              <!--begin::Col-->
              <div v-if="!isTrattativaRiservata" class="d-flex flex-column mb-2 fv-row">
                <!--begin::Label-->
                <label :class="['required-label', 'fs-6', 'fw-bold', 'mb-3', 'text-palette-primary', { 'required-label--error': invalidFields.Price }]">
                  <i class="ki-duotone ki-dollar fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Prezzo
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <el-form-item prop="Price">
                  <el-input v-model="formData.Price" type="number" size="large" class="form-control-palette" placeholder="Inserisci il prezzo">
                    <template #append>
                      <span>€</span>
                    </template>
                  </el-input>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Col-->

              <!--begin::Col-->
              <div class="d-flex flex-column mb-2 fv-row">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-3 text-palette-primary">
                  <i class="ki-duotone ki-calendar fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Data fine incarico
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <el-form-item prop="AssignmentEnd">
                  <el-input v-model="formData.AssignmentEnd" type="date" size="large" class="form-control-palette" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Col-->

              <!--begin::Col-->
              <div class="d-flex flex-column mb-2 fv-row">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-3 text-palette-primary">
                  <i class="ki-duotone ki-check-circle fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <span class="">Disponibilità</span>
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <select class="form-select form-select-lg" v-model="formData.Availability">
                  <option value="Libero">✅ Libero</option>
                  <option value="Occupato">🔒 Occupato</option>
                </select>
                <!--end::Input-->
              </div>
              <!--end::Col-->

              <!--begin::Input group-->
              <!-- <div class="d-flex flex-column mb-7 fv-row"> -->
                  <!--begin::Label-->
                  <!-- <label class="fs-6 fw-semobold mb-2"> -->
                    <!-- <span class="required">Tipologia Incarico</span> -->
                    <!-- <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip"></i> -->
                  <!-- </label> -->
                  <!--end::Label-->
                  <!--begin::Input-->
                  <!-- <select class="form-control" v-model="formData.TypeOfAssignment"> -->
                    <!-- <option value="Verbale">Verbale</option> -->
                    <!-- <option value="Esclusivo">Esclusivo</option> -->
                    <!-- <option value="Semi-Verbale">Semi-Verbale</option> -->
                  <!-- </select> -->
                  <!--end::Input-->
                <!-- </div> -->
              <!--end::Input group-->

              <!--begin::Col-->
              <!-- <div class="d-flex flex-column mb-2 fv-row"> -->
                <!--begin::Label-->
                <!-- <label class="col-lg-4 col-form-label fw-semobold fs-6">Provvigione Concordata</label> -->
                <!--end::Label-->
                  <!--begin::Input-->
                  <!-- <el-form-item prop="AgreedCommission"> -->
                    <!-- <el-input  -->
                     <!-- v-model="formData.AgreedCommission" type="number" placeholder="Inserisci percentuale"> -->
                     <!-- <template #append> -->
                      <!-- <span>%</span> -->
                     <!-- </template> -->
                    <!-- </el-input> -->
                  <!-- </el-form-item> -->
                  <!--end::Input-->
              <!-- </div> -->
              <!--end::Col-->

              <!--begin::Col-->
              <!-- <div class="d-flex flex-column mb-2 fv-row"> -->
               <!--begin::Label-->
               <!-- <label class="col-lg-4 col-form-label fw-semobold fs-6">Provvigione Forfettaria</label> -->
               <!--end::Label-->
                  <!--begin::Input-->
                  <!-- <el-form-item prop="FlatRateCommission"> -->
                    <!-- <el-input v-model="formData.FlatRateCommission" type="number" placeholder="Inserisci percentuale"> -->
                       <!-- <template #append> -->
                        <!-- <span>%</span> -->
                       <!-- </template> -->
                    <!-- </el-input> -->
                  <!-- </el-form-item> -->
                  <!--end::Input-->
              <!-- </div> -->
              <!--end::Col-->

              <!--begin::Col-->
              <div class="d-flex flex-column mb-2 fv-row">
                <!--begin::Label-->
                <label class="col-lg-4 col-form-label fw-semobold fs-6">Asta</label>
                <!--end::Label-->
                <!--begin::Input-->
                <div class="form-check form-switch form-check-custom form-check-solid">
                  <input class="form-check-input" type="checkbox" value="" v-model="formData.Auction" />
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->

              <!--begin::Col-->
               <div class="d-flex flex-column mb-2 fv-row">
                <!--begin::Label-->
                <label class="col-lg-4 col-form-label fw-semobold fs-6">In Trattativa</label>
                <!--end::Label-->
                <!--begin::Input-->
                <div class="form-check form-switch form-check-custom form-check-solid">
                  <input class="form-check-input" type="checkbox" value="" v-model="formData.Negotiation" />
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->

              <!--begin::Col-->
              <div class="d-flex flex-column mb-2 fv-row">
                <!--begin::Label-->
                <label class="col-lg-4 col-form-label fw-semobold fs-6">Venduto</label>
                <!--end::Label-->
                <!--begin::Input-->
                <div class="form-check form-switch form-check-custom form-check-solid">
                  <input class="form-check-input" type="checkbox" value="" v-model="formData.Sold" />
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->

              <!--begin::Col-->
              <div class="d-flex flex-column mb-2 fv-row">
                <!--begin::Label-->
                <label class="col-lg-4 col-form-label fw-semobold fs-6">Archiviato</label>
                <!--end::Label-->
                <!--begin::Input-->
                <div class="form-check form-switch form-check-custom form-check-solid">
                  <input class="form-check-input" type="checkbox" value="" v-model="formData.Archived" />
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->

              <!--begin::Col-->
              <div class="d-flex flex-column mb-2 fv-row">
                <!--begin::Label-->
                <label class="col-lg-4 col-form-label fw-semobold fs-6">Imposta in home</label>
                <!--end::Label-->
                <!--begin::Input-->
                <div class="form-check form-switch form-check-custom form-check-solid">
                  <input class="form-check-input" type="checkbox" value="" v-model="formData.InHome" />
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->

              <!--begin::Col-->
              <div class="d-flex flex-column mb-2 fv-row">
                <!--begin::Label-->
                <label class="col-lg-4 col-form-label fw-semobold fs-6">Imposta in evidenza</label>
                <!--end::Label-->
                <!--begin::Input-->
                <div class="form-check form-switch form-check-custom form-check-solid">
                  <input class="form-check-input" type="checkbox" value="" v-model="formData.Highlighted" />
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->

              <!--begin::Billing toggle-->
              <div 
                class="fw-bold fs-6 rotate collapsible surface-tile mb-7 p-3" 
                data-bs-toggle="collapse"
                href="#kt_modal_add_property_billing_info" 
                role="button" 
                aria-expanded="false"
                aria-controls="kt_property_view_details">
                <i class="ki-duotone ki-home-2 fs-3 me-3 text-primary">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
                Tipologia
                <span class="ms-2 rotate-180">
                  <i class="ki-duotone ki-down fs-3">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                </span>
              </div>
              <!--end::Billing toggle-->
              <!--begin::Billing form-->
              <div id="kt_modal_add_property_billing_info" class="collapse show">

                <!--begin::Input group-->
                <div class="d-flex flex-column mb-7 fv-row">
                  <!--begin::Label-->
                  <label :class="['required-label', 'fs-6', 'fw-bold', 'mb-3', 'text-palette-primary', { 'required-label--error': invalidFields.Category }]">
                    <i class="ki-duotone ki-category fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span>Categoria</span>
                  </label>
                  <!--end::Label-->
                <!--begin::Input-->
                <el-form-item prop="Category">
                  <select class="form-select form-select-lg" v-model="formData.Category">
                    <option value="Residenziale">🏠 Residenziale</option>
                    <option value="Capannone">🏭 Capannone</option>
                    <option value="Negozi-Locale Commerciale">🏬 Negozi/Locale Commerciale</option>
                    <option value="Magazzino">📦 Magazzino</option>
                    <option value="Garage">🚗 Garage</option>
                    <option value="Ufficio">🏢 Ufficio</option>
                    <option value="Terreno">🌾 Terreno</option>
                    <option value="Rustico / Casale">🏚️ Rustico / Casale</option>
                  </select>
                </el-form-item>
                <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group Tipologia-->
                <div v-if="showTipologia" class="d-flex flex-column mb-7 fv-row">
                  <label :class="['required-label', 'fs-6', 'fw-bold', 'mb-3', 'text-palette-primary', { 'required-label--error': invalidFields.Typology }]">
                    <i class="ki-duotone ki-home-2 fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span>Tipologia</span>
                  </label>
                  <el-form-item prop="Typology">
                    <select class="form-select form-select-lg" v-model="formData.Typology">
                      <option v-for="tipologia in typesavailable" :key="tipologia" :value="tipologia">
                        {{ tipologia }}
                      </option>
                    </select>
                  </el-form-item>
                </div>
                <!--end::Input group Tipologia-->

                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label :class="['required-label', 'fs-6', 'fw-bold', 'mb-3', 'text-palette-primary', { 'required-label--error': invalidFields.Status }]">
                    <i class="ki-duotone ki-document fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span>Stato vendita o affitto</span>
                  </label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <el-form-item prop="Status">
                    <select class="form-select form-select-lg" v-model="formData.Status">
                      <option value="Vendita">💰 Vendita</option>
                      <option value="Affitto">🏠 Affitto</option>
                    </select>
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
              </div>


              <!--begin::Billing toggle-->
              <div 
                class="fw-bold fs-6 rotate collapsible surface-tile mb-7 p-3" 
                data-bs-toggle="collapse"
                href="#kt_modal_add_property_billing_info2" 
                role="button" 
                aria-expanded="false"
                aria-controls="kt_property_view_details">
                <i class="ki-duotone ki-geolocation fs-3 me-3 text-primary">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
                Località
                <span class="ms-2 rotate-180">
                  <i class="ki-duotone ki-down fs-3">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                </span>
              </div>
              <!--end::Billing toggle-->
              <!--begin::Billing form-->
              <div id="kt_modal_add_property_billing_info2" class="collapse show">
                <!--begin::Input group-->
                <div class="d-flex flex-column mb-7 fv-row">
                  <!--begin::Label-->
                  <label :class="['required-label', 'fs-6', 'fw-bold', 'mb-3', 'text-palette-primary', { 'required-label--error': invalidFields.AddressLine }]">
                    <i class="ki-duotone ki-map fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    Indirizzo
                  </label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <el-form-item prop="AddressLine">
                    <el-input v-model="formData.AddressLine" type="text" size="large" placeholder="Via, numero civico" @blur="capitalizeAddressLine" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="row g-4 mb-5">
                  <div class="col-12 col-md-6 fv-row">
                    <!--begin::Label-->
                    <label :class="['required-label', 'fs-6', 'fw-bold', 'mb-3', 'text-palette-primary', { 'required-label--error': invalidFields.State }]">
                      <i class="ki-duotone ki-map fs-5 me-2 text-primary">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      <span>Provincia</span>
                    </label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <el-form-item prop="State">
                      <select class="form-select form-select-lg" v-model="formData.State">
                        <option value="">🗺️ Seleziona provincia</option>
                        <option v-for="(province, index) in provinces" :key="index" :value="province.Id">{{ province.Name }}</option>
                      </select>
                    </el-form-item>
                    <!--end::Input-->
                  </div>

                  <div class="col-12 col-md-6 fv-row">
                    <!--begin::Label-->
                    <label :class="['required-label', 'fs-6', 'fw-bold', 'mb-3', 'text-palette-primary', { 'required-label--error': invalidFields.City }]">
                      <i class="ki-duotone ki-geolocation fs-5 me-2 text-primary">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      <span>Comune</span>
                    </label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <el-form-item prop="City">
                      <select class="form-select form-select-lg" aria-label="Single select example" v-model="formData.City" required>
                          <option value="">🏙️ Seleziona comune</option>
                          <option v-for="(city, index) in cities" :key="index" :value="city.Id">{{ city.Name }}{{ city.CAP ? ` (${city.CAP})` : '' }}</option>
                      </select>
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                </div>
                <!--end::Input group-->
              
                <!--begin::Input group-->
                <div class="row g-4 mb-7">
                  <div class="col-12 col-md-6 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-bold mb-3 text-palette-primary">
                      <i class="ki-duotone ki-position fs-5 me-2 text-primary">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      Località
                    </label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <el-input v-model="formData.Location" type="text" size="large" placeholder="Inserisci la località" @blur="capitalizeLocation" />
                    <!--end::Input-->
                  </div>

                  <div class="col-12 col-md-6 fv-row">
                    <!--begin::Label-->
                    <label :class="['required-label', 'fs-6', 'fw-bold', 'mb-3', 'text-palette-primary', { 'required-label--error': invalidFields.PostCode }]">
                      <i class="ki-duotone ki-code fs-5 me-2 text-primary">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      CAP
                    </label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <el-form-item prop="PostCode">
                      <el-input v-model="formData.PostCode" type="text" size="large" placeholder="Inserisci il CAP" />
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                </div>
                <!--end::Input group-->
              </div>

              <div 
                class="fw-bold fs-6 rotate collapsible surface-tile mb-7 p-3" 
                data-bs-toggle="collapse"
                href="#kt_modal_add_property_billing_info3" 
                role="button" 
                aria-expanded="true"
                aria-controls="kt_property_view_details">
                <i class="ki-duotone ki-setting-2 fs-3 me-3 text-primary">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
                Caratteristiche
                <span class="ms-2 rotate-180">
                  <i class="ki-duotone ki-down fs-3">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                </span>
              </div>
              <!--end::Billing toggle-->
              <div id="kt_modal_add_property_billing_info3" class="collapse show">

                  <!--begin::Col-->
                  <div class="row g-4 mb-7">
                    <div class="col-12 col-md-6 fv-row">
                      <!--begin::Label-->
                      <label class="fs-6 fw-bold mb-3 text-palette-primary">
                        <i class="ki-duotone ki-garden fs-5 me-2 text-primary">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        Giardino (mq)
                      </label>
                      <!--end::Label-->
                      <!--begin::Input-->
                      <el-form-item prop="MQGarden">
                        <el-input v-model="formData.MQGarden" type="number" size="large" placeholder="Metri quadrati" />
                      </el-form-item>
                      <!--end::Input-->
                    </div>

                    <div class="col-12 col-md-6 fv-row">
                      <!--begin::Label-->
                      <label class="fs-6 fw-bold mb-3 text-palette-primary">
                        <i class="ki-duotone ki-dollar fs-5 me-2 text-primary">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        Spese condominiali
                      </label>
                      <!--end::Label-->
                      <!--begin::Input-->
                      <el-form-item prop="CondominiumExpenses">
                        <el-input v-model="formData.CondominiumExpenses" type="number" size="large" placeholder="Inserisci importo">
                          <template #append>
                            <span>€</span>
                          </template>
                        </el-input>
                      </el-form-item>
                      <!--end::Input-->
                    </div>
                  </div>
                  <!--end::Col-->

                <!--begin::Input group-->
                <div class="row g-9 mb-7">
                  <!--begin::Col-->
                  <div class="d-flex flex-column mb-7 fv-row">
                    <!--begin::Label-->
                    <label :class="['required-label', 'fs-6', 'fw-bold', 'mb-3', 'text-palette-primary', { 'required-label--error': invalidFields.CommercialSurfaceate }]">
                      <i class="ki-duotone ki-home-2 fs-5 me-2 text-primary">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      Superficie commerciale (m²)
                    </label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <el-form-item prop="CommercialSurfaceate">
                      <el-input v-model="formData.CommercialSurfaceate" type="number" size="large" placeholder="Metri quadrati" />
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                  <!--end::Col-->
                </div>

                <!--begin::Col-->
                <div class="row g-4 mb-7">
                  <div class="col-12 col-md-6 col-lg-4 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-bold mb-3 text-palette-primary">
                      <i class="ki-duotone ki-arrow-up fs-5 me-2 text-primary">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      Piano
                    </label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <select class="form-select form-select-lg" v-model="formData.Floor">
                      <option value="Interrato -2">Interrato -2</option>
                      <option value="Interrato -1">Interrato -1</option>
                      <option value="Seminterrato">Seminterrato</option>
                      <option value="Piano Terra">Piano Terra</option>
                      <option value="Piano Rialzato">Piano Rialzato</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                    <!--end::Input-->
                  </div>

                  <div class="col-12 col-md-6 col-lg-4 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-bold mb-3 text-palette-primary">
                      <i class="ki-duotone ki-home-2 fs-5 me-2 text-primary">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      Totale piani edificio
                    </label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <el-input v-model="formData.TotalBuildingfloors" type="number" size="large" placeholder="Numero piani" />
                    <!--end::Input-->
                  </div>

                  <div class="col-12 col-md-6 col-lg-4 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-bold mb-3 text-palette-primary">
                      <i class="ki-duotone ki-arrow-up fs-5 me-2 text-primary">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      Ascensori
                    </label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <el-form-item prop="Elevators">
                      <el-input v-model="formData.Elevators" type="number" size="large" placeholder="Numero ascensori" />
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-palette-primary">
                    <i class="ki-duotone ki-notepad fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                      <span class="path3"></span>
                      <span class="path4"></span>
                      <span class="path5"></span>
                    </i>
                    Altri dettagli
                  </label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <el-form-item prop="MoreDetails">
                    <el-input v-model="formData.MoreDetails" type="text" size="large" placeholder="Inserisci dettagli aggiuntivi" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Col-->

                <!--begin::Input group-->
                <div class="row g-4 mb-7">
                  <div class="col-12 col-md-6 col-lg-3 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-bold mb-3 text-palette-primary">
                      <i class="ki-duotone ki-home-2 fs-5 me-2 text-primary">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      Camere da letto
                    </label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <el-form-item prop="Bedrooms">
                      <el-input v-model="formData.Bedrooms" type="number" size="large" placeholder="Numero camere" />
                    </el-form-item>
                    <!--end::Input-->
                  </div>

                  <div class="col-12 col-md-6 col-lg-3 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-bold mb-3 text-palette-primary">
                      <i class="ki-duotone ki-home-2 fs-5 me-2 text-primary">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      Locali
                    </label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <el-form-item prop="WarehouseRooms">
                      <el-input v-model="formData.WarehouseRooms" type="number" size="large" placeholder="Numero locali" />
                    </el-form-item>
                    <!--end::Input-->
                  </div>

                  <div class="col-12 col-md-6 col-lg-3 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-bold mb-3 text-palette-primary">
                      <i class="ki-duotone ki-coffee fs-5 me-2 text-primary">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      Cucine
                    </label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <el-form-item prop="Kitchens">
                      <el-input v-model="formData.Kitchens" type="number" size="large" placeholder="Numero cucine" />
                    </el-form-item>
                    <!--end::Input-->
                  </div>

                  <div class="col-12 col-md-6 col-lg-3 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-bold mb-3 text-palette-primary">
                      <i class="ki-duotone ki-water fs-5 me-2 text-primary">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      Bagni
                    </label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <el-form-item prop="Bathrooms">
                      <el-input v-model="formData.Bathrooms" type="number" size="large" placeholder="Numero bagni" />
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-palette-primary">
                    <i class="ki-duotone ki-home-2 fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span class="">Arredamento</span>
                  </label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <select class="form-select form-select-lg" v-model="formData.Furniture">
                    <option value="">🪑 Seleziona Arredamento</option>
                  <option value="Arredato">✅ Arredato</option>
                  <option value="Parzialmente Arredato">🟡 Parzialmente Arredato</option>
                  <option value="Non Arredato">❌ Non Arredato</option>
                  </select>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <label class="fs-6 fw-bold mb-3 text-palette-primary">
                    <i class="ki-duotone ki-notepad fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                      <span class="path3"></span>
                      <span class="path4"></span>
                      <span class="path5"></span>
                    </i>
                    Altre Caratteristiche
                  </label>
                  <!--begin::Input-->
                  <el-form-item prop="MoreFeatures">
                    <el-input v-model="formData.MoreFeatures" type="text" size="large" placeholder="Es: Balcone, Terrazzo, etc." />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-palette-primary">
                    <i class="ki-duotone ki-car fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    Posti Auto
                  </label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <el-form-item prop="ParkingSpaces">
                    <el-input v-model="formData.ParkingSpaces" type="number" size="large" placeholder="Numero posti auto" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Col-->

                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-palette-primary">
                    <i class="ki-duotone ki-fire fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span class="">Riscaldamento</span>
                  </label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <select class="form-select form-select-lg" v-model="formData.Heating">
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
                  <label class="fs-6 fw-bold mb-3 text-palette-primary">
                    <i class="ki-duotone ki-compass fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span class="">Esposizione</span>
                  </label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <select class="form-select form-select-lg h-auto" v-model="selectedExposures" multiple
                    style="min-height: 100px;">
                    <option value="Nord">🧭 Nord</option>
                    <option value="Sud">☀️ Sud</option>
                    <option value="Est">🌅 Est</option>
                    <option value="Ovest">🌄 Ovest</option>
                  </select>
                  <small class="text-palette-secondary d-block mt-1 fs-8">
                    Tieni premuto Ctrl (o Cmd su Mac) per selezionare più esposizioni
                  </small>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label :class="['required-label', 'fs-6', 'fw-bold', 'mb-3', 'text-palette-primary', { 'required-label--error': invalidFields.EnergyClass }]">
                    <i class="ki-duotone ki-element-11 fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span class="">Classe energetica</span>
                  </label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <el-form-item prop="EnergyClass">
                    <select class="form-select form-select-lg" v-model="formData.EnergyClass">
                      <option value="">Seleziona il tipo di Classe energetica</option>
                      <option value="Proprietà Esente">Proprietà Esente</option>
                      <option value="Non classificabile">Non classificabile</option>
                      <option value="A4">A4</option>
                      <option value="A3">A3</option>
                      <option value="A2">A2</option>
                      <option value="A1">A1</option>
                      <option value="A+">A+</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="F">F</option>
                      <option value="G">G</option>
                    </select>
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-palette-primary">
                    <i class="ki-duotone ki-abstract-26 fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span class="">Tipo di proprietà</span>
                  </label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <el-form-item prop="TypeOfProperty">
                    <el-input v-model="formData.TypeOfProperty" type="text" size="large" placeholder="Es: Intera proprietà, Nuda proprietà, etc." />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label :class="['required-label', 'fs-6', 'fw-bold', 'mb-3', 'text-palette-primary', { 'required-label--error': invalidFields.StateOfTheProperty }]">
                    <i class="ki-duotone ki-home-2 fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span class="">Stato dell'immobile</span>
                  </label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <el-form-item prop="StateOfTheProperty">
                    <select class="form-select form-select-lg" v-model="formData.StateOfTheProperty">
                      <option value="">🏠 Seleziona Stato Immobile</option>
                        <option value="0">🔒 Affittato</option>
                        <option value="1">🏗️ In corso di costruzione</option>
                        <option value="2">✅ Libero</option>
                        <option value="3">📋 Libero al Rogito</option>
                        <option value="4">🏛️ Nuda Proprietà</option>
                        <option value="5">👥 Occupato</option>
                    </select>
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label :class="['required-label', 'fs-6', 'fw-bold', 'mb-3', 'text-palette-primary', { 'required-label--error': invalidFields.YearOfConstruction }]">
                    <i class="ki-duotone ki-calendar fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    Anno di costruzione
                  </label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <el-form-item prop="YearOfConstruction">
                    <el-input v-model="formData.YearOfConstruction" type="number" size="large" placeholder="Es: 2020" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Col-->

                        <!--begin::Input group-->
        <div class="d-flex flex-column mb-7 fv-row">
          <!--begin::Label-->
                <label class="fs-6 fw-bold mb-3 text-palette-primary">
            <i class="ki-duotone ki-document fs-5 me-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            <span>Tipologia Incarico</span>
          </label>
          <!--end::Label-->
          <!--begin::Input-->
          <select class="form-select form-select-lg" v-model="formData.TypeOfAssignment">
            <option value="Esclusivo">⭐ Esclusivo</option>
            <option value="Non Esclusivo">📄 Non Esclusivo</option>
            <option value="Verbale">📝 Verbale</option>
            <option value="Semi-Verbale">📋 Semi-Verbale</option>
            <option value="Immobile MLS">🌐 Immobile MLS</option>
          </select>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Col-->
        <div class="row g-4 mb-7">
          <div class="col-12 col-md-6 col-lg-4 fv-row">
            <!--begin::Label-->
            <label class="fs-6 fw-bold mb-3 text-palette-primary">
              <i class="ki-duotone ki-percentage fs-5 me-2 text-primary">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              Provvigione Concordata
            </label>
            <!--end::Label-->
            <!--begin::Input-->
            <el-form-item prop="AgreedCommission">
              <el-input v-model="formData.AgreedCommission" type="number" size="large" placeholder="Percentuale">
                <template #append>
                  <span>%</span>
                </template>
              </el-input>
            </el-form-item>
            <!--end::Input-->
          </div>

          <div class="col-12 col-md-6 col-lg-4 fv-row">
            <!--begin::Label-->
            <label class="fs-6 fw-bold mb-3 text-palette-primary">
              <i class="ki-duotone ki-percentage fs-5 me-2 text-primary">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              Provvigione Forfettaria
            </label>
            <!--end::Label-->
            <!--begin::Input-->
            <el-form-item prop="FlatRateCommission">
              <el-input v-model="formData.FlatRateCommission" type="number" size="large" placeholder="Inserisci importo">
                <template #append>
                  <span>€</span>
                </template>
              </el-input>
            </el-form-item>
            <!--end::Input-->
          </div>

          <div class="col-12 col-md-6 col-lg-4 fv-row">
            <!--begin::Label-->
            <label class="fs-6 fw-bold mb-3 text-palette-primary">
              <i class="ki-duotone ki-percentage fs-5 me-2 text-primary">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              Storno Provvigione
            </label>
            <!--end::Label-->
            <!--begin::Input-->
            <el-form-item prop="CommissionReversal">
              <el-input v-model="formData.CommissionReversal" type="number" size="large" placeholder="Inserisci importo">
                <template #append>
                  <span>€</span>
                </template>
              </el-input>
            </el-form-item>
            <!--end::Input-->
          </div>
        </div>
        <!--end::Col-->

        <!--begin::Col-->
        <div class="col-md-12 fv-row">
          <!--begin::Label-->
          <label class="fs-6 fw-bold mb-3 text-palette-primary">
            <i class="ki-duotone ki-wallet fs-5 me-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            Provvigione effettiva in €
          </label>
          <!--end::Label-->
          <!--begin::Input-->
          <el-input
            :model-value="effectiveCommission"
            type="text"
            readonly
            class="modern-input commission-effective-input"
          >
            <template #append>
              <span>€</span>
            </template>
          </el-input>
          <small class="text-palette-secondary d-block mt-1 fs-8">
            Calcolata automaticamente: provvigione lorda - storno
          </small>
          <!--end::Input-->
        </div>
        <!--end::Col-->

                <!--begin::Input group-->
                <div class="d-flex flex-column mb-2 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-palette-primary">
                    <i class="ki-duotone ki-youtube fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    Url Video
                  </label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <el-form-item prop="VideoUrl">
                    <el-input v-model="formData.VideoUrl" type="text" size="large" placeholder="https://youtube.com/..." />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

              </div>

              <!--end::Modal body-->
            </div>
            <!--begin::Modal footer-->
            <div class="modal-footer flex-center">
              <!--begin::Button-->
              <button
                type="reset"
                id="kt_modal_add_property_cancel"
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
                    <i class="ki-duotone ki-check fs-3">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                  </span>
                  <span class="btn-label">Crea Immobile</span>
                </span>
                <span v-if="loading" class="d-flex align-items-center">
                  <span class="spinner-border spinner-border-sm me-2"></span>
                  <span class="btn-label">Attendere...</span>
                </span>
              </button>
              <!--end::Button-->
            </div>
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
import { defineComponent, ref, watch, onMounted, reactive, computed } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { toTitleCase, smartTitleCase } from "@/core/helpers/text";
import { countries } from "@/core/data/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { createRealEstateProperty, RealEstateProperty, getToInsert, InsertModel } from "@/core/data/properties";
import { useAuthStore } from "@/stores/auth";
import Multiselect from '@vueform/multiselect'
import { getAllProvinceNames, getCitiesByProvince, getCAPByCity, getCityByCAP } from "@/core/data/italian-geographic-data-loader";

export default defineComponent({
  name: "add-property-modal",
  components: {Multiselect},
  emits: ['formAddSubmitted', 'limitExceeded'],
  setup(_, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addPropertyModalRef = ref<null | HTMLElement>(null);
    const store = useAuthStore();
    const provinces = ref<Array<{Id: string, Name: string}>>([]);
    const cities = ref<Array<{Id: string, Name: string, CAP?: string}>>([]);
    const loading = ref<boolean>(false);
    const isTrattativaRiservata = ref(false);
    const selectedExposures = ref<string[]>([]);
    const formData = ref<RealEstateProperty>({
      Title: "",
      Category: "Residenziale",
      Typology: "Appartamento",
      InHome: false,
      Highlighted: false,
      Auction: false,
      Negotiation: false,
      Sold: false,
      Archived: false,
      Status: "Vendita",
      AddressLine: "",
      City: "",
      State: "",
      Location:"",
      PostCode: "",
      CommercialSurfaceate: 0,
      TotalBuildingfloors: 0,
      Floor: "Piano Terra",
      Elevators: 0,
      MoreDetails: "",
      MoreFeatures: "",
      Bedrooms: 0,
      WarehouseRooms: 0,
      Kitchens: 0,
      Bathrooms: 0,
      Furniture: "",
      OtherFeatures: "",
      ParkingSpaces: 0,
      Heating: "",
      Exposure: "",
      EnergyClass: "",
      TypeOfProperty: "",
      StateOfTheProperty: "Nuovo / In Costruzione",
      YearOfConstruction: 0,
      Price: 0,
      PriceReduced: 0,
      MQGarden:0,
      CondominiumExpenses: 0,
      Availability: "Libero",
      Description: "Descrizione dell'immobile",
      CustomerId: null,
      UserId: "",
      AgentId: "",
      AssignmentEnd: new Date().toISOString().split('T')[0], // Data odierna come default
      VideoUrl: "",
      AgreedCommission: 0,
      FlatRateCommission: 0,
      CommissionReversal: 0,
      TypeOfAssignment: "Esclusivo",
    });
    const inserModel = ref<InsertModel>({
      Customers: [],
      Users: []
    });
    const showTipologia = ref(true);
    const invalidFields = reactive<Record<string, boolean>>({});

    const markFieldInvalid = (field: string) => {
      invalidFields[field] = true;
    };

    const clearFieldError = (field: string) => {
      if (invalidFields[field]) {
        delete invalidFields[field];
      }
    };

    const resetInvalidFields = () => {
      Object.keys(invalidFields).forEach((key) => {
        delete invalidFields[key];
      });
    };

    const hasText = (value: string | null | undefined) => {
      return typeof value === "string" && value.trim().length > 0;
    };

    const hasPositiveNumber = (value: number | string | null | undefined) => {
      const numericValue = Number(value);
      return !Number.isNaN(numericValue) && numericValue > 0;
    };

    // Carica le province dal JSON
    const loadProvinces = async () => {
      try {
        const provinceNames = getAllProvinceNames();
        provinces.value = provinceNames.map(name => ({
          Id: name,
          Name: name
        }));
      } catch (error) {
        console.error("Errore nel caricamento delle province:", error);
        provinces.value = [];
      }
    };

    // Carica le città di una provincia specifica dal JSON
    const loadCitiesByProvince = async (provinceName: string) => {
      try {
        if (provinceName) {
          const citiesData = getCitiesByProvince(provinceName);
          cities.value = citiesData.map(city => ({
            Id: city.Name,
            Name: city.Name,
            CAP: city.CAP
          }));
        } else {
          cities.value = [];
        }
      } catch (error) {
        console.error("Errore nel caricamento delle città:", error);
        cities.value = [];
      }
    };


    const tipologiePerCategoria: Record<string, string[]> = {
      "Residenziale": [
        "Appartamento",
        "Attico",
        "Mansarda",
        "Loft",
        "Soffitta",
        "Casale",
        "Rustico",
        "Villa Unifamiliare",
        "Villa Bifamiliare",
        "Villa Plurifamiliare",
        "Villa a Schiera"
      ],
      "Capannone": [
        "Capannone artigianale",
        "Capannone industriale",
        "Capannone logistico"
      ],
      "Negozi-Locale Commerciale": [
        "Negozio",
        "Locale commerciale",
        "Showroom",
        "Chiosco"
      ],
      "Magazzino": [
        "Magazzino",
        "Deposito",
        "Laboratorio"
      ],
      "Garage": [
        "Box singolo",
        "Box doppio",
        "Posto auto coperto",
        "Posto auto scoperto"
      ],
      "Ufficio": [
        "Ufficio",
        "Studio professionale",
        "Business center",
        "Co-working"
      ],
      "Terreno": [
        "Edificabile",
        "Agricolo",
        "Non edificabile",
        "Boschivo"
      ],
      "Rustico / Casale": [
        "Rustico",
        "Casale",
        "Cascina",
        "Masseria"
      ]
    };

    const typesavailable = ref<string[]>(tipologiePerCategoria[formData.value.Category] || []);
    if (typesavailable.value.length > 0) {
      formData.value.Typology = typesavailable.value[0];
      showTipologia.value = true;
    } else {
      formData.value.Typology = "";
      showTipologia.value = false;
    }

    watch(
      () => formData.value.Category,
      (newCategoria) => {
        const available = (newCategoria && tipologiePerCategoria[newCategoria]) ? [...tipologiePerCategoria[newCategoria]] : [];
        typesavailable.value = available;

        if (available.length > 0) {
          showTipologia.value = true;
          formData.value.Typology = available.includes(formData.value.Typology)
            ? formData.value.Typology
            : available[0];
          clearFieldError("Typology");
        } else {
          showTipologia.value = false;
          formData.value.Typology = "";
        }
      }
    );

     watch(
        () => formData.value.State,
        async (newProvince) => {
            if (newProvince) {
                // Carica le città della provincia selezionata
                await loadCitiesByProvince(newProvince);
                formData.value.City = null;
                clearFieldError("State");
            } else {
                cities.value = [];
                formData.value.City = null;
            }
        }
        );

        watch(
        () => formData.value.City,
        async (newCity) => {
            // Auto-compila il CAP se disponibile
            if (formData.value.State && newCity && formData.value.PostCode !== getCAPByCity(formData.value.State, newCity)) {
              const cap = getCAPByCity(formData.value.State, newCity);
              if (cap) {
                formData.value.PostCode = cap;
                clearFieldError("PostCode");
              }
            }
            if (newCity) {
              clearFieldError("City");
            }
        }
        );

        // Watcher per auto-compilare il comune quando si modifica il CAP
        watch(
          () => formData.value.PostCode,
          (newCAP) => {
            if (newCAP && formData.value.State) {
              const cityName = getCityByCAP(formData.value.State, newCAP);
              if (cityName && formData.value.City !== cityName) {
                formData.value.City = cityName;
                clearFieldError("City");
              }
            }
            if (newCAP) {
              clearFieldError("PostCode");
            }
          }
        );

    watch(() => formData.value.CustomerId, (value) => {
      if (value !== null && value !== undefined) {
        clearFieldError("CustomerId");
      }
    });

    watch(() => formData.value.AgentId, (value) => {
      if (typeof value === "string" && value.trim().length > 0) {
        clearFieldError("AgentId");
      }
    });

    watch(() => formData.value.Title, (value) => {
      if (hasText(value)) {
        clearFieldError("Title");
      }
    });

    watch(() => formData.value.Description, (value) => {
      if (hasText(value)) {
        clearFieldError("Description");
      }
    });

    watch(() => formData.value.Category, (value) => {
      if (typeof value === "string" && value.length > 0) {
        clearFieldError("Category");
      }
    });

    watch(() => formData.value.Typology, (value) => {
      if (typeof value === "string" && value.length > 0) {
        clearFieldError("Typology");
      }
    });

    watch(() => formData.value.Status, (value) => {
      if (typeof value === "string" && value.length > 0) {
        clearFieldError("Status");
      }
    });

    watch(() => formData.value.AddressLine, (value) => {
      if (hasText(value)) {
        clearFieldError("AddressLine");
      }
    });

    watch(() => formData.value.State, (value) => {
      if (typeof value === "string" && value.length > 0) {
        clearFieldError("State");
      }
    });

    watch(() => formData.value.PostCode, (value) => {
      if (hasText(value)) {
        clearFieldError("PostCode");
      }
    });

    watch(() => formData.value.CommercialSurfaceate, (value) => {
      if (hasPositiveNumber(value)) {
        clearFieldError("CommercialSurfaceate");
      }
    });

    watch(
      [() => formData.value.Price, isTrattativaRiservata],
      ([priceValue, trattativa]) => {
        if (trattativa || hasPositiveNumber(priceValue)) {
          clearFieldError("Price");
        }
      }
    );

    watch(() => formData.value.EnergyClass, (value) => {
      if (typeof value === "string" && value.length > 0) {
        clearFieldError("EnergyClass");
      }
    });

    watch(() => formData.value.StateOfTheProperty, (value) => {
      if (typeof value === "string" && value.length > 0) {
        clearFieldError("StateOfTheProperty");
      }
    });

    watch(() => formData.value.YearOfConstruction, (value) => {
      if (hasPositiveNumber(value)) {
        clearFieldError("YearOfConstruction");
      }
    });

    // Watcher per validare l'esclusione mutua tra provvigione concordata e forfettaria
    watch(
      () => formData.value.AgreedCommission,
      () => {
        if (formRef.value) {
          // Valida entrambi i campi quando cambia AgreedCommission
          formRef.value.validateField('AgreedCommission', () => {});
          formRef.value.validateField('FlatRateCommission', () => {});
        }
      }
    );

    watch(
      () => formData.value.FlatRateCommission,
      () => {
        if (formRef.value) {
          // Valida entrambi i campi quando cambia FlatRateCommission
          formRef.value.validateField('AgreedCommission', () => {});
          formRef.value.validateField('FlatRateCommission', () => {});
        }
      }
    );

    // Watcher per convertire l'array di esposizioni selezionate in stringa
    watch(
      () => selectedExposures.value,
      (newExposures) => {
        // Unisce le esposizioni con "-" (es. "Nord-Est")
        formData.value.Exposure = newExposures.length > 0 ? newExposures.join('-') : '';
      },
      { deep: true }
    );

    const validatePrice = (_rule: any, value: number | string, callback: any) => {
      if (isTrattativaRiservata.value) {
        return callback();
      }
      const numericValue = Number(value);
      if (value === null || value === undefined || value === "" || Number.isNaN(numericValue) || numericValue <= 0) {
        callback(new Error("Il prezzo è obbligatorio"));
      } else {
        callback();
      }
    };

    const validateYearOfConstruction = (_rule: any, value: number | string, callback: any) => {
      const numericValue = Number(value);
      if (!value || value === "" || Number.isNaN(numericValue) || numericValue <= 0) {
        callback(new Error("L'anno di costruzione è obbligatorio"));
      } else if (numericValue < 1000 || numericValue > 3000) {
        callback(new Error("L'anno di costruzione deve essere compreso tra 1000 e 3000"));
      } else {
        callback();
      }
    };

    const validateAgreedCommission = (_rule: any, value: number | string, callback: any) => {
      const numericValue = Number(value);
      const flatRateValue = Number(formData.value.FlatRateCommission);
      
      // Se il valore è vuoto o zero, è valido
      if (!value || value === "" || Number.isNaN(numericValue) || numericValue <= 0) {
        return callback();
      }
      
      // Se anche FlatRateCommission ha un valore, mostra errore
      if (flatRateValue && !Number.isNaN(flatRateValue) && flatRateValue > 0) {
        callback(new Error("Non è possibile inserire sia la provvigione concordata che quella forfettaria. Scegli una sola opzione."));
      } else {
        callback();
      }
    };

    const validateFlatRateCommission = (_rule: any, value: number | string, callback: any) => {
      const numericValue = Number(value);
      const agreedValue = Number(formData.value.AgreedCommission);
      
      // Se il valore è vuoto o zero, è valido
      if (!value || value === "" || Number.isNaN(numericValue) || numericValue <= 0) {
        return callback();
      }
      
      // Se anche AgreedCommission ha un valore, mostra errore
      if (agreedValue && !Number.isNaN(agreedValue) && agreedValue > 0) {
        callback(new Error("Non è possibile inserire sia la provvigione concordata che quella forfettaria. Scegli una sola opzione."));
      } else {
        callback();
      }
    };

    const rules = ref({
      CustomerId: [
        {
          required: true,
          message: "Il cliente è obbligatorio",
          trigger: "change",
        },
      ],
      Typology: [
        {
          required: true,
          message: "La tipologia è obbligatoria",
          trigger: "change",
        },
      ],
      AgentId: [
        {
          required: true,
          message: "L'agente è obbligatorio",
          trigger: "change",
        },
      ],
      Title: [
        {
          required: true,
          message: "Il titolo è obbligatorio",
          trigger: "change",
        },
      ],

      Description: [
        {
          required: true,
          message: "La descrizione è obbligatoria",
          trigger: "change",
        },
      ],

      AddressLine: [
        {
          required: true,
          message: "L'indirizzo è obbligatorio",
          trigger: "change",
        },
      ],
      Category: [
        {
          required: true,
          message: "La categoria è obbligatoria",
          trigger: "change",
        },
      ],
      Status: [
        {
          required: true,
          message: "Lo stato vendita è obbligatorio",
          trigger: "change",
        },
      ],
      City: [
        {
          required: true,
          message: "Il comune è obbligatorio",
          trigger: "change",
        },
      ],
      State: [
        {
          required: true,
          message: "La provincia è obbligatoria",
          trigger: "change",
        },
      ],
      PostCode: [
        {
          required: true,
          message: "Il CAP è obbligatorio",
          trigger: "change",
        },
      ],
      CommercialSurfaceate: [
        {
          required: true,
          message: "La superficie commerciale è obbligatoria",
          trigger: "change",
        },
      ],
      Price: [
        { validator: validatePrice, trigger: "change" },
      ],
      EnergyClass: [
        {
          required: true,
          message: "La classe energetica è obbligatoria",
          trigger: "change",
        },
      ],
      StateOfTheProperty: [
        {
          required: true,
          message: "Lo stato dell'immobile è obbligatorio",
          trigger: "change",
        },
      ],
      YearOfConstruction: [
        { validator: validateYearOfConstruction, trigger: "change" },
      ],
      AgreedCommission: [
        { validator: validateAgreedCommission, trigger: "change" },
      ],
      FlatRateCommission: [
        { validator: validateFlatRateCommission, trigger: "change" },
      ],
    });

    onMounted(async () => {
      inserModel.value = await getToInsert();
      if (inserModel.value.Customers.length > 0) {
        formData.value.CustomerId = inserModel.value.Customers[0].Id;
      }
      if (inserModel.value.Users.length > 0) {
        formData.value.AgentId = store.user.Id;
      }
      
      // Carica le province dal database
      await loadProvinces();
    })

    const submit = async () => {
      if (!formRef.value) {
        return;
      }

      resetInvalidFields();

      const missingFields: string[] = [];
      if (!formData.value.CustomerId) {
        missingFields.push("Cliente");
        markFieldInvalid("CustomerId");
      }
      if (!formData.value.AgentId) {
        missingFields.push("Agente");
        markFieldInvalid("AgentId");
      }
      if (!formData.value.Title || !formData.value.Title.trim()) {
        missingFields.push("Titolo");
        markFieldInvalid("Title");
      }
      if (!formData.value.Category) {
        missingFields.push("Categoria");
        markFieldInvalid("Category");
      }
      if (!formData.value.Typology) {
        missingFields.push("Tipologia");
        markFieldInvalid("Typology");
      }
      if (!formData.value.Status) {
        missingFields.push("Stato vendita");
        markFieldInvalid("Status");
      }
      if (!formData.value.AddressLine || !formData.value.AddressLine.trim()) {
        missingFields.push("Indirizzo");
        markFieldInvalid("AddressLine");
      }
      if (!formData.value.State) {
        missingFields.push("Provincia");
        markFieldInvalid("State");
      }
      if (!formData.value.City) {
        missingFields.push("Comune");
        markFieldInvalid("City");
      }
      if (!formData.value.PostCode) {
        missingFields.push("CAP");
        markFieldInvalid("PostCode");
      }
      if (!formData.value.CommercialSurfaceate || formData.value.CommercialSurfaceate <= 0) {
        missingFields.push("Superficie");
        markFieldInvalid("CommercialSurfaceate");
      }
      if (!formData.value.EnergyClass) {
        missingFields.push("Classe energetica");
        markFieldInvalid("EnergyClass");
      }
      if (!formData.value.StateOfTheProperty) {
        missingFields.push("Stato dell'immobile");
        markFieldInvalid("StateOfTheProperty");
      }
      if (!formData.value.YearOfConstruction || formData.value.YearOfConstruction <= 0) {
        missingFields.push("Anno costruzione");
        markFieldInvalid("YearOfConstruction");
      }
      const priceValue = formData.value.Price;
      const numericPrice = Number(priceValue);
      if (
        !isTrattativaRiservata.value &&
        (priceValue === null ||
          priceValue === undefined ||
          Number.isNaN(numericPrice) ||
          numericPrice <= 0)
      ) {
        missingFields.push("Prezzo");
        markFieldInvalid("Price");
      }
      if (!formData.value.Description || !formData.value.Description.trim()) {
        missingFields.push("Descrizione");
        markFieldInvalid("Description");
      }

      // Verifica che non siano compilate entrambe le provvigioni
      const agreedValue = Number(formData.value.AgreedCommission);
      const flatRateValue = Number(formData.value.FlatRateCommission);
      const hasAgreed = agreedValue && !Number.isNaN(agreedValue) && agreedValue > 0;
      const hasFlatRate = flatRateValue && !Number.isNaN(flatRateValue) && flatRateValue > 0;
      
      if (hasAgreed && hasFlatRate) {
        Swal.fire({
          title: "Errore di validazione",
          text: "Non è possibile inserire sia la provvigione concordata che quella forfettaria. Devi scegliere una sola opzione. Rimuovi uno dei due valori per continuare.",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok, capito",
          heightAuto: false,
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
        markFieldInvalid("AgreedCommission");
        markFieldInvalid("FlatRateCommission");
        return;
      }

      if (missingFields.length > 0) {
        Swal.fire({
          title: "Dati mancanti",
          icon: "error",
          html: `<div class="text-start"><p>Completa i seguenti campi obbligatori:</p><ul>${missingFields
            .map((field) => `<li>${field}</li>`)
            .join("")}</ul></div>`,
          buttonsStyling: false,
          confirmButtonText: "Ok",
          heightAuto: false,
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
        return;
      }

      await formRef.value.validate(async (valid: boolean, fields?: Record<string, unknown>) => {
        if (!valid) {
          if (fields) {
            Object.keys(fields).forEach((fieldKey) => {
              markFieldInvalid(fieldKey);
            });
          }
          return;
        }

        if (valid) {
          loading.value = true;
          
          // Se la checkbox "Trattativa riservata" è selezionata, imposta il prezzo a -1
          if (isTrattativaRiservata.value) {
            formData.value.Price = -1;
          }

          // Aggiorna Exposure dall'array di esposizioni selezionate
          formData.value.Exposure = selectedExposures.value.length > 0 
            ? selectedExposures.value.join('-') 
            : '';
          
          try {
          const result = await createRealEstateProperty(formData.value);

          const error = store.errors;

          if (!error && result) {
            loading.value = false;
            Swal.fire({
              text: "Immobile creato con successo.",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok",
              heightAuto: false,
              customClass: {
                confirmButton: "btn fw-semobold btn-primary",
              },
            }).then(() => {
              hideModal(addPropertyModalRef.value);
              emit('formAddSubmitted', formData.value);
            });
          } else {
            loading.value = false;
            Swal.fire({
              text: "Siamo spiacenti, sembra che siano stati rilevati alcuni errori, riprova.",
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Ok, capito!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn btn-primary",
              },
            });
              return false;
            }
          } catch (error: any) {
            loading.value = false;
            if (error?.response?.status === 429) {
              hideModal(addPropertyModalRef.value);
              emit('limitExceeded', error.response.data);
            } else {
              Swal.fire({
                text: "Siamo spiacenti, sembra che siano stati rilevati alcuni errori, riprova.",
                icon: "error",
                buttonsStyling: false,
                confirmButtonText: "Ok, capito!",
                heightAuto: false,
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              });
            }
            return false;
          }
        }
      });
    };

    // Computed per calcolare la provvigione effettiva in €
    const effectiveCommission = computed(() => {
      let grossCommission = 0;
      
      // Calcola la provvigione lorda
      const agreedCommission = Number(formData.value.AgreedCommission);
      const flatRateCommission = Number(formData.value.FlatRateCommission);
      const price = Number(formData.value.Price);
      const storno = Number(formData.value.CommissionReversal) || 0;
      
      // Se c'è provvigione concordata (percentuale)
      if (agreedCommission && !Number.isNaN(agreedCommission) && agreedCommission > 0 && price > 0) {
        grossCommission = (price * agreedCommission) / 100;
      }
      // Se c'è provvigione forfettaria (euro)
      else if (flatRateCommission && !Number.isNaN(flatRateCommission) && flatRateCommission > 0) {
        grossCommission = flatRateCommission;
      }
      
      // Calcola la provvigione netta (lorda - storno)
      const netCommission = grossCommission - storno;
      
      // Il risultato non può essere negativo (minimo 0)
      const finalCommission = Math.max(0, netCommission);
      
      // Formatta il numero con separatore delle migliaia e 2 decimali
      return finalCommission.toLocaleString('it-IT', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    });

    // Funzioni per capitalizzare i campi quando l'utente perde il focus
    const capitalizeTitle = () => {
      if (formData.value.Title && typeof formData.value.Title === 'string' && formData.value.Title.trim()) {
        formData.value.Title = toTitleCase(formData.value.Title);
      }
    };

    const capitalizeAddressLine = () => {
      if (formData.value.AddressLine && typeof formData.value.AddressLine === 'string' && formData.value.AddressLine.trim()) {
        formData.value.AddressLine = smartTitleCase(formData.value.AddressLine);
      }
    };

    const capitalizeLocation = () => {
      if (formData.value.Location && typeof formData.value.Location === 'string' && formData.value.Location.trim()) {
        formData.value.Location = toTitleCase(formData.value.Location);
      }
    };

    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      addPropertyModalRef,
      getAssetPath,
      countries,
      showTipologia,
      typesavailable,
      provinces,
      cities,
      loadProvinces,
      loadCitiesByProvince,
      isTrattativaRiservata,
      inserModel,
      invalidFields,
      effectiveCommission,
      selectedExposures,
      capitalizeTitle,
      capitalizeAddressLine,
      capitalizeLocation
    };
  },
});
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
