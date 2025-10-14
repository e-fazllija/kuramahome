<template>
  <div class="modal fade" id="kt_modal_add_property" ref="addPropertyModalRef" tabindex="-1" aria-hidden="true">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content" style="border-radius: 0.95rem; border: 1px solid #e9ecef; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_property_header" style="background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%); border-radius: 0.95rem 0.95rem 0 0; border-bottom: 1px solid #e9ecef;">
          <!--begin::Modal title-->
          <div class="d-flex align-items-center">
            <div class="symbol symbol-40px me-3">
              <span class="symbol-label" style="background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%); box-shadow: 0 4px 12px rgba(54, 153, 255, 0.3);">
                <i class="ki-duotone ki-home fs-2 text-white">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </span>
            </div>
            <div>
              <h2 class="fw-bold m-0 text-gray-900 fs-3">🏠 Aggiungi Immobile</h2>
              <span class="text-muted fs-7 fw-semibold">Inserisci i dati del nuovo immobile</span>
            </div>
          </div>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_property_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
            style="border-radius: 0.5rem; background: rgba(255, 255, 255, 0.8); border: 1px solid #e9ecef;"
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
                <label class="fs-6 fw-bold mb-3 text-gray-800">
                  <i class="ki-duotone ki-user fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <span class="required">Agente</span>
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <select class="form-select modern-select" v-model="formData.AgentId">
                  <option v-for="(user, index) in inserModel.Users" :key="index" :value="user.Id">👤 {{ user.Name }} {{ user.LastName }}</option>
                </select>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

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
              <div class="d-flex flex-column mb-2 fv-row">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-3 text-gray-800">
                  <i class="ki-duotone ki-text fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Titolo
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <el-form-item prop="Title">
                  <el-input v-model="formData.Title" type="text" class="modern-input" placeholder="Inserisci il titolo dell'immobile" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-2 fv-row">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-3 text-gray-800">
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
                  <textarea class="form-control modern-textarea" v-model="formData.Description" rows="3" placeholder="Descrivi le caratteristiche dell'immobile..."></textarea>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->



              <!--begin::Col-->
              <div class="d-flex flex-column mb-2 fv-row">
                <!--begin::Label-->
                <label class="fs-6 fw-semobold mb-2">Trattativa riservata</label>
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
                <label class="required fs-6 fw-bold mb-3 text-gray-800">
                  <i class="ki-duotone ki-dollar fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Prezzo
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <el-form-item prop="Price">
                  <el-input v-model="formData.Price" type="number" class="modern-input" placeholder="Inserisci il prezzo" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Col-->

              <!--begin::Col-->
              <div class="d-flex flex-column mb-2 fv-row">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-3 text-gray-800">
                  <i class="ki-duotone ki-calendar fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Data fine incarico
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <el-form-item prop="AssignmentEnd">
                  <el-input v-model="formData.AssignmentEnd" type="date" class="modern-input" />
                </el-form-item>
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
                class="fw-bold fs-6 rotate collapsible mb-7 p-3" 
                data-bs-toggle="collapse"
                href="#kt_modal_add_property_billing_info" 
                role="button" 
                aria-expanded="false"
                aria-controls="kt_property_view_details"
                style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 0.75rem; border: 1px solid #dee2e6; cursor: pointer; transition: all 0.3s ease;"
              >
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
                  <label class="fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-category fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span class="required">Categoria</span>
                  </label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <select class="form-select modern-select" v-model="formData.Category">
                    <option value="Residenziale">🏠 Residenziale</option>
                    <option value="Capannone">🏭 Capannone</option>
                    <option value="Negozi-Locale Commerciale">🏬 Negozi/Locale Commerciale</option>
                    <option value="Magazzino">📦 Magazzino</option>
                    <option value="Garage">🚗 Garage</option>
                    <option value="Ufficio">🏢 Ufficio</option>
                    <option value="Terreno">🌾 Terreno</option>
                    <option value="Rustico / Casale">🏚️ Rustico / Casale</option>
                  </select>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group Tipologia-->
                <div v-if="showTipologia" class="d-flex flex-column mb-7 fv-row">
                  <label class="fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-home-2 fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span class="required">Tipologia</span>
                  </label>
                  <select class="form-select modern-select" v-model="formData.Typology">
                    <option v-for="tipologia in typesavailable" :key="tipologia" :value="tipologia">
                      {{ tipologia }}
                    </option>
                  </select>
                </div>
                <!--end::Input group Tipologia-->

                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-document fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span class="required">Stato vendita o affitto</span>
                  </label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <select class="form-select modern-select" v-model="formData.Status">
                    <option value="Vendita">💰 Vendita</option>
                    <option value="Affitto">🏠 Affitto</option>
                  </select>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
              </div>


              <!--begin::Billing toggle-->
              <div 
                class="fw-bold fs-6 rotate collapsible mb-7 p-3" 
                data-bs-toggle="collapse"
                href="#kt_modal_add_property_billing_info2" 
                role="button" 
                aria-expanded="false"
                aria-controls="kt_property_view_details"
                style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 0.75rem; border: 1px solid #dee2e6; cursor: pointer; transition: all 0.3s ease;"
              >
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
                  <label class="required fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-map fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    Indirizzo
                  </label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <el-form-item prop="AddressLine">
                    <el-input v-model="formData.AddressLine" type="text" class="modern-input" placeholder="Via, numero civico" />
                  </el-form-item>
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
                    <select class="form-select modern-select" v-model="formData.State">
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
                    <select class="form-select modern-select" aria-label="Single select example" v-model="formData.Town" required>
                        <option v-for="(city, index) in cities" :key="index" :value="city.Id">🏙️ {{ city.Name }} </option>
                    </select>
                    <!--end::Input-->
                </div>
                <!--end::Input group-->
              
                <!--begin::Input group-->
                <div class="row g-9 mb-7">

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
                    <select class="form-select modern-select" aria-label="Single select example" v-model="formData.Location">
                        <option v-for="(location, index) in locations" :key="index" :value="location.Id">📍 {{ location.Name }} </option>
                    </select>
                    <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Col-->
                  <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-code fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    Codice Postale
                  </label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <el-form-item prop="PostCode">
                    <el-input v-model="formData.PostCode" type="number" class="modern-input" placeholder="CAP" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Col-->

                </div>
                <!--end::Input group-->
              </div>

              <div 
                class="fw-bold fs-6 rotate collapsible mb-7 p-3" 
                data-bs-toggle="collapse"
                href="#kt_modal_add_property_billing_info3" 
                role="button" 
                aria-expanded="true"
                aria-controls="kt_property_view_details"
                style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 0.75rem; border: 1px solid #dee2e6; cursor: pointer; transition: all 0.3s ease;"
              >
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
                  <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-garden fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    Giardino (mq)
                  </label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <el-form-item prop="MQGarden">
                    <el-input v-model="formData.MQGarden" type="number" class="modern-input" placeholder="Metri quadrati" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-dollar fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    Spese condominiali
                  </label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <el-form-item prop="CondominiumExpenses">
                    <el-input v-model="formData.CondominiumExpenses" type="number" class="modern-input" placeholder="€ Spese mensili" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Col-->

                <!--begin::Input group-->
                <div class="row g-9 mb-7">
                  <!--begin::Col-->
                  <div class="d-flex flex-column mb-7 fv-row">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-bold mb-3 text-gray-800">
                      <i class="ki-duotone ki-home-2 fs-5 me-2 text-primary">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      Superficie commerciale (m²)
                    </label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <el-form-item prop="CommercialSurfaceate">
                      <el-input v-model="formData.CommercialSurfaceate" type="number" class="modern-input" placeholder="Metri quadrati" />
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                  <!--end::Col-->
                </div>

                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-arrow-up fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    Piano
                  </label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <select class="form-select modern-select" v-model="formData.Floor">
                    <option value>Scegli</option>
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
                <!--end::Col-->

                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-home-2 fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    Totale piani edificio
                  </label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <el-form-item prop="TotalBuildingfloors">
                    <el-input v-model="formData.TotalBuildingfloors" type="number" class="modern-input" placeholder="Numero piani" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-arrow-up fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    Ascensori
                  </label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <el-form-item prop="Elevators">
                    <el-input v-model="formData.Elevators" type="number" class="modern-input" placeholder="Numero ascensori" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-gray-800">
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
                    <el-input v-model="formData.MoreDetails" type="text" class="modern-input" placeholder="Inserisci dettagli aggiuntivi" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Col-->

                <!--begin::Input group-->
                <div class="row g-9 mb-7">
                  <!--begin::Col-->
                  <div class="col-md-6 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-bold mb-3 text-gray-800">
                      <i class="ki-duotone ki-home-2 fs-5 me-2 text-primary">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      Camere da letto
                    </label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <el-form-item prop="Bedrooms">
                      <el-input v-model="formData.Bedrooms" type="number" class="modern-input" placeholder="Numero camere" />
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                  <!--end::Col-->
                </div>

                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-home-2 fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    Locali
                  </label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <el-form-item prop="WarehouseRooms">
                    <el-input v-model="formData.WarehouseRooms" type="number" class="modern-input" placeholder="Numero locali" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Col-->

                <!--begin::Input group-->
                <div class="row g-9 mb-7">
                  <!--begin::Col-->
                  <div class="col-md-6 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-bold mb-3 text-gray-800">
                      <i class="ki-duotone ki-coffee fs-5 me-2 text-primary">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      Cucine
                    </label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <el-form-item prop="Kitchens">
                      <el-input v-model="formData.Kitchens" type="number" class="modern-input" placeholder="Numero cucine" />
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                  <!--end::Col-->
                </div>

                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-water fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    Bagni
                  </label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <el-form-item prop="Bathrooms">
                    <el-input v-model="formData.Bathrooms" type="number" class="modern-input" placeholder="Numero bagni" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Col-->

                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-home-2 fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span class="">Arredamento</span>
                  </label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <select class="form-select modern-select" v-model="formData.Furniture">
                    <option value="">🏠 Seleziona il tipo di arredamento</option>
                    <option value="Arredato">✅ Arredato</option>
                    <option value="Non Arredato">❌ Non Arredato</option>
                    <option value="Parzialmente Arredato">🔄 Parzialmente Arredato</option>
                    <option value="Arredato Solo Cucina">🍴 Arredato Solo Cucina</option>
                  </select>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <label class="fs-6 fw-bold mb-3 text-gray-800">
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
                  <el-form-item prop="MoreDetails">
                    <el-input v-model="formData.MoreDetails" type="text" class="modern-input" placeholder="Es: Balcone, Terrazzo, etc." />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-car fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    Posti Auto
                  </label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <el-form-item prop="ParkingSpaces">
                    <el-input v-model="formData.ParkingSpaces" type="number" class="modern-input" placeholder="Numero posti auto" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Col-->

                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-fire fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span class="">Riscaldamento</span>
                  </label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <select class="form-select modern-select" v-model="formData.Heating">
                    <option value="Nessuno">❌ Nessuno</option>
                    <option value="Autonomo">🏠 Autonomo</option>
                    <option value="Centralizzato">🏢 Centralizzato</option>
                  </select>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-compass fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span class="">Esposizione</span>
                  </label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <select class="form-select modern-select" v-model="formData.Exposure" multiple style="height: auto;">
                    <option value="Nord">🧭 Nord</option>
                    <option value="Sud">☀️ Sud</option>
                    <option value="Est">🌅 Est</option>
                    <option value="Ovest">🌄 Ovest</option>
                  </select>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-element-11 fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span class="">Classe energetica</span>
                  </label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <select class="form-select modern-select" v-model="formData.EnergyClass">
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
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-abstract-26 fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span class="">Tipo di proprietà</span>
                  </label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <el-form-item prop="TypeOfProperty">
                    <el-input v-model="formData.TypeOfProperty" type="text" class="modern-input" placeholder="Es: Intera proprietà, Nuda proprietà, etc." />
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
                    <span class="">Stato dell'immobile</span>
                  </label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <select class="form-select modern-select" v-model="formData.StateOfTheProperty">
                    <option value="">🏠 Seleziona lo Stato dell'immobile</option>
                    <option value="Nuovo / In Costruzione">🏗️ Nuovo / In Costruzione</option>
                    <option value="Ottimo / Ristrutturato">⭐ Ottimo / Ristrutturato</option>
                    <option value="Buono / Abitabile">✅ Buono / Abitabile</option>
                    <option value="Da Ristrutturare">🔧 Da Ristrutturare</option>
                  </select>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-calendar fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    Anno di costruzione
                  </label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <el-form-item prop="YearOfConstruction">
                    <el-input v-model="formData.YearOfConstruction" type="number" class="modern-input" placeholder="Es: 2020" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Col-->
                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-check-circle fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <span class="">Disponibilità</span>
                  </label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <select class="form-select modern-select" v-model="formData.Availability">
                    <option value="Libero">✅ Libero</option>
                    <option value="Occupato">🔒 Occupato</option>
                  </select>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                        <!--begin::Input group-->
        <div class="d-flex flex-column mb-7 fv-row">
          <!--begin::Label-->
          <label class="fs-6 fw-bold mb-3 text-gray-800">
            <i class="ki-duotone ki-document fs-5 me-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            <span class="required">Tipologia Incarico</span>
          </label>
          <!--end::Label-->
          <!--begin::Input-->
          <select class="form-select modern-select" v-model="formData.TypeOfAssignment">
            <option value="Verbale">📝 Verbale</option>
            <option value="Esclusivo">⭐ Esclusivo</option>
            <option value="Semi-Verbale">📋 Semi-Verbale</option>
            <option value="Immobile MLS">🌐 Immobile MLS</option>
          </select>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Col-->
        <div class="col-md-4 fv-row">
          <!--begin::Label-->
          <label class="fs-6 fw-bold mb-3 text-gray-800">
            <i class="ki-duotone ki-percentage fs-5 me-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            Provvigione Concordata
          </label>
          <!--end::Label-->
          <!--begin::Input-->
          <el-form-item prop="AgreedCommission">
            <el-input v-model="formData.AgreedCommission" type="number" class="modern-input" placeholder="Percentuale">
              <template #append>
                <span>%</span>
              </template>
            </el-input>
          </el-form-item>
          <!--end::Input-->
        </div>
        <!--end::Col-->

        <!--begin::Col-->
        <div class="col-md-4 fv-row">
          <!--begin::Label-->
          <label class="fs-6 fw-bold mb-3 text-gray-800">
            <i class="ki-duotone ki-percentage fs-5 me-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            Provvigione Forfettaria
          </label>
          <!--end::Label-->
          <!--begin::Input-->
          <el-form-item prop="FlatRateCommission">
            <el-input v-model="formData.FlatRateCommission" type="number" class="modern-input" placeholder="Percentuale">
              <template #append>
                <span>%</span>
              </template>
            </el-input>
          </el-form-item>
          <!--end::Input-->
        </div>
        <!--end::Col-->

        <!--begin::Col-->
        <div class="col-md-4 fv-row">
          <!--begin::Label-->
          <label class="fs-6 fw-bold mb-3 text-gray-800">
            <i class="ki-duotone ki-percentage fs-5 me-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            Storno Provvigione
          </label>
          <!--end::Label-->
          <!--begin::Input-->
          <el-form-item prop="StornoProvvigione">
            <el-input v-model="formData.StornoProvvigione" type="number" class="modern-input" placeholder="Percentuale">
              <template #append>
                <span>%</span>
              </template>
            </el-input>
          </el-form-item>
          <!--end::Input-->
        </div>
        <!--end::Col-->

                <!--begin::Input group-->
                <div class="d-flex flex-column mb-2 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-youtube fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    Url Video
                  </label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <el-form-item prop="VideoUrl">
                    <el-input v-model="formData.VideoUrl" type="text" class="modern-input" placeholder="https://youtube.com/..." />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

              </div>

              <div class="fv-row mb-15">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-3 text-gray-800">
                  <i class="ki-duotone ki-picture fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Immagini
                </label>
                <!--end::Label-->
                <input class="form-control modern-input" type="file" multiple @change="onFileChanged">

              </div>
              <!--end::Input group-->
              <!--end::Modal body-->
            </div>
            <!--begin::Modal footer-->
            <div class="modal-footer flex-center" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 0 0 0.95rem 0.95rem; border-top: 1px solid #dee2e6; padding: 1.5rem 2rem;">
              <!--begin::Button-->
              <button
                type="reset"
                id="kt_modal_add_property_cancel"
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
import { defineComponent, ref, watch, onMounted } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { countries } from "@/core/data/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { createRealEstateProperty, RealEstateProperty, getToInsert, InsertModel } from "@/core/data/properties";
import { useAuthStore } from "@/stores/auth";
import Multiselect from '@vueform/multiselect'
import { getCities, getLocationsByCity, getGroupedLocations, getProvincesForSelect, getCitiesByProvinceName, getLocationsByCityName } from "@/core/data/locations";

