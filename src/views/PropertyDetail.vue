<template>
  <div class="property-detail-page">
    <!--begin::Navigation-->
    <LandingNavbar />
    <!--end::Navigation-->

    <!-- Loading State -->
    <div v-if="isLoading" class="container py-5 mt-5">
      <div class="text-center py-5">
        <div class="spinner-border text-primary mb-3" role="status" style="width: 3rem; height: 3rem;">
          <span class="visually-hidden">Caricamento...</span>
        </div>
        <p class="fs-5 text-muted">Caricamento dettagli immobile...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="errorMessage" class="container py-5 mt-5">
      <div class="alert alert-danger d-flex align-items-center" role="alert">
        <i class="ki-duotone ki-information-5 fs-2x me-3">
          <span class="path1"></span>
          <span class="path2"></span>
        </i>
        <div>
          <h4 class="alert-heading mb-2">Errore</h4>
          <p class="mb-0">{{ errorMessage }}</p>
        </div>
      </div>
      <div class="text-center mt-4">
        <router-link to="/immobili" class="btn btn-primary btn-lg">
          <i class="ki-duotone ki-arrow-left me-2">
            <span class="path1"></span>
            <span class="path2"></span>
          </i>
          Torna alla ricerca
        </router-link>
      </div>
    </div>

    <!-- Property Content -->
    <div v-else-if="property">
      <!-- Hero Gallery Section -->
      <section class="bg-light py-0" style="margin-top: 80px;">
        <div class="container-fluid px-0">
          <div v-if="property.Photos && property.Photos.length > 0" class="row g-0">
            <!-- Main Photo -->
            <div class="col-12">
              <div class="position-relative property-detail-hero">
                <img 
                  :src="currentPhoto.Url" 
                  :alt="property.Title" 
                  class="w-100 h-100"
                  style="object-fit: contain;"
                />
                <div class="position-absolute top-0 end-0 p-3 d-flex gap-2">
                  <span v-if="property.Highlighted" class="badge bg-primary fs-6 px-3 py-2">
                    <i class="ki-duotone ki-star me-1">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    In evidenza
                  </span>
                  <span v-if="property.Auction" class="badge bg-warning text-dark fs-6 px-3 py-2">
                    <i class="ki-duotone ki-gavel me-1">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    Asta
                  </span>
                  <span v-if="property.Negotiation" class="badge bg-info fs-6 px-3 py-2">
                    In trattativa
                  </span>
                </div>
                <!-- Photo Counter -->
                <div v-if="property.Photos.length > 1" class="position-absolute bottom-0 end-0 p-3">
                  <span class="badge bg-dark bg-opacity-75 fs-6 px-3 py-2">
                    {{ currentPhotoIndex + 1 }} / {{ property.Photos.length }}
                  </span>
                </div>
              </div>
            </div>
            <!-- Thumbnails -->
            <div v-if="property.Photos.length > 1" class="col-12 bg-dark bg-opacity-10">
              <div class="container">
                <div class="row g-2 py-3">
                  <div 
                    v-for="(photo, index) in property.Photos"
                    :key="index"
                    class="col-auto"
                  >
                    <div
                      class="thumbnail-wrapper position-relative"
                      :class="{ 'active': currentPhotoIndex === index }"
                      @click="currentPhotoIndex = index"
                      style="cursor: pointer; width: 80px; height: 80px; border-radius: 8px; overflow: hidden; border: 3px solid transparent; transition: all 0.3s;"
                    >
                      <img 
                        :src="photo.Url" 
                        :alt="`Foto ${index + 1}`"
                        class="w-100 h-100"
                        style="object-fit: contain;"
                      />
                      <div v-if="currentPhotoIndex === index" class="position-absolute top-0 start-0 w-100 h-100 bg-primary bg-opacity-25"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- No Photo -->
          <div v-else class="d-flex align-items-center justify-content-center" style="height: 400px; background: var(--bs-gray-100);">
            <div class="text-center">
              <img :src="placeholderImage" alt="Nessuna foto disponibile" class="img-fluid" style="max-height: 300px;" />
              <p class="text-muted mt-3">Nessuna foto disponibile</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Content -->
      <section class="py-5">
        <div class="container">
          <div class="row g-4">
            <!-- Left Column - Property Details -->
            <div class="col-lg-8">
              <!-- Header -->
              <div class="mb-4">
                <h1 class="display-5 fw-bold mb-3">{{ property.Title }}</h1>
                <div class="d-flex align-items-center text-muted mb-3">
                  <i class="ki-duotone ki-geolocation fs-2 me-2">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <span class="fs-5">{{ property.AddressLine }}, {{ property.City }}, {{ property.State }} {{ property.PostCode }}</span>
                </div>
                <div class="d-flex flex-wrap gap-2 mb-3">
                  <span class="badge bg-light text-dark fs-6 px-3 py-2">{{ property.Category }}</span>
                  <span v-if="property.Typology" class="badge bg-light text-dark fs-6 px-3 py-2">{{ property.Typology }}</span>
                  <span class="badge bg-light text-dark fs-6 px-3 py-2">{{ property.Status }}</span>
                </div>
              </div>

              <!-- Price Card -->
              <div class="card border-0 shadow-sm mb-4">
                <div class="card-body p-4">
                  <div class="d-flex align-items-baseline flex-wrap gap-3 mb-3">
                    <span v-if="property.Negotiation" class="badge bg-info fs-6">In trattativa</span>
                    <span class="display-4 fw-bold text-primary">{{ formatPrice(property.Price) }}</span>
                    <span v-if="property.PriceReduced > 0" class="text-muted text-decoration-line-through fs-4">
                      {{ formatPrice(property.PriceReduced) }}
                    </span>
                  </div>
                  <div v-if="property.CondominiumExpenses > 0" class="text-muted">
                    <i class="ki-duotone ki-home-2 me-1">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    Spese condominiali: {{ formatPrice(property.CondominiumExpenses) }}/mese
                  </div>
                </div>
              </div>

              <!-- Description Card -->
              <div class="card border-0 shadow-sm mb-4">
                <div class="card-body p-4">
                  <h3 class="h4 fw-bold mb-3">
                    <i class="ki-duotone ki-document me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    Descrizione
                  </h3>
                  <div class="text-muted" style="line-height: 1.8;" v-html="formatDescription(property.Description)"></div>
                </div>
              </div>

              <!-- Property Details Card -->
              <div class="card border-0 shadow-sm mb-4">
                <div class="card-body p-4">
                  <h3 class="h4 fw-bold mb-4">
                    <i class="ki-duotone ki-information-5 me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    Dettagli Immobile
                  </h3>
                  <div class="row g-3">
                    <div class="col-md-6" v-if="property.CommercialSurfaceate">
                      <div class="d-flex align-items-center p-3 bg-light rounded">
                        <i class="ki-duotone ki-maximize fs-2x text-primary me-3">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        <div>
                          <div class="text-muted small">Superficie commerciale</div>
                          <div class="fw-bold">{{ property.CommercialSurfaceate }} m²</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6" v-if="property.Bedrooms > 0">
                      <div class="d-flex align-items-center p-3 bg-light rounded">
                        <i class="ki-duotone ki-bed fs-2x text-primary me-3">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        <div>
                          <div class="text-muted small">Camere</div>
                          <div class="fw-bold">{{ property.Bedrooms }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6" v-if="property.Bathrooms > 0">
                      <div class="d-flex align-items-center p-3 bg-light rounded">
                        <i class="ki-duotone ki-drop fs-2x text-primary me-3">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        <div>
                          <div class="text-muted small">Bagni</div>
                          <div class="fw-bold">{{ property.Bathrooms }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6" v-if="property.Kitchens > 0">
                      <div class="d-flex align-items-center p-3 bg-light rounded">
                        <i class="ki-duotone ki-chef-hat fs-2x text-primary me-3">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        <div>
                          <div class="text-muted small">Cucine</div>
                          <div class="fw-bold">{{ property.Kitchens }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6" v-if="property.ParkingSpaces > 0">
                      <div class="d-flex align-items-center p-3 bg-light rounded">
                        <i class="ki-duotone ki-car fs-2x text-primary me-3">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        <div>
                          <div class="text-muted small">Posti auto</div>
                          <div class="fw-bold">{{ property.ParkingSpaces }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6" v-if="property.Floor">
                      <div class="d-flex align-items-center p-3 bg-light rounded">
                        <i class="ki-duotone ki-home-2 fs-2x text-primary me-3">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        <div>
                          <div class="text-muted small">Piano</div>
                          <div class="fw-bold">{{ property.Floor }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6" v-if="property.YearOfConstruction > 0">
                      <div class="d-flex align-items-center p-3 bg-light rounded">
                        <i class="ki-duotone ki-calendar fs-2x text-primary me-3">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        <div>
                          <div class="text-muted small">Anno di costruzione</div>
                          <div class="fw-bold">{{ property.YearOfConstruction }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6" v-if="property.EnergyClass">
                      <div class="d-flex align-items-center p-3 bg-light rounded">
                        <i class="ki-duotone ki-flash fs-2x text-primary me-3">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        <div>
                          <div class="text-muted small">Classe energetica</div>
                          <div class="fw-bold">{{ property.EnergyClass }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6" v-if="property.Heating">
                      <div class="d-flex align-items-center p-3 bg-light rounded">
                        <i class="ki-duotone ki-fire fs-2x text-primary me-3">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        <div>
                          <div class="text-muted small">Riscaldamento</div>
                          <div class="fw-bold">{{ property.Heating }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6" v-if="property.Exposure">
                      <div class="d-flex align-items-center p-3 bg-light rounded">
                        <i class="ki-duotone ki-sun fs-2x text-primary me-3">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        <div>
                          <div class="text-muted small">Esposizione</div>
                          <div class="fw-bold">{{ property.Exposure }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6" v-if="property.MQGarden > 0">
                      <div class="d-flex align-items-center p-3 bg-light rounded">
                        <i class="ki-duotone ki-tree fs-2x text-primary me-3">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        <div>
                          <div class="text-muted small">Giardino</div>
                          <div class="fw-bold">{{ property.MQGarden }} m²</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Additional Features Card -->
              <div v-if="property.MoreFeatures || property.OtherFeatures" class="card border-0 shadow-sm mb-4">
                <div class="card-body p-4">
                  <h3 class="h4 fw-bold mb-3">
                    <i class="ki-duotone ki-star me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    Caratteristiche Aggiuntive
                  </h3>
                  <div v-if="property.MoreFeatures" class="mb-3">
                    <p class="text-muted mb-0" style="line-height: 1.8;">{{ property.MoreFeatures }}</p>
                  </div>
                  <div v-if="property.OtherFeatures">
                    <p class="text-muted mb-0" style="line-height: 1.8;">{{ property.OtherFeatures }}</p>
                  </div>
                </div>
              </div>

              <!-- Video Card -->
              <div v-if="property.VideoUrl" class="card border-0 shadow-sm mb-4">
                <div class="card-body p-4">
                  <h3 class="h4 fw-bold mb-3">
                    <i class="ki-duotone ki-video me-2 text-primary">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    Video
                  </h3>
                  <div class="ratio ratio-16x9">
                    <iframe
                      :src="property.VideoUrl"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column - Contact Sidebar -->
            <div class="col-lg-4">
              <div class="sticky-top" style="top: 100px;">
                <!-- Agency Contact Card -->
                <div v-if="property.Agency" class="card border-0 shadow-lg mb-4">
                  <div class="card-body p-4">
                    <h4 class="h5 fw-bold mb-4 pb-3 border-bottom">
                      <i class="ki-duotone ki-home-2 me-2 text-primary">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      Agenzia
                    </h4>
                    <div class="mb-3">
                      <h5 class="fw-bold mb-1">{{ property.Agency.Name }}</h5>
                      <p v-if="property.Agency.CompanyName" class="text-muted small mb-0">{{ property.Agency.CompanyName }}</p>
                    </div>
                    <div v-if="property.Agency.Address" class="mb-3">
                      <div class="d-flex align-items-start text-muted">
                        <i class="ki-duotone ki-geolocation me-2 mt-1 text-primary">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        <div class="small">
                          {{ property.Agency.Address }}
                          <span v-if="property.Agency.City">
                            <br />{{ property.Agency.City }}
                            <span v-if="property.Agency.Province">, {{ property.Agency.Province }}</span>
                            <span v-if="property.Agency.ZipCode"> {{ property.Agency.ZipCode }}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div v-if="property.Agency.PhoneNumber" class="mb-2">
                      <a :href="`tel:${property.Agency.PhoneNumber}`" class="text-decoration-none d-flex align-items-center">
                        <i class="ki-duotone ki-phone me-2 text-primary">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        <span>{{ property.Agency.PhoneNumber }}</span>
                      </a>
                    </div>
                    <div v-if="property.Agency.MobilePhone" class="mb-2">
                      <a :href="`tel:${property.Agency.MobilePhone}`" class="text-decoration-none d-flex align-items-center">
                        <i class="ki-duotone ki-phone me-2 text-primary">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        <span>{{ property.Agency.MobilePhone }}</span>
                      </a>
                    </div>
                    <div v-if="property.Agency.Email" class="mb-3">
                      <a :href="`mailto:${property.Agency.Email}`" class="text-decoration-none d-flex align-items-center">
                        <i class="ki-duotone ki-sms me-2 text-primary">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        <span>{{ property.Agency.Email }}</span>
                      </a>
                    </div>
                  </div>
                </div>

                <!-- Agent Contact Card -->
                <div v-if="property.Agent" class="card border-0 shadow-lg mb-4">
                  <div class="card-body p-4">
                    <h4 class="h5 fw-bold mb-4 pb-3 border-bottom">
                      <i class="ki-duotone ki-user me-2 text-primary">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      Agente
                    </h4>
                    <div class="mb-3">
                      <h5 class="fw-bold mb-0">{{ property.Agent.FirstName }} {{ property.Agent.LastName }}</h5>
                    </div>
                    <div v-if="property.Agent.PhoneNumber" class="mb-2">
                      <a :href="`tel:${property.Agent.PhoneNumber}`" class="text-decoration-none d-flex align-items-center">
                        <i class="ki-duotone ki-phone me-2 text-primary">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        <span>{{ property.Agent.PhoneNumber }}</span>
                      </a>
                    </div>
                    <div v-if="property.Agent.MobilePhone" class="mb-2">
                      <a :href="`tel:${property.Agent.MobilePhone}`" class="text-decoration-none d-flex align-items-center">
                        <i class="ki-duotone ki-phone me-2 text-primary">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        <span>{{ property.Agent.MobilePhone }}</span>
                      </a>
                    </div>
                    <div v-if="property.Agent.Email" class="mb-3">
                      <a :href="`mailto:${property.Agent.Email}`" class="text-decoration-none d-flex align-items-center">
                        <i class="ki-duotone ki-sms me-2 text-primary">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        <span>{{ property.Agent.Email }}</span>
                      </a>
                    </div>
                  </div>
                </div>

                <!-- CTA Button -->
                <div class="d-grid">
                  <router-link to="/sign-up" class="btn btn-primary btn-lg">
                    <i class="ki-duotone ki-message-text me-2">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    Richiedi informazioni
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!--begin::Footer-->
    <LandingFooter />
    <!--end::Footer-->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getAssetPath } from "@/core/helpers/assets";
import LandingNavbar from "@/components/landing/LandingNavbar.vue";
import LandingFooter from "@/components/landing/LandingFooter.vue";
import { getPublicPropertyDetail, type PublicPropertyDetail } from "@/core/data/properties";

export default defineComponent({
  name: "property-detail",
  components: {
    LandingNavbar,
    LandingFooter,
  },
  setup() {
    const route = useRoute();
    const property = ref<PublicPropertyDetail | null>(null);
    const isLoading = ref(true);
    const errorMessage = ref<string | null>(null);
    const currentPhotoIndex = ref(0);
    const placeholderImage = getAssetPath("media/stock/600x400/img-1.jpg");

    const currentPhoto = computed(() => {
      if (!property.value || !property.value.Photos || property.value.Photos.length === 0) {
        return { Url: placeholderImage };
      }
      return property.value.Photos[currentPhotoIndex.value] || property.value.Photos[0];
    });

    const formatPrice = (value?: number) => {
      if (!value || value <= 0) {
        return "Su richiesta";
      }
      return new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }).format(value);
    };

    const formatDescription = (description: string) => {
      if (!description) return "";
      return description.replace(/\n/g, "<br />");
    };

    const loadProperty = async () => {
      try {
        isLoading.value = true;
        errorMessage.value = null;
        const id = Number(route.params.id);
        if (isNaN(id)) {
          throw new Error("ID immobile non valido");
        }
        const data = await getPublicPropertyDetail(id);
        property.value = data;
      } catch (error: any) {
        errorMessage.value = error.message || "Errore durante il caricamento dei dettagli dell'immobile";
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      loadProperty();
    });

    return {
      property,
      isLoading,
      errorMessage,
      currentPhotoIndex,
      currentPhoto,
      placeholderImage,
      formatPrice,
      formatDescription,
    };
  },
});
</script>

<style lang="scss" scoped>
.property-detail-page {
  min-height: 100vh;
  background: var(--bs-body-bg);
}

.property-detail-hero {
  height: 60vh;
  min-height: 500px;
  overflow: hidden;
  background: var(--bs-gray-100, #f8f9fa);
}

[data-bs-theme="dark"] .property-detail-hero {
  background: #2c2c2c;
}

.thumbnail-wrapper {
  &:hover {
    border-color: var(--bs-primary) !important;
    transform: scale(1.05);
  }
  
  &.active {
    border-color: var(--bs-primary) !important;
  }
}

[data-bs-theme="dark"] {
  .bg-light {
    background-color: #2C2C2C !important;
    border-color: rgba(255, 255, 255, 0.1) !important;
  }
  
  .text-muted {
    color: #AAAAAA !important;
  }
  
  .card {
    background-color: #1A1A1A;
    border-color: rgba(255, 255, 255, 0.1) !important;
  }
  
  .thumbnail-wrapper.active {
    border-color: var(--bs-primary) !important;
  }
}
</style>
