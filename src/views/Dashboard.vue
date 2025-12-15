<template>

  <div v-if="loading" class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>

  <div v-if="!subscriptionExpired">
     <!--begin::Subscription Expiry Banner (Fixed Left)-->
  <SubscriptionExpiryBanner v-if="!loading && !isAgent" />
  <!--end::Subscription Expiry Banner-->
  
  <!--begin::Agencies Map-->
  <div v-if="!loading && canViewMap" class="row mb-8">
    <div class="col-xl-12">
      <Chart13 
        :agencies-list="agenciesList"
        :agents-list="agentsRawData"
        :total-agencies="mapDataRef?.TotalAgencies || 0"
        :total-agents="mapDataRef?.TotalAgents || 0"
        :admin-name="adminName"
        :is-agent="isAgent"
        :is-admin="isAdmin"
        @filter-change="onDashboardFilterChange"
      />
    </div>
  </div>
  <!--end::Agencies Map-->

    <!--begin::Andamento Immobili-->
    <div v-if="!loading && (isAdmin || isAgency)" class="row gy-5 g-xl-10 mb-8">
      <div class="col-xl-12">
        <div class="card card-xl-stretch position-relative">
          <Chart3 
            widget-classes="card-xl-stretch" 
            :chart-height="200" 
            title="Immobili"
            subTitle="Andamento immobili inseriti e venduti" 
            :chartData="chartData" 
            :soldChartData="soldChartData" 
            :totalCommissionsPortfolio="totalCommissionsPortfolio" 
            :totalCommissionsEarned="totalCommissionsEarned"
            :commissionsMonthlyData="commissionsMonthlyData" 
            chartType="bar"
            :class="{ 'opacity-75': !canViewChart3 }"
          />
          <div
            v-if="!canViewChart3"
            class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-body bg-opacity-75"
            style="z-index: 10;"
          >
            <div class="locked-overlay-card text-center">
              <div class="locked-overlay-icon bg-primary bg-opacity-10 text-primary">
                <i class="ki-duotone ki-crown fs-3">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                  <span class="path4"></span>
                  <span class="path5"></span>
                </i>
              </div>
              <div class="fs-5 fw-bold text-primary mb-2">Funzione Premium</div>
              <p class="text-muted mb-4">
                <span v-if="isAdmin">Contenuto disponibile con piano Premium.</span>
                <span v-else>La possibilità di aggiornare o fare l'upgrade è disponibile solo per l'amministratore.</span>
              </p>
              <router-link v-if="isAdmin" to="/dashboard/subscription/manage" class="btn btn-primary">
                <i class="ki-duotone ki-rocket fs-5 me-2">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
                Aggiorna ora
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--end::Andamento Immobili-->

      <!--begin::Analytics Overview-->
  <div v-if="!loading && (isAdmin || isAgency)" class="row mb-8">
    <div class="col-xl-12">
      <div class="card position-relative">
        <Chart11 
          :year="selectedYearFilter"
          :agency-id="selectedAgencyFilter"
          :can-load-data="canViewChart11"
        />
        <div
          v-if="!canViewChart11"
          class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-body bg-opacity-75"
          style="z-index: 10;"
        >
          <div class="locked-overlay-card text-center">
            <div class="locked-overlay-icon bg-primary bg-opacity-10 text-primary">
              <i class="ki-duotone ki-crown fs-3">
                <span class="path1"></span>
                <span class="path2"></span>
                <span class="path3"></span>
                <span class="path4"></span>
                <span class="path5"></span>
              </i>
            </div>
            <div class="fs-5 fw-bold text-primary mb-2">Funzione Premium</div>
            <p class="text-muted mb-4">
              <span v-if="isAdmin">Contenuto disponibile con piano Premium.</span>
              <span v-else>La possibilità di aggiornare o fare l'upgrade è disponibile solo per l'amministratore.</span>
            </p>
            <router-link v-if="isAdmin" to="/dashboard/subscription/manage" class="btn btn-primary">
              <i class="ki-duotone ki-rocket fs-5 me-2">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              Aggiorna ora
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--end::Analytics Overview-->

  <!--begin::Widget1-->
  <div v-if="!loading && (isAdmin || isAgency)" class="row mb-8">
    <div class="col-xl-12">
      <div class="card position-relative">
        <Widget7 
          :agents-data="agentsRawData"
          :agencies-data="agenciesList"
          :properties-data="allPropertiesData"
          :commissions-data="[]"
          :all-sold-properties="allSoldPropertiesData"
          :all-properties="allPropertiesData"
          :calendar-events="[]"
          :hide-top-agencies="isAgency"
          :can-load-data="canViewWidget7"
          :class="{ 'opacity-75': !canViewWidget7 }"
        />
        <div
          v-if="!canViewWidget7"
          class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-body bg-opacity-75"
          style="z-index: 10;"
        >
          <div class="locked-overlay-card text-center">
            <div class="locked-overlay-icon bg-primary bg-opacity-10 text-primary">
              <i class="ki-duotone ki-crown fs-3">
                <span class="path1"></span>
                <span class="path2"></span>
                <span class="path3"></span>
                <span class="path4"></span>
                <span class="path5"></span>
              </i>
            </div>
            <div class="fs-5 fw-bold text-primary mb-2">Funzione Premium</div>
            <p class="text-muted mb-4">
              <span v-if="isAdmin">Contenuto disponibile con piano Premium.</span>
              <span v-else>La possibilità di aggiornare o fare l'upgrade è disponibile solo per l'amministratore.</span>
            </p>
            <router-link v-if="isAdmin" to="/dashboard/subscription/manage" class="btn btn-primary">
              <i class="ki-duotone ki-rocket fs-5 me-2">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              Aggiorna ora
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--end::Widget1-->
  </div>

  <!--begin::Subscription Expired-->
  <div v-else class="subscription-expired-page d-flex flex-column align-items-center justify-content-center py-10">
    <div class="card shadow-lg border-0" style="max-width: 1100px; width: 100%;">
      <div class="card-body text-center px-12 py-20">
        <!--begin::Logo Container-->
        <div class="mb-16">
          <div class="subscription-logo-wrapper d-inline-block position-relative">
            <div class="subscription-logo-bg"></div>
            <img 
              :src="getAssetPath('media/logos/kurama-home-logos/logo-menu.png')"
              alt="KuramaHome Logo"
              class="subscription-logo"
            />
          </div>
        </div>
        <!--end::Logo Container-->
        
        <!--begin::Title-->
        <h1 class="fw-bolder mb-6 text-gray-900" style="font-size: 2.5rem; letter-spacing: -0.5px;">
          Abbonamento Scaduto
        </h1>
        <!--end::Title-->
        
        <!--begin::Description-->
        <p class="text-gray-600 mb-12 lh-lg" style="font-size: 1.15rem;">
          Il tuo abbonamento è scaduto e l'accesso alla dashboard è stato bloccato.
          <br>
          <span class="fw-semibold">Rinnova ora</span> per continuare ad utilizzare tutte le funzionalità premium.
        </p>
        <!--end::Description-->
        
        <!--begin::Action Button-->
        <router-link to="/dashboard/subscription/manage" class="btn btn-primary btn-lg px-10 py-4 mb-6 subscription-cta-btn">
          <i class="ki-duotone ki-shield-tick fs-1 me-2">
            <span class="path1"></span>
            <span class="path2"></span>
          </i>
          <span class="fs-4 fw-bold">Rinnova Abbonamento</span>
        </router-link>
        <!--end::Action Button-->
        
        <!--begin::Support Link-->
        <div class="mt-8">
          <a href="mailto:support@kurama.com" class="text-gray-600 text-hover-primary fs-6 fw-semibold">
            <i class="ki-duotone ki-message-text-2 fs-5 me-2">
              <span class="path1"></span>
              <span class="path2"></span>
              <span class="path3"></span>
            </i>
            Hai bisogno di aiuto? Contatta il supporto
          </a>
        </div>
        <!--end::Support Link-->
      </div>
    </div>
  </div>
  <!--end::Subscription Expired-->

  </template>
