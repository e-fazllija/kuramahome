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
  <div v-if="!loading" class="row mb-8">
    <div class="col-xl-12">
      <Chart13 
        :agencies-list="agenciesList"
        :total-agents="data?.TotalAgents || 0"
        :is-agent="isAgent"
        :selected-agency="selectedAgencyId"
        :selected-year="selectedYear"
        :sold-properties="filteredSoldProperties"
        :rented-properties="filteredRentedProperties"
        :auction-properties="filteredAuctionProperties"
        @agency-change="onAgencyChange"
        @agency-select="onAgencySelect"
        @year-change="onYearChange"
      />
    </div>
  </div>
  <!--end::Agencies Map-->

  <!--begin::Analytics Overview-->
  <div v-if="!loading && !isAgent" class="row mb-8">
    <div class="col-xl-12">
      <Chart11 
        :kpi-data="kpiAnalyticsData"
        :selected-year="selectedYear"
      />
    </div>
  </div>
  <!--end::Analytics Overview-->
  
  <!--begin::Andamento Immobili-->
  <div v-if="!loading && !isAgent" class="row gy-5 g-xl-10 mb-8">
    <div class="col-xl-12">
      <div class="card card-xl-stretch mb-xl-10">
        <div class="card-header border-0 pt-5 pb-2">
          <h3 class="card-title align-items-start flex-column">
            <span class="card-label fw-bold fs-3 mb-1">📈 Andamento Immobili</span>
            <span class="text-muted fw-semobold fs-7">Evoluzione del portafoglio immobiliare</span>
          </h3>
        </div>
        <div class="card-body">
          <div class="row g-4">
            <div class="col-12 col-xl-6">
              <Chart3 widget-classes="card-xl-stretch" chart-height="300" title="Immobili Inseriti"
              subTitle="Andamento immobili inseriti" :chartData="chartData"/>
            </div>
            <div class="col-12 col-xl-6">
              <Chart3 widget-classes="card-xl-stretch" chart-height="300" title="Immobili Venduti"
              subTitle="Andamento immobili venduti" :chartData="soldChartData" chartType="bar"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--end::Andamento Immobili-->

  <!--begin::Distribuzione & Zone-->
  <div v-if="!loading && !isAgent" class="row gy-5 g-xl-10 mb-8">
    <div class="col-xl-12">
      <div class="card card-xl-stretch mb-xl-10">
        <div class="card-header border-0 pt-5 pb-2">
          <h3 class="card-title align-items-start flex-column">
            <span class="card-label fw-bold fs-3 mb-1">📊 Distribuzione & Zone</span>
            <span class="text-muted fw-semobold fs-7">Analisi dettagliata del portafoglio</span>
          </h3>
        </div>
        <div class="card-body">
          <div class="row g-4">
            <!--begin::Tipologie-->
            <div class="col-12 col-xl-6">
              <Chart4 widget-classes="card-xl-stretch" title="Distribuzione Tipologie Immobili"
              :datas="typologyData"/>
            </div>
            <!--end::Tipologie-->
            <!--begin::Zone-->
            <div class="col-12 col-xl-6">
              <div class="card h-100">
                <div class="card-header border-0 pt-4 pb-2">
                  <h4 class="card-title fw-bold fs-5 mb-1">🏆 Top Zone Strategiche</h4>
                  <span class="text-muted fs-7">Zone con più immobili</span>
                </div>
                <div class="card-body pt-2">
                  <!--begin::Zone Immobili-->
                  <div class="mb-4">
                    <div class="d-flex align-items-center mb-3">
                      <i class="ki-duotone ki-home-2 fs-2 text-primary me-2">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      <h5 class="fw-bold fs-6 text-gray-800 mb-0">Zone con più Immobili</h5>
                    </div>
                    <!--begin::Zones List-->
                    <div v-if="topZonesData && topZonesData.length > 0" class="d-flex flex-column">
                      <div v-for="(zone, index) in topZonesData.slice(0, 5)" :key="index" 
                           class="d-flex align-items-center mb-2 p-2 rounded-3 bg-light-primary border border-primary border-opacity-25">
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
                    <!--end::Zones List-->
                    
                    <!--begin::No Data Message-->
                    <div v-else class="text-center py-8">
                      <i class="ki-duotone ki-geolocation fs-3x text-muted mb-3">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      <h5 class="fw-bold fs-6 text-gray-700 mb-2">Nessuna zona disponibile</h5>
                      <p class="text-muted fs-8 mb-0">Non ci sono dati per l'anno selezionato</p>
                    </div>
                    <!--end::No Data Message-->
                  </div>
                  <!--end::Zone Immobili-->

                </div>
              </div>
            </div>
            <!--end::Zone-->
          </div>
        </div>
      </div>
    </div>
    </div>
  <!--end::Distribuzione & Zone-->

  <!--begin::Performance Teams-->
  <div v-if="!loading && !isAgent" class="row gy-5 g-xl-10 mb-8">
    <div class="col-xl-12">
      <div class="card card-xl-stretch mb-xl-10">
        <div class="card-header border-0 pt-5 pb-2">
          <h3 class="card-title align-items-start flex-column">
            <span class="card-label fw-bold fs-3 mb-1">🏆 Performance & Distribuzione</span>
            <span class="text-muted fw-semobold fs-7">Classifiche delle agenzie e degli agenti</span>
          </h3>
    </div>
        <div class="card-body">
          <div class="row g-4">
            <!--begin::Distribuzione Immobili-->
    <div class="col-12 col-lg-6 col-xl-4">
              <div class="card h-100">
                <div class="card-header border-0 pt-4 pb-2">
                  <h4 class="card-title fw-bold fs-5 mb-1">🏠 Distribuzione Immobili</h4>
                  <span class="text-muted fs-7">Categorie del portafoglio</span>
    </div>
                <div class="card-body pt-2">
                  <!--begin::Numero Totale-->
                  <div class="text-center mb-4">
                    <div class="fw-bold fs-2 text-primary mb-1">{{ availablePropertiesCount }}</div>
                    <div class="text-muted fs-7">Immobili disponibili</div>
  </div>
                  <!--end::Numero Totale-->

                  <!--begin::Progress Bars-->
                  <div class="d-flex flex-column">
                    <!--begin::Vendite-->
                    <div class="mb-3">
                      <div class="d-flex justify-content-between align-items-center mb-1">
                        <span class="fw-bold fs-7 text-gray-800">Vendite</span>
                        <span class="fw-bold fs-7 text-primary">{{ availablePropertiesCount > 0 ? Math.round((salePropertiesCount / availablePropertiesCount) * 100) : 0 }}%</span>
    </div>
                      <div class="progress" style="height: 6px;">
                        <div class="progress-bar bg-primary" 
                             :style="{ width: availablePropertiesCount > 0 ? (salePropertiesCount / availablePropertiesCount) * 100 + '%' : '0%' }"
                             role="progressbar"></div>
    </div>
                      <div class="text-muted fs-8 mt-1">{{ salePropertiesCount }} immobili</div>
  </div>
                    <!--end::Vendite-->

                    <!--begin::Affitti-->
                    <div class="mb-3">
                      <div class="d-flex justify-content-between align-items-center mb-1">
                        <span class="fw-bold fs-7 text-gray-800">Affitti</span>
                        <span class="fw-bold fs-7 text-success">{{ availablePropertiesCount > 0 ? Math.round((rentPropertiesCount / availablePropertiesCount) * 100) : 0 }}%</span>
    </div>
                      <div class="progress" style="height: 6px;">
                        <div class="progress-bar bg-success" 
                             :style="{ width: availablePropertiesCount > 0 ? (rentPropertiesCount / availablePropertiesCount) * 100 + '%' : '0%' }"
                             role="progressbar"></div>
    </div>
                      <div class="text-muted fs-8 mt-1">{{ rentPropertiesCount }} immobili</div>
