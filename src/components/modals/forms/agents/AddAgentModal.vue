<template>
  <div
    class="modal fade"
    id="kt_modal_add_agent"
    ref="addAgentModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-850px">
      <!--begin::Modal content-->
      <div class="modal-content" style="border-radius: 0.95rem; border: 1px solid #e9ecef; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_agent_header" style="background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%); border-radius: 0.95rem 0.95rem 0 0; border-bottom: 1px solid #e9ecef;">
          <!--begin::Modal title-->
          <div class="d-flex align-items-center">
            <div class="symbol symbol-40px me-3">
              <span class="symbol-label" style="background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%); box-shadow: 0 4px 12px rgba(54, 153, 255, 0.3);">
                <i class="ki-duotone ki-user fs-2 text-white">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </span>
            </div>
            <div>
              <h2 class="fw-bold m-0 text-gray-900 fs-3">👤 Aggiungi Agente</h2>
              <span class="text-muted fs-7 fw-semibold">Inserisci i dati del nuovo agente</span>
            </div>
          </div>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_agent_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
            style="border-radius: 0.5rem; background: rgba(255, 255, 255, 0.8); border: 1px solid #e9ecef;"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <!--begin::Form-->
        <el-form
          @submit.prevent="submit()"
          :model="formData"
          :rules="rules"
          ref="formRef"
        >
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_add_agent_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_agent_header"
              data-kt-scroll-wrappers="#kt_modal_add_agent_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div v-if="agencies && user.Role == 'Admin'" class="d-flex flex-column mb-7 fv-row">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-3 text-gray-800">
                  <i class="ki-duotone ki-shop fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                    <span class="path4"></span>
                    <span class="path5"></span>
                  </i>
                  Agenzia
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <select class="form-select modern-select" v-model="formData.AgencyId">
                  <option v-for="(agency, index) in agencies" :key="index" :value="agency.Id">{{ agency.Name }} {{ agency.LastName }}</option>
                </select>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-3 text-gray-800">
                  <i class="ki-duotone ki-user fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Nome
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="Name">
                  <el-input
                    v-model="formData.FirstName"
                    type="text"
                    placeholder="Inserisci il nome"
                    class="modern-input"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-3 text-gray-800">
                  <i class="ki-duotone ki-user fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Cognome
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="LastName">
                  <el-input
                    v-model="formData.LastName"
                    type="text"
                    placeholder="Inserisci il cognome"
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
                  <select v-model="formData.Color" class="form-select modern-select"
                         :style="{ backgroundColor: formData.Color, color: '#fff' }">
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
                  <i class="ki-duotone ki-sms fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <span class="required">Email</span>
                  <i
                    class="fas fa-exclamation-circle ms-1 fs-7 text-warning"
                    data-bs-toggle="tooltip"
                    title="Indirizzo email non valido"
                  ></i>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="Email">
                  <el-input 
                    v-model="formData.Email" 
                    placeholder="esempio@email.com"
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
                  <i class="ki-duotone ki-phone fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <span class="required">Telefono</span>
                  <i
                    class="fas fa-exclamation-circle ms-1 fs-7 text-warning"
                    data-bs-toggle="tooltip"
                    title="Numero di telefono non valido"
                  ></i>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="PhoneNumber">
                  <el-input 
                    v-model="formData.PhoneNumber" 
                    type="tel"
                    placeholder="0123456789"
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
                  <i class="ki-duotone ki-mobile fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <span>Cellulare</span>
                  <i
                    class="fas fa-exclamation-circle ms-1 fs-7 text-warning"
                    data-bs-toggle="tooltip"
                    title="Numero di cellulare non valido"
                  ></i>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="MobilePhone">
                  <el-input 
                    v-model="formData.MobilePhone" 
                    type="tel"
                    placeholder="3331234567"
                    class="modern-input"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-15">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-3 text-gray-800">
                  <i class="ki-duotone ki-profile-user fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                    <span class="path4"></span>
                  </i>
                  Referente
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="Referent">
                  <el-input 
                    v-model="formData.Referent" 
                    type="text"
                    placeholder="Nome del referente"
                    class="modern-input"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Billing toggle-->
              <div
                class="fw-bold fs-4 rotate collapsible mb-7 p-4"
                data-bs-toggle="collapse"
                href="#kt_modal_add_agent_billing_info"
                role="button"
                aria-expanded="false"
                aria-controls="kt_agent_view_details"
                style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 0.75rem; border: 1px solid #dee2e6; cursor: pointer; transition: all 0.3s ease;">
                <i class="ki-duotone ki-information fs-3 me-3 text-primary">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                </i>
                Maggiori Informazioni
                <span class="ms-2 rotate-180">
                  <KTIcon icon-name="down" icon-class="fs-3" />
                </span>
              </div>
              <!--end::Billing toggle-->

              <!--begin::Billing form-->
              <div
                id="kt_modal_add_agent_billing_info"
                class="collapse show"
              >
                <!--begin::Input group-->
                <div class="d-flex flex-column mb-7 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-geolocation fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    Indirizzo
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="Address">
                    <el-input 
                      v-model="formData.Address"
                      placeholder="Via, numero civico"
                      class="modern-input"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="d-flex flex-column mb-7 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-geo fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    Comune
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="Town">
                    <el-input 
                      v-model="formData.City"
                      placeholder="Nome del comune"
                      class="modern-input"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="row g-9 mb-7">
                  <!--begin::Col-->
                  <div class="col-md-12 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-bold mb-3 text-gray-800">
                      <i class="ki-duotone ki-map fs-5 me-2 text-primary">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      Provincia
                    </label>
                    <!--end::Label-->

                    <!--begin::Input-->
                    <el-form-item prop="province">
                      <el-input 
                        v-model="formData.Province"
                        placeholder="Es. MI, RM, NA"
                        class="modern-input"
                      />
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                  <!--end::Col-->

                </div>
                <!--end::Input group-->

              </div>
              <!--end::Billing form-->
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 0 0 0.95rem 0.95rem; border-top: 1px solid #dee2e6; padding: 1.5rem 2rem;">
            <!--begin::Button-->
            <button
              type="reset"
              id="kt_modal_add_agent_cancel"
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

            <!--begin::Button-->
            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-modal-primary"
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
                <span class="btn-label">Crea Agente</span>
              </span>
              <span v-if="loading" class="d-flex align-items-center">
                <span class="spinner-border spinner-border-sm me-2"></span>
                <span class="btn-label">Attendere...</span>
              </span>
            </button>
            <!--end::Button-->
          </div>
          <!--end::Modal footer-->
        </el-form>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, onMounted } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { countries } from "@/core/data/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
