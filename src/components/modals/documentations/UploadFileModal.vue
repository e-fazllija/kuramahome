<template>
  <div
    class="modal fade"
    id="kt_modal_upload_file"
    ref="uploadFileModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <!--begin::Modal content-->
      <div class="modal-content card-palette modal-shell">
        <!--begin::Modal header-->
        <div class="modal-header card-palette-header modal-header-accent" id="kt_modal_upload_file_header">
          <!--begin::Modal title-->
          <div class="d-flex align-items-center">
            <div class="symbol symbol-40px me-3">
              <span class="symbol-label">
                <i class="ki-duotone ki-file-up fs-2 text-white">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </span>
            </div>
            <div>
              <h2 class="fw-bold m-0 text-gray-900 fs-3">📤 Carica File</h2>
              <span class="text-muted fs-7 fw-semibold">Un file alla volta, massimo 30 MB</span>
            </div>
          </div>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_upload_file_close"
            @click="closeModal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->

        <!--begin::Modal body-->
        <div class="modal-body py-10 px-lg-17">
          <div class="row g-4">
            <!--begin::Input group-->
            <div class="col-12 fv-row mb-7">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-3 text-gray-800">
                <i class="ki-duotone ki-file fs-5 me-2 text-primary">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
                Seleziona File
              </label>
              <!--end::Label-->

              <!--begin::Input-->
              <input 
                type="file" 
                ref="fileInputRef"
                @change="handleFileSelect"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.xls,.xlsx"
                class="form-control form-control-lg"
              />
              <div class="form-text mt-1">Dimensione massima: 30 MB. Un solo file per volta.</div>
              <!--end::Input-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="col-12 fv-row mb-7">
              <!--begin::Label-->
              <label class="fs-6 fw-bold mb-3 text-gray-800">
                <i class="ki-duotone ki-lock fs-5 me-2 text-primary">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                </i>
                Visibilità
              </label>
              <!--end::Label-->

              <!--begin::Input-->
              <div class="form-check form-switch form-check-custom form-check-solid">
                <input 
                  class="form-check-input" 
                  type="checkbox" 
                  v-model="isPrivateFile"
                  id="privateFileSwitch"
                />
                <label class="form-check-label" for="privateFileSwitch">
                  File Privato (visibile solo a te)
                </label>
              </div>
              <!--end::Input-->
            </div>
            <!--end::Input group-->
          </div>
        </div>
        <!--end::Modal body-->

        <!--begin::Modal footer-->
        <div class="modal-footer flex-center">
          <!--begin::Button-->
          <button
            type="button"
            id="kt_modal_upload_file_cancel"
            class="btn btn-secondary me-3"
            @click="closeModal"
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
            type="button"
            @click="handleUpload"
            :disabled="loading || !selectedFile"
          >
            <span v-if="!loading" class="d-flex align-items-center">
              <span class="btn-icon">
                <i class="ki-duotone ki-cloud-upload fs-3">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </span>
              <span class="btn-label">Carica File</span>
            </span>
            <span v-if="loading" class="d-flex align-items-center">
              <span class="spinner-border spinner-border-sm me-2"></span>
              <span class="btn-label">Caricamento...</span>
            </span>
          </button>
          <!--end::Button-->
        </div>
        <!--end::Modal footer-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, nextTick } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { Modal } from "bootstrap";
import Swal from "sweetalert2";

const MAX_FILE_SIZE_BYTES = 30 * 1024 * 1024; // 30 MB
const LIMIT_ERROR_MSG = "È stato superato il limite. Puoi caricare un solo file alla volta con dimensione massima di 30 MB.";

export default defineComponent({
  name: "upload-file-modal",
  components: {
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", "upload", "close"],
  setup(props, { emit }) {
    const uploadFileModalRef = ref<null | HTMLElement>(null);
    const fileInputRef = ref<null | HTMLInputElement>(null);
    const selectedFile = ref<File | null>(null);
    const isPrivateFile = ref<boolean>(false);
    let modalInstance: Modal | null = null;

    // Gestisci apertura/chiusura modale
    watch(
      () => props.modelValue,
      async (isOpen) => {
        await nextTick();
        if (uploadFileModalRef.value) {
          if (!modalInstance) {
            modalInstance = new Modal(uploadFileModalRef.value, {
              backdrop: true,
              keyboard: true,
            });
            
            // Listener per quando la modale viene chiusa
            uploadFileModalRef.value.addEventListener("hidden.bs.modal", () => {
              emit("update:modelValue", false);
              emit("close");
              // Reset quando la modale viene chiusa
              selectedFile.value = null;
              isPrivateFile.value = false;
              if (fileInputRef.value) {
                fileInputRef.value.value = "";
              }
            });
          }

          if (isOpen) {
            modalInstance.show();
          } else {
            modalInstance.hide();
          }
        }
      }
    );

    const handleFileSelect = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (!input?.files || input.files.length === 0) {
        selectedFile.value = null;
        return;
      }
      const file = input.files[0];
      if (file.size > MAX_FILE_SIZE_BYTES) {
        selectedFile.value = null;
        input.value = "";
        Swal.fire({
          text: LIMIT_ERROR_MSG,
          icon: "error",
          confirmButtonText: "Ok",
          buttonsStyling: false,
          customClass: { confirmButton: "btn btn-primary" },
        });
        return;
      }
      selectedFile.value = file;
    };

    const handleUpload = () => {
      if (!selectedFile.value) return;
      if (selectedFile.value.size > MAX_FILE_SIZE_BYTES) {
        Swal.fire({
          text: LIMIT_ERROR_MSG,
          icon: "error",
          confirmButtonText: "Ok",
          buttonsStyling: false,
          customClass: { confirmButton: "btn btn-primary" },
        });
        return;
      }
      emit("upload", {
        file: selectedFile.value,
        isPrivate: isPrivateFile.value,
      });
    };

    const closeModal = () => {
      if (modalInstance) {
        modalInstance.hide();
      } else {
        emit("update:modelValue", false);
        emit("close");
        hideModal(uploadFileModalRef.value);
      }
    };

    return {
      uploadFileModalRef,
      fileInputRef,
      selectedFile,
      isPrivateFile,
      handleFileSelect,
      handleUpload,
      closeModal,
    };
  },
});
</script>