</div>
                    <!--end::Affitti-->

                    <!--begin::Aste-->
                    <div class="mb-2">
                      <div class="d-flex justify-content-between align-items-center mb-1">
                        <span class="fw-bold fs-7 text-gray-800">Aste</span>
                        <span class="fw-bold fs-7 text-warning">{{ auctionData?.percentage || 0 }}%</span>
                      </div>
                      <div class="progress" style="height: 6px;">
                        <div class="progress-bar bg-warning" 
                             :style="{ width: (auctionData?.percentage || 0) + '%' }"
                             role="progressbar"></div>
                      </div>
                      <div class="text-muted fs-8 mt-1">{{ auctionData?.total || 0 }} immobili</div>
                    </div>
                    <!--end::Aste-->
                  </div>
                  <!--end::Progress Bars-->
                </div>
    </div>
    </div>
            <!--end::Distribuzione Immobili-->

            <!--begin::Top Agenzie-->
     <div class="col-12 col-lg-6 col-xl-4">
              <div class="card h-100">
                <div class="card-header border-0 pt-4 pb-2">
                  <h4 class="card-title fw-bold fs-5 mb-1">🏢 Top Agenzie</h4>
                  <span class="text-muted fs-7">Classifica per {{ getAgencyRankingTypeLabel() }}</span>
                </div>
                <div class="card-body pt-2">
                  <!--begin::Filtro Tipo Classifica-->
                  <div class="mb-3">
                    <div class="d-flex gap-1 flex-wrap">
                      <button 
                        @click="setAgencyRankingType('sales')"
                        :class="[
                          'btn btn-sm px-2 py-1',
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
                        @click="setAgencyRankingType('appointments')"
                        :class="[
                          'btn btn-sm px-2 py-1',
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
                  <div v-if="filteredAgenciesRankingData && filteredAgenciesRankingData.length > 0" class="d-flex flex-column">
                    <div v-for="(agency, index) in filteredAgenciesRankingData.slice(0, 5)" :key="agency.id" 
                         :class="[
                           'd-flex align-items-center mb-2 p-2 rounded-3',
                           index < 3 ? 'bg-light-info border border-info border-opacity-25' : 'bg-light-secondary border border-secondary border-opacity-25'
                         ]">
                      <div class="symbol symbol-30px me-2">
                        <span :class="[
                          'symbol-label text-white fw-bold fs-8',
                          index === 0 ? 'bg-warning' : index === 1 ? 'bg-secondary' : index === 2 ? 'bg-info' : 'bg-primary'
                        ]">
                          {{ index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1 }}
                        </span>
                      </div>
                      <div class="d-flex flex-column flex-grow-1">
                        <span class="fw-bold fs-8 text-gray-800">{{ agency.name }}</span>
                        <span class="text-muted fs-9">{{ agency.count }} {{ getAgencyRankingUnitLabel() }}</span>
                      </div>
                      <div class="text-end">
                        <span class="fw-bold fs-7 text-info">#{{ index + 1 }}</span>
                      </div>
                    </div>
                  </div>
                  <div v-else class="text-center text-muted fs-8">
                    Nessuna agenzia disponibile
                  </div>
                  <!--end::Classifica Agenzie-->
                </div>
              </div>
