<template>
  <div class="modal fade" id="kt_modal_add_city" ref="addCityModalRef" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content" style="border-radius: 0.95rem; border: 1px solid #e9ecef; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);">
        <div class="modal-header" id="kt_modal_add_city_header" style="background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%); border-radius: 0.95rem 0.95rem 0 0; border-bottom: 1px solid #e9ecef;">
          <div class="d-flex align-items-center">
            <div class="symbol symbol-40px me-3">
              <span class="symbol-label" style="background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%); box-shadow: 0 4px 12px rgba(54, 153, 255, 0.3);">
                <i class="ki-duotone ki-building fs-2 text-white">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </span>
            </div>
            <div>
              <h2 class="fw-bold m-0 text-gray-900 fs-3">Aggiungi Città</h2>
              <span class="text-muted fs-7 fw-semibold">Inserisci i dati della nuova città</span>
            </div>
          </div>
          <div
            id="kt_modal_add_city_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
            style="border-radius: 0.5rem; background: rgba(255, 255, 255, 0.8); border: 1px solid #e9ecef;"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="form">
          <div class="modal-body py-10 px-lg-17">
            <div class="scroll-y me-n7 pe-7" 
                 id="kt_modal_add_city_scroll"
                 data-kt-scroll="true"
                 data-kt-scroll-activate="{default: false, lg: true}"
                 data-kt-scroll-max-height="auto"
                 data-kt-scroll-dependencies="#kt_modal_add_city_header"
                 data-kt-scroll-wrappers="#kt_modal_add_city_scroll"
                 data-kt-scroll-offset="300px">
              <div class="fv-row mb-9">
                <label class="fs-6 fw-bold mb-3 text-gray-800">
                  <i class="ki-duotone ki-building fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <span class="required">Nome Città</span>
                </label>
                <input
                  type="text"
                  v-model="formData.Name"
                  class="form-control modern-input"
                  placeholder="Inserisci il nome della città"
                  required
                />
              </div>
              <div class="fv-row mb-9">
                <label class="fs-6 fw-bold mb-3 text-gray-800">
                  <i class="ki-duotone ki-map fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <span class="required">Provincia</span>
                </label>
                <select
                  v-model="formData.ProvinceId"
                  class="form-select modern-select"
                  required
                >
                  <option value="">Seleziona una provincia</option>
                  <option v-for="province in provinces" :key="province.Id" :value="province.Id">
                    {{ province.Name }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="modal-footer flex-center" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 0 0 0.95rem 0.95rem; border-top: 1px solid #dee2e6; padding: 1.5rem 2rem;">
            <button
              type="button"
              id="kt_modal_add_city_cancel"
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
                <span class="btn-label">Aggiungi Città</span>
              </span>
              <span v-if="loading" class="d-flex align-items-center">
                <span class="spinner-border spinner-border-sm me-2"></span>
                <span class="btn-label">Attendere...</span>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { createCity, getAllProvinces, type CityCreateModel, type Province } from "@/core/data/locations";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "AddCityModal",
  emits: ["city-added"],
  setup(props, { emit }) {
    const loading = ref<boolean>(false);
    const addCityModalRef = ref<null | HTMLElement>(null);
    const provinces = ref<Province[]>([]);
    const formData = ref<CityCreateModel>({
      Name: "",
      ProvinceId: 0,
    });

    const loadProvinces = async () => {
      try {
        provinces.value = await getAllProvinces();
      } catch (error) {
        console.error("Errore nel caricamento delle province:", error);
      }
    };

    const handleSubmit = async () => {
      if (!formData.value.Name.trim()) {
        Swal.fire({
          text: "Il nome della città è obbligatorio",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
        return;
      }

      if (!formData.value.ProvinceId) {
        Swal.fire({
          text: "La provincia è obbligatoria",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
        return;
      }

      try {
        loading.value = true;
        await createCity(formData.value);
        
        Swal.fire({
          text: "Città aggiunta con successo!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Continua!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-primary",
          },
        }).then(function () {
          // Reset form
          formData.value.Name = "";
          formData.value.ProvinceId = 0;
          
          // Close modal
          hideModal(addCityModalRef.value);
          
          // Emit event
          emit("city-added");
          
          loading.value = false;
        });
      } catch (error) {
        loading.value = false;
        console.error("Errore nella creazione della città:", error);
        Swal.fire({
          text: "Errore nella creazione della città",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          heightAuto: false,
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
      }
    };

    onMounted(() => {
      loadProvinces();
    });

    return {
      loading,
      provinces,
      formData,
      handleSubmit,
      addCityModalRef,
    };
  },
});
</script>

<style scoped>
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

/* Stili per input moderni */
.modern-input {
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

.modern-input:hover {
  background: linear-gradient(135deg, #e8f4ff 0%, #f1f3ff 100%);
  border-color: #3699ff;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(54, 153, 255, 0.15);
}

.modern-input:focus {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-color: #3699ff;
  box-shadow: 0 0 0 0.2rem rgba(54, 153, 255, 0.15), 0 4px 12px rgba(54, 153, 255, 0.2);
  transform: translateY(-1px);
  outline: none;
}

.modern-input::placeholder {
  color: #a1a5b7;
  font-style: italic;
}

/* Stili per labels */
label {
  transition: all 0.3s ease;
}

label:hover {
  color: #3699ff !important;
}

/* Icone */
.ki-duotone {
  transition: all 0.3s ease;
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
</style>  