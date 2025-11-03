<template>
  <Loading v-if="loading" />
  <!--begin::Calendar wrapper-->
  <div v-else class="calendar-page-wrapper">
    <!--begin::Card-->
    <div class="card shadow-sm" style="border-radius: 0.95rem; border: 1px solid #e9ecef;">
      <!--begin::Card header-->
      <div class="card-header border-0 pt-6 pb-4" style="background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%); border-radius: 0.95rem 0.95rem 0 0;">
        <!-- Title Section -->
        <div class="card-title">
          <div class="d-flex align-items-center">
            <div class="symbol symbol-45px me-3">
              <span class="symbol-label" style="background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%); box-shadow: 0 4px 12px rgba(54, 153, 255, 0.3);">
                <i class="ki-duotone ki-calendar fs-2 text-white">
                  <span class="path1"></span>
                  <span class="path2"></span>
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
            style="background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%); border: none; border-radius: 0.75rem; padding: 0.75rem 1.5rem; box-shadow: 0 4px 12px rgba(54, 153, 255, 0.25);"
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
      <div class="card-body pt-0 pb-4">
        <div class="filter-section" style="margin-top: 1.5rem; margin-bottom: 1.5rem;">
          <div class="d-flex align-items-center gap-2 flex-wrap">
            <!-- Agency Filter (Admin only) -->
            <div v-if="user.Role == 'Admin'" class="flex-shrink-0">
              <select class="form-select form-select-modern" v-model="agencyId" style="min-width: 160px;">
                <option v-for="(item, index) in searchItems.Agencies" :key="index" :value="item.Id">
                  🏢 {{ item.Name }} {{ item.LastName }}
                </option>
              </select>
            </div>

            <!-- Agent Filter -->
            <div v-if="user.Role == 'Admin' || user.Role == 'Agency'" class="flex-shrink-0">
              <select class="form-select form-select-modern" v-model="agentId" style="min-width: 150px;">
                <option value="">👥 Tutti agenti</option>
                <option v-for="(item, index) in searchItems.Agents" :key="index" :value="item.Id">
                  👤 {{ item.Name }} {{ item.LastName }}
                </option>
              </select>
            </div>

            <!-- Status Filter -->
            <div class="flex-shrink-0">
              <select class="form-select form-select-modern" v-model="statusFilter" style="min-width: 140px;">
                <option value="">📊 Tutti stati</option>
                <option value="confirmed">✓ Confermati</option>
                <option value="cancelled">✗ Disdetti</option>
                <option value="postponed">⏸ Rimandati</option>
                <option value="pending">⏳ In attesa</option>
              </select>
            </div>

            <!-- Search -->
            <div class="flex-grow-1" style="min-width: 250px; max-width: 400px;">
              <div class="search-wrapper">
                <i class="ki-duotone ki-magnifier fs-3 search-icon">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
                <input 
                  type="text" 
                  v-model="search" 
                  @input="searchItemsFunc()"
                  class="form-control search-input" 
                  placeholder="Cerca evento, descrizione..." 
                />
                <button 
                  v-if="search"
                  @click="search = ''" 
                  class="btn btn-sm btn-clear"
                  title="Cancella ricerca"
                >
                  <i class="ki-duotone ki-cross fs-5">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Separatore -->
        <div class="separator separator-dashed my-4"></div>
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
    :SelectedDateEnd="selectedDateEnd" @formAddSubmitted="getItems(agencyId, agentId)">
  </NewEventModal>
  <UpdateEventModal :Id="selectedId" @formUpdateSubmitted="getItems(agencyId, agentId)">
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

    async function getItems(_agencyId: string, _agentId: string) {
      tableData.value.splice(0);
      initItems.value.splice(0);
      const results = await getEvents(_agencyId, _agentId);
      const addName = store.user.Role != "Agente" && agentId.value == "" ? true : false;
      
      for (const key in results) {
        // Apply status filter
        if (statusFilter.value && !matchesStatusFilter(results[key], statusFilter.value)) {
          continue;
        }

        // Add status indicator to title
        let statusIndicator = "";
        if (results[key].Confirmed) {
          statusIndicator = " ✓";
        } else if (results[key].Cancelled) {
          statusIndicator = " ✗";
        } else if (results[key].Postponed) {
          statusIndicator = " ⏸";
        } else {
          statusIndicator = " ⏳";
        }

        const baseTitle = addName ? `${results[key].ApplicationUser.Name} ${results[key].ApplicationUser.LastName}: ${results[key].NomeEvento}` : results[key].NomeEvento;
        
        const item = {
          id: results[key].Id.toString(),
          title: baseTitle + statusIndicator,
          start: results[key].DataInizioEvento,
          end: results[key].DataFineEvento,
          description: results[key].DescrizioneEvento,
          className: "fc-event-meeting",
          color: results[key].Color != null && results[key].Color != "" ? results[key].Color : results[key].ApplicationUser.Color
        } as EventInput;

        tableData.value.push(item)
      }
      initItems.value.splice(0, tableData.value.length, ...tableData.value);
    };

    

    onMounted(async () => {
      loading.value = true;
      if (store.user.Role == "Agency" || store.user.Role == "Admin") {
        await getItems(store.user.AgencyId, "");
        searchItems.value = await getSearchItems(store.user.Id, agencyId.value);
        agencyId.value = store.user.AgencyId;
      } else {
        await getItems(store.user.AgencyId, store.user.Id);
      }
      
      loading.value = false;
    });

    watch(() => agencyId.value, async (first, second) => {
      await getItems(agencyId.value, "");
      searchItems.value = await getSearchItems(store.user.Id, agencyId.value);
    })

    watch(() => agentId.value, async (first, second) => {
      await getItems(agencyId.value, agentId.value);
    })

    watch(() => statusFilter.value, async (first, second) => {
      await getItems(agencyId.value, agentId.value);
    })


    const search = ref<string>("");
    const searchItemsFunc = () => {
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
      getItems,
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
      searchItemsFunc
    };
  },
});
</script>

