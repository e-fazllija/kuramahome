<template>
  <!--begin::Agents Dashboard Widget-->
  <div :class="isEmbedded ? 'embedded-widget' : 'card card-xl-stretch mb-xl-10'">
    <!--begin::Body-->
    <div :class="isEmbedded ? '' : 'card-body p-6'">
      <!--begin::Header-->
      <div v-if="!isEmbedded" class="d-flex align-items-center justify-content-between mb-5">
        <div class="d-flex align-items-center">
          <div class="symbol symbol-50px me-3">
            <span class="symbol-label" style="background: linear-gradient(135deg, #ffa800 0%, #4ecdc4 100%); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);">
              <i class="ki-duotone ki-user-tick fs-2 text-white">
                <span class="path1"></span>
                <span class="path2"></span>
                <span class="path3"></span>
              </i>
            </span>
          </div>
          <div>
            <h3 class="fw-bold fs-4 text-gray-800 mb-1">🏢 Agenzie e Agenti</h3>
            <span class="text-muted fs-6">Lista delle agenzie con il numero di agenti associati</span>
          </div>
        </div>
        <div class="d-flex align-items-center">
          <a 
            href="#/agents" 
            class="btn btn-sm btn-light fw-bold"
          >
            <i class="ki-duotone ki-arrow-right fs-4 me-1">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            Vai nella sezione
          </a>
        </div>
      </div>
      
      <!--begin::Embedded Header-->
      <div v-if="isEmbedded" class="d-flex align-items-center justify-content-between mb-3">
        <div class="d-flex align-items-center">
          <div class="symbol symbol-30px me-2">
            <span class="symbol-label" style="background: linear-gradient(135deg, #ffa800 0%, #4ecdc4 100%); box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);">
              <i class="ki-duotone ki-user-tick fs-4 text-white">
                <span class="path1"></span>
                <span class="path2"></span>
                <span class="path3"></span>
              </i>
            </span>
          </div>
          <div>
            <h4 class="fw-bold fs-5 text-gray-800 mb-0">🏢 Agenzie e Agenti</h4>
            <span class="text-muted fs-7">Lista delle agenzie con il numero di agenti associati</span>
          </div>
        </div>
        <div class="d-flex align-items-center">
          <a 
            href="#/agents" 
            class="btn btn-sm btn-light fw-bold"
          >
            <i class="ki-duotone ki-arrow-right fs-5 me-1">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            Vai nella sezione
          </a>
        </div>
      </div>
      <!--end::Embedded Header-->
      <!--end::Header-->

      <!--begin::Agencies List-->
      <div class="agencies-list-container scrollable-container">
        <div 
          v-for="(agency, index) in agenciesWithAgentCount" 
          :key="agency.id"
          class="agency-item"
        >
          <div class="d-flex align-items-center p-3 hover-elevate-up transition-all">
            <!--begin::Agency Icon-->
            <div class="symbol symbol-50px me-4 flex-shrink-0 position-relative">
              <span 
                class="symbol-label text-white fw-bold fs-3"
                :style="{ backgroundColor: agency.color }"
              >
                <i class="ki-duotone ki-shop fs-2">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                  <span class="path4"></span>
                  <span class="path5"></span>
                </i>
              </span>
              <!--begin::Rank Badge-->
              <div class="position-absolute top-0 start-80 translate-middle">
                <span class="badge badge-circle badge-primary fs-7 fw-bold" 
                      :class="{
                        'badge-danger': index === 0,
                        'badge-warning': index === 1,
                        'badge-success': index === 2
                      }">
                  {{ index + 1 }}
                </span>
              </div>
              <!--end::Rank Badge-->
            </div>
            <!--end::Agency Icon-->

            <!--begin::Agency Info-->
            <div class="flex-grow-1">
              <h5 class="fw-bold fs-4 text-gray-800 mb-1">{{ agency.name }}</h5>
              <div class="d-flex align-items-center">
                <span class="text-muted fs-6 me-3">Agenzia Immobiliare</span>
                <div class="separator separator-dashed separator-vertical"></div>
                <span class="text-muted fs-6 ms-3">{{ agency.percentage }}% del totale</span>
              </div>
            </div>
            <!--end::Agency Info-->

            <!--begin::Agent Count-->
            <div class="text-end">
              <div class="fw-bold fs-2 text-primary mb-1">{{ agency.agentCount }}</div>
              <div class="text-muted fs-7 fw-semibold">
                {{ agency.agentCount === 1 ? 'Agente' : 'Agenti' }}
              </div>
            </div>
            <!--end::Agent Count-->
          </div>
        </div>
      </div>
      <!--end::Agencies List-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Agents Dashboard Widget-->
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import type { PropType } from "vue";

export default defineComponent({
  name: "widget-12",
  props: {
    agentsList: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    agenciesList: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    isEmbedded: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    // Colori per le agenzie
    const agencyColors = [
      '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57',
      '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43',
      '#10ac84', '#ee5a24', '#0984e3', '#6c5ce7', '#a29bfe',
      '#fd79a8', '#fdcb6e', '#e17055', '#00b894', '#e84393'
    ];

    // Calcola il numero di agenti per agenzia
    const agenciesWithAgentCount = computed(() => {
      const totalAgents = props.agentsList.length;
      
      return props.agenciesList.map((agency, index) => {
        // Prova diversi campi per il matching
        const agentCountAgencyId = props.agentsList.filter(agent => agent.AgencyId === agency.id).length;
        const agentCountAgency = props.agentsList.filter(agent => agent.Agency === agency.id).length;
        const agentCountAgencyIdLower = props.agentsList.filter(agent => agent.agencyId === agency.id).length;
        const agentCountAgencyLower = props.agentsList.filter(agent => agent.agency === agency.id).length;
        
        // Usa il campo che funziona
        const agentCount = agentCountAgencyId || agentCountAgency || agentCountAgencyIdLower || agentCountAgencyLower;
        const percentage = totalAgents > 0 ? Math.round((agentCount / totalAgents) * 100) : 0;
        
        return {
          id: agency.id,
          name: agency.name,
          agentCount,
          percentage,
          color: agencyColors[index % agencyColors.length]
        };
      }).sort((a, b) => b.agentCount - a.agentCount); // Ordina per numero di agenti
    });

    return {
      agenciesWithAgentCount,
      agentsList: props.agentsList,
      agenciesList: props.agenciesList,
      isEmbedded: props.isEmbedded
    };
  }
});
</script>

