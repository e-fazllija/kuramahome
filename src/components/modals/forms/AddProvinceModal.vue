<template>
  <div class="modal fade" id="kt_modal_add_province" ref="addProvinceModalRef" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content" style="border-radius: 0.95rem; border: 1px solid #e9ecef; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);">
        <div class="modal-header" id="kt_modal_add_province_header" style="background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%); border-radius: 0.95rem 0.95rem 0 0; border-bottom: 1px solid #e9ecef;">
          <div class="d-flex align-items-center">
            <div class="symbol symbol-40px me-3">
              <span class="symbol-label" style="background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%); box-shadow: 0 4px 12px rgba(54, 153, 255, 0.3);">
                <i class="ki-duotone ki-map fs-2 text-white">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </span>
            </div>
            <div>
              <h2 class="fw-bold m-0 text-gray-900 fs-3">Aggiungi Provincia</h2>
              <span class="text-muted fs-7 fw-semibold">Inserisci i dati della nuova provincia</span>
            </div>
          </div>
          <div
            id="kt_modal_add_province_close"
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
                 id="kt_modal_add_province_scroll"
                 data-kt-scroll="true"
                 data-kt-scroll-activate="{default: false, lg: true}"
                 data-kt-scroll-max-height="auto"
                 data-kt-scroll-dependencies="#kt_modal_add_province_header"
                 data-kt-scroll-wrappers="#kt_modal_add_province_scroll"
                 data-kt-scroll-offset="300px">
              <div class="fv-row mb-9">
                <label class="fs-6 fw-bold mb-3 text-gray-800">
                  <i class="ki-duotone ki-map fs-5 me-2 text-primary">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <span class="required">Nome Provincia</span>
                </label>
                <input
                  type="text"
                  v-model="formData.Name"
                  class="form-control modern-input"
                  placeholder="Inserisci il nome della provincia"
                  required
                />
              </div>
            </div>
          </div>

          <div class="modal-footer flex-center" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 0 0 0.95rem 0.95rem; border-top: 1px solid #dee2e6; padding: 1.5rem 2rem;">
            <button
              type="button"
              id="kt_modal_add_province_cancel"
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
                <span class="btn-label">Aggiungi Provincia</span>
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
import { defineComponent, ref } from "vue";
import { createProvince, type ProvinceCreateModel } from "@/core/data/locations";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "AddProvinceModal",
  emits: ["province-added"],
  setup(props, { emit }) {
    const loading = ref<boolean>(false);
    const addProvinceModalRef = ref<null | HTMLElement>(null);
    const formData = ref<ProvinceCreateModel>({
      Name: "",
    });

    const handleSubmit = async () => {
      if (!formData.value.Name.trim()) {
        Swal.fire({
          text: "Il nome della provincia Ã¨ obbligatorio",
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
        await createProvince(formData.value);
        
        Swal.fire({
          text: "Provincia aggiunta con successo!",
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
          
          // Close modal
          hideModal(addProvinceModalRef.value);
          
          // Emit event
          emit("province-added");
          
          loading.value = false;
        });
      } catch (error) {
        loading.value = false;
        console.error("Errore nella creazione della provincia:", error);
        Swal.fire({
          text: "Errore nella creazione della provincia",
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

    return {
      loading,
      formData,
      handleSubmit,
      addProvinceModalRef,
    };
  },
});
</script>