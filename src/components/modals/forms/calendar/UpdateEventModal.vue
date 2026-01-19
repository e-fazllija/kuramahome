<template>
  <div class="modal fade show" id="kt_modal_update_event" aria-modal="true" role="dialog" ref="updateTargetModalRef">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content card-palette modal-shell">
        <el-form class="form fv-plugins-bootstrap5 fv-plugins-framework" id="kt_modal_update_event_form"
          @submit.prevent="submit()" :model="targetData" :rules="rules" ref="formRef">
          <!--begin::Modal header-->
          <div class="modal-header card-palette-header modal-header-accent" id="kt_modal_update_event_header">
            <!--begin::Modal title-->
            <div class="d-flex align-items-center">
              <div class="symbol symbol-40px me-3">
                <span class="symbol-label symbol-label-accent">
                  <i class="ki-duotone ki-calendar-edit fs-2 text-white">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                </span>
              </div>
              <div>
                <h2 class="fw-bold m-0 text-palette-primary fs-3">✏️ Aggiorna Evento</h2>
                <span class="text-palette-secondary fs-7 fw-semibold">Modifica i dati dell'evento</span>
              </div>
            </div>
            <!--end::Modal title-->

            <!--begin::Close-->
            <div
              id="kt_modal_update_event_close"
              data-bs-dismiss="modal"
              class="btn btn-icon btn-sm btn-active-icon-primary"
            >
              <KTIcon icon-name="cross" icon-class="fs-1" />
            </div>
            <!--end::Close-->
          </div>
          <!--end::Modal header-->
          <!--begin::Modal body-->
          <div v-if="!loading" class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_update_event_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_update_event_header"
              data-kt-scroll-wrappers="#kt_modal_update_event_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-3 text-gray-800">
                  <i class="ki-duotone ki-text fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <span class="required">Nome Evento</span>
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <el-form-item prop="EventName">
                  <div class="position-relative">
                    <input 
                      class="form-control form-control-lg" 
                      v-model="targetData.EventName" 
                      type="text" 
                      name="EventName"
                      placeholder="Inserisci il nome dell'evento o seleziona un suggerimento"
                      @blur="capitalizeEventName"
                      @input="onEventNameInput"
                      @focus="showSuggestions = true"
                      @keydown.down.prevent="navigateSuggestions('down')"
                      @keydown.up.prevent="navigateSuggestions('up')"
                      @keydown.enter.prevent="selectSuggestion(selectedSuggestionIndex)"
                      @keydown.escape="showSuggestions = false"
                    />
                    <!--begin::Suggestions dropdown-->
                    <div 
                      v-if="showSuggestions && filteredEventSuggestions.length > 0"
                      class="position-absolute w-100 bg-white border border-gray-300 rounded shadow-lg mt-1"
                      style="z-index: 1000; max-height: 300px; overflow-y: auto;"
                    >
                      <ul class="list-unstyled mb-0">
                        <li
                          v-for="(suggestion, index) in filteredEventSuggestions"
                          :key="index"
                          @click="selectSuggestion(index)"
                          @mouseenter="selectedSuggestionIndex = index"
                          class="px-4 py-3 cursor-pointer border-bottom border-gray-200"
                          :class="{
                            'bg-light-primary': selectedSuggestionIndex === index,
                            'bg-light': selectedSuggestionIndex !== index
                          }"
                          style="transition: background-color 0.2s;"
                        >
                          <span class="text-gray-800 fw-semibold">{{ suggestion }}</span>
                        </li>
                      </ul>
                    </div>
                    <!--end::Suggestions dropdown-->
                  </div>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-3 text-gray-800">
                  <i class="ki-duotone ki-palette fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                    <span class="path4"></span>
                    <span class="path5"></span>
                  </i>
                  <span class="required">Colore</span>
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <el-form-item prop="Color">
                  <div class="dropdown">
                    <button 
                      class="btn btn-light btn-active-light-primary d-flex align-items-center justify-content-between w-100 p-3 border border-gray-300 rounded"
                      type="button" 
                      id="colorDropdownUpdate"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span class="d-flex align-items-center gap-3">
                        <span 
                          class="rounded border border-2 border-gray-300 shadow-sm"
                          :style="{ 
                            width: '40px', 
                            height: '40px', 
                            backgroundColor: targetData.Color || '#e0e0e0'
                          }"
                        ></span>
                        <span class="fw-semibold text-gray-800">
                          {{ targetData.Color ? 'Colore selezionato' : 'Seleziona un colore' }}
                        </span>
                      </span>
                      <i class="ki-duotone ki-down fs-3 text-gray-600">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end w-100 p-3 shadow-lg" aria-labelledby="colorDropdownUpdate" style="max-height: 400px; overflow-y: auto;">
                      <div class="row g-2">
                        <div 
                          v-for="(color, index) in colorOptions" 
                          :key="index"
                          class="col-3 col-md-2"
                        >
                          <button
                            type="button"
                            class="btn btn-outline btn-outline-dashed w-100 d-flex align-items-center justify-content-center p-2 rounded position-relative"
                            :class="targetData.Color === color.hex ? 'btn-active-light-primary border-primary shadow-sm' : 'border-gray-300'"
                            @click="selectColor(color.hex)"
                            :title="color.hex"
                          >
                            <span 
                              class="rounded border border-2 border-gray-300 shadow-sm"
                              :style="{ 
                                width: '50px', 
                                height: '50px', 
                                backgroundColor: color.hex
                              }"
                            ></span>
                            <i v-if="targetData.Color === color.hex" class="ki-duotone ki-check fs-3 text-white position-absolute" style="z-index: 10;">
                              <span class="path1"></span>
                              <span class="path2"></span>
                            </i>
                          </button>
                        </div>
                      </div>
                    </ul>
                  </div>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-3 text-gray-800">
                  <i class="ki-duotone ki-notepad fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                    <span class="path4"></span>
                    <span class="path5"></span>
                  </i>
                  Descrizione Evento
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <el-form-item prop="EventDescription">
                  <el-input 
                    v-model="targetData.EventDescription" 
                    type="text" 
                    placeholder="Descrizione dell'evento" 
                    name="EventDescription"
                    size="large"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-3 text-gray-800">
                  <i class="ki-duotone ki-geolocation fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Luogo Evento
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <el-form-item prop="EventLocation">
                  <el-input 
                    v-model="targetData.EventLocation" 
                    type="text" 
                    placeholder="Dove si terrà l'evento" 
                    name="EventLocation"
                    size="large"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-3 text-gray-800">
                  <i class="ki-duotone ki-home fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Immobile
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <select 
                  class="form-select form-select-lg" 
                  v-model="targetData.RealEstatePropertyId"
                >
                  <option :value="null">Seleziona l'immobile</option>
                  <option
                    v-for="property in inserModel.RealEstateProperties"
                    :key="property.Id"
                    :value="property.Id"
                  >
                    {{ property.label }}
                  </option>
                </select>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-3 text-gray-800">
                  <i class="ki-duotone ki-document fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Richiesta
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <select 
                  class="form-select form-select-lg" 
                  v-model="targetData.RequestId"
                >
                  <option :value="null">Seleziona la richiesta</option>
                  <option
                    v-for="request in inserModel.Requests"
                    :key="request.Id"
                    :value="request.Id"
                  >
                    {{ request.label }}
                  </option>
                </select>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-3 text-gray-800">
                  <i class="ki-duotone ki-profile-user fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                    <span class="path4"></span>
                  </i>
                  Cliente
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <select 
                  class="form-select form-select-lg" 
                  v-model="targetData.CustomerId"
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
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group - Stati-->
              <div class="fv-row mb-7">
                <label class="fs-6 fw-bold mb-3 text-gray-800">
                  <i class="ki-duotone ki-check-circle fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Stati Evento
                </label>
                
                <div class="d-flex flex-column gap-3">
                  <div class="d-flex align-items-center">
                    <div class="form-check form-switch form-check-custom form-check-solid">
                      <input class="form-check-input" type="checkbox" v-model="targetData.Confirmed" id="confirmed" />
                      <label class="form-check-label ms-2 fw-semibold text-gray-700" for="confirmed">
                        ✓ Confermato
                      </label>
                    </div>
                  </div>

                  <div class="d-flex align-items-center">
                    <div class="form-check form-switch form-check-custom form-check-solid">
                      <input class="form-check-input" type="checkbox" v-model="targetData.Cancelled" id="cancelled" />
                      <label class="form-check-label ms-2 fw-semibold text-gray-700" for="cancelled">
                        ✗ Disdetto
                      </label>
                    </div>
                  </div>

                  <div class="d-flex align-items-center">
                    <div class="form-check form-switch form-check-custom form-check-solid">
                      <input class="form-check-input" type="checkbox" v-model="targetData.Postponed" id="postponed" />
                      <label class="form-check-label ms-2 fw-semibold text-gray-700" for="postponed">
                        ⏸ Rimandato
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="row g-4 mb-7">
                <div class="col-12 col-md-6">
                  <div class="fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-bold mb-3 text-gray-800">
                      <i class="ki-duotone ki-time fs-5 me-2 text-primary">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      <span class="required">Data/Ora Inizio</span>
                    </label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <input 
                      class="form-control modern-datetime" 
                      v-model="targetData.EventStartDate" 
                      type="datetime-local" 
                    />
                    <!--end::Input-->
                  </div>
                </div>

                <div class="col-12 col-md-6">
                  <div class="fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-bold mb-3 text-gray-800">
                      <i class="ki-duotone ki-time fs-5 me-2 text-primary">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      <span class="required">Data/Ora Fine</span>
                    </label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <input 
                      class="form-control modern-datetime" 
                      v-model="targetData.EventEndDate" 
                      type="datetime-local" 
                    />
                    <!--end::Input-->
                  </div>
                </div>
              </div>
              <!--end::Input group-->

            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->
          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              type="reset"
              id="kt_modal_update_event_cancel"
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

            <!--begin::Button Elimina-->
            <button
              v-if="user.Id == targetData.UserId || user.Role == 'Admin' || user.Role == 'Agency'"
              @click="deleteItem(targetData.Id)"
              data-bs-dismiss="modal"
              type="button"
              class="btn btn-danger me-3"
            >
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
            <!--end::Button-->

            <!--begin::Button Salva-->
            <button
              v-if="user.Id == targetData.UserId || user.Role == 'Admin' || user.Role == 'Agency'"
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
                <span class="btn-label">Salva Modifiche</span>
              </span>
              <span v-if="loading" class="d-flex align-items-center">
                <span class="spinner-border spinner-border-sm me-2"></span>
                <span class="btn-label">Attendere...</span>
              </span>
            </button>
            <!--end::Button-->
          </div>
          <!--end::Modal footer-->
          <div></div>
        </el-form>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, onMounted, watch, computed } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { toTitleCase } from "@/core/helpers/text";
