<template>
  <div class="modal fade" id="kt_modal_add_location" ref="addLocationModalRef" tabindex="-1" aria-hidden="true">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content" style="border-radius: 0.95rem; border: 1px solid #e9ecef; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_location_header" style="background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%); border-radius: 0.95rem 0.95rem 0 0; border-bottom: 1px solid #e9ecef;">
          <!--begin::Modal title-->
          <div class="d-flex align-items-center">
            <div class="symbol symbol-40px me-3">
              <span class="symbol-label" style="background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%); box-shadow: 0 4px 12px rgba(54, 153, 255, 0.3);">
                <i class="ki-duotone ki-geolocation fs-2 text-white">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </span>
            </div>
            <div>
              <h2 class="fw-bold m-0 text-gray-900 fs-3">Aggiungi Località</h2>
              <span class="text-muted fs-7 fw-semibold">Inserisci i dati della nuova località</span>
            </div>
          </div>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_location_close"
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
        <el-form @submit.prevent="submit()" :model="formData" :rules="rules" ref="formRef">
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div class="scroll-y me-n7 pe-7" id="kt_modal_add_location_scroll" data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_location_header"
              data-kt-scroll-wrappers="#kt_modal_add_location_scroll" data-kt-scroll-offset="300px">

              <!--begin::Input group-->
              <div class="fv-row mb-9">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-3 text-gray-800">
                  <i class="ki-duotone ki-geolocation fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <span class="required">Nome Località</span>
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <el-form-item prop="Name">
                  <el-input 
                    v-model="formData.Name" 
                    type="text" 
                    class="modern-input"
                    placeholder="Inserisci il nome della località" 
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-3 text-gray-800">
                  <i class="ki-duotone ki-map fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <span class="required">Provincia</span>
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <select 
                  class="form-select modern-select" 
                  v-model="formData.ProvinceId"
                  @change="handleProvinceChange"
                >
                  <option value="0">🗺️ Seleziona provincia</option>
                  <option v-for="province in provinces" :key="province.Id" :value="province.Id">
                    {{ province.Name }}
                  </option>
                </select>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-3 text-gray-800">
                  <i class="ki-duotone ki-building fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <span class="required">Città</span>
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <select 
                  class="form-select modern-select" 
                  v-model="formData.CityId"
                  :disabled="!formData.ProvinceId"
                >
                  <option value="0">🏙️ Seleziona città</option>
                  <option v-for="city in filteredCities" :key="city.Id" :value="city.Id">
                    {{ city.Name }}
                  </option>
                </select>
                <!--end::Input-->
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
              id="kt_modal_add_location_cancel"
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
                <span class="btn-label">Aggiungi Località</span>
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
import { defineComponent, ref, onMounted, computed } from "vue";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { 
  createLocation, 
  type LocationCreateModel, 
  getAllCities, 
  getAllProvinces,
  type City,
  type Province
} from "@/core/data/locations";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "add-location-modal",
  setup(_, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addLocationModalRef = ref<null | HTMLElement>(null);
    const store = useAuthStore();
    const loading = ref<boolean>(false);
    const citiesLoading = ref<boolean>(false);
    const provincesLoading = ref<boolean>(false);
    const cities = ref<City[]>([]);
    const provinces = ref<Province[]>([]);

    // Computed per filtrare le città in base alla provincia selezionata
    const filteredCities = computed(() => {
      if (!formData.value.ProvinceId) {
        return [];
      }
      return cities.value.filter(city => city.ProvinceId === formData.value.ProvinceId);
    });

    // Carica le province dal database
    const loadProvinces = async () => {
      provincesLoading.value = true;
      try {
        provinces.value = await getAllProvinces();
      } catch (error) {
        console.error("Errore nel caricamento delle province:", error);
      } finally {
        provincesLoading.value = false;
      }
    };

    // Carica le città dal database
    const loadCities = async () => {
      citiesLoading.value = true;
      try {
        cities.value = await getAllCities();
      } catch (error) {
        console.error("Errore nel caricamento delle città:", error);
      } finally {
        citiesLoading.value = false;
      }
    };

    // Gestisce il cambio di provincia
    const handleProvinceChange = () => {
      // Reset della città selezionata quando cambia la provincia
      formData.value.CityId = 0;
    };

    onMounted(() => {
      loadProvinces();
      loadCities();
    });

    const formData = ref<LocationCreateModel & { ProvinceId: number }>({
      Name: "",
      CityId: 0,
      ProvinceId: 0,
    });

    const rules = ref({
      Name: [
        {
          required: true,
          message: "Il nome della località è obbligatorio",
          trigger: "change",
        },
      ],
      ProvinceId: [
        {
          required: true,
          message: "La provincia è obbligatoria",
          trigger: "change",
        },
      ],
      CityId: [
        {
          required: true,
          message: "La città è obbligatoria",
          trigger: "change",
        },
      ],
    });

    const submit = async () => {
      if (!formRef.value) {
        return;
      }

      await formRef.value.validate(async (valid: boolean) => {
        if (valid) {
          loading.value = true;
          
          try {
            // Rimuovi ProvinceId dal formData prima di inviare
            const { ProvinceId, ...locationData } = formData.value;
            const result = await createLocation(locationData);
            
            if (result) {
              Swal.fire({
                text: "Località creata con successo!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Continua!",
                heightAuto: false,
                customClass: {
                  confirmButton: "btn fw-semobold btn-light-primary",
                },
              }).then(function () {
                loading.value = false;
                hideModal(addLocationModalRef.value);
                emit('location-added');
                
                // Reset form
                formData.value = {
                  Name: "",
                  CityId: 0,
                  ProvinceId: 0,
                };
              });
            } else {
              loading.value = false;
              const error = store.errors;
              Swal.fire({
                text: error || "Siamo spiacenti, sembra che siano stati rilevati alcuni errori, riprova.",
                icon: "error",
                buttonsStyling: false,
                confirmButtonText: "Ok, capito!",
                heightAuto: false,
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              });
            }
          } catch (error) {
            loading.value = false;
            console.error("Errore nella creazione della località:", error);
          }
        }
      });
    };

    return {
      formRef,
      addLocationModalRef,
      formData,
      rules,
      loading,
      cities,
      citiesLoading,
      provinces,
      provincesLoading,
      filteredCities,
      handleProvinceChange,
      submit,
    };
  },
});
</script>


