<template>
  <!--begin::Basic info-->
  <div class="container-fluid px-0 px-md-3">
    <div class="card card-palette mb-3 mb-md-5 mb-xl-10">
      <!--begin::Card header-->
      <div class="card-header card-palette-header border-0">
        <!--begin::Card title-->
        <div class="card-title m-0">
          <div class="d-flex align-items-center flex-wrap">
            <div class="symbol symbol-40px symbol-sm-45px me-2 me-md-3">
              <span class="symbol-label bg-primary">
                <i class="ki-duotone ki-home fs-2 fs-md-1 text-white">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </span>
            </div>
            <div class="flex-grow-1">
              <h3 class="fw-bold m-0 text-palette-primary fs-4 fs-md-3">Aggiorna Immobile</h3>
              <span class="text-palette-secondary fs-8 fs-md-7 fw-semibold d-block mt-1">
                <span v-if="!canModify">Visualizzazione in sola lettura</span>
                <span v-else>Modifica i dati dell'immobile</span>
              </span>
            </div>
          </div>
        </div>
        <!--end::Card title-->
      </div>
      <!--begin::Card header-->
    </div>
  </div>
  <KTSpinner v-if="loading" :centered="true" size="md" />
  <!--begin::Content-->
  <div v-else class="collapse show">
    <!--begin::Assignment Status Banner-->
    <div v-if="assignmentStatusMessage" class="container-fluid px-0 px-md-3 mb-3">
      <div :class="assignmentStatusClass" class="card border-0 shadow-sm">
        <div class="card-body p-4">
          <div class="d-flex align-items-center">
            <div class="symbol symbol-40px me-3">
              <span :class="assignmentStatusIconClass" class="symbol-label">
                <i :class="assignmentStatusIcon" class="fs-2">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </span>
            </div>
            <div class="flex-grow-1">
              <h5 class="fw-bold mb-1">{{ assignmentStatusTitle }}</h5>
              <p class="mb-0 fs-7">{{ assignmentStatusMessage }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--end::Assignment Status Banner-->
    <!--begin::Tabs-->
    <div class="container-fluid px-0 px-md-3">
      <ul class="nav nav-tabs flex-nowrap overflow-auto" id="propertyTabs" role="tablist"
        style="scrollbar-width: none; -ms-overflow-style: none;">
        <li class="nav-item flex-shrink-0" role="presentation">
          <button class="nav-link active" id="data-tab" data-bs-toggle="tab" data-bs-target="#data-pane" type="button"
            role="tab" aria-controls="data-pane" aria-selected="true">
            <i class="ki-duotone ki-notepad fs-5 fs-md-4 me-1 me-md-2">
              <span class="path1"></span>
              <span class="path2"></span>
              <span class="path3"></span>
              <span class="path4"></span>
              <span class="path5"></span>
            </i>
            <span class="d-none d-sm-inline">Dati Immobile</span>
            <span class="d-inline d-sm-none">Dati</span>
          </button>
        </li>
        <li class="nav-item flex-shrink-0" role="presentation">
          <button class="nav-link" id="images-tab" data-bs-toggle="tab" data-bs-target="#images-pane" type="button"
            role="tab" aria-controls="images-pane" aria-selected="false">
            <i class="ki-duotone ki-picture fs-5 fs-md-4 me-1 me-md-2">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            <span class="d-none d-sm-inline">Immagini</span>
            <span class="d-inline d-sm-none">Foto</span>
          </button>
        </li>
      </ul>
      <!--begin::Form-->
      <el-form @submit.prevent="submit()" :model="formData" :rules="rules" ref="formRef" enctype="multipart/form-data">
        <div class="tab-content" id="propertyTabsContent">
          <!--begin::Data Tab-->
          <div class="tab-pane fade show active" id="data-pane" role="tabpanel" aria-labelledby="data-tab">
            <!--begin::Card body-->
            <div class="card-body card-palette border rounded p-3 p-md-6 p-xl-9"
              :class="{ 'opacity-50': !canModify }">
              <div class="mb-4 mb-md-5 mb-xl-6">
                <div class="d-flex align-items-center mb-3">
                  <div class="me-3">
                    <i class="ki-duotone ki-notepad fs-3 fs-md-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                      <span class="path3"></span>
                      <span class="path4"></span>
                      <span class="path5"></span>
                    </i>
                  </div>
                  <div class="flex-grow-1">
                    <h4 class="h5 h4-md fw-bold text-palette-primary mb-1">Dati Principali</h4>
                    <p class="text-muted small mb-0">Informazioni generali sull'immobile.</p>
                  </div>
                </div>
                <div>
                  <div class="mb-3">
                    <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">
                      <i class="ki-duotone ki-text fs-5 text-primary">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      Titolo <span class="text-danger">*</span>
                    </label>
                    <el-form-item prop="Title">
                      <input class="form-control form-control-lg" v-model="formData.Title" type="text"
                        placeholder="Inserisci il titolo dell'immobile" required
                        :disabled="!canModify" />
                    </el-form-item>
                  </div>

                  <div class="row g-3 mb-3">
                    <div class="col-12 col-md-6">
                      <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">
                        <i class="ki-duotone ki-user fs-5 text-primary">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        Agente/Agenzia <span class="text-danger">*</span>
                      </label>
                      <el-form-item prop="AgentId">
                        <select 
                          class="form-select form-select-lg" 
                          v-model="formData.AgentId" 
                          required
                          :disabled="!canModify"
                        >
                          <option value="">Seleziona agente o agenzia</option>
                          <option
                            v-for="user in inserModel.Users"
                            :key="user.Id"
                            :value="user.Id"
                          >
                            {{ user.Role === 'Agency' ? '🏢 Agenzia: ' : '👤 ' }}{{ user.FirstName }} {{ user.LastName }}
                          </option>
                        </select>
                      </el-form-item>
                    </div>

                    <div class="col-12 col-md-6">
                      <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">
                        <i class="ki-duotone ki-home fs-5 text-primary">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        Stato vendita o affitto <span class="text-danger">*</span>
                      </label>
                      <el-form-item prop="Status">
                        <select class="form-select form-select-lg" v-model="formData.Status" required :disabled="!canModify">
                          <option value="">Scegli tra vendita e affitto</option>
                          <option value="Vendita">Vendita</option>
                          <option value="Affitto">Affitto</option>
                        </select>
                      </el-form-item>
                    </div>
                  </div>

                  <div class="row g-3 mb-3" v-if="showTipologia">
                    <div class="col-12 col-md-6">
                      <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">
                        <i class="ki-duotone ki-category fs-5 text-primary">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        Categoria <span class="text-danger">*</span>
                      </label>
                      <el-form-item prop="Category">
                        <select class="form-select form-select-lg" v-model="formData.Category" required :disabled="!canModify">
                          <option value="">Seleziona una Categoria...</option>
                          <option value="Residenziale">Residenziale</option>
                          <option value="Capannone">Capannone</option>
                          <option value="Negozi-Locale Commerciale">Negozi/Locale Commerciale</option>
                          <option value="Magazzino">Magazzino</option>
                          <option value="Garage">Garage</option>
                          <option value="Ufficio">Ufficio</option>
                          <option value="Terreno">Terreno</option>
                          <option value="Rustico / Casale">Rustico / Casale</option>
                        </select>
                      </el-form-item>
                    </div>

                    <div class="col-12 col-md-6">
                      <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">
                        <i class="ki-duotone ki-element-plus fs-5 text-primary">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        Tipologia <span class="text-danger">*</span>
                      </label>
                      <el-form-item prop="Typology">
                        <select class="form-select form-select-lg" v-model="formData.Typology"
                          :disabled="!canModify">
                          <option v-for="tipologia in typesavailable" :key="tipologia" :value="tipologia">
                            {{ tipologia }}
                          </option>
                        </select>
                      </el-form-item>
                    </div>
                  </div>

                  <div v-else class="row g-3 mb-3">
                    <div class="col-12 col-md-6">
                      <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">
                        <i class="ki-duotone ki-category fs-5 text-primary">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        Categoria <span class="text-danger">*</span>
                      </label>
                      <el-form-item prop="Category">
                        <select class="form-select form-select-lg" v-model="formData.Category" required :disabled="!canModify">
                          <option value="Residenziale">Residenziale</option>
                          <option value="Capannone">Capannone</option>
                          <option value="Negozi-Locale Commerciale">Negozi/Locale Commerciale</option>
                          <option value="Magazzino">Magazzino</option>
                          <option value="Garage">Garage</option>
                          <option value="Ufficio">Ufficio</option>
                          <option value="Terreno">Terreno</option>
                          <option value="Rustico / Casale">Rustico / Casale</option>
                        </select>
                      </el-form-item>
                    </div>
                  </div>

                  <div class="row g-3 mb-3">
                    <div class="col-12 col-md-6">
                      <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">
                        <i class="ki-duotone ki-briefcase fs-5 text-primary">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        Tipologia incarico
                      </label>
                      <select class="form-select form-select-lg" v-model="formData.TypeOfAssignment" :disabled="!canModify">
                        <option value="Esclusivo">Esclusivo</option>
                        <option value="Non Esclusivo">Non Esclusivo</option>
                        <option value="Verbale">Verbale</option>
                        <option value="Semi-Verbale">Semi-Verbale</option>
                        <option value="Immobile MLS">Immobile MLS</option>
                      </select>
                    </div>

                    <div class="col-12 col-md-6">
                      <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">Disponibilità <span class="text-danger">*</span></label>
                      <el-form-item prop="Availability">
                        <select class="form-select form-select-lg" v-model="formData.Availability" :disabled="!canModify">
                          <option value="">Seleziona la Disponibilità</option>
                          <option value="Libero">Libero</option>
                          <option value="Occupato">Occupato</option>
                        </select>
                      </el-form-item>
                    </div>
                  </div>

                </div>
              </div>

              <div class="mb-4 mb-md-5 mb-xl-6">
                <div class="d-flex align-items-center mb-3">
                  <div class="me-3">
                    <i class="ki-duotone ki-geolocation fs-3 fs-md-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                  </div>
                  <div class="flex-grow-1">
                    <h4 class="h5 h4-md fw-bold text-palette-primary mb-1">Localizzazione</h4>
                    <p class="text-muted small mb-0">Riferimenti geografici e indirizzo completo.</p>
                  </div>
                </div>
                <div>
                  <div class="mb-3">
                    <label class="form-label required">Indirizzo</label>
                    <el-form-item prop="AddressLine">
                      <input class="form-control form-control-lg" v-model="formData.AddressLine" type="text" required
                        :disabled="!canModify" />
                    </el-form-item>
                  </div>

                  <div class="row g-3 mb-3">
                    <div class="col-12 col-md-6">
                      <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">Provincia <span
                          class="text-danger">*</span></label>
                      <el-form-item prop="State">
                        <select class="form-select form-select-lg" v-model="formData.State" required
                          :disabled="!canModify">
                          <option value="">🗺️ Seleziona provincia</option>
                          <option v-for="(province, index) in provinces" :key="index" :value="province.Id">
                            {{ province.Name }}
                          </option>
                        </select>
                      </el-form-item>
                    </div>

                    <div class="col-12 col-md-6">
                      <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">Comune <span
                          class="text-danger">*</span></label>
                      <el-form-item prop="City">
                        <select class="form-select form-select-lg" v-model="formData.City" required
                          :disabled="!canModify">
                          <option value="">Seleziona città</option>
                          <option v-for="(city, index) in cities" :key="index" :value="city.Name">
                            {{ city.Name }}{{ city.CAP ? ` (${city.CAP})` : '' }}
                          </option>
                        </select>
                      </el-form-item>
                    </div>
                  </div>

                  <div class="row g-3 mb-3">
                    <div class="col-12 col-md-6">
                      <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">Località</label>
                      <input class="form-control form-control-lg" v-model="formData.Location" type="text"
                        placeholder="Inserisci la località" :disabled="!canModify" />
                    </div>

                    <div class="col-12 col-md-6">
                      <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">CAP <span
                          class="text-danger">*</span></label>
                      <el-form-item prop="PostCode">
                        <input class="form-control form-control-lg" v-model="formData.PostCode" type="text"
                          placeholder="Inserisci il CAP" required
                          :disabled="!canModify" />
                      </el-form-item>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mb-4 mb-md-5 mb-xl-6">
                <div class="d-flex align-items-center mb-3">
                  <div class="me-3">
                    <i class="ki-duotone ki-setting fs-3 fs-md-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                  </div>
                  <div class="flex-grow-1">
                    <h4 class="h5 h4-md fw-bold text-palette-primary mb-1">Caratteristiche Tecniche</h4>
                    <p class="text-muted small mb-0">Dimensioni, dotazioni e finiture dell'immobile.</p>
                  </div>
                </div>
                <div>
                  <div class="mb-3">
                    <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">Superficie commerciale
                      (m²) <span class="text-danger">*</span></label>
                    <el-form-item prop="CommercialSurfaceate">
                      <input class="form-control form-control-lg" v-model="formData.CommercialSurfaceate" type="number"
                        required :disabled="!canModify" />
                    </el-form-item>
                  </div>

                  <div class="row g-3 mb-3">
                    <div class="col-12 col-md-6 col-lg-4">
                      <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">Piano</label>
                      <select class="form-select form-select-lg" v-model="formData.Floor"
                        :disabled="!canModify">
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
                    </div>

                    <div class="col-12 col-md-6 col-lg-4">
                      <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">Totale piani
                        edificio</label>
                      <input class="form-control form-control-lg" v-model="formData.TotalBuildingfloors" type="number"
                        :disabled="!canModify" />
                    </div>

                    <div class="col-12 col-md-6 col-lg-4">
                      <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">Ascensori</label>
                      <input class="form-control form-control-lg" v-model="formData.Elevators" type="number"
                        :disabled="!canModify" />
                    </div>
                  </div>

                  <div class="row g-3 mb-3">
                    <div class="col-12 col-md-6">
                      <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">Giardino (mq)</label>
                      <input class="form-control form-control-lg" v-model="formData.MQGarden" type="number"
                        :disabled="!canModify" />
                    </div>

                    <div class="col-12 col-md-6">
                      <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">Spese
                        condominiali</label>
                      <div class="input-group">
                        <input class="form-control form-control-lg" v-model="formData.CondominiumExpenses" type="number"
                          placeholder="Inserisci importo" :disabled="!canModify" />
                        <span class="input-group-text">€</span>
                      </div>
                    </div>
                  </div>

                  <div class="row g-3 mb-3">
                    <div class="col-12 col-md-6 col-lg-3">
                      <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">Camere da letto</label>
                      <input class="form-control form-control-lg" v-model="formData.Bedrooms" type="number"
                        :disabled="!canModify" />
                    </div>

                    <div class="col-12 col-md-6 col-lg-3">
                      <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">Locali</label>
                      <input class="form-control form-control-lg" v-model="formData.WarehouseRooms" type="number"
                        :disabled="!canModify" />
                    </div>

                    <div class="col-12 col-md-6 col-lg-3">
                      <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">Cucine</label>
                      <input class="form-control form-control-lg" v-model="formData.Kitchens" type="number"
                        :disabled="!canModify" />
                    </div>

                    <div class="col-12 col-md-6 col-lg-3">
                      <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">Bagni</label>
                      <input class="form-control form-control-lg" v-model="formData.Bathrooms" type="number"
                        :disabled="!canModify" />
                    </div>
                  </div>

                  <div class="mb-3">
                    <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">Arredamento</label>
                    <select class="form-select form-select-lg" v-model="formData.Furniture"
                      :disabled="!canModify">
                      <option value="">🪑 Seleziona Arredamento</option>
                  <option value="Arredato">✅ Arredato</option>
                  <option value="Parzialmente Arredato">🟡 Parzialmente Arredato</option>
                  <option value="Non Arredato">❌ Non Arredato</option>
                    </select>
                  </div>

                  <div class="mb-3">
                    <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">Posti auto</label>
                    <input class="form-control form-control-lg" v-model="formData.ParkingSpaces" type="number"
                      :disabled="!canModify" />
                  </div>

                  <div class="mb-3">
                    <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">Riscaldamento</label>
                    <select class="form-select form-select-lg" v-model="formData.Heating"
                      :disabled="!canModify">
                      <option value="Autonomo">🏠 Autonomo</option>
                        <option value="Centralizzato">🏢 Centralizzato</option>
                        <option value="Inesistente">❌ Inesistente</option>
                    </select>
                  </div>

                  <div class="mb-3">
                    <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">Esposizione</label>
                    <select class="form-select form-select-lg" v-model="selectedExposures" multiple
                      :disabled="!canModify"
                      style="min-height: 100px;">
                      <option value="Nord">Nord</option>
                      <option value="Sud">Sud</option>
                      <option value="Est">Est</option>
                      <option value="Ovest">Ovest</option>
                    </select>
                    <small class="text-palette-secondary d-block mt-1 fs-8">
                      Tieni premuto Ctrl (o Cmd su Mac) per selezionare più esposizioni
                    </small>
                  </div>

                  <div class="mb-3">
                    <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">Classe energetica <span
                        class="text-danger">*</span></label>
                    <el-form-item prop="EnergyClass">
                      <select class="form-select form-select-lg" v-model="formData.EnergyClass"
                        :disabled="!canModify">
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
                  </div>

                  <div class="mb-3">
                    <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">Tipo di proprietà</label>
                    <input class="form-control form-control-lg" v-model="formData.TypeOfProperty" type="text"
                      :disabled="!canModify" />
                  </div>

                  <div class="mb-3">
                    <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">Stato dell&apos;immobile
                      <span class="text-danger">*</span></label>
                    <el-form-item prop="StateOfTheProperty">
                      <select class="form-select form-select-lg" v-model="formData.StateOfTheProperty"
                        :disabled="!canModify">
                        <option value="0">🔒 Affittato</option>
                  <option value="1">🏗️ In corso di costruzione</option>
                  <option value="2">✅ Libero</option>
                  <option value="3">📋 Libero al Rogito</option>
                  <option value="4">🏛️ Nuda Proprietà</option>
                  <option value="5">👥 Occupato</option>
                      </select>
                    </el-form-item>
                  </div>

                  <div class="mb-3">
                    <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">Anno di costruzione <span
                        class="text-danger">*</span></label>
                    <el-form-item prop="YearOfConstruction">
                      <input class="form-control form-control-lg" v-model="formData.YearOfConstruction" type="number"
                        :disabled="!canModify" />
                    </el-form-item>
                  </div>

                  <div class="mb-3">
                    <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">Altri dettagli</label>
                    <input class="form-control form-control-lg" v-model="formData.MoreDetails" type="text"
                      :disabled="!canModify" />
                  </div>

                  <div class="mb-3">
                    <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">Altre
                      caratteristiche</label>
                    <input class="form-control form-control-lg" v-model="formData.MoreFeatures" type="text"
                      :disabled="!canModify" />
                  </div>
                </div>
              </div>

              <div class="mb-4 mb-md-5 mb-xl-6">
                <div class="d-flex align-items-center mb-3">
                  <div class="me-3">
                    <i class="ki-duotone ki-wallet fs-3 fs-md-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                  </div>
                  <div class="flex-grow-1">
                    <h4 class="h5 h4-md fw-bold text-palette-primary mb-1">Valori Economici</h4>
                    <p class="text-muted small mb-0">Gestisci prezzi, trattative e provvigioni.</p>
                  </div>
                </div>
                <div>
                  <div class="mb-3">
                    <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">Trattativa
                      riservata</label>
                    <div class="form-check form-switch form-check-custom form-check-solid">
                      <input class="form-check-input" type="checkbox" id="toggle-private-deal"
                        v-model="isTrattativaRiservata" :disabled="!canModify" />
                      <label class="form-check-label ms-3 fw-semibold" for="toggle-private-deal">
                        Nascondi il prezzo pubblico
                      </label>
                    </div>
                  </div>

                  <div class="row g-3 mb-3" v-if="!isTrattativaRiservata">
                    <div class="col-12 col-md-6">
                      <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">Prezzo <span
                          class="text-danger">*</span></label>
                      <el-form-item prop="Price">
                        <div class="input-group">
                          <input class="form-control form-control-lg" v-model="formData.Price" type="number"
                            placeholder="Inserisci il prezzo" required
                            :disabled="!canModify" />
                          <span class="input-group-text">€</span>
                        </div>
                      </el-form-item>
                    </div>

                    <div class="col-12 col-md-6">
                      <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">Prezzo
                        ribassato</label>
                      <div class="input-group">
                        <input class="form-control form-control-lg" v-model="formData.PriceReduced" type="number"
                          placeholder="Inserisci il prezzo ribassato" :disabled="!canModify" />
                        <span class="input-group-text">€</span>
                      </div>
                    </div>
                  </div>

                  <div class="row g-3 mb-3">
                    <div class="col-12 col-md-6 col-lg-4">
                      <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">Provvigione
                        concordata</label>
                      <el-form-item prop="AgreedCommission">
                        <div class="input-group">
                          <input class="form-control form-control-lg" v-model="formData.AgreedCommission" type="number"
                            placeholder="Inserisci percentuale" :disabled="!canModify" />
                          <span class="input-group-text">%</span>
                        </div>
                      </el-form-item>
                    </div>

                    <div class="col-12 col-md-6 col-lg-4">
                      <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">Provvigione
                        forfettaria</label>
                      <el-form-item prop="FlatRateCommission">
                        <div class="input-group">
                          <input class="form-control form-control-lg" v-model.number="formData.FlatRateCommission"
                            type="number" placeholder="Inserisci importo"
                            :disabled="!canModify" />
                          <span class="input-group-text">€</span>
                        </div>
                      </el-form-item>
                    </div>

                    <div class="col-12 col-md-6 col-lg-4">
                      <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">Storno
                        provvigione</label>
                      <el-form-item prop="CommissionReversal">
                        <div class="input-group">
                          <input class="form-control form-control-lg" v-model.number="formData.CommissionReversal"
                            type="number" placeholder="Inserisci importo"
                            :disabled="!canModify" />
                          <span class="input-group-text">€</span>
                        </div>
                      </el-form-item>
                    </div>
                  </div>

                  <div class="form-field">
                    <label class="form-label fw-bold">Provvigione effettiva in €</label>
                    <div class="input-group">
                      <input class="form-control form-control-lg commission-effective-input"
                        :value="effectiveCommission" type="text" readonly />
                      <span class="input-group-text">€</span>
                    </div>
                    <small class="text-palette-secondary d-block mt-1 fs-8">
                      Calcolata automaticamente: provvigione lorda - storno
                    </small>
                  </div>
                </div>
              </div>

              <div class="mb-4 mb-md-5 mb-xl-6">
                <div class="d-flex align-items-center mb-3">
                  <div class="me-3">
                    <i class="ki-duotone ki-shield-tick fs-3 fs-md-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                  </div>
                  <div class="flex-grow-1">
                    <h4 class="h5 h4-md fw-bold text-palette-primary mb-1">Stato e Impostazioni</h4>
                    <p class="text-muted small mb-0">Controlla disponibilità, scadenze e stati rapidi.</p>
                  </div>
                </div>
                <div>
                  <div class="mb-3">
                    <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">Data fine
                      incarico</label>
                    <input class="form-control form-control-lg" v-model="formData.AssignmentEnd" type="date"
                      placeholder="yyyy-MM-dd" :disabled="!canModify" />
                  </div>

                  <div class="mb-3">
                    <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">Descrizione <span
                        class="text-danger">*</span></label>
                    <el-form-item prop="Description">
                      <textarea class="form-control form-control-lg" v-model="formData.Description" rows="4"
                        :disabled="!canModify"></textarea>
                    </el-form-item>
                  </div>
                </div>

                <div class="row g-3">
                  <div class="col-12 col-md-6 col-lg-4">
                    <div class="card p-3">
                      <div class="form-check form-switch form-check-custom form-check-solid">
                        <input class="form-check-input" type="checkbox" id="toggle-in-home" v-model="formData.InHome"
                          :disabled="(!canModify && user.Role === 'Agent') || isExpired" />
                        <label class="form-check-label ms-3 fw-semibold" for="toggle-in-home">
                          In Home
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="col-12 col-md-6 col-lg-4">
                    <div class="card p-3">
                      <div class="form-check form-switch form-check-custom form-check-solid">
                        <input class="form-check-input" type="checkbox" id="toggle-highlighted"
                          v-model="formData.Highlighted" :disabled="(!canModify && user.Role === 'Agent') || isExpired" />
                        <label class="form-check-label ms-3 fw-semibold" for="toggle-highlighted">
                          In Evidenza
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="col-12 col-md-6 col-lg-4">
                    <div class="card p-3">
                      <div class="form-check form-switch form-check-custom form-check-solid">
                        <input class="form-check-input" type="checkbox" id="toggle-auction" v-model="formData.Auction"
                          :disabled="!canModify" />
                        <label class="form-check-label ms-3 fw-semibold" for="toggle-auction">
                          Asta
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="col-12 col-md-6 col-lg-4">
                    <div class="card p-3">
                      <div class="form-check form-switch form-check-custom form-check-solid">
                        <input class="form-check-input" type="checkbox" id="toggle-negotiation"
                          v-model="formData.Negotiation" :disabled="!canModify" />
                        <label class="form-check-label ms-3 fw-semibold" for="toggle-negotiation">
                          In trattativa
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="col-12 col-md-6 col-lg-4">
                    <div class="card p-3">
                      <div class="form-check form-switch form-check-custom form-check-solid">
                        <input class="form-check-input" type="checkbox" id="toggle-sold" v-model="formData.Sold"
                          :disabled="(!canModify && user.Role === 'Agent') || isExpired" />
                        <label class="form-check-label ms-3 fw-semibold" for="toggle-sold">
                          Venduto
                        </label>
                      </div>
                      <div v-if="isExpired" class="text-muted fs-8 mt-1">
                        <i class="ki-duotone ki-information fs-7 me-1">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        Impossibile modificare: incarico scaduto
                      </div>
                    </div>
                  </div>

                  <div class="col-12 col-md-6 col-lg-4">
                    <div class="card p-3">
                      <div class="form-check form-switch form-check-custom form-check-solid">
                        <input class="form-check-input" type="checkbox" id="toggle-archived" v-model="formData.Archived"
                          :disabled="!canModify" />
                        <label class="form-check-label ms-3 fw-semibold" for="toggle-archived">
                          Archiviato
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mb-4 mb-md-5 mb-xl-6">
                <div class="d-flex align-items-center mb-3">
                  <div class="me-3">
                    <i class="ki-duotone ki-link-square fs-3 fs-md-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                  </div>
                  <div class="flex-grow-1">
                    <h4 class="h5 h4-md fw-bold text-palette-primary mb-1">Media e Note</h4>
                    <p class="text-muted small mb-0">Collega risorse aggiuntive e consulta le note inserite.</p>
                  </div>
                </div>
                <div>
                  <div class="mb-3">
                    <label class="form-label">
                      <i class="ki-duotone ki-camera fs-5 text-primary">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      URL Video
                    </label>
                    <input class="form-control form-control-lg" v-model="formData.VideoUrl" type="text"
                      placeholder="https://" :disabled="!canModify" />
                  </div>
                </div>

                <div v-if="formData.RealEstatePropertyNotes && formData.RealEstatePropertyNotes.length"
                  class="mt-4">
                  <div class="notes-scroll-container">
                    <div class="row g-3">
                      <div v-for="(note, index) in formData.RealEstatePropertyNotes" :key="note.Id ?? index" class="col-12">
                        <div class="card border-0 shadow-sm overflow-hidden">
                          <div class="card-body p-0">
                            <div class="d-flex align-items-center justify-content-between px-3 py-2 bg-light border-bottom flex-wrap gap-1">
                              <span class="fw-semibold text-body small">Nota</span>
                              <span v-if="note.Calendar?.EventStartDate" class="text-muted small">
                                <i class="ki-duotone ki-calendar fs-6 me-1">
                                  <span class="path1"></span>
                                  <span class="path2"></span>
                                </i>
                                {{ formatNoteAppointmentDate(note.Calendar.EventStartDate) }}
                              </span>
                            </div>
                            <div class="p-3 note-text" v-html="note.Text"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            
            <!--end::Card body-->
            <div v-if="user.Id === formData.UserId || user.Role === 'Admin' || formData.User.AdminId === user.Id"
              class="d-flex align-items-end justify-content-between">
                <div class="d-flex align-items-center gap-2">
                  <router-link
                    :to="{ name: 'property-flyer', params: { id: id } }"
                    target="_blank"
                    class="btn btn-light-primary"
                    :disabled="loading"
                  >
                    <span class="btn-icon">
                      <i class="ki-duotone ki-file-down fs-3">
                        <span class="path1"></span>
                        <span class="path2"></span>
                        <span class="path3"></span>
                        <span class="path4"></span>
                      </i>
                    </span>
                    <span class="btn-label">Stampa Locandina</span>
                  </router-link>
                </div>
                <div class="d-flex align-items-center gap-2">
                  <button v-if="canModify"
                    type="button" @click="deleteItem()" :disabled="!canModify" class="btn btn-danger">
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
                  <button :data-kt-indicator="loading ? 'on' : null" class="btn btn-primary" type="submit"
                    :disabled="loading || !canModify">
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
              </div>

            </div>
          </div>
          <!--end::Data Tab-->

          <!--begin::Images Tab-->
          <div class="tab-pane fade" id="images-pane" role="tabpanel" aria-labelledby="images-tab">
            <!--begin::Image Management-->
            <div>
              <!--begin::Upload Section-->
              <div class="mb-5">
                <div class="card border border-dashed p-5 text-center" @click="triggerFileUpload" @dragover.prevent
                  @drop.prevent="handleDrop" style="cursor: pointer;">
                  <div class="mb-3">
                    <i class="ki-duotone ki-cloud-upload fs-1">
                      <span class="path1"></span>
                      <span class="path2"></span>
                      <span class="path3"></span>
                    </i>
                  </div>
                  <div>
                    <h4>Trascina le immagini qui o clicca per selezionare</h4>
                    <p class="text-muted mb-0">Supporta JPG, PNG, GIF (max 5MB per immagine)</p>
                  </div>
                </div>
                <input ref="fileInput" type="file" multiple accept="image/*" @change="onFileChanged"
                  style="display: none;">
              </div>
              <!--end::Upload Section-->

              <!--begin::Image Gallery-->
              <div v-if="formData.Photos && formData.Photos.length > 0" class="image-gallery-grid">
                <draggable :list="formData.Photos" :disabled="false" item-key="Id" class="image-gallery-container"
                  ghost-class="sortable-ghost" chosen-class="sortable-chosen" @start="onDragStart" @end="onDragEnd"
                  :animation="300">
                  <template #item="{ element, index }">
                    <div class="image-gallery-item">
                      <div class="card position-relative h-100" :class="{ 'border-warning border-2': element.Highlighted }">
                        <div class="position-absolute top-0 start-0 m-2" style="cursor: move; z-index: 10;">
                          <i class="ki-duotone ki-menu fs-4 text-primary">
                            <span class="path1"></span>
                            <span class="path2"></span>
                            <span class="path3"></span>
                          </i>
                        </div>
                        <div class="position-absolute top-0 end-0 m-2 d-flex gap-2" style="z-index: 10;">
                          <button 
                            type="button" 
                            class="btn btn-sm btn-danger p-1 d-flex align-items-center justify-content-center" 
                            style="width: 28px; height: 28px; border-radius: 50%;"
                            @click="deleteFile(element.Id)"
                            title="Elimina immagine">
                            <i class="ki-duotone ki-cross fs-5 text-white">
                              <span class="path1"></span>
                              <span class="path2"></span>
                            </i>
                          </button>
                          <div v-if="element.Highlighted">
                            <span class="badge bg-warning">
                              <i class="ki-duotone ki-star fs-6">
                                <span class="path1"></span>
                                <span class="path2"></span>
                              </i>
                            </span>
                          </div>
                        </div>
                        <img :src="element.Url" :alt="`Immagine ${index + 1}`" @error="handleImageError($event)"
                          @load="handleImageLoad($event)" class="card-img-top"
                          style="height: 200px; width: 100%; object-fit: cover;" />
                        <div v-if="imageErrors[element.Id]" class="card-body text-center d-flex flex-column justify-content-center" style="height: 200px;">
                          <i class="ki-duotone ki-picture fs-1 text-muted">
                            <span class="path1"></span>
                            <span class="path2"></span>
                          </i>
                          <p class="text-muted mt-2 mb-1">Immagine non disponibile</p>
                          <p class="text-danger small mb-0">Verifica Azure Storage Emulator</p>
                          <a :href="element.Url" target="_blank" class="btn btn-sm btn-link text-primary mt-2">
                            Prova URL
                          </a>
                        </div>
                        <div
                          class="card-body position-absolute bottom-0 start-0 end-0 bg-dark bg-opacity-75 opacity-0 hover-opacity-100 transition-opacity">
                          <div class="btn-group w-100">
                            <button v-if="!element.Highlighted" type="button" class="btn btn-primary btn-sm"
                              @click="setPhotoHighlighted(element.Id)">
                              <i class="ki-duotone ki-star fs-6 me-1">
                                <span class="path1"></span>
                                <span class="path2"></span>
                              </i>
                              Principale
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </draggable>
              </div>
              <!--end::Image Gallery-->

              <!--begin::Empty State-->
              <div v-else class="text-center py-5">
                <div class="mb-3 opacity-50">
                  <i class="ki-duotone ki-picture fs-1 text-muted">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                </div>
                <h4 class="text-muted">Nessuna immagine caricata</h4>
                <p class="text-muted">Aggiungi le prime immagini per questo immobile</p>
              </div>
              <!--end::Empty State-->
            </div>
            <!--end::Image Management-->
          </div>
          <!--end::Images Tab-->
        </div>
        <!--end::Tab Content-->
      </el-form>
      <!--end::Form-->
    </div>

    <!--end::Tabs-->
  </div>

  <!--end::Content-->
  
  <!-- Info Popup per livello 3 -->
  <InfoPopup
    ref="infoPopupRef"
    modalId="info_popup_property_detail"
    :ownerInfo="selectedOwnerInfo"
    entityType="Property"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch, computed } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Modal } from "bootstrap";
