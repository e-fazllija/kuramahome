<template>
  <!--begin::Charts Widget 7-->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">📊 Classifiche & Distribuzioni</span>
        <span class="text-muted fw-semobold fs-7">Analisi dettagliata del portafoglio</span>
      </h3>

      <!--begin::Toolbar-->
      <div class="card-toolbar" data-kt-buttons="true">
        <a
          v-for="option in viewOptions"
          :key="option.id"
          @click="selectedView = option.id"
          :class="[
            'btn btn-sm btn-color-muted btn-active btn-active-primary px-3 me-1 mb-1',
            selectedView === option.id ? 'active' : ''
          ]"
        >
          <i v-if="option.icon" :class="option.icon + ' fs-7 me-1'"></i>
          {{ option.label }}
        </a>
      </div>
      <!--end::Toolbar-->
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body">
      <!--begin::Top Agenzie-->
      <div v-if="selectedView === 'agencies'" class="d-flex flex-column">
        <!--begin::Filtro Tipo Classifica-->
        <div class="mb-4">
          <div class="d-flex gap-1 flex-wrap">
            <button 
              @click="selectedAgencyRankingType = 'sales'"
              :class="[
                'btn btn-sm px-3 py-2',
                selectedAgencyRankingType === 'sales' ? 'btn-primary' : 'btn-light-primary'
              ]"
            >
              <i class="ki-duotone ki-check-circle fs-7 me-1">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              Venduti
            </button>
            <button 
              @click="selectedAgencyRankingType = 'appointments'"
              :class="[
                'btn btn-sm px-3 py-2',
                selectedAgencyRankingType === 'appointments' ? 'btn-success' : 'btn-light-success'
              ]"
            >
              <i class="ki-duotone ki-home-2 fs-7 me-1">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              Caricati
            </button>
          </div>
        </div>
        <!--end::Filtro Tipo Classifica-->

        <!--begin::Classifica Agenzie-->
        <div v-if="filteredAgenciesData && filteredAgenciesData.length > 0" class="d-flex flex-column">
          <div v-for="(agency, index) in filteredAgenciesData.slice(0, 5)" :key="agency.id" 
               :class="[
                 'd-flex align-items-center mb-2 p-3 rounded-3',
                 index < 3 ? 'bg-light-info border border-info border-opacity-25' : 'bg-light-secondary border border-secondary border-opacity-25'
               ]">
            <div class="symbol symbol-30px me-3">
              <span :class="[
                'symbol-label text-white fw-bold fs-8',
                index === 0 ? 'bg-warning' : index === 1 ? 'bg-secondary' : index === 2 ? 'bg-info' : 'bg-primary'
              ]">
                {{ index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1 }}
              </span>
            </div>
            <div class="d-flex flex-column flex-grow-1">
              <span class="fw-bold fs-7 text-gray-800">{{ agency.name }}</span>
              <span class="text-muted fs-8">{{ agency.count }} {{ getAgencyRankingUnitLabel() }}</span>
            </div>
            <div class="text-end">
              <span class="fw-bold fs-6 text-info">#{{ index + 1 }}</span>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-10">
          <i class="ki-duotone ki-information-5 fs-3x text-muted mb-4">
            <span class="path1"></span>
            <span class="path2"></span>
            <span class="path3"></span>
          </i>
          <h4 class="fw-bold fs-5 text-gray-700 mb-2">Nessun dato disponibile</h4>
          <p class="text-muted fs-7">Non ci sono dati per la classifica agenzie</p>
        </div>
        <!--end::Classifica Agenzie-->
      </div>
      <!--end::Top Agenzie-->

      <!--begin::Top Agenti-->
      <div v-if="selectedView === 'agents'" class="d-flex flex-column">
        <!--begin::Filtro Tipo Classifica-->
        <div class="mb-4">
          <div class="d-flex gap-1 flex-wrap">
            <button 
              @click="selectedAgentRankingType = 'sales'"
              :class="[
                'btn btn-sm px-3 py-2',
                selectedAgentRankingType === 'sales' ? 'btn-primary' : 'btn-light-primary'
              ]"
            >
              <i class="ki-duotone ki-home-2 fs-7 me-1">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              Vendite
            </button>
            <button 
              @click="selectedAgentRankingType = 'appointments'"
              :class="[
                'btn btn-sm px-3 py-2',
                selectedAgentRankingType === 'appointments' ? 'btn-success' : 'btn-light-success'
              ]"
            >
              <i class="ki-duotone ki-home-2 fs-7 me-1">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              Caricati
            </button>
          </div>
        </div>
        <!--end::Filtro Tipo Classifica-->

        <!--begin::Classifica Agenti-->
        <div v-if="filteredAgentsData && filteredAgentsData.length > 0" class="d-flex flex-column">
          <div v-for="(agent, index) in filteredAgentsData.slice(0, 5)" :key="agent.id" 
               :class="[
                 'd-flex align-items-center mb-2 p-3 rounded-3',
                 index < 3 ? 'bg-light-primary border border-primary border-opacity-25' : 'bg-light-secondary border border-secondary border-opacity-25'
               ]">
            <div class="symbol symbol-30px me-3">
              <span :class="[
                'symbol-label text-white fw-bold fs-8',
                index === 0 ? 'bg-warning' : index === 1 ? 'bg-secondary' : index === 2 ? 'bg-info' : 'bg-primary'
              ]">
                {{ index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1 }}
              </span>
            </div>
            <div class="d-flex flex-column flex-grow-1">
              <span class="fw-bold fs-7 text-gray-800">{{ agent.name }}</span>
              <span class="text-muted fs-8">{{ agent.count }} {{ getAgentRankingUnitLabel() }}</span>
            </div>
            <div class="text-end">
              <span class="fw-bold fs-6 text-primary">#{{ index + 1 }}</span>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-10">
          <i class="ki-duotone ki-information-5 fs-3x text-muted mb-4">
            <span class="path1"></span>
            <span class="path2"></span>
            <span class="path3"></span>
          </i>
          <h4 class="fw-bold fs-5 text-gray-700 mb-2">Nessun dato disponibile</h4>
          <p class="text-muted fs-7">Non ci sono dati per la classifica agenti</p>
        </div>
        <!--end::Classifica Agenti-->
      </div>
      <!--end::Top Agenti-->

      <!--begin::Top Zone-->
      <div v-if="selectedView === 'zones'" class="d-flex flex-column">
        <div v-if="topZonesData && topZonesData.length > 0" class="d-flex flex-column">
          <div v-for="(zone, index) in topZonesData.slice(0, 5)" :key="index" 
               class="d-flex align-items-center mb-2 p-3 rounded-3 bg-light-primary border border-primary border-opacity-25">
            <div class="symbol symbol-35px me-3">
              <span class="symbol-label bg-primary text-white fw-bold fs-7">{{ index + 1 }}</span>
            </div>
            <div class="d-flex flex-column flex-grow-1">
              <span class="fw-bold fs-7 text-gray-800">{{ zone.name }}</span>
              <span class="text-muted fs-8">{{ zone.count }} immobili</span>
            </div>
            <div class="text-end">
              <span class="fw-bold fs-6 text-primary">{{ zone.percentage }}%</span>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-10">
          <i class="ki-duotone ki-information-5 fs-3x text-muted mb-4">
            <span class="path1"></span>
            <span class="path2"></span>
            <span class="path3"></span>
          </i>
          <h4 class="fw-bold fs-5 text-gray-700 mb-2">Nessun dato disponibile</h4>
          <p class="text-muted fs-7">Non ci sono dati per le zone</p>
        </div>
      </div>
      <!--end::Top Zone-->

      <!--begin::Distribuzione Tipologie-->
      <div v-if="selectedView === 'typologies'">
        <div v-if="hasTypologyData">
          <apexchart
            ref="typologyChartRef"
            type="donut"
            :options="typologyChartOptions"
            :series="typologySeries"
          ></apexchart>
        </div>
        <div v-else class="text-center py-10">
          <i class="ki-duotone ki-information-5 fs-3x text-muted mb-4">
            <span class="path1"></span>
            <span class="path2"></span>
            <span class="path3"></span>
          </i>
          <h4 class="fw-bold fs-5 text-gray-700 mb-2">Nessun dato disponibile</h4>
          <p class="text-muted fs-7">Non ci sono dati per la distribuzione tipologie</p>
        </div>
      </div>
      <!--end::Distribuzione Tipologie-->

      <!--begin::Distribuzione Categorie-->
      <div v-if="selectedView === 'categories'" class="d-flex flex-column">
        <!--begin::Numero Totale-->
        <div class="text-center mb-5">
          <div class="fw-bold fs-2 text-primary mb-1">
            {{ availablePropertiesCount || 0 }}
          </div>
          <div class="text-muted fs-7">Immobili disponibili</div>
        </div>
        <!--end::Numero Totale-->

        <!--begin::Progress Bars-->
        <div class="d-flex flex-column">
          <!--begin::Vendite-->
          <div class="mb-4">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="fw-bold fs-7 text-gray-800">Vendite</span>
              <span class="fw-bold fs-7 text-primary">
                {{ availablePropertiesCount > 0 ? Math.round((salePropertiesCount / availablePropertiesCount) * 100) : 0 }}%
              </span>
            </div>
            <div class="progress" style="height: 8px;">
              <div 
                class="progress-bar bg-primary" 
                :style="{ width: availablePropertiesCount > 0 ? (salePropertiesCount / availablePropertiesCount) * 100 + '%' : '0%' }"
                role="progressbar"
              ></div>
            </div>
            <div class="text-muted fs-8 mt-1">
              {{ salePropertiesCount || 0 }} immobili
            </div>
          </div>
          <!--end::Vendite-->

          <!--begin::Affitti-->
          <div class="mb-4">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="fw-bold fs-7 text-gray-800">Affitti</span>
              <span class="fw-bold fs-7 text-success">
                {{ availablePropertiesCount > 0 ? Math.round((rentPropertiesCount / availablePropertiesCount) * 100) : 0 }}%
              </span>
            </div>
            <div class="progress" style="height: 8px;">
              <div 
                class="progress-bar bg-success" 
                :style="{ width: availablePropertiesCount > 0 ? (rentPropertiesCount / availablePropertiesCount) * 100 + '%' : '0%' }"
                role="progressbar"
              ></div>
            </div>
            <div class="text-muted fs-8 mt-1">
              {{ rentPropertiesCount || 0 }} immobili
            </div>
          </div>
          <!--end::Affitti-->

          <!--begin::Aste-->
          <div class="mb-2">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="fw-bold fs-7 text-gray-800">Aste</span>
              <span class="fw-bold fs-7 text-warning">
                {{ auctionData?.percentage || 0 }}%
              </span>
            </div>
            <div class="progress" style="height: 8px;">
              <div 
                class="progress-bar bg-warning" 
                :style="{ width: (auctionData?.percentage || 0) + '%' }"
                role="progressbar"
              ></div>
            </div>
            <div class="text-muted fs-8 mt-1">
              {{ auctionData?.total || 0 }} immobili
            </div>
          </div>
          <!--end::Aste-->
        </div>
        <!--end::Progress Bars-->
      </div>
      <!--end::Distribuzione Categorie-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Charts Widget 7-->
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref, watch } from "vue";
import { useThemeStore } from "@/stores/theme";
import type { ApexOptions } from "apexcharts";
import { getCSSVariableValue } from "@/assets/ts/_utils";
import type VueApexCharts from "vue3-apexcharts";