import {createAgent, Agent } from "@/core/data/agents";
import {getAgencies } from "@/core/data/agencies";
import { useAuthStore, type User } from "@/stores/auth";

export default defineComponent({
  name: "add-agent-modal",
  components: {},
  setup(_, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addAgentModalRef = ref<null | HTMLElement>(null);
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

    const formData = ref<Agent>({
      FirstName: "",
      LastName: "",
      Email: "",
      PhoneNumber: null,
      MobilePhone: null,
      Referent: "",
      Address: "",
      City: "",
      Province: "",
      Password: "",
      AgencyId: "",
      Color: "#ffffff"
    });

    const rules = ref({
      Name: [
        {
          required: true,
          message: "Nome obligatorio",
          trigger: "change",
        },
      ],
      LastName: [
        {
          required: true,
          message: "Cognome obligatorio",
          trigger: "change",
        },
      ],
      Email: [
        {
          required: true,
          message: "Email obligatorio",
          trigger: "change",
        },
      ],
      PhoneNumber: [
        {
          required: true,
          message: "Telefono obligatorio",
          trigger: "change",
        },
      ],
      Address: [
        {
          required: true,
          message: "Indirizzo obligatorio",
          trigger: "change",
        },
      ],
      Town: [
        {
          required: true,
          message: "Città obligatoria",
          trigger: "change",
        },
      ]
    });

    const agencies = ref();

    async function getItems(filterRequest: string) {
      if(store.user.Role == "Admin"){
        agencies.value = await getAgencies(filterRequest);
        formData.value.AgencyId = agencies.value[0].Id;
      } else if(store.user.Role == "Agenzia") {
        formData.value.AgencyId = store.user.Id;
      }
    };

    onMounted(async () => {
      getItems("");
    });

    const submit = async () => {
      if (!formRef.value) {
        return;
      }
      await formRef.value.validate(async (valid: boolean) => {
        if (valid) {
          loading.value = true;
          
          formData.value.Role = "Agent"
          await createAgent(formData.value);
          
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
              hideModal(addAgentModalRef.value);
              emit('formAddSubmitted', formData.value);
              loading.value = false;
            });
          } else {
            loading.value = false;
            Swal.fire({
              text: error as string,
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Riprova!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn fw-semobold btn-light-danger",
              },
            });
          }
        } 
      });
    };

    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      addAgentModalRef,
      getAssetPath,
      countries,
      agencies,
      colorOptions,
      user
    };
  },
});
</script>

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

/* Tutti gli stili sono stati spostati in file CSS dedicati */
</style>