import { getAllProvinceNames, getCitiesByProvince, getCAPByCity, getAllCitiesByCAP } from "@/core/data/italian-geographic-data-loader";
import {
  updateRealEstateProperty,
  RealEstateProperty,
  getRealEstateProperty,
  setRealEstatePropertyPhotoHighlighted,
  deletePhoto,
  deleteRealEstateProperty,
  uploadFiles,
  InsertModel,
  getToInsert,
  updatePhotosOrder
} from "@/core/data/properties";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import draggable from 'vuedraggable';
import InfoPopup from "@/components/modals/InfoPopup.vue";
import { AccessLevel, canModify as canModifyHelper, type OwnerInfo } from "@/core/helpers/accessLevel";

export default defineComponent({
  name: "update",
  components: { 
    draggable,
    InfoPopup,
  },
  setup() {
    const store = useAuthStore();
    const user = store.user;
    const route = useRoute();
    const router = useRouter();
    const id = parseInt(route.params.id.toString());
    const formRef = ref<any>(null); // Element Plus Form component reference
    const typesavailable = ref<string[]>([]);
    const provinces = ref<Array<{ Id: string, Name: string }>>([]);
    const cities = ref<Array<{ Id: string, Name: string, CAP?: string }>>([]);
    const showTipologia = ref(false);
    const loading = ref<boolean>(true);
    const firtLoad = ref(false);
    const isTrattativaRiservata = ref(false);
    const imageErrors = ref<Record<number, boolean>>({});
    const selectedExposures = ref<string[]>([]);
    const photosToDelete = ref<number[]>([]);

    // Funzioni per caricare i dati dal JSON
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



    const infoPopupRef = ref<InstanceType<typeof InfoPopup> | null>(null);
    const propertyAccessLevel = ref<number>(1); // Default a 1
    const selectedOwnerInfo = ref<OwnerInfo>({
      Id: "",
      FirstName: "",
      LastName: "",
      Role: "",
    });
    const formData = ref<RealEstateProperty>({
      Title: "",
      Category: "Residenziale",
      Typology: "",
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
      Location: "",
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
      Furniture: "Arredato",
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
      MQGarden: 0,
      CondominiumExpenses: 0,
      Availability: "Libero",
      Description: "",
      CustomerId: null,
      UserId: "",
      AgentId: "",
      AssignmentEnd: "",
      User: null,
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

    // Regole di validazione
    const rules = ref({
      CustomerId: [
        {
          required: true,
          message: "Seleziona un cliente",
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
          validator: (_rule: any, value: string, callback: any) => {
            if (!value || typeof value !== 'string' || !value.trim()) {
              return callback(new Error("Inserisci il titolo dell'immobile"));
            }
            callback();
          },
          trigger: "change",
        },
      ],
      Category: [
        {
          required: true,
          message: "Seleziona una categoria",
          trigger: "change",
        },
      ],
      Typology: [
        {
          validator: (_rule: any, value: string, callback: any) => {
            // Valida solo se showTipologia è true
            if (!showTipologia.value) {
              return callback();
            }
            if (!value || typeof value !== 'string' || !value.trim()) {
              return callback(new Error("Seleziona una tipologia"));
            }
            callback();
          },
          trigger: "change",
        },
      ],
      Status: [
        {
          required: true,
          message: "Seleziona lo stato (Vendita o Affitto)",
          trigger: "change",
        },
      ],
      AddressLine: [
        {
          validator: (_rule: any, value: string, callback: any) => {
            if (!value || typeof value !== 'string' || !value.trim()) {
              return callback(new Error("Inserisci l'indirizzo"));
            }
            callback();
          },
          trigger: "change",
        },
      ],
      City: [
        {
          required: true,
          message: "Seleziona il comune",
          trigger: "change",
        },
      ],
      State: [
        {
          required: true,
          message: "Seleziona la provincia",
          trigger: "change",
        },
      ],
      PostCode: [
        {
          validator: (_rule: any, value: string, callback: any) => {
            if (!value || typeof value !== 'string' || !value.trim()) {
              return callback(new Error("Inserisci il CAP"));
            }
            callback();
          },
          trigger: "change",
        },
      ],
      CommercialSurfaceate: [
        {
          validator: (_rule: any, value: number | string, callback: any) => {
            const numericValue = Number(value);
            if (value === null || value === undefined || value === "" || Number.isNaN(numericValue) || numericValue <= 0) {
              return callback(new Error("Inserisci la superficie commerciale (m²)"));
            }
            callback();
          },
          trigger: "change",
        },
      ],
      Price: [
        {
          validator: (_rule: any, value: number | string, callback: any) => {
            // Se la trattativa è riservata, non validare il prezzo
            if (isTrattativaRiservata.value) {
              return callback();
            }
            const numericValue = Number(value);
            if (value === null || value === undefined || value === "" || Number.isNaN(numericValue) || numericValue <= 0) {
              return callback(new Error("Inserisci il prezzo"));
            }
            callback();
          },
          trigger: "change",
        },
      ],
      EnergyClass: [
        {
          required: true,
          message: "Seleziona la classe energetica",
          trigger: "change",
        },
      ],
      StateOfTheProperty: [
        {
          required: true,
          message: "Seleziona lo stato dell'immobile",
          trigger: "change",
        },
      ],
      YearOfConstruction: [
        {
          validator: (_rule: any, value: number | string, callback: any) => {
            const numericValue = Number(value);
            if (value === null || value === undefined || value === "" || Number.isNaN(numericValue)) {
              return callback(new Error("Inserisci l'anno di costruzione"));
            }
            if (numericValue < 1000 || numericValue > 3000) {
              return callback(new Error("Inserisci l'anno di costruzione (minimo: 1000, massimo: 3000)"));
            }
            callback();
          },
          trigger: "change",
        },
      ],
      Description: [
        {
          validator: (_rule: any, value: string, callback: any) => {
            if (!value || typeof value !== 'string' || !value.trim()) {
              return callback(new Error("Inserisci la descrizione dell'immobile"));
            }
            callback();
          },
          trigger: "change",
        },
      ],
      Availability: [
        {
          required: true,
          message: "Seleziona la disponibilità",
          trigger: "change",
        },
      ],
      AgreedCommission: [
        {
          validator: (_rule: any, value: number | string, callback: any) => {
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
          },
          trigger: "change",
        },
      ],
      FlatRateCommission: [
        {
          validator: (_rule: any, value: number | string, callback: any) => {
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
          },
          trigger: "change",
        },
      ],
    });


    // Salva il UserId originale dell'immobile (non deve essere modificato)
    const originalUserId = ref<string>("");

    // Funzioni helper per verificare lo stato dell'incarico
    const isAssignmentExpired = (assignmentEnd: string | undefined | null): boolean => {
      if (!assignmentEnd || assignmentEnd === '' || assignmentEnd === '0001-01-01T00:00:00' || assignmentEnd === '0001-01-01') {
        return false; // Senza scadenza = non scaduto
      }
      const endDate = new Date(assignmentEnd);
      const now = new Date();
      now.setHours(0, 0, 0, 0); // Reset ore per confronto solo date
      endDate.setHours(0, 0, 0, 0);
      return endDate < now;
    };

    const isAssignmentExpiringSoon = (assignmentEnd: string | undefined | null): boolean => {
      if (!assignmentEnd || assignmentEnd === '' || assignmentEnd === '0001-01-01T00:00:00' || assignmentEnd === '0001-01-01') {
        return false; // Senza scadenza = non in scadenza
      }
      const endDate = new Date(assignmentEnd);
      const now = new Date();
      const daysUntilExpiry = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntilExpiry > 0 && daysUntilExpiry <= 30;
    };

    const getDaysUntilExpiry = (assignmentEnd: string | undefined | null): number => {
      if (!assignmentEnd || assignmentEnd === '' || assignmentEnd === '0001-01-01T00:00:00' || assignmentEnd === '0001-01-01') {
        return 999; // Senza scadenza = sempre valido
      }
      const endDate = new Date(assignmentEnd);
      const now = new Date();
      const daysUntilExpiry = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntilExpiry;
    };

    const formatDate = (dateString: string | undefined | null): string => {
      if (!dateString || dateString === '' || dateString === '0001-01-01T00:00:00' || dateString === '0001-01-01') {
        return 'Senza scadenza';
      }
      const date = new Date(dateString);
      return date.toLocaleDateString('it-IT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    };

    const getNoteTitle = (text: string | undefined, index: number): string => {
      if (!text || !text.trim()) return `Nota ${index + 1}`;
      const plain = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      const max = 45;
      return plain.length <= max ? plain : plain.slice(0, max) + '…';
    };

    const formatNoteAppointmentDate = (dateStr: string): string => {
      if (!dateStr) return '';
      const d = new Date(dateStr);
      if (Number.isNaN(d.getTime())) return '';
      return d.toLocaleDateString('it-IT', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };

    // Computed per lo stato dell'incarico
    const isExpired = computed(() => isAssignmentExpired(formData.value.AssignmentEnd));
    const isExpiringSoon = computed(() => isAssignmentExpiringSoon(formData.value.AssignmentEnd));
    const daysUntilExpiry = computed(() => getDaysUntilExpiry(formData.value.AssignmentEnd));

    // Computed per il banner di stato
    const assignmentStatusMessage = computed(() => {
      if (!formData.value.AssignmentEnd || formData.value.AssignmentEnd === '' || formData.value.AssignmentEnd === '0001-01-01T00:00:00' || formData.value.AssignmentEnd === '0001-01-01') {
        return null; // Nessun banner se non c'è scadenza
      }
      if (isExpired.value) {
        return `Incarico scaduto il ${formatDate(formData.value.AssignmentEnd)}. Rinnova l'incarico per continuare a gestire questo immobile.`;
      }
      if (isExpiringSoon.value) {
        return `Incarico in scadenza tra ${daysUntilExpiry.value} ${daysUntilExpiry.value === 1 ? 'giorno' : 'giorni'} (scade il ${formatDate(formData.value.AssignmentEnd)}).`;
      }
      return null;
    });

    const assignmentStatusClass = computed(() => {
      if (isExpired.value) {
        return 'bg-light-danger border-danger border';
      }
      if (isExpiringSoon.value) {
        return 'bg-light-warning border-warning border';
      }
      return '';
    });

    const assignmentStatusTitle = computed(() => {
      if (isExpired.value) {
        return '⚠️ Incarico Scaduto';
      }
      if (isExpiringSoon.value) {
        return '⏰ Incarico in Scadenza';
      }
      return '';
    });

    const assignmentStatusIconClass = computed(() => {
      if (isExpired.value) {
        return 'bg-danger';
      }
      if (isExpiringSoon.value) {
        return 'bg-warning';
      }
      return '';
    });

    const assignmentStatusIcon = computed(() => {
      if (isExpired.value) {
        return 'ki-duotone ki-cross-circle';
      }
      if (isExpiringSoon.value) {
        return 'ki-duotone ki-information';
      }
      return '';
    });

    onMounted(async () => {
      loading.value = true;
      firtLoad.value = true;
      const propertyData = await getRealEstateProperty(id);
      
      // Se la risposta è un LimitedAccessResponse (AccessLevel 3)
      if ((propertyData as any)._isLimitedAccess) {
        loading.value = false;
        const limitedData = propertyData as any;
        // Imposta le informazioni del proprietario
        if (limitedData.OwnerInfo) {
          selectedOwnerInfo.value = limitedData.OwnerInfo;
        }
        // Mostra il popup con le informazioni del proprietario
        setTimeout(() => {
          if (infoPopupRef.value) {
            infoPopupRef.value.show();
          }
          // Torna alla lista quando il popup viene chiuso
          const modalElement = document.getElementById("info_popup_property_detail");
          if (modalElement) {
            modalElement.addEventListener("hidden.bs.modal", () => {
              router.push({ name: "properties" });
            }, { once: true });
          }
        }, 100);
        return;
      }
      
      formData.value = propertyData as RealEstateProperty;
      propertyAccessLevel.value = (formData.value as any).AccessLevel || 1;
      formData.value.AssignmentEnd = formData.value.AssignmentEnd.split('T')[0]

      // Preserva il UserId originale dell'immobile
      originalUserId.value = formData.value.UserId || "";

      inserModel.value = await getToInsert();
      if (!formData.value.AgentId && formData.value.UserId) {
        formData.value.AgentId = formData.value.UserId;
      }
      if (!formData.value.AgentId) {
        formData.value.AgentId = store.user.Id;
      }

      // Inizializza la checkbox "Trattativa riservata" in base al prezzo
      isTrattativaRiservata.value = formData.value.Price === -1;

      // Converti la stringa Exposure in array per la selezione multipla
      if (formData.value.Exposure) {
        // Gestisce sia separatori "-" che "," per retrocompatibilità
        selectedExposures.value = formData.value.Exposure.split(/[-,\s]+/).filter(e => e.trim() !== '');
      } else {
        selectedExposures.value = [];
      }

      // Carica le province
      await loadProvinces();

      // Se c'è già una provincia selezionata, carica le città
      if (formData.value.State) {
        await loadCitiesByProvince(formData.value.State);
      }

      // Inizializza le tipologie disponibili in base alla categoria esistente
      if (formData.value.Category && tipologiePerCategoria[formData.value.Category]) {
        typesavailable.value = [...tipologiePerCategoria[formData.value.Category]];
        if (typesavailable.value.length > 0) {
          showTipologia.value = true;
          // Se la tipologia esistente non è valida per la categoria, usa la prima disponibile
          if (!typesavailable.value.includes(formData.value.Typology)) {
            formData.value.Typology = typesavailable.value[0];
          }
        } else {
          showTipologia.value = false;
        }
      } else {
        showTipologia.value = false;
        typesavailable.value = [];
      }

      loading.value = false;
      firtLoad.value = false;
    })

    watch(
      () => formData.value.State,
      async (newProvince) => {
        if (!firtLoad.value) {
          console.log("watch state")
          if (newProvince) {
            await loadCitiesByProvince(newProvince);
            formData.value.City = "";
            formData.value.Location = "";
          } else {
            cities.value = [];
            formData.value.City = "";
            formData.value.Location = "";
          }
        }
      }
    );
    watch(
      () => formData.value.City,
      async (newTown) => {
        if (!firtLoad.value) {
          console.log("watch localita")
          // Auto-compila il CAP se disponibile
          if (formData.value.State && newTown) {
            const cap = getCAPByCity(formData.value.State, newTown);
            if (cap && formData.value.PostCode !== cap) {
              formData.value.PostCode = cap;
            }
          }
        }
      }
    );

    // Watcher per auto-compilare il comune quando si modifica il CAP
    // Se più comuni condividono lo stesso CAP, NON sovrascrivere City
    watch(
      () => formData.value.PostCode,
      (newCAP) => {
        if (!firtLoad.value && newCAP && formData.value.State) {
          const citiesWithCAP = getAllCitiesByCAP(formData.value.State, newCAP);
          if (citiesWithCAP.length === 1 && formData.value.City !== citiesWithCAP[0]) {
            formData.value.City = citiesWithCAP[0];
          }
        }
      }
    );

    watch(
      () => formData.value.Category,
      (newCategoria) => {
        if (!firtLoad.value) {
          const available = (newCategoria && tipologiePerCategoria[newCategoria]) ? [...tipologiePerCategoria[newCategoria]] : [];
          typesavailable.value = available;

          if (available.length > 0) {
            showTipologia.value = true;
            formData.value.Typology = available.includes(formData.value.Typology)
              ? formData.value.Typology
              : available[0];
          } else {
            showTipologia.value = false;
            formData.value.Typology = "";
          }
        }
      }
    );

    // Watcher per validare l'esclusione mutua tra provvigione concordata e forfettaria
    watch(
      () => formData.value.AgreedCommission,
      () => {
        if (!firtLoad.value && formRef.value) {
          // Valida entrambi i campi quando cambia AgreedCommission
          formRef.value.validateField('AgreedCommission', () => { });
          formRef.value.validateField('FlatRateCommission', () => { });
        }
      }
    );

    watch(
      () => formData.value.FlatRateCommission,
      () => {
        if (!firtLoad.value && formRef.value) {
          // Valida entrambi i campi quando cambia FlatRateCommission
          formRef.value.validateField('AgreedCommission', () => { });
          formRef.value.validateField('FlatRateCommission', () => { });
        }
      }
    );

    // Watcher per convertire l'array di esposizioni selezionate in stringa
    watch(
      () => selectedExposures.value,
      (newExposures) => {
        if (!firtLoad.value) {
          // Unisce le esposizioni con "-" (es. "Nord-Est")
          formData.value.Exposure = newExposures.length > 0 ? newExposures.join('-') : '';
        }
      },
      { deep: true }
    );

    const onFileChanged = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        await handleFiles(target.files);
      }
    };

    const setPhotoHighlighted = async (photoId) => {
      await setRealEstatePropertyPhotoHighlighted(photoId)
        .then(async () => {
          loading.value = false;
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
            }).then(async function () {
              formData.value = await getRealEstateProperty(id);
            });
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
            return false;
          }
        })
        .catch(({ response }) => {
          console.log(response);
          loading.value = false;
          Swal.fire({
            text: "Attenzione, si è verificato un errore.",
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

    const deleteFile = (photoId: number) => {
      // Aggiungi la foto all'array delle foto da eliminare
      if (!photosToDelete.value.includes(photoId)) {
        photosToDelete.value.push(photoId);
      }
      
      // Rimuovi la foto dalla visualizzazione
      if (formData.value.Photos) {
        formData.value.Photos = formData.value.Photos.filter(photo => photo.Id !== photoId);
      }
    }

    watch(
      () => formData.value.AssignmentEnd,
      (newVal) => {
        if (newVal && newVal.includes('T')) {
          formData.value.AssignmentEnd = newVal.split('T')[0]
        }
      },
      { immediate: true }
    )

    async function deleteItem() {
      const result = await Swal.fire({
        title: "Elimina immobile",
        html: "Stai per eliminare definitivamente questo immobile e tutti i dati collegati ad esso. L'operazione è irreversibile e potresti perdere irrimediabilmente i dati associati.",
        icon: "warning",
        showCancelButton: true,
        focusCancel: true,
        buttonsStyling: false,
        confirmButtonText: "Elimina",
        cancelButtonText: "Annulla",
        heightAuto: false,
        customClass: {
          confirmButton: "btn btn-danger",
          cancelButton: "btn btn-light"
        },
      });

      if (!result.isConfirmed) {
        return;
      }

      try {
        loading.value = true;
        await deleteRealEstateProperty(id);
        loading.value = false;
        await Swal.fire({
          text: "Immobile eliminato con successo!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Continua",
          heightAuto: false,
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
        router.push({ name: "properties" });
      } catch (error: any) {
        loading.value = false;
        const errorMessage = error?.data?.Message || error?.response?.data?.Message || error?.data?.Detail || error?.data?.message || store.errors || "Si è verificato un errore durante l'eliminazione dell'immobile.";
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
    }

    const submit = async () => {
      if (!formRef.value) {
        return;
      }

      // Verifica permessi prima di inviare
      if (!canModify.value) {
        Swal.fire({
          text: "Non hai i permessi per modificare questo immobile.",
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
      // Verifica che non siano compilate entrambe le provvigioni prima della validazione
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
        // Forza la validazione dei campi per mostrare gli errori
        if (formRef.value) {
          formRef.value.validateField('AgreedCommission', () => { });
          formRef.value.validateField('FlatRateCommission', () => { });
        }
        return;
      }
      formRef.value.validate(async (valid: boolean) => {
        if (valid) {
          // Se la validazione è passata, procedi con il salvataggio
          loading.value = true;

          try {
            // Preserva il UserId originale - non sovrascriverlo
            formData.value.UserId = originalUserId.value;

            // Se la checkbox "Trattativa riservata" è selezionata, imposta il prezzo a -1
            if (isTrattativaRiservata.value) {
              formData.value.Price = -1;
            }

            // Aggiorna Exposure dall'array di esposizioni selezionate
            formData.value.Exposure = selectedExposures.value.length > 0 
              ? selectedExposures.value.join('-') 
              : '';

            // Calcola e assegna EffectiveCommission (valore numerico, non formattato)
            let grossCommission = 0;
            const agreedCommission = Number(formData.value.AgreedCommission);
            const flatRateCommission = Number(formData.value.FlatRateCommission);
            const price = Number(formData.value.Price);
            const priceReduced = Number(formData.value.PriceReduced);
            const storno = Number(formData.value.CommissionReversal) || 0;

            // Determina quale prezzo usare: se presente il prezzo ribassato, usa quello, altrimenti il prezzo normale
            // Ma salta se il prezzo è -1 (trattativa riservata)
            const priceToUse = (price === -1) ? 0 : ((priceReduced && !Number.isNaN(priceReduced) && priceReduced > 0) ? priceReduced : price);

            // Se c'è provvigione concordata (percentuale)
            if (agreedCommission && !Number.isNaN(agreedCommission) && agreedCommission > 0 && priceToUse > 0) {
              grossCommission = (priceToUse * agreedCommission) / 100;
            }
            // Se c'è provvigione forfettaria (euro)
            else if (flatRateCommission && !Number.isNaN(flatRateCommission) && flatRateCommission > 0) {
              grossCommission = flatRateCommission;
            }

            // Calcola la provvigione netta (lorda - storno)
            const netCommission = grossCommission - storno;

            // Il risultato non può essere negativo (minimo 0)
            formData.value.EffectiveCommission = Math.max(0, netCommission);

            // Elimina le foto marcate per l'eliminazione
            if (photosToDelete.value.length > 0) {
              for (const photoId of photosToDelete.value) {
                try {
                  await deletePhoto(photoId);
                } catch (error) {
                  console.error(`Errore durante l'eliminazione della foto ${photoId}:`, error);
                }
              }
              // Pulisci l'array dopo l'eliminazione
              photosToDelete.value = [];
            }

            await updatePhotosOrder(formData.value.Photos);
            await updateRealEstateProperty(formData.value);

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
              // router.push({ name: 'properties' })
            });
          } catch ({ response }) {
            console.log(response);
            loading.value = false;
            Swal.fire({
              text: "Attenzione, si è verificato un errore.",
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Continua!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn btn-primary",
              },
            });
          }
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
      });
    };

    // Funzioni per la gestione delle immagini
    const fileInput = ref<HTMLInputElement | null>(null);

    const triggerFileUpload = () => {
      fileInput.value?.click();
    };

    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      const files = event.dataTransfer?.files;
      if (files && files.length > 0) {
        handleFiles(files);
      }
    };

    const handleFiles = async (files: FileList) => {
      const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));

      if (imageFiles.length === 0) {
        Swal.fire({
          text: "Seleziona solo file immagine (JPG, PNG, GIF)",
          icon: "warning",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          heightAuto: false,
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
        return;
      }

      // Crea un FileList temporaneo
      const dt = new DataTransfer();
      imageFiles.forEach(file => dt.items.add(file));

      await uploadFiles(dt.files, id)
        .then(async () => {
          loading.value = false;
          const error = store.errors;

          if (!error) {
            Swal.fire({
              text: "Immagini caricate con successo!",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Continua!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn fw-semobold btn-light-primary",
              },
            }).then(async function () {
              formData.value = await getRealEstateProperty(id);
            });
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
            return false;
          }
        })
        .catch(({ response }) => {
          console.log(response);
          loading.value = false;
          Swal.fire({
            text: "Attenzione, si è verificato un errore.",
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

    const onDragStart = () => {
      // Logica quando inizia il drag
    };

    const onDragEnd = async () => {
      // Aggiorna l'ordine delle foto dopo il drag & drop
      if (formData.value.Photos && formData.value.Photos.length > 0) {
        await updatePhotosOrder(formData.value.Photos);
      }
    };

    const handleImageError = (event: Event) => {
      const img = event.target as HTMLImageElement;
      const photoId = formData.value.Photos?.find(p => p.Url === img.src)?.Id;
      if (photoId) {
        imageErrors.value[photoId] = true;
      }
    };

    const handleImageLoad = (event: Event) => {
      const img = event.target as HTMLImageElement;
      const photoId = formData.value.Photos?.find(p => p.Url === img.src)?.Id;
      if (photoId) {
        imageErrors.value[photoId] = false;
      }
    };

    // Verifica se l'utente può modificare l'immobile secondo le regole di accesso
    const canModify = computed(() => {
      // Usa l'AccessLevel se disponibile (priorità)
      if (propertyAccessLevel.value !== undefined) {
        return canModifyHelper(propertyAccessLevel.value);
      }
      
      // Fallback alla logica precedente per retrocompatibilità
      if (!formData.value || !formData.value.UserId) {
        return false;
      }

      const currentUser = user;
      const propertyOwner = formData.value.User;

      // Se l'utente è il proprietario, può sempre modificare
      if (currentUser.Id === formData.value.UserId) {
        return true;
      }

      // Admin: può modificare tutti gli immobili
      if (currentUser.Role === 'Admin') {
        return true;
      }

      // Agency: può modificare proprie + dei propri Agent
      if (currentUser.Role === 'Agency') {
        // L'immobile è dell'Agency stessa
        if (formData.value.UserId === currentUser.Id) {
          return true;
        }
        // L'immobile è di un suo Agent (verifica tramite AdminId se User è disponibile)
        if (propertyOwner && propertyOwner.AdminId === currentUser.Id && propertyOwner.Role === 'Agent') {
          return true;
        }
        // Se User non è disponibile, verifica tramite inserModel (lista agenti disponibili)
        if (!propertyOwner && inserModel.value.Users) {
          const agent = inserModel.value.Users.find((u: any) => u.Id === formData.value.UserId);
          if (agent && agent.AdminId === currentUser.Id && agent.Role === 'Agent') {
            return true;
          }
        }
        return false;
      }

      // Agent: può modificare solo proprie
      if (currentUser.Role === 'Agent') {
        return formData.value.UserId === currentUser.Id;
      }

      return false;
    });

    // Computed per ottenere il nome completo dell'agente
    const agentName = computed(() => {
      if (!formData.value.AgentId) {
        return '';
      }

      // Prima cerca nella lista degli agenti disponibili
      if (inserModel.value.Users && inserModel.value.Users.length > 0) {
        const agent = inserModel.value.Users.find((u: any) => u.Id === formData.value.AgentId);
        if (agent) {
          return `${agent.FirstName} ${agent.LastName}`;
        }
      }

      // Fallback: usa i dati dell'utente che ha creato l'immobile
      if (formData.value.User && formData.value.User.Id === formData.value.AgentId) {
        return `${formData.value.User.FirstName} ${formData.value.User.LastName}`;
      }

      return '';
    });

    // Computed per calcolare la provvigione effettiva in €
    const effectiveCommission = computed(() => {
      let grossCommission = 0;

      // Calcola la provvigione lorda
      const agreedCommission = Number(formData.value.AgreedCommission);
      const flatRateCommission = Number(formData.value.FlatRateCommission);
      const price = Number(formData.value.Price);
      const priceReduced = Number(formData.value.PriceReduced);
      const storno = Number(formData.value.CommissionReversal) || 0;

      // Determina quale prezzo usare: se presente il prezzo ribassato, usa quello, altrimenti il prezzo normale
      const priceToUse = (priceReduced && !Number.isNaN(priceReduced) && priceReduced > 0) ? priceReduced : price;

      // Se c'è provvigione concordata (percentuale)
      if (agreedCommission && !Number.isNaN(agreedCommission) && agreedCommission > 0 && priceToUse > 0) {
        grossCommission = (priceToUse * agreedCommission) / 100;
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

    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      onFileChanged,
      typesavailable,
      showTipologia,
      isExpired,
      isExpiringSoon,
      assignmentStatusMessage,
      assignmentStatusClass,
      assignmentStatusTitle,
      assignmentStatusIconClass,
      assignmentStatusIcon,
      setPhotoHighlighted,
      deleteFile,
      deleteItem,
      inserModel,
      user,
      provinces,
      cities,
      isTrattativaRiservata,
      fileInput,
      triggerFileUpload,
      handleDrop,
      handleFiles,
      onDragStart,
      onDragEnd,
      imageErrors,
      handleImageError,
      handleImageLoad,
      canModify,
      infoPopupRef,
      selectedOwnerInfo,
      propertyAccessLevel,
      AccessLevel,
      agentName,
      effectiveCommission,
      id,
      selectedExposures,
      getNoteTitle,
      formatNoteAppointmentDate,
    };
  },
});
</script>

<style scoped>
.image-gallery-grid {
  width: 100%;
}

.image-gallery-container {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
}

.image-gallery-item {
  width: 100%;
}

@media (min-width: 576px) {
  .image-gallery-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) {
  .image-gallery-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

.sortable-ghost {
  opacity: 0.5;
}

.sortable-chosen {
  cursor: grabbing;
}

/* Altezza per ~5 note, poi scroll */
.notes-scroll-container {
  max-height: 22rem;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
