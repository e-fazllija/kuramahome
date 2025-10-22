<template>
  <!--begin::Email Confirmation-->
  <div class="form w-100">
    <!--begin::Heading-->
    <div class="text-center mb-10">
      <!--begin::Title-->
      <h1 class="text-gray-800 mb-3">Conferma Email</h1>
      <!--end::Title-->
      
      <!--begin::Subtitle-->
      <div class="text-gray-400 fw-semobold fs-4">
        Verifica delle credenziali in corso...
      </div>
      <!--end::Subtitle-->
    </div>
    <!--end::Heading-->

    <!--begin::Loading State-->
    <div v-if="isLoading" class="text-center">
      <div class="mb-10">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Caricamento...</span>
        </div>
      </div>
      <div class="text-gray-600 fs-6">
        Attendere mentre verifichiamo le tue credenziali...
      </div>
    </div>
    <!--end::Loading State-->

    <!--begin::Success State-->
    <div v-else-if="isSuccess" class="text-center">
      <div class="mb-10">
        <i class="ki-duotone ki-check-circle fs-3x text-success">
          <span class="path1"></span>
          <span class="path2"></span>
        </i>
      </div>
      <div class="mb-10">
        <h2 class="text-success mb-3">Email Confermata!</h2>
        <p class="text-gray-600 fs-6">
          Le tue credenziali sono state attivate con successo. 
          Ora puoi accedere al tuo account.
        </p>
      </div>
      <div class="text-center">
        <router-link to="/sign-in" class="btn btn-lg btn-primary">
          Accedi al tuo Account
        </router-link>
      </div>
    </div>
    <!--end::Success State-->

    <!--begin::Error State-->
    <div v-else-if="isError" class="text-center">
      <div class="mb-10">
        <i class="ki-duotone ki-cross-circle fs-3x text-danger">
          <span class="path1"></span>
          <span class="path2"></span>
        </i>
      </div>
      <div class="mb-10">
        <h2 class="text-danger mb-3">Errore nella Conferma</h2>
        <p class="text-gray-600 fs-6 mb-5">
          {{ errorMessage }}
        </p>
      </div>
      <div class="text-center">
        <router-link to="/sign-up" class="btn btn-lg btn-light-primary me-3">
          Registrati di Nuovo
        </router-link>
        <router-link to="/sign-in" class="btn btn-lg btn-light">
          Torna al Login
        </router-link>
      </div>
    </div>
    <!--end::Error State-->
  </div>
  <!--end::Email Confirmation-->
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRoute } from 'vue-router';

export default defineComponent({
  name: "email-confirmation",
  setup() {
    const store = useAuthStore();
    const route = useRoute();
    
    // Reactive state
    const isLoading = ref(true);
    const isSuccess = ref(false);
    const isError = ref(false);
    const errorMessage = ref("");

    onBeforeMount(async () => {
      try {
        // Clear any existing errors
        store.setError("");
        
        // Get email and token from route params
        const email = route.params.email as string;
        const token = route.params.token as string;
        
        if (!email || !token) {
          throw new Error("Parametri di conferma mancanti");
        }

        // Verify credentials
        const response = await store.verifyCredentials(email, token);
        
        console.log("Response from verifyCredentials:", response);
        console.log("Response data:", response?.data);
        console.log("Store errors:", store.errors);
        
        // Check the response status
        if (response && response.data && response.data.Status === "Success") {
          console.log("Success: Email confirmed successfully");
          isSuccess.value = true;
        } else {
          console.log("Error: Invalid response or error in store");
          // Check if there was an error in the store
          const error = store.errors;
          if (error) {
            isError.value = true;
            errorMessage.value = error as string;
          } else {
            isError.value = true;
            errorMessage.value = "Risposta non valida dal server.";
          }
        }
      } catch (error) {
        console.error("Errore durante la verifica:", error);
        isError.value = true;
        errorMessage.value = "Si è verificato un errore durante la verifica delle credenziali. Riprova più tardi.";
      } finally {
        isLoading.value = false;
      }
    });

    return {
      isLoading,
      isSuccess,
      isError,
      errorMessage,
    };
  },
});
</script>