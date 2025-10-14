<template>
  <div class="modal fade" id="kt_modal_update_agency" ref="updateAgencyModalRef" tabindex="-1" aria-hidden="true">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-850px">
      <!--begin::Modal content-->
      <div class="modal-content" style="border-radius: 0.95rem; border: 1px solid #e9ecef; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_update_agency_header" style="background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%); border-radius: 0.95rem 0.95rem 0 0; border-bottom: 1px solid #e9ecef;">
          <!--begin::Modal title-->
          <div class="d-flex align-items-center">
            <div class="symbol symbol-40px me-3">
              <span class="symbol-label" style="background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%); box-shadow: 0 4px 12px rgba(54, 153, 255, 0.3);">
                <i class="ki-duotone ki-shop fs-2 text-white">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                  <span class="path4"></span>
                  <span class="path5"></span>
                </i>
              </span>
            </div>
            <div>
              <h2 class="fw-bold m-0 text-gray-900 fs-3">🏢 Aggiorna Agenzia</h2>
              <span class="text-muted fs-7 fw-semibold">Modifica i dati dell'agenzia selezionata</span>
            </div>
          </div>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div id="kt_modal_update_agency_close" data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
            style="border-radius: 0.5rem; background: rgba(255, 255, 255, 0.8); border: 1px solid #e9ecef;">
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <!--begin::Form-->
        <el-form @submit.prevent="submit()" :model="formData" :rules="rules" ref="formRef">

          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div class="scroll-y me-n7 pe-7" id="kt_modal_add_agency_scroll" data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_agency_header"
              data-kt-scroll-wrappers="#kt_modal_add_agency_scroll" data-kt-scroll-offset="300px">

               <!--begin::Input group-->
               <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-3 text-gray-800">
                  <i class="ki-duotone ki-toggle-on fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                    <span class="path4"></span>
                  </i>
                  Stato Attivo / Non Attivo
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <div class="fv-row">
                  <div class="form-check form-switch form-check-custom form-check-solid">
                    <input class="form-check-input" type="checkbox" value="" v-model="formData.EmailConfirmed" />
                  </div>
                </div>
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
                    <span class="path3"></span>
                    <span class="path4"></span>
                  </i>
                  Nome
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="Name">
                  <el-input v-model="formData.Name" type="text" placeholder="Inserisci il nome dell'agenzia" class="modern-input" />
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
                    <span class="path3"></span>
                    <span class="path4"></span>
                  </i>
                  Cognome
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="LastName">
                  <el-input v-model="formData.LastName" type="text" placeholder="Inserisci il cognome" class="modern-input" />
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
                    <span class="path3"></span>
                    <span class="path4"></span>
                  </i>
                  <span class="required">Email</span>
                  <i class="fas fa-exclamation-circle ms-1 fs-7 text-warning" data-bs-toggle="tooltip"
                    title="indirizzo email non valido"></i>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="Email">
                  <el-input v-model="formData.Email" placeholder="esempio@agenzia.com" class="modern-input" />
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
                    <span class="path3"></span>
                    <span class="path4"></span>
                    <span class="path5"></span>
                  </i>
                  <span class="required">Telefono</span>
                  <i class="fas fa-exclamation-circle ms-1 fs-7 text-warning" data-bs-toggle="tooltip"
                    title="numero di telefono non valido"></i>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="PhoneNumber">
                  <el-input v-model="formData.PhoneNumber" type="tel" placeholder="0123456789" class="modern-input" />
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
                    <span class="path3"></span>
                    <span class="path4"></span>
                    <span class="path5"></span>
                  </i>
                  <span>Cellulare</span>
                  <i class="fas fa-exclamation-circle ms-1 fs-7 text-warning" data-bs-toggle="tooltip"
                    title="numero di telefono non valido"></i>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="MobilePhone">
                  <el-input v-model="formData.MobilePhone" type="tel" placeholder="3331234567" class="modern-input" />
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
                    <span class="path5"></span>
                    <span class="path6"></span>
                    <span class="path7"></span>
                    <span class="path8"></span>
                  </i>
                  Referente
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="referent">
                  <el-input v-model="formData.Referent" type="text" placeholder="Nome del referente" class="modern-input" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Billing toggle-->
              <div class="fw-bold fs-4 rotate collapsible mb-7 p-4" data-bs-toggle="collapse"
                href="#kt_modal_add_agency_billing_info" role="button" aria-expanded="false"
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
              <div id="kt_modal_add_agency_billing_info" class="collapse show">
                <!--begin::Input group-->
                <div class="d-flex flex-column mb-7 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-3 text-gray-800">
                    <i class="ki-duotone ki-geolocation fs-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                      <span class="path3"></span>
                      <span class="path4"></span>
                    </i>
                    Indirizzo
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="addressLine">
                    <el-input v-model="formData.Address" placeholder="Via, numero civico" class="modern-input" />
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
                      <span class="path3"></span>
                      <span class="path4"></span>
                    </i>
                    Comune
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="Town">
                    <el-input v-model="formData.Town" placeholder="Nome del comune" class="modern-input" />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="row g-9 mb-7">
                  <!--begin::Col-->
                  <div class="col-md-6 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-bold mb-3 text-gray-800">
                      <i class="ki-duotone ki-map fs-5 me-2 text-primary">
                        <span class="path1"></span>
                        <span class="path2"></span>
                        <span class="path3"></span>
                        <span class="path4"></span>
                      </i>
                      Provincia
                    </label>
                    <!--end::Label-->

                    <!--begin::Input-->
                    <el-form-item prop="state">
                      <el-input v-model="formData.Region" placeholder="Es. MI, RM, NA" class="modern-input" />
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                  <!--end::Col-->

                  <!--begin::Col-->
                  <div class="col-md-6 fv-row">
                    <!--begin::Label-->
                    <label class="fs-6 fw-bold mb-3 text-gray-800">
                      <i class="ki-duotone ki-palette fs-5 me-2 text-primary">
                        <span class="path1"></span>
                        <span class="path2"></span>
                        <span class="path3"></span>
                        <span class="path4"></span>
                        <span class="path5"></span>
                      </i>
                      Colore
                    </label>
                    <!--end::Label-->

                    <!--begin::Input-->
                    <el-form-item prop="color">
                      <el-input v-model="formData.Color" type="color" class="modern-color-input" style="height: 40px; border-radius: 0.75rem;" />
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
              id="kt_modal_update_agency_cancel" 
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
              v-if="user.Role == 'Admin'" 
              type="button" 
              @click="deleteItem" 
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

            <!--begin::Button-->
            <button 
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
        </el-form>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, watch } from "vue";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { updateAgency, Agency, getAgency, deleteAgency } from "@/core/data/agencies";
