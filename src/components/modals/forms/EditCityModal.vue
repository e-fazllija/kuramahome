<template>
  <div class="modal fade show" style="display: block;" id="kt_modal_edit_city" ref="editCityModalRef" tabindex="-1" aria-hidden="true">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_edit_city_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Modifica Città</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div id="kt_modal_edit_city_close" @click="closeModal" class="btn btn-icon btn-sm btn-active-icon-primary">
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
            <div class="scroll-y me-n7 pe-7" id="kt_modal_edit_city_scroll" data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_edit_city_header"
              data-kt-scroll-wrappers="#kt_modal_edit_city_scroll" data-kt-scroll-offset="300px">

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="fs-6 fw-semobold mb-2">
                  <span class="required">Nome Città</span>
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <el-form-item prop="Name">
                  <el-input v-model="formData.Name" type="text" placeholder="Inserisci il nome della città" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="d-flex flex-column mb-5 fv-row">
                <!--begin::Label-->
                <label class="fs-6 fw-semobold mb-2">
                  <span class="required">Provincia</span>
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <el-form-item prop="ProvinceId">
                  <el-select 
                    v-model="formData.ProvinceId" 
                    placeholder="Seleziona una provincia" 
                    class="w-100"
                    :loading="provincesLoading"
                    clearable
                  >
                    <el-option
                      v-for="province in provinces"
                      :key="province.Id"
                      :label="province.Name"
                      :value="province.Id"
                    />
                  </el-select>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button type="button" @click="closeModal" class="btn btn-light me-3">
              Annulla
            </button>
            <!--end::Button-->

            <!--begin::Button-->
            <button :data-kt-indicator="loading ? 'on' : null" class="btn btn-lg btn-primary" type="submit">
              <span v-if="!loading" class="indicator-label">
                Salva
                <KTIcon icon-name="arrow-right" icon-class="fs-2 me-2 me-0" />
              </span>
              <span v-if="loading" class="indicator-progress">
                Attendere...
                <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
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
  <!--begin::Modal backdrop-->
  <div class="modal-backdrop fade show"></div>
  <!--end::Modal backdrop-->
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { 
  updateCity, 
  type CityUpdateModel, 
  type City,
  getAllProvinces,
  type Province
} from "@/core/data/locations";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "edit-city-modal",
  props: {
    city: {
      type: Object as () => City,
      required: true,
    },
  },
  setup(props, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const editCityModalRef = ref<null | HTMLElement>(null);
    const store = useAuthStore();
    const loading = ref<boolean>(false);
    const provincesLoading = ref<boolean>(false);
    const provinces = ref<Province[]>([]);

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

    onMounted(() => {
      loadProvinces();
    });

    const formData = ref<CityUpdateModel>({
      Id: 0,
      Name: "",
      ProvinceId: 0,
    });

    const rules = ref({
      Name: [
        {
          required: true,
          message: "Il nome della città è obbligatorio",
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
    });

    // Watch for city prop changes
    watch(() => props.city, (newCity) => {
      if (newCity) {
        formData.value = {
          Id: newCity.Id,
          Name: newCity.Name,
          ProvinceId: newCity.ProvinceId,
        };
      }
    }, { immediate: true });

    const closeModal = () => {
      emit('modal-closed');
    };

    const submit = async () => {
      if (!formRef.value) {
        return;
      }

      await formRef.value.validate(async (valid: boolean) => {
        if (valid) {
          loading.value = true;
          
          try {
            const result = await updateCity(formData.value);
            
            if (result) {
              Swal.fire({
                text: "Città aggiornata con successo!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Continua!",
                heightAuto: false,
                customClass: {
                  confirmButton: "btn fw-semobold btn-light-primary",
                },
              }).then(function () {
                loading.value = false;
                emit('city-updated');
                closeModal();
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
            console.error("Errore nell'aggiornamento della città:", error);
          }
        }
      });
    };

    return {
      formRef,
      editCityModalRef,
      formData,
      rules,
      loading,
      provinces,
      provincesLoading,
      submit,
      closeModal,
    };
  },
});
</script> 