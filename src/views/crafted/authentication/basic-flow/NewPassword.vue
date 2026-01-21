<template>
  <!--begin::Form-->
  <VForm
    class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
    @submit="onSubmitNewPassword"
    id="kt_new_password_form"
    :validation-schema="newPasswordSchema"
  >
    <!--begin::Heading-->
    <div class="text-center mb-10">
      <!--begin::Title-->
      <h1 class="text-gray-800 mb-3">Imposta Nuova Password</h1>
      <!--end::Title-->

      <!--begin::Link-->
      <div class="text-gray-400 fw-semobold fs-4">
        Inserisci la tua nuova password
      </div>
      <!--end::Link-->
    </div>
    <!--end::Heading-->

    <!--begin::Input group-->
    <div class="fv-row mb-10">
      <label class="form-label fw-bold text-gray-800 fs-6">Nuova Password</label>
      <Field
        class="form-control form-control-solid"
        type="password"
        placeholder=""
        name="password"
        autocomplete="new-password"
      />
      <div class="fv-plugins-message-container">
        <div class="fv-help-block">
          <ErrorMessage name="password" />
        </div>
      </div>
    </div>
    <!--end::Input group-->

    <!--begin::Input group-->
    <div class="fv-row mb-10">
      <label class="form-label fw-bold text-gray-800 fs-6">Conferma Password</label>
      <Field
        class="form-control form-control-solid"
        type="password"
        placeholder=""
        name="confirmPassword"
        autocomplete="new-password"
      />
      <div class="fv-plugins-message-container">
        <div class="fv-help-block">
          <ErrorMessage name="confirmPassword" />
        </div>
      </div>
    </div>
    <!--end::Input group-->

    <!--begin::Password Requirements-->
    <div class="mb-10">
      <div class="text-gray-600 fs-7">
        <strong>Requisiti password:</strong>
        <ul class="mb-0 ps-4">
          <li>Almeno 8 caratteri</li>
          <li>Almeno una lettera maiuscola</li>
          <li>Almeno un numero</li>
          <li>Almeno un carattere speciale</li>
        </ul>
      </div>
    </div>
    <!--end::Password Requirements-->

    <!--begin::Actions-->
    <div class="d-flex flex-wrap justify-content-center pb-lg-0">
      <button
        type="submit"
        ref="submitButton"
        id="kt_new_password_submit"
        class="btn btn-lg btn-primary fw-bold me-4"
      >
        <span class="indicator-label"> Salva Password </span>
        <span class="indicator-progress">
          Attendere...
          <span
            class="spinner-border spinner-border-sm align-middle ms-2"
          ></span>
        </span>
      </button>

      <router-link to="/sign-in" class="btn btn-lg btn-light-primary fw-bold"
        >Annulla</router-link
      >
    </div>
    <!--end::Actions-->
  </VForm>
  <!--end::Form-->
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";
import * as Yup from "yup";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "new-password",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  setup() {
    const store = useAuthStore();
    const route = useRoute();
    const router = useRouter();

    const submitButton = ref<HTMLButtonElement | null>(null);
    const email = ref<string>("");
    const token = ref<string>("");

    onBeforeMount(() => {
      // Get email and token from route params
      email.value = route.params.email as string;
      token.value = route.params.token as string;

      if (!email.value || !token.value) {
        Swal.fire({
          text: "Link non valido. Richiedi un nuovo link per il reset della password.",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "OK",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        }).then(() => {
          router.push("/password-reset");
        });
      }
    });

    //Create form validation object
    const newPasswordSchema = Yup.object().shape({
      password: Yup.string()
        .min(8, "La password deve contenere almeno 8 caratteri")
        .matches(/[A-Z]/, "La password deve contenere almeno una lettera maiuscola")
        .matches(/[0-9]/, "La password deve contenere almeno un numero")
        .matches(/[^A-Za-z0-9]/, "La password deve contenere almeno un carattere speciale")
        .required("La password è obbligatoria")
        .label("Password"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Le password non corrispondono")
        .required("La conferma password è obbligatoria")
        .label("Conferma Password"),
    });

    //Form submit function
    const onSubmitNewPassword = async (values: any) => {
      if (!email.value || !token.value) {
        Swal.fire({
          text: "Link non valido. Richiedi un nuovo link per il reset della password.",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "OK",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        });
        return;
      }

      // eslint-disable-next-line
      submitButton.value!.disabled = true;
      // Activate loading indicator
      submitButton.value?.setAttribute("data-kt-indicator", "on");

      try {
        // Decodifica il token (sostituisce i caratteri speciali - usa replaceAll per tutte le occorrenze)
        const decodedToken = token.value.replace(/_/g, "/").replace(/&/g, "+");
        
        const result = await store.resetPassword(
          email.value,
          decodedToken,
          values.password
        );

        const error = store.errors;

        if (!error && result) {
          Swal.fire({
            text: "Password modificata con successo! Ora puoi accedere con la nuova password.",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Vai al Login",
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semobold btn-light-primary",
            },
          }).then(() => {
            router.push("/sign-in");
          });
        } else {
          Swal.fire({
            text: error as string || "Si è verificato un errore durante il reset della password.",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Riprova!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semobold btn-light-danger",
            },
          });
        }
      } catch (error) {
        Swal.fire({
          text: "Si è verificato un errore durante il reset della password. Riprova più tardi.",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "OK",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        });
      } finally {
        submitButton.value?.removeAttribute("data-kt-indicator");
        // eslint-disable-next-line
        submitButton.value!.disabled = false;
      }
    };

    return {
      onSubmitNewPassword,
      newPasswordSchema,
      submitButton,
    };
  },
});
</script>