</div>
            <!--end::Top Agenzie-->

            <!--begin::Top Agenti-->
    <div class="col-12 col-lg-6 col-xl-4">
              <div class="card h-100">
                <div class="card-header border-0 pt-4 pb-2">
                  <h4 class="card-title fw-bold fs-5 mb-1">🏆 Top Agenti</h4>
                  <span class="text-muted fs-7">Classifica per {{ getRankingTypeLabel() }}</span>
                </div>
                <div class="card-body pt-2">
                  <!--begin::Filtro Tipo Classifica-->
                  <div class="mb-3">
                    <div class="d-flex gap-1 flex-wrap">
                      <button 
                        @click="setRankingType('sales')"
                        :class="[
                          'btn btn-sm px-2 py-1',
                          selectedRankingType === 'sales' ? 'btn-primary' : 'btn-light-primary'
                        ]"
                      >
                        <i class="ki-duotone ki-home-2 fs-7 me-1">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        Vendite
                      </button>
                      <button 
                        @click="setRankingType('appointments')"
                        :class="[
                          'btn btn-sm px-2 py-1',
                          selectedRankingType === 'appointments' ? 'btn-success' : 'btn-light-success'
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
                  <div v-if="filteredAgentsRankingData && filteredAgentsRankingData.length > 0" class="d-flex flex-column">
                    <div v-for="(agent, index) in filteredAgentsRankingData.slice(0, 5)" :key="agent.id" 
                         :class="[
                           'd-flex align-items-center mb-2 p-2 rounded-3',
                           index < 3 ? 'bg-light-primary border border-primary border-opacity-25' : 'bg-light-secondary border border-secondary border-opacity-25'
                         ]">
                      <div class="symbol symbol-30px me-2">
                        <span :class="[
                          'symbol-label text-white fw-bold fs-8',
                          index === 0 ? 'bg-warning' : index === 1 ? 'bg-secondary' : index === 2 ? 'bg-info' : 'bg-primary'
                        ]">
                          {{ index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1 }}
                        </span>
                      </div>
                      <div class="d-flex flex-column flex-grow-1">
                        <span class="fw-bold fs-8 text-gray-800">{{ agent.name }}</span>
                        <span class="text-muted fs-9">{{ agent.count }} {{ getRankingUnitLabel() }}</span>
                      </div>
                      <div class="text-end">
                        <span class="fw-bold fs-7 text-primary">#{{ index + 1 }}</span>
                      </div>
                    </div>
                  </div>
                  <div v-else class="text-center text-muted fs-8">
                    Nessun agente disponibile
                  </div>
                  <!--end::Classifica Agenti-->
                </div>
              </div>
            </div>
            <!--end::Top Agenti-->
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--end::Performance Teams-->
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
import Widget1 from "@/components/dashboard-default-widgets/Widget1.vue";

