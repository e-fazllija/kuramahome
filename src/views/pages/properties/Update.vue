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
                <span v-if="user.Role === 'Agent' && !canModify">Visualizzazione in sola lettura</span>
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
    <!--begin::Tabs-->
    <div class="container-fluid px-0 px-md-3">
      <div class="property-tabs">
        <ul class="nav nav-tabs flex-nowrap overflow-auto" id="propertyTabs" role="tablist" style="scrollbar-width: none; -ms-overflow-style: none;">
          <li class="nav-item flex-shrink-0" role="presentation">
            <button
              class="nav-link active"
              id="data-tab"
              data-bs-toggle="tab"
              data-bs-target="#data-pane"
              type="button"
              role="tab"
              aria-controls="data-pane"
              aria-selected="true"
            >
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
            <button
              class="nav-link"
              id="images-tab"
              data-bs-toggle="tab"
              data-bs-target="#images-pane"
              type="button"
              role="tab"
              aria-controls="images-pane"
              aria-selected="false"
            >
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
              <div class="card-body card-palette border-top p-3 p-md-6 p-xl-9 compact-body" :class="{ 'opacity-50': !canModify && user.Role === 'Agent' }">
                <div class="form-sections">
                  <div class="compact-section mb-8 mb-md-10 mb-xl-12">
                    <div class="section-header">
                      <div class="section-icon">
                        <i class="ki-duotone ki-notepad fs-3 fs-md-2 text-primary">
                          <span class="path1"></span>
                          <span class="path2"></span>
                          <span class="path3"></span>
                          <span class="path4"></span>
                          <span class="path5"></span>
                        </i>
                      </div>
                      <div class="flex-grow-1">
                        <h4 class="section-title fw-bold text-palette-primary fs-5 fs-md-4">Dati Principali</h4>
                        <p class="section-subtitle text-palette-secondary fs-7 fs-md-6 mb-0">Informazioni generali sull'immobile.</p>
                      </div>
                    </div>
            <div class="compact-grid">
              <div class="form-field">
                <label class="form-label required">
                  <i class="ki-duotone ki-profile-user fs-5 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                    <span class="path4"></span>
                  </i>
                  Cliente
                </label>
                <el-form-item prop="CustomerId">
                  <Multiselect
                    v-model="formData.CustomerId"
                    :options="inserModel.Customers"
                    label="label"
                    valueProp="Id"
                    :searchable="true"
                    :close-on-select="true"
                    :clear-on-select="false"
                    placeholder="Seleziona il cliente"
                    class="multiselect-modern w-100"
                    :disabled="!canModify && user.Role === 'Agent'"
                  />
                </el-form-item>
              </div>

              <div class="form-field">
                <label class="form-label required">
                  <i class="ki-duotone ki-user fs-5 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Agente
                </label>
                <el-form-item prop="AgentId">
                  <input
                    class="form-control modern-input agent-readonly"
                    :value="agentName"
                    type="text"
                    readonly
                    disabled
                  />
                </el-form-item>
              </div>

              <div class="form-field">
                <label class="form-label required">
                  <i class="ki-duotone ki-text fs-5 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Titolo
                </label>
                <el-form-item prop="Title">
                  <input
                    class="form-control modern-input"
                    v-model="formData.Title"
                    type="text"
                    placeholder="Inserisci il titolo dell'immobile"
                    required
                    :disabled="!canModify && user.Role === 'Agent'"
                  />
                </el-form-item>
              </div>

              <div class="form-field">
                <label class="form-label required">
                  <i class="ki-duotone ki-category fs-5 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Categoria
                </label>
                <el-form-item prop="Category">
                  <select class="form-select modern-select" v-model="formData.Category" required :disabled="!canModify && user.Role === 'Agent'">
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

              <div v-if="showTipologia" class="form-field">
                <label class="form-label required">
                  <i class="ki-duotone ki-element-plus fs-5 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Tipologia
                </label>
                <el-form-item prop="Typology">
                  <select class="form-select modern-select" v-model="formData.Typology" :disabled="!canModify && user.Role === 'Agent'">
                    <option
                      v-for="tipologia in typesavailable"
                      :key="tipologia"
                      :value="tipologia"
                    >
                      {{ tipologia }}
                    </option>
                  </select>
                </el-form-item>
              </div>

              <div class="form-field">
                <label class="form-label required">
                  <i class="ki-duotone ki-home fs-5 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Stato vendita o affitto
                </label>
                <el-form-item prop="Status">
                  <select class="form-select modern-select" v-model="formData.Status" required :disabled="!canModify && user.Role === 'Agent'">
                    <option value="">Scegli tra vendita e affitto</option>
                    <option value="Vendita">Vendita</option>
                    <option value="Affitto">Affitto</option>
                  </select>
                </el-form-item>
              </div>

              <div class="form-field">
                <label class="form-label">
                  <i class="ki-duotone ki-briefcase fs-5 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Tipologia incarico
                </label>
                <select class="form-select modern-select" v-model="formData.TypeOfAssignment" :disabled="!canModify && user.Role === 'Agent'">
                  <option value="Verbale">Verbale</option>
                  <option value="Esclusivo">Esclusivo</option>
                  <option value="Semi-Verbale">Semi-Verbale</option>
                  <option value="Immobile MLS">Immobile MLS</option>
                </select>
              </div>
            </div>
          </div>

                  <div class="compact-section mb-8 mb-md-10 mb-xl-12">
                    <div class="section-header">
                      <div class="section-icon">
                        <i class="ki-duotone ki-geolocation fs-3 fs-md-2 text-primary">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                      </div>
                      <div class="flex-grow-1">
                        <h4 class="section-title fw-bold text-palette-primary fs-5 fs-md-4">Localizzazione</h4>
                        <p class="section-subtitle text-palette-secondary fs-7 fs-md-6 mb-0">Riferimenti geografici e indirizzo completo.</p>
                      </div>
                    </div>
            <div class="compact-grid">
              <div class="form-field">
                <label class="form-label required">Indirizzo</label>
                <el-form-item prop="AddressLine">
                  <input
                    class="form-control modern-input"
                    v-model="formData.AddressLine"
                    type="text"
                    required
                    :disabled="!canModify && user.Role === 'Agent'"
                  />
                </el-form-item>
              </div>

              <div class="form-field">
                <label class="form-label required">Provincia</label>
                <el-form-item prop="State">
                  <select class="form-select modern-select" v-model="formData.State" required :disabled="!canModify && user.Role === 'Agent'">
                    <option value="">🗺️ Seleziona provincia</option>
                    <option
                      v-for="(province, index) in provinces"
                      :key="index"
                      :value="province.Id"
                    >
                      {{ province.Name }}
                    </option>
                  </select>
                </el-form-item>
              </div>

              <div class="form-field">
                <label class="form-label required">Comune</label>
                <el-form-item prop="City">
                  <select class="form-select" v-model="formData.City" required :disabled="!canModify && user.Role === 'Agent'">
                    <option value="">Seleziona città</option>
                    <option
                      v-for="(city, index) in cities"
                      :key="index"
                      :value="city.Name"
                    >
                      {{ city.Name }}
                    </option>
                  </select>
                </el-form-item>
              </div>

              <div class="form-field">
                <label class="form-label">Località</label>
                <input
                  class="form-control modern-input"
                  v-model="formData.Location"
                  type="text"
                  placeholder="Inserisci la località"
                  :disabled="!canModify && user.Role === 'Agent'"
                />
              </div>

              <div class="form-field">
                <label class="form-label required">Codice Fiscale</label>
                <el-form-item prop="PostCode">
                  <input
                    class="form-control modern-input"
                    v-model="formData.PostCode"
                    type="text"
                    placeholder="Inserisci il codice fiscale"
                    required
                    :disabled="!canModify && user.Role === 'Agent'"
                  />
                </el-form-item>
              </div>
            </div>
          </div>

                  <div class="compact-section mb-8 mb-md-10 mb-xl-12">
                    <div class="section-header">
                      <div class="section-icon">
                        <i class="ki-duotone ki-setting fs-3 fs-md-2 text-primary">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                      </div>
                      <div class="flex-grow-1">
                        <h4 class="section-title fw-bold text-palette-primary fs-5 fs-md-4">Caratteristiche Tecniche</h4>
                        <p class="section-subtitle text-palette-secondary fs-7 fs-md-6 mb-0">Dimensioni, dotazioni e finiture dell'immobile.</p>
                      </div>
                    </div>
            <div class="compact-grid">
              <div class="form-field">
                <label class="form-label required">Superficie commerciale (m²)</label>
                <el-form-item prop="CommercialSurfaceate">
                  <input
                    class="form-control modern-input"
                    v-model="formData.CommercialSurfaceate"
                    type="number"
                    required
                    :disabled="!canModify && user.Role === 'Agent'"
                  />
                </el-form-item>
              </div>

              <div class="form-field">
                <label class="form-label">Piano</label>
                <select class="form-select modern-select" v-model="formData.Floor" :disabled="!canModify && user.Role === 'Agent'">
                  <option value="">Scegli</option>
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

              <div class="form-field">
                <label class="form-label">Totale piani edificio</label>
                <input
                  class="form-control modern-input"
                  v-model="formData.TotalBuildingfloors"
                  type="number"
                  :disabled="!canModify && user.Role === 'Agent'"
                />
              </div>

              <div class="form-field">
                <label class="form-label">Giardino (mq)</label>
                <input
                  class="form-control modern-input"
                  v-model="formData.MQGarden"
                  type="number"
                  :disabled="!canModify && user.Role === 'Agent'"
                />
              </div>

              <div class="form-field">
                <label class="form-label">Ascensori</label>
                <input
                  class="form-control modern-input"
                  v-model="formData.Elevators"
                  type="number"
                  :disabled="!canModify && user.Role === 'Agent'"
                />
              </div>

              <div class="form-field">
                <label class="form-label">Camere da letto</label>
                <input
                  class="form-control modern-input"
                  v-model="formData.Bedrooms"
                  type="number"
                  :disabled="!canModify && user.Role === 'Agent'"
                />
              </div>

              <div class="form-field">
                <label class="form-label">Locali</label>
                <input
                  class="form-control modern-input"
                  v-model="formData.WarehouseRooms"
                  type="number"
                  :disabled="!canModify && user.Role === 'Agent'"
                />
              </div>

              <div class="form-field">
                <label class="form-label">Cucine</label>
                <input
                  class="form-control modern-input"
                  v-model="formData.Kitchens"
                  type="number"
                  :disabled="!canModify && user.Role === 'Agent'"
                />
              </div>

              <div class="form-field">
                <label class="form-label">Bagni</label>
                <input
                  class="form-control modern-input"
                  v-model="formData.Bathrooms"
                  type="number"
                  :disabled="!canModify && user.Role === 'Agent'"
                />
              </div>

              <div class="form-field">
                <label class="form-label">Arredamento</label>
                <select class="form-select modern-select" v-model="formData.Furniture" :disabled="!canModify && user.Role === 'Agent'">
                  <option value="">Seleziona il tipo di arredamento</option>
                  <option value="Arredato">Arredato</option>
                  <option value="Non Arredato">Non Arredato</option>
                  <option value="Parzialmente Arredato">Parzialmente Arredato</option>
                  <option value="Arredato Solo Cucina">Arredato Solo Cucina</option>
                </select>
              </div>

              <div class="form-field">
                <label class="form-label">Posti auto</label>
                <input
                  class="form-control modern-input"
                  v-model="formData.ParkingSpaces"
                  type="number"
                  :disabled="!canModify && user.Role === 'Agent'"
                />
              </div>

              <div class="form-field">
                <label class="form-label">Riscaldamento</label>
                <select class="form-select modern-select" v-model="formData.Heating" :disabled="!canModify && user.Role === 'Agent'">
                  <option value="Nessuno">Nessuno</option>
                  <option value="Autonomo">Autonomo</option>
                  <option value="Centralizzato">Centralizzato</option>
                </select>
              </div>

              <div class="form-field">
                <label class="form-label">Esposizione</label>
                <select class="form-select modern-select" v-model="formData.Exposure" :disabled="!canModify && user.Role === 'Agent'">
                  <option value="">Selezionare l'esposizione</option>
                  <option value="Nord">Nord</option>
                  <option value="Sud">Sud</option>
                  <option value="Est">Est</option>
                  <option value="Ovest">Ovest</option>
                </select>
              </div>

              <div class="form-field">
                <label class="form-label required">Classe energetica</label>
                <el-form-item prop="EnergyClass">
                  <select class="form-select modern-select" v-model="formData.EnergyClass" :disabled="!canModify && user.Role === 'Agent'">
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

              <div class="form-field">
                <label class="form-label">Tipo di proprietà</label>
                <input
                  class="form-control modern-input"
                  v-model="formData.TypeOfProperty"
                  type="text"
                  :disabled="!canModify && user.Role === 'Agent'"
                />
              </div>

              <div class="form-field">
                <label class="form-label required">Stato dell&apos;immobile</label>
                <el-form-item prop="StateOfTheProperty">
                  <select class="form-select modern-select" v-model="formData.StateOfTheProperty" :disabled="!canModify && user.Role === 'Agent'">
                    <option value="">Seleziona lo Stato dell'immobile</option>
                    <option value="Nuovo / In Costruzione">Nuovo / In Costruzione</option>
                    <option value="Ottimo / Ristrutturato">Ottimo / Ristrutturato</option>
                    <option value="Buono / Abitabile">Buono / Abitabile</option>
                    <option value="Da Ristrutturare">Da Ristrutturare</option>
                  </select>
                </el-form-item>
              </div>

              <div class="form-field">
                <label class="form-label required">Anno di costruzione</label>
                <el-form-item prop="YearOfConstruction">
                  <input
                    class="form-control modern-input"
                    v-model="formData.YearOfConstruction"
                    type="number"
                    :disabled="!canModify && user.Role === 'Agent'"
                  />
                </el-form-item>
              </div>

              <div class="form-field full-width">
                <label class="form-label">Altri dettagli</label>
                <input
                  class="form-control modern-input"
                  v-model="formData.MoreDetails"
                  type="text"
                  :disabled="!canModify && user.Role === 'Agent'"
                />
              </div>

              <div class="form-field full-width">
                <label class="form-label">Altre caratteristiche</label>
                <input
                  class="form-control modern-input"
                  v-model="formData.MoreFeatures"
                  type="text"
                  :disabled="!canModify && user.Role === 'Agent'"
                />
              </div>
            </div>
          </div>

                  <div class="compact-section mb-8 mb-md-10 mb-xl-12">
                    <div class="section-header">
                      <div class="section-icon">
                        <i class="ki-duotone ki-wallet fs-3 fs-md-2 text-primary">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                      </div>
                      <div class="flex-grow-1">
                        <h4 class="section-title fw-bold text-palette-primary fs-5 fs-md-4">Valori Economici</h4>
                        <p class="section-subtitle text-palette-secondary fs-7 fs-md-6 mb-0">Gestisci prezzi, trattative e provvigioni.</p>
                      </div>
                    </div>
            <div class="compact-grid">
              <div class="form-field">
                <label class="form-label">Trattativa riservata</label>
                <div class="form-check form-switch form-check-custom form-check-solid">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="toggle-private-deal"
                    v-model="isTrattativaRiservata"
                    :disabled="!canModify && user.Role === 'Agent'"
                  />
                  <label class="form-check-label ms-3 fw-semibold" for="toggle-private-deal">
                    Nascondi il prezzo pubblico
                  </label>
                </div>
              </div>

              <div
                v-if="!isTrattativaRiservata"
                class="form-field"
              >
                <label class="form-label required">Prezzo</label>
                <el-form-item prop="Price">
                  <input
                    class="form-control modern-input"
                    v-model="formData.Price"
                    type="number"
                    required
                    :disabled="!canModify && user.Role === 'Agent'"
                  />
                </el-form-item>
              </div>

              <div class="form-field">
                <label class="form-label">Prezzo ribassato</label>
                <input
                  class="form-control modern-input"
                  v-model="formData.PriceReduced"
                  type="number"
                  :disabled="!canModify && user.Role === 'Agent'"
                />
              </div>

              <div class="form-field">
                <label class="form-label">Spese condominiali</label>
                <input
                  class="form-control modern-input"
                  v-model="formData.CondominiumExpenses"
                  type="number"
                  :disabled="!canModify && user.Role === 'Agent'"
                />
              </div>

              <div class="form-field">
                <label class="form-label required">Disponibilità</label>
                <select class="form-select modern-select" v-model="formData.Availability" :disabled="!canModify && user.Role === 'Agent'">
                  <option value="">Seleziona la Disponibilità</option>
                  <option value="Libero">Libero</option>
                  <option value="Occupato">Occupato</option>
                </select>
              </div>

              <div class="form-field">
                <label class="form-label">Provvigione concordata</label>
                <el-form-item prop="AgreedCommission">
                  <el-input
                    v-model="formData.AgreedCommission"
                    type="number"
                    placeholder="Inserisci percentuale"
                    :disabled="!canModify && user.Role === 'Agent'"
                  >
                    <template #append>
                      <span>%</span>
                    </template>
                  </el-input>
                </el-form-item>
              </div>

              <div class="form-field">
                <label class="form-label">Provvigione forfettaria</label>
                <el-form-item prop="FlatRateCommission">
                  <el-input
                    v-model="formData.FlatRateCommission"
                    type="number"
                    placeholder="Inserisci percentuale"
                    :disabled="!canModify && user.Role === 'Agent'"
                  >
                    <template #append>
                      <span>%</span>
                    </template>
                  </el-input>
                </el-form-item>
              </div>

              <div class="form-field">
                <label class="form-label">Storno provvigione</label>
                <el-form-item prop="CommissionReversal">
                  <el-input
                    v-model="formData.CommissionReversal"
                    type="number"
                    placeholder="Inserisci percentuale"
                    :disabled="!canModify && user.Role === 'Agent'"
                  >
                    <template #append>
                      <span>%</span>
                    </template>
                  </el-input>
                </el-form-item>
              </div>
            </div>
          </div>

                  <div class="compact-section mb-8 mb-md-10 mb-xl-12">
                    <div class="section-header">
                      <div class="section-icon">
                        <i class="ki-duotone ki-shield-tick fs-3 fs-md-2 text-primary">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                      </div>
                      <div class="flex-grow-1">
                        <h4 class="section-title fw-bold text-palette-primary fs-5 fs-md-4">Stato e Impostazioni</h4>
                        <p class="section-subtitle text-palette-secondary fs-7 fs-md-6 mb-0">Controlla disponibilità, scadenze e stati rapidi.</p>
                      </div>
                    </div>
            <div class="compact-grid">
              <div class="form-field">
                <label class="form-label">Data fine incarico</label>
                <input
                  class="form-control modern-input"
                  v-model="formData.AssignmentEnd"
                  type="date"
                  placeholder="yyyy-MM-dd"
                  :disabled="!canModify && user.Role === 'Agent'"
                />
              </div>

              <div class="form-field full-width">
                <label class="form-label required">Descrizione</label>
                <el-form-item prop="Description">
                  <textarea
                    class="form-control modern-input"
                    v-model="formData.Description"
                    rows="4"
                    :disabled="!canModify && user.Role === 'Agent'"
                  ></textarea>
                </el-form-item>
              </div>
            </div>

            <div class="toggle-grid">
              <div class="toggle-card">
                <div class="form-check form-switch form-check-custom form-check-solid">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="toggle-in-home"
                    v-model="formData.InHome"
                    :disabled="!canModify && user.Role === 'Agent'"
                  />
                  <label class="form-check-label ms-3 fw-semibold" for="toggle-in-home">
                    In Home
                  </label>
                </div>
              </div>

              <div class="toggle-card">
                <div class="form-check form-switch form-check-custom form-check-solid">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="toggle-highlighted"
                    v-model="formData.Highlighted"
                    :disabled="!canModify && user.Role === 'Agent'"
                  />
                  <label class="form-check-label ms-3 fw-semibold" for="toggle-highlighted">
                    In Evidenza
                  </label>
                </div>
              </div>

              <div class="toggle-card">
                <div class="form-check form-switch form-check-custom form-check-solid">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="toggle-auction"
                    v-model="formData.Auction"
                    :disabled="!canModify && user.Role === 'Agent'"
                  />
                  <label class="form-check-label ms-3 fw-semibold" for="toggle-auction">
                    Asta
                  </label>
                </div>
              </div>

              <div class="toggle-card">
                <div class="form-check form-switch form-check-custom form-check-solid">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="toggle-negotiation"
                    v-model="formData.Negotiation"
                    :disabled="!canModify && user.Role === 'Agent'"
                  />
                  <label class="form-check-label ms-3 fw-semibold" for="toggle-negotiation">
                    In trattativa
                  </label>
                </div>
              </div>

              <div class="toggle-card">
                <div class="form-check form-switch form-check-custom form-check-solid">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="toggle-sold"
                    v-model="formData.Sold"
                    :disabled="!canModify && user.Role === 'Agent'"
                  />
                  <label class="form-check-label ms-3 fw-semibold" for="toggle-sold">
                    Venduto
                  </label>
                </div>
              </div>

              <div class="toggle-card">
                <div class="form-check form-switch form-check-custom form-check-solid">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="toggle-archived"
                    v-model="formData.Archived"
                    :disabled="!canModify && user.Role === 'Agent'"
                  />
                  <label class="form-check-label ms-3 fw-semibold" for="toggle-archived">
                    Archiviato
                  </label>
                </div>
              </div>
            </div>
          </div>

                  <div class="compact-section">
                    <div class="section-header">
                      <div class="section-icon">
                        <i class="ki-duotone ki-link-square fs-3 fs-md-2 text-primary">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                      </div>
                      <div class="flex-grow-1">
                        <h4 class="section-title fw-bold text-palette-primary fs-5 fs-md-4">Media e Note</h4>
                        <p class="section-subtitle text-palette-secondary fs-7 fs-md-6 mb-0">Collega risorse aggiuntive e consulta le note inserite.</p>
                      </div>
                    </div>
            <div class="compact-grid">
              <div class="form-field">
                <label class="form-label">
                  <i class="ki-duotone ki-camera fs-5 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  URL Video
                </label>
                <input
                  class="form-control modern-input"
                  v-model="formData.VideoUrl"
                  type="text"
                  placeholder="https://"
                  :disabled="!canModify && user.Role === 'Agent'"
                />
              </div>
            </div>

            <div
              v-if="formData.RealEstatePropertyNotes && formData.RealEstatePropertyNotes.length"
              class="notes-wrapper mt-4"
            >
              <div
                v-for="(note, index) in formData.RealEstatePropertyNotes"
                :key="index"
                class="note-card"
              >
                <div v-html="note.Text"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="user.Id === formData.UserId || user.Role === 'Admin' || formData.User.AdminId === user.Id"
        class="card-footer d-flex justify-content-end py-6 px-9">
        <div class="d-flex align-items-center">
          <button v-if="user.Role === 'Admin' || (user.Role === 'Agency' && user.Id === formData.User.AdminId )" type="button" @click="deleteItem()"
            class="btn btn-modal-danger me-2">
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
          <button :data-kt-indicator="loading ? 'on' : null" class="btn btn-modal-primary" type="submit" :disabled="loading">
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
        </div>
      </div>
      <!--end::Actions-->
        </div>
        <!--end::Data Tab-->

        <!--begin::Images Tab-->
        <div class="tab-pane fade" id="images-pane" role="tabpanel" aria-labelledby="images-tab">
          <!--begin::Image Management-->
          <div class="image-management">
            <!--begin::Upload Section-->
            <div class="upload-section mb-5">
              <div class="upload-area" @click="triggerFileUpload" @dragover.prevent @drop.prevent="handleDrop">
                <div class="upload-icon">
                  <i class="ki-duotone ki-cloud-upload fs-1">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                  </i>
                </div>
                <div class="upload-text">
                  <h4>Trascina le immagini qui o clicca per selezionare</h4>
                  <p class="text-muted">Supporta JPG, PNG, GIF (max 5MB per immagine)</p>
                </div>
              </div>
              <input ref="fileInput" type="file" multiple accept="image/*" @change="onFileChanged" style="display: none;">
            </div>
            <!--end::Upload Section-->

            <!--begin::Image Gallery-->
            <div v-if="formData.Photos && formData.Photos.length > 0" class="image-gallery">
              <draggable
                :list="formData.Photos"
                :disabled="false"
                item-key="Id"
                class="list-group"
                ghost-class="sortable-ghost"
                chosen-class="sortable-chosen"
                @start="onDragStart"
                @end="onDragEnd"
                :animation="300"
              >
                <template #item="{ element, index }">
                  <div class="image-card" :class="{ 'highlighted': element.Highlighted }">
                    <div class="drag-handle">
                      <i class="ki-duotone ki-menu fs-4 text-primary">
                        <span class="path1"></span>
                        <span class="path2"></span>
                        <span class="path3"></span>
                      </i>
                    </div>
                    <img
                      :src="element.Url"
                      :alt="`Immagine ${index + 1}`"
                      @error="handleImageError($event)"
                      @load="handleImageLoad($event)"
                      style="display: block; width: 100%; height: 150px; object-fit: cover;"
                    />
                    <div v-if="imageErrors[element.Id]" class="image-error-placeholder">
                      <i class="ki-duotone ki-picture fs-1 text-muted">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      <p class="text-muted mt-2 mb-1">Immagine non disponibile</p>
                      <p class="text-danger fs-7 mb-0">Verifica Azure Storage Emulator</p>
                      <a :href="element.Url" target="_blank" class="btn btn-sm btn-link text-primary mt-2" style="font-size: 0.75rem;">
                        Prova URL
                      </a>
                    </div>
                    <div class="image-overlay">
                      <div class="btn-group">
                        <button
                          v-if="!element.Highlighted"
                          type="button"
                          class="btn btn-primary btn-sm"
                          @click="setPhotoHighlighted(element.Id)"
                        >
                          <i class="ki-duotone ki-star fs-6 me-1">
                            <span class="path1"></span>
                            <span class="path2"></span>
                          </i>
                          Principale
                        </button>
                        <button
                          type="button"
                          class="btn btn-danger btn-sm"
                          @click="deleteFile(element.Id)"
                        >
                          <i class="ki-duotone ki-trash fs-6 me-1">
                            <span class="path1"></span>
                            <span class="path2"></span>
                            <span class="path3"></span>
                            <span class="path4"></span>
                            <span class="path5"></span>
                          </i>
                          Elimina
                        </button>
                      </div>
                    </div>
                    <div v-if="element.Highlighted" class="highlighted-badge">
                      <i class="ki-duotone ki-star fs-6 text-warning">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                    </div>
                  </div>
                </template>
              </draggable>
            </div>
            <!--end::Image Gallery-->

            <!--begin::Empty State-->
            <div v-else class="empty-state text-center py-5">
              <div class="empty-icon mb-3">
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
    </div>
    <!--end::Tabs-->
  </div>
  <!--end::Content-->
