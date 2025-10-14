<template>
  <!--begin::Analytics Dashboard Widget-->
  <div class="card card-xl-stretch mb-xl-10">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5 pb-3">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">📊 Analytics Dashboard</span>
        <span class="text-muted fw-semibold fs-7">Panoramica completa delle performance</span>
      </h3>
    </div>
    <!--end::Header-->
    
    <!--begin::Body-->
    <div class="card-body p-6 pt-2">
      <div class="row g-4">
        <!--begin::KPI Column (Left Side)-->
        <div class="col-xl-4">
          <div class="row g-4 h-100">
            <!--begin::KPI Cards in 2x2 Grid-->
            
            <!--begin::KPI Card - Richieste-->
            <div class="col-6">
              <div 
                @click="selectKPI('requests')"
                :class="[
                  'card cursor-pointer hover-elevate-up transition-all h-100 filtered-kpi-card',
                  selectedKPI === 'requests' ? 'border border-success border-3 shadow-sm' : 'border border-gray-200'
                ]"
                style="transition: all 0.3s ease; background: linear-gradient(135deg, #e8f8f5 0%, #ffffff 100%);"
              >
                <div class="card-body p-3 text-center d-flex flex-column justify-content-center">
                  <div class="symbol symbol-45px mx-auto mb-2">
                    <span class="symbol-label" style="background: linear-gradient(135deg, #1bc5bd 0%, #0bb7af 100%);">
                      <i class="ki-duotone ki-chart-simple fs-3 text-white">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                  <span class="path4"></span>
                </i>
                    </span>
                  </div>
                  <div class="fw-bold fs-2 text-success mb-1">{{ yearTotals.requests }}</div>
                  <div class="text-gray-700 fs-8 fw-bold">Richieste</div>
                </div>
              </div>
            </div>
            <!--end::KPI Card - Richieste-->

            <!--begin::KPI Card - Immobili-->
            <div class="col-6">
              <div 
                @click="selectKPI('properties')"
                :class="[
                  'card cursor-pointer hover-elevate-up transition-all h-100 filtered-kpi-card',
                  selectedKPI === 'properties' ? 'border border-primary border-3 shadow-sm' : 'border border-gray-200'
                ]"
                style="transition: all 0.3s ease; background: linear-gradient(135deg, #e1f0ff 0%, #ffffff 100%);"
              >
                <div class="card-body p-3 text-center d-flex flex-column justify-content-center">
                  <div class="symbol symbol-45px mx-auto mb-2">
                    <span class="symbol-label" style="background: linear-gradient(135deg, #3699ff 0%, #0080ff 100%);">
                      <i class="ki-duotone ki-home-2 fs-3 text-white">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                    </span>
                  </div>
                  <div class="fw-bold fs-2 text-primary mb-1">{{ yearTotals.properties }}</div>
                  <div class="text-gray-700 fs-8 fw-bold">Immobili</div>
                </div>
              </div>
            </div>
            <!--end::KPI Card - Immobili-->

            <!--begin::KPI Card - Clienti-->
            <div class="col-6">
              <div 
                @click="selectKPI('customers')"
                :class="[
                  'card cursor-pointer hover-elevate-up transition-all h-100 filtered-kpi-card',
                  selectedKPI === 'customers' ? 'border border-danger border-3 shadow-sm' : 'border border-gray-200'
                ]"
                style="transition: all 0.3s ease; background: linear-gradient(135deg, #ffe2e5 0%, #ffffff 100%);"
              >
                <div class="card-body p-3 text-center d-flex flex-column justify-content-center">
                  <div class="symbol symbol-45px mx-auto mb-2">
                    <span class="symbol-label" style="background: linear-gradient(135deg, #f64e60 0%, #d63447 100%);">
                      <i class="ki-duotone ki-profile-user fs-3 text-white">
                        <span class="path1"></span>
                        <span class="path2"></span>
                        <span class="path3"></span>
                      </i>
                    </span>
                  </div>
                  <div class="fw-bold fs-2 text-danger mb-1">{{ yearTotals.customers }}</div>
                  <div class="text-gray-700 fs-8 fw-bold">Clienti</div>
                </div>
              </div>
            </div>
            <!--end::KPI Card - Clienti-->

            <!--begin::KPI Card - Appuntamenti-->
            <div class="col-6">
              <div 
                @click="selectKPI('appointments')"
                :class="[
                  'card cursor-pointer hover-elevate-up transition-all h-100 filtered-kpi-card',
                  selectedKPI === 'appointments' ? 'border border-warning border-3 shadow-sm' : 'border border-gray-200'
                ]"
                style="transition: all 0.3s ease; background: linear-gradient(135deg, #fff8e1 0%, #ffffff 100%);"
              >
                <div class="card-body p-3 text-center d-flex flex-column justify-content-center">
                  <div class="symbol symbol-45px mx-auto mb-2">
                    <span class="symbol-label" style="background: linear-gradient(135deg, #ffa800 0%, #ff9500 100%);">
                      <i class="ki-duotone ki-calendar fs-3 text-white">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                    </span>
                  </div>
                  <div class="fw-bold fs-2 text-warning mb-1">{{ yearTotals.appointments }}</div>
                  <div class="text-gray-700 fs-8 fw-bold">Appuntamenti</div>
                </div>
              </div>
            </div>
            <!--end::KPI Card - Appuntamenti-->

          </div>
        </div>
        <!--end::KPI Column-->

        <!--begin::Content Column (Right Side)-->
        <div class="col-xl-8">
          <div class="card h-100">
            <div v-if="currentChartTitle || currentChartSubtitle" class="card-header border-0 pt-5 pb-3">
              <h3 class="card-title align-items-start flex-column">
                <span v-if="currentChartTitle" class="card-label fw-bold fs-3 mb-1">{{ currentChartTitle }}</span>
                <span v-if="currentChartSubtitle" class="text-muted fw-semibold fs-7">{{ currentChartSubtitle }}</span>
              </h3>
              <div class="card-toolbar">
                <a 
                  :href="currentSectionRoute" 
                  class="btn btn-sm btn-light-primary fw-bold"
                >
                  <i class="ki-duotone ki-arrow-right fs-4 me-1">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
                  Vai nella sezione
                </a>
              </div>
            </div>
            <div class="card-body pt-2">
              <!--begin::Chart-->
              <div v-if="!showInfoSection">
              <apexchart
                  :ref="chartRef"
                  :key="chartKey"
                type="bar"
                :options="chartOptions"
                :series="chartSeries"
                height="350"
                />
              </div>
              <!--end::Chart-->

              <!--begin::Info Section-->
              <div v-if="showInfoSection" class="info-section-container">
                <!--begin::Requests Info-->
                <div v-if="selectedKPI === 'requests'" class="d-flex flex-column h-100">
                  <div class="text-center py-5">
                    <i class="ki-duotone ki-chart-simple fs-1 text-success mb-3">
                      <span class="path1"></span>
                      <span class="path2"></span>
                      <span class="path3"></span>
                      <span class="path4"></span>
                    </i>
                    <h4 class="fw-bold fs-3 text-gray-800 mb-2">Richieste</h4>
                    <p class="text-muted fs-6">Dettagli delle richieste disponibili nella sezione dedicata</p>
                  </div>
                </div>
                <!--end::Requests Info-->
                
                <!--begin::Properties Info-->
                <div v-if="selectedKPI === 'properties'" class="d-flex flex-column h-100">
                  <div class="text-center py-5">
                    <i class="ki-duotone ki-home-2 fs-1 text-primary mb-3">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <h4 class="fw-bold fs-3 text-gray-800 mb-2">Immobili</h4>
                    <p class="text-muted fs-6">Dettagli degli immobili disponibili nella sezione dedicata</p>
                  </div>
                </div>
                <!--end::Properties Info-->
                
                <!--begin::Customers Info-->
                <div v-if="selectedKPI === 'customers'" class="d-flex flex-column h-100">
                  <div class="text-center py-5">
                    <i class="ki-duotone ki-profile-user fs-1 text-danger mb-3">
                      <span class="path1"></span>
                      <span class="path2"></span>
                      <span class="path3"></span>
                    </i>
                    <h4 class="fw-bold fs-3 text-gray-800 mb-2">Clienti</h4>
                    <p class="text-muted fs-6">Dettagli dei clienti disponibili nella sezione dedicata</p>
                  </div>
                </div>
                <!--end::Customers Info-->
                
                <!--begin::Appointments Info-->
                <div v-if="selectedKPI === 'appointments'" class="d-flex flex-column h-100">
                  <div class="text-center py-5">
                    <i class="ki-duotone ki-calendar fs-1 text-warning mb-3">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <h4 class="fw-bold fs-3 text-gray-800 mb-2">Appuntamenti</h4>
                    <p class="text-muted fs-6">Dettagli degli appuntamenti disponibili nella sezione dedicata</p>
                  </div>
                </div>
                <!--end::Appointments Info-->
              </div>
              <!--end::Info Section-->
            </div>
          </div>
        </div>
        <!--end::Content Column-->
      </div>
    </div>
    <!--end::Body-->
  </div>
  <!--end::Analytics Dashboard Widget-->
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import type { PropType } from "vue";
import type { ApexOptions } from "apexcharts";
import type VueApexCharts from "vue3-apexcharts";
type KPIType = 'requests' | 'properties' | 'customers' | 'appointments';