<style scoped>
/* Modal */
.modal-content {
  overflow: hidden;
  animation: modalFadeIn 0.3s ease;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-header {
  position: relative;
  z-index: 1;
}

.modal-body {
  position: relative;
}

/* Focus trap */
.fv-row {
  transition: all 0.3s ease;
}

.fv-row:focus-within {
  transform: translateX(3px);
}

/* Scroll area */
.scroll-y {
  overflow-y: auto;
}

.scroll-y::-webkit-scrollbar {
  width: 8px;
}

.scroll-y::-webkit-scrollbar-track {
  background: #f1f3f4;
  border-radius: 10px;
}

.scroll-y::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.scroll-y::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #2b7ce6 0%, #0aa39a 100%);
}

/* Stili per input moderni */
:deep(.modern-input .el-input__wrapper) {
  background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%);
  border: 1px solid #e8f4ff;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(54, 153, 255, 0.1);
  transition: all 0.3s ease;
  padding: 0.75rem 1rem;
}

:deep(.modern-input .el-input__inner) {
  color: #3f4254;
  font-weight: 500;
  font-size: 0.95rem;
  background: transparent;
  border: none;
  outline: none;
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

/* Placeholder per input */
:deep(.modern-input .el-input__inner::placeholder) {
  color: #a1a5b7;
  font-weight: 400;
  font-style: italic;
}

/* Stili per el-form-item */
:deep(.el-form-item) {
  margin-bottom: 0;
}

:deep(.el-form-item__error) {
  color: #f64e60;
  font-size: 0.85rem;
  font-weight: 500;
  margin-top: 0.5rem;
}

/* Input con errore */
:deep(.el-form-item.is-error .el-input__wrapper) {
  border-color: #f64e60 !important;
  box-shadow: 0 0 0 0.2rem rgba(246, 78, 96, 0.15);
}

/* Input validato con successo */
:deep(.el-form-item.is-success .el-input__wrapper) {
  border-color: #1bc5bd;
}

/* Stili per labels */
label {
  transition: all 0.3s ease;
}

label:hover {
  color: #3699ff !important;
}

label .required::after {
  content: " *";
  color: #f64e60;
  font-weight: 700;
}

/* Icone */
.ki-duotone {
  transition: all 0.3s ease;
}

label:hover .ki-duotone {
  transform: scale(1.1);
}

/* Bottoni Modal Moderni */
.btn-modal-cancel,
.btn-modal-primary {
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
.btn-modal-primary::before {
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
.btn-modal-primary:hover::before {
  left: 100%;
}

.btn-modal-cancel .btn-icon,
.btn-modal-primary .btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.btn-modal-cancel .btn-label,
.btn-modal-primary .btn-label {
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

/* Bottone Primario */
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

/* Spinner loading */
.btn-modal-primary .spinner-border-sm {
  width: 1rem;
  height: 1rem;
  border-width: 0.15rem;
}

/* Stili per select moderni */
.modern-select {
  background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%);
  border: 1px solid #e8f4ff;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(54, 153, 255, 0.1);
  transition: all 0.3s ease;
  padding: 0.75rem 1rem;
  color: #3f4254;
  font-weight: 500;
  font-size: 0.95rem;
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
  outline: none;
}

.modern-select:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}
</style>  