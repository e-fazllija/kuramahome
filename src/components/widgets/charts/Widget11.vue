<template>
  <!--begin::Analytics Dashboard Widget-->
  <div class="row g-4 mb-xl-10">
    <!--begin::Chart Widget (7/12)-->
    <div class="col-xl-7">
      <div class="card card-xl-stretch widget11-chart-card">
        <!--begin::Card Header-->
        <div class="card-header border-0 pt-5 pb-3">
          <h3 class="card-title align-items-start flex-column">
            <span class="card-label fw-bold fs-4 mb-1">{{ currentChartTitle }}</span>
            <span class="text-muted fw-semibold fs-7">{{ currentChartSubtitle }}</span>
          </h3>
        </div>
        <!--end::Card Header-->

        <!--begin::Card Body-->
        <div class="card-body p-6 pt-2">
          <div class="d-flex flex-column gap-4">
            <!--begin::KPI Stack-->
            <div class="row g-2">
              <!--begin::KPI Card - Richieste-->
              <div class="col-6 col-xl-3">
                <div 
                  @click="selectKPI('requests')"
                  :class="[
                    'card cursor-pointer hover-elevate-up transition-all h-100 filtered-kpi-card',
                    selectedKPI === 'requests' ? 'border border-success border-3 shadow-sm' : 'border border-gray-200'
                  ]"
                  style="transition: all 0.3s ease; background: linear-gradient(135deg, #e8f8f5 0%, #ffffff 100%);"
                >
                  <div class="card-body p-1 text-center d-flex flex-column justify-content-center">
                    <div class="symbol symbol-24px mx-auto mb-1">
                      <span class="symbol-label" style="background: linear-gradient(135deg, #1bc5bd 0%, #0bb7af 100%);">
                        <i class="ki-duotone ki-chart-simple fs-5 text-white">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                    <span class="path4"></span>
                  </i>
                      </span>
                    </div>
                    <div class="fw-bold fs-5 text-success mb-1">{{ yearTotals.requests }}</div>
                    <div class="text-gray-700 fs-9 fw-bold">Richieste</div>
                  </div>
                </div>
              </div>
              <!--end::KPI Card - Richieste-->

              <!--begin::KPI Card - Immobili-->
              <div class="col-6 col-xl-3">
                <div 
                  @click="selectKPI('properties')"
                  :class="[
                    'card cursor-pointer hover-elevate-up transition-all h-100 filtered-kpi-card',
                    selectedKPI === 'properties' ? 'border border-primary border-3 shadow-sm' : 'border border-gray-200'
                  ]"
                  style="transition: all 0.3s ease; background: linear-gradient(135deg, #e1f0ff 0%, #ffffff 100%);"
                >
                  <div class="card-body p-1 text-center d-flex flex-column justify-content-center">
                    <div class="symbol symbol-24px mx-auto mb-1">
                      <span class="symbol-label" style="background: linear-gradient(135deg, #3699ff 0%, #0080ff 100%);">
                        <i class="ki-duotone ki-home-2 fs-5 text-white">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                      </span>
                    </div>
                    <div class="fw-bold fs-5 text-primary mb-1">{{ yearTotals.properties }}</div>
                    <div class="text-gray-700 fs-9 fw-bold">Immobili</div>
                  </div>
                </div>
              </div>
              <!--end::KPI Card - Immobili-->

              <!--begin::KPI Card - Clienti-->
              <div class="col-6 col-xl-3">
                <div 
                  @click="selectKPI('customers')"
                  :class="[
                    'card cursor-pointer hover-elevate-up transition-all h-100 filtered-kpi-card',
                    selectedKPI === 'customers' ? 'border border-danger border-3 shadow-sm' : 'border border-gray-200'
                  ]"
                  style="transition: all 0.3s ease; background: linear-gradient(135deg, #ffe2e5 0%, #ffffff 100%);"
                >
                  <div class="card-body p-1 text-center d-flex flex-column justify-content-center">
                    <div class="symbol symbol-24px mx-auto mb-1">
                      <span class="symbol-label" style="background: linear-gradient(135deg, #f64e60 0%, #d63447 100%);">
                        <i class="ki-duotone ki-profile-user fs-5 text-white">
                          <span class="path1"></span>
                          <span class="path2"></span>
                          <span class="path3"></span>
                        </i>
                      </span>
                    </div>
                    <div class="fw-bold fs-5 text-danger mb-1">{{ yearTotals.customers }}</div>
                    <div class="text-gray-700 fs-9 fw-bold">Clienti</div>
                  </div>
                </div>
              </div>
              <!--end::KPI Card - Clienti-->

              <!--begin::KPI Card - Appuntamenti-->
              <div class="col-6 col-xl-3">
                <div 
                  @click="selectKPI('appointments')"
                  :class="[
                    'card cursor-pointer hover-elevate-up transition-all h-100 filtered-kpi-card',
                    selectedKPI === 'appointments' ? 'border border-warning border-3 shadow-sm' : 'border border-gray-200'
                  ]"
                  style="transition: all 0.3s ease; background: linear-gradient(135deg, #fff8e1 0%, #ffffff 100%);"
                >
                  <div class="card-body p-1 text-center d-flex flex-column justify-content-center">
                    <div class="symbol symbol-24px mx-auto mb-1">
                      <span class="symbol-label" style="background: linear-gradient(135deg, #ffa800 0%, #ff9500 100%);">
                        <i class="ki-duotone ki-calendar fs-5 text-white">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                      </span>
                    </div>
                    <div class="fw-bold fs-5 text-warning mb-1">{{ yearTotals.appointments }}</div>
                    <div class="text-gray-700 fs-9 fw-bold">Appuntamenti</div>
                  </div>
                </div>
              </div>
              <!--end::KPI Card - Appuntamenti-->
            </div>
            <!--end::KPI Stack-->

            <!--begin::Chart + Info-->
            <div class="card">
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
            <!--end::Chart + Info-->
          </div>
        </div>
        <!--end::Card Body-->
      </div>
    </div>
    <!--end::Chart Widget-->

    <!--begin::Match Requests Widget (5/12)-->
    <div class="col-xl-5">
      <!--begin::Table Card-->
      <div class="card card-xl-stretch  widget11-table-card">
        <!--begin::Card Header-->
        <div class="card-header border-0 pt-5 pb-3">
          <h3 class="card-title align-items-start flex-column">
            <span class="card-label fw-bold fs-4 mb-1">Top Match Richieste</span>
            <span class="text-muted fw-semibold fs-7">Lista richieste matchate</span>
          </h3>
        </div>
        <!--end::Card Header-->

        <!--begin::Card Body-->
        <div class="card-body py-3">
          <!--begin::Table Container-->
          <div class="table-responsive widget11-table-container">
            <!--begin::Table-->
            <table class="table align-middle gs-0 gy-4">
              <!--begin::Table Head-->
              <thead>
                <tr class="fw-bold text-muted bg-light">
                  <th class="ps-4 min-w-80px fw-bold fs-7 text-uppercase">Richieste</th>
                  <th class="text-end min-w-80px fw-bold fs-7 text-uppercase">Immobili</th>
                  <th class="text-end min-w-80px fw-bold fs-7 text-uppercase">Match</th>
                  <th class="text-end pe-4 min-w-100px fw-bold fs-7 text-uppercase">Azioni</th>
                </tr>
              </thead>
              <!--end::Table Head-->

              <!--begin::Table Body-->
              <tbody>
                <tr v-if="loadingMatchedRequests">
                  <td colspan="4" class="text-center py-5">
                    <span class="text-muted">Caricamento...</span>
                  </td>
                </tr>
                <tr v-else-if="!tableRows || tableRows.length === 0">
                  <td colspan="4" class="text-center py-5">
                    <span class="text-muted">Nessuna richiesta matchata disponibile</span>
                  </td>
                </tr>
                <tr
                  v-else
                  v-for="(item, index) in tableRows"
                  :key="item.RequestId"
                  class="table-row-hover"
                >
                  <td class="ps-4">
                    <span class="text-dark fw-bold d-block fs-6">{{ item.CustomerLastName }} {{ item.CustomerName }}</span>
                  </td>
                  <td class="text-end">
                    <span class="text-dark fw-bold d-block fs-6">{{ item.PropertyTitle }}</span>
                  </td>
                  <td class="text-end">
                    <span class="text-dark fw-bold d-block fs-6">{{ item.MatchPercentage }}%</span>
                  </td>
                  <td class="text-end pe-4">
                    <a
                      href="#"
                      @click.prevent="navigateToRequest(item.RequestId)"
                      class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                      :class="getKPIButtonColor()"
                    >
                      <i class="ki-duotone ki-arrow-right fs-5">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                    </a>
                  </td>
                </tr>
              </tbody>
              <!--end::Table Body-->
            </table>
            <!--end::Table-->
          </div>
          <!--end::Table Container-->
        </div>
        <!--end::Card Body-->
      </div>
      <!--end::Table Card-->
    </div>
    <!--end::Match Requests Widget-->
  </div>
  <!--end::Analytics Dashboard Widget-->
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from "vue";
import type { PropType } from "vue";
import type { ApexOptions } from "apexcharts";
import type VueApexCharts from "vue3-apexcharts";
import { useRouter } from "vue-router";
import { getAnalyticsData, getMatchedRequests, type AnalyticsData, type MatchedRequestsData } from "@/core/data/dashboard";
type KPIType = 'requests' | 'properties' | 'customers' | 'appointments';

