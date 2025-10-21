<template>
  <!-- Usa PricingModal come pagina standalone -->
  <PricingModal
    :isOpen="true"
    :email="userEmail"
    :token="verificationToken"
    :mode="mode"
    @close="handleModalClose"
    @success="handlePaymentSuccess"
  />
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PricingModal from '@/components/modals/PricingModal.vue';
import { useAuthStore } from '@/stores/auth';
import Swal from 'sweetalert2/dist/sweetalert2.js';

export default defineComponent({
  name: 'pricing-page',
  components: {
    PricingModal
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const authStore = useAuthStore();
    
    const userEmail = ref<string>('');
    const verificationToken = ref<string>('');
    const mode = ref<string>('new');

    const handleModalClose = () => {
      // Se l'utente chiude la modale dalla pagina pricing, torna alla home o login
      router.push({ name: "sign-in" });
    };

    const handlePaymentSuccess = async () => {
      // Aggiorna il token per assicurarsi che contenga le informazioni aggiornate dell'abbonamento
      try {
        await authStore.refreshToken();
      } catch (error) {
        console.warn('Errore durante l\'aggiornamento del token in handlePaymentSuccess:', error);
      }

      Swal.fire({
        title: "Pagamento completato!",
        text: "Il tuo abbonamento è stato attivato con successo.",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Vai alla Dashboard",
        heightAuto: false,
        customClass: {
          confirmButton: "btn fw-semobold btn-light-primary",
        },
      }).then(() => {
        router.push({ name: "dashboard" });
      });
    };

    // Verifica parametri all'arrivo sulla pagina
    onBeforeMount(async () => {
      const email = route.params.email as string;
      const token = route.params.token as string;

      if (!email || !token) {
        Swal.fire({
          text: "Link non valido. Parametri mancanti.",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Torna alla registrazione",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        }).then(() => {
          router.push({ name: "sign-up" });
        });
        return;
      }

      userEmail.value = email;
      verificationToken.value = token;
    });

    return {
      userEmail,
      verificationToken,
      mode,
      handleModalClose,
      handlePaymentSuccess,
    };
  },
});
</script>