import Chart3 from "@/components/widgets/charts/Widget3.vue";
import Chart4 from "@/components/widgets/charts/Widget4.vue";
import Chart10 from "@/components/widgets/charts/Widget10.vue";
import Chart11 from "@/components/widgets/charts/Widget11.vue";
import Chart13 from "@/components/widgets/charts/Widget13.vue";
import SubscriptionExpiryBanner from "@/views/crafted/subscription/SubscriptionExpiryBanner.vue";

import { getAssetPath } from "@/core/helpers/assets";
import { getDetails, getRealEstateProperties, getAgencies, getAgents, getSoldProperties, getCalendarEvents, getRequests, getCustomers, getAllCustomers, processPropertiesForChart, processSoldPropertiesForChart, processTypologyDistribution, processTopZones, processAgentsRanking, processCalendarEvents, processRequestsForChart, processAppointmentsForChart, processAgentsForChart, processCustomersForChart } from "@/core/data/dashboard";
import type { DashboardDetails } from "@/core/data/dashboard";
import { useAuthStore } from "@/stores/auth";
import { isAgent as helperIsAgent, getUserAgencyId } from "@/core/helpers/auth";

export default defineComponent({
  name: "main-dashboard",
  components: {
    Widget1,
    Chart3,
    Chart4,
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
        
    const loading = ref<boolean>(true);
    const data = ref<DashboardDetails>();
        const chartData = ref<any>(null);
        const soldChartData = ref<any>(null);
        const typologyData = ref<any>(null);
        const topZonesData = ref<any>(null);
            const auctionData = ref<any>(null);
            const soldPropertiesCount = ref<number>(0);
            const availablePropertiesCount = ref<number>(0);
            const salePropertiesCount = ref<number>(0);
            const rentPropertiesCount = ref<number>(0);
            
            // Agency filter
            const selectedAgencyId = ref<string>('');
            const agenciesList = ref<any[]>([]);
            
            // Agents ranking filter
            const selectedRankingType = ref<'sales' | 'appointments'>('sales');
            const agentsRankingData = ref<any>(null);
            const agentsRawData = ref<any[]>([]);
            
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
            
            // Agencies ranking filter
            const selectedAgencyRankingType = ref<'sales' | 'appointments'>('sales');
            const agenciesRankingData = ref<any>(null);
            
            // Year filter
            const selectedYear = ref<number>(new Date().getFullYear());
            
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
            
            // Filtered agencies list based on selection
            const filteredAgenciesList = computed(() => {
              if (!selectedAgencyId.value) {
                // Se nessuna agenzia selezionata, mostra tutte
                return agenciesList.value;
              } else {
                // Se agenzia specifica selezionata, mostra le sotto-agenzie
                const subAgencies = agenciesList.value.filter(agency => 
                  agency.AgencyId === selectedAgencyId.value
                );
                
                // Se non ci sono sotto-agenzie, mostra l'agenzia selezionata stessa
                if (subAgencies.length === 0) {
                  const selectedAgency = agenciesList.value.find(agency => agency.id === selectedAgencyId.value);
                  return selectedAgency ? [selectedAgency] : [];
                }
                
                return subAgencies;
              }
            });

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
              if (chartData.value && chartData.value.months && chartData.value.data) {
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
              if (soldChartData.value && soldChartData.value.months && soldChartData.value.data) {
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
                  total: availablePropertiesCount.value,
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
        

        async function getItems(agencyId?: string) {
      loading.value = true;
          
          // Carica i dati del dashboard
          data.value = await getDetails(agencyId, selectedYear.value);
          
          // Per gli Agent, carica solo i dati essenziali della dashboard
          if (isAgent.value) {
            // Gli Agent vedono solo i dati base senza grafici complessi
            loading.value = false;
            return;
          }
          
          // Carica i dati degli immobili per il grafico (solo immobili disponibili: Sold=false AND AssignmentEnd>oggi)
          const propertiesResponse = await getRealEstateProperties(agencyId, selectedYear.value);
          if (propertiesResponse) {
            chartData.value = processPropertiesForChart(propertiesResponse.Data, selectedYear.value);
            
            // Salva i dati per il ranking
            allPropertiesData.value = propertiesResponse.Data;
            
            // Salva il totale degli immobili disponibili (già filtrati per Sold=false AND AssignmentEnd>oggi)
            availablePropertiesCount.value = propertiesResponse.Total || 0;
            
            // Calcola i totali per Status
            const saleProperties = propertiesResponse.Data.filter(p => p.Status === 'Vendita' && !p.Auction);
            const rentProperties = propertiesResponse.Data.filter(p => p.Status === 'Affitto' && !p.Auction);
            const auctionProperties = propertiesResponse.Data.filter(p => p.Auction === true);
            
            salePropertiesCount.value = saleProperties.length;
            rentPropertiesCount.value = rentProperties.length;
            
            auctionData.value = {
              total: auctionProperties.length,
              percentage: propertiesResponse.Data.length > 0 ? Math.round((auctionProperties.length / propertiesResponse.Data.length) * 100) : 0
            };
            
            // Carica i dati delle tipologie
            typologyData.value = processTypologyDistribution(propertiesResponse.Data);
            
            // Carica i dati delle zone
            topZonesData.value = processTopZones(propertiesResponse.Data);
          }
          
          // Carica i dati degli immobili venduti per il secondo grafico
          const soldPropertiesResponse = await getSoldProperties(agencyId, selectedYear.value);
          if (soldPropertiesResponse) {
            soldChartData.value = processSoldPropertiesForChart(soldPropertiesResponse.Data, selectedYear.value);
            soldPropertiesCount.value = soldPropertiesResponse.Total || 0;
            
            // Salva i dati per il ranking
            allSoldPropertiesData.value = soldPropertiesResponse.Data;
            
            // Calcola i totali filtrati per Widget13 (anno + agenzia)
            const currentYear = selectedYear.value;
            const filteredByYear = soldPropertiesResponse.Data.filter(property => {
              const updateDate = property.UpdateDate && property.UpdateDate !== '0001-01-01T00:00:00' 
                ? new Date(property.UpdateDate) 
                : new Date(property.CreationDate);
              return updateDate.getFullYear() === currentYear;
            });
            
            // Conta per tipologia: Venduti (Status === 'Vendita'), Affittati (Status === 'Affitto'), Aste (Auction === true)
            filteredSoldProperties.value = filteredByYear.filter(p => p.Status === 'Vendita' && !p.Auction).length;
            filteredRentedProperties.value = filteredByYear.filter(p => p.Status === 'Affitto' && !p.Auction).length;
            filteredAuctionProperties.value = filteredByYear.filter(p => p.Auction === true).length;
          }
          
          // Carica i dati delle agenzie
          const agenciesResponse = await getAgencies();
          if (agenciesResponse) {
            agenciesList.value = agenciesResponse.Data;
          }
          
          // Carica i dati degli agenti
          // Per il widget agenti, carichiamo sempre tutti gli agenti per il conteggio corretto
          const agentsResponse = await getAgents(undefined, selectedYear.value);
          if (agentsResponse) {
            agentsRankingData.value = processAgentsRanking(agentsResponse.Data);
            agentsRawData.value = agentsResponse.Data; // Dati non processati per Widget12
            
            // Carica i dati mensili degli agenti per il grafico
            const agentsChartData = processAgentsForChart(agentsResponse.Data, selectedYear.value);
            agentsMonthlyData.value = agentsChartData.monthlyData;
          }
          
          // Carica i dati degli appuntamenti
          const calendarResponse = await getCalendarEvents(agencyId, selectedYear.value);
          if (calendarResponse) {
            const appointmentsData = processCalendarEvents(calendarResponse.Data);
            totalAppointments.value = appointmentsData.total;
            confirmedAppointments.value = appointmentsData.confirmed;
            
            // Processa anche per il grafico mensile
            appointmentsChartData.value = processAppointmentsForChart(calendarResponse.Data, selectedYear.value);
          }
          
          // Carica i dati delle richieste per il grafico
          const requestsResponse = await getRequests(agencyId, selectedYear.value);
          if (requestsResponse) {
            requestsChartData.value = processRequestsForChart(requestsResponse.Data, selectedYear.value);
          }
          
          // Carica i dati dei clienti
          let customersResponse;
          if (agencyId === undefined) {
            // Per "tutte le agenzie", usa getAllCustomers
            customersResponse = await getAllCustomers();
          } else {
            // Per agenzia specifica, usa getCustomers
            customersResponse = await getCustomers(agencyId, selectedYear.value);
          }
          
          if (customersResponse) {
            const customersChartData = processCustomersForChart(customersResponse.Data, selectedYear.value);
            customersMonthlyData.value = customersChartData;
          }
          
      
      loading.value = false;
    }


    onMounted(async () => {
      // Usa helper per ottenere l'AgencyId corretto in base al ruolo
      const initialAgencyId = getUserAgencyId();
      await getItems(initialAgencyId);
    });


        // Handle agency filter change
        const onAgencyChange = async (agencyId?: string) => {
          selectedAgencyId.value = agencyId || '';
          await getItems(selectedAgencyId.value || undefined);
        };

        // Handle year change from map widget
        const onYearChange = async (year: number) => {
          selectedYear.value = year;
          await getItems(selectedAgencyId.value || undefined);
        };

        // Handle agency selection from map widget
        const onAgencySelect = async (agency: any) => {
          selectedAgencyId.value = agency.id;
          await getItems(agency.id);
        };

        // Get selected agency name
        const getSelectedAgencyName = () => {
          const agency = agenciesList.value.find(a => a.id === selectedAgencyId.value);
          return agency ? agency.name : 'Agenzia non trovata';
        };

        // Agents ranking functions
        const setRankingType = (type: 'sales' | 'appointments') => {
          selectedRankingType.value = type;
        };

        const getRankingTypeLabel = () => {
          switch (selectedRankingType.value) {
            case 'sales': return 'immobili venduti';
            case 'appointments': return 'immobili caricati';
            default: return 'immobili venduti';
          }
        };

        const getRankingUnitLabel = () => {
          switch (selectedRankingType.value) {
            case 'sales': return 'vendite';
            case 'appointments': return 'immobili';
            default: return 'vendite';
          }
        };

        // Agencies ranking functions
        const setAgencyRankingType = (type: 'sales' | 'appointments') => {
          selectedAgencyRankingType.value = type;
        };

        const getAgencyRankingTypeLabel = () => {
          switch (selectedAgencyRankingType.value) {
            case 'sales': return 'immobili venduti';
            case 'appointments': return 'immobili caricati';
            default: return 'immobili venduti';
          }
        };

        const getAgencyRankingUnitLabel = () => {
          switch (selectedAgencyRankingType.value) {
            case 'sales': return 'vendite';
            case 'appointments': return 'immobili';
            default: return 'vendite';
          }
        };

        const filteredAgentsRankingData = computed(() => {
          if (!agentsRawData.value || agentsRawData.value.length === 0) {
            return [];
          }

          // Conta le vendite/immobili caricati per ogni agente FILTRATI PER ANNO
          const agentsWithCounts = agentsRawData.value.map(agent => {
            let count = 0;
            const agentName = `${agent.Name || ''} ${agent.LastName || ''}`.trim();

            if (selectedRankingType.value === 'sales') {
              // Conta immobili venduti dell'agente nell'anno selezionato
              count = allSoldPropertiesData.value.filter(property => {
                if (property.AgentId !== agent.Id) return false;
                
                // Filtra per anno
                const updateDate = property.UpdateDate && property.UpdateDate !== '0001-01-01T00:00:00' 
                  ? new Date(property.UpdateDate) 
                  : new Date(property.CreationDate);
                return updateDate.getFullYear() === selectedYear.value;
              }).length;
            } else if (selectedRankingType.value === 'appointments') {
              // Conta immobili caricati dall'agente nell'anno selezionato
              count = allPropertiesData.value.filter(property => {
                if (property.AgentId !== agent.Id) return false;
                
                // Filtra per anno
                const creationDate = new Date(property.CreationDate);
                return creationDate.getFullYear() === selectedYear.value;
              }).length;
            }

            return {
              id: agent.Id,
              name: agentName,
              count: count
            };
          });

          // Ordina per count decrescente e filtra quelli con count > 0
          return agentsWithCounts
            .filter(agent => agent.count > 0)
            .sort((a, b) => b.count - a.count);
        });

        const filteredAgenciesRankingData = computed(() => {
          if (!agenciesList.value || agenciesList.value.length === 0) {
            return [];
          }

          const agenciesWithCounts = agenciesList.value.map(agency => {
            let count = 0;
            const agencyName = agency.UserName || agency.name || 'Agency';
            const agencyId = agency.Id;

            if (selectedAgencyRankingType.value === 'sales') {
              // Conta immobili venduti dell'agenzia nell'anno selezionato
              count = allSoldPropertiesData.value.filter(property => {
                if (property.AgencyId !== agencyId) return false;
                
                // Filtra per anno
                const updateDate = property.UpdateDate && property.UpdateDate !== '0001-01-01T00:00:00' 
                  ? new Date(property.UpdateDate) 
                  : new Date(property.CreationDate);
                return updateDate.getFullYear() === selectedYear.value;
              }).length;
            } else if (selectedAgencyRankingType.value === 'appointments') {
              // Conta immobili caricati dall'agenzia nell'anno selezionato
              count = allPropertiesData.value.filter(property => {
                if (property.AgencyId !== agencyId) return false;
                
                // Filtra per anno
                const creationDate = new Date(property.CreationDate);
                return creationDate.getFullYear() === selectedYear.value;
              }).length;
            }

            return {
              id: agency.Id,
              name: agencyName,
              count: count
            };
          });

          // Ordina per count decrescente e filtra quelli con count > 0
          return agenciesWithCounts
            .filter(agency => agency.count > 0)
            .sort((a, b) => b.count - a.count);
    });

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
      typologyData,
      topZonesData,
      auctionData,
      soldPropertiesCount,
      availablePropertiesCount,
      salePropertiesCount,
      rentPropertiesCount,
      agentsRankingData,
      agentsRawData,
      selectedAgencyId,
      agenciesList,
      onAgencyChange,
      onYearChange,
      onAgencySelect,
      getSelectedAgencyName,
      selectedRankingType,
      setRankingType,
      getRankingTypeLabel,
      getRankingUnitLabel,
      filteredAgentsRankingData,
      selectedAgencyRankingType,
      setAgencyRankingType,
      getAgencyRankingTypeLabel,
      getAgencyRankingUnitLabel,
      filteredAgenciesRankingData,
      totalAppointments,
      confirmedAppointments,
      kpiAnalyticsData,
      agentsMonthlyData,
      customersMonthlyData,
      filteredAgenciesList,
      selectedYear,
      filteredSoldProperties,
      filteredRentedProperties,
      filteredAuctionProperties,
      allPropertiesData,
      allSoldPropertiesData,
      subscriptionExpired,
      isAgent
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