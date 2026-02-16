<template>
  <form class="public-search-form" :class="{ 'public-search-form--compact': compact }" @submit.prevent="handleSubmit">
    <div class="search-form-header" v-if="showHeading">
      <p class="search-form-subtitle">Trova l'immobile ideale in pochi secondi</p>
    </div>

    <div class="search-form-grid">
      <div class="search-form-field keyword-field">
        <label class="form-label">Parola chiave</label>
        <div class="input-icon-wrapper">
          <i class="ki-duotone ki-magnifier input-icon">
            <span class="path1"></span>
            <span class="path2"></span>
          </i>
          <input
            v-model="formFilters.keyword"
            type="text"
            class="form-control"
            placeholder="Città, indirizzo o codice immobile"
          />
        </div>
      </div>

      <div class="search-form-field">
        <label class="form-label">Provincia</label>
        <select
          class="form-select"
          v-model="selectedProvinceName"
          :class="{ 'is-loading': provincesLoading }"
        >
          <option value="">Tutte le province</option>
          <option
            v-for="province in provinces"
            :key="province.Id"
            :value="province.Name"
          >
            {{ province.Name }}
          </option>
        </select>
      </div>

      <div class="search-form-field">
        <label class="form-label">Comune</label>
        <select
          class="form-select"
          v-model="formFilters.city"
          :disabled="!selectedProvinceName || isLoadingCities"
        >
          <option value="">Tutti i comuni</option>
          <option
            v-for="city in availableCities"
            :key="city.Id"
            :value="city.Name"
          >
            {{ city.Name }}
          </option>
        </select>
      </div>

      <div class="search-form-field">
        <label class="form-label">Categoria</label>
        <select class="form-select" v-model="formFilters.category">
          <option value="">Tutte le categorie</option>
          <option v-for="category in categoryOptions" :key="category.value" :value="category.value">
            {{ category.label }}
          </option>
        </select>
      </div>

      <div class="search-form-field">
        <label class="form-label">Tipologia</label>
        <select 
          class="form-select" 
          v-model="formFilters.typology"
          :disabled="!formFilters.category"
        >
          <option value="">{{ formFilters.category ? "Tutte le tipologie" : "Seleziona prima una categoria" }}</option>
          <option v-for="typology in typologyOptions" :key="typology" :value="typology">
            {{ typology }}
          </option>
        </select>
      </div>

      <div class="search-form-field">
        <label class="form-label">Stato</label>
        <select class="form-select" v-model="formFilters.status">
          <option value="">Qualsiasi stato</option>
          <option v-for="status in statusOptions" :key="status.value" :value="status.value">
            {{ status.label }}
          </option>
        </select>
      </div>

      <div class="search-form-field price-field">
        <label class="form-label">Prezzo minimo</label>
        <div class="input-icon-wrapper">
          <span class="input-prefix">€</span>
          <input
            type="number"
            min="0"
            class="form-control"
            v-model.number="formFilters.priceMin"
            placeholder="Da"
          />
        </div>
      </div>

      <div class="search-form-field price-field">
        <label class="form-label">Prezzo massimo</label>
        <div class="input-icon-wrapper">
          <span class="input-prefix">€</span>
          <input
            type="number"
            min="0"
            class="form-control"
            v-model.number="formFilters.priceMax"
            placeholder="A"
          />
        </div>
      </div>
    </div>

    <div class="search-form-actions">
      <button type="submit" class="btn btn-primary btn-search w-100 w-lg-auto">
        <i class="ki-duotone ki-search-list fs-4 me-2">
          <span class="path1"></span>
          <span class="path2"></span>
        </i>
        {{ submitLabel }}
      </button>
      <button type="button" class="btn btn-outline-light btn-clear" @click="resetFilters">
        Pulisci filtri
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch, onMounted, computed, type PropType } from "vue";
import type { PublicPropertySearchFilters } from "@/core/data/properties";
import { useProvinces } from "@/composables/useProvinces";
import { getProvinceCities, getProvinceNameByCode, type CityWithCAP } from "@/core/data/italian-geographic-data-loader";

