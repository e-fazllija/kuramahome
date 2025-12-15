<template>
  <!--begin::Charts Widget 3-->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">{{ title }}</span>
        <span class="text-muted fw-semobold fs-7">{{ subTitle }}</span>
      </h3>

    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body">
      <div class="row g-4 align-items-stretch">
        <!--begin::Totali Immobili-->
        <div class="col-12 col-md-3">
          <div class="d-flex flex-column gap-2 h-100">
            <!--begin::Vendita-->
            <div class="card border border-primary border-2">
              <div class="card-body p-3">
                <div class="d-flex flex-column align-items-center mb-3">
                  <span class="text-muted fs-8">Vendita</span>
                </div>
                <div class="d-flex justify-content-between align-items-center w-100">
                  <div class="d-flex flex-column align-items-start">
                    <span class="text-muted fs-9 mb-1">Tot Inseriti</span>
                    <span class="fw-bold fs-3 text-primary">{{ totalSaleInserted }}</span>
                  </div>
                  <div class="d-flex flex-column align-items-end">
                    <span class="text-muted fs-9 mb-1">Tot Venduti</span>
                    <span class="fw-bold fs-3 text-primary">{{ totalSaleSold }}</span>
                  </div>
                </div>
              </div>
            </div>
            <!--end::Vendita-->

            <!--begin::Affitto-->
            <div class="card border border-success border-2">
              <div class="card-body p-3">
                <div class="d-flex flex-column align-items-center mb-3">
                  <span class="text-muted fs-8">Affitto</span>
                </div>
                <div class="d-flex justify-content-between align-items-center w-100">
                  <div class="d-flex flex-column align-items-start">
                    <span class="text-muted fs-9 mb-1">Tot Inseriti</span>
                    <span class="fw-bold fs-3 text-success">{{ totalRentInserted }}</span>
                  </div>
                  <div class="d-flex flex-column align-items-end">
                    <span class="text-muted fs-9 mb-1">Tot Venduti</span>
                    <span class="fw-bold fs-3 text-success">{{ totalRentSold }}</span>
                  </div>
                </div>
              </div>
            </div>
            <!--end::Affitto-->

            <!--begin::Aste-->
            <div class="card border border-warning border-2">
              <div class="card-body p-3">
                <div class="d-flex flex-column align-items-center mb-3">
                  <span class="text-muted fs-8">Aste</span>
                </div>
                <div class="d-flex justify-content-between align-items-center w-100">
                  <div class="d-flex flex-column align-items-start">
                    <span class="text-muted fs-9 mb-1">Tot Inseriti</span>
                    <span class="fw-bold fs-3 text-warning">{{ totalAuctionInserted }}</span>
                  </div>
                  <div class="d-flex flex-column align-items-end">
                    <span class="text-muted fs-9 mb-1">Tot Venduti</span>
                    <span class="fw-bold fs-3 text-warning">{{ totalAuctionSold }}</span>
                  </div>
                </div>
              </div>
            </div>
            <!--end::Aste-->

            <!--begin::Provvigioni-->
            <div class="card border border-info border-2">
              <div class="card-body p-3">
                <div class="d-flex flex-column align-items-center mb-3">
                  <span class="text-muted fs-8">Portafoglio</span>
                </div>
                <div class="d-flex justify-content-between align-items-center w-100">
                  <div class="d-flex flex-column align-items-start">
                    <span class="text-muted fs-9 mb-1">Tot Portafoglio</span>
                    <span class="fw-bold fs-3 text-info">€ {{ formatNumber(totalCommissionsPortfolio) }}</span>
                  </div>
                  <div class="d-flex flex-column align-items-end">
                    <span class="text-muted fs-9 mb-1">Incassati</span>
                    <span class="fw-bold fs-3 text-info">€ {{ formatNumber(totalCommissionsEarned) }}</span>
                  </div>
                </div>
              </div>
            </div>
            <!--end::Provvigioni-->
          </div>
        </div>
        <!--end::Totali Immobili-->

        <!--begin::Grafici Sincronizzati-->
        <div class="col-12 col-md-9">
          <div class="d-flex flex-column gap-4 h-100">
            <!--begin::Grafico Immobili (3 linee)-->
            <div class="card">
              <div class="card-body p-4">
                <h4 class="card-title fw-bold fs-5 mb-4">Andamento Immobili</h4>
                <apexchart
                  type="line"
                  height="200"
                  :options="chartOptionsProperties"
                  :series="seriesProperties"
                ></apexchart>
              </div>
            </div>
            <!--end::Grafico Immobili-->

            <!--begin::Grafico Provvigioni-->
            <div class="card">
              <div class="card-body p-4">
                <h4 class="card-title fw-bold fs-5 mb-4">Andamento Provvigioni</h4>
                <apexchart
                  type="area"
                  height="200"
                  :options="chartOptionsCommissions"
                  :series="seriesCommissions"
                ></apexchart>
              </div>
            </div>
            <!--end::Grafico Provvigioni-->
          </div>
        </div>
        <!--end::Grafici Sincronizzati-->
      </div>
    </div>
    <!--end::Body-->
  </div>
  <!--end::Charts Widget 3-->
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useThemeStore } from "@/stores/theme";
import { getCSSVariableValue } from "@/assets/ts/_utils";
import type { ApexOptions } from "apexcharts";

