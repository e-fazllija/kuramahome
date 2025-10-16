<template>
  <div class="w-100">
      <!--begin::Heading-->
      <div class="mb-10 text-center">
        <!--begin::Title-->
      <h1 class="text-gray-800 mb-3">Crea un Account</h1>
        <!--end::Title-->

        <!--begin::Link-->
      <div class="text-muted fw-semobold fs-6">
        Hai già un account?
        <router-link to="/sign-in" class="link-primary fw-bold ms-1">
          Accedi qui
          </router-link>
        </div>
        <!--end::Link-->
      </div>
      <!--end::Heading-->

    <!--begin::Stepper-->
    <div class="stepper-wrapper mb-8">
      <div class="stepper-item" :class="{ 'active': currentStep >= 1, 'completed': currentStep > 1 }">
        <div class="step-counter">1</div>
        <div class="step-name">Dati Personali</div>
      </div>
      <div class="stepper-item" :class="{ 'active': currentStep >= 2, 'completed': currentStep > 2 }">
        <div class="step-counter">2</div>
        <div class="step-name">Info Aggiuntive</div>
      </div>
      <div class="stepper-item" :class="{ 'active': currentStep >= 3, 'completed': currentStep > 3 }">
        <div class="step-counter">3</div>
        <div class="step-name">Sicurezza</div>
      </div>
    </div>
    <!--end::Stepper-->

    <!--begin::Form-->
    <VForm
      class="form w-100"
      @submit="handleSubmit"
      :validation-schema="currentValidationSchema"
      v-slot="{ errors }"
      ref="formRef"
    >

      <!--begin::Step 1-->
      <div v-show="currentStep === 1">
        <div class="mb-8 text-center">
          <h3 class="text-gray-800 fw-bold mb-3">Informazioni Personali</h3>
          <p class="text-muted fs-6">Inserisci i tuoi dati personali</p>
        </div>

      <!--begin::Input group-->
      <div class="row fv-row mb-7">
        <!--begin::Col-->
        <div class="col-xl-6">
            <label class="form-label fw-bold text-gray-800 fs-6">Nome *</label>
          <Field
              v-model="formData.name"
            class="form-control form-control-lg form-control-solid"
            type="text"
            name="name"
            autocomplete="off"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="name" />
            </div>
          </div>
        </div>
        <!--end::Col-->

        <!--begin::Col-->
        <div class="col-xl-6">
            <label class="form-label fw-bold text-gray-800 fs-6">Cognome *</label>
          <Field
              v-model="formData.lastName"
            class="form-control form-control-lg form-control-solid"
            type="text"
              name="lastName"
            autocomplete="off"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
                <ErrorMessage name="lastName" />
              </div>
          </div>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-7">
          <label class="form-label fw-bold text-gray-800 fs-6">Email *</label>
        <Field
            v-model="formData.email"
          class="form-control form-control-lg form-control-solid"
          type="email"
          name="email"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="email" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
        <div class="fv-row mb-7">
          <label class="form-label fw-bold text-gray-800 fs-6">Telefono</label>
          <Field
            v-model="formData.phone"
            class="form-control form-control-lg form-control-solid"
            type="tel"
            name="phone"
            autocomplete="off"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="phone" />
            </div>
          </div>
        </div>
        <!--end::Input group-->
      </div>
      <!--end::Step 1-->

      <!--begin::Step 2-->
      <div v-show="currentStep === 2">
        <div class="mb-8 text-center">
          <h3 class="text-gray-800 fw-bold mb-3">Informazioni Aggiuntive</h3>
          <p class="text-muted fs-6">Questi campi sono opzionali</p>
        </div>

        <!--begin::Input group-->
        <div class="fv-row mb-7">
          <label class="form-label fw-bold text-gray-800 fs-6">Data di Nascita</label>
          <Field
            v-model="formData.birthDate"
            class="form-control form-control-lg form-control-solid"
            type="date"
            name="birthDate"
            autocomplete="off"
          />
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="fv-row mb-7">
          <label class="form-label fw-bold text-gray-800 fs-6">Indirizzo</label>
          <Field
            v-model="formData.address"
            class="form-control form-control-lg form-control-solid"
            type="text"
            name="address"
            autocomplete="off"
          />
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row fv-row mb-7">
          <div class="col-xl-6">
            <label class="form-label fw-bold text-gray-800 fs-6">Città</label>
            <Field
              v-model="formData.city"
              class="form-control form-control-lg form-control-solid"
              type="text"
              name="city"
              autocomplete="off"
            />
          </div>
          <div class="col-xl-6">
            <label class="form-label fw-bold text-gray-800 fs-6">CAP</label>
            <Field
              v-model="formData.zipCode"
              class="form-control form-control-lg form-control-solid"
              type="text"
              name="zipCode"
              autocomplete="off"
            />
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="fv-row mb-7">
          <label class="form-label fw-bold text-gray-800 fs-6">Note/Bio</label>
          <Field
            v-model="formData.bio"
            as="textarea"
            class="form-control form-control-lg form-control-solid"
            name="bio"
            rows="3"
            autocomplete="off"
          />
        </div>
        <!--end::Input group-->
      </div>
      <!--end::Step 2-->

      <!--begin::Step 3-->
      <div v-show="currentStep === 3">
        <div class="mb-8 text-center">
          <h3 class="text-gray-800 fw-bold mb-3">Sicurezza</h3>
          <p class="text-muted fs-6">Crea una password sicura per il tuo account</p>
        </div>

        <!--begin::Input group-->
        <div class="mb-7 fv-row" data-kt-password-meter="true">
        <!--begin::Wrapper-->
        <div class="mb-1">
          <!--begin::Label-->
            <label class="form-label fw-bold text-gray-800 fs-6">Password *</label>
          <!--end::Label-->

          <!--begin::Input wrapper-->
          <div class="position-relative mb-3">
            <Field
                v-model="formData.password"
              class="form-control form-control-lg form-control-solid"
              type="password"
              name="password"
              autocomplete="off"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="password" />
              </div>
            </div>
          </div>
          <!--end::Input wrapper-->
          <!--begin::Meter-->
          <div
            class="d-flex align-items-center mb-3"
            data-kt-password-meter-control="highlight"
          >
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
            ></div>
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
            ></div>
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
            ></div>
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px"
            ></div>
          </div>
          <!--end::Meter-->
        </div>
        <!--end::Wrapper-->
        <!--begin::Hint-->
        <div class="text-muted">
            Usa 8 o più caratteri con lettere, numeri e simboli.
        </div>
        <!--end::Hint-->
      </div>
      <!--end::Input group--->

      <!--begin::Input group-->
        <div class="fv-row mb-7">
          <label class="form-label fw-bold text-gray-800 fs-6">Conferma Password *</label>
        <Field
            v-model="formData.password_confirmation"
          class="form-control form-control-lg form-control-solid"
          type="password"
          name="password_confirmation"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="password_confirmation" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
        <div class="fv-row mb-7">
        <label class="form-check form-check-custom form-check-solid">
          <Field
              v-model="formData.toc"
            class="form-check-input"
            type="checkbox"
            name="toc"
            value="1"
          />
          <span class="form-check-label fw-semobold text-gray-700 fs-6">
              Accetto i
              <a href="#" class="ms-1 link-primary">Termini e Condizioni</a> *
          </span>
        </label>
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="toc" />
            </div>
          </div>
        </div>
        <!--end::Input group-->
      </div>
      <!--end::Step 3-->

      <!--begin::Actions-->
      <div class="d-flex justify-content-between">
        <button
          v-if="currentStep > 1"
          type="button"
          @click="previousStep"
          class="btn btn-lg btn-light-primary"
        >
          <i class="ki-outline ki-arrow-left fs-3"></i>
          Indietro
        </button>
        <div v-else></div>

        <button
          v-if="currentStep < 3"
          type="button"
          @click="nextStep"
          class="btn btn-lg btn-primary"
        >
          Avanti
          <i class="ki-outline ki-arrow-right fs-3"></i>
        </button>

        <button
          v-else
          type="submit"
          ref="submitButton"
          class="btn btn-lg btn-primary"
        >
          <span class="indicator-label">
            Completa Registrazione
          </span>
          <span class="indicator-progress">
            Attendere...
            <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
          </span>
        </button>
      </div>
      <!--end::Actions-->
    </VForm>
    <!--end::Form-->
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, nextTick, onMounted, ref, computed, reactive } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { useAuthStore, type User } from "@/stores/auth";
import { useRouter } from "vue-router";
import { PasswordMeterComponent } from "@/assets/ts/components";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "sign-up",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  setup() {
    const store = useAuthStore();
    const router = useRouter();

    const submitButton = ref<HTMLButtonElement | null>(null);
    const formRef = ref<InstanceType<typeof VForm> | null>(null);
    const currentStep = ref(1);

    // Form data
    const formData = reactive({
      name: "",
      lastName: "",
      email: "",
      phone: "",
      birthDate: "",
      address: "",
      city: "",
      zipCode: "",
      bio: "",
      password: "",
      password_confirmation: "",
      toc: false,
    });

    // Validation schemas per step
    const step1Schema = Yup.object().shape({
      name: Yup.string().required("Il nome è obbligatorio").label("Nome"),
      lastName: Yup.string().required("Il cognome è obbligatorio").label("Cognome"),
      email: Yup.string().required("L'email è obbligatoria").email("Inserisci un'email valida").label("Email"),
      phone: Yup.string().nullable().label("Telefono"),
    });

    const step2Schema = Yup.object().shape({
      birthDate: Yup.string().nullable().label("Data di Nascita"),
      address: Yup.string().nullable().label("Indirizzo"),
      city: Yup.string().nullable().label("Città"),
      zipCode: Yup.string().nullable().label("CAP"),
      bio: Yup.string().nullable().label("Bio"),
    });

    const step3Schema = Yup.object().shape({
      password: Yup.string()
        .required("La password è obbligatoria")
        .min(8, "La password deve contenere almeno 8 caratteri")
        .label("Password"),
      password_confirmation: Yup.string()
        .required("Conferma la password")
        .oneOf([Yup.ref("password")], "Le password non coincidono")
        .label("Conferma Password"),
      toc: Yup.boolean()
        .oneOf([true], "Devi accettare i termini e condizioni")
        .required("Devi accettare i termini e condizioni"),
    });

    // Get current validation schema based on step
    const currentValidationSchema = computed(() => {
      switch (currentStep.value) {
        case 1:
          return step1Schema;
        case 2:
          return step2Schema;
        case 3:
          return step3Schema;
        default:
          return step1Schema;
      }
    });

    onMounted(() => {
      nextTick(() => {
        PasswordMeterComponent.bootstrap();
      });
    });

    // Navigate to next step
    const nextStep = async () => {
      if (formRef.value) {
        const { valid } = await formRef.value.validate();
        if (valid) {
          currentStep.value++;
          // Scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    // Navigate to previous step
    const previousStep = () => {
      if (currentStep.value > 1) {
        currentStep.value--;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    // Handle form submission
    const handleSubmit = async () => {
      if (formRef.value) {
        const { valid } = await formRef.value.validate();
        if (!valid) return;
      }

      // Clear existing errors
      store.logout();

      // eslint-disable-next-line
      submitButton.value!.disabled = true;

      // Activate indicator
      submitButton.value?.setAttribute("data-kt-indicator", "on");

      // Prepare data for API - mappato ai campi del backend
      const userData = {
        FirstName: formData.name,           // Backend si aspetta FirstName
        LastName: formData.lastName,
        Email: formData.email,              // Backend si aspetta Email con maiuscola
        PhoneNumber: formData.phone,        // Backend si aspetta PhoneNumber
        Password: formData.password,        // Backend si aspetta Password con maiuscola
        Role: "Agency",                     // Campo obbligatorio - default Agency
        Address: formData.address || "",    // Required nel backend
        City: formData.city || "",          // Required nel backend
        MobilePhone: formData.phone,        // Campo opzionale
        UserName: formData.lastName + formData.name,  // Costruito qui per evitare problemi
        // Campi opzionali/extra
        birthDate: formData.birthDate,
        zipCode: formData.zipCode,
        bio: formData.bio,
      };

      // Send registration request
      await store.register(userData as any);

      const error = store.errors;

      if (!error) {
        // Log per modalità test
        console.log('========================================');
        console.log('MODALITÀ TEST ATTIVA');
        console.log('Controlla la console del BACKEND per il link di conferma!');
        console.log('Email registrata:', formData.email);
        console.log('========================================');

        Swal.fire({
          title: "Registrazione Completata!",
          html: `
            <p class="mb-3">Il tuo account è stato creato con successo.</p>
            <div class="alert alert-warning d-flex align-items-center mt-4 mb-4" role="alert" style="background-color: #fff4de; border: 1px solid #ffa800;">
              <i class="ki-duotone ki-information-5 fs-2x text-warning me-3">
                <span class="path1"></span>
                <span class="path2"></span>
                <span class="path3"></span>
              </i>
              <div class="text-start">
                <strong>MODALITÀ TEST</strong><br>
                <span style="font-size: 0.9em;">Controlla la <strong>console del backend</strong> per il link di conferma email.</span>
              </div>
            </div>
            <p class="text-muted" style="font-size: 0.9em;">
              Email: <strong>${formData.email}</strong>
            </p>
          `,
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "OK, Ho Capito",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-primary",
          },
        }).then(function () {
          // Non reindirizzare automaticamente, l'utente deve usare il link dalla console
          // router.push({ name: "sign-in" });
        });
      } else {
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

      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
      submitButton.value!.disabled = false;
    };

    return {
      currentStep,
      formData,
      formRef,
      currentValidationSchema,
      nextStep,
      previousStep,
      handleSubmit,
      submitButton,
      getAssetPath,
    };
  },
});
</script>
