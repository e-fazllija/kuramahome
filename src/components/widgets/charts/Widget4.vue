<template>
  <!--begin::Charts Widget 4-->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">{{title}}</span>    
      </h3>

    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body">
      <!--begin::Chart-->
      <div v-if="hasData">
      <apexchart
        ref="chartRef"
        type="donut"
        :options="chartOptions"
        :series="series"
      ></apexchart>
      </div>
      <!--end::Chart-->
      
      <!--begin::No Data Message-->
      <div v-else class="text-center py-10">
        <i class="ki-duotone ki-information-5 fs-3x text-muted mb-4">
          <span class="path1"></span>
          <span class="path2"></span>
          <span class="path3"></span>
        </i>
        <h4 class="fw-bold fs-5 text-gray-700 mb-2">Nessun dato disponibile</h4>
        <p class="text-muted fs-7">Non ci sono dati per l'anno selezionato</p>
      </div>
      <!--end::No Data Message-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Charts Widget 4-->
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onBeforeMount } from "vue";
import type { ApexOptions } from "apexcharts";
import type VueApexCharts from "vue3-apexcharts";
import { useThemeStore } from "@/stores/theme";

export default defineComponent({
  name: "widget-4",
  props: {
    widgetClasses: String,
    datas: Object,
    title: String
  },
  components: {},
  setup(props) {
    const chartRef = ref<typeof VueApexCharts | null>(null);
    const store = useThemeStore();
    const keys = Object.keys(props.datas || {}).slice(1);
    const values = Object.values(props.datas || {}).slice(1);
    
    const series = ref(values);
    
    const themeMode = computed(() => store.mode);
    const isDark = computed(() => themeMode.value === 'dark');
    
    // Check if there's data to display
    const hasData = computed(() => {
      return series.value && series.value.length > 0 && series.value.some((val: any) => val > 0);
    });
    
    const getChartOptions = (): ApexOptions => {
    return {
        chart: {
          height: 400,
          type: "donut",
          toolbar: {
            show: false,
          },
        },
        labels: keys, // Etichette
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
                  color: isDark.value ? "#f5f8fa" : "#2c3e50",
                },
                value: {
                  show: true,
                  fontSize: "20px",
                  fontWeight: 800,
                  color: isDark.value ? "#f5f8fa" : "#34495e",
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
                  color: isDark.value ? "#a1a5b7" : "#7f8c8d",
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
            colors: isDark.value ? "#f5f8fa" : undefined,
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
            const percentage = ((value / total) * 100).toFixed(1);
            return `${seriesName} (${percentage}%)`;
          },
          onItemClick: {
            toggleDataSeries: false,
          },
          onItemHover: {
            highlightDataSeries: true,
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
          "#2196F3", // Blu brillante
          "#4CAF50", // Verde brillante
          "#FF9800", // Arancione brillante
          "#9C27B0", // Viola brillante
          "#F44336", // Rosso brillante
          "#00BCD4", // Ciano brillante
          "#FFC107", // Giallo brillante
          "#795548", // Marrone
          "#607D8B", // Blu grigio
          "#E91E63", // Rosa brillante
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
              const percentage = ((val / total) * 100).toFixed(1);
              return `${val} immobili (${percentage}%)`;
            },
          },
        },
      };
    };
    
    const chartOptions = ref<ApexOptions>(getChartOptions());
    
    onBeforeMount(() => {
      chartOptions.value = getChartOptions();
    });
    
    watch(themeMode, () => {
      if (!chartRef.value) {
        return;
      }
      chartOptions.value = getChartOptions();
      chartRef.value.updateOptions(chartOptions.value);
    });

    return {
      series,
      chartRef,
      chartOptions,
      hasData,
    };
  }  
});


</script>

<style scoped>
/* Dark mode styles */
[data-bs-theme="dark"] .card {
  background-color: #1e1e2d;
  border-color: #2d2d3f;
}

[data-bs-theme="dark"] .card-header {
  background-color: #1e1e2d;
  border-color: #2d2d3f;
}

[data-bs-theme="dark"] .card-body {
  background-color: #1e1e2d;
}

[data-bs-theme="dark"] .card-title,
[data-bs-theme="dark"] .card-label {
  color: #f5f8fa;
}
</style>