import { useAuthStore, type User } from "@/stores/auth";

export default defineComponent({
  name: "update-agency-modal",
  components: {},
  props: {
    Id:
    {
      type: String,
      Required: true
    }
  },
  setup(props, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const updateAgencyModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const store = useAuthStore();
    const user = store.user;
    const formData = ref<Agency>({
      Id: "",
      Name: "",
      LastName: "",
      Email: "",
      PhoneNumber: null,
      MobilePhone: null,
      Referent: "",
      Address: "",
      Town: "",
      Region: "",
      Password: "",
      EmailConfirmed: null,
      Color: ""
    });

    watch(() => props.Id, async (first, second) => {
      if (first) {
        formData.value = await getAgency(props.Id)
      }
      else {
        formData.value = null;
      }
    })

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

    const submit = () => {
      if (!formRef.value) {
        return;
      }
      formRef.value.validate(async (valid: boolean) => {
        if (valid) {
          loading.value = true;
          await updateAgency(formData.value)
          
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
              hideModal(updateAgencyModalRef.value);
              emit('formUpdateSubmitted', formData.value);
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
        } else {
          loading.value = false;
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

     const deleteItem = async () => {
      
          loading.value = true;
          await deleteAgency(formData.value.Id)
          
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
              hideModal(updateAgencyModalRef.value);
              emit('formUpdateSubmitted', formData.value);
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
    };

    return {
      formData,
      rules,
      submit,
      deleteItem,
      formRef,
      loading,
      updateAgencyModalRef,
      getAssetPath,
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

/* Stili per color input */
:deep(.modern-color-input .el-input__wrapper) {
  background: #ffffff;
  border: 1px solid #e8f4ff;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(54, 153, 255, 0.1);
  transition: all 0.3s ease;
  padding: 0.5rem;
}

:deep(.modern-color-input .el-input__wrapper:hover) {
  border-color: #3699ff;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(54, 153, 255, 0.15);
}

:deep(.modern-color-input .el-input__wrapper.is-focus) {
  border-color: #3699ff;
  box-shadow: 0 0 0 0.2rem rgba(54, 153, 255, 0.15);
}

/* Hover effects per sezione collapsible */
.collapsible:hover {
  background: linear-gradient(135deg, #e8f4ff 0%, #f1f3ff 100%) !important;
  border-color: #3699ff !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(54, 153, 255, 0.15);
}

/* Hover effects per bottoni */
.btn:hover {
  transform: translateY(-2px);
  transition: all 0.3s ease;
}

/* Animazioni per icone */
.ki-duotone {
  transition: all 0.3s ease;
}

.collapsible:hover .ki-duotone {
  transform: scale(1.1);
}

/* Stili per labels */
label {
  transition: all 0.3s ease;
}

label:hover {
  color: #3699ff !important;
}

/* Stili per tooltip */
.fas.fa-exclamation-circle {
  transition: all 0.3s ease;
}

.fas.fa-exclamation-circle:hover {
  color: #ffa800 !important;
  transform: scale(1.2);
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

/* Bottone Primario (Crea/Salva) */
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

/* Bottone Elimina */
.btn-modal-danger {
  background: linear-gradient(135deg, #f64e60 0%, #d63447 100%);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(246, 78, 96, 0.35);
}

.btn-modal-danger:hover {
  background: linear-gradient(135deg, #d63447 0%, #b92838 100%);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(246, 78, 96, 0.5);
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

/* Animazione shake */
@keyframes shake {
  0%, 100% { transform: rotate(0deg) scale(1.15); }
  25% { transform: rotate(-5deg) scale(1.15); }
  75% { transform: rotate(5deg) scale(1.15); }
}

/* Spinner loading nei bottoni */
.btn-modal-primary .spinner-border-sm {
  width: 1rem;
  height: 1rem;
  border-width: 0.15rem;
}
</style>
