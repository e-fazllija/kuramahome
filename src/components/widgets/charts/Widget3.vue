<template>
  <!--begin::Charts Widget 3-->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">{{ title }}</span>

        <span class="text-muted fw-semobold fs-7"
          >{{ subTitle }}</span
        >
      </h3>

      <!--begin::Toolbar-->
      <div class="card-toolbar" data-kt-buttons="true">
        <span
          class="btn btn-sm px-4 me-1"
          :style="getButtonStyle('sale')"
          >Vendita</span
        >

        <span
          class="btn btn-sm px-4 me-1"
          :style="getButtonStyle('rent')"
          >Affitto</span
        >

        <span
          class="btn btn-sm px-4"
          :style="getButtonStyle('auction')"
          >Aste</span
        >
      </div>
      <!--end::Toolbar-->
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body">
      <!--begin::Chart-->
      <apexchart
        ref="chartRef"
        :type="chartType"
        :options="chart"
        :series="series"
      ></apexchart>
      <!--end::Chart-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Charts Widget 3-->
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref, watch } from "vue";
import { useThemeStore } from "@/stores/theme";
import type { ApexOptions } from "apexcharts";
import { getCSSVariableValue } from "@/assets/ts/_utils";
import type VueApexCharts from "vue3-apexcharts";

export default defineComponent({
  name: "widget-3",
  props: {
    widgetClasses: String,
    chartData: Object,
    title: String,
    subTitle: String,
    chartType: {
      type: String,
      default: 'bar' // 'bar' o 'line'
    },
  },
  components: {},
  setup(props) {
    const chartRef = ref<typeof VueApexCharts | null>(null);
    let chart: ApexOptions = {};
    const store = useThemeStore();
    const categoryToColors = {
      sale: {
        base: getCSSVariableValue("--bs-primary"),
        light: getCSSVariableValue("--bs-primary-light"),
      },
      rent: {
        base: getCSSVariableValue("--bs-success"),
        light: getCSSVariableValue("--bs-success-light"),
      },
      auction: {
        base: getCSSVariableValue("--bs-warning"),
        light: getCSSVariableValue("--bs-warning-light"),
      },
    } as const;

    const getCategoryBaseColor = (cat: 'sale' | 'rent' | 'auction') => categoryToColors[cat].base;
    const getCategoryLightColor = (cat: 'sale' | 'rent' | 'auction') => categoryToColors[cat].light;

    const getButtonStyle = (cat: 'sale' | 'rent' | 'auction') => ({
      color: '#000',
      border: `1px solid ${getCategoryBaseColor(cat)}`,
      backgroundColor: getCategoryLightColor(cat),
    });

    const getKeysAndValues = () => {
      const chartData = props.chartData as any ?? {};
      const months = chartData.months ?? [];
      const data = chartData.data ?? {};
      
      return {
        computedKeys: months,
        valuesSale: months.map(month => data.sale?.[month] ?? 0),
        valuesRent: months.map(month => data.rent?.[month] ?? 0),
        valuesAuction: months.map(month => data.auction?.[month] ?? 0)
      };
    };

    const initial = getKeysAndValues();
    const series = ref([
      {
        name: "Vendita",
        data: initial.valuesSale,
      },
      {
        name: "Affitto",
        data: initial.valuesRent,
      },
      {
        name: "Aste",
        data: initial.valuesAuction,
      },
    ]);

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

      const newOptions = chartOptions();
      Object.assign(chart, newOptions);

      // Usa updateOptions invece di refresh per evitare errori con resetSeries
      chartRef.value.updateOptions(newOptions, true, true);
    };

    watch(themeMode, () => {
      refreshChart();
    });

    const chartOptions = (): ApexOptions => {
  const labelColor = getCSSVariableValue("--bs-gray-500");
  const borderColor = getCSSVariableValue("--bs-gray-200");
  const baseColorSale = props.chartType === 'line' ? "#1976d2" : getCSSVariableValue("--bs-primary");
  const lightColorSale = props.chartType === 'line' ? "#42a5f5" : getCSSVariableValue("--bs-primary-light");
  const baseColorRent = props.chartType === 'line' ? "#388e3c" : getCSSVariableValue("--bs-success");
  const lightColorRent = props.chartType === 'line' ? "#66bb6a" : getCSSVariableValue("--bs-success-light");
  const baseColorAuction = props.chartType === 'line' ? "#f57c00" : getCSSVariableValue("--bs-warning");
  const lightColorAuction = props.chartType === 'line' ? "#ffb74d" : getCSSVariableValue("--bs-warning-light");

  const { computedKeys, valuesSale, valuesRent, valuesAuction } = getKeysAndValues();
  series.value = [
    {
      name: "Vendita",
      data: valuesSale,
    },
    {
      name: "Affitto",
      data: valuesRent,
    },
    {
      name: "Aste",
      data: valuesAuction,
    },
  ];

  return {
    chart: {
      fontFamily: "inherit",
      type: props.chartType as "bar" | "line",
      height: 350,
      stacked: props.chartType === 'bar',
      toolbar: {
        show: false,
      },
    },
    plotOptions: props.chartType === 'bar' ? {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        borderRadius: 4,
      },
    } : {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: props.chartType === 'line' ? {
      type: "gradient",
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: [baseColorSale, baseColorRent, baseColorAuction],
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0.1,
        stops: [0, 100]
      }
    } : {
      type: "solid",
      opacity: 0.95,
    },
    stroke: props.chartType === 'line' ? {
      show: true,
      width: 3,
    } : {
      show: false,
      width: 0,
    },
    xaxis: {
      categories: computedKeys,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
      crosshairs: {
        position: "front",
        stroke: {
          color: baseColorSale,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: "12px",
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
    tooltip: {
      shared: true,
      intersect: false,
      followCursor: true,
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: function (val) {
          return val.toString();
        },
      },
    },
    colors: [baseColorSale, baseColorRent, baseColorAuction],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    markers: {
      strokeColors: baseColorSale,
      strokeWidth: 3,
    },
  };
};

    return {
      chart,
      series,
      chartRef,
      getButtonStyle,
    };
  },
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

[data-bs-theme="dark"] .text-muted {
  color: #a1a5b7 !important;
}

[data-bs-theme="dark"] .btn {
  color: #f5f8fa !important;
}
</style>
