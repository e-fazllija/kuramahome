<template>
  <div class="modal fade show" id="kt_modal_update_event" aria-modal="true" role="dialog" ref="updateTargetModalRef">
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content" style="border-radius: 0.95rem; border: 1px solid #e9ecef; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);">
        <el-form class="form fv-plugins-bootstrap5 fv-plugins-framework" id="kt_modal_update_event_form"
          @submit.prevent="submit()" :model="targetData" :rules="rules" ref="formRef">
          <!--begin::Modal header-->
          <div class="modal-header" id="kt_modal_update_event_header" style="background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%); border-radius: 0.95rem 0.95rem 0 0; border-bottom: 1px solid #e9ecef;">
            <!--begin::Modal title-->
            <div class="d-flex align-items-center">
              <div class="symbol symbol-40px me-3">
                <span class="symbol-label" style="background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%); box-shadow: 0 4px 12px rgba(54, 153, 255, 0.3);">
                  <i class="ki-duotone ki-calendar-edit fs-2 text-white">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                </span>
              </div>
              <div>
                <h2 class="fw-bold m-0 text-gray-900 fs-3">✏️ Aggiorna Evento</h2>
                <span class="text-muted fs-7 fw-semibold">Modifica i dati dell'evento</span>
              </div>
            </div>
            <!--end::Modal title-->

            <!--begin::Close-->
            <div
              id="kt_modal_update_event_close"
              data-bs-dismiss="modal"
              class="btn btn-icon btn-sm btn-active-icon-primary"
              style="border-radius: 0.5rem; background: rgba(255, 255, 255, 0.8); border: 1px solid #e9ecef;"
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
                <el-form-item prop="NomeEvento">
                  <el-input 
                    v-model="targetData.NomeEvento" 
                    type="text" 
                    name="NomeEvento"
                    placeholder="Inserisci il nome dell'evento"
                    class="modern-input"
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
                  <select v-model="targetData.Color" class="form-select modern-select"
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
                <el-form-item prop="DescrizioneEvento">
                  <el-input 
                    v-model="targetData.DescrizioneEvento" 
                    type="text" 
                    placeholder="Descrizione dell'evento" 
                    name="DescrizioneEvento"
                    class="modern-input"
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
                <el-form-item prop="LuogoEvento">
                  <el-input 
                    v-model="targetData.LuogoEvento" 
                    type="text" 
                    placeholder="Dove si terrà l'evento" 
                    name="LuogoEvento"
                    class="modern-input"
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
                  class="multiselect-modern"
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
                  class="multiselect-modern"
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
                  class="multiselect-modern"
                />
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
                      v-model="targetData.DataInizioEvento" 
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
                      v-model="targetData.DataFineEvento" 
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
          <div class="modal-footer flex-center" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 0 0 0.95rem 0.95rem; border-top: 1px solid #dee2e6; padding: 1.5rem 2rem;">
            <!--begin::Button-->
            <button
              type="reset"
              id="kt_modal_update_event_cancel"
              class="btn btn-modal-cancel me-3"
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
              v-if="user.Id == targetData.ApplicationUserId || user.Role == 'Admin' || user.Role == 'Agenzia'"
              @click="deleteItem(targetData.Id)"
              data-bs-dismiss="modal"
              type="button"
              class="btn btn-modal-danger me-3"
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
              v-if="user.Id == targetData.ApplicationUserId || user.Role == 'Admin' || user.Role == 'Agenzia'"
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-modal-primary"
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
import { defineComponent, ref, onMounted, watch } from "vue";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import events, { TODAY, getToInsert, updateEvent, InsertModel, getEvent, Event, deleteEvent } from "@/core/data/events";
import { useAuthStore } from "@/stores/auth";
import Multiselect from '@vueform/multiselect'

