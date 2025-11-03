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
  <div v-if="loading" class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
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
      <div class="card-body border-top p-9">
        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-bold fs-6 text-gray-800">
            <i class="ki-duotone ki-profile-user fs-5 me-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
              <span class="path3"></span>
              <span class="path4"></span>
            </i>
            Cliente
          </label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <!--begin::Input group-->
            <Multiselect v-model="formData.CustomerId" :options="inserModel.Customers" label="label" valueProp="Id"
              :searchable="true" :close-on-select="true" :clear-on-select="false" placeholder="Seleziona il cliente" class="multiselect-modern" />
            <!--end::Input group-->
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-bold fs-6 text-gray-800">
            <i class="ki-duotone ki-user fs-5 me-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            Agente
          </label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <!--begin::Input group-->
            <div class="d-flex flex-column fv-row">
              <!--begin::Input-->
              <select class="form-select modern-select" v-model="formData.AgentId" required>
                <option v-for="(user, index) in inserModel.Users" :key="index" :value="user.Id">{{ user.FirstName }} {{ user.LastName }}</option>
              </select>
              <!--end::Input-->
            </div>
            <!--end::Input group-->
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-bold fs-6 text-gray-800">
            <i class="ki-duotone ki-text fs-5 me-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            Titolo
          </label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <input class="form-control modern-input" v-model="formData.Title" type="text" placeholder="Inserisci il titolo dell'immobile" required />
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-semobold fs-6">Categoria</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <select as="select" name="Category" class="form-select modern-select"
              v-model="formData.Category" required>
              <option value>Seleziona una Categoria...</option>
              <option value="Residenziale">Residenziale</option>
              <option value="Capannone">Capannone</option>
              <option value="Negozi-Locale Commerciale">Negozi/Locale Commerciale</option>
              <option value="Magazzino">Magazzino</option>
              <option value="Garage">Garage</option>
              <option value="Ufficio">Ufficio</option>
              <option value="Terreno">Terreno</option>
              <option value="Rustico / Casale">Rustico / Casale</option>
            </select>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->
        <!--begin::Input group Tipologia-->
        <div v-if="showTipologia" class="d-flex flex-column mb-7 fv-row">
          <label class="fs-6 fw-semobold mb-2">
            <span class="required">Tipologia</span>
            <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip"
              title="Seleziona una tipologia di immobile"></i>
          </label>
          <select class="form-select modern-select" v-model="formData.Typology">
            <option v-for="tipologia in typesavailable" :key="tipologia" :value="tipologia">
              {{ tipologia }}
            </option>
          </select>
        </div>
        <!--end::Input group Tipologia-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-semobold fs-6">Stato vendita o affitto</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <select as="select" name="Status" class="form-select modern-select" v-model="formData.Status"
              required>
              <option value="">Scegli tra vendita e affitto</option>
              <option value="Vendita">Vendita</option>
              <option value="Affitto">Affitto</option>
            </select>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-semobold fs-6">Indirizzo</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <input class="form-control modern-input" v-model="formData.AddressLine" type="text"
              required />
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

                <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-semobold fs-6">Provincia</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <select class="form-select modern-select" v-model="formData.State" required>
              <option value="">🗺️ Seleziona provincia</option>
              <option v-for="(province, index) in provinces" :key="index" :value="province.Id">{{ province.Name }}</option>
            </select>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6 required">Comune</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
<<<<<<< HEAD
            <select class="form-select modern-select" v-model="formData.Town" required>
              <option value="">🏙️ Seleziona città</option>
              <option v-for="(city, index) in cities" :key="index" :value="city.Name">{{ city.Name }}</option>
            </select>
=======
            <div class="form-check form-switch form-check-custom form-check-solid">
              <select class="form-select" v-model="formData.City" required>
                <option value="">Seleziona città</option>
                <option v-for="(city, index) in cities" :key="index" :value="city.Name">{{ city.Name }}</option>
              </select>
            </div>
