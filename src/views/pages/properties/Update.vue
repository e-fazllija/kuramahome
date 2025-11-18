<template>
  <!--begin::Basic info-->
  <div class="card mb-5 mb-xl-10" style="border-radius: 0.95rem; border: 1px solid #e9ecef; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);">
    <!--begin::Card header-->
    <div class="card-header border-0" style="background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%); border-radius: 0.95rem 0.95rem 0 0; border-bottom: 1px solid #e9ecef;">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <div class="d-flex align-items-center">
          <div class="symbol symbol-45px me-3">
            <span class="symbol-label" style="background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%); box-shadow: 0 4px 12px rgba(54, 153, 255, 0.3);">
              <i class="ki-duotone ki-home fs-2 text-white">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
            </span>
          </div>
          <div>
            <h3 class="fw-bold m-0 text-gray-900 fs-3">Aggiorna Immobile</h3>
            <span class="text-muted fs-7 fw-semibold">Modifica i dati dell'immobile</span>
          </div>
        </div>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->
  </div>
  <KTSpinner v-if="loading" :centered="true" size="md" />
  <!--begin::Content-->
  <div v-else class="collapse show">
    <!--begin::Tabs-->
    <div class="property-tabs">
      <ul class="nav nav-tabs" id="propertyTabs" role="tablist">
        <li class="nav-item" role="presentation">
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
            <i class="ki-duotone ki-notepad fs-4 me-2">
              <span class="path1"></span>
              <span class="path2"></span>
              <span class="path3"></span>
              <span class="path4"></span>
              <span class="path5"></span>
            </i>
            Dati Immobile
          </button>
        </li>
        <li class="nav-item" role="presentation">
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
            <i class="ki-duotone ki-picture fs-4 me-2">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            Immagini
          </button>
        </li>
      </ul>
      <div class="tab-content" id="propertyTabsContent">
        <!--begin::Data Tab-->
        <div class="tab-pane fade show active" id="data-pane" role="tabpanel" aria-labelledby="data-tab">
          <!--begin::Form-->
          <el-form @submit.prevent="submit()" :model="formData" :rules="rules" ref="formRef" enctype="multipart/form-data">
      <!--begin::Card body-->
      <div class="card-body border-top p-9 compact-body">
        <div class="form-sections">
          <div class="compact-section mb-12">
            <div class="section-header">
              <div class="section-icon">
                <i class="ki-duotone ki-notepad fs-2 text-primary">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                  <span class="path4"></span>
                  <span class="path5"></span>
                </i>
              </div>
              <div>
                <h4 class="section-title">Dati Principali</h4>
                <p class="section-subtitle">Informazioni generali sull&apos;immobile.</p>
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
                  <select class="form-select modern-select" v-model="formData.AgentId" required>
                    <option
                      v-for="(user, index) in inserModel.Users"
                      :key="index"
                      :value="user.Id"
                    >
                      {{ user.FirstName }} {{ user.LastName }}
                    </option>
                  </select>
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
                  <select class="form-select modern-select" v-model="formData.Category" required>
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
                  <select class="form-select modern-select" v-model="formData.Typology">
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
                  <select class="form-select modern-select" v-model="formData.Status" required>
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
                <select class="form-select modern-select" v-model="formData.TypeOfAssignment">
                  <option value="Verbale">Verbale</option>
                  <option value="Esclusivo">Esclusivo</option>
                  <option value="Semi-Verbale">Semi-Verbale</option>
                  <option value="Immobile MLS">Immobile MLS</option>
                </select>
              </div>
            </div>
          </div>

          <div class="compact-section mb-12">
            <div class="section-header">
              <div class="section-icon">
                <i class="ki-duotone ki-geolocation fs-2 text-primary">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </div>
              <div>
                <h4 class="section-title">Localizzazione</h4>
                <p class="section-subtitle">Riferimenti geografici e indirizzo completo.</p>
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
                  />
                </el-form-item>
              </div>

              <div class="form-field">
                <label class="form-label required">Provincia</label>
                <el-form-item prop="State">
                  <select class="form-select modern-select" v-model="formData.State" required>
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
                  <select class="form-select" v-model="formData.City" required>
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
                  />
                </el-form-item>
              </div>
            </div>
          </div>

          <div class="compact-section mb-12">
            <div class="section-header">
              <div class="section-icon">
                <i class="ki-duotone ki-setting fs-2 text-primary">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </div>
              <div>
                <h4 class="section-title">Caratteristiche Tecniche</h4>
                <p class="section-subtitle">Dimensioni, dotazioni e finiture dell&apos;immobile.</p>
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
                  />
                </el-form-item>
              </div>

              <div class="form-field">
                <label class="form-label">Piano</label>
                <select class="form-select modern-select" v-model="formData.Floor">
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
                />
              </div>

              <div class="form-field">
                <label class="form-label">Giardino (mq)</label>
                <input
                  class="form-control modern-input"
                  v-model="formData.MQGarden"
                  type="number"
                />
              </div>

              <div class="form-field">
                <label class="form-label">Ascensori</label>
                <input
                  class="form-control modern-input"
                  v-model="formData.Elevators"
                  type="number"
                />
              </div>

              <div class="form-field">
                <label class="form-label">Camere da letto</label>
                <input
                  class="form-control modern-input"
                  v-model="formData.Bedrooms"
                  type="number"
                />
              </div>

              <div class="form-field">
                <label class="form-label">Locali</label>
                <input
                  class="form-control modern-input"
                  v-model="formData.WarehouseRooms"
                  type="number"
                />
              </div>

              <div class="form-field">
                <label class="form-label">Cucine</label>
                <input
                  class="form-control modern-input"
                  v-model="formData.Kitchens"
                  type="number"
                />
              </div>

              <div class="form-field">
                <label class="form-label">Bagni</label>
                <input
                  class="form-control modern-input"
                  v-model="formData.Bathrooms"
                  type="number"
                />
              </div>

              <div class="form-field">
                <label class="form-label">Arredamento</label>
                <select class="form-select modern-select" v-model="formData.Furniture">
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
                />
              </div>

              <div class="form-field">
                <label class="form-label">Riscaldamento</label>
                <select class="form-select modern-select" v-model="formData.Heating">
                  <option value="Nessuno">Nessuno</option>
                  <option value="Autonomo">Autonomo</option>
                  <option value="Centralizzato">Centralizzato</option>
                </select>
              </div>

              <div class="form-field">
                <label class="form-label">Esposizione</label>
                <select class="form-select modern-select" v-model="formData.Exposure">
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
                </el-form-item>
              </div>

              <div class="form-field">
                <label class="form-label">Tipo di proprietà</label>
                <input
                  class="form-control modern-input"
                  v-model="formData.TypeOfProperty"
                  type="text"
                />
              </div>

              <div class="form-field">
                <label class="form-label required">Stato dell&apos;immobile</label>
                <el-form-item prop="StateOfTheProperty">
                  <select class="form-select modern-select" v-model="formData.StateOfTheProperty">
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
                  />
                </el-form-item>
              </div>

              <div class="form-field full-width">
                <label class="form-label">Altri dettagli</label>
                <input
                  class="form-control modern-input"
                  v-model="formData.MoreDetails"
                  type="text"
                />
              </div>

              <div class="form-field full-width">
                <label class="form-label">Altre caratteristiche</label>
                <input
                  class="form-control modern-input"
                  v-model="formData.MoreFeatures"
                  type="text"
                />
              </div>
            </div>
          </div>

          <div class="compact-section mb-12">
            <div class="section-header">
              <div class="section-icon">
                <i class="ki-duotone ki-wallet fs-2 text-primary">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </div>
              <div>
                <h4 class="section-title">Valori Economici</h4>
                <p class="section-subtitle">Gestisci prezzi, trattative e provvigioni.</p>
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
                  />
                </el-form-item>
              </div>

              <div class="form-field">
                <label class="form-label">Prezzo ribassato</label>
                <input
                  class="form-control modern-input"
                  v-model="formData.PriceReduced"
                  type="number"
                />
              </div>

              <div class="form-field">
                <label class="form-label">Spese condominiali</label>
                <input
                  class="form-control modern-input"
                  v-model="formData.CondominiumExpenses"
                  type="number"
                />
              </div>

              <div class="form-field">
                <label class="form-label required">Disponibilità</label>
                <select class="form-select modern-select" v-model="formData.Availability">
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
                  >
                    <template #append>
                      <span>%</span>
                    </template>
                  </el-input>
                </el-form-item>
              </div>
            </div>
          </div>

          <div class="compact-section mb-12">
            <div class="section-header">
              <div class="section-icon">
                <i class="ki-duotone ki-shield-tick fs-2 text-primary">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </div>
              <div>
                <h4 class="section-title">Stato e Impostazioni</h4>
                <p class="section-subtitle">Controlla disponibilità, scadenze e stati rapidi.</p>
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
                />
              </div>

              <div class="form-field full-width">
                <label class="form-label required">Descrizione</label>
                <el-form-item prop="Description">
                  <textarea
                    class="form-control modern-input"
                    v-model="formData.Description"
                    rows="4"
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
                <i class="ki-duotone ki-link-square fs-2 text-primary">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </div>
              <div>
                <h4 class="section-title">Media e Note</h4>
                <p class="section-subtitle">Collega risorse aggiuntive e consulta le note inserite.</p>
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
        class="card-footer d-flex justify-content-between py-6 px-9" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-top: 1px solid #dee2e6;">
        <div>
          <!-- <AddNewForm /> -->
          <!-- <button type="button" class="btn btn-info btn-active-light-primary me-2" data-bs-toggle="modal"
            data-bs-target="#kt_modal_scheda">
            <KTIcon icon-name="file" icon-class="fs-2 me-1" />
            Scheda
          </button> -->
          <!-- <AddNewPreventive /> -->
          <!-- <button type="button" class="btn btn-info btn-active-light-primary" data-bs-toggle="modal"
            data-bs-target="#kt_modal_preventivo">
            <KTIcon icon-name="calculator" icon-class="fs-2 me-1" />
            Preventivo
          </button> -->
        </div>
        <div class="d-flex align-items-center">
          <button type="button" class="btn btn-modal-cancel me-3" @click="cancelEdit">
            <span class="btn-icon">
              <i class="ki-duotone ki-cross fs-3">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
            </span>
            <span class="btn-label">Annulla</span>
          </button>
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
    </el-form>
    <!--end::Form-->
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
    </div>
    <!--end::Tabs-->
  </div>
  <!--end::Content-->
