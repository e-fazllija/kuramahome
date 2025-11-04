import { ref, onMounted } from 'vue';
import { getAllProvinceNames, getProvinceCities } from '@/core/data/italian-geographic-data-loader';

export interface ProvinceOption {
  Id: string;
  Name: string;
}

export function useProvinces() {
  const provinces = ref<ProvinceOption[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const loadProvinces = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      // Carica i dati dal JSON se non sono già caricati
      await getProvinceCities();
      // Ottieni i nomi delle province dal JSON
      const provinceNames = getAllProvinceNames();
      // Converti in formato per il select
      provinces.value = provinceNames.map(name => ({
        Id: name,
        Name: name
      }));
    } catch (err: any) {
      console.error("Errore nel caricamento delle province:", err);
      error.value = err?.message || 'Errore nel caricamento delle province';
      provinces.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  // Carica automaticamente al mount
  onMounted(() => {
    loadProvinces();
  });

  return {
    provinces,
    isLoading,
    error,
    loadProvinces
  };
}