export default defineComponent({
  name: "widget-3",
  props: {
    widgetClasses: String,
    chartData: Object,
    soldChartData: Object,
    title: String,
    subTitle: String,
    totalCommissionsPortfolio: {
      type: Number,
      default: 0
    },
    totalCommissionsEarned: {
      type: Number,
      default: 0
    },
    commissionsMonthlyData: {
      type: Object,
      default: () => ({})
    },
  },
  components: {},
  setup(props) {
    const store = useThemeStore();

    const formatNumber = (value: number): string => {
      if (!value && value !== 0) return '0';
      return new Intl.NumberFormat('it-IT', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
    };

    // Formatter per provvigioni con 2 decimali
    const formatCommission = (value: number): string => {
      if (!value && value !== 0) return '0,00';
      return new Intl.NumberFormat('it-IT', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
    };


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
    
    // Funzione per ottenere colori delle linee visibili in entrambe le modalità
    const getLineColor = (cat: 'sale' | 'rent', isDark: boolean) => {
      if (isDark) {
        // Colori più luminosi per dark mode
        return cat === 'sale' ? '#4A9EFF' : '#52C9A3'; // Blu e verde più luminosi
      } else {
        // Usa i colori standard per light mode
        return getCategoryBaseColor(cat);
      }
    };

    const getButtonStyle = (cat: 'sale' | 'rent' | 'auction') => {
      const isDark = themeMode.value === 'dark';
      return {
        color: isDark ? '#fff' : getCategoryBaseColor(cat),
        border: `1px solid ${getCategoryBaseColor(cat)}`,
        backgroundColor: isDark ? getCategoryBaseColor(cat) : getCategoryLightColor(cat),
        fontWeight: '600'
      };
    };

    const getKeysAndValues = () => {
      const chartData = props.chartData as any ?? {};
      const soldChartData = props.soldChartData as any ?? {};
      const months = chartData.months ?? soldChartData.months ?? [];
      const data = chartData.data ?? {};
      const soldData = soldChartData.data ?? {};
      
      // Crea categorie duplicate per ogni mese per avere due colonne affiancate
      const categories: string[] = [];
      months.forEach((month: string) => {
        categories.push(`${month} I`); // I = Inseriti (sinistra)
        categories.push(`${month} V`); // V = Venduti (destra)
      });
      
      // Calcola i totali separati per inseriti e venduti
      let totalSaleInserted = 0;
      let totalSaleSold = 0;
      let totalRentInserted = 0;
      let totalRentSold = 0;
      let totalAuctionInserted = 0;
      let totalAuctionSold = 0;
      
      months.forEach((month: string) => {
        totalSaleInserted += data.sale?.[month] ?? 0;
        totalRentInserted += data.rent?.[month] ?? 0;
        totalAuctionInserted += data.auction?.[month] ?? 0;
        totalSaleSold += soldData.sale?.[month] ?? 0;
        totalRentSold += soldData.rent?.[month] ?? 0;
        totalAuctionSold += soldData.auction?.[month] ?? 0;
      });
      
      const totalSale = totalSaleInserted + totalSaleSold;
      const totalRent = totalRentInserted + totalRentSold;
      const totalAuction = totalAuctionInserted + totalAuctionSold;
      
      return {
        computedKeys: categories,
        months: months,
        totalSale,
        totalRent,
        totalAuction,
        totalSaleInserted,
        totalSaleSold,
        totalRentInserted,
        totalRentSold,
        totalAuctionInserted,
        totalAuctionSold,
        valuesSaleInserted: months.flatMap((month: string) => [
          data.sale?.[month] ?? 0,
          0
        ]),
        valuesRentInserted: months.flatMap((month: string) => [
          data.rent?.[month] ?? 0,
          0
        ]),
        valuesAuctionInserted: months.flatMap((month: string) => [
          data.auction?.[month] ?? 0,
          0
        ]),
        valuesSaleSold: months.flatMap((month: string) => [
          0,
          soldData.sale?.[month] ?? 0
        ]),
        valuesRentSold: months.flatMap((month: string) => [
          0,
          soldData.rent?.[month] ?? 0
        ]),
        valuesAuctionSold: months.flatMap((month: string) => [
          0,
          soldData.auction?.[month] ?? 0
        ])
      };
    };

    const themeMode = computed(() => {
      return store.mode;
    });

    // Prepara i dati per i mini grafici
    const getChartSeriesData = () => {
      const chartData = props.chartData as any ?? {};
      const soldChartData = props.soldChartData as any ?? {};
      const months = chartData.months ?? soldChartData.months ?? [];
      const data = chartData.data ?? {};
      const soldData = soldChartData.data ?? {};

      // Calcola i totali per categoria (separati per inseriti e venduti)
      const saleInserted = months.map((month: string) => data.sale?.[month] ?? 0);
      const saleSold = months.map((month: string) => soldData.sale?.[month] ?? 0);
      const rentInserted = months.map((month: string) => data.rent?.[month] ?? 0);
      const rentSold = months.map((month: string) => soldData.rent?.[month] ?? 0);
      const auctionInserted = months.map((month: string) => data.auction?.[month] ?? 0);
      const auctionSold = months.map((month: string) => soldData.auction?.[month] ?? 0);
      
      // Calcola i totali aggregati (tutti gli inseriti e tutti i venduti)
      const totalInserted = months.map((month: string, index: number) => 
        saleInserted[index] + rentInserted[index] + auctionInserted[index]
      );
      const totalSold = months.map((month: string, index: number) => 
        saleSold[index] + rentSold[index] + auctionSold[index]
      );

      // Per le provvigioni, calcola i totali mensili (non cumulativi) e la media
      // Se ci sono dati mensili delle provvigioni incassate, usali
      const commissionsMonthly = props.commissionsMonthlyData as Record<string, number> ?? {};
      
      // Calcola i totali mensili (somma per ogni mese, non cumulativa)
      const commissionsMonthlyTotals = months.map((month: string) => {
        // Prendi il valore mensile delle provvigioni incassate (se disponibile)
        return commissionsMonthly[month] ?? 0;
      });

      // Calcola la media annuale delle provvigioni
      const totalYearly = commissionsMonthlyTotals.reduce((sum, val) => sum + val, 0);
      const averageMonthly = months.length > 0 ? totalYearly / months.length : 0;
      
      // Crea array con la media per ogni mese (linea costante)
      const commissionsAverage = months.map(() => averageMonthly);

      return {
        months,
        saleInserted,
        saleSold,
        rentInserted,
        rentSold,
        auctionInserted,
        auctionSold,
        totalInserted,
        totalSold,
        commissionsMonthlyTotals,
        commissionsAverage
      };
    };

    const chartDataSeries = computed(() => getChartSeriesData());

    // Serie per grafico Immobili (2 linee: Inseriti e Venduti)
    const seriesProperties = computed(() => [
      {
        name: 'Inseriti',
        data: chartDataSeries.value.totalInserted
      },
      {
        name: 'Venduti',
        data: chartDataSeries.value.totalSold
      }
    ]);

    // Serie per grafico Provvigioni (solo barre)
    const seriesCommissions = computed(() => [
      {
        name: 'Totale Mensile',
        type: 'column',
        data: chartDataSeries.value.commissionsMonthlyTotals
      }
    ]);

    // Opzioni grafico Immobili (3 linee)
    const chartOptionsProperties = computed((): ApexOptions => {
      const isDark = themeMode.value === 'dark';
      const months = chartDataSeries.value.months;
      const labelColor = getCSSVariableValue("--bs-gray-500");
      const borderColor = getCSSVariableValue("--bs-gray-200");
      
      return {
        chart: {
          id: 'chart-properties',
          type: 'line',
          height: 200,
          toolbar: {
            show: false
          },
          zoom: {
            enabled: true,
            type: 'x'
          }
        },
        stroke: {
          curve: 'smooth',
          width: isDark ? 4 : 3 // Linea più spessa in dark mode per migliore visibilità
        },
        colors: [
          getLineColor('sale', isDark),
          getLineColor('rent', isDark)
        ],
        xaxis: {
          categories: months,
          labels: {
            style: {
              colors: labelColor,
              fontSize: "12px"
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: labelColor,
              fontSize: "12px"
            },
            formatter: (val: number) => Math.round(val).toString()
          }
        },
        grid: {
          borderColor: borderColor,
          strokeDashArray: 4
        },
        legend: {
          show: true,
          position: "top",
          horizontalAlign: "right"
        },
        tooltip: {
          shared: true,
          intersect: false,
          followCursor: true,
          custom: function({ series, seriesIndex, dataPointIndex, w }: any) {
            const chartDataSeriesValue = chartDataSeries.value;
            const month = chartDataSeriesValue.months[dataPointIndex];
            const saleIns = chartDataSeriesValue.saleInserted[dataPointIndex];
            const saleSold = chartDataSeriesValue.saleSold[dataPointIndex];
            const rentIns = chartDataSeriesValue.rentInserted[dataPointIndex];
            const rentSold = chartDataSeriesValue.rentSold[dataPointIndex];
            const auctionIns = chartDataSeriesValue.auctionInserted[dataPointIndex];
            const auctionSold = chartDataSeriesValue.auctionSold[dataPointIndex];
            const totalIns = chartDataSeriesValue.totalInserted[dataPointIndex];
            const totalSold = chartDataSeriesValue.totalSold[dataPointIndex];
            
            const saleColor = getCategoryBaseColor('sale');
            const rentColor = getCategoryBaseColor('rent');
            const auctionColor = getCategoryBaseColor('auction');
            
            // Colori per dark mode
            const isDark = themeMode.value === 'dark';
            const titleColor = isDark ? '#E0E0E0' : '#333333';
            const textColor = isDark ? '#E0E0E0' : '#333333';
            const detailColor = isDark ? '#AAAAAA' : '#666666';
            
            return `
              <div class="apexcharts-tooltip-title" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px; margin-bottom: 6px; color: ${titleColor};">${month}</div>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <div>
                  <div style="display: flex; align-items: center; margin-bottom: 4px;">
                    <span style="display: inline-block; width: 12px; height: 12px; background-color: ${saleColor}; border-radius: 2px; margin-right: 6px;"></span>
                    <span style="font-size: 13px; font-weight: 600; color: ${textColor};">Inseriti: ${Math.round(totalIns)}</span>
                  </div>
                  <div style="padding-left: 18px; font-size: 12px; color: ${detailColor};">
                    Vendita: ${saleIns} | Affitto: ${rentIns} | Aste: ${auctionIns}
                  </div>
                </div>
                <div>
                  <div style="display: flex; align-items: center; margin-bottom: 4px;">
                    <span style="display: inline-block; width: 12px; height: 12px; background-color: ${rentColor}; border-radius: 2px; margin-right: 6px;"></span>
                    <span style="font-size: 13px; font-weight: 600; color: ${textColor};">Venduti: ${Math.round(totalSold)}</span>
                  </div>
                  <div style="padding-left: 18px; font-size: 12px; color: ${detailColor};">
                    Vendita: ${saleSold} | Affitto: ${rentSold} | Aste: ${auctionSold}
                  </div>
                </div>
              </div>
            `;
          }
        },
        markers: {
          size: 4,
          hover: {
            size: 6
          }
        }
      };
    });

    // Opzioni grafico Provvigioni (NON sincronizzato con immobili)
    const chartOptionsCommissions = computed((): ApexOptions => {
      const isDark = themeMode.value === 'dark';
      const months = chartDataSeries.value.months;
      const labelColor = getCSSVariableValue("--bs-gray-500");
      const borderColor = getCSSVariableValue("--bs-gray-200");
      const infoColor = getCSSVariableValue("--bs-info") || (isDark ? "#17a2b8" : "#17a2b8");
      const secondaryColor = getCSSVariableValue("--bs-gray-600") || (isDark ? "#AAAAAA" : "#666666");
      
      return {
        chart: {
          id: 'chart-commissions',
          type: 'line',
          height: 200,
          toolbar: {
            show: false
          },
          zoom: {
            enabled: true,
            type: 'x'
          }
        },
        plotOptions: {
          bar: {
            columnWidth: '60%',
            borderRadius: 4
          }
        },
        stroke: {
          width: 0 // Nessuno stroke per le barre
        },
        fill: {
          type: 'solid',
          opacity: 0.8 // Opacità per barre
        },
        colors: [infoColor],
        xaxis: {
          categories: months,
          labels: {
            style: {
              colors: labelColor,
              fontSize: "12px"
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: labelColor,
              fontSize: "12px"
            },
            formatter: (val: number) => `€ ${formatCommission(val)}`
          }
        },
        grid: {
          borderColor: borderColor,
          strokeDashArray: 4
        },
        legend: {
          show: true,
          position: "top",
          horizontalAlign: "right",
          fontSize: "14px",
          fontWeight: 600
        },
        tooltip: {
          shared: false,
          intersect: true,
          followCursor: true,
          custom: function({ series, seriesIndex, dataPointIndex, w }: any) {
            const chartDataSeriesValue = chartDataSeries.value;
            const month = chartDataSeriesValue.months[dataPointIndex];
            const commissionValue = chartDataSeriesValue.commissionsMonthlyTotals[dataPointIndex];
            
            // Colori per dark mode
            const isDark = themeMode.value === 'dark';
            const titleColor = isDark ? '#E0E0E0' : '#333333';
            const textColor = isDark ? '#E0E0E0' : '#333333';
            const infoColor = getCSSVariableValue("--bs-info") || (isDark ? "#17a2b8" : "#17a2b8");
            
            return `
              <div class="apexcharts-tooltip-title" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px; margin-bottom: 6px; color: ${titleColor};">${month}</div>
              <div style="display: flex; align-items: center;">
                <span style="display: inline-block; width: 12px; height: 12px; background-color: ${infoColor}; border-radius: 2px; margin-right: 6px;"></span>
                <span style="font-size: 13px; font-weight: 600; color: ${textColor};">Provvigioni: € ${formatCommission(commissionValue)}</span>
              </div>
            `;
          }
        }
      };
    });

    // Watch per aggiornare i grafici quando cambiano i dati
    watch(() => [props.chartData, props.soldChartData], () => {
      // I computed si aggiornano automaticamente quando cambiano i props
    }, { deep: true });

    // Watch per le provvigioni
    watch(() => [props.totalCommissionsPortfolio, props.totalCommissionsEarned, props.commissionsMonthlyData], () => {
      // I computed si aggiornano automaticamente quando cambiano i props
    }, { deep: true });

    watch(themeMode, () => {
      // I computed si aggiornano automaticamente
    });

    const totals = computed(() => {
      const { 
        totalSale, 
        totalRent, 
        totalAuction,
        totalSaleInserted,
        totalSaleSold,
        totalRentInserted,
        totalRentSold,
        totalAuctionInserted,
        totalAuctionSold
      } = getKeysAndValues();
      return {
        totalSale,
        totalRent,
        totalAuction,
        totalSaleInserted,
        totalSaleSold,
        totalRentInserted,
        totalRentSold,
        totalAuctionInserted,
        totalAuctionSold
      };
    });

    // Computed per i totali (reattivi ai cambiamenti dei dati)
    const totalSale = computed(() => totals.value.totalSale);
    const totalRent = computed(() => totals.value.totalRent);
    const totalAuction = computed(() => totals.value.totalAuction);
    const totalSaleInserted = computed(() => totals.value.totalSaleInserted);
    const totalSaleSold = computed(() => totals.value.totalSaleSold);
    const totalRentInserted = computed(() => totals.value.totalRentInserted);
    const totalRentSold = computed(() => totals.value.totalRentSold);
    const totalAuctionInserted = computed(() => totals.value.totalAuctionInserted);
    const totalAuctionSold = computed(() => totals.value.totalAuctionSold);

    return {
      getButtonStyle,
      formatNumber,
      totalSale,
      totalRent,
      totalAuction,
      totalSaleInserted,
      totalSaleSold,
      totalRentInserted,
      totalRentSold,
      totalAuctionInserted,
      totalAuctionSold,
      totalCommissionsPortfolio: computed(() => props.totalCommissionsPortfolio),
      totalCommissionsEarned: computed(() => props.totalCommissionsEarned),
      seriesProperties,
      seriesCommissions,
      chartOptionsProperties,
      chartOptionsCommissions,
    };
  },
});
</script>

<!-- CSS moved to global file: dark-mode.css -->
