<template>
  <div class="property-results-page">
    <!--begin::Navigation-->
    <LandingNavbar />
    <!--end::Navigation-->
    
    <section class="results-hero">
      <div class="container">
        <div class="results-hero-content">
          <span class="badge badge-light-primary text-uppercase mb-3">Ricerca Immobili</span>
          <h1 class="results-title">Esplora gli immobili disponibili</h1>
          <p class="results-subtitle">
            {{ summaryText }}
          </p>

          <div class="active-filters" v-if="activeFilterTags.length > 0">
            <span class="filter-tag" v-for="tag in activeFilterTags" :key="tag">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="results-search-form">
      <div class="container">
        <div class="results-search-card">
          <PublicPropertySearchForm
            :initial-filters="initialFilters"
            :show-heading="false"
            @submit="handleFiltersSubmit"
          />
        </div>
      </div>
    </section>

    <section class="results-list">
      <div class="container">
        <div v-if="errorMessage" class="alert alert-danger mb-4">
          {{ errorMessage }}
        </div>

        <div v-if="isLoading" class="results-loading">
          <div class="spinner-border text-primary me-2" role="status"></div>
          <span>Caricamento degli immobili in corso...</span>
        </div>

        <div v-else-if="properties.length === 0" class="results-empty text-center">
          <img :src="emptyStateImage" alt="Nessun risultato" class="empty-illustration" />
          <h3>Nessun immobile trovato</h3>
          <p class="text-muted">
            Prova ad aggiornare i filtri di ricerca o amplia i criteri per visualizzare più risultati.
          </p>
        </div>

        <div v-else class="row g-4">
          <div class="col-md-6 col-lg-4" v-for="property in properties" :key="property.Id">
            <div class="property-card">
              <div class="property-card-image">
                <img :src="property.MainPhotoUrl || placeholderImage" alt="Immobile" />
                <span class="badge badge-primary property-badge" v-if="property.Highlighted">
                  In evidenza
                </span>
                <span class="badge badge-warning property-badge" v-if="property.Auction">
                  Asta
                </span>
              </div>
              <div class="property-card-body">
                <div class="property-card-header">
                  <h4 class="property-card-title">{{ property.Title }}</h4>
                  <div class="property-price">{{ formatPrice(property.Price) }}</div>
                </div>
                <div class="property-location text-muted mb-3">
                  <i class="ki-duotone ki-geolocation me-2">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  {{ property.City }}, {{ property.State }}
                </div>
                <div class="property-meta">
                  <span class="meta-item">
                    <i class="ki-duotone ki-bed me-2">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    {{ property.Bedrooms }} Camere
                  </span>
                  <span class="meta-item">
                    <i class="ki-duotone ki-drop me-2">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    {{ property.Bathrooms }} Bagni
                  </span>
                  <span class="meta-item">
                    <i class="ki-duotone ki-maximize me-2">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    {{ property.CommercialSurfaceate }} m²
                  </span>
                </div>
                <div class="property-tags">
                  <span class="badge badge-light">{{ property.Category }}</span>
                  <span v-if="property.Typology" class="badge badge-light">{{ property.Typology }}</span>
                  <span class="badge badge-light">{{ property.Status }}</span>
                </div>
                <div class="property-card-footer">
                  <router-link :to="`/immobili/${property.Id}`" class="btn btn-outline-primary w-100">
                    Dettagli
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="results-pagination" v-if="totalPages > 1">
          <button
            class="btn btn-outline-light"
            :disabled="pagination.page === 1"
            @click="changePage(pagination.page - 1)"
          >
            Precedente
          </button>
          <span class="pagination-info">
            Pagina {{ pagination.page }} di {{ totalPages }}
          </span>
          <button
            class="btn btn-outline-light"
            :disabled="pagination.page === totalPages"
            @click="changePage(pagination.page + 1)"
          >
            Successiva
          </button>
        </div>
      </div>
    </section>

    <!--begin::Footer-->
    <LandingFooter />
    <!--end::Footer-->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getProvinceNameByCode } from "@/core/data/italian-geographic-data-loader";
import { getAssetPath } from "@/core/helpers/assets";
import PublicPropertySearchForm from "@/components/property/PublicPropertySearchForm.vue";
import LandingNavbar from "@/components/landing/LandingNavbar.vue";
import LandingFooter from "@/components/landing/LandingFooter.vue";
import {
  searchPublicProperties,
  type PublicPropertyCard,
  type PublicPropertySearchFilters,
} from "@/core/data/properties";