<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";
import Widget7 from "@/components/dashboard-default-widgets/Widget7.vue";

import Chart3 from "@/components/widgets/charts/Widget3.vue";
import Chart10 from "@/components/widgets/charts/Widget10.vue";
import Chart11 from "@/components/widgets/charts/Widget11.vue";
import Chart13 from "@/components/widgets/charts/Widget13.vue";
import SubscriptionExpiryBanner from "@/views/crafted/subscription/SubscriptionExpiryBanner.vue";

import { getAssetPath } from "@/core/helpers/assets";
import { 
  getMapData,
  getWidget3Data, 
  processAgentsRanking, 
  processCalendarEvents, 
  processRequestsForChart, 
  processAppointmentsForChart, 
  processAgentsForChart, 
  processCustomersForChart 
} from "@/core/data/dashboard";
import type { DashboardDetails, MapData, Widget3Data } from "@/core/data/dashboard";
import { getRealEstatePropertiesList, type RequestTabelData } from "@/core/data/properties";
import ApiService from "@/core/services/ApiService";
import { useAuthStore, type User } from "@/stores/auth";
import { isAgent as helperIsAgent } from "@/core/helpers/auth";
import { getCurrentSubscription } from "@/core/data/subscription";

export default defineComponent({
  name: "main-dashboard",
  components: {
    Widget7,
    Chart3,
    Chart10,
    Chart11,
    Chart13,
    SubscriptionExpiryBanner
  },
  setup() {
        const store = useAuthStore();
        const subscriptionExpired = computed(() => store.isSubscriptionExpired);
        
        // Verifica se l'utente è un agente usando helper
        const isAgent = computed(() => helperIsAgent());
        
        // Verifica se l'utente è Admin
        const isAdmin = computed(() => store.user?.Role === 'Admin');
        
        // Verifica se l'utente è Agency
        const isAgency = computed(() => store.user?.Role === 'Agency');
        
        // Verifica se l'utente ha piano premium
        const subscription = ref<any>(null);
        const isLoadingSubscription = ref<boolean>(true);
        const isPremium = computed(() => {
          if (!subscription.value) return false;
          const planName = subscription.value.SubscriptionPlan?.Name?.toLowerCase() || '';
          const status = subscription.value.Status?.toLowerCase() || '';
          return planName === 'premium' && status === 'active';
        });
        
        // Verifica se l'utente ha piano pro
        const isPro = computed(() => {
          if (!subscription.value) return false;
          const planName = subscription.value.SubscriptionPlan?.Name?.toLowerCase() || '';
          const status = subscription.value.Status?.toLowerCase() || '';
          return planName === 'pro' && status === 'active';
        });
        
        // Verifica se l'utente ha piano basic
        const isBasic = computed(() => {
          if (!subscription.value) return false;
          const planName = subscription.value.SubscriptionPlan?.Name?.toLowerCase() || '';
          const status = subscription.value.Status?.toLowerCase() || '';
          return planName === 'basic' && status === 'active';
        });
        
        // Verifica se l'utente ha piano pro o premium (piani che permettono di vedere Chart3)
        const hasProOrPremium = computed(() => {
          return isPro.value || isPremium.value;
        });
        
        // Verifica se l'utente può vedere la mappa (tutti i ruoli, tutti i piani)
        const canViewMap = computed(() => {
          return true; // Tutti possono vedere la mappa
        });
        
        // Verifica se l'utente può vedere Chart3 (Admin e Agency con piano Pro o Premium)
        const canViewChart3 = computed(() => {
          return (isAdmin.value || isAgency.value) && hasProOrPremium.value;
        });
        
        // Verifica se l'utente può vedere Chart11 (Admin e Agency solo con Premium)
        const canViewChart11 = computed(() => {
          return (isAdmin.value || isAgency.value) && isPremium.value;
        });
        
        // Verifica se l'utente può vedere Widget7 (Admin e Agency solo con Premium)
        const canViewWidget7 = computed(() => {
          return (isAdmin.value || isAgency.value) && isPremium.value;
        });
        
        // Carica la subscription per verificare il piano premium
        const loadSubscription = async () => {
          try {
            isLoadingSubscription.value = true;
            const sub = await getCurrentSubscription();
            subscription.value = sub;
          } catch (error) {
            console.error('Errore nel caricamento subscription:', error);
            subscription.value = null;
          } finally {
            isLoadingSubscription.value = false;
          }
        };
        
    const loading = ref<boolean>(true);
    const data = ref<DashboardDetails>();
        const chartData = ref<any>(null);
        const soldChartData = ref<any>(null);
            const soldPropertiesCount = ref<number>(0);
            const insertedPropertiesCount = ref<number>(0);
            const totalCommissions = ref<number>(0);
            const totalCommissionsPortfolio = ref<number>(0);
            const totalCommissionsEarned = ref<number>(0);
            const commissionsMonthlyData = ref<Record<string, number>>({});
            // Admin profile details (for map positioning)
            const adminProfile = ref<Partial<User> | null>(null);
            const isAdminProfileLoaded = ref<boolean>(false);
            
            const agenciesList = ref<any[]>([]);
            const mapDataRef = ref<MapData | null>(null);
            
            const agentsRawData = ref<any[]>([]);
            
            // Admin name for widget header
            const adminName = computed(() => {
              if (isAdmin.value && adminProfile.value) {
                return adminProfile.value.Username || 
                       `${adminProfile.value.FirstName || ''} ${adminProfile.value.LastName || ''}`.trim() ||
                       store.user?.Username || 
                       'Admin';
              }
              return store.user?.Username || store.user?.Email || 'Utente';
            });
            
            // Agents monthly data
            const agentsMonthlyData = ref<Record<string, number>>({});
            
            // Properties data for ranking
            const allPropertiesData = ref<any[]>([]);
            const allSoldPropertiesData = ref<any[]>([]);
            
            // Customers monthly data
            const customersMonthlyData = ref<{
              seller: Record<string, number>;
              buyer: Record<string, number>;
            }>({ seller: {}, buyer: {} });
            
            // Current year for data processing
            const currentYear = new Date().getFullYear();
            
            // Filtri per Widget3 (sincronizzati con mappa)
            const selectedYearFilter = ref<number>(currentYear);
            const selectedAgencyFilter = ref<string | undefined>(undefined);
            
            // Funzione per caricare i dati Widget3 con filtri
            const loadWidget3Data = async (agencyId?: string, year?: number) => {
              if (!canViewChart3.value) return;
              
              try {
                const widget3Data = await getWidget3Data(agencyId, year);
                
                // Converti i dati nel formato atteso da Widget3
                // Il backend restituisce Sale/Rent/Auction (PascalCase), il frontend si aspetta sale/rent/auction (camelCase)
                // Verifica che PropertiesData esista e abbia le proprietà
                if (widget3Data && widget3Data.PropertiesData) {
                  chartData.value = {
                    months: widget3Data.Months || [],
                    data: {
                      sale: widget3Data.PropertiesData.Sale || {},
                      rent: widget3Data.PropertiesData.Rent || {},
                      auction: widget3Data.PropertiesData.Auction || {}
                    }
                  };
                } else {
                  console.warn('PropertiesData non disponibile, inizializzo con valori vuoti');
                  chartData.value = {
                    months: widget3Data?.Months || [],
                    data: { sale: {}, rent: {}, auction: {} }
                  };
                }
                
                if (widget3Data && widget3Data.SoldPropertiesData) {
                  soldChartData.value = {
                    months: widget3Data.Months || [],
                    data: {
                      sale: widget3Data.SoldPropertiesData.Sale || {},
                      rent: widget3Data.SoldPropertiesData.Rent || {},
                      auction: widget3Data.SoldPropertiesData.Auction || {}
                    }
                  };
                } else {
                  console.warn('SoldPropertiesData non disponibile, inizializzo con valori vuoti');
                  soldChartData.value = {
                    months: widget3Data?.Months || [],
                    data: { sale: {}, rent: {}, auction: {} }
                  };
                }
                
                // Aggiorna totali provvigioni
                totalCommissionsPortfolio.value = widget3Data?.TotalCommissionsPortfolio || 0;
                totalCommissionsEarned.value = widget3Data?.TotalCommissionsEarned || 0;
                totalCommissions.value = totalCommissionsPortfolio.value + totalCommissionsEarned.value;
                
                // Aggiorna provvigioni mensili
                commissionsMonthlyData.value = widget3Data?.CommissionsMonthlyData || {};
              } catch (error: any) {
                if (error?.response?.status === 403) {
                  console.warn('Accesso negato: piano premium richiesto per questa funzionalità');
                } else {
                  console.error('Errore nel caricamento dei dati Widget3:', error);
                }
                // Inizializza con valori vuoti in caso di errore per evitare errori di accesso
                if (!chartData.value) {
                  chartData.value = {
                    months: [],
                    data: { sale: {}, rent: {}, auction: {} }
                  };
                }
                if (!soldChartData.value) {
                  soldChartData.value = {
                    months: [],
                    data: { sale: {}, rent: {}, auction: {} }
                  };
                }
              }
            };
            
            // Calendar/Appointments data
            const totalAppointments = ref<number>(0);
            const confirmedAppointments = ref<number>(0);
            
            // Filtered properties data for Widget13
            const filteredSoldProperties = ref<number>(0);
            const filteredRentedProperties = ref<number>(0);
            const filteredAuctionProperties = ref<number>(0);
            
            // Requests chart data
            const requestsChartData = ref<any>(null);
            
            // Appointments chart data
            const appointmentsChartData = ref<any>(null);

            // KPI Analytics data for Chart11
            const kpiAnalyticsData = computed(() => {
              // Helper: genera tutti i 12 mesi per TUTTI gli anni disponibili (ultimi 6 anni)
              const generateAllMonths = () => {
                const allMonthsData: Record<string, number> = {};
                const currentYear = new Date().getFullYear();
                
                // Genera mesi per gli ultimi 6 anni
                for (let yearOffset = 0; yearOffset < 6; yearOffset++) {
                  const year = currentYear - yearOffset;
                  for (let month = 0; month < 12; month++) {
                    const date = new Date(year, month, 1);
                    const monthKey = date.toLocaleDateString('it-IT', { month: 'short', year: '2-digit' });
                    allMonthsData[monthKey] = 0;
                  }
                }
                
                return allMonthsData;
              };

              const emptyMonthlyData: Record<string, number> = generateAllMonths();

              // Immobili inseriti - dati reali dal grafico chartData
              const propertiesData: Record<string, number> = { ...emptyMonthlyData };
              if (chartData.value && chartData.value.months && chartData.value.data && chartData.value.data.sale && chartData.value.data.rent && chartData.value.data.auction) {
                chartData.value.months.forEach((month: string) => {
                  // Somma vendite + affitti + aste per il totale immobili inseriti
                  const sale = chartData.value.data.sale[month] || 0;
                  const rent = chartData.value.data.rent[month] || 0;
                  const auction = chartData.value.data.auction[month] || 0;
                  propertiesData[month] = sale + rent + auction;
                });
              }

              // Immobili venduti - dati reali dal grafico soldChartData
              const soldData: Record<string, number> = { ...emptyMonthlyData };
              if (soldChartData.value && soldChartData.value.months && soldChartData.value.data && soldChartData.value.data.sale && soldChartData.value.data.rent && soldChartData.value.data.auction) {
                soldChartData.value.months.forEach((month: string) => {
                  // Somma vendite + affitti + aste per il totale immobili venduti
                  const sale = soldChartData.value.data.sale[month] || 0;
                  const rent = soldChartData.value.data.rent[month] || 0;
                  const auction = soldChartData.value.data.auction[month] || 0;
                  soldData[month] = sale + rent + auction;
                });
              }

              // Richieste - dati reali dal grafico requestsChartData
              const requestsData: Record<string, number> = { ...emptyMonthlyData };
              const closedRequestsData: Record<string, number> = { ...emptyMonthlyData };
              
              if (requestsChartData.value && requestsChartData.value.months && requestsChartData.value.data) {
                requestsChartData.value.months.forEach((month: string) => {
                  requestsData[month] = requestsChartData.value.data.inserted[month] || 0;
                  closedRequestsData[month] = requestsChartData.value.data.closed[month] || 0;
                });
              }

              return {
                requests: {
                  total: requestsChartData.value?.total || 0,
                  monthlyData: requestsData,
                  closedData: closedRequestsData
                },
                properties: {
                  total: insertedPropertiesCount.value,
                  monthlyData: propertiesData,
                  soldData: soldData
                },
                customers: {
                  total: data.value?.TotalCustomers || 0,
                  monthlyData: customersMonthlyData.value.seller || emptyMonthlyData,
                  buyersData: customersMonthlyData.value.buyer || emptyMonthlyData
                },
                appointments: {
                  total: totalAppointments.value || 0,
                  monthlyData: (() => {
                    const data: Record<string, number> = { ...emptyMonthlyData };
                    if (appointmentsChartData.value && appointmentsChartData.value.months && appointmentsChartData.value.data) {
                      appointmentsChartData.value.months.forEach((month: string) => {
                        data[month] = appointmentsChartData.value.data.fixed[month] || 0;
                      });
                    }
                    return data;
                  })(),
                  confirmedData: (() => {
                    const data: Record<string, number> = { ...emptyMonthlyData };
                    if (appointmentsChartData.value && appointmentsChartData.value.months && appointmentsChartData.value.data) {
                      appointmentsChartData.value.months.forEach((month: string) => {
                        data[month] = appointmentsChartData.value.data.confirmed[month] || 0;
                      });
                    }
                    return data;
                  })()
                }
              };
            });

            // Properties monthly data for Widget7
            const propertiesMonthlyData = computed(() => {
              if (!chartData.value || !chartData.value.months || !chartData.value.data || 
                  !chartData.value.data.sale || !chartData.value.data.rent || !chartData.value.data.auction) {
                return {};
              }
              
              const monthlyData: Record<string, number> = {};
              chartData.value.months.forEach((month: string) => {
                const sale = chartData.value.data.sale[month] || 0;
                const rent = chartData.value.data.rent[month] || 0;
                const auction = chartData.value.data.auction[month] || 0;
                monthlyData[month] = sale + rent + auction;
              });
              
              return monthlyData;
            });

        async function ensureAdminProfileLoaded() {
          if (!isAdmin.value) {
            return;
          }

          if (isAdminProfileLoaded.value) {
            return;
          }

          try {
            const currentUserId = store.user?.Id;
            if (!currentUserId) {
              return;
            }

            const profile = await store.getUser(currentUserId);
            adminProfile.value = profile;
            isAdminProfileLoaded.value = true;
          } catch (error) {
            console.error("Errore nel caricamento del profilo admin:", error);
          }
        }

        async function getItems() {
      loading.value = true;
      
      try {
        await ensureAdminProfileLoaded();
        
        // 🚀 NUOVA API PER WIDGET13 (MAPPA) - Chiamata dedicata con cache
        // Tutti (Admin, Agency, Agent) vedono la mappa con gli stessi dati
        if (canViewMap.value) {
          try {
            const mapData = await getMapData(undefined, currentYear);
            
            // Mappa i dati delle agenzie per compatibilità con Widget13 (modello leggero)
            const mappedAgencies: any[] = mapData.Agencies.map((agency: any) => ({
              ...agency,
              name: agency.UserName || '',
              id: agency.Id,
              AdminId: agency.AdminId || null,
              City: agency.City || '',
              Province: agency.Province || '',
              ZipCode: agency.ZipCode || '',
              Address: agency.Address || '',
              PhoneNumber: agency.PhoneNumber || '',
              Email: agency.Email || ''
            }));

            // Aggiungi l'admin stesso se è Admin e non è già nella lista
            if (isAdmin.value && store.user) {
              const profileSource = adminProfile.value || store.user;
              const loggedAgency = {
                ...profileSource,
                name: profileSource?.Username || `${profileSource?.FirstName || ''} ${profileSource?.LastName || ''}`.trim(),
                id: profileSource?.Id,
                AdminId: profileSource?.AdminId || profileSource?.Id || null,
                ZipCode: profileSource?.ZipCode || '',
                City: profileSource?.City || '',
                Province: profileSource?.Province || ''
              };

              const alreadyIncluded = mappedAgencies.some(agency => agency.id === loggedAgency.id);
              if (!alreadyIncluded) {
                mappedAgencies.push(loggedAgency);
              }
            }

            agenciesList.value = mappedAgencies;
            agentsRawData.value = mapData.Agents;
            
            // Salva i dati della mappa per il Widget13
            mapDataRef.value = mapData;
            
            // Aggiorna data per altri widget che usano TotalAgents
            data.value = {
              TotalAgents: mapData.TotalAgents
            };
          } catch (error: any) {
            console.error('Errore nel caricamento dei dati della mappa:', error);
          }
        }
        
        // Carica dati Widget3 iniziali
        await loadWidget3Data(selectedAgencyFilter.value, selectedYearFilter.value);
        
        // Processa i dati degli immobili usando GetList solo se premium (per altri widget che non usano le nuove API)
        if (isPremium.value) {
          try {
            // Chiama GetList direttamente per ottenere i dati raw con il campo Sold
            // Passa stringa vuota per ottenere tutti gli immobili
            const response = await ApiService.get(
              `RealEstateProperty/GetList?currentPage=0&agencyId=&filterRequest=&contract=&priceFrom=&priceTo=&category=&typologie=&town=`,
              ""
            );
            
            const rawProperties = response.data.Data as Array<any>;

            // Converti i dati raw in RealEstatePropertyListItem per compatibilità
            const allProperties = rawProperties.map((item: any) => ({
              Id: item.Id,
              CreationDate: typeof item.CreationDate === 'string' ? item.CreationDate : (item.CreationDate instanceof Date ? item.CreationDate.toISOString() : String(item.CreationDate)),
              UpdateDate: item.UpdateDate || item.AssignmentEnd || undefined,
              Status: item.Status,
              Auction: item.Auction || false,
              Sold: item.Sold || false,
              City: item.City,
              Price: item.Price || 0,
              Category: item.Category,
              Typology: item.Typology,
              AgencyId: item.AgencyId,
              AddressLine: item.AddressLine,
              AssignmentEnd: item.AssignmentEnd,
              CommercialSurfaceate: item.CommercialSurfaceate,
              State: item.State,
              StateOfTheProperty: item.StateOfTheProperty,
              FirstPhotoUrl: item.FirstPhotoUrl || null,
              EffectiveCommission: item.EffectiveCommission || 0
            }));

            // Separa gli immobili in base a Sold (se disponibile nel backend)
            const availableProperties = allProperties.filter((p: any) => !p.Sold);
            const soldProperties = allProperties.filter((p: any) => p.Sold === true);

            // Salva i dati per il ranking
            allPropertiesData.value = allProperties;
            allSoldPropertiesData.value = soldProperties;

            // Salva i totali
            insertedPropertiesCount.value = allProperties.length;
            soldPropertiesCount.value = soldProperties.length;
          } catch (error: any) {
            if (error?.response?.status === 403) {
              console.warn('Accesso negato: piano premium richiesto per questa funzionalità');
            } else {
              console.error('Errore nel processing delle proprietà:', error);
            }
          }
        }
      } catch (error) {
        console.error('❌ Errore nel caricamento della dashboard:', error);
        // Mostra un errore all'utente se necessario
      } finally {
        loading.value = false;
      }
    }


    onMounted(async () => {
      // Carica la subscription per verificare premium
      await loadSubscription();
      await ensureAdminProfileLoaded();
      
      await getItems();
    });


    // Dashboard filter change handler - ricarica i dati della mappa e Widget3 con i nuovi filtri
    const onDashboardFilterChange = async (filters: { year: number; agency: string }) => {
      if (!canViewMap.value) return;
      
      try {
        // Aggiorna i filtri
        selectedYearFilter.value = filters.year;
        selectedAgencyFilter.value = filters.agency === 'all' ? undefined : filters.agency;
        
        // Passa l'ID completo con prefisso al backend (es: "agency_xxx" o "agent_xxx")
        // Il backend userà il prefisso per sapere come filtrare
        const agencyId = selectedAgencyFilter.value && selectedAgencyFilter.value !== 'all' 
          ? selectedAgencyFilter.value 
          : undefined;
        
        // Ricarica i dati della mappa
        const mapData = await getMapData(agencyId, filters.year);
        
        // Mappa i dati delle agenzie
        const mappedAgencies: any[] = mapData.Agencies.map((agency: any) => ({
          ...agency,
          name: agency.UserName || `${agency.FirstName || ''} ${agency.LastName || ''}`.trim(),
          id: agency.Id,
          AdminId: agency.AdminId || null,
          City: agency.City || '',
          Province: agency.Province || '',
          ZipCode: agency.ZipCode || ''
        }));

        // Aggiungi l'admin stesso se è Admin e non è già nella lista
        // Ma NON aggiungerlo se c'è un filtro attivo per un'agenzia/agente specifico
        if (isAdmin.value && store.user && !agencyId) {
          const profileSource = adminProfile.value || store.user;
          const loggedAgency = {
            ...profileSource,
            name: profileSource?.Username || `${profileSource?.FirstName || ''} ${profileSource?.LastName || ''}`.trim(),
            id: profileSource?.Id,
            AdminId: profileSource?.AdminId || profileSource?.Id || null,
            ZipCode: profileSource?.ZipCode || '',
            City: profileSource?.City || '',
            Province: profileSource?.Province || ''
          };

          const alreadyIncluded = mappedAgencies.some(agency => agency.id === loggedAgency.id);
          if (!alreadyIncluded) {
            mappedAgencies.push(loggedAgency);
          }
        }

        agenciesList.value = mappedAgencies;
        agentsRawData.value = mapData.Agents;
        
        // Salva i dati della mappa per il Widget13
        mapDataRef.value = mapData;
        
        data.value = {
          TotalAgents: mapData.TotalAgents
        };
        
        // Ricarica i dati del Widget3 con i nuovi filtri
        await loadWidget3Data(agencyId, filters.year);
      } catch (error) {
        console.error('Errore nel caricamento dei dati con filtri:', error);
      }
    };

    // onUnmounted(() => {
    //   if (!localStorage.getItem(LS_CONFIG_NAME_KEY)) {
    //     LayoutService.disableToolbar();
    //   }
    // });
    return {
      getAssetPath,
      loading,
      data,
      chartData,
      soldChartData,
      soldPropertiesCount,
      insertedPropertiesCount,
      agentsRawData,
      agenciesList,
      mapDataRef,
      adminName,
      totalAppointments,
      confirmedAppointments,
      kpiAnalyticsData,
      agentsMonthlyData,
      customersMonthlyData,
      filteredSoldProperties,
      filteredRentedProperties,
      filteredAuctionProperties,
      allPropertiesData,
      allSoldPropertiesData,
      subscriptionExpired,
      isAgent,
      isAdmin,
      isAgency,
      adminProfile,
      isPremium,
      isPro,
      isBasic,
      canViewMap,
      canViewChart3,
      canViewChart11,
      canViewWidget7,
      isLoadingSubscription,
      propertiesMonthlyData,
      totalCommissions,
      totalCommissionsPortfolio,
      totalCommissionsEarned,
      commissionsMonthlyData,
      onDashboardFilterChange,
      selectedYearFilter,
      selectedAgencyFilter
    }
  },
});
</script>

