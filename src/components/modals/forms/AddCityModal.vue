<template>
  <div class="modal fade" id="kt_modal_add_city" ref="addCityModalRef" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content card-palette" style="border-radius: 0.95rem; box-shadow: 0 10px 30px var(--bs-shadow-color);">
        <div class="modal-header card-palette-header" id="kt_modal_add_city_header" style="background: linear-gradient(135deg, rgba(0, 119, 204, 0.1) 0%, rgba(0, 119, 204, 0.05) 100%); border-radius: 0.95rem 0.95rem 0 0;">
          <div class="d-flex align-items-center">
            <div class="symbol symbol-40px me-3">
              <span class="symbol-label" style="background: linear-gradient(135deg, #0077CC 0%, #0077CC 100%); box-shadow: 0 4px 12px rgba(0, 119, 204, 0.3);">
                <i class="ki-duotone ki-building fs-2 text-white">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </span>
            </div>
            <div>
              <h2 class="fw-bold m-0 text-palette-primary fs-3">Aggiungi Città</h2>
              <span class="text-palette-secondary fs-7 fw-semibold">Inserisci i dati della nuova città</span>
            </div>
          </div>
          <div
            id="kt_modal_add_city_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
            style="border-radius: 0.5rem; background: var(--bs-bg-primary); border: 1px solid var(--bs-border-color);"
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
                <label class="fs-6 fw-bold mb-3 text-palette-primary">
                  <i class="ki-duotone ki-building fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <span class="required">Nome Città</span>
                </label>
                <input
                  type="text"
                  v-model="formData.Name"
                  class="form-control modern-input form-control-palette"
                  placeholder="Inserisci il nome della città"
                  required
                />
              </div>
              <div class="fv-row mb-9">
                <label class="fs-6 fw-bold mb-3 text-palette-primary">
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