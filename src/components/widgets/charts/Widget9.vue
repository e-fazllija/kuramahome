<template>
  <!--begin::Charts Widget 9-->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">{{ title }}</span>

        <span class="text-muted fw-semobold fs-7"
          >{{ subTitle }}</span
        >
      </h3>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body">
      <!--begin::Chart-->
      <apexchart
        ref="chartRef"
        type="donut"
        :options="chart"
        :series="series"
      ></apexchart>
      <!--end::Chart-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Charts Widget 9-->
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref, watch } from "vue";
import { useThemeStore } from "@/stores/theme";
import type { ApexOptions } from "apexcharts";
import { getCSSVariableValue } from "@/assets/ts/_utils";
import type VueApexCharts from "vue3-apexcharts";

export default defineComponent({
  name: "widget-9",
  props: {
    widgetClasses: String,
    chartData: Array,
    title: String,
    subTitle: String,
  },
  components: {},
  setup(props) {
    const chartRef = ref<typeof VueApexCharts | null>(null);
    let chart: ApexOptions = {};
    const store = useThemeStore();

    const series = ref<number[]>([]);
    const labels = ref<string[]>([]);

    const themeMode = computed(() => {
      return store.mode;
    });

    onBeforeMount(() => {
      Object.assign(chart, chartOptions());
    });

    const refreshChart = () => {
      if (!chartRef.value) {
        return;
      }

      Object.assign(chart, chartOptions());

      chartRef.value.refresh();
    };

    watch(themeMode, () => {
      refreshChart();
    });

    watch(() => props.chartData, () => {
      if (props.chartData) {
        updateSeries();
        refreshChart();
      }
    }, { immediate: true });

    const updateSeries = () => {
      if (props.chartData && Array.isArray(props.chartData)) {
        series.value = props.chartData.map((item: any) => item.value);
        labels.value = props.chartData.map((item: any) => item.name);
      }
    };

    const chartOptions = (): ApexOptions => {
      const labelColor = getCSSVariableValue("--bs-gray-500");
      const borderColor = getCSSVariableValue("--bs-gray-200");
      
      // Colori per le diverse tipologie
      const colors = [
        getCSSVariableValue("--bs-primary"),
        getCSSVariableValue("--bs-success"),
        getCSSVariableValue("--bs-warning"),
        getCSSVariableValue("--bs-info"),
        getCSSVariableValue("--bs-danger"),
        getCSSVariableValue("--bs-secondary"),
        "#9c27b0", // Viola
        "#795548", // Marrone
        "#607d8b", // Blu grigio
        "#ff9800", // Arancione
      ];

      return {
        chart: {
          fontFamily: "inherit",
          type: "donut",
          height: 350,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          pie: {
            donut: {
              size: "65%",
              labels: {
                show: true,
                name: {
                  show: true,
                  fontSize: "14px",
                  fontWeight: 600,
                  color: labelColor,
                  offsetY: -10,
                },
                value: {
                  show: true,
                  fontSize: "16px",
                  fontWeight: 700,
                  color: labelColor,
                  offsetY: 16,
                  formatter: function (val) {
                    return val + "%";
                  },
                },
                total: {
                  show: true,
                  showAlways: false,
                  label: "Totale",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: labelColor,
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
          position: "bottom",
          horizontalAlign: "center",
          fontSize: "12px",
          fontWeight: 500,
          labels: {
            colors: labelColor,
          },
          markers: {
            size: 8,
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
        colors: colors,
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
              const data = props.chartData as any[];
              const item = data[opts.seriesIndex];
              return `${item.value} immobili (${item.percentage}%)`;
            },
          },
        },
        states: {
          normal: {
            filter: {
              type: "none",
              value: 0,
            },
          },
          hover: {
            filter: {
              type: "none",
              value: 0,
            },
          },
          active: {
            allowMultipleDataPointsSelection: false,
            filter: {
              type: "none",
              value: 0,
            },
          },
        },
      };
    };

    return {
      chart,
      series,
      chartRef,
    };
  },
});
</script>