export default defineComponent({
  name: "add-property-modal",
  components: {Multiselect},
  setup(_, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addPropertyModalRef = ref<null | HTMLElement>(null);
    const store = useAuthStore();
    const provinces = ref<Array<{Id: string, Name: string}>>([]);
    const cities = ref<Array<{Id: string, Name: string}>>([]);
    const locations = ref<Array<{Id: string, Name: string}>>([]);
    const cityLocationsMap = ref<{[key: string]: Array<{Id: string, Name: string}>}>({});
    const loading = ref<boolean>(false);
    const isTrattativaRiservata = ref(false);
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
      Town: "",
      State: "",
      Location:"",
      PostCode: "",
      CommercialSurfaceate: 0,
      TotalBuildingfloors: 0,
      Elevators: 0,
      MoreDetails: "",
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
      StateOfTheProperty: "",
      YearOfConstruction: 0,
      Price: 0,
      PriceReduced: 0,
      MQGarden:0,
      CondominiumExpenses: 0,
      Availability: "",
      Description: "Descrizione dell'immobile",
      CustomerId: null,
      AgentId: "",
      AssignmentEnd: new Date().toISOString().split('T')[0], // Data odierna come default
      Agent: null,
      VideoUrl: "",
      AgreedCommission: 0,
      FlatRateCommission: 0,
      StornoProvvigione: 0,
      TypeOfAssignment: "",
    });
    const inserModel = ref<InsertModel>({
      Customers: [],
      Users: []
    });
    const showTipologia = ref(true);

    // Carica le province dal database
    const loadProvinces = async () => {
      try {
        const provincesData = await getProvincesForSelect();
        provinces.value = provincesData;
      } catch (error) {
        console.error("Errore nel caricamento delle province:", error);
      }
    };

    // Carica le città di una provincia specifica
    const loadCitiesByProvince = async (provinceName: string) => {
      try {
        if (provinceName) {
          const citiesData = await getCitiesByProvinceName(provinceName);
          cities.value = citiesData;
        } else {
          cities.value = [];
        }
      } catch (error) {
        console.error("Errore nel caricamento delle città:", error);
        cities.value = [];
      }
    };

    // Carica le località di una città specifica
    const loadLocationsByCity = async (cityName: string) => {
      try {
        if (cityName) {
          const locationsData = await getLocationsByCityName(cityName);
          locations.value = locationsData;
        } else {
          locations.value = [];
        }
      } catch (error) {
        console.error("Errore nel caricamento delle località:", error);
        locations.value = [];
      }
    };

    const selectedFile = ref<FileList | null>(null);
    const onFileChanged = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        formData.value.Files = target.files;
      }
    };

    const tipologiePerCategoria = {
          Residenziale: ["Appartamento", "Attico", "Mansarda", "Loft", "Soffitta", "Casale", "Rustico", "Villa Unifamiliare",
          "Villa Bifamiliare", "Villa Plurifamiliare", "Villa a Schiera"],
          Commerciale :["Locale commerciale", "Negozio"],
          Capannone: ["Capannone artigianale", "Capannone industriale"],
          Garage: ["Box singolo", "Box doppio", "Posto auto"],
          Terreno: ["Edificabile", "Agricolo", "Non Edificabile"],
    };

    const typesavailable = ref<string[]>(tipologiePerCategoria[formData.value.Category]);

    watch(
      () => formData.value.Category,
      (newCategoria) => {
        if (newCategoria && tipologiePerCategoria[formData.value.Category]) {
          typesavailable.value = tipologiePerCategoria[formData.value.Category];
          showTipologia.value = true;
        } else {
          showTipologia.value = false;
          formData.value.Typology = "";
          typesavailable.value = [];
        }
      }
    );

     watch(
        () => formData.value.State,
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
            if (newTown) {
                // Carica le località della città selezionata
                await loadLocationsByCity(newTown);
                formData.value.Location = null;
            } else {
                locations.value = [];
                formData.value.Location = null;
            }
        }
        );


    const rules = ref({
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
      Town: [
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
          message: "Il codice postale è obbligatorio",
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
      TotalBuildingfloors: [
        {
          required: true,
          message: "Il totale piani edificio è obbligatorio",
          trigger: "change",
        },
      ],
      Price: [
        {
          required: true,
          message: "Il prezzo è obbligatorio",
          trigger: "change",
        },
      ],
      AssignmentEnd: [
        {
          required: true,
          message: "La data fine incarico è obbligatoria",
          trigger: "change",
        },
      ],
    });

    onMounted(async () => {
      inserModel.value = await getToInsert(store.user.AgencyId);
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
      await formRef.value.validate(async (valid: boolean) => {
        if (valid) {
          loading.value = true;
          
          // Se la checkbox "Trattativa riservata" è selezionata, imposta il prezzo a -1
          if (isTrattativaRiservata.value) {
            formData.value.Price = -1;
          }
          
          await createRealEstateProperty(formData.value);

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
              loading.value = false;
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
        }
      });
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
      selectedFile,
      onFileChanged,
      inserModel,
      provinces,
      cities,
      locations,
      loadProvinces,
      loadCitiesByProvince,
      loadLocationsByCity,
      isTrattativaRiservata
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

/* Collapsible section */
.collapsible:hover {
  background: linear-gradient(135deg, #e8f4ff 0%, #f1f3ff 100%) !important;
  border-color: #3699ff !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(54, 153, 255, 0.15);
}

.collapsible:hover .ki-duotone {
  transform: scale(1.1);
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
