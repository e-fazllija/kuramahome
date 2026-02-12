<template>
<div class="modal fade show" id="kt_modal_add_event" role="dialog" ref="newTargetModalRef" tabindex="-1" aria-hidden="false" aria-modal="true">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content card-palette modal-shell">
        <el-form class="form fv-plugins-bootstrap5 fv-plugins-framework" id="kt_modal_add_event_form"
          @submit.prevent="submit()" :model="targetData" :rules="rules" ref="formRef">
          <!--begin::Modal header-->
          <div class="modal-header card-palette-header modal-header-accent" id="kt_modal_add_event_header">
            <!--begin::Modal title-->
            <div class="d-flex align-items-center">
              <div class="symbol symbol-40px me-3">
                <span class="symbol-label symbol-label-accent">
                  <i class="ki-duotone ki-calendar fs-2 text-white">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                </span>
              </div>
              <div>
                <h2 class="fw-bold m-0 text-palette-primary fs-3">📅 Aggiungi Evento</h2>
                <span class="text-palette-secondary fs-7 fw-semibold">Inserisci i dati del nuovo evento</span>
              </div>
            </div>
            <!--end::Modal title-->

            <!--begin::Close-->
            <div
              id="kt_modal_add_event_close"
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
              id="kt_modal_add_event_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_event_header"
              data-kt-scroll-wrappers="#kt_modal_add_event_scroll"
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
              <!-- Il colore è assegnato automaticamente (chi crea l'appuntamento / agente selezionato) -->
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
                  <input 
                    class="form-control form-control-lg"
                    v-model="targetData.EventDescription" 
                    type="text" 
                    placeholder="Descrizione dell'evento" 
                    name="EventDescription"
                    @blur="capitalizeEventDescription"
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
                  <input 
                    class="form-control form-control-lg"
                    v-model="targetData.EventLocation" 
                    type="text" 
                    placeholder="Dove si terrà l'evento" 
                    name="EventLocation"
                    @blur="capitalizeEventLocation"
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
              id="kt_modal_add_event_cancel"
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
                  <i class="ki-duotone ki-plus fs-3">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                </span>
                <span class="btn-label">Crea Evento</span>
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
import { hideModal, removeModalBackdrop } from "@/core/helpers/dom";
import { toTitleCase, smartTitleCase, capitalize } from "@/core/helpers/text";
import Swal from "sweetalert2/dist/sweetalert2.js";
import events, { todayDate, getToInsert, createEvent, InsertModel, Event } from "@/core/data/events";
import { useAuthStore } from "@/stores/auth";
import moment from "moment";

export default defineComponent({
  name: "new-event-modal",
  components: {},
  props: {
    SelectedDateStart: { type: String, Required: true },
    SelectedDateEnd: { type: String, Required: true },
    UserId: { type: String, Required: true },
    Color: { type: String, Required: true }
  },
  setup(props, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const newTargetModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const store = useAuthStore();
    
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
    
    // Colore assegnato automaticamente: chi crea l'appuntamento (o agente selezionato se Agency/Admin)
    const targetData = ref<Event>({
      UserId: "",
      EventName: "",
      EventDescription: "",
      EventLocation: "",
      CustomerId: null,
      RequestId: null,
      RealEstatePropertyId: null,
      EventStartDate: todayDate.format("YYYY-MM-DD"),
      EventEndDate: todayDate.format("YYYY-MM-DD"),
      Type: "Appuntamento",
      Color: props.Color || store.user?.Color || "#3699ff",
      Confirmed: false,
      Cancelled: false,
      Postponed: false
    });

    function formattedDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }

    watch(() => props.SelectedDateStart, async (first, second) => {
      if (first) {
        targetData.value.EventStartDate = formattedDate(new Date(first));
      }
    })

    watch(() => props.SelectedDateEnd, async (first, second) => {
      if (first) {
        targetData.value.EventEndDate = formattedDate(new Date(first));
      }
    })

    watch(() => props.Color, (newColor) => {
      targetData.value.Color = newColor || store.user?.Color || "#3699ff";
    })

    const rules = ref({
      EventName: [
        {
          required: true,
          message: "Inserisci il nome dell'evento",
          trigger: "blur",
        },
      ],
      EventStartDate: [
        {
          required: true,
          message: "Inserisci la data e ora di inizio",
          trigger: "blur",
        },
      ],
      EventEndDate: [
        {
          required: true,
          message: "Inserisci la data e ora di fine",
          trigger: "blur",
        },
      ],
    });
    const options = [
        { id: 1, label: 'Opzione 1' },
        { id: 2, label: 'Opzione 2' },
        { id: 3, label: 'Opzione 3' },
      ];

    const inserModel = ref<InsertModel>({
      Customers: [],
      Requests: [],
      RealEstateProperties: [],
    });

    onMounted(async () => {
      loading.value = true
      inserModel.value = await getToInsert();
      loading.value = false
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

    const submit = async () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate(async (valid: boolean, invalidFields?: Record<string, { message?: string }[]>) => {
        if (valid) {
          loading.value = true;
          store.setError("");
          targetData.value.UserId = props.UserId;
          targetData.value.EventStartDate = formatDateForApi(targetData.value.EventStartDate);
          targetData.value.EventEndDate = formatDateForApi(targetData.value.EventEndDate);

          try {
            await createEvent(targetData.value);
            store.setError(""); // successo: azzera eventuale errore globale
            targetData.value.UserId = "";
            targetData.value.EventName = "";
            targetData.value.EventDescription = "";
            targetData.value.Color = props.Color || store.user?.Color || "#3699ff";
            targetData.value.EventLocation = "";
            targetData.value.CustomerId = null;
            targetData.value.RequestId = null;
            targetData.value.RealEstatePropertyId = null;
            targetData.value.EventStartDate = todayDate.format("YYYY-MM-DD");
            targetData.value.EventEndDate = todayDate.format("YYYY-MM-DD");
            targetData.value.Type = "Appuntamento";
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
              hideModal(newTargetModalRef.value);
              emit("formAddSubmitted", targetData.value.UserId);
            });
          } catch {
            loading.value = false;
            const errorMessage = store.errors || "Errore durante la creazione dell'evento. Riprova.";
            Swal.fire({
              html: errorMessage.replace(/\r?\n/g, "<br>"),
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
          const messages: string[] = [];
          if (invalidFields && typeof invalidFields === "object") {
            for (const key of Object.keys(invalidFields)) {
              const items = invalidFields[key];
              if (Array.isArray(items))
                items.forEach((item: { message?: string }) => {
                  if (item?.message) messages.push(item.message);
                });
            }
          }
          const validationMessage = messages.length
            ? messages.join(" ")
            : "Compila correttamente i campi obbligatori (nome evento, data e ora inizio, data e ora fine).";
          Swal.fire({
            text: validationMessage,
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
    
    // Funzioni per capitalizzare i campi quando l'utente perde il focus
    const capitalizeEventName = () => {
      // Chiudi i suggerimenti quando perde il focus
      setTimeout(() => {
        showSuggestions.value = false;
      }, 200);
      
      if (targetData.value.EventName && typeof targetData.value.EventName === 'string' && targetData.value.EventName.trim()) {
        targetData.value.EventName = toTitleCase(targetData.value.EventName);
      }
    };

    const capitalizeEventDescription = () => {
      if (targetData.value.EventDescription && typeof targetData.value.EventDescription === 'string' && targetData.value.EventDescription.trim()) {
        targetData.value.EventDescription = capitalize(targetData.value.EventDescription);
      }
    };

    const capitalizeEventLocation = () => {
      if (targetData.value.EventLocation && typeof targetData.value.EventLocation === 'string' && targetData.value.EventLocation.trim()) {
        targetData.value.EventLocation = smartTitleCase(targetData.value.EventLocation);
      }
    };

    return {
      formRef,
      newTargetModalRef,
      loading,
      targetData,
      rules,
      submit,
      getAssetPath,
      inserModel,
      removeModalBackdrop,
      capitalizeEventName,
      capitalizeEventDescription,
      capitalizeEventLocation,
      // Autocomplete event name
      showSuggestions,
      selectedSuggestionIndex,
      filteredEventSuggestions,
      onEventNameInput,
      selectSuggestion,
      navigateSuggestions
    };
  },
  data() {
      return {
        value: null,
        options: [
        { Id: 1, Name: 'Opzione 1' },
        { Id: 2, Name: 'Opzione 2' },
        { Id: 3, Name: 'Opzione 3' }
      ],
      }
    },
  methods: {
  }
});
</script>

<!-- Tutti gli stili sono stati spostati in file CSS dedicati -->
