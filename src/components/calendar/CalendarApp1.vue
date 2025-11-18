<template>
  <Loading v-if="loading" />
  <!--begin::Calendar wrapper-->
  <div v-else class="list-page-wrapper">
    <!--begin::Card-->
    <div class="card shadow-sm">
      <!--begin::Card header-->
      <div class="card-header border-0 pt-6 pb-4">
        <!-- Title Section -->
        <div class="card-title">
        <div class="d-flex align-items-center">
          <div class="symbol symbol-45px me-3">
            <span class="symbol-label">
              <i class="ki-duotone ki-shop fs-2 text-white">
                <span class="path1"></span>
                <span class="path2"></span>
                <span class="path3"></span>
                <span class="path4"></span>
                <span class="path5"></span>
              </i>
            </span>
          </div>
          <div>
            <h3 class="fw-bold m-0 text-gray-900 fs-3">📅 Calendario Eventi</h3>
            <span class="text-muted fs-7 fw-semibold">Gestione appuntamenti e eventi</span>
          </div>
        </div>
      </div>
        
        <!-- Add Event Button -->

        <div class="card-toolbar">
          <button
            type="button"
            class="btn btn-sm btn-primary"
            @click="newEvent(null, null)"
            >
            <i class="ki-duotone ki-plus fs-3 me-2">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            <span class="fw-bold">Nuovo Evento</span>
          </button>
        </div>
      </div>
      <!--end::Card header-->

      <!--begin::Filters Section-->
      <div class="card-body pt-5 pb-4">
        <div class="container-fluid px-0 filter-container">
          <div class="row g-3 align-items-center">
            <!-- Bottone Cerca con loading -->
            <div class="col-12 col-md-auto">
              <button 
                @click="searchItemsFunc()" 
                class="btn btn-filter-search w-100 w-md-auto"
                :disabled="isSearching"
              >
                <i class="ki-duotone ki-magnifier fs-4 me-2">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
                <span v-if="!isSearching">Cerca</span>
                <span v-else>Ricerca...</span>
              </button>
            </div>
            
            <!-- Agency Filter (Admin only) -->
            <div v-if="user.Role == 'Admin'" class="col-12 col-sm-6 col-lg-auto">
              <select class="form-select form-select-modern" v-model="agencyId">
                <option value="">🏢 Tutte le agenzie</option>
                <option v-for="(item, index) in searchItems.Agencies" :key="index" :value="item.Id">
                  🏢 {{ item.FirstName }} {{ item.LastName }}
                </option>
              </select>
            </div>

            <!-- Agent Filter -->
            <div v-if="user.Role == 'Admin' || user.Role == 'Agency'" class="col-12 col-sm-6 col-lg-auto">
              <select class="form-select form-select-modern" v-model="agentId">
                <option value="">👥 Tutti gli agenti</option>
                <option v-for="(item, index) in searchItems.Agents" :key="index" :value="item.Id">
                  👤 {{ item.FirstName }} {{ item.LastName }}
                </option>
              </select>
            </div>

            <!-- Status Filter -->
            <div class="col-12 col-sm-6 col-lg-auto">
              <select class="form-select form-select-modern" v-model="statusFilter">
                <option value="">📊 Tutti stati</option>
                <option value="confirmed">✓ Confermati</option>
                <option value="cancelled">✗ Disdetti</option>
                <option value="postponed">⏸ Rimandati</option>
                <option value="pending">⏳ In attesa</option>
              </select>
            </div>

            <!-- Search Input con icona interna -->
            <div class="col-12 col-md">
              <div class="input-group">
                <span class="input-group-text bg-transparent border-end-0">
                  <i class="ki-duotone ki-magnifier fs-4">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                </span>
                <input 
                  type="text" 
                  v-model="search" 
                  @keyup.enter="searchItemsFunc()"
                  class="form-control filter-input border-start-0 ps-0" 
                  :placeholder="currentPlaceholder" 
                />
                <button 
                  v-if="search"
                  @click="clearAllFilters()" 
                  class="btn btn-sm btn-outline-danger rounded-end"
                  type="button"
                  title="Cancella ricerca"
                >
                  <i class="ki-duotone ki-cross fs-5">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                </button>
              </div>
            </div>
            
            <!-- Badge Risultati -->
            <div class="col-12 col-md-auto">
              <span class="badge badge-filter-results">
                <i class="ki-duotone ki-calendar fs-4 me-2">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
                {{ tableData.length }} eventi
              </span>
            </div>
          </div>
        
          <!-- Separatore morbido -->
          <hr class="my-4 filter-separator" />
        </div>
      </div>
      <!--end::Filters Section-->

      <!--begin::Card body-->
      <div class="card-body pt-0">
        <!--begin::Calendar-->
        <FullCalendar class="demo-app-calendar" :options="calendarOptions"></FullCalendar>
        <!--end::Calendar-->
      </div>
      <!--end::Card body-->
    </div>
    <!--end::Card-->
  </div>
  <!--end::Calendar wrapper-->

  <NewEventModal :UserId="userId" :Color="color" :SelectedDateStart="selectedDateStart"
    :SelectedDateEnd="selectedDateEnd" @formAddSubmitted="loadAllEvents()">
  </NewEventModal>
  <UpdateEventModal :Id="selectedId" @formUpdateSubmitted="loadAllEvents()">
  </UpdateEventModal>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, onMounted, watch, computed } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { TODAY, todayDate, getEvents, getSearchItems, SearchModel, Event } from "@/core/data/events";