<style scoped>
/* Agencies List Container */
.agencies-list-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem ;
}

/* Scrollable Container */
.scrollable-container {
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  box-sizing: border-box;
}

/* Embedded scrollable container - mostra max 4 agenzie */
.embedded-widget .scrollable-container {
  max-height: 320px; /* Altezza per 4 agenzie (80px per agenzia) */
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  box-sizing: border-box;
  padding-right: 0.5rem;
}

/* Custom Scrollbar */
.scrollable-container::-webkit-scrollbar {
  width: 6px;
}

.scrollable-container::-webkit-scrollbar-track {
  background: #f1f3f4;
  border-radius: 3px;
}

.scrollable-container::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
  transition: background 0.3s ease;
}

.scrollable-container::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Firefox Scrollbar */
.scrollable-container {
  scrollbar-width: thin;
  scrollbar-color: #c1c1c1 #f1f3f4;
}

.agency-item {
  transition: all 0.3s ease;
}

.agency-item:hover {
  transform: translateY(-2px);
}

/* Agency Item Styles - senza card */
.agency-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.agency-item:last-child {
  border-bottom: none;
}

.agency-item:hover {
  background-color: rgba(54, 153, 255, 0.05);
  border-radius: 0.5rem;
}

/* Symbol Styles */
.symbol-label {
  border-radius: 0.95rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.agency-item:hover .symbol-label {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

/* Rank Badge */
.badge-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border: 2px solid white;
}

.badge-circle.badge-danger {
  background: linear-gradient(135deg, #f64e60 0%, #d63447 100%);
  color: white;
}

.badge-circle.badge-warning {
  background: linear-gradient(135deg, #ffa800 0%, #ff9500 100%);
  color: white;
}

.badge-circle.badge-success {
  background: linear-gradient(135deg, #1bc5bd 0%, #0bb7af 100%);
  color: white;
}

.badge-circle.badge-primary {
  background: linear-gradient(135deg, #3699ff 0%, #0080ff 100%);
  color: white;
}

/* Separator */
.separator-vertical {
  height: 20px;
  width: 1px;
  background-color: #e9ecef;
}

/* Hover Effects */
.hover-elevate-up {
  transition: all 0.3s ease;
}

.hover-elevate-up:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}

/* Animation for items */
.agency-item {
  animation: fadeInUp 0.5s ease forwards;
}

.agency-item:nth-child(1) { animation-delay: 0.1s; }
.agency-item:nth-child(2) { animation-delay: 0.2s; }
.agency-item:nth-child(3) { animation-delay: 0.3s; }
.agency-item:nth-child(4) { animation-delay: 0.4s; }
.agency-item:nth-child(5) { animation-delay: 0.5s; }
.agency-item:nth-child(6) { animation-delay: 0.6s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Embedded widget styles */
.embedded-widget {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
}

.embedded-widget .agencies-list-container {
  flex: 1;
  max-height: 320px; /* Altezza per 4 agenzie */
  padding: 0;
  margin: 0;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.embedded-widget .agency-item {
  margin-bottom: 0;
  width: 100%;
  box-sizing: border-box;
  min-height: 80px; /* Altezza fissa per ogni agenzia */
  display: flex;
  align-items: center;
}

.embedded-widget .symbol {
  width: 45px !important;
  height: 45px !important;
}

.embedded-widget .symbol-label {
  font-size: 1rem !important;
}

.embedded-widget .fw-bold.fs-4 {
  font-size: 1.1rem !important;
  margin-bottom: 0.5rem !important;
}

.embedded-widget .fw-bold.fs-2 {
  font-size: 1.5rem !important;
}

.embedded-widget .text-muted.fs-6 {
  font-size: 0.85rem !important;
}

.embedded-widget .text-muted.fs-7 {
  font-size: 0.75rem !important;
}

.embedded-widget .badge-circle {
  width: 22px !important;
  height: 22px !important;
  font-size: 0.7rem !important;
}

/* Responsive Design */
@media (max-width: 768px) {
  .agencies-list-container {
    gap: 0.75rem;
  }
  
  .card-body {
    padding: 1rem !important;
  }
  
  .symbol {
    width: 40px !important;
    height: 40px !important;
  }
  
  .symbol-label {
    font-size: 1rem !important;
  }
  
  .badge-circle {
    width: 20px !important;
    height: 20px !important;
    font-size: 0.6rem !important;
  }
  
  .fw-bold.fs-4 {
    font-size: 1.1rem !important;
  }
  
  .fw-bold.fs-2 {
    font-size: 1.5rem !important;
  }
}

@media (max-width: 480px) {
  .agencies-list-container {
    gap: 0.5rem;
  }
  
  .card-body {
    padding: 0.75rem !important;
  }
  
  .d-flex.align-items-center {
    flex-direction: column;
    text-align: center;
  }
  
  .me-4 {
    margin-right: 0 !important;
    margin-bottom: 1rem;
  }
  
  .text-end {
    text-align: center !important;
  }
  
  .separator-vertical {
    display: none;
  }
}
</style>
