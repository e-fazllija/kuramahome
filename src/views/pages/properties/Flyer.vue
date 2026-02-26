<template>
  <div class="container-fluid px-0 px-md-3">
    <!--begin::Header Actions-->
    <div class="card card-palette mb-3 mb-md-5 mb-xl-10">
      <div class="card-body d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div class="d-flex align-items-center">
          <div class="symbol symbol-40px symbol-sm-45px me-2 me-md-3">
            <span class="symbol-label bg-primary">
              <i class="ki-duotone ki-file-down fs-2 fs-md-1 text-white">
                <span class="path1"></span>
                <span class="path2"></span>
                <span class="path3"></span>
                <span class="path4"></span>
              </i>
            </span>
          </div>
          <div>
            <h3 class="fw-bold m-0 text-palette-primary fs-4 fs-md-3">Locandina Immobile</h3>
            <span class="text-palette-secondary fs-8 fs-md-7 fw-semibold d-block mt-1">
              Stampa o condividi la locandina
            </span>
          </div>
        </div>
        <div class="d-flex gap-2 no-print">
          <button
            type="button"
            @click="handlePrint"
            class="btn btn-primary"
            :disabled="loading"
          >
            <i class="ki-duotone ki-file-down fs-4 me-2">
              <span class="path1"></span>
              <span class="path2"></span>
              <span class="path3"></span>
              <span class="path4"></span>
            </i>
            Genera PDF
          </button>
          <button
            type="button"
            @click="handleShare"
            class="btn btn-light-primary"
            :disabled="loading"
          >
            <i class="ki-duotone ki-abstract-26 fs-4 me-2">
              <span class="path1"></span>
              <span class="path2"></span>
              <span class="path3"></span>
              <span class="path4"></span>
            </i>
            Condividi
          </button>
        </div>
      </div>
    </div>

    <KTSpinner v-if="loading" :centered="true" size="md" />

    <!--begin::Flyer Content-->
    <div v-else class="d-flex justify-content-center">
      <div 
        class="property-flyer-container" 
        id="flyer-content"
        :data-property-code="flyerData?.propertyCode || ''"
        :data-property-title="flyerData?.property.Title || ''"
      >
        <!-- Logo al centro in alto -->
        <div class="property-flyer-logo">
          <img
            :src="getAssetPath('media/logos/kurama-home-logos/logo-menu.png')"
            alt="Logo"
            class="flyer-logo-img logo-light"
          />
          <img
            :src="getAssetPath('media/logos/kurama-home-logos/logo-menu-bianco.png')"
            alt="Logo"
            class="flyer-logo-img logo-dark"
          />
        </div>

        <!-- Sezione principale: due colonne -->
        <div class="property-flyer-main-section">
          <!-- Colonna sinistra: foto + dettagli casa -->
          <div class="property-flyer-left-column">
            <!-- Foto sinistra -->
            <div class="property-flyer-left-photo-wrapper">
              <img
                v-if="flyerData?.mainPhoto"
                :src="flyerData.mainPhoto.Url"
                alt="Foto immobile 1"
                class="property-flyer-photo"
                @error="handleImageError"
              />
              <div
                v-else
                class="property-flyer-photo-placeholder"
              >
                Nessuna foto disponibile
              </div>
            </div>

            <!-- Dettagli casa sotto la foto sinistra - Card con icone -->
            <div class="property-flyer-box property-flyer-box-left">
              <h2 class="property-flyer-box-title">Dettagli</h2>
              
              <!-- Griglia 2x3 con card dettagli -->
              <div class="property-flyer-detail-cards">
                <div
                  v-for="(card, index) in flyerData?.detailCards"
                  :key="index"
                  class="property-flyer-detail-card"
                >
                  <i class="ki-duotone" :class="`ki-${card.icon}`">
                    <span
                      v-for="pathNum in getIconPaths(card.icon)"
                      :key="pathNum"
                      :class="`path${pathNum}`"
                    ></span>
                  </i>
                  <span class="property-flyer-detail-card-text">{{ card.value }}</span>
                </div>
              </div>

              <div v-if="flyerData?.description" class="property-flyer-box-description">
                <p>{{ flyerData.description }}</p>
              </div>
            </div>
          </div>

          <!-- Colonna destra: foto + info + dettagli agente -->
          <div class="property-flyer-right-column">
            <!-- Foto destra -->
            <div class="property-flyer-right-photo-wrapper">
              <img
                v-if="flyerData?.secondPhoto"
                :src="flyerData.secondPhoto.Url"
                alt="Foto immobile 2"
                class="property-flyer-photo"
                @error="handleImageError"
              />
              <div
                v-else
                class="property-flyer-photo-placeholder"
              >
                Nessuna foto disponibile
              </div>
            </div>

            <!-- Info sotto la foto destra: Titolo, Codice, Prezzo, Indirizzo -->
            <div class="property-flyer-title-info">
              <h1 v-if="flyerData?.property.Title" class="property-flyer-main-title">
                {{ flyerData.property.Title }}
              </h1>
              <div v-if="flyerData?.propertyCode" class="property-flyer-main-code">
                Codice: {{ flyerData.propertyCode }}
              </div>
              <div class="property-flyer-price-section">
                <div v-if="flyerData?.priceReducedText" class="property-flyer-price-wrapper">
                  <span class="property-flyer-price-original">
                    {{ flyerData.priceText }}
                  </span>
                  <span class="property-flyer-price-reduced">
                    {{ flyerData.priceReducedText }}
                  </span>
                </div>
                <div v-else class="property-flyer-main-price">
                  {{ flyerData?.priceText || 'Trattativa riservata' }}
                </div>
              </div>
              <div v-if="flyerData?.fullAddress" class="property-flyer-box-item">
                <i class="ki-duotone ki-geolocation fs-5 me-2">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
                {{ flyerData.fullAddress }}
              </div>
            </div>

            <!-- Dettagli agente -->
            <div class="property-flyer-box property-flyer-box-right">
              <div v-if="flyerData?.agentData.name">
                <h2 class="property-flyer-box-title">Contatti</h2>
                
                <!-- Nome agente -->
                <div class="property-flyer-box-item" style="font-weight: bold; margin-bottom: 6mm; padding-bottom: 4mm; border-bottom: 1px solid #e0e0e0;">
                  <span style="font-size: 9pt; color: #666666; text-transform: uppercase; letter-spacing: 0.8px; margin-right: 4mm;">Agente</span>
                  {{ flyerData.agentData.name }}
                </div>
                
                <!-- Informazioni di contatto -->
                <!-- Indirizzo -->
                <div v-if="flyerData.agentData.address && flyerData.agentData.city" class="property-flyer-box-item">
                  <i class="ki-duotone ki-geolocation fs-5 me-2">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  {{ flyerData.agentData.address }}, {{ flyerData.agentData.city }}
                </div>
                
                <!-- Email -->
                <div v-if="flyerData.agentData.email" class="property-flyer-box-item">
                  <i class="ki-duotone ki-sms fs-5 me-2">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                  </i>
                  {{ flyerData.agentData.email }}
                </div>
                
                <!-- Telefono -->
                <div v-if="flyerData.agentData.phone" class="property-flyer-box-item">
                  <i class="ki-duotone ki-phone fs-5 me-2">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  {{ flyerData.agentData.phone }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--end::Flyer Content-->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { getRealEstateProperty, RealEstateProperty, getToInsert, InsertModel } from "@/core/data/properties";
import { getAssetPath } from "@/core/helpers/assets";
import {
  prepareFlyerData,
  downloadFlyerPDF,
  getWhatsAppText,
  getEmailText,
  type FlyerData,
} from "@/core/data/propertyFlyer";
import Swal from "sweetalert2/dist/sweetalert2.js";
import KTSpinner from "@/components/Spinner.vue";
import icons from "@/core/helpers/kt-icon/icons.json";

export default defineComponent({
  name: "PropertyFlyer",
  components: {
    KTSpinner,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useAuthStore();
    const user = store.user;
    const id = parseInt(route.params.id.toString());
    const loading = ref<boolean>(true);
    const property = ref<RealEstateProperty | null>(null);
    const inserModel = ref<InsertModel>({
      Customers: [],
      Users: [],
    });
    const flyerData = ref<FlyerData | null>(null);

    onMounted(async () => {
      // Carica i dati
      loading.value = true;
      try {
        property.value = await getRealEstateProperty(id);
        inserModel.value = await getToInsert();

        // Prepara i dati della locandina
        flyerData.value = prepareFlyerData({
          property: property.value,
          currentUser: user,
          availableUsers: inserModel.value.Users || [],
        });
      } catch (error) {
        Swal.fire({
          text: "Errore nel caricamento dell'immobile",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        }).then(() => {
          router.push({ name: "properties" });
        });
      } finally {
        loading.value = false;
      }
    });

    const flyerOptions = computed(() => {
      if (!property.value) return null;
      return {
        property: property.value,
        currentUser: user,
        availableUsers: inserModel.value.Users || [],
      };
    });

    const handlePrint = async () => {
      // Mostra un indicatore di caricamento
      Swal.fire({
        title: "Generazione PDF in corso...",
        text: "Attendere prego",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        await downloadFlyerPDF('flyer-content');
        // Chiudi l'indicatore di caricamento
        Swal.close();
      } catch (error) {
        Swal.fire({
          text: error instanceof Error ? error.message : "Errore durante la generazione del PDF per la stampa",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
      }
    };

    const handleShare = () => {
      // Qui puoi aprire un modal o menu con le opzioni
      // Per ora implementiamo direttamente le funzioni
      Swal.fire({
        title: "Condividi Locandina",
        html: `
          <div class="d-flex flex-column gap-3">
            <button id="btn-email" class="btn btn-light w-100 d-flex align-items-center justify-content-start">
              <i class="ki-duotone ki-sms fs-2 me-3 text-primary">
                <span class="path1"></span>
                <span class="path2"></span>
                <span class="path3"></span>
              </i>
              <span>Email</span>
            </button>
            <button id="btn-whatsapp" class="btn btn-light-success w-100 d-flex align-items-center justify-content-start">
              <span class="fs-2 me-3">💬</span>
              <span>WhatsApp</span>
            </button>
            <button id="btn-pdf" class="btn btn-light w-100 d-flex align-items-center justify-content-start">
              <i class="ki-duotone ki-file-down fs-2 me-3 text-primary">
                <span class="path1"></span>
                <span class="path2"></span>
                <span class="path3"></span>
                <span class="path4"></span>
              </i>
              <span>Download PDF</span>
            </button>
          </div>
        `,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: "Chiudi",
        buttonsStyling: false,
        customClass: {
          cancelButton: "btn btn-light",
        },
        didOpen: () => {
          const btnEmail = document.getElementById("btn-email");
          const btnWhatsApp = document.getElementById("btn-whatsapp");
          const btnPdf = document.getElementById("btn-pdf");

          btnEmail?.addEventListener("click", handleEmailShare);
          btnWhatsApp?.addEventListener("click", handleWhatsAppShare);
          btnPdf?.addEventListener("click", handleDownloadPDF);
        },
      });
    };

    const handleDownloadPDF = async () => {
      Swal.close();
      loading.value = true;
      try {
        await downloadFlyerPDF("flyer-content");
        Swal.fire({
          text: "PDF scaricato con successo!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
      } catch (error: any) {
        Swal.fire({
          text: error.message || "Errore durante la generazione del PDF",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
      } finally {
        loading.value = false;
      }
    };

    const handleEmailShare = async () => {
      if (!flyerOptions.value) return;

      Swal.close();
      loading.value = true;
      try {
        // Prima scarica il PDF
        await downloadFlyerPDF("flyer-content");

        // Poi apre email con testo precompilato
        const emailData = getEmailText(flyerOptions.value);
        const mailtoLink = `mailto:?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`;

        window.location.href = mailtoLink;

        Swal.fire({
          text: "PDF scaricato! Aggiungi il file PDF come allegato nell'email.",
          icon: "info",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
      } catch (error: any) {
        Swal.fire({
          text: error.message || "Errore durante la preparazione dell'email",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
      } finally {
        loading.value = false;
      }
    };

    const handleWhatsAppShare = () => {
      if (!flyerOptions.value) return;

      Swal.close();
      try {
        const whatsappText = getWhatsAppText(flyerOptions.value);
        const whatsappLink = `https://wa.me/?text=${whatsappText}`;

        window.open(whatsappLink, "_blank");
      } catch (error: any) {
        Swal.fire({
          text: error.message || "Errore durante l'apertura di WhatsApp",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
      }
    };

    const handleImageError = (event: Event) => {
      const img = event.target as HTMLImageElement;
      img.style.display = "none";
    };

    const getIconPaths = (iconName: string): number[] => {
      const pathCount = (icons as any)[iconName] || 0;
      if (pathCount === 0) return [];
      return Array.from({ length: pathCount }, (_, i) => i + 1);
    };

    return {
      loading,
      flyerData,
      getAssetPath,
      handlePrint,
      handleShare,
      handleDownloadPDF,
      handleEmailShare,
      handleWhatsAppShare,
      handleImageError,
      getIconPaths,
    };
  },
});
</script>

<style scoped>
/* Stili per la locandina */
</style>

<style>
/* Stili globali per la locandina (necessari per il PDF) */
.property-flyer-container {
  display: flex;
  flex-direction: column;
  width: 190mm;
  min-height: 277mm;
  margin: 10mm auto;
  background: white;
  color: #333;
  line-height: 1.6;
  font-family: 'Arial', sans-serif;
  
  /* Cornice decorativa - con spazio interno dai bordi */
  position: relative;
  padding: 8mm;
  box-shadow: 0 0 20mm rgba(0, 0, 0, 0.1);
}

/* Cornice esterna decorativa - bordo principale leggero nero con margine interno */
.property-flyer-container::before {
  content: '';
  position: absolute;
  top: 8mm;
  left: 8mm;
  right: 8mm;
  bottom: 8mm;
  border: 2mm solid #000000;
  pointer-events: none;
  z-index: 1;
}

/* Cornice interna decorativa - doppia linea leggera nera */
.property-flyer-container::after {
  content: '';
  position: absolute;
  top: 10mm;
  left: 10mm;
  right: 10mm;
  bottom: 10mm;
  border: 1mm solid #000000;
  border-style: double;
  border-width: 1mm;
  pointer-events: none;
  z-index: 1;
}

/* Tutti i contenuti devono essere sopra le cornici */
.property-flyer-container > * {
  position: relative;
  z-index: 2;
}

/* Logo al centro in alto */
.property-flyer-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6mm 0 4mm 0;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 6mm;
}

.flyer-logo-img {
  max-height: 25mm;
  max-width: 80mm;
  object-fit: contain;
}

/* Sezione principale: due colonne */
.property-flyer-main-section {
  display: flex;
  gap: 4mm;
  padding: 0 6mm 6mm 6mm;
  align-items: flex-start;
}

/* Colonna sinistra: foto + dettagli casa */
.property-flyer-left-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4mm;
}

/* Foto sinistra - dimensioni normali */
.property-flyer-left-photo-wrapper {
  height: 80mm;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Colonna destra: foto + info + dettagli agente */
.property-flyer-right-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4mm;
}

/* Foto destra - 3/4 della grandezza della sinistra */
.property-flyer-right-photo-wrapper {
  height: 60mm; /* 3/4 di 80mm */
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Info sotto la foto destra - elegante e compatto */
.property-flyer-title-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 5mm 4mm;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.property-flyer-main-code {
  font-size: 8pt;
  color: #666666;
  margin-bottom: 3mm;
  font-weight: 400;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.property-flyer-main-title {
  font-size: 24pt;
  font-weight: bold;
  color: #333333;
  margin-bottom: 3mm;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

.property-flyer-main-address {
  font-size: 9pt;
  color: #666666;
  margin-bottom: 4mm;
  line-height: 1.4;
  font-style: italic;
}

.property-flyer-price-section {
  margin-top: auto;
}

.property-flyer-price-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2mm;
}

.property-flyer-price-original {
  font-size: 18pt;
  font-weight: normal;
  color: #999999;
  text-decoration: line-through;
  letter-spacing: -0.3px;
}

.property-flyer-price-reduced {
  font-size: 24pt;
  font-weight: bold;
  color: #34495E;
  letter-spacing: -0.5px;
}

.property-flyer-main-price {
  font-size: 24pt;
  font-weight: bold;
  color: #34495E;
  letter-spacing: -0.5px;
}

.property-flyer-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.property-flyer-photo-placeholder {
  width: 100%;
  height: 100%;
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 11pt;
}

/* Riquadro dettagli casa nella colonna sinistra */
.property-flyer-left-column .property-flyer-box {
  margin-top: 0;
}

/* Stile comune per i riquadri */
.property-flyer-box {
  flex: 1;
  padding: 8mm;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  background: #fafafa;
}

/* I riquadri condividono lo stile base .property-flyer-box */

.property-flyer-box-title {
  font-size: 16pt;
  font-weight: bold;
  color: #34495E;
  margin-bottom: 6mm;
  padding-bottom: 3mm;
  border-bottom: 2px solid #34495E;
}

.property-flyer-box-item {
  font-size: 11pt;
  margin-bottom: 4mm;
  color: #333;
}

/* Griglia card dettagli 2x3 */
.property-flyer-detail-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2mm;
  margin-bottom: 6mm;
}

.property-flyer-detail-card {
  display: flex;
  align-items: center;
  gap: 2mm;
  padding: 2.5mm;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  font-size: 9pt;
}

.property-flyer-detail-card i {
  font-size: 14pt;
  color: #34495E;
  flex-shrink: 0;
}

.property-flyer-detail-card-text {
  color: #333;
  font-weight: 500;
  font-size: 9pt;
}

.property-flyer-box-description {
  font-size: 10pt;
  color: #555;
  text-align: justify;
  margin-top: 6mm;
  padding-top: 6mm;
  border-top: 1px solid #e0e0e0;
}

.property-flyer-box-description p {
  margin: 0;
}

/* Riquadro destro - elementi specifici */
.property-flyer-status-badge {
  background: #f0f0f0;
  color: #333;
  padding: 3mm 6mm;
  border-radius: 4px;
  font-weight: bold;
  font-size: 11pt;
  text-align: center;
  margin-bottom: 8mm;
}


  @media print {
    @page {
      size: A4;
      margin: 0;
    }

    body {
      width: 210mm;
      margin: 0;
    }

    .property-flyer-container {
      page-break-inside: avoid;
      margin: 0;
      width: 210mm;
      min-height: 297mm;
      padding: 10mm;
    }

    .property-flyer-container::before {
      top: 8mm;
      left: 8mm;
      right: 8mm;
      bottom: 8mm;
      border-width: 2mm;
    }

    .property-flyer-container::after {
      top: 10mm;
      left: 10mm;
      right: 10mm;
      bottom: 10mm;
      border-width: 1mm;
    }

    .no-print {
      display: none !important;
    }
  }
</style>