>>>>>>> a9e67ec23b20e63679af0b271aad2e5e9925cba6
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

         <!--begin::Input group-->
         <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Località</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <input class="form-control modern-input" v-model="formData.Location" type="text" placeholder="Inserisci la località" />
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-semobold fs-6">Codice Postale</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control modern-input" v-model="formData.PostCode" type="text" required />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-semobold fs-6">Superficie commerciale (mÂ²)</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control modern-input" v-model="formData.CommercialSurfaceate"
              type="number" required />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Piano</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <select as="select" name="Floor" class="form-select modern-select" v-model="formData.Floor">
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
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-semobold fs-6">Totale piani edificio</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control modern-input" v-model="formData.TotalBuildingfloors" type="number"
              required />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Giardino Mq</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control modern-input" v-model="formData.MQGarden" type="number" />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Ascensori</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control modern-input" v-model="formData.Elevators" type="number" />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Altri dettagli</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control modern-input" v-model="formData.MoreDetails" type="text" />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Camere da letto</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control modern-input" v-model="formData.Bedrooms" type="number" />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Locali</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control modern-input" v-model="formData.WarehouseRooms" type="number" />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Cucine</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control modern-input" v-model="formData.Kitchens" type="number" />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Bagni</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control modern-input" v-model="formData.Bathrooms" type="number" />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Arredamento</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <select as="select" name="Furniture" class="form-select modern-select"
              v-model="formData.Furniture">
              <option value="">Seleziona il tipo di arredamento</option>
              <option value="Arredato">Arredato</option>
              <option value="Non Arredato">Non Arredato</option>
              <option value="Parzialmente Arredato">Parzialmente Arredato</option>
              <option value="Arredato Solo Cucina">Arredato Solo Cucina</option>
            </select>
            <!--end::Input-->
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Altre Caratteristiche</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control modern-input" v-model="formData.MoreDetails" type="text" />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Posti Auto</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control modern-input" v-model="formData.ParkingSpaces" type="number" />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Riscaldamento</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <select as="select" name="Heating" class="form-select modern-select"
              v-model="formData.Heating">
              <option value="Nessuno">Nessuno</option>
              <option value="Autonomo">Autonomo</option>
              <option value="Centralizzato">Centralizzato</option>
            </select>
            <!--end::Input-->
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Esposizione</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <select as="select" name="Exposure" class="form-select modern-select"
              v-model="formData.Exposure">
              <option value="">Selezionare l'esposizione</option>
              <option value="Nord">Nord</option>
              <option value="Sud">Sud</option>
              <option value="Est">Est</option>
              <option value="Ovest">Ovest</option>
            </select>
            <!--end::Input-->
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Classe energetica</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <select as="select" name="EnergyClass" class="form-select modern-select"
              v-model="formData.EnergyClass">
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
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Indica il tipo di proprietà</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <input class="form-control modern-input" v-model="formData.TypeOfProperty" type="text" />
            <!-- <select as="select" name="TypeOfProperty" class="form-select modern-select"
              v-model="formData.TypeOfProperty">
              <option value="">Seleziona il tipo di proprietà</option>
              <option value="Intera Proprietà">Intera Proprietà</option>
              <option value="Nuda Proprietà">Nuda Proprietà</option>
              <option value="Parziale Proprietà">Parziale Proprietà</option>
              <option value="Usufrutto">Usufrutto</option>
              <option value="Multiproprietà">Multiproprietà</option>
              <option value="Diritto di Superficie">Diritto di Superficie</option>
            </select> -->
            <!--end::Input-->
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Stato dell'immobile</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <select as="select" name="StateOfTheProperty" class="form-select modern-select"
              v-model="formData.StateOfTheProperty">
              <option value="">Seleziona lo Stato dell'immobile</option>
              <option value="Nuovo / In Costruzione">Nuovo / In Costruzione</option>
              <option value="Ottimo / Ristrutturato">Ottimo / Ristrutturato</option>
              <option value="Buono / Abitabile">Buono / Abitabile</option>
              <option value="Da Ristrutturare">Da Ristrutturare</option>
            </select>
            <!--end::Input-->
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Anno di costruzione</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control modern-input" v-model="formData.YearOfConstruction"
              type="number" />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Trattativa riservata</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" value="" v-model="isTrattativaRiservata" />
            </div>
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div v-if="!isTrattativaRiservata" class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-semobold fs-6">Prezzo</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control modern-input" v-model="formData.Price" type="number" required />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-semobold fs-6">Prezzo Ribassato</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control modern-input" v-model="formData.PriceReduced" type="number"
              required />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Spese condominiali</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control modern-input" v-model="formData.CondominiumExpenses"
              type="number" />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Disponibilità</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <select as="select" name="Availability" class="form-select modern-select"
              v-model="formData.Availability">
              <option value="">Seleziona la Disponibilità</option>
              <option value="Libero">Libero</option>
              <option value="Occupato">Occupato</option>
            </select>
            <!--end::Input-->
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-semobold fs-6">Descrizione</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <textarea class="form-control modern-input" v-model="formData.Description"
              type="text"></textarea>
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-semobold fs-6">Imposta in Home</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" value="" v-model="formData.InHome" />
            </div>

          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-semobold fs-6">Imposta in Evidenza</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" value="" v-model="formData.Highlighted" />
            </div>

          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Asta</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" value="" v-model="formData.Auction" />
            </div>

          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">In Trattativa</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" value="" v-model="formData.Negotiation" />
            </div>

          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Venduto</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" value="" v-model="formData.Sold" />
            </div>

          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Archiviato</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" value="" v-model="formData.Archived" />
            </div>

          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Data fine incarico</label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <input class="form-control modern-input" v-model="formData.AssignmentEnd" type="date"
              placeholder="yyyy-MM-dd" required />
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="d-flex flex-column mb-7 fv-row">
          <!--begin::Label-->
          <label class="fs-6 fw-semobold mb-2">
            <span class="required">Tipologia Incarico</span>
            <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip"></i>
          </label>
          <!--end::Label-->
          <!--begin::Input-->
          <select class="form-select modern-select" v-model="formData.TypeOfAssignment">
            <option value="Verbale">Verbale</option>
            <option value="Esclusivo">Esclusivo</option>
            <option value="Semi-Verbale">Semi-Verbale</option>
            <option value="Immobile MLS">Immobile MLS</option>
          </select>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

         <!--begin::Col-->
        <div class="col-md-4 fv-row">
          <!--begin::Label-->
          <label class="fs-6 fw-semobold mb-2">Provvigione Concordata</label>
          <!--end::Label-->
          <!--begin::Input-->
          <el-form-item prop="AgreedCommission">
            <el-input v-model="formData.AgreedCommission" type="number" placeholder="Inserisci percentuale">
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
          <label class="fs-6 fw-semobold mb-2">Provvigione Forfettaria</label>
          <!--end::Label-->
          <!--begin::Input-->
          <el-form-item prop="FlatRateCommission">
            <el-input v-model="formData.FlatRateCommission" type="number" placeholder="Inserisci percentuale">
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
          <label class="fs-6 fw-semobold mb-2">Storno Provvigione</label>
          <!--end::Label-->
          <!--begin::Input-->
          <el-form-item prop="StornoProvvigione">
            <el-input v-model="formData.StornoProvvigione" type="number" placeholder="Inserisci percentuale">
              <template #append>
                <span>%</span>
              </template>
            </el-input>
          </el-form-item>
          <!--end::Input-->
        </div>
        <!--end::Col-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Url Video</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <input class="form-control modern-input" v-model="formData.VideoUrl" type="text" />
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Riepilogo Note</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div v-for="(note, index) in formData.RealEstatePropertyNotes" :key="index" class="col-lg-8 fv-row">
            <div class="border border-secondary" v-html="note.Text"></div>
            <hr>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

      </div>
      <div v-if="user.Id === formData.AgentId || user.Role === 'Admin' || formData.Agent.AgencyId === user.Id"
        class="card-footer d-flex justify-content-between py-6 px-9" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-top: 1px solid #dee2e6;">
        <div>
          <AddNewForm />
          <button type="button" class="btn btn-info btn-active-light-primary me-2" data-bs-toggle="modal"
            data-bs-target="#kt_modal_scheda">
            <KTIcon icon-name="file" icon-class="fs-2 me-1" />
            Scheda
          </button>
          <AddNewPreventive />
          <button type="button" class="btn btn-info btn-active-light-primary" data-bs-toggle="modal"
            data-bs-target="#kt_modal_preventivo">
            <KTIcon icon-name="calculator" icon-class="fs-2 me-1" />
            Preventivo
          </button>
        </div>
        <div>
          <button v-if="user.Role === 'Admin' || (user.Role === 'Agency' && user.Id === formData.Agent.AgencyId )" type="button" @click="deleteItem()"
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
              <span class="spinner-border spinner-border-sm me-2"></span>
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
                    <img :src="element.Url" :alt="`Immagine ${index + 1}`" />
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
import AddNewForm from "@/components/modals/forms/AddNewForm.vue";
import AddNewPreventive from "@/components/modals/forms/AddNewPreventive.vue";
import { getAssetPath } from "@/core/helpers/assets";
import { getProvincesForSelect, getCitiesByProvinceName } from "@/core/data/locations";
import { defineComponent, onMounted, ref, watch, nextTick } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { getCAPByCity } from "@/core/data/italian-geographic-data-loader";
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
import Multiselect from '@vueform/multiselect'