export default defineComponent({
  name: "property-search-results",
  components: {
    PublicPropertySearchForm,
    LandingNavbar,
    LandingFooter,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const properties = ref<PublicPropertyCard[]>([]);
    const total = ref(0);
    const isLoading = ref(false);
    const errorMessage = ref<string | null>(null);
    const pagination = reactive({
      page: 1,
      pageSize: 9,
    });

    const currentFilters = reactive<PublicPropertySearchFilters>({
      keyword: undefined,
      province: undefined,
      city: undefined,
      category: undefined,
      typology: undefined,
      status: undefined,
      priceMin: undefined,
      priceMax: undefined,
    });

    const placeholderImage = getAssetPath("media/stock/600x400/img-1.jpg");
    const emptyStateImage = getAssetPath("media/illustrations/sigma-1/9.png");

    const initialFilters = computed(() => ({
      keyword: currentFilters.keyword,
      province: currentFilters.province,
      city: currentFilters.city,
      category: currentFilters.category,
      typology: currentFilters.typology,
      status: currentFilters.status,
      priceMin: currentFilters.priceMin,
      priceMax: currentFilters.priceMax,
    }));

    const totalPages = computed(() =>
      Math.max(1, Math.ceil(total.value / pagination.pageSize))
    );

    const summaryText = computed(() => {
      if (properties.value.length === 0) {
        return "Nessun immobile corrisponde ai criteri selezionati.";
      }
      return `Visualizzi ${properties.value.length} immobili su ${total.value} risultati trovati.`;
    });

    const activeFilterTags = computed(() => {
      const tags: string[] = [];
      if (currentFilters.keyword) tags.push(`Testo: ${currentFilters.keyword}`);
      if (currentFilters.province) {
        const provinceName = getProvinceNameByCode(currentFilters.province) || currentFilters.province;
        tags.push(`Provincia: ${provinceName}`);
      }
      if (currentFilters.city) tags.push(`Comune: ${currentFilters.city}`);
      if (currentFilters.category) tags.push(`Categoria: ${currentFilters.category}`);
      if (currentFilters.typology) tags.push(`Tipologia: ${currentFilters.typology}`);
      if (currentFilters.status) tags.push(`Stato: ${currentFilters.status}`);
      if (currentFilters.priceMin) tags.push(`Min: €${formatPrice(currentFilters.priceMin)}`);
      if (currentFilters.priceMax) tags.push(`Max: €${formatPrice(currentFilters.priceMax)}`);
      return tags;
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

    const parseNumberQuery = (param?: string | string[]) => {
      if (typeof param !== "string") return undefined;
      const parsed = Number(param);
      return Number.isFinite(parsed) ? parsed : undefined;
    };

    const syncFiltersFromRoute = () => {
      const query = route.query;
      currentFilters.keyword = typeof query.keyword === "string" ? query.keyword : undefined;
      currentFilters.province = typeof query.province === "string" ? query.province : undefined;
      currentFilters.city = typeof query.city === "string" ? query.city : undefined;
      currentFilters.category = typeof query.category === "string" ? query.category : undefined;
      currentFilters.typology = typeof query.typology === "string" ? query.typology : undefined;
      currentFilters.status = typeof query.status === "string" ? query.status : undefined;
      currentFilters.priceMin = parseNumberQuery(query.priceMin as string | undefined);
      currentFilters.priceMax = parseNumberQuery(query.priceMax as string | undefined);
      pagination.page = parseNumberQuery(query.page as string | undefined) || 1;
    };

    const fetchProperties = async () => {
      isLoading.value = true;
      errorMessage.value = null;
      try {
        const payload: PublicPropertySearchFilters = {
          ...currentFilters,
          page: pagination.page,
          pageSize: pagination.pageSize,
        };
        const result = await searchPublicProperties(payload);
        properties.value = result.Data;
        total.value = result.Total;
      } catch (error: any) {
        errorMessage.value = error?.message || "Errore durante il caricamento degli immobili";
        properties.value = [];
        total.value = 0;
      } finally {
        isLoading.value = false;
      }
    };

    const buildQuery = (filters: PublicPropertySearchFilters, page: number) => {
      const query: Record<string, string> = {};
      if (filters.keyword) query.keyword = filters.keyword;
      if (filters.province) query.province = filters.province;
      if (filters.city) query.city = filters.city;
      if (filters.category) query.category = filters.category;
      if (filters.typology) query.typology = filters.typology;
      if (filters.status) query.status = filters.status;
      if (filters.priceMin) query.priceMin = filters.priceMin.toString();
      if (filters.priceMax) query.priceMax = filters.priceMax.toString();
      query.page = page.toString();
      return query;
    };

    const handleFiltersSubmit = (filters: PublicPropertySearchFilters) => {
      router.push({
        name: "public-properties",
        query: buildQuery(filters, 1),
      });
    };

    const changePage = (page: number) => {
      if (page < 1 || page > totalPages.value) {
        return;
      }
      router.push({
        name: "public-properties",
        query: buildQuery(currentFilters, page),
      });
    };

    watch(
      () => route.query,
      () => {
        syncFiltersFromRoute();
        fetchProperties();
      },
      { immediate: true }
    );

    return {
      properties,
      total,
      isLoading,
      errorMessage,
      pagination,
      totalPages,
      placeholderImage,
      emptyStateImage,
      formatPrice,
      summaryText,
      activeFilterTags,
      initialFilters,
      handleFiltersSubmit,
      changePage,
    };
  },
});
</script>