export default defineComponent({
  name: "update-event-modal",
  components: { Multiselect },
  props: { Id: { type: Number, Required: true } },
  setup(props, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const updateTargetModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const store = useAuthStore();
    const user = store.user;
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
      ApplicationUserId: "",
      NomeEvento: "",
      DescrizioneEvento: "",
      LuogoEvento: "",
      CustomerId: null,
      RequestId: null,
      RealEstatePropertyId: null,
      DataInizioEvento: null,
      DataFineEvento: null,
      Type: "Appuntamento",
      Color:"##5e97fd",
      Confirmed: false,
      Cancelled: false,
      Postponed: false,
    });

    const rules = ref({
      NomeEvento: [
        {
          required: true,
          message: "Inserisci il nome dell'evento",
          trigger: "blur",
        },
      ],
      DataInizioEvento: [
        {
          required: true,
          message: "Inserisci la data",
          trigger: "blur",
        },
      ],
      DataFineEvento: [
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

    watch(() => props.Id, async (first, second) => {
      if (first > 0) {
        targetData.value = await getEvent(props.Id)
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
          
          targetData.value.DataInizioEvento = targetData.value.DataInizioEvento;
          targetData.value.DataFineEvento = targetData.value.DataFineEvento;

          await updateEvent(targetData.value);

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
        await deleteEvent(id);
        emit('formUpdateSubmitted', targetData.value);
      });
    }

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
      colorOptions
    };
  },
});
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style lang="scss">
.el-select {
  width: 100%;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>

<style scoped>
/* Stili per input moderni */
:deep(.modern-input .el-input__wrapper) {
  background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%);
  border: 1px solid #e8f4ff;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(54, 153, 255, 0.1);
  transition: all 0.3s ease;
  padding: 0.75rem 1rem;
}

:deep(.modern-input .el-input__wrapper:hover) {
  background: linear-gradient(135deg, #e8f4ff 0%, #f1f3ff 100%);
  border-color: #3699ff;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(54, 153, 255, 0.15);
}

:deep(.modern-input .el-input__wrapper.is-focus) {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-color: #3699ff;
  box-shadow: 0 0 0 0.2rem rgba(54, 153, 255, 0.15), 0 4px 12px rgba(54, 153, 255, 0.2);
  transform: translateY(-1px);
}

:deep(.modern-input .el-input__inner) {
  color: #3f4254;
  font-weight: 500;
  font-size: 0.95rem;
}

:deep(.modern-input .el-input__inner::placeholder) {
  color: #a1a5b7;
  font-weight: 400;
}

/* Stili per select moderni */
.modern-select {
  background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%);
  border: 1px solid #e8f4ff;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(54, 153, 255, 0.1);
  transition: all 0.3s ease;
  padding: 0.75rem 1rem;
  font-weight: 500;
  color: #3f4254;
}

.modern-select:hover {
  background: linear-gradient(135deg, #e8f4ff 0%, #f1f3ff 100%);
  border-color: #3699ff;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(54, 153, 255, 0.15);
}

.modern-select:focus {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-color: #3699ff;
  box-shadow: 0 0 0 0.2rem rgba(54, 153, 255, 0.15), 0 4px 12px rgba(54, 153, 255, 0.2);
  transform: translateY(-1px);
}

/* Stili per datetime moderni */
.modern-datetime {
  background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%) !important;
  border: 1px solid #e8f4ff !important;
  border-radius: 0.75rem !important;
  box-shadow: 0 2px 8px rgba(54, 153, 255, 0.1) !important;
  transition: all 0.3s ease !important;
  padding: 0.75rem 1rem !important;
  font-weight: 500 !important;
  color: #3f4254 !important;
}

.modern-datetime:hover {
  background: linear-gradient(135deg, #e8f4ff 0%, #f1f3ff 100%) !important;
  border-color: #3699ff !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(54, 153, 255, 0.15) !important;
}

.modern-datetime:focus {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%) !important;
  border-color: #3699ff !important;
  box-shadow: 0 0 0 0.2rem rgba(54, 153, 255, 0.15), 0 4px 12px rgba(54, 153, 255, 0.2) !important;
  transform: translateY(-1px);
  outline: none !important;
}

/* Stili per multiselect moderno */
:deep(.multiselect-modern) {
  background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%);
  border: 1px solid #e8f4ff;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(54, 153, 255, 0.1);
  transition: all 0.3s ease;
}

:deep(.multiselect-modern .multiselect__tags) {
  background: transparent;
  border: none;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  min-height: 50px;
}

