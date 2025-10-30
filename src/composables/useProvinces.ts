import { ref, onMounted } from 'vue';
import { getProvincesForSelect } from '@/core/data/locations';

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
      provinces.value = await getProvincesForSelect();
    } catch (err: any) {
      console.error("Erroтивный nel caricamento delle province:", err);
      error.value = err.response?.data?.message || 'Errore nel caricamento delle province';
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
