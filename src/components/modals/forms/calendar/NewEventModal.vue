<template>
<div class="modal fade show" id="kt_modal_add_event" role="dialog" ref="newTargetModalRef" tabindex="-1" aria-hidden="false" aria-modal="true">
    <div class="modal-dialog modal-dialog-centered mw-650px">
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
                  <el-input 
                    v-model="targetData.EventName" 
                    type="text" 
                    name="EventName"
                    placeholder="Inserisci il nome dell'evento"
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
                  <select v-model="targetData.Color" class="form-select form-select-lg"
                         :style="{ backgroundColor: targetData.Color, color: '#fff' }">
                    <option v-for="(color, index) in colorOptions" :key="index" 
                         :value="color.hex" :style="{ backgroundColor: color.hex, color: '#fff' }">
                         {{ color.name || 'Colore' }}
                    </option>
                  </select>
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
                <Multiselect
                  v-model="targetData.RealEstatePropertyId"
                  :options="inserModel.RealEstateProperties"
                  label="label"
                  valueProp="Id"
                  :searchable="true"
                  :close-on-select="true"
                  :clear-on-select="false"
                  placeholder="Seleziona l'immobile"
                />
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
                <Multiselect
                  v-model="targetData.RequestId"
                  :options="inserModel.Requests"
                  label="label"
                  valueProp="Id"
                  :searchable="true"
                  :close-on-select="true"
                  :clear-on-select="false"
                  placeholder="Seleziona la richiesta"
                />
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
                <Multiselect
                  v-model="targetData.CustomerId"
                  :options="inserModel.Customers"
                  label="label"
                  valueProp="Id"
                  :searchable="true"
                  :close-on-select="true"
                  :clear-on-select="false"
                  placeholder="Seleziona il cliente"
                />
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="row g-7 mb-7">
                <div class="col-md-6">
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

                <div class="col-md-6">
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
import { defineComponent, ref, onMounted, watch } from "vue";
import { hideModal, removeModalBackdrop } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import events, { todayDate, getToInsert, createEvent, InsertModel, Event } from "@/core/data/events";
import { useAuthStore } from "@/stores/auth";
import Multiselect from '@vueform/multiselect'
import moment from "moment";

export default defineComponent({
  name: "new-event-modal",
  components: { Multiselect },
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
      Color: store.user.Color,
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

    watch(() => props.Color, async (first, second) => {
      if (first) {
        targetData.value.Color = first;
      }
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

      formRef.value.validate(async (valid: boolean) => {
        if (valid) {
          loading.value = true;
          targetData.value.UserId = props.UserId
          // Converti le date nel formato corretto per gli input datetime-local
          targetData.value.EventStartDate = formatDateForApi(targetData.value.EventStartDate);
          targetData.value.EventEndDate = formatDateForApi(targetData.value.EventEndDate);

          await createEvent(targetData.value);

          const error = store.errors;

          if (!error) {
            targetData.value.UserId= "";
            targetData.value.EventName= "";
            targetData.value.EventDescription= "";
            targetData.value.Color="";
            targetData.value.EventLocation= "";
            targetData.value.CustomerId= null;
            targetData.value.RequestId= null;
            targetData.value.RealEstatePropertyId= null;
            targetData.value.EventStartDate= todayDate.format("YYYY-MM-DD");
            targetData.value.EventEndDate= todayDate.format("YYYY-MM-DD");
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
              emit('formAddSubmitted', targetData.value.UserId);
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
      colorOptions
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
<style src="@vueform/multiselect/themes/default.css"></style>

<!-- Tutti gli stili sono stati spostati in file CSS dedicati -->