type ViewType = 'agencies' | 'agents' | 'zones' | 'typologies' | 'categories';
type RankingType = 'sales' | 'appointments';

interface AgencyRanking {
  id: string;
  name: string;
  count: number;
}

interface AgentRanking {
  id: string;
  name: string;
  count: number;
}

interface ZoneData {
  name: string;
  count: number;
  percentage: number;
}

interface TypologyData {
  [key: string]: number;
}

interface AuctionData {
  total: number;
  percentage: number;
}

export default defineComponent({
  name: "widget-7",
  props: {
    widgetClasses: String,
    agenciesRankingData: {
      type: Array as () => AgencyRanking[],
      default: () => []
    },
    agentsRankingData: {
      type: Array as () => AgentRanking[],
      default: () => []
    },
    topZonesData: {
      type: Array as () => ZoneData[],
      default: () => []
    },
    typologyData: {
      type: Object as () => TypologyData,
      default: () => ({})
    },
    availablePropertiesCount: {
      type: Number,
      default: 0
    },
    salePropertiesCount: {
      type: Number,
      default: 0
    },
    rentPropertiesCount: {
      type: Number,
      default: 0
    },
    auctionData: {
      type: Object as () => AuctionData,
      default: () => ({ total: 0, percentage: 0 })
    },
    agenciesRankingType: {
      type: String as () => RankingType,
      default: 'sales'
    },
    agentsRankingType: {
      type: String as () => RankingType,
      default: 'sales'
    }
  },
  setup(props) {
    const store = useThemeStore();
    const typologyChartRef = ref<typeof VueApexCharts | null>(null);
    
    const selectedView = ref<ViewType>('agencies');
    const selectedAgencyRankingType = ref<RankingType>(props.agenciesRankingType || 'sales');
    const selectedAgentRankingType = ref<RankingType>(props.agentsRankingType || 'sales');

    const viewOptions = [
      { id: 'agencies' as ViewType, label: 'Top Agenzie', icon: 'ki-duotone ki-office-bag' },
      { id: 'agents' as ViewType, label: 'Top Agenti', icon: 'ki-duotone ki-people' },
      { id: 'zones' as ViewType, label: 'Top Zone', icon: 'ki-duotone ki-geolocation' },
      { id: 'typologies' as ViewType, label: 'Tipologie', icon: 'ki-duotone ki-chart-simple' },
      { id: 'categories' as ViewType, label: 'Categorie', icon: 'ki-duotone ki-category' }
    ];

    const themeMode = computed(() => store.mode);
    const isDark = computed(() => themeMode.value === 'dark');

    // Filtri per le classifiche
    const filteredAgenciesData = computed(() => {
      if (!props.agenciesRankingData || props.agenciesRankingData.length === 0) {
        return [];
      }
      return props.agenciesRankingData;
    });

    const filteredAgentsData = computed(() => {
      if (!props.agentsRankingData || props.agentsRankingData.length === 0) {
        return [];
      }
      return props.agentsRankingData;
    });

    // Labels per le classifiche
    const getAgencyRankingUnitLabel = () => {
      return selectedAgencyRankingType.value === 'sales' ? 'vendite' : 'immobili';
    };

    const getAgentRankingUnitLabel = () => {
      return selectedAgentRankingType.value === 'sales' ? 'vendite' : 'immobili';
    };

    // Dati tipologie per il grafico
    const typologyKeys = computed(() => {
      const data = props.typologyData || {};
      return Object.keys(data).slice(1); // Salta il primo elemento (totale)
    });

    const typologyValues = computed(() => {
      const data = props.typologyData || {};
      return Object.values(data).slice(1) as number[];
    });

    const typologySeries = computed(() => typologyValues.value);
    
    const hasTypologyData = computed(() => {
      return typologySeries.value && typologySeries.value.length > 0 && typologySeries.value.some((val: number) => val > 0);
    });

    const getTypologyChartOptions = (): ApexOptions => {
      return {
        chart: {
          height: 400,
          type: "donut",
          toolbar: {
            show: false,
          },
        },
        labels: typologyKeys.value,
        plotOptions: {
          pie: {
            donut: {
              size: "70%",
              labels: {
                show: true,
                name: {
                  show: true,
                  fontSize: "16px",
                  fontWeight: 700,
                  color: isDark.value ? "#E0E0E0" : "#333333",
                },
                value: {
                  show: true,
                  fontSize: "20px",
                  fontWeight: 800,
                  color: isDark.value ? "#E0E0E0" : "#333333",
                  formatter: function (val) {
                    return val + "%";
                  },
                },
                total: {
                  show: true,
                  showAlways: true,
                  label: "Totale Immobili",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: isDark.value ? "#AAAAAA" : "#666666",
                  formatter: function (w) {
                    const total = w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
                    return total.toString();
                  },
                },
              },
            },
          },
        },
        legend: {
          show: true,
          position: "right",
          horizontalAlign: "center",
          fontSize: "13px",
          fontWeight: 600,
          labels: {
            colors: isDark.value ? "#E0E0E0" : undefined,
          },
          markers: {
            size: 6,
            strokeWidth: 2,
          },
          itemMargin: {
            horizontal: 8,
            vertical: 6,
          },
          formatter: function(seriesName: string, opts: any) {
            const value = opts.w.globals.series[opts.seriesIndex];
            const total = opts.w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
            return `${seriesName} (${percentage}%)`;
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        colors: [
          "#2196F3",
          "#4CAF50",
          "#FF9800",
          "#9C27B0",
          "#F44336",
          "#00BCD4",
          "#FFC107",
          "#795548",
          "#607D8B",
          "#E91E63",
        ],
        tooltip: {
          enabled: true,
          shared: false,
          intersect: false,
          followCursor: true,
          style: {
            fontSize: "12px",
          },
          y: {
            formatter: function (val, opts) {
              const total = opts.w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
              const percentage = total > 0 ? ((val / total) * 100).toFixed(1) : '0';
              return `${val} immobili (${percentage}%)`;
            },
          },
        },
        responsive: [
          {
            breakpoint: 768,
            options: {
              chart: {
                height: 350,
              },
              legend: {
                position: "bottom",
                horizontalAlign: "center",
                fontSize: "11px",
              },
            },
          },
        ],
      };
    };

    const typologyChartOptions = ref<ApexOptions>(getTypologyChartOptions());

    watch(themeMode, () => {
      if (typologyChartRef.value) {
        typologyChartOptions.value = getTypologyChartOptions();
        typologyChartRef.value.updateOptions(typologyChartOptions.value);
      }
    });

    watch(() => props.typologyData, () => {
      if (typologyChartRef.value) {
        typologyChartOptions.value = getTypologyChartOptions();
        typologyChartRef.value.updateOptions(typologyChartOptions.value);
      }
    }, { deep: true });

    onBeforeMount(() => {
      typologyChartOptions.value = getTypologyChartOptions();
    });

    return {
      selectedView,
      viewOptions,
      selectedAgencyRankingType,
      selectedAgentRankingType,
      filteredAgenciesData,
      filteredAgentsData,
      topZonesData: computed(() => props.topZonesData),
      getAgencyRankingUnitLabel,
      getAgentRankingUnitLabel,
      typologyChartRef,
      typologyChartOptions,
      typologySeries,
      hasTypologyData,
      availablePropertiesCount: computed(() => props.availablePropertiesCount),
      salePropertiesCount: computed(() => props.salePropertiesCount),
      rentPropertiesCount: computed(() => props.rentPropertiesCount),
      auctionData: computed(() => props.auctionData),
    };
  },
});
</script>