</template>

<script lang="ts">
// import AddNewForm from "@/components/modals/forms/AddNewForm.vue";
// import AddNewPreventive from "@/components/modals/forms/AddNewPreventive.vue";
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, watch, nextTick, computed } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { getAllProvinceNames, getCitiesByProvince, getCAPByCity } from "@/core/data/italian-geographic-data-loader";
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
import { getEvents, type Event as CalendarEvent } from "@/core/data/events";
import draggable from 'vuedraggable';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
  name: "update",
  components: { draggable, Multiselect /*, AddNewForm, AddNewPreventive */ },
  setup() {
    const store = useAuthStore();
    const user = store.user;
    const route = useRoute();
    const router = useRouter();
    const id = parseInt(route.params.id.toString());
    const formRef = ref<null | HTMLFormElement>(null);
    const updateModalRef = ref<null | HTMLElement>(null);
    const typesavailable = ref<string[]>([]);
    const provinces = ref<Array<{Id: string, Name: string}>>([]);
    const cities = ref<Array<{Id: string, Name: string}>>([]);
    const showTipologia = ref(false);
    const loading = ref<boolean>(true);
    const firtLoad = ref(false);
    const isTrattativaRiservata = ref(false);
    const imageErrors = ref<Record<number, boolean>>({});

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
            Name: city.Name
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



    const formData = ref<RealEstateProperty>({
      Title: "",
      Category: "",
      Typology: "",
      InHome: false,
      Highlighted: false,
      Auction: false,
      Negotiation: false,
      Sold: false,
      Archived: false,
      Status: "",
      AddressLine: "",
      City: "",
      State: "",
      Location: "",
      PostCode: "",
      CommercialSurfaceate: 0,
      TotalBuildingfloors: 0,
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
      StateOfTheProperty: "",
      YearOfConstruction: 0,
      Price: 0,
      PriceReduced: 0,
      MQGarden: 0,
      CondominiumExpenses: 0,
      Availability: "",
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
      TypeOfAssignment: "",
    });

    const inserModel = ref<InsertModel>({
      Customers: [],
      Users: []
    });

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

    const validateCommercialSurface = (_rule: any, value: number | string, callback: any) => {
      const numericValue = Number(value);
      if (value === null || value === undefined || value === "" || Number.isNaN(numericValue) || numericValue <= 0) {
        callback(new Error("La superficie commerciale è obbligatoria"));
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

    const rules = ref({
      CustomerId: [
        {
          required: true,
          message: "Il cliente è obbligatorio",
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
      Category: [
        {
          required: true,
          message: "E' obbligatorio",
          trigger: "change",
        },
      ],
      Typology: [
        {
          required: true,
          message: "E' obbligatorio",
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
      AddressLine: [
        {
          required: true,
          message: "E' obbligatorio",
          trigger: "change",
        },
      ],
      City: [
        {
          required: true,
          message: "E' obbligatorio",
          trigger: "change",
        },
      ],
      State: [
        {
          required: true,
          message: "E' obbligatorio",
          trigger: "change",
        },
      ],
      PostCode: [
        {
          required: true,
          message: "Il codice fiscale è obbligatorio",
          trigger: "change",
        },
      ],
      CommercialSurfaceate: [
        { validator: validateCommercialSurface, trigger: "change" },
      ],
      Floor: [
        {
          required: false,
          message: "E' obbligatorio",
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
      Description: [
        {
          required: true,
          message: "La descrizione è obbligatoria",
          trigger: "change",
        },
      ],
    });


    // Salva il UserId originale dell'immobile (non deve essere modificato)
    const originalUserId = ref<string>("");

    onMounted(async () => {
      loading.value = true;
      firtLoad.value = true;
      formData.value = await getRealEstateProperty(id)
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
          if (cap) {
            formData.value.PostCode = cap;
          }
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

    const deleteFile = async (photoId: number) => {
      loading.value = true;
      await deletePhoto(photoId)
        .then(() => {
          loading.value = false;

          Swal.fire({
            text: "Operazione terminata con successo!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Continua!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-primary",
            },
          }).then(async () => {
            formData.value = await getRealEstateProperty(id)
          });
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

    const cancelEdit = () => {
      router.back();
    };

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

    const submit = () => {
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

      const missingFields: string[] = [];
      if (!formData.value.CustomerId) missingFields.push("Cliente");
      if (!formData.value.AgentId) missingFields.push("Agente");
      if (!formData.value.Title || !formData.value.Title.trim()) missingFields.push("Titolo");
      if (!formData.value.Category) missingFields.push("Categoria");
      if (showTipologia.value && (!formData.value.Typology || !formData.value.Typology.trim())) missingFields.push("Tipologia");
      if (!formData.value.Status) missingFields.push("Stato vendita");
      if (!formData.value.AddressLine || !formData.value.AddressLine.trim()) missingFields.push("Indirizzo");
      if (!formData.value.State) missingFields.push("Provincia");
      if (!formData.value.City) missingFields.push("Comune");
      if (!formData.value.PostCode) missingFields.push("Codice fiscale");
      if (!formData.value.CommercialSurfaceate || formData.value.CommercialSurfaceate <= 0) missingFields.push("Superficie");
      if (!formData.value.EnergyClass) missingFields.push("Classe energetica");
      if (!formData.value.StateOfTheProperty) missingFields.push("Stato dell'immobile");
      if (!formData.value.YearOfConstruction || formData.value.YearOfConstruction <= 0) missingFields.push("Anno costruzione");
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
      }
      if (!formData.value.Description || !formData.value.Description.trim()) missingFields.push("Descrizione");

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

      formRef.value.validate(async (valid: boolean) => {
        if (valid) {
          loading.value = true;
          
          // Preserva il UserId originale - non sovrascriverlo
          formData.value.UserId = originalUserId.value;
          
          // Se la checkbox "Trattativa riservata" è selezionata, imposta il prezzo a -1
          if (isTrattativaRiservata.value) {
            formData.value.Price = -1;
          }
          
          await updatePhotosOrder(formData.value.Photos)
          await updateRealEstateProperty(formData.value)
            .then(() => {
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
          loading.value = false;
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
          return false;
        }
      });
    };

    async function checkMove(log) {
      // await updatePhotosOrder(formData.value.Photos)
      // console.log(formData.value.Photos)
    }

    // Nuove funzioni per la gestione delle immagini
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
      if (!formData.value || !formData.value.User) {
        return false;
      }

      const propertyOwner = formData.value.User;
      const currentUser = user;

      // Se l'utente è il proprietario, può sempre modificare
      if (currentUser.Id === formData.value.UserId) {
        return true;
      }

      // Admin: può modificare tutta la sua cerchia
      if (currentUser.Role === 'Admin') {
        // L'immobile è dell'Admin stesso
        if (formData.value.UserId === currentUser.Id) {
          return true;
        }
        // L'immobile è di un'Agency dell'Admin
        const ownerAgencyId = (propertyOwner as any).AgencyId;
        if (ownerAgencyId === currentUser.Id && propertyOwner.Role === 'Agency') {
          return true;
        }
        // L'immobile è di un Agent diretto dell'Admin
        if (propertyOwner.AdminId === currentUser.Id && propertyOwner.Role === 'Agent') {
          return true;
        }
        // L'immobile è di un Agent di un'Agency dell'Admin
        // (verificato tramite AgencyId che punta a un'Agency dell'Admin)
        // Nota: questo richiederebbe caricare le Agency, ma per sicurezza
        // il backend controllerà comunque, quindi possiamo essere più permissivi qui
        // e lasciare che il backend faccia il controllo finale
        return false;
      }

      // Agency: può modificare proprie + dei propri Agent
      if (currentUser.Role === 'Agency') {
        // L'immobile è dell'Agency stessa
        if (formData.value.UserId === currentUser.Id) {
          return true;
        }
        // L'immobile è di un suo Agent (verifica tramite AdminId)
        if (propertyOwner.AdminId === currentUser.Id && propertyOwner.Role === 'Agent') {
          return true;
        }
        return false;
      }

      // Agent: può modificare solo proprie
      if (currentUser.Role === 'Agent') {
        return formData.value.UserId === currentUser.Id;
      }

      return false;
    });

    // Verifica se l'utente può eliminare l'immobile secondo le regole di accesso
    const canDelete = computed(() => {
      if (!formData.value || !formData.value.User) {
        return false;
      }

      const propertyOwner = formData.value.User;
      const currentUser = user;

      // Se l'utente è il proprietario, può sempre eliminare
      if (currentUser.Id === formData.value.UserId) {
        return true;
      }

      // Admin: può eliminare tutta la sua cerchia
      if (currentUser.Role === 'Admin') {
        // L'immobile è dell'Admin stesso
        if (formData.value.UserId === currentUser.Id) {
          return true;
        }
        // L'immobile è di un'Agency dell'Admin
        const ownerAgencyId = (propertyOwner as any).AgencyId;
        if (ownerAgencyId === currentUser.Id && propertyOwner.Role === 'Agency') {
          return true;
        }
        // L'immobile è di un Agent diretto dell'Admin
        if (propertyOwner.AdminId === currentUser.Id && propertyOwner.Role === 'Agent') {
          return true;
        }
        return false;
      }

      // Agency: può eliminare proprie + dei propri Agent
      if (currentUser.Role === 'Agency') {
        // L'immobile è dell'Agency stessa
        if (formData.value.UserId === currentUser.Id) {
          return true;
        }
        // L'immobile è di un suo Agent (verifica tramite AdminId)
        if (propertyOwner.AdminId === currentUser.Id && propertyOwner.Role === 'Agent') {
          return true;
        }
        return false;
      }

      // Agent: può eliminare solo proprie
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

    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      updateModalRef,
      getAssetPath,
      onFileChanged,
      typesavailable,
      showTipologia,
      setPhotoHighlighted,
      deleteFile,
      deleteItem,
      inserModel,
      user,
      checkMove,
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
      cancelEdit,
      canModify,
      canDelete,
      agentName,
    };
  },
});
</script>

<style>
@import '@/assets/css/property-tabs.css';
</style>
