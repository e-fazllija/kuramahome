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
      <div class="card-body card-palette border rounded p-3 p-md-6 p-xl-9">

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
                <select class="form-select form-select-lg" v-model="formData.Contract" required>
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
              <select class="form-select form-select-lg" multiple v-model="selectedPropertyTypes" required style="height: auto;">
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
                <select class="form-select form-select-lg" v-model="formData.Province" required>
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
                <select class="form-select form-select-lg" multiple v-model="selectedCities" required>
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
                <input class="form-control form-control-lg" v-model.number="formData.PriceFrom" type="number" placeholder="Inserisci il prezzo minimo" />
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">
                  <i class="ki-duotone ki-dollar fs-5 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Canone - Prezzo: A
                </label>
                <input class="form-control form-control-lg" v-model.number="formData.PriceTo" type="number" placeholder="Inserisci il prezzo massimo" />
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
                <input class="form-control form-control-lg" v-model.number="formData.RoomsFrom" type="number" placeholder="Numero minimo di locali" min="0" />
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">
                  <i class="ki-duotone ki-home-2 fs-5 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Locali A
                </label>
                <input class="form-control form-control-lg" v-model.number="formData.RoomsTo" type="number" placeholder="Numero massimo di locali" min="0" />
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
                <input class="form-control form-control-lg" v-model.number="formData.Bathrooms" type="number" placeholder="Numero di bagni" min="0" />
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">
                  <i class="ki-duotone ki-home-2 fs-5 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Piano
                </label>
                <select class="form-select form-select-lg" v-model="formData.Floor">
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
                <input class="form-control form-control-lg" v-model.number="formData.MQFrom" type="number" placeholder="Metri quadrati minimi" />
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">
                  <i class="ki-duotone ki-home-2 fs-5 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  MQ A
                </label>
                <input class="form-control form-control-lg" v-model.number="formData.MQTo" type="number" placeholder="Metri quadrati massimi" />
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
                <input class="form-control form-control-lg" v-model.number="formData.GardenFrom" type="number" placeholder="Metri quadrati minimi" />
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label d-flex align-items-center gap-2 fw-semibold mb-2">
                  <i class="ki-duotone ki-garden fs-5 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Giardino A (mq)
                </label>
                <input class="form-control form-control-lg" v-model.number="formData.GardenTo" type="number" placeholder="Metri quadrati massimi" />
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
                <select class="form-select form-select-lg" v-model="formData.PropertyState">
                  <option value="">🏠 Seleziona Stato Immobile</option>
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
                <select class="form-select form-select-lg" v-model="formData.Heating">
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
                <select class="form-select form-select-lg" v-model="formData.Furniture">
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
                <select class="form-select form-select-lg" v-model="formData.EnergyClass">
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
                <input class="form-control form-control-lg" v-model.number="formData.ParkingSpaces" type="number" placeholder="Inserisci il numero di posti auto" min="0" />
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
              <textarea class="form-control form-control-lg" v-model="formData.Notes" rows="3" placeholder="Inserisci eventuali note..."></textarea>
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
          <button type="button" @click="deleteItem()" class="btn btn-danger me-2">
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
          <button :data-kt-indicator="loading ? 'on' : null" class="btn btn-primary" type="submit" :disabled="loading">
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
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, watch } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Request, InsertModel, getToInsert, getRequest, updateRequest, deleteRequest } from "@/core/data/requests";
import { useRoute, useRouter } from "vue-router";
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
  components: { Datatable, KTSpinner },
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

    // Funzione per calcolare la percentuale di match tra richiesta e immobile
    // NOTA: Questa funzione non è più utilizzata - il calcolo viene fatto dal backend
    // Mantenuta per riferimento o per calcoli aggiuntivi se necessario
    const calculateMatchPercentage = (request: Request, property: RealEstateProperty): number => {
      let totalCriteria = 0;
      let matchedCriteria = 0;

      // 1. Contract (Status) - OBBLIGATORIO
      totalCriteria++;
      if (property.Status && request.Contract && property.Status === request.Contract) {
        matchedCriteria++;
      }

      // 2. PropertyType (Typology) - se presente nella richiesta
      if (request.PropertyType && request.PropertyType.trim() !== '') {
        totalCriteria++;
        const requestTypes = request.PropertyType.split(',').map(t => t.trim().toLowerCase());
        if (property.Typology) {
          const propertyTypeLower = property.Typology.toLowerCase();
          if (requestTypes.some(type => propertyTypeLower.includes(type))) {
            matchedCriteria++;
          }
        }
      }

      // 3. Province (State) - se presente nella richiesta
      if (request.Province && request.Province.trim() !== '') {
        totalCriteria++;
        if (property.State && property.State.toLowerCase() === request.Province.toLowerCase()) {
          matchedCriteria++;
        }
      }

      // 4. City - se presente nella richiesta
      if (request.City && request.City.trim() !== '') {
        totalCriteria++;
        const requestCities = request.City.split(',').map(c => c.trim().toLowerCase());
        if (property.City) {
          const propertyCityLower = property.City.toLowerCase();
          if (requestCities.some(city => propertyCityLower.includes(city))) {
            matchedCriteria++;
          }
        }
      }

      // 5. Price Range - se presente nella richiesta
      if (request.PriceFrom > 0 || request.PriceTo > 0) {
        totalCriteria++;
        if (request.PriceFrom > 0 && request.PriceTo > 0) {
          if (property.Price >= request.PriceFrom && property.Price <= request.PriceTo) {
            matchedCriteria++;
          }
        } else if (request.PriceFrom > 0) {
          if (property.Price >= request.PriceFrom) {
            matchedCriteria++;
          }
        } else if (request.PriceTo > 0) {
          if (property.Price <= request.PriceTo) {
            matchedCriteria++;
          }
        }
      }

      // 6. MQ Range - se presente nella richiesta
      if (request.MQFrom > 0 || request.MQTo > 0) {
        totalCriteria++;
        if (request.MQFrom > 0 && request.MQTo > 0) {
          if (property.CommercialSurfaceate > request.MQFrom && property.CommercialSurfaceate < request.MQTo) {
            matchedCriteria++;
          }
        } else if (request.MQFrom > 0) {
          if (property.CommercialSurfaceate > request.MQFrom) {
            matchedCriteria++;
          }
        } else if (request.MQTo > 0) {
          if (property.CommercialSurfaceate < request.MQTo) {
            matchedCriteria++;
          }
        }
      }

      // 7. Garden Range - se presente nella richiesta
      if (request.GardenFrom > 0 || request.GardenTo > 0) {
        totalCriteria++;
        if (request.GardenFrom > 0 && request.GardenTo > 0) {
          if (property.MQGarden >= request.GardenFrom && property.MQGarden <= request.GardenTo) {
            matchedCriteria++;
          }
        } else if (request.GardenFrom > 0) {
          if (property.MQGarden >= request.GardenFrom) {
            matchedCriteria++;
          }
        } else if (request.GardenTo > 0) {
          if (property.MQGarden <= request.GardenTo) {
            matchedCriteria++;
          }
        }
      }

      // 8. PropertyState - se presente in entrambi
      if (request.PropertyState && request.PropertyState.trim() !== '' && 
          property.StateOfTheProperty && property.StateOfTheProperty.trim() !== '') {
        totalCriteria++;
        if (property.StateOfTheProperty === request.PropertyState) {
          matchedCriteria++;
        }
      }

      // 9. Heating - se presente in entrambi
      if (request.Heating && request.Heating.trim() !== '' && 
          property.Heating && property.Heating.trim() !== '') {
        totalCriteria++;
        if (property.Heating.toLowerCase() === request.Heating.toLowerCase()) {
          matchedCriteria++;
        }
      }

      // 10. ParkingSpaces - se presente nella richiesta
      if (request.ParkingSpaces > 0) {
        totalCriteria++;
        if (property.ParkingSpaces >= request.ParkingSpaces) {
          matchedCriteria++;
        }
      }

      // 11. Rooms Range - se presente nella richiesta
      if (request.RoomsFrom > 0 || request.RoomsTo > 0) {
        totalCriteria++;
        if (request.RoomsFrom > 0 && request.RoomsTo > 0) {
          if (property.Bedrooms >= request.RoomsFrom && property.Bedrooms <= request.RoomsTo) {
            matchedCriteria++;
          }
        } else if (request.RoomsFrom > 0) {
          if (property.Bedrooms >= request.RoomsFrom) {
            matchedCriteria++;
          }
        } else if (request.RoomsTo > 0) {
          if (property.Bedrooms <= request.RoomsTo) {
            matchedCriteria++;
          }
        }
      }

      // 12. Bathrooms - se presente nella richiesta
      if (request.Bathrooms > 0) {
        totalCriteria++;
        if (property.Bathrooms >= request.Bathrooms) {
          matchedCriteria++;
        }
      }

      // 13. Floor - se presente in entrambi
      if (request.Floor && request.Floor.trim() !== '' && 
          property.Floor && property.Floor.trim() !== '') {
        totalCriteria++;
        if (property.Floor.toLowerCase() === request.Floor.toLowerCase()) {
          matchedCriteria++;
        }
      }

      // 14. Furniture - se presente in entrambi
      if (request.Furniture && request.Furniture.trim() !== '' && 
          property.Furniture && property.Furniture.trim() !== '') {
        totalCriteria++;
        if (property.Furniture.toLowerCase() === request.Furniture.toLowerCase()) {
          matchedCriteria++;
        }
      }

      // 15. EnergyClass - se presente in entrambi
      if (request.EnergyClass && request.EnergyClass.trim() !== '' && 
          property.EnergyClass && property.EnergyClass.trim() !== '') {
        totalCriteria++;
        if (property.EnergyClass === request.EnergyClass) {
          matchedCriteria++;
        }
      }

      // 16. Auction - se presente nella richiesta
      if (request.Auction !== undefined) {
        totalCriteria++;
        if (property.Auction === request.Auction) {
          matchedCriteria++;
        }
      }

      // Calcola la percentuale
      if (totalCriteria === 0) return 0;
      return Math.round((matchedCriteria / totalCriteria) * 100);
    };

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
      formData.value = await getRequest(id);
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

    return {
      formData,
      submit,
      loading,
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