export default defineComponent({
  name: "widget-11",
  props: {
    year: {
      type: Number,
      required: true,
      default: () => new Date().getFullYear()
    },
    agencyId: {
      type: String,
      required: false,
      default: undefined
    },
    canLoadData: {
      type: Boolean,
      default: true
    },
  },
  setup(props) {
    const router = useRouter();
    const chartRef = ref<typeof VueApexCharts | null>(null);
    const selectedKPI = ref<KPIType>('properties');
    const chartKey = ref<number>(0);
    
    // Dati API
    const analyticsData = ref<AnalyticsData | null>(null);
    const matchedRequestsData = ref<MatchedRequestsData | null>(null);
    const loading = ref<boolean>(false);
    const loadingMatchedRequests = ref<boolean>(false);
    
    // Year filter (synchronized with Widget13)
    const currentYear = new Date().getFullYear();
    const selectedYear = computed(() => props.year);
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

    // Funzione per caricare i dati Analytics dall'API
    const loadAnalyticsData = async () => {
      // Non caricare i dati se non ha i permessi
      if (!props.canLoadData) {
        analyticsData.value = null;
        return;
      }
      
      try {
        loading.value = true;
        const data = await getAnalyticsData(props.year, props.agencyId);
        analyticsData.value = data;
      } catch (error: any) {
        // Se è un errore 403, non loggare come errore (è normale se non ha Premium)
        if (error?.response?.status === 403) {
          console.warn('Accesso negato: piano Premium richiesto per questa funzionalità');
        } else {
          console.error('Errore nel caricamento dei dati Analytics:', error);
        }
        analyticsData.value = null;
      } finally {
        loading.value = false;
      }
    };

    // Funzione per caricare i dati delle richieste matchate
    const loadMatchedRequests = async () => {
      // Non caricare i dati se non ha i permessi
      if (!props.canLoadData) {
        matchedRequestsData.value = null;
        return;
      }
      
      try {
        loadingMatchedRequests.value = true;
        const data = await getMatchedRequests();
        matchedRequestsData.value = data;
      } catch (error: any) {
        // Se è un errore 403, non loggare come errore (è normale se non ha Premium)
        if (error?.response?.status === 403) {
          console.warn('Accesso negato: piano Premium richiesto per questa funzionalità');
        } else {
          console.error('Errore nel caricamento delle richieste matchate:', error);
        }
        matchedRequestsData.value = null;
      } finally {
        loadingMatchedRequests.value = false;
      }
    };

    // Get chart data based on selected KPI and year
    const getChartData = () => {
      if (!analyticsData.value) return { primary: [], secondary: [] };
      
      const kpi = selectedKPI.value;
      let monthlyData: Record<string, number> = {};
      
      switch (kpi) {
        case 'requests':
          monthlyData = analyticsData.value.Requests.MonthlyData;
          break;
        case 'properties':
          monthlyData = analyticsData.value.Properties.MonthlyData;
          break;
        case 'customers':
          monthlyData = analyticsData.value.Customers.MonthlyData;
          break;
        case 'appointments':
          monthlyData = analyticsData.value.Appointments.MonthlyData;
          break;
      }
      
      const primaryData = months.value.map(month => monthlyData[month] || 0);
      
      let secondaryData: number[] = [];
      
      // Add secondary data for specific KPIs
      if (kpi === 'properties') {
        secondaryData = months.value.map(month => analyticsData.value!.Properties.SoldData[month] || 0);
      } else if (kpi === 'requests') {
        secondaryData = months.value.map(month => analyticsData.value!.Requests.ClosedData[month] || 0);
      } else if (kpi === 'appointments') {
        secondaryData = months.value.map(month => analyticsData.value!.Appointments.ConfirmedData[month] || 0);
      } else if (kpi === 'customers') {
        secondaryData = months.value.map(month => analyticsData.value!.Customers.BuyersData[month] || 0);
      }

      return { primary: primaryData, secondary: secondaryData };
    };

    // Get totals for selected year for a specific KPI
    const getYearTotals = (kpi?: KPIType) => {
      if (!analyticsData.value) return 0;
      
      const targetKpi = kpi || selectedKPI.value;
      let total = 0;
      
      switch (targetKpi) {
        case 'requests':
          total = analyticsData.value.Requests.Total;
          break;
        case 'properties':
          total = analyticsData.value.Properties.Total;
          break;
        case 'customers':
          total = analyticsData.value.Customers.Total;
          break;
        case 'appointments':
          total = analyticsData.value.Appointments.Total;
          break;
      }

      return total;
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
        requests: 'dashboard/requests',
        properties: 'dashboard/properties',
        customers: 'dashboard/clients',
        appointments: 'dashboard/calendar'
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
          horizontalAlign: "left",
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

    // Get table rows data from matched requests
    const tableRows = computed(() => {
      if (!matchedRequestsData.value || !matchedRequestsData.value.MatchedRequests) {
        return [];
      }
      return matchedRequestsData.value.MatchedRequests;
    });

    // Get button color based on selected KPI
    const getKPIButtonColor = () => {
      const colorMap = {
        requests: 'btn-active-color-success',
        properties: 'btn-active-color-primary',
        customers: 'btn-active-color-danger',
        appointments: 'btn-active-color-warning'
      };
      return colorMap[selectedKPI.value] || 'btn-active-color-primary';
    };

    // Get KPI label in Italian
    const getKPILabel = () => {
      const labelMap = {
        requests: 'Richieste',
        properties: 'Immobili',
        customers: 'Clienti',
        appointments: 'Appuntamenti'
      };
      return labelMap[selectedKPI.value] || 'Dati';
    };

    // Navigate to request detail
    const navigateToRequest = (requestId: number) => {
      router.push(`/dashboard/request/${requestId}`);
    };

    // Carica i dati iniziali
    onMounted(() => {
      loadAnalyticsData();
      loadMatchedRequests();
    });

    // Watch per ricaricare quando cambiano year o agencyId (solo se può caricare)
    watch(() => props.year, () => {
      if (props.canLoadData) {
        loadAnalyticsData();
      }
    });

    watch(() => props.agencyId, () => {
      if (props.canLoadData) {
        loadAnalyticsData();
      }
    });
    
    // Watch per canLoadData: se diventa true, carica i dati
    watch(() => props.canLoadData, (newVal) => {
      if (newVal) {
        if (!analyticsData.value) {
          loadAnalyticsData();
        }
        if (!matchedRequestsData.value) {
          loadMatchedRequests();
        }
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
      availableYears,
      loading,
      loadingMatchedRequests,
      months,
      tableRows,
      getKPIButtonColor,
      getKPILabel,
      navigateToRequest
    };
  }
});
</script>

<!-- CSS moved to global file: widgets.css -->