<style scoped>
/* Stili per la pagina di abbonamento scaduto */
.subscription-expired-page {
  min-height: 75vh;
}

/* Logo Animation */
.subscription-logo-wrapper {
  animation: logoPulse 2s ease-in-out infinite;
}

@keyframes logoPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.subscription-logo-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border-radius: 20px;
  opacity: 0.1;
  z-index: 0;
}

.subscription-logo {
  position: relative;
  width: 180px;
  height: auto;
  object-fit: contain;
  z-index: 1;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
}

/* CTA Button */
.subscription-cta-btn {
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 119, 204, 0.3);
}

.subscription-cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 119, 204, 0.4);
}

.locked-overlay-card {
  max-width: 360px;
  width: 100%;
  padding: 1.75rem;
  border-radius: 16px;
  border: 1px solid rgba(0, 119, 204, 0.12);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(6px);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.8));
}

.locked-overlay-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 14px;
  box-shadow: inset 0 0 0 1px rgba(0, 119, 204, 0.1);
}

[data-bs-theme="dark"] .locked-overlay-card {
  background: linear-gradient(145deg, rgba(26, 26, 26, 0.94), rgba(26, 26, 26, 0.82));
  border-color: rgba(0, 119, 204, 0.2);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.35);
}

[data-bs-theme="dark"] .locked-overlay-icon {
  box-shadow: inset 0 0 0 1px rgba(102, 179, 255, 0.25);
}