export default defineComponent({
  name: "widget-11",
  props: {
    kpiData: {
      type: Object as PropType<{
        requests: { total: number; monthlyData: Record<string, number>; closedData?: Record<string, number> };
        properties: { total: number; monthlyData: Record<string, number>; soldData?: Record<string, number> };
        customers: { total: number; monthlyData: Record<string, number>; buyersData?: Record<string, number> };
        appointments: { total: number; monthlyData: Record<string, number>; confirmedData?: Record<string, number> };
      }>,
      required: true
    },
    selectedYear: {
      type: Number,
      default: () => new Date().getFullYear()
    }
  },
  setup(props) {
    const chartRef = ref<typeof VueApexCharts | null>(null);
    const selectedKPI = ref<KPIType>('properties');
    const chartKey = ref<number>(0);
    
    // Year filter (synchronized with Widget13)
    const currentYear = new Date().getFullYear();
    const selectedYear = ref<number>(props.selectedYear || currentYear);
    const availableYears = computed(() => {
      const years = [];
      for (let i = 0; i < 6; i++) {
        years.push(currentYear - i);
      }
      return years;
    });

    // Generate months for selected year
    const generateMonthlyLabels = (year: number) => {
      const months = [];
      
      for (let i = 0; i < 12; i++) {
        const date = new Date(year, i, 1);
        const monthKey = date.toLocaleDateString('it-IT', { month: 'short', year: '2-digit' });
        months.push(monthKey);
      }
      
      return months;
    };

    const months = computed(() => generateMonthlyLabels(selectedYear.value));

    // Check if we should show info section instead of chart
    const showInfoSection = computed(() => {
      return false; // Always show charts now
    });

    // Get chart data based on selected KPI and year
    const getChartData = () => {
      const kpi = selectedKPI.value;
      const data = props.kpiData[kpi];
      
      if (!data) return { primary: [], secondary: [] };

      const primaryData = months.value.map(month => data.monthlyData[month] || 0);
      
      let secondaryData: number[] = [];
      
      // Add secondary data for specific KPIs
      if (kpi === 'properties' && 'soldData' in data && data.soldData) {
        secondaryData = months.value.map(month => data.soldData![month] || 0);
      } else if (kpi === 'requests' && 'closedData' in data && data.closedData) {
        secondaryData = months.value.map(month => data.closedData![month] || 0);
      } else if (kpi === 'appointments' && 'confirmedData' in data && data.confirmedData) {
        secondaryData = months.value.map(month => data.confirmedData![month] || 0);
      } else if (kpi === 'customers' && 'buyersData' in data && data.buyersData) {
        secondaryData = months.value.map(month => data.buyersData![month] || 0);
      }

      return { primary: primaryData, secondary: secondaryData };
    };

    // Get totals for selected year for a specific KPI
    const getYearTotals = (kpi?: KPIType) => {
      const targetKpi = kpi || selectedKPI.value;
      const data = props.kpiData[targetKpi];
      
      if (!data) return 0;

      // Sum all months for the selected year
      const yearTotal = months.value.reduce((total, month) => {
        return total + (data.monthlyData[month] || 0);
      }, 0);

      return yearTotal;
    };

    // Get all year totals for all KPIs
    const getAllYearTotals = () => {
      const totals: Record<string, number> = {};
      const kpiTypes: KPIType[] = ['requests', 'properties', 'customers', 'appointments'];
      
      kpiTypes.forEach(kpi => {
        totals[kpi] = getYearTotals(kpi);
      });
      
      return totals;
    };

    // Computed property for all year totals
    const yearTotals = computed(() => getAllYearTotals());

    // Chart configuration based on selected KPI
    const chartConfig = computed(() => {
      const configs = {
        requests: {
          title: '📋 Andamento Richieste',
          subtitle: `Richieste inserite ed evase - Anno ${selectedYear.value}`,
          primaryLabel: 'Richieste Inserite',
          primaryColor: '#1bc5bd',
          secondaryLabel: 'Richieste Evase',
          secondaryColor: '#8950fc'
        },
        properties: {
          title: '🏠 Andamento Immobili',
          subtitle: `Immobili inseriti e venduti - Anno ${selectedYear.value}`,
          primaryLabel: 'Immobili Inseriti',
          primaryColor: '#3699ff',
          secondaryLabel: 'Immobili Venduti',
          secondaryColor: '#f64e60'
        },
        customers: {
          title: '👥 Andamento Clienti',
          subtitle: `Clienti venditori e acquirenti - Anno ${selectedYear.value}`,
          primaryLabel: 'Clienti Venditori',
          primaryColor: '#f64e60',
          secondaryLabel: 'Clienti Acquirenti',
          secondaryColor: '#1bc5bd'
        },
        appointments: {
          title: '📅 Andamento Appuntamenti',
          subtitle: `Appuntamenti fissati e confermati - Anno ${selectedYear.value}`,
          primaryLabel: 'Appuntamenti Fissati',
          primaryColor: '#ffa800',
          secondaryLabel: 'Appuntamenti Confermati',
          secondaryColor: '#1bc5bd'
        }
      };

      return configs[selectedKPI.value];
    });

    const currentChartTitle = computed(() => {
      const config = chartConfig.value;
      return 'title' in config ? config.title : '';
    });
    
    const currentChartSubtitle = computed(() => {
      const config = chartConfig.value;
      return 'subtitle' in config ? config.subtitle : '';
    });
    
    // Section route based on selected KPI
    const currentSectionRoute = computed(() => {
      const routes = {
        requests: '#/requests',
        properties: '#/properties',
        customers: '#/clients',
        appointments: '#/calendar'
      };
      return routes[selectedKPI.value];
    });

    // Chart series
    const chartSeries = computed(() => {
      const data = getChartData();
      const config = chartConfig.value;
      
      const series = [
        {
          name: config.primaryLabel,
          data: data.primary,
          color: config.primaryColor
        }
      ];

      // Add secondary series if available
      if (data.secondary.length > 0 && config.secondaryLabel) {
        series.push({
          name: config.secondaryLabel,
          data: data.secondary,
          color: config.secondaryColor
        });
      }

      return series;
    });

    // Chart options
    const chartOptions = computed((): ApexOptions => {
      return {
        chart: {
          type: "bar",
          height: 350,
          toolbar: { show: true },
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '60%',
            borderRadius: 8,
            borderRadiusApplication: 'end'
          }
        },
        xaxis: {
          categories: months.value,
          labels: {
            style: {
              colors: "#6c757d",
              fontSize: "12px"
            }
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: "#6c757d",
              fontSize: "12px"
            },
            formatter: (val) => Math.round(val).toString()
          }
        },
        grid: {
          borderColor: "#e9ecef",
          strokeDashArray: 4,
          xaxis: {
            lines: {
              show: true
            }
          },
          yaxis: {
            lines: {
              show: true
            }
          }
        },
        legend: {
          show: true,
          position: "top",
          horizontalAlign: "right",
          fontSize: "14px",
          fontWeight: 600
        },
        tooltip: {
          enabled: true,
          shared: true,
          intersect: false,
          followCursor: true,
          style: {
            fontSize: "12px"
          },
          y: {
            formatter: (val) => Math.round(val).toString()
          }
        },
        dataLabels: {
          enabled: false
        }
      };
    });


    // Methods
    const selectKPI = (kpi: KPIType) => {
      selectedKPI.value = kpi;
      chartKey.value++;
    };

    // Watch for changes in selectedYear prop
    watch(() => props.selectedYear, (newYear) => {
      if (newYear) {
        selectedYear.value = newYear;
        chartKey.value++; // Force chart refresh
      }
    });

    return {
      chartRef,
      chartKey,
      selectedKPI,
      chartSeries,
      chartOptions,
      currentChartTitle,
      currentChartSubtitle,
      currentSectionRoute,
      selectKPI,
      showInfoSection,
      getYearTotals,
      yearTotals,
      selectedYear,
      availableYears
    };
  }
});
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.hover-elevate-up {
  transition: all 0.3s ease;
}

