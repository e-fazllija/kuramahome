<template>
  <!--begin::Basic info-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div class="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse"
      data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">Dettagli Profilo</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Content-->
    <div id="kt_account_profile_details" class="collapse show">
      <!--begin::Form-->
      <VForm id="kt_account_profile_details_form" class="form" novalidate @submit="saveChanges()"
        :validation-schema="profileDetailsValidator">
        <!--begin::Card body-->
        <div class="card-body border-top p-9">
          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6">Nome</label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Row-->
              <div class="row">
                <!--begin::Col-->
                <div class="col-lg-6 fv-row">
                  <Field type="text" name="Name" class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="Nome" v-model="profileDetails.Name" />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="Name" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div class="col-lg-6 fv-row">
                  <Field type="text" name="LastName" class="form-control form-control-lg form-control-solid"
                    placeholder="Cognome" v-model="profileDetails.LastName" />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="LastName" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6">Email</label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field type="text" name="Email" class="form-control form-control-lg form-control-solid"
                placeholder="Email" v-model="profileDetails.Email" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="Email" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">

            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6">Contatti telefonici</label>
            <!--end::Label-->
            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Row-->
              <div class="row">
                <div class="col-lg-6 fv-row">
                  <Field type="text" name="PhoneNumber"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="Telefono"
                    v-model="profileDetails.PhoneNumber" />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="PhoneNumber" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div class="col-lg-6 fv-row">
                  <Field type="text" name="MobilePhone" class="form-control form-control-lg form-control-solid"
                    placeholder="Cellulare" v-model="profileDetails.MobilePhone" />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="MobilePhone" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
              </div>
            </div>
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span class="required">Referente</span>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field type="text" name="Referent" class="form-control form-control-lg form-control-solid"
                placeholder="Referente" v-model="profileDetails.Referent" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="Referent" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">

            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6">Indirizzo</label>
            <!--end::Label-->
            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Row-->
              <div class="row">
                <!--begin::Col-->
                <div class="col-lg-4 fv-row">
                  <Field type="text" name="Address" class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="Indirizzo" v-model="profileDetails.Address" />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="Address" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div class="col-lg-4 fv-row">
                  <Field type="text" name="Town" class="form-control form-control-lg form-control-solid"
                    placeholder="Città" v-model="profileDetails.Town" />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="Town" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div class="col-lg-4 fv-row">
                  <Field type="text" name="Region" class="form-control form-control-lg form-control-solid"
                    placeholder="Regione" v-model="profileDetails.Region" />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="Region" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
              </div>
            </div>
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">Colore</label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field type="color" name="Color" class="form-control form-control-lg form-control-solid"
                placeholder="Colore" v-model="profileDetails.Color" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="Color" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
        </div>
        <!--end::Card body-->

        <!--begin::Actions-->
        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <button type="reset" class="btn btn-light btn-active-light-primary me-2">
            Reset
          </button>

          <button type="submit" id="kt_account_profile_details_submit" ref="submitButton1" class="btn btn-primary">
            <span class="indicator-label"> Salva </span>
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
    <!--end::Content-->
  </div>
  <!--end::Basic info-->

  <!--begin::Sign-in Method-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div class="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse"
      data-bs-target="#kt_account_signin_method">
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Credenziali di accesso</h3>
      </div>
    </div>
    <!--end::Card header-->

    <!--begin::Content-->
    <div id="kt_account_signin_method" class="collapse show">
      <!--begin::Card body-->
      <div class="card-body border-top p-9">
        <!--begin::Email Address-->
        <!-- <div class="d-flex flex-wrap align-items-center mb-8">
          <div id="kt_signin_email" :class="{ 'd-none': emailFormDisplay }">
            <div class="fs-4 fw-bolder mb-1">Email Address</div>
            <div class="fs-6 fw-semobold text-gray-600">
              support@keenthemes.com
            </div>
          </div>

          <div id="kt_signin_email_edit" :class="{ 'd-none': !emailFormDisplay }" class="flex-row-fluid">
            
            <VForm id="kt_signin_change_email" class="form" novalidate @submit="updateEmail()"
              :validation-schema="changeEmail">
              <div class="row mb-6">
                <div class="col-lg-6 mb-4 mb-lg-0">
                  <div class="fv-row mb-0">
                    <label for="emailaddress" class="form-label fs-6 fw-bold mb-3">Enter New Email Address</label>
                    <Field type="email" class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                      id="emailaddress" placeholder="Email Address" name="emailaddress"
                      value="support@keenthemes.com" />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="emailaddress" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="fv-row mb-0">
                    <label for="confirmemailpassword" class="form-label fs-6 fw-bold mb-3">Confirm Password</label>
                    <Field type="password" class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                      name="confirmemailpassword" id="confirmemailpassword" />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="confirmemailpassword" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <button id="kt_signin_submit" type="submit" ref="updateEmailButton" class="btn btn-primary me-2 px-6">
                  <span class="indicator-label"> Update Email </span>
                  <span class="indicator-progress">
                    Attendere...
                    <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                </button>
                <button id="kt_signin_cancel" type="button" class="btn btn-color-gray-400 btn-active-light-primary px-6"
                  @click="emailFormDisplay = !emailFormDisplay">
                  Cancel
                </button>
              </div>
            </VForm>
          
          </div>
          <div id="kt_signin_email_button" :class="{ 'd-none': emailFormDisplay }" class="ms-auto">
            <button class="btn btn-light fw-bolder px-6" @click="emailFormDisplay = !emailFormDisplay">
              Change Email
            </button>
          </div>
        </div> -->
        <!--end::Email Address-->

        <!--begin::Password-->
        <div class="d-flex flex-wrap align-items-center mb-8">
          <div id="kt_signin_password" :class="{ 'd-none': passwordFormDisplay }">
            <div class="fs-4 fw-bolder mb-1">Password</div>
            <div class="fs-6 fw-semobold text-gray-600">************</div>
          </div>
          <div id="kt_signin_password_edit" class="flex-row-fluid" :class="{ 'd-none': !passwordFormDisplay }">
            <div class="fs-6 fw-semobold text-gray-600 mb-4">
              La password deve contenere 8 caratteri di cui una lettere maiuscola, un carattere speciale e un numero
            </div>

            <!--begin::Form-->
            <VForm id="kt_signin_change_password" class="form" novalidate @submit="updatePassword()"
              :validation-schema="changePassword">
              <div class="row mb-6">
                <div class="col-lg-4">
                  <div class="fv-row mb-0">
                    <label for="currentpassword" class="form-label fs-6 fw-bold mb-3">Password Attuale</label>
                    <Field type="password" class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                      name="currentpassword" id="currentpassword" />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="currentpassword" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="fv-row mb-0">
                    <label for="newpassword" class="form-label fs-6 fw-bold mb-3">Nuova Password</label>
                    <Field type="password" class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                      name="newpassword" id="newpassword" />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="newpassword" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="fv-row mb-0">
                    <label for="confirmpassword" class="form-label fs-6 fw-bold mb-3">Conferma Nuova Password</label>
                    <Field type="password" class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                      name="confirmpassword" id="confirmpassword" v-model="newPassword" />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="confirmpassword" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <button id="kt_password_submit" type="submit" ref="updatePasswordButton"
                  class="btn btn-primary me-2 px-6">
                  <span class="indicator-label"> Aggiorna Password </span>
                  <span class="indicator-progress">
                    Attendere...
                    <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                </button>
                <button id="kt_password_cancel" type="button" @click="passwordFormDisplay = !passwordFormDisplay"
                  class="btn btn-color-gray-400 btn-active-light-primary px-6">
                  Cancel
                </button>
              </div>
            </VForm>
            <!--end::Form-->
          </div>
          <div id="kt_signin_password_button" class="ms-auto" :class="{ 'd-none': passwordFormDisplay }">
            <button @click="passwordFormDisplay = !passwordFormDisplay, sendLink()" class="btn btn-light fw-bolder">
              Resetta Password
            </button>
          </div>
        </div>
        <!--end::Password-->
      </div>
      <!--end::Card body-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Sign-in Method-->