</template>

<script lang="ts">
// import AddNewForm from "@/components/modals/forms/AddNewForm.vue";
// import AddNewPreventive from "@/components/modals/forms/AddNewPreventive.vue";
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, watch, nextTick } from "vue";
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


    onMounted(async () => {
      loading.value = true;
      firtLoad.value = true;
      formData.value = await getRealEstateProperty(id)
      formData.value.AssignmentEnd = formData.value.AssignmentEnd.split('T')[0]
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

    const hasRelatedCalendarEvents = async (propertyId: number): Promise<boolean> => {
      try {
        const events = await getEvents();
        if (!Array.isArray(events)) {
          return false;
        }
        return events.some((event: CalendarEvent) => {
          if (!event) return false;
          const belongsToProperty = event.RealEstatePropertyId === propertyId;
          if (!belongsToProperty) return false;
          // Consideriamo bloccanti solo eventi non cancellati
          return !event.Cancelled;
        });
      } catch (error) {
        console.warn("Impossibile verificare le associazioni in calendario:", error);
        return false;
      }
    };

    async function deleteItem() {
      loading.value = true;
      Swal.fire({
        text: "Confermare l'eliminazione?",
        icon: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Sì, elimina",
        cancelButtonText: "Annulla",
        heightAuto: false,
        customClass: {
          confirmButton: "btn btn-danger me-3",
          cancelButton: "btn btn-light"
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const hasCalendarLinks = await hasRelatedCalendarEvents(id);
            if (hasCalendarLinks) {
              loading.value = false;
              Swal.fire({
                text: "Impossibile eliminare l'immobile: risulta associato ad almeno un appuntamento in calendario. Rimuovi l'appuntamento e riprova.",
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
          } catch (response: any) {
            loading.value = false;
            const backendMessage: string =
              response?.data?.Message ||
              response?.data?.Detail ||
              response?.data?.message ||
              "";
            const normalizedMessage = backendMessage.toLowerCase();
            const isCalendarConflict =
              normalizedMessage.includes("calendar") ||
              normalizedMessage.includes("appunt");
            const message = isCalendarConflict
              ? "Impossibile eliminare l'immobile: risulta associato ad almeno un appuntamento in calendario. Rimuovi l'appuntamento e riprova."
              : backendMessage || "Si è verificato un errore durante l'eliminazione dell'immobile.";

            Swal.fire({
              text: message,
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Ok",
              heightAuto: false,
              customClass: {
                confirmButton: "btn btn-primary",
              },
            });
          }
        } else {
          loading.value = false;
        }
      }).catch(() => {
        loading.value = false;
      });
    }

    const submit = () => {
      if (!formRef.value) {
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
      hasRelatedCalendarEvents,
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
    };
  },
});
</script>

<style scoped>
@import '@/assets/css/property-tabs.css';

.compact-body {
  background: transparent;
}

.form-sections {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.compact-section {
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 0.95rem;
  padding: 2rem 1.75rem;
  box-shadow: 0 16px 32px rgba(15, 34, 58, 0.06);
  transition: transform 0.2s ease;
}

.compact-section:hover {
  transform: translateY(-2px);
}

body[data-bs-theme="dark"] .compact-section {
  background: #1a1a1a;
  border-color: #2c2c2c;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.5);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.75rem;
}

.section-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%);
  border: 1px solid #e9ecef;
}

body[data-bs-theme="dark"] .section-icon {
  background: #2c2c2c;
  border-color: #333333;
}

.section-title {
  margin: 0;
  font-weight: 700;
  color: #333333;
}

body[data-bs-theme="dark"] .section-title {
  color: #e0e0e0;
}

.section-subtitle {
  margin: 0;
  font-size: 0.875rem;
  color: #666666;
}

body[data-bs-theme="dark"] .section-subtitle {
  color: #aaaaaa;
}

.compact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem 1.5rem;
}