.hover-elevate-up:hover {
  box-shadow: 0 1rem 2rem 0.5rem rgba(0, 0, 0, 0.15);
  z-index: 10;
}

.transition-all {
  transition: all 0.3s ease;
}

.symbol-label {
  border-radius: 0.95rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

/* Layout adattivo per la sezione info */
.info-section-container {
  height: 350px;
  overflow: visible;
}

/* Agencies List Container per Widget11 */
.agencies-list-container {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0;
  max-height: 320px;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  box-sizing: border-box;
}

/* Agency Item Styles per Widget11 */
.agency-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  min-height: 120px;
  display: flex;
  align-items: center;
}

.agency-item:last-child {
  border-bottom: none;
}

.agency-item:hover {
  background-color: transparent;
}

/* KPI Cards Layout */
.row.h-100 {
  height: 100% !important;
}

.row.h-100 .col-6 {
  height: calc(50% - 0.5rem);
  margin-bottom: 1rem;
}

.row.h-100 .col-6:last-child,
.row.h-100 .col-6:nth-last-child(2) {
  margin-bottom: 0;
}

/* Stili specifici per le agenzie */
.agencies-grid {
  display: grid;
  gap: 1.5rem;
  height: 100%;
  align-content: stretch;
}

/* Layout adattivo per le agenzie */
.agencies-grid.single {
  grid-template-columns: 1fr;
  max-width: 800px;
  margin: 0 auto;
}