export default defineComponent({
  name: "update",
  components: { draggable, Multiselect, AddNewForm, AddNewPreventive },
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

    // Funzioni per caricare i dati dal database
    const loadProvinces = async () => {
      try {
        const provincesData = await getProvincesForSelect();
        provinces.value = provincesData;
      } catch (error) {
        console.error("Errore nel caricamento delle province:", error);
      }
    };

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
      AgentId: "",
      AssignmentEnd: "",
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

    const rules = ref({
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
      AddressLine: [
        {
          required: true,
          message: "E' obbligatorio",
          trigger: "change",
        },
      ],
      Town: [
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
          message: "E' obbligatorio",
          trigger: "change",
        },
      ],
      CommercialSurfaceate: [
        {
          required: false,
          message: "E' obbligatorio",
          trigger: "change",
        },
      ],
      Floor: [
        {
          required: false,
          message: "E' obbligatorio",
          trigger: "change",
        },
      ],
      TotalBuildingfloors: [
        {
          required: false,
          message: "E' obbligatorio",
          trigger: "change",
        },
      ],
      Price: [
        {
          required: true,
          message: "E' obbligatorio",
          trigger: "change",
        },
      ],
    });


    onMounted(async () => {
      loading.value = true;
      firtLoad.value = true;
      formData.value = await getRealEstateProperty(id)
      formData.value.AssignmentEnd = formData.value.AssignmentEnd.split('T')[0]
      inserModel.value = await getToInsert(store.user.AgencyId);
      if (inserModel.value.Users.length > 0) {
        formData.value.AgentId = formData.value.AgentId;
      }
      
      // Inizializza la checkbox "Trattativa riservata" in base al prezzo
      isTrattativaRiservata.value = formData.value.Price === -1;
      
      // Carica le province
      await loadProvinces();
      
      // Se c'è già una provincia selezionata, carica le città
      if (formData.value.State) {
        await loadCitiesByProvince(formData.value.State);
      }
      
<<<<<<< HEAD
=======
      // Se c'è già una città selezionata, carica le località
      if (formData.value.City) {
        await loadLocationsByCity(formData.value.City);
      }
      
>>>>>>> a9e67ec23b20e63679af0b271aad2e5e9925cba6
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
<<<<<<< HEAD
          formData.value.Town = "";
        } else {
          cities.value = [];
          formData.value.Town = "";
=======
          formData.value.City = "";
          formData.value.Location = "";
        } else {
          cities.value = [];
          locations.value = [];
          formData.value.City = "";
          formData.value.Location = "";
>>>>>>> a9e67ec23b20e63679af0b271aad2e5e9925cba6
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

    async function deleteItem() {
      loading.value = true;
      Swal.fire({
        text: "Confermare l'eliminazione?",
        icon: "warning",
        buttonsStyling: false,
        confirmButtonText: "Continua!",
        heightAuto: false,
        customClass: {
          confirmButton: "btn btn-danger",
        },
      }).then(async () => {
        loading.value = false;
        await deleteRealEstateProperty(id)
        router.push({ name: "properties" })
      });

    }

    const submit = () => {
      if (!formRef.value) {
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
    };
  },
});
</script>

<style scoped>
@import '@/assets/css/property-tabs.css';

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