import NewEventModal from "@/components/modals/forms/calendar/NewEventModal.vue";
import UpdateEventModal from "@/components/modals/forms/calendar/UpdateEventModal.vue";
import { Modal } from "bootstrap";
import { useAuthStore } from "@/stores/auth";
import type { EventInput } from "@fullcalendar/core";
import Loading from "@/components/kt-datatable/table-partials/Loading.vue";
import itLocale from '@fullcalendar/core/locales/it';
import Multiselect from '@vueform/multiselect';
import { MenuComponent } from "@/assets/ts/components";
import '@/assets/css/filters.css';
import '@/assets/css/table-actions.css';
import '@/assets/css/lists-common.css';


export default defineComponent({
  name: "calendar-app-1",
  components: {
    FullCalendar,
    NewEventModal,
    UpdateEventModal,
    Loading,
    Multiselect
  },
  setup() {
    const loading = ref<boolean>(true);
    let selectedId = ref(0);
    let selectedDateStart = ref<string>("");
    let selectedDateEnd = ref<string>("");
    let agentId = ref("");
    let agencyId = ref("");
    let statusFilter = ref("");
    const initItems = ref([]);
    const newTargetModalRef = ref<null | HTMLElement>(null);
    const store = useAuthStore();
    const user = store.user;
    const searchItems = ref<SearchModel>({
      Agencies: [],
      Agents: [],
    })

    const defaultSearchItems = ref<SearchModel>({
      Agencies: [],
      Agents: [],
    })

    const userId = computed(() => {
      if (user.Role == "Admin" || user.Role == "Agency") {
        return agentId.value != null && agentId.value != "" ? agentId.value : user.Id
      }
      else {
        return user.Id
      }
    })

    const color = computed(() => {
      if (agentId.value != null && agentId.value != "") {
        if (user.Role == "Admin" || user.Role == "Agency") {
          const userSelected = searchItems.value.Agents.filter(x => x.Id == agentId.value)[0];
          return userSelected.Color;
        }
        else {
          return user.Color;
        }
      }
    })

    const newEvent = async (start: string, end: string) => {
      if (!start || !end) {

        const today = todayDate.format("YYYY-MM-DD"); // Data di oggi
        selectedDateStart.value = `${today}T07:00:00`; // Imposta l'orario di inizio alle 7:00
        selectedDateEnd.value = `${today}T08:00:00`; // Imposta l'orario di fine alle 8:00
      } else {
        selectedDateStart.value = start.toString();
        selectedDateEnd.value = end.toString();
      }

      const modal = new Modal(
        document.getElementById("kt_modal_add_event") as Element
      );
      modal.show();

      const modalElement = document.getElementById("kt_modal_add_event");
      if (modalElement) {
        modalElement.addEventListener("hidden.bs.modal", () => {
          // Rimuove il backdrop
          document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());

          // Rimuove forzatamente la classe modal-open dal body
          document.body.classList.remove("modal-open");
          document.body.style.overflow = "";
        });
      }
    };


    const updateEvent = (id: number) => {
      selectedId.value = id;
      const modal = new Modal(
        document.getElementById("kt_modal_update_event") as Element
      );
      modal.show();
    };

    const tableData = ref<Array<EventInput>>([]);
    const allEvents = ref<Array<Event>>([]);

    async function loadAllEvents() {
      const results = await getEvents();
      allEvents.value = results || [];
      applyFilters();
    }

    function applyFilters() {
      tableData.value.splice(0);
      initItems.value.splice(0);
      
      const addName = store.user.Role != "Agent" && agentId.value == "" ? true : false;
      
      for (const key in allEvents.value) {
        const event = allEvents.value[key];
        
        // Filtro per Agency (solo per Admin)
        // Se l'admin seleziona un'Agency, mostra eventi dell'Agency stessa + eventi degli Agent di quell'Agency
        if (store.user.Role == "Admin" && agencyId.value) {
          const isAgencyEvent = event.UserId === agencyId.value; // Evento dell'Agency stessa
          const isAgentOfAgency = event.User.AdminId === agencyId.value; // Evento di un Agent di quell'Agency
          
          if (!isAgencyEvent && !isAgentOfAgency) {
            continue;
          }
        }
        
        // Filtro per Agent (per Admin e Agency)
        if (agentId.value && event.UserId !== agentId.value) {
          continue;
        }
        
        // Filtro per stato
        if (statusFilter.value && !matchesStatusFilter(event, statusFilter.value)) {
          continue;
        }

        // Add status indicator to title
        let statusIndicator = "";
        if (event.Confirmed) {
          statusIndicator = " ✓";
        } else if (event.Cancelled) {
          statusIndicator = " ✗";
        } else if (event.Postponed) {
          statusIndicator = " ⏸";
        } else {
          statusIndicator = " ⏳";
        }

        const baseTitle = addName ? `${event.User.FirstName} ${event.User.LastName}: ${event.EventName}` : event.EventName;
        
        const item = {
          id: event.Id.toString(),
          title: baseTitle + statusIndicator,
          start: event.EventStartDate,
          end: event.EventEndDate,
          description: event.EventDescription,
          className: "fc-event-meeting",
          color: event.Color != null && event.Color != "" ? event.Color : event.User.Color
        } as EventInput;

        tableData.value.push(item)
      }
      initItems.value.splice(0, tableData.value.length, ...tableData.value);
    }

    

    onMounted(async () => {
      loading.value = true;
      await loadAllEvents();
      
      if (store.user.Role == "Agency" || store.user.Role == "Admin") {
        searchItems.value = await getSearchItems(store.user.Id, agencyId.value);
        if (store.user.Role == "Admin") {
          agencyId.value = ""; // Mostra tutti gli eventi per default
        }
      }
      
      // Avvia animazione placeholder
      initPlaceholderAnimation();
      
      loading.value = false;
    });

    watch(() => agencyId.value, async (first, second) => {
      if (store.user.Role == "Admin") {
        searchItems.value = await getSearchItems(store.user.Id, agencyId.value);
      }
      applyFilters();
    })

    watch(() => agentId.value, async (first, second) => {
      applyFilters();
    })

    watch(() => statusFilter.value, async (first, second) => {
      applyFilters();
    })


    const search = ref<string>("");
    const isSearching = ref(false);
    
    const searchItemsFunc = () => {
      isSearching.value = true;
      
      // Breve delay per mostrare l'animazione di loading
      setTimeout(() => {
        tableData.value.splice(0, tableData.value.length, ...initItems.value);
        if (search.value !== "") {
          let results: Array<EventInput> = [];
          for (let j = 0; j < tableData.value.length; j++) {
            if (searchingFunc(tableData.value[j], search.value)) {
              results.push(tableData.value[j]);
            }
          }
          tableData.value.splice(0, tableData.value.length, ...results);
        }
        MenuComponent.reinitialization();
        isSearching.value = false;
      }, 300);
    };

    const searchingFunc = (obj: any, value: string): boolean => {
      for (let key in obj) {
        if (
          !Number.isInteger(obj[key]) &&
          !(typeof obj[key] === "object") &&
          (typeof obj[key] === "string" || typeof obj[key] === "number" || Array.isArray(obj[key]))
        ) {
          if (obj[key].toString().toLowerCase().indexOf(value) !== -1) {
            return true;
          }
        }
      }
      return false;
    };

    const matchesStatusFilter = (event: Event, filter: string): boolean => {
      switch (filter) {
        case "confirmed":
          return event.Confirmed === true && event.Cancelled === false && event.Postponed === false;
        case "cancelled":
          return event.Cancelled === true;
        case "postponed":
          return event.Postponed === true;
        case "pending":
          return event.Confirmed === false && event.Cancelled === false && event.Postponed === false;
        default:
          return true;
      }
    };

    const clearAllFilters = () => {
      search.value = "";
      searchItemsFunc();
    };

    // Placeholder dinamico
    const placeholders = [
      "Cerca per nome evento...",
      "Cerca per descrizione...",
      "Cerca evento, cliente...",
      "Cerca per data o orario..."
    ];
    const currentPlaceholder = ref(placeholders[0]);
    let placeholderIndex = 0;
    
    // Inizializza placeholder animato
    const initPlaceholderAnimation = () => {
      setInterval(() => {
        placeholderIndex = (placeholderIndex + 1) % placeholders.length;
        currentPlaceholder.value = placeholders[placeholderIndex];
      }, 3000);
    };

    const calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
      initialView: "timeGridDay",
      slotMinTime: "07:00:00",
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      },
      initialDate: TODAY,
      navLinks: true, // can click day/week names to navigate views
      selectable: true,
      selectMirror: true,

      views: {
        dayGridMonth: { buttonText: "mese" },
        timeGridWeek: { buttonText: "settimana" },
        timeGridDay: { buttonText: "giorno" },
      },

      editable: true,
      dayMaxEvents: true, // allow "more" link when too many events
      events: tableData.value,
      dateClick: (arg) => {
        if (arg.allDay) {
          const start = new Date(arg.dateStr + "T07:00:00"); // Ora di inizio: 7:00
          const end = new Date(arg.dateStr + "T08:00:00"); // Ora di fine: 8:00
          newEvent(start.toISOString(), end.toISOString()); // Passa le date formattate
        } else {
          const start = new Date(arg.dateStr);
          const end = new Date(start.getTime());
          end.setMinutes(start.getMinutes() + 30); // Aggiungi 30 minuti per la fine

          newEvent(start.toISOString(), end.toISOString()); // Passa i nuovi orari all'evento
        }
      },
      eventClick: (arg) => {
        updateEvent(parseInt(arg.event.id));
      },
      select: (arg) => {
        newEvent(arg.start, arg.end);
      },
      locale: 'it', // Imposta la lingua su italiano
      locales: [itLocale], // Aggiungi la localizzazione italiana
      buttonText: {
        today: 'Oggi',
        month: 'Mese',
        week: 'Settimana',
        day: 'Giorno',
      },
    };

    return {
      calendarOptions,
      newEvent,
      updateEvent,
      getAssetPath,
      loading,
      loadAllEvents,
      selectedId,
      agentId,
      agencyId,
      statusFilter,
      user,
      searchItems,
      selectedDateStart,
      selectedDateEnd,
      todayDate,
      newTargetModalRef,
      userId,
      color,
      search,
      searchItemsFunc,
      isSearching,
      clearAllFilters,
      currentPlaceholder,
      tableData
    };
  },
});
</script>