import Swal from "sweetalert2/dist/sweetalert2.js";
import events, { TODAY, getToInsert, updateEvent, InsertModel, getEvent, Event, deleteEvent } from "@/core/data/events";
import { useAuthStore } from "@/stores/auth";
import moment from "moment";

export default defineComponent({
  name: "update-event-modal",
  components: {},
  props: { Id: { type: Number, Required: true } },
  setup(props, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const updateTargetModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const store = useAuthStore();
    const user = store.user;
    
    // Titoli predefiniti per gli appuntamenti
    const eventNameSuggestions = [
      "Primo contatto / incontro conoscitivo",
      "Appuntamento di acquisizione",
      "Valutazione immobile",
      "Firma incarico di vendita",
      "Firma incarico di locazione",
      "Visita immobile",
      "Open house",
      "Seconda visita",
      "Incontro di trattativa",
      "Presentazione proposta",
      "Firma proposta d'acquisto",
      "Firma preliminare",
      "Appuntamento in agenzia",
      "Appuntamento dal notaio",
      "Consegna documentazione",
      "Chiusura trattativa"
    ];
    
    const showSuggestions = ref<boolean>(false);
    const selectedSuggestionIndex = ref<number>(-1);
    
    // Filtra i suggerimenti in base al testo digitato (contiene, case-insensitive)
    const filteredEventSuggestions = computed(() => {
      if (!targetData.value.EventName || targetData.value.EventName.trim() === '') {
        return eventNameSuggestions;
      }
      const searchText = targetData.value.EventName.toLowerCase().trim();
      return eventNameSuggestions.filter(suggestion => 
        suggestion.toLowerCase().includes(searchText)
      );
    });
    
    const colorOptions = [
  { name: '', hex: '#408441' },       
  { name: '', hex: '#3412F2' },           
  { name: '', hex: '#FBC8FF' },          
  { name: '', hex: '#23D8F4' },        
  { name: '', hex: '#E70F86' },         
  { name: '', hex: '#8973AE' },           
  { name: '', hex: '#559F6D' },     
  { name: '', hex: '#D6D00C' },          
  { name: '', hex: '#676769' },          
  { name: '', hex: '#8B1AD7' },          
  { name: '', hex: '#F5730F' },      
  { name: '', hex: '#FF5733' },          
  { name: '', hex: '#C70039' },     
  { name: '', hex: '#900C3F' },        
  { name: '', hex: '#581845' },         
  { name: '', hex: '#D5A6BD' },    
  { name: '', hex: '#FF8C00' },   
  { name: '', hex: '#FF0000' },     
  { name: '', hex: '#800080' },     
  { name: '', hex: '#00FF00' }       
];
    const targetData = ref<Event>({
      Id: 0,
      UserId: "",
      EventName: "",
      EventDescription: "",
      EventLocation: "",
      CustomerId: null,
      RequestId: null,
      RealEstatePropertyId: null,
      EventStartDate: null,
      EventEndDate: null,
      Type: "Appuntamento",
      Color:"#5e97fd",
      Confirmed: false,
      Cancelled: false,
      Postponed: false,
    });

    const rules = ref({
      EventName: [
        {
          required: true,
          message: "Inserisci il nome dell'evento",
          trigger: "blur",
        },
      ],
      Color: [
        {
          required: true,
          message: "Seleziona un colore",
          trigger: "change",
        },
      ],
      EventStartDate: [
        {
          required: true,
          message: "Inserisci la data",
          trigger: "blur",
        },
      ],
      EventEndDate: [
        {
          required: true,
          message: "Inserisci la data",
          trigger: "blur",
        },
      ],
    });

    const inserModel = ref<InsertModel>({
      Customers: [],
      Requests: [],
      RealEstateProperties: [],
      // Agents: []
    });

    onMounted(async () => {
      loading.value = true;
      inserModel.value = await getToInsert();
      loading.value = false;
    })

    // Funzione per convertire una stringa ISO UTC in formato datetime-local
    const formatDateForInput = (dateString: string | null | undefined): string | null => {
      if (!dateString) return null;
      // Interpreta la stringa ISO come UTC e converte in ora locale per l'input
      const date = moment.utc(dateString);
      if (!date.isValid()) return null;
      // Converte in locale e formatta come datetime-local (YYYY-MM-DDTHH:mm)
      return date.local().format('YYYY-MM-DDTHH:mm');
    };

    // Funzione per convertire una stringa datetime-local in formato ISO UTC per l'API
    const formatDateForApi = (dateString: string | null | undefined): string | null => {
      if (!dateString) return null;
      // Interpreta la stringa datetime-local come ora locale dell'utente
      // e poi converte in UTC mantenendo lo stesso momento nel tempo
      const date = moment(dateString);
      if (!date.isValid()) return null;
      // Converte in UTC e formatta come ISO UTC con Z finale
      return date.utc().format('YYYY-MM-DDTHH:mm:ss') + 'Z';
    };

    watch(() => props.Id, async (first, second) => {
      if (first > 0) {
        const event = await getEvent(props.Id);
        if (event) {
          // Converti le date nel formato corretto per gli input datetime-local
          event.EventStartDate = formatDateForInput(event.EventStartDate);
          event.EventEndDate = formatDateForInput(event.EventEndDate);
          targetData.value = event;
        }
      }
      else {
        targetData.value = null;
      }
    })

    const submit = async () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate(async (valid: boolean) => {
        if (valid) {
          loading.value = true;
          
          // Prepara i dati per l'API convertendo le date in formato UTC
          const eventData = { ...targetData.value };
          eventData.EventStartDate = formatDateForApi(eventData.EventStartDate);
          eventData.EventEndDate = formatDateForApi(eventData.EventEndDate);

          await updateEvent(eventData);

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
              hideModal(updateTargetModalRef.value);
              emit('formUpdateSubmitted', targetData.value);
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

    async function deleteItem(id: number) {
      const result = await Swal.fire({
        title: "Elimina evento",
        html: "Stai per eliminare definitivamente questo evento. L'operazione è irreversibile.",
        icon: "warning",
        showCancelButton: true,
        focusCancel: true,
        buttonsStyling: false,
        confirmButtonText: "Elimina",
        cancelButtonText: "Annulla",
        heightAuto: false,
        customClass: {
          confirmButton: "btn btn-danger",
          cancelButton: "btn btn-light",
        },
      });

      if (!result.isConfirmed) {
        return;
      }

      try {
        loading.value = true;
        await deleteEvent(id);
        loading.value = false;

        Swal.fire({
          text: "Evento eliminato con successo!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Continua!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn btn-primary",
          },
        }).then(() => {
          emit('formUpdateSubmitted', targetData.value);
        });
      } catch (error) {
        loading.value = false;
        Swal.fire({
          text: "Attenzione, si è verificato un errore.",
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

    // Funzione per selezionare un colore
    const selectColor = (color: string) => {
      targetData.value.Color = color;
      // Chiudi il dropdown dopo la selezione
      const dropdownElement = document.getElementById('colorDropdownUpdate');
      if (dropdownElement) {
        const dropdown = (window as any).bootstrap?.Dropdown?.getInstance(dropdownElement);
        if (dropdown) {
          dropdown.hide();
        }
      }
    };
    
    // Funzioni per gestire l'autocomplete del nome evento
    const onEventNameInput = () => {
      showSuggestions.value = true;
      selectedSuggestionIndex.value = -1;
    };
    
    const selectSuggestion = (index: number) => {
      if (index >= 0 && index < filteredEventSuggestions.value.length) {
        targetData.value.EventName = filteredEventSuggestions.value[index];
        showSuggestions.value = false;
        selectedSuggestionIndex.value = -1;
      }
    };
    
    const navigateSuggestions = (direction: 'up' | 'down') => {
      if (filteredEventSuggestions.value.length === 0) return;
      
      if (direction === 'down') {
        selectedSuggestionIndex.value = 
          selectedSuggestionIndex.value < filteredEventSuggestions.value.length - 1
            ? selectedSuggestionIndex.value + 1
            : 0;
      } else {
        selectedSuggestionIndex.value = 
          selectedSuggestionIndex.value > 0
            ? selectedSuggestionIndex.value - 1
            : filteredEventSuggestions.value.length - 1;
      }
    };
    
    // Funzione per capitalizzare il nome evento quando perde il focus
    const capitalizeEventName = () => {
      // Chiudi i suggerimenti quando perde il focus
      setTimeout(() => {
        showSuggestions.value = false;
      }, 200);
      
      if (targetData.value.EventName && typeof targetData.value.EventName === 'string' && targetData.value.EventName.trim()) {
        targetData.value.EventName = toTitleCase(targetData.value.EventName);
      }
    };

    return {
      formRef,
      updateTargetModalRef,
      loading,
      targetData,
      rules,
      submit,
      getAssetPath,
      inserModel,
      deleteItem,
      user,
      colorOptions,
      selectColor,
      // Autocomplete event name
      showSuggestions,
      selectedSuggestionIndex,
      filteredEventSuggestions,
      onEventNameInput,
      selectSuggestion,
      navigateSuggestions,
      capitalizeEventName
    };
  },
});
</script>

<!-- Tutti gli stili sono stati spostati in file CSS dedicati -->