.agencies-grid.single-large {
  grid-template-columns: 1fr;
  max-width: 100%;
  margin: 0;
  padding: 0;
}

.agencies-grid.double {
  grid-template-columns: 1fr 1fr;
}

.agencies-grid.triple {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}

.agencies-grid.triple .agency-card:last-child {
  grid-column: 1 / -1;
}

.agencies-grid.multiple {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

/* Classi per le card delle agenzie */
.agency-card.full-width {
  width: 100%;
}

.agency-card.full-width-large {
  width: 100%;
  min-height: 500px;
}

/* Stili specifici per la vista grande dell'agenzia */
.agencies-grid.single-large .agency-card-inner {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 1.5rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.agencies-grid.single-large .agency-card-inner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, #3699ff 0%, #0bb7af 50%, #1bc5bd 100%);
}

.agencies-grid.single-large .agency-card-inner:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2) !important;
}

/* Stili per il simbolo più grande */
.agencies-grid.single-large .symbol-80px {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

/* Stili per i dettagli in layout a griglia */
.agencies-grid.single-large .row.g-4 > div {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.agencies-grid.single-large .row.g-4 > div:hover {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}


.agency-card.half-width {
  width: 50%;
}

.agency-card.third-width {
  width: 33.333%;
}

.agency-card.auto-width {
  width: auto;
}

/* Stili per le card delle agenzie */
.agency-card {
  height: 100%;
}

.agency-card-inner {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 1rem;
  position: relative;
  overflow: hidden;
}

.agency-card-inner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #3699ff 0%, #0bb7af 100%);
}

.agency-card-inner:hover {
  box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.15) !important;
}