</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import { Agent, updateAgent } from "@/core/data/agents"
import { useAuthStore, type User } from "@/stores/auth";

export default defineComponent({
  name: "account-settings",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  props: {
    profileDetails:
    {
      type: Object,
      Required: true
    }
  },
  emits: ["formUpdateSubmitted"],
  setup(props, { emit }) {
    const profileDetails = props.profileDetails;
    const store = useAuthStore();
    const submitButton1 = ref<HTMLElement | null>(null);
    const submitButton2 = ref<HTMLElement | null>(null);
    const submitButton3 = ref<HTMLElement | null>(null);
    const submitButton4 = ref<HTMLElement | null>(null);
    const submitButton5 = ref<HTMLElement | null>(null);
    const updateEmailButton = ref<HTMLElement | null>(null);
    const updatePasswordButton = ref<HTMLElement | null>(null);

    const emailFormDisplay = ref(false);
    const passwordFormDisplay = ref(false);
    const resetPasswordToken = ref<string>();
    const newPassword = ref<string>();
    const profileDetailsValidator = Yup.object().shape({
      Name: Yup.string().required().label("Name"),
      LastName: Yup.string().required().label("LastName"),
      PhoneNumber: Yup.string().required().label("PhoneNumber"),
      MobilePhone: Yup.string().label("MobilePhone"),
      Referent: Yup.string().label("Referent"),
      Address: Yup.string().required().label("Address"),
      Town: Yup.string().required().label("Town"),
      Region: Yup.string().label("Region"),
      Color: Yup.string().label("Color"),
    });

    const changeEmail = Yup.object().shape({
      emailaddress: Yup.string().required().email().label("Email"),
      confirmemailpassword: Yup.string().required().label("Password"),
    });

    const changePassword = Yup.object().shape({
      currentpassword: Yup.string().required().label("Current password"),
      newpassword: Yup.string().min(4).required().label("Password"),
      confirmpassword: Yup.string()
        .min(4)
        .required()
        .oneOf([Yup.ref("newpassword")], "Le password devono essere uguali")
        .label("Password Confirmation"),
    });

    const saveChanges = async () => {
      if (submitButton1.value) {
        // Activate indicator
        submitButton1.value.setAttribute("data-kt-indicator", "on");

        await updateAgent(profileDetails)
          .then(() => {
            Swal.fire({
              text: "Continua!",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Continua!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn btn-primary",
              },
            })
            submitButton1.value?.removeAttribute("data-kt-indicator");
            emit('formUpdateSubmitted', profileDetails);
          })
          .catch(({ response }) => {
            console.log(response);
            Swal.fire({
              text: "Attenzione, si è verificato un errore.",
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Continua!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn btn-primary",
              },
            });
          });
      }
    };

    const updateEmail = () => {
      if (updateEmailButton.value) {
        // Activate indicator
        updateEmailButton.value.setAttribute("data-kt-indicator", "on");

        setTimeout(() => {
          updateEmailButton.value?.removeAttribute("data-kt-indicator");

          emailFormDisplay.value = false;
        }, 2000);
      }
    };

    const sendLink = async () => {
      updatePasswordButton.value.setAttribute("data-kt-indicator", "on");
      resetPasswordToken.value = await store.sendResetLink(profileDetails.Email)
      updatePasswordButton.value?.removeAttribute("data-kt-indicator");
    }

    const updatePassword = () => {
      if (updatePasswordButton.value) {
        // Activate indicator
        updatePasswordButton.value.setAttribute("data-kt-indicator", "on");

        store.resetPassword(profileDetails.Email, resetPasswordToken.value, newPassword.value)
        .then(() => {
            Swal.fire({
              text: "Continua!",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Continua!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn btn-primary",
              },
            })
            updatePasswordButton.value?.removeAttribute("data-kt-indicator");
            emit('formUpdateSubmitted', profileDetails);
          })
          .catch(({ response }) => {
            console.log(response);
            Swal.fire({
              text: "Attenzione, si è verificato un errore.",
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Continua!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn btn-primary",
              },
            });
          });

        }
    };

    return {
      submitButton1,
      submitButton2,
      submitButton3,
      submitButton4,
      submitButton5,
      saveChanges,
      profileDetails,
      emailFormDisplay,
      passwordFormDisplay,
      profileDetailsValidator,
      changeEmail,
      changePassword,
      updateEmailButton,
      updatePasswordButton,
      updateEmail,
      updatePassword,
      getAssetPath,
      sendLink,
      newPassword
    };
  },
});
</script>