export default defineComponent({
  name: "public-property-search-form",
  props: {
    initialFilters: {
      type: Object as PropType<Partial<PublicPropertySearchFilters>>,
      default: () => ({})
    },
    submitLabel: {
      type: String,
      default: "Cerca immobili"
    },
    compact: {
      type: Boolean,
      default: false
    },
    showHeading: {
      type: Boolean,
      default: true
    }
  },
  emits: ["submit"],
  setup(props, { emit }) {
    const formFilters = reactive<PublicPropertySearchFilters>({
      keyword: "",
      province: "",
      city: "",
      category: "",
      typology: "",
      status: "",
      priceMin: null,
      priceMax: null
    });

    const selectedProvinceName = ref<string>("");
    const availableCities = ref<CityWithCAP[]>([]);
    const isLoadingCities = ref(false);
    const provinceCityMap = ref<Record<string, CityWithCAP[]>>({});

    const { provinces, isLoading: provincesLoading } = useProvinces();

    // Mappa delle tipologie per categoria (allineata con Update.vue)
    const tipologiePerCategoria: Record<string, string[]> = {
      "Residenziale": [
        "Appartamento",
        "Attico",
        "Mansarda",
        "Loft",
        "Soffitta",
        "Casale",
        "Rustico",
        "Villa Unifamiliare",
        "Villa Bifamiliare",
        "Villa Plurifamiliare",
        "Villa a Schiera"
      ],
      "Capannone": [
        "Capannone artigianale",
        "Capannone industriale",
        "Capannone logistico"
      ],
      "Negozi-Locale Commerciale": [
        "Negozio",
        "Locale commerciale",
        "Showroom",
        "Chiosco"
      ],
      "Magazzino": [
        "Magazzino",
        "Deposito",
        "Laboratorio"
      ],
      "Garage": [
        "Box singolo",
        "Box doppio",
        "Posto auto coperto",
        "Posto auto scoperto"
      ],
      "Ufficio": [
        "Ufficio",
        "Studio professionale",
        "Business center",
        "Co-working"
      ],
      "Terreno": [
        "Edificabile",
        "Agricolo",
        "Non edificabile",
        "Boschivo"
      ],
      "Rustico / Casale": [
        "Rustico",
        "Casale",
        "Cascina",
        "Masseria"
      ]
    };

    const categoryOptions = [
      { value: "Residenziale", label: "Residenziale" },
      { value: "Capannone", label: "Capannone" },
      { value: "Negozi-Locale Commerciale", label: "Negozi/Locale Commerciale" },
      { value: "Magazzino", label: "Magazzino" },
      { value: "Garage", label: "Garage" },
      { value: "Ufficio", label: "Ufficio" },
      { value: "Terreno", label: "Terreno" },
      { value: "Rustico / Casale", label: "Rustico / Casale" }
    ];

    // Computed per filtrare le tipologie in base alla categoria selezionata
    const typologyOptions = computed(() => {
      if (!formFilters.category) {
        // Se non c'è categoria selezionata, mostra tutte le tipologie
        return Object.values(tipologiePerCategoria).flat();
      }
      return tipologiePerCategoria[formFilters.category] || [];
    });

    const statusOptions = [
      { value: "Disponibile", label: "Disponibile" },
      { value: "Vendita", label: "In vendita" },
      { value: "Affitto", label: "In affitto" },
      { value: "In trattativa", label: "In trattativa" },
      { value: "Asta", label: "All'asta" }
    ];

    const ensureCityMap = async () => {
      if (Object.keys(provinceCityMap.value).length === 0) {
        provinceCityMap.value = await getProvinceCities();
      }
    };

    const loadCitiesForProvince = async (provinceName: string) => {
      if (!provinceName) {
        availableCities.value = [];
        return;
      }

      isLoadingCities.value = true;
      try {
        await ensureCityMap();
        availableCities.value = provinceCityMap.value[provinceName] || [];
      } finally {
        isLoadingCities.value = false;
      }
    };

    const applyInitialFilters = (initial?: Partial<PublicPropertySearchFilters>) => {
      formFilters.keyword = initial?.keyword || "";
      formFilters.category = initial?.category || "";
      formFilters.typology = initial?.typology || "";
      formFilters.status = initial?.status || "";
      formFilters.city = initial?.city || "";
      formFilters.priceMin = initial?.priceMin ?? null;
      formFilters.priceMax = initial?.priceMax ?? null;

      // Province: il backend usa il NOME in State (es. "Roma"). Supportiamo sia codice (RM) che nome nelle initial
      const provinceVal = initial?.province || "";
      selectedProvinceName.value = provinceVal
        ? (getProvinceNameByCode(provinceVal) || provinceVal)
        : "";
      formFilters.province = selectedProvinceName.value || provinceVal;

      if (selectedProvinceName.value) {
        loadCitiesForProvince(selectedProvinceName.value).then(() => {
          if (!availableCities.value.some(city => city.Name === formFilters.city)) {
            formFilters.city = "";
          }
        });
      } else {
        availableCities.value = [];
      }
    };

    onMounted(async () => {
      await ensureCityMap();
      applyInitialFilters(props.initialFilters);
    });

    watch(
      () => props.initialFilters,
      (value) => applyInitialFilters(value),
      { deep: true }
    );

    watch(selectedProvinceName, async (newProvince) => {
      if (!newProvince) {
        formFilters.province = "";
        formFilters.city = "";
        availableCities.value = [];
        return;
      }

      // Il backend RealEstateProperty.State contiene il NOME della provincia (es. "Roma"), non il codice
      formFilters.province = newProvince;
      formFilters.city = "";
      await loadCitiesForProvince(newProvince);
    });

    // Watch sulla categoria per resettare la tipologia se non è valida
    watch(
      () => formFilters.category,
      (newCategory) => {
        if (!newCategory) {
          formFilters.typology = "";
          return;
        }

        const availableTypologies = tipologiePerCategoria[newCategory] || [];
        
        // Se la tipologia attuale non è valida per la nuova categoria, resettala
        if (formFilters.typology && !availableTypologies.includes(formFilters.typology)) {
          formFilters.typology = "";
        }
      }
    );

    const resetFilters = () => {
      applyInitialFilters({});
    };

    const handleSubmit = () => {
      if (
        formFilters.priceMin !== null &&
        formFilters.priceMax !== null &&
        formFilters.priceMin > formFilters.priceMax
      ) {
        const temp = formFilters.priceMin;
        formFilters.priceMin = formFilters.priceMax;
        formFilters.priceMax = temp;
      }

      const payload: PublicPropertySearchFilters = {
        keyword: formFilters.keyword?.trim() || undefined,
        province: formFilters.province || undefined,
        city: formFilters.city || undefined,
        category: formFilters.category || undefined,
        typology: formFilters.typology || undefined,
        status: formFilters.status || undefined,
        priceMin: formFilters.priceMin || undefined,
        priceMax: formFilters.priceMax || undefined
      };

      emit("submit", payload);
    };

    return {
      formFilters,
      selectedProvinceName,
      availableCities,
      isLoadingCities,
      provinces,
      provincesLoading,
      typologyOptions,
      categoryOptions,
      statusOptions,
      handleSubmit,
      resetFilters,
      compact: props.compact,
      showHeading: props.showHeading
    };
  }
});
</script>