/* Responsive per agenzie */
@media (max-width: 1200px) {
  .agencies-grid.double,
  .agencies-grid.triple,
  .agencies-grid.multiple {
    grid-template-columns: 1fr;
  }
  
  .agency-card.half-width,
  .agency-card.third-width {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .agencies-grid {
    grid-template-columns: 1fr !important;
  }
  
  .agency-card {
    width: 100% !important;
  }
}

/* Stili per distinguere i due gruppi di KPI */
.static-kpi-card {
  position: relative;
}

.static-kpi-card::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 0.75rem;
  z-index: -1;
  opacity: 0.3;
}

.filtered-kpi-card {
  position: relative;
}

.filtered-kpi-card::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%);
  border-radius: 0.75rem;
  z-index: -1;
  opacity: 0.1;
}

/* Indicatore visivo per i KPI filtrati */
.filtered-kpi-card .symbol-label::after {
  content: '📅';
  position: absolute;
  top: -5px;
  right: -5px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  box-shadow: 0 2px 6px rgba(102, 126, 234, 0.3);
}

.static-kpi-card .symbol-label::after {
  content: '🏢';
  position: absolute;
  top: -5px;
  right: -5px;
  background: linear-gradient(135deg, #6c757d 0%, #495057 100%);
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  box-shadow: 0 2px 6px rgba(108, 117, 125, 0.3);
}

</style>