<style lang="scss">
.fc .fc-button {
  padding: 0.75rem 1.25rem;
  box-shadow: none !important;
  border: 0 !important;
  border-radius: 0.475rem;
  vertical-align: middle;
  font-weight: 500;
  text-transform: capitalize;
}
</style>

<style scoped>
/* Sfondo univoco della pagina calendario */
.calendar-page-wrapper {
  background: linear-gradient(135deg, #fafbfc 0%, #f8f9fa 100%);
  min-height: 100vh;
  padding: 2rem 0;
  position: relative;
}

.calendar-page-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 20%, rgba(54, 153, 255, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(11, 183, 175, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 40% 60%, rgba(54, 153, 255, 0.02) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.calendar-page-wrapper > .card {
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

/* Search Bar Moderna con icona interna */
.search-wrapper {
  position: relative;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a1a5b7;
  pointer-events: none;
  z-index: 1;
  transition: color 0.3s ease;
}

.search-input {
  background-color: #f1f3ff !important;
  border: 1px solid #e8f4ff !important;
  border-radius: 0.75rem !important;
  padding: 0.75rem 3.5rem 0.75rem 3.5rem !important;
  font-weight: 500;
  color: #3f4254;
  transition: all 0.3s ease;
}

.search-input:focus {
  background-color: #ffffff !important;
  border-color: #3699ff !important;
  box-shadow: 0 0 0 0.2rem rgba(54, 153, 255, 0.15);
}

.search-input::placeholder {
  color: #a1a5b7;
  font-weight: 400;
}

.btn-clear {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background-color: #f64e60;
  border: none;
  border-radius: 0.5rem;
  width: 32px;
  height: 32px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.btn-clear:hover {
  background-color: #d63447;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 4px 8px rgba(246, 78, 96, 0.3);
}

.btn-clear i {
  color: white;
}

/* Stili per i select moderni */
.form-select-modern {
  background-color: #f8f9fa !important;
  border: 1px solid #e9ecef !important;
  border-radius: 0.75rem !important;
  padding: 0.75rem 1rem !important;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%) !important;
  border: 1px solid #e8f4ff !important;
  font-weight: 500;
  color: #3f4254;
  box-shadow: 0 2px 8px rgba(54, 153, 255, 0.1);
}

.form-select-modern:focus {
  border-color: #3699ff !important;
  box-shadow: 0 0 0 0.2rem rgba(54, 153, 255, 0.15) !important;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%) !important;
  transform: translateY(-1px);
}

.form-select-modern:hover {
  background: linear-gradient(135deg, #e8f4ff 0%, #f1f3ff 100%) !important;
  border-color: #3699ff !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(54, 153, 255, 0.15);
}

/* Bottone Nuovo Evento */
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(54, 153, 255, 0.35) !important;
}

/* Effetto hover su icona ricerca */
.search-input:focus ~ .search-icon,
.search-input:hover ~ .search-icon {
  color: #3699ff;
}

/* Responsive design */
@media (max-width: 768px) {
  .d-flex.align-items-center.gap-2 {
    gap: 1rem !important;
  }
  
  .search-wrapper {
    max-width: 100% !important;
  }
  
  .flex-shrink-0 {
    flex-shrink: 1 !important;
  }
}
</style>