:deep(.multiselect-modern .multiselect__placeholder) {
  color: #a1a5b7;
  font-weight: 500;
  font-size: 0.95rem;
}

:deep(.multiselect-modern .multiselect__input) {
  background: transparent;
  color: #3f4254;
  font-weight: 500;
  font-size: 0.95rem;
}

:deep(.multiselect-modern:hover) {
  background: linear-gradient(135deg, #e8f4ff 0%, #f1f3ff 100%);
  border-color: #3699ff;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(54, 153, 255, 0.15);
}

:deep(.multiselect-modern.is-active) {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-color: #3699ff;
  box-shadow: 0 0 0 0.2rem rgba(54, 153, 255, 0.15), 0 4px 12px rgba(54, 153, 255, 0.2);
  transform: translateY(-1px);
}

/* Stili per checkbox switch */
.form-check-input {
  transition: all 0.3s ease;
}

.form-check-input:checked {
  background-color: #3699ff;
  border-color: #3699ff;
}

.form-check-input:focus {
  border-color: #3699ff;
  box-shadow: 0 0 0 0.2rem rgba(54, 153, 255, 0.25);
}

/* Stili per labels */
label {
  transition: all 0.3s ease;
}

label:hover {
  color: #3699ff !important;
}

/* Animazioni per icone */
.ki-duotone {
  transition: all 0.3s ease;
}

label:hover .ki-duotone {
  transform: scale(1.1);
}

/* Bottoni Modal Moderni */
.btn-modal-cancel,
.btn-modal-primary,
.btn-modal-danger {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  border-radius: 0.75rem;
  font-weight: 700;
  font-size: 0.95rem;
  border: none;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.3px;
}

.btn-modal-cancel::before,
.btn-modal-primary::before,
.btn-modal-danger::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.btn-modal-cancel:hover::before,
.btn-modal-primary:hover::before,
.btn-modal-danger:hover::before {
  left: 100%;
}

.btn-modal-cancel .btn-icon,
.btn-modal-primary .btn-icon,
.btn-modal-danger .btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.btn-modal-cancel .btn-label,
.btn-modal-primary .btn-label,
.btn-modal-danger .btn-label {
  font-weight: 700;
  letter-spacing: 0.3px;
}

/* Bottone Annulla */
.btn-modal-cancel {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: 1px solid #dee2e6;
  color: #6c757d;
  box-shadow: 0 2px 8px rgba(108, 117, 125, 0.15);
}

.btn-modal-cancel:hover {
  background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(108, 117, 125, 0.25);
  color: #495057;
}

.btn-modal-cancel:hover .btn-icon {
  transform: scale(1.1) rotate(-90deg);
}

.btn-modal-cancel:active {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(108, 117, 125, 0.2);
}

/* Bottone Elimina */
.btn-modal-danger {
  background: linear-gradient(135deg, #f64e60 0%, #d63447 100%);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(246, 78, 96, 0.35);
}

.btn-modal-danger:hover {
  background: linear-gradient(135deg, #d63447 0%, #b92838 100%);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(246, 78, 96, 0.45);
  color: #ffffff;
}

.btn-modal-danger:hover .btn-icon {
  transform: scale(1.15) rotate(-5deg);
  animation: shake 0.5s ease;
}

.btn-modal-danger:active {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(246, 78, 96, 0.35);
}

/* Animazione shake per l'icona elimina */
@keyframes shake {
  0%, 100% { transform: rotate(0deg) scale(1.15); }
  25% { transform: rotate(-5deg) scale(1.15); }
  75% { transform: rotate(5deg) scale(1.15); }
}

/* Bottone Primario (Salva) */
.btn-modal-primary {
  background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(54, 153, 255, 0.35);
}

.btn-modal-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #2b7ce6 0%, #0aa39a 100%);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(54, 153, 255, 0.45);
  color: #ffffff;
}

.btn-modal-primary:hover:not(:disabled) .btn-icon {
  transform: scale(1.15) rotate(5deg);
}

.btn-modal-primary:active:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(54, 153, 255, 0.35);
}

.btn-modal-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Spinner loading nei bottoni */
.btn-modal-primary .spinner-border-sm {
  width: 1rem;
  height: 1rem;
  border-width: 0.15rem;
}
</style>