/* Separator */
.separator.separator-dashed {
  border-top-width: 2px;
  opacity: 0.5;
}

/* Light Mode */
[data-bs-theme="light"] .subscription-expired-page .card {
  background-color: #FFFFFF;
  border: none;
}

[data-bs-theme="light"] .subscription-logo-bg {
  background: linear-gradient(135deg, #0077CC 0%, #005FA3 100%);
}

[data-bs-theme="light"] .subscription-expired-page .text-gray-900 {
  color: #333333 !important;
}

[data-bs-theme="light"] .subscription-expired-page .text-gray-800 {
  color: #333333 !important;
}

[data-bs-theme="light"] .subscription-expired-page .text-gray-700 {
  color: #666666 !important;
}

[data-bs-theme="light"] .subscription-expired-page .text-gray-600 {
  color: #666666 !important;
}

[data-bs-theme="light"] .separator.separator-dashed {
  border-top-color: #F0F0F0;
}

/* Dark Mode */
[data-bs-theme="dark"] .subscription-expired-page .card {
  background-color: #2C2C2C;
  border: none;
}

[data-bs-theme="dark"] .subscription-logo-bg {
  background: linear-gradient(135deg, #0077CC 0%, #005FA3 100%);
}

[data-bs-theme="dark"] .subscription-expired-page .text-gray-900 {
  color: #E0E0E0 !important;
}

[data-bs-theme="dark"] .subscription-expired-page .text-gray-800 {
  color: #E0E0E0 !important;
}

[data-bs-theme="dark"] .subscription-expired-page .text-gray-700 {
  color: #E0E0E0 !important;
}

[data-bs-theme="dark"] .subscription-expired-page .text-gray-600 {
  color: #AAAAAA !important;
}

[data-bs-theme="dark"] .subscription-expired-page .card-body {
  background-color: #2C2C2C;
}

[data-bs-theme="dark"] .separator.separator-dashed {
  border-top-color: #1A1A1A;
}

/* Responsive */
@media (max-width: 992px) {
  .subscription-expired-page .card {
    margin: 1rem;
    max-width: 95% !important;
  }
  
  .subscription-expired-page .card-body {
    padding: 2.5rem 2rem !important;
  }
  
  .subscription-expired-page h1 {
    font-size: 2rem !important;
  }
  
  .subscription-logo {
    width: 140px;
  }
  
  .subscription-logo-bg {
    width: 160px;
    height: 160px;
  }
}

@media (max-width: 576px) {
  .subscription-expired-page .card-body {
    padding: 2rem 1.5rem !important;
  }
  
  .subscription-expired-page h1 {
    font-size: 1.75rem !important;
  }
  
  .subscription-logo {
    width: 120px;
  }
  
  .subscription-logo-bg {
    width: 140px;
    height: 140px;
  }
  
  .subscription-cta-btn {
    font-size: 0.95rem !important;
    padding: 1rem 2rem !important;
  }
}
</style>