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
              <i class="ki-duotone ki-document fs-2 text-white">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
            </span>
          </div>
          <div>
            <h3 class="fw-bold m-0 text-gray-900 fs-3">📋 Aggiorna Richiesta</h3>
            <span class="text-muted fs-7 fw-semibold">Modifica i dati della richiesta</span>
          </div>
        </div>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->
  </div>
  <KTSpinner v-if="loading" :centered="true" size="md" />
  <!--begin::Content-->
  <div v-else>
    <!--begin::Form-->
    <form @submit.prevent="submit()">
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
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-bold fs-6 text-gray-800">
            <i class="ki-duotone ki-document fs-5 me-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            Contratto
          </label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <select class="form-select modern-select" v-model="formData.Contract" required>
              <option value="Vendita">💰 Vendita</option>
              <option value="Affitto">🏠 Affitto</option>
            </select>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-bold fs-6 text-gray-800">
            <i class="ki-duotone ki-home-2 fs-5 me-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            Tipologia Immobiliare:
          </label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
             <select class="form-select modern-select" multiple v-model="selectedPropertyTypes" required style="height: auto;">
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
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-bold fs-6 text-gray-800">
            <i class="ki-duotone ki-map fs-5 me-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            Provincia
          </label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <select class="form-select modern-select" v-model="formData.Province" required>
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
          <label class="col-lg-4 col-form-label required fw-bold fs-6 text-gray-800">
            <i class="ki-duotone ki-geolocation fs-5 me-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            Comune
          </label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
              <select class="form-select modern-select" multiple v-model="selectedCities" required>
                <option v-for="(city, index) in cities" :key="index" :value="city.Id">🏙️ {{ city.Name }}</option>
              </select>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

         <!--begin::Input group-->
         <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-bold fs-6 text-gray-800">
            <i class="ki-duotone ki-position fs-5 me-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            LocalitÃ 
          </label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
              <input class="form-control modern-input" v-model="formData.Location" type="text" placeholder="Inserisci la località (opzionale)" />
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-bold fs-6 text-gray-800">
            <i class="ki-duotone ki-dollar fs-5 me-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            Canone - Prezzo: Da
          </label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <input class="form-control modern-input" v-model="formData.PriceFrom" type="number" placeholder="Inserisci il prezzo minimo" />
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-bold fs-6 text-gray-800">
            <i class="ki-duotone ki-dollar fs-5 me-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            Canone - Prezzo: A
          </label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <input class="form-control modern-input" v-model="formData.PriceTo" type="number" placeholder="Inserisci il prezzo massimo" />
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Archiviata</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" v-model="formData.Archived" />
            </div>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Evasa</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" v-model="formData.Closed" />
            </div>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-semobold fs-6">Consulenza mutuo richiesta</label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input class="form-check-input" type="checkbox" v-model="formData.MortgageAdviceRequired" />
            </div>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-bold fs-6 text-gray-800">
            <i class="ki-duotone ki-home-2 fs-5 me-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            Numero Locali
          </label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <input class="form-control modern-input" v-model="formData.RoomsNumber" type="text" placeholder="Es: 3+1, 4+2, etc." />
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

         <!--begin::Input group-->
         <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-bold fs-6 text-gray-800">
            <i class="ki-duotone ki-garden fs-5 me-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            Giardino Da (mq)
          </label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <input class="form-control modern-input" v-model="formData.GardenFrom" type="number" placeholder="Metri quadrati minimi" />
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-bold fs-6 text-gray-800">
            <i class="ki-duotone ki-garden fs-5 me-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            Giardino A (mq)
          </label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <input class="form-control modern-input" v-model="formData.GardenTo" type="number" placeholder="Metri quadrati massimi" />
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-bold fs-6 text-gray-800">
            <i class="ki-duotone ki-home-2 fs-5 me-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            MQ Da
          </label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <input class="form-control modern-input" v-model="formData.MQFrom" type="number" placeholder="Metri quadrati minimi" />
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-bold fs-6 text-gray-800">
            <i class="ki-duotone ki-home-2 fs-5 me-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            MQ A
          </label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <input class="form-control modern-input" v-model="formData.MQTo" type="number" placeholder="Metri quadrati massimi" />
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-bold fs-6 text-gray-800">
            <i class="ki-duotone ki-home-2 fs-5 me-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            Stato dell'immobile
          </label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <select class="form-select modern-select" v-model="formData.PropertyState">
              <option value="">🏠 Seleziona Stato Immobile</option>
              <option value="0">🔒 Affittato</option>
              <option value="1">🏗️ In corso di costruzione</option>
              <option value="2">✅ Libero</option>
              <option value="3">📋 Libero al Rogito</option>
              <option value="4">🏛️ Nuda Proprietà</option>
              <option value="5">👥 Occupato</option>
            </select>
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-bold fs-6 text-gray-800">
            <i class="ki-duotone ki-fire fs-5 me-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            Riscaldamento
          </label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <select class="form-select modern-select" v-model="formData.Heating">
              <option value="">🔥 Seleziona Il Tipo Di Riscaldamento</option>
              <option value="Autonomo">🏠 Autonomo</option>
              <option value="Centralizzato">🏢 Centralizzato</option>
              <option value="Inesistente">❌ Inesistente</option>
            </select>
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-bold fs-6 text-gray-800">
            <i class="ki-duotone ki-car fs-5 me-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            Posto Auto
          </label>
          <!--end::Label-->
          <!--begin::Input-->
          <div class="col-lg-8 fv-row">
            <select class="form-select modern-select" v-model="formData.ParkingSpaces">
              <option value="">🚗 Seleziona Posto Auto</option>
              <option value="Assegnato">🎯 Assegnato</option>
              <option value="Box Auto">🏠 Box Auto</option>
              <option value="Condominiale">🏢 Condominiale</option>
              <option value="Posto auto coperto">🏠 Posto auto coperto</option>
              <option value="Posto auto scoperto">☀️ Posto auto scoperto</option>
            </select>
          </div>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-bold fs-6 text-gray-800">
            <i class="ki-duotone ki-notepad fs-5 me-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
              <span class="path3"></span>
              <span class="path4"></span>
              <span class="path5"></span>
            </i>
            Nota principale
          </label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <textarea class="form-control modern-textarea" v-model="formData.Notes" rows="3" placeholder="Inserisci eventuali note..."></textarea>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label fw-bold fs-6 text-gray-800">
            <i class="ki-duotone ki-notepad fs-5 me-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
              <span class="path3"></span>
              <span class="path4"></span>
              <span class="path5"></span>
            </i>
            Riepilogo Note
          </label>
          <!--end::Label-->
          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <div v-for="(note, index) in formData.RequestNotes" :key="index" class="modern-note mb-3">
              <div class="note-content" v-html="note.Text"></div>
            </div>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

      </div>
      <!--begin::Actions-->
      <div class="card-footer d-flex justify-content-end py-6 px-9" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-top: 1px solid #dee2e6;">
        <button type="button" @click="deleteItem()" class="btn btn-modal-danger me-3">
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
        <!--end::Button-->
      </div>
      <!--end::Actions-->
    </form>
    <!--end::Form-->
  </div>
  <!--end::Content-->
  <div v-if="!loading" class="card mb-5 mb-xl-10" style="border-radius: 0.95rem; border: 1px solid #e9ecef; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);">
      <!--begin::Card header-->
      <div class="card-header border-0 pt-6 pb-4" style="background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%); border-radius: 0.95rem 0.95rem 0 0; border-bottom: 1px solid #e9ecef;">
        <!--begin::Card title-->
        <div class="card-title m-0">
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
              <h3 class="fw-bold m-0 text-gray-900 fs-3">🏠 Immobili Richiesta</h3>
              <span class="text-muted fs-7 fw-semibold">Elenco degli immobili associati</span>
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
      <div class="card-body pt-0">
          <Datatable @on-sort="sort" @on-items-select="onItemSelect" :data="formData.RealEstateProperties"
            :header="tableHeader" :enable-items-per-page-dropdown="true" :checkbox-enabled="false" checkbox-label="Id">
            <template v-slot:Id="{ row: item }">
              {{ item.Id }}
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
                  <span class="btn-label">Dettagli</span>
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
import Multiselect from '@vueform/multiselect'

export default defineComponent({
  name: "update-request",
  components: { Datatable, Multiselect, KTSpinner },
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
      RoomsNumber: "",
      MQGarden: 0,
      GardenTo:0,
      GardenFrom:0,
      MQFrom: 0,
      MQTo: 0,
      PropertyState: "",
      Heating: "",
      ParkingSpaces: 0,
      Notes: "",
      Location:"",
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
        columnWidth: 175,
      },
      {
        columnName: "Ins. / Inc.",
        columnLabel: "CreationDate",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Mq",
        columnLabel: "CommercialSurfaceate",
        sortEnabled: true,
        columnWidth: 175,
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
        columnWidth: 175,
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

    onMounted(async () => {
      loading.value = true;
      firtLoad.value = true;
      formData.value = await getRequest(id);
      selectedPropertyTypes.value = formData.value.PropertyType ? formData.value.PropertyType.split(',') : [];
      selectedCities.value = formData.value.City.split(",");
      // Location è già una stringa, non serve split
      inserModel.value = await getToInsert();
      initItems.value.splice(0, formData.value.RealEstateProperties.length, ...formData.value.RealEstateProperties);
      // if (inserModel.value.Customers.length > 0) {
      //   formData.value.CustomerId = inserModel.value.Customers[0].Id;
      // }
      // Carica le province
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
            formData.value.Location = null;
          } else {
            cities.value = [];
            formData.value.City = null;
            formData.value.Location = "";
          }
        } else {
          firtLoad.value = false;
        }
      }
    );

    watch(
      () => selectedCities.value,
      (newTown) => {
        if (!firtLoad.value) {
          // Le località sono stringhe libere, non serve caricare nulla
          if (!newTown || (Array.isArray(newTown) && newTown.length === 0)) {
            formData.value.Location = "";
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
      const result = await Swal.fire({
        text: "Confermi di voler eliminare questa richiesta?",
        icon: "warning",
        showCancelButton: true,
        focusCancel: true,
        buttonsStyling: false,
        confirmButtonText: "Sì, elimina",
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
      } catch (error) {
        Swal.fire({
          text: "Si è verificato un errore durante l'eliminazione.",
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
      loading.value = true;
      formData.value.City = selectedCities.value.toString();
      // Location è già una stringa, non serve convertire
      formData.value.PropertyType = selectedPropertyTypes.value.toString();

      await updateRequest(formData.value)
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
      formData.value.RealEstateProperties.splice(0, formData.value.RealEstateProperties.length, ...initItems.value);
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
      selectedPropertyTypes
    };
  },
});
</script>


<!-- Tutti gli stili sono stati spostati in file CSS dedicati -->
