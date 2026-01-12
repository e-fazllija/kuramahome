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
                <i class="ki-duotone ki-document fs-2 fs-md-1 text-white">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </span>
            </div>
            <div class="flex-grow-1">
              <h3 class="fw-bold m-0 text-palette-primary fs-4 fs-md-3">Aggiorna Richiesta</h3>
              <span class="text-palette-secondary fs-8 fs-md-7 fw-semibold d-block mt-1">Modifica i dati della richiesta</span>
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
    <div class="container-fluid px-0 px-md-3">
    <!--begin::Form-->
    <form @submit.prevent="submit()">
      <!--begin::Card body-->
      <div class="card-body card-palette border rounded p-3 p-md-6 p-xl-9" :class="{ 'opacity-50': !canModify }">

        <!--begin::Dati Principali-->
        <div class="mb-4 mb-md-5 mb-xl-6">
          <div class="d-flex align-items-center mb-3">
            <div class="me-3">
              <i class="ki-duotone ki-document fs-3 fs-md-2 text-primary">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
            </div>
            <div class="flex-grow-1">
              <h4 class="h5 h4-md fw-bold text-palette-primary mb-1">Dati Principali</h4>
              <p class="text-muted small mb-0">Informazioni generali della richiesta.</p>
            </div>
          </div>
          <div>
            <!--begin::Input group-->
            <div class="row g-3 mb-3">
              <div class="col-12 col-md-6">
                <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">
                  <i class="ki-duotone ki-profile-user fs-5 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                    <span class="path4"></span>
                  </i>
                  Cliente <span class="text-danger">*</span>
                </label>
                <select 
                  class="form-select form-select-lg" 
                  v-model="formData.CustomerId" 
                  :disabled="!canModify"
                  required
                >
                  <option :value="null">Seleziona il cliente</option>
                  <option
                    v-for="customer in inserModel.Customers"
                    :key="customer.Id"
                    :value="customer.Id"
                  >
                    {{ customer.label }}
                  </option>
                </select>
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">
                  <i class="ki-duotone ki-document fs-5 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Contratto <span class="text-danger">*</span>
                </label>
                <select class="form-select form-select-lg" v-model="formData.Contract" :disabled="!canModify" required>
                  <option value="">Seleziona tipo contratto</option>
                  <option value="Vendita">💰 Vendita</option>
                  <option value="Affitto">🏠 Affitto</option>
                </select>
              </div>
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="mb-3">
              <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">
                <i class="ki-duotone ki-home-2 fs-5 text-primary">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
                Tipologia Immobiliare <span class="text-danger">*</span>
              </label>
              <select class="form-select form-select-lg" multiple v-model="selectedPropertyTypes" :disabled="!canModify" required style="height: auto;">
                <option value="Appartamenti">🏢 Appartamenti</option>
                <option value="AttivitaCommerciale">🏪 Attività Commerciale</option>
                <option value="Box">🚗 Box</option>
                <option value="CapannoniLocArtigianali">🏭 Capannoni, Loc. Artigianali</option>
                <option value="CasaliRuderi">🏚️ Casali e Ruderi</option>
                <option value="CaseSemindipendenti">🏘️ Case Semindipendenti</option>
                <option value="LocaliCommerciali">🏬 Locali Commerciali</option>
                <option value="NuoveCostruzioni">🏗️ Nuove Costruzioni</option>
                <option value="Terreni">🌾 Terreni</option>
                <option value="VilleCaseIndipendenti">🏰 Ville e Case Indipendenti</option>
              </select>
            </div>
            <!--end::Input group-->
          </div>
        </div>
        <!--end::Dati Principali-->

        <!--begin::Localizzazione-->
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
              <p class="text-muted small mb-0">Riferimenti geografici e zona di ricerca.</p>
            </div>
          </div>
          <div>
            <!--begin::Input group-->
            <div class="row g-3 mb-3">
              <div class="col-12 col-md-6">
                <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">
                  <i class="ki-duotone ki-map fs-5 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Provincia <span class="text-danger">*</span>
                </label>
                <select class="form-select form-select-lg" v-model="formData.Province" :disabled="!canModify" required>
                  <option value="">🗺️ Seleziona provincia</option>
                  <option v-for="(province, index) in provinces" :key="index" :value="province.Id">{{ province.Name }}</option>
                </select>
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">
                  <i class="ki-duotone ki-geolocation fs-5 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Comune <span class="text-danger">*</span>
                </label>
                <select class="form-select form-select-lg" multiple v-model="selectedCities" :disabled="!canModify" required>
                  <option v-for="(city, index) in cities" :key="index" :value="city.Id">🏙️ {{ city.Name }}</option>
                </select>
              </div>
            </div>
            <!--end::Input group-->

          </div>
        </div>
        <!--end::Localizzazione-->

        <!--begin::Valori Economici-->
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
              <p class="text-muted small mb-0">Range di prezzo o canone desiderato.</p>
            </div>
          </div>
          <div>
            <!--begin::Input group-->
            <div class="row g-3 mb-3">
              <div class="col-12 col-md-6">
                <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">
                  <i class="ki-duotone ki-dollar fs-5 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Canone - Prezzo: Da
                </label>
                <input class="form-control form-control-lg" v-model.number="formData.PriceFrom" type="number" :disabled="!canModify" placeholder="Inserisci il prezzo minimo" />
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">
                  <i class="ki-duotone ki-dollar fs-5 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Canone - Prezzo: A
                </label>
                <input class="form-control form-control-lg" v-model.number="formData.PriceTo" type="number" :disabled="!canModify" placeholder="Inserisci il prezzo massimo" />
              </div>
            </div>
            <!--end::Input group-->
          </div>
        </div>
        <!--end::Valori Economici-->

        <!--begin::Stato e Impostazioni-->
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
              <p class="text-muted small mb-0">Controlla stato e flag della richiesta.</p>
            </div>
          </div>
          <div>
            <div class="row g-3">
              <div class="col-12 col-md-6 col-lg-4">
                <div class="card p-3">
                  <div class="form-check form-switch form-check-custom form-check-solid">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="toggle-archived"
                      v-model="formData.Archived"
                      :disabled="!canModify"
                    />
                    <label class="form-check-label ms-3 fw-semibold" for="toggle-archived">
                      Archiviata
                    </label>
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-6 col-lg-4">
                <div class="card p-3">
                  <div class="form-check form-switch form-check-custom form-check-solid">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="toggle-closed"
                      v-model="formData.Closed"
                      :disabled="!canModify"
                    />
                    <label class="form-check-label ms-3 fw-semibold" for="toggle-closed">
                      Evasa
                    </label>
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-6 col-lg-4">
                <div class="card p-3">
                  <div class="form-check form-switch form-check-custom form-check-solid">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="toggle-mortgage"
                      v-model="formData.MortgageAdviceRequired"
                      :disabled="!canModify"
                    />
                    <label class="form-check-label ms-3 fw-semibold" for="toggle-mortgage">
                      Consulenza mutuo richiesta
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--end::Stato e Impostazioni-->

        <!--begin::Caratteristiche Tecniche-->
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
              <p class="text-muted small mb-0">Dimensioni, dotazioni e caratteristiche desiderate.</p>
            </div>
          </div>
          <div>
            <!--begin::Input group-->
            <div class="row g-3 mb-3">
              <div class="col-12 col-md-6">
                <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">
                  <i class="ki-duotone ki-home-2 fs-5 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Locali Da
                </label>
                <input class="form-control form-control-lg" v-model.number="formData.RoomsFrom" type="number" :disabled="!canModify" placeholder="Numero minimo di locali" min="0" />
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">
                  <i class="ki-duotone ki-home-2 fs-5 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Locali A
                </label>
                <input class="form-control form-control-lg" v-model.number="formData.RoomsTo" type="number" :disabled="!canModify" placeholder="Numero massimo di locali" min="0" />
              </div>
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="row g-3 mb-3">
              <div class="col-12 col-md-6">
                <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">
                  <i class="ki-duotone ki-home-2 fs-5 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Bagni
                </label>
                <input class="form-control form-control-lg" v-model.number="formData.Bathrooms" type="number" :disabled="!canModify" placeholder="Numero di bagni" min="0" />
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">
                  <i class="ki-duotone ki-home-2 fs-5 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Piano
                </label>
                <select class="form-select form-select-lg" v-model="formData.Floor" :disabled="!canModify">
                  <option value="">🏠 Seleziona Piano</option>
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
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="row g-3 mb-3">
              <div class="col-12 col-md-6">
                <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">
                  <i class="ki-duotone ki-home-2 fs-5 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  MQ Da
                </label>
                <input class="form-control form-control-lg" v-model.number="formData.MQFrom" type="number" :disabled="!canModify" placeholder="Metri quadrati minimi" />
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">
                  <i class="ki-duotone ki-home-2 fs-5 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  MQ A
                </label>
                <input class="form-control form-control-lg" v-model.number="formData.MQTo" type="number" :disabled="!canModify" placeholder="Metri quadrati massimi" />
              </div>
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="row g-3 mb-3">
              <div class="col-12 col-md-6">
                <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">
                  <i class="ki-duotone ki-garden fs-5 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Giardino Da (mq)
                </label>
                <input class="form-control form-control-lg" v-model.number="formData.GardenFrom" type="number" :disabled="!canModify" placeholder="Metri quadrati minimi" />
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">
                  <i class="ki-duotone ki-garden fs-5 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Giardino A (mq)
                </label>
                <input class="form-control form-control-lg" v-model.number="formData.GardenTo" type="number" :disabled="!canModify" placeholder="Metri quadrati massimi" />
              </div>
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="row g-3 mb-3">
              <div class="col-12 col-md-6">
                <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">
                  <i class="ki-duotone ki-home-2 fs-5 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Stato dell'immobile
                </label>
                <select class="form-select form-select-lg" v-model="formData.PropertyState" :disabled="!canModify">
                  <option value="0">🔒 Affittato</option>
                  <option value="1">🏗️ In corso di costruzione</option>
                  <option value="2">✅ Libero</option>
                  <option value="3">📋 Libero al Rogito</option>
                  <option value="4">🏛️ Nuda Proprietà</option>
                  <option value="5">👥 Occupato</option>
                </select>
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">
                  <i class="ki-duotone ki-fire fs-5 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Riscaldamento
                </label>
                <select class="form-select form-select-lg" v-model="formData.Heating" :disabled="!canModify">
                  <option value="">🔥 Seleziona Il Tipo Di Riscaldamento</option>
                  <option value="Autonomo">🏠 Autonomo</option>
                  <option value="Centralizzato">🏢 Centralizzato</option>
                  <option value="Inesistente">❌ Inesistente</option>
                </select>
              </div>
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="row g-3 mb-3">
              <div class="col-12 col-md-6">
                <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">
                  <i class="ki-duotone ki-home-2 fs-5 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Arredamento
                </label>
                <select class="form-select form-select-lg" v-model="formData.Furniture" :disabled="!canModify">
                  <option value="">🪑 Seleziona Arredamento</option>
                  <option value="Arredato">✅ Arredato</option>
                  <option value="Parzialmente Arredato">🟡 Parzialmente Arredato</option>
                  <option value="Non Arredato">❌ Non Arredato</option>
                </select>
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">
                  <i class="ki-duotone ki-home-2 fs-5 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Classe Energetica
                </label>
                <select class="form-select form-select-lg" v-model="formData.EnergyClass" :disabled="!canModify">
                  <option value="">⚡ Seleziona Classe Energetica</option>
                  <option value="A4">🟢 A4</option>
                  <option value="A3">🟢 A3</option>
                  <option value="A2">🟢 A2</option>
                  <option value="A1">🟢 A1</option>
                  <option value="B">🟡 B</option>
                  <option value="C">🟠 C</option>
                  <option value="D">🟠 D</option>
                  <option value="E">🔴 E</option>
                  <option value="F">🔴 F</option>
                  <option value="G">🔴 G</option>
                </select>
              </div>
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="row g-3 mb-3">
              <div class="col-12 col-md-6">
                <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">
                  <i class="ki-duotone ki-car fs-5 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Posti Auto
                </label>
                <input class="form-control form-control-lg" v-model.number="formData.ParkingSpaces" type="number" :disabled="!canModify" placeholder="Inserisci il numero di posti auto" min="0" />
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">
                  <i class="ki-duotone ki-gavel fs-5 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Asta
                </label>
                <div class="form-check form-switch form-check-custom form-check-solid">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="toggle-auction"
                    v-model="formData.Auction"
                    :disabled="!canModify"
                  />
                  <label class="form-check-label ms-3 fw-semibold" for="toggle-auction">
                    Immobile in asta
                  </label>
                </div>
              </div>
            </div>
            <!--end::Input group-->
          </div>
        </div>
        <!--end::Caratteristiche Tecniche-->

        <!--begin::Media e Note-->
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
              <h4 class="h5 h4-md fw-bold text-palette-primary mb-1">Note</h4>
              <p class="text-muted small mb-0">Inserisci e consulta le note della richiesta.</p>
            </div>
          </div>
          <div>
            <!--begin::Input group-->
            <div class="mb-3">
              <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">
                <i class="ki-duotone ki-notepad fs-5 text-primary">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                  <span class="path4"></span>
                  <span class="path5"></span>
                </i>
                Nota principale
              </label>
              <textarea class="form-control form-control-lg" v-model="formData.Notes" :disabled="!canModify" rows="3" placeholder="Inserisci eventuali note..."></textarea>
            </div>
            <!--end::Input group-->

            <!--begin::Riepilogo Note-->
            <div v-if="formData.RequestNotes && formData.RequestNotes.length" class="mt-4">
              <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-3">
                <i class="ki-duotone ki-notepad fs-5 text-primary">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                  <span class="path4"></span>
                  <span class="path5"></span>
                </i>
                Riepilogo Note
              </label>
              <div class="row g-3">
                <div
                  v-for="(note, index) in formData.RequestNotes"
                  :key="index"
                  class="col-12"
                >
                  <div class="card p-3" v-html="note.Text"></div>
                </div>
              </div>
            </div>
            <!--end::Riepilogo Note-->
          </div>
        </div>
        <!--end::Media e Note-->
        <div class="d-flex align-items-end justify-content-end">
          <button type="button" @click="deleteItem()" :disabled="!canModify" class="btn btn-danger me-2">
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
          <button :data-kt-indicator="loading ? 'on' : null" class="btn btn-primary" type="submit" :disabled="loading || !canModify">
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
    </form>
    <!--end::Form-->
    </div>

    <div v-if="!loading" class="container-fluid px-0 px-md-3 mt-5 mt-md-7 mt-xl-10">
      <div class="card card-palette mb-3 mb-md-5 mb-xl-10">
      <!--begin::Card header-->
      <div class="card-header card-palette-header border-0 pt-6 pb-4">
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
              <h3 class="fw-bold m-0 text-palette-primary fs-4 fs-md-3">Immobili Richiesta</h3>
              <span class="text-palette-secondary fs-8 fs-md-7 fw-semibold d-block mt-1">Elenco degli immobili associati</span>
            </div>
          </div>
        </div>
        <!--end::Card title-->
        
        <!--begin::Card toolbar-->
        <div class="card-toolbar">
          <div class="search-wrapper-simple">
            <i class="ki-duotone ki-magnifier fs-3 search-icon-simple">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            <input 
              type="text" 
              v-model="search" 
              @input="searchItems()"
              class="form-control search-input-simple" 
              placeholder="Cerca immobile..." 
            />
          </div>
        </div>
        <!--end::Card toolbar-->
      </div>
      <!--end::Card header-->
      
      <!--begin::Card body-->
      <div class="card-body pt-5">
          <Datatable @on-sort="sort" @on-items-select="onItemSelect" :data="formData.RealEstateProperties"
            :header="tableHeader" :enable-items-per-page-dropdown="true" :checkbox-enabled="false" checkbox-label="Id">
            <template v-slot:Id="{ row: item }">
              {{ item.Id }}
            </template>
            <template v-slot:AgencyName="{ row: item }">
              {{ item.User ? `${item.User.FirstName} ${item.User.LastName}` : '-' }}
            </template>
            <template v-slot:CreationDate="{ row: item }">
              {{ item.CreationDate.substring(0, 10).split('-').reverse().join('-') }}<br />
              {{ item.AssignmentEnd.substring(0, 10).split('-').reverse().join('-') }}
            </template>
            <template v-slot:CommercialSurfaceate="{ row: item }">
              {{ item.CommercialSurfaceate }}
            </template>
            <template v-slot:AddressLine="{ row: item }">
              {{ item.AddressLine }} <br />
              {{ item.City }} <br />
              {{ item.Province }}
            </template>
            <template v-slot:Price="{ row: item }">
              {{ item.Price }}
            </template>
            <template v-slot:MatchPercentage="{ row: item }">
              <span :class="getMatchPercentageClass(item.matchPercentage)">
                {{ item.matchPercentage }}%
              </span>
            </template>
            <template v-slot:actions="{ row: item }">
              <div class="d-flex gap-2 justify-content-center action-buttons">
                <router-link 
                  :to="{ name: 'property', params: { id: item.Id } }" 
                  class="btn btn-action btn-action-info"
                  title="Visualizza dettagli immobile"
                >
                  <span class="btn-icon">
                    <i class="ki-duotone ki-eye fs-3">
                      <span class="path1"></span>
                      <span class="path2"></span>
                      <span class="path3"></span>
                    </i>
                  </span>
                </router-link>
              </div>
            </template>
            <!--begin::Menu-->
            <div
              class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold fs-7 w-125px py-4"
              data-kt-menu="true">
              <!--end::Menu item-->
            </div>
          </Datatable>
        </div>
        <!--end::Card body-->
      </div>
      <!--end::Card-->
    </div>
  </div>
  <!--end::Content-->
  
  <!-- Info Popup per livello 3 -->
  <InfoPopup
    ref="infoPopupRef"
    modalId="info_popup_request_detail"
    :ownerInfo="selectedOwnerInfo"
    entityType="Request"
  />
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, watch, computed } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Request, InsertModel, getToInsert, getRequest, updateRequest, deleteRequest } from "@/core/data/requests";
import { useRoute, useRouter } from "vue-router";
import InfoPopup from "@/components/modals/InfoPopup.vue";
import { AccessLevel, canModify as canModifyHelper, type OwnerInfo } from "@/core/helpers/accessLevel";
import { useAuthStore } from "@/stores/auth";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import KTSpinner from "@/components/Spinner.vue";
import { getAllProvinceNames, getCitiesByProvince } from "@/core/data/italian-geographic-data-loader";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import arraySort from "array-sort";
import type { RealEstateProperty } from "@/core/data/properties";
import { MenuComponent } from "@/assets/ts/components";
export default defineComponent({
  name: "update-request",
  components: { 
    Datatable, 
    KTSpinner,
    InfoPopup,
  },
  setup() {
    const store = useAuthStore();
    const user = store.user;
    const route = useRoute();
    const router = useRouter();
    const id = parseInt(route.params.id.toString());
    const loading = ref<boolean>(true);
    const firtLoad = ref(false);
    const cities = ref([]);
    const selectedPropertyTypes = ref<Array<string>>([]);
    const selectedIds = ref<Array<Number>>([]);
    const initItems = ref([]);
    const infoPopupRef = ref<InstanceType<typeof InfoPopup> | null>(null);
    const requestAccessLevel = ref<number>(1); // Default a 1
    const selectedOwnerInfo = ref<OwnerInfo>({
      Id: "",
      FirstName: "",
      LastName: "",
      Role: "",
    });
    const formData = ref<Request>({
      CustomerId: null,
      Contract: "",
      PropertyType: "",
      Province: "",
      City: "",
      PriceTo:0,
      PriceFrom:0,
      Archived: false,
      Closed: false,
      RoomsFrom: 0,
      RoomsTo: 0,
      Bathrooms: 0,
      Floor: "",
      GardenTo:0,
      GardenFrom:0,
      MQFrom: 0,
      MQTo: 0,
      PropertyState: "",
      Heating: "",
      Furniture: "",
      EnergyClass: "",
      Auction: false,
      ParkingSpaces: 0,
      Notes: "",
      MortgageAdviceRequired: false
    });
    const inserModel = ref<InsertModel>({
      Customers: [],
      Users: []
    });

    const tableHeader = ref([
      {
        columnName: "Codice",
        columnLabel: "Id",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "Agenzia di competenza",
        columnLabel: "AgencyName",
        sortEnabled: true,
        columnWidth: 200,
      },
      {
        columnName: "Ins. / Inc.",
        columnLabel: "CreationDate",
        sortEnabled: true,
        columnWidth: 150,
      },
      {
        columnName: "Mq",
        columnLabel: "CommercialSurfaceate",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "Indirizzo",
        columnLabel: "AddressLine",
        sortEnabled: true,
        columnWidth: 230,
      },
      {
        columnName: "Prezzo",
        columnLabel: "Price",
        sortEnabled: true,
        columnWidth: 150,
      },
      {
        columnName: "Match %",
        columnLabel: "MatchPercentage",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 135,
      },
    ]);

    const provinces = ref<Array<{Id: string, Name: string}>>([]);
    let selectedCities = ref<Array<string>>([]);

    // Funzione per ottenere la classe CSS in base alla percentuale di match
    const getMatchPercentageClass = (percentage: number): string => {
      if (percentage >= 90) return 'badge badge-light-success';
      if (percentage >= 75) return 'badge badge-light-primary';
      if (percentage >= 50) return 'badge badge-light-warning';
      return 'badge badge-light-danger';
    };

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
            Name: `${city.Name} (${city.CAP})`
          }));
        } else {
          cities.value = [];
        }
      } catch (error) {
        console.error("Errore nel caricamento delle città:", error);
        cities.value = [];
      }
    };

    onMounted(async () => {
      loading.value = true;
      firtLoad.value = true;
      const requestData = await getRequest(id);
      
      // Se la risposta è un LimitedAccessResponse (AccessLevel 3)
      if ((requestData as any)._isLimitedAccess) {
        loading.value = false;
        const limitedData = requestData as any;
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
          const modalElement = document.getElementById("info_popup_request_detail");
          if (modalElement) {
            modalElement.addEventListener("hidden.bs.modal", () => {
              router.push({ name: "requests" });
            }, { once: true });
          }
        }, 100);
        return;
      }
      
      formData.value = requestData as Request;
      requestAccessLevel.value = (formData.value as any).AccessLevel || 1;
      selectedPropertyTypes.value = formData.value.PropertyType ? formData.value.PropertyType.split(',') : [];
      selectedCities.value = formData.value.City.split(",");
      inserModel.value = await getToInsert();
      
      // Gli immobili arrivano già filtrati e con MatchPercentage calcolato dal backend (>= 50%)
      // Non serve più calcolare o filtrare lato frontend
      if (formData.value.RealEstateProperties) {
        // Assicurati che matchPercentage sia disponibile (già calcolato dal backend)
        formData.value.RealEstateProperties = formData.value.RealEstateProperties.map((property: any) => ({
          ...property,
          matchPercentage: property.MatchPercentage || property.matchPercentage || 0
        }));
        initItems.value.splice(0, formData.value.RealEstateProperties.length, ...formData.value.RealEstateProperties);
      }
      
      await loadProvinces();
      
      // Se c'è già una provincia selezionata, carica le città
      if (formData.value.Province) {
        await loadCitiesByProvince(formData.value.Province);
      }

      loading.value = false;
      setTimeout(() => firtLoad.value = false, 3000);
    })


    watch(
      () => formData.value.Province,
      async (newProvince) => {
        if (!firtLoad.value) {
          if (newProvince) {
            await loadCitiesByProvince(newProvince);
            formData.value.City = null;
          } else {
            cities.value = [];
            formData.value.City = null;
          }
        } else {
          firtLoad.value = false;
        }
      }
    );

    
    watch(selectedPropertyTypes, (newVal) => {
      if (newVal.includes('Qualsiasi')) {
      selectedPropertyTypes.value = ['Qualsiasi'];
     }
    });

    async function deleteItem() {
      loading.value = true;

      // Mostra la dialog di conferma
      const result = await Swal.fire({
        title: "Elimina richiesta",
        html: "Confermi di voler eliminare questa richiesta?",
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
        await deleteRequest(id);
        await Swal.fire({
          text: "Richiesta eliminata con successo.",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          heightAuto: false,
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
        router.push({ name: "requests" });
      } catch (error: any) {
        const errorMessage = error?.data?.Message || error?.response?.data?.Message || store.errors || "Si è verificato un errore durante l'eliminazione della richiesta.";
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
      } finally {
        loading.value = false;
      }
    }

    const submit = async () => {
      const payload: Request = {
        ...formData.value,
        City: selectedCities.value.join(","),
        PropertyType: selectedPropertyTypes.value.join(","),
        PriceFrom: formData.value.PriceFrom ?? 0,
        PriceTo: formData.value.PriceTo ?? 0,
        GardenFrom: formData.value.GardenFrom ?? 0,
        GardenTo: formData.value.GardenTo ?? 0,
        MQFrom: formData.value.MQFrom ?? 0,
        MQTo: formData.value.MQTo ?? 0,
        RoomsFrom: formData.value.RoomsFrom ?? 0,
        RoomsTo: formData.value.RoomsTo ?? 0,
        Bathrooms: formData.value.Bathrooms ?? 0,
        ParkingSpaces: formData.value.ParkingSpaces ?? 0,
      };

      // Mantieni i valori normalizzati anche nel modello locale
      formData.value.PriceFrom = payload.PriceFrom;
      formData.value.PriceTo = payload.PriceTo;
      formData.value.GardenFrom = payload.GardenFrom;
      formData.value.GardenTo = payload.GardenTo;
      formData.value.MQFrom = payload.MQFrom;
      formData.value.MQTo = payload.MQTo;
      formData.value.RoomsFrom = payload.RoomsFrom;
      formData.value.RoomsTo = payload.RoomsTo;
      formData.value.Bathrooms = payload.Bathrooms;
      formData.value.ParkingSpaces = payload.ParkingSpaces;
      formData.value.PropertyType = payload.PropertyType;
      formData.value.City = payload.City;

      loading.value = true;

      await updateRequest(payload)
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
            // router.push({ name: 'requests' })
          });
        })
        .catch(({ response }) => {
          console.log(response);
          loading.value = false;
          Swal.fire({
            text: "Attenzione, si Ã¨ verificato un errore.",
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

    const search = ref<string>("");
    const searchItems = () => {
      // Gli immobili sono già filtrati dal backend (>= 50%), non serve ricalcolare
      // Usa il MatchPercentage che arriva dal backend
      const allProperties = initItems.value.map((property: any) => ({
        ...property,
        matchPercentage: property.MatchPercentage || property.matchPercentage || 0
      }));

      formData.value.RealEstateProperties.splice(0, formData.value.RealEstateProperties.length, ...allProperties);
      
      if (search.value !== "") {
        let results: Array<RealEstateProperty> = [];
        for (let j = 0; j < formData.value.RealEstateProperties.length; j++) {
          if (searchingFunc(formData.value.RealEstateProperties[j], search.value)) {
            results.push(formData.value.RealEstateProperties[j]);
          }
        }
        formData.value.RealEstateProperties.splice(0, formData.value.RealEstateProperties.length, ...results);
      }
      MenuComponent.reinitialization();
    };

    const searchingFunc = (obj: any, value: string): boolean => {
      for (let key in obj) {
        if (
            !Number.isInteger(obj[key]) && 
            !(typeof obj[key] === "object") && 
            (typeof obj[key] === "string" || Array.isArray(obj[key]))
        ) {
            if (obj[key].indexOf(value) !== -1) {
                return true;
            }
        }
      }
      return false;
    };

    const sort = (sort: Sort) => {
      const reverse: boolean = sort.order === "asc";
      if (sort.label) {
        arraySort(formData.value.RealEstateProperties, sort.label, { reverse });
      }
    };

    const onItemSelect = (selectedItems: Array<number>) => {
      selectedIds.value = selectedItems;
    };

    const canModify = computed(() => canModifyHelper(requestAccessLevel.value));
    
    return {
      formData,
      submit,
      loading,
      canModify,
      infoPopupRef,
      selectedOwnerInfo,
      requestAccessLevel,
      AccessLevel,
      getAssetPath,
      deleteItem,
      user,
      inserModel,
      provinces,
      cities,
      sort,
      tableHeader,
      onItemSelect,
      searchItems,
      search,
      selectedCities,
      selectedPropertyTypes,
      getMatchPercentageClass
    };
  },
});
</script>


<!-- Tutti gli stili sono stati spostati in file CSS dedicati -->