.form-field {
  background: #f9fbfd;
  border: 1px solid #e9ecef;
  border-radius: 0.85rem;
  padding: 1.15rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-field:hover {
  border-color: #0077cc;
  box-shadow: 0 12px 24px rgba(0, 119, 204, 0.08);
}

body[data-bs-theme="dark"] .form-field {
  background: #2c2c2c;
  border-color: #333333;
}

body[data-bs-theme="dark"] .form-field:hover {
  border-color: #0077cc;
  box-shadow: 0 12px 28px rgba(0, 119, 204, 0.2);
}

.form-field.full-width {
  grid-column: 1 / -1;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  font-weight: 600;
  color: #333333;
  font-size: 0.95rem;
}

body[data-bs-theme="dark"] .form-label {
  color: #e0e0e0;
}

.form-label.required::after {
  content: '*';
  color: #e70f86;
  font-weight: 600;
  margin-left: 0.35rem;
}

.form-field .form-control,
.form-field .form-select,
.form-field .multiselect-modern,
.form-field .el-input,
.form-field .el-select {
  width: 100%;
}

:deep(.form-field .el-form-item) {
  margin-bottom: 0;
}

:deep(.form-field .el-input__wrapper),
:deep(.form-field .el-select .el-input__wrapper) {
  background: transparent;
  box-shadow: none;
}

.toggle-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 1.25rem;
}

.toggle-card {
  background: #f0f0f0;
  border: 1px solid #e9ecef;
  border-radius: 0.85rem;
  padding: 0.85rem 1.1rem;
  display: flex;
  align-items: center;
}

body[data-bs-theme="dark"] .toggle-card {
  background: #2c2c2c;
  border-color: #333333;
}

.toggle-card .form-check-input {
  cursor: pointer;
}

.toggle-card .form-check-label {
  color: #333333;
}

body[data-bs-theme="dark"] .toggle-card .form-check-label {
  color: #e0e0e0;
}

.notes-wrapper {
  display: grid;
  gap: 1rem;
}

.note-card {
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 0.85rem;
  padding: 1.25rem;
}

body[data-bs-theme="dark"] .note-card {
  background: #1a1a1a;
  border-color: #2c2c2c;
}

@media (max-width: 991.98px) {
  .compact-section {
    padding: 1.5rem;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
}

.highlighted-badge {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.image-card.highlighted {
  border: 2px solid #ffc107;
  box-shadow: 0 0 0 3px rgba(255, 193, 7, 0.3);
}

.empty-state {
  padding: 3rem 1rem;
}

.empty-icon {
  opacity: 0.5;
}
</style>
