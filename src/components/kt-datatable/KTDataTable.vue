<template>
  <div class="dataTables_wrapper dt-bootstrap4 no-footer">
    <TableContent
      @on-items-select="onItemSelect"
      @on-sort="onSort"
      :header="header"
      :data="dataToDisplay"
      :checkboxEnabled="checkboxEnabled"
      :checkboxLabel="checkboxLabel"
      :empty-table-text="emptyTableText"
      :sort-label="sortLabel"
      :sort-order="sortOrder"
      :loading="loading"
    >
      <template v-for="(_, name) in $slots" v-slot:[name]="{ row: item }">
        <slot :name="name" :row="item" />
      </template>
    </TableContent>
    <TableFooter
      @page-change="pageChange"
      :current-page="currentPage"
      v-model:itemsPerPage="itemsInTable"
      :count="totalItems"
      :items-per-page-dropdown-enabled="itemsPerPageDropdownEnabled"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import TableContent from "@/components/kt-datatable/table-partials/table-content/TableContent.vue";
import TableFooter from "@/components/kt-datatable/table-partials/TableFooter.vue";
import type { Sort } from "@/components/kt-datatable/table-partials/models";

export default defineComponent({
  name: "kt-datatable",
  props: {
    header: { type: Array, required: true },
    data: { type: Array, required: true },
    itemsPerPage: { type: Number, default: 10 },
    itemsPerPageDropdownEnabled: {
      type: Boolean,
      required: false,
      default: true,
    },
    checkboxEnabled: { type: Boolean, required: false, default: false },
    checkboxLabel: { type: String, required: false, default: "id" },
    total: { type: Number, required: false },
    loading: { type: Boolean, required: false, default: false },
    sortLabel: { type: String, required: false, default: null },
    sortOrder: {
      type: String as () => "asc" | "desc",
      required: false,
      default: "asc",
    },
    emptyTableText: { type: String, required: false, default: "No data found" },
    currentPage: { type: Number, required: false, default: 1 },
  },
  emits: [
    "page-change",
    "on-sort",
    "on-items-select",
    "on-items-per-page-change",
  ],
  components: {
    TableContent,
    TableFooter,
  },
  setup(props, { emit }) {
    const currentPage = ref(props.currentPage);
    const itemsInTable = ref<number>(props.itemsPerPage);

    watch(
      () => itemsInTable.value,
      (val) => {
        currentPage.value = 1;
        emit("on-items-per-page-change", val);
      }
    );

    const pageChange = (page: number) => {
      currentPage.value = page;
      emit("page-change", page);
    };

    const dataToDisplay = computed(() => {
      if (props.data) {
        if (props.data.length <= itemsInTable.value) {
          return props.data;
        } else {
          let sliceFrom = (currentPage.value - 1) * itemsInTable.value;
          return props.data.slice(sliceFrom, sliceFrom + itemsInTable.value);
        }
      }
      return [];
    });

    const totalItems = computed(() => {
      if (props.data) {
        if (props.data.length <= itemsInTable.value) {
          return props.total;
        } else {
          return props.data.length;
        }
      }
      return 0;
    });

    const onSort = (sort: Sort) => {
      emit("on-sort", sort);
    };

    //eslint-disable-next-line
    const onItemSelect = (selectedItems: any) => {
      emit("on-items-select", selectedItems);
    };

    return {
      pageChange,
      dataToDisplay,
      onSort,
      onItemSelect,
      itemsInTable,
      totalItems,
    };
  },
});
</script>

<style lang="scss" scoped>
.dataTables_wrapper {
  background: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(54, 153, 255, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  margin-top: 1.5rem; /* Spazio tra header e tabella */

  .table {
    border-collapse: separate;
    border-spacing: 0;
    margin: 0;
    width: 100%;
  }
}

/* Stili per input di ricerca e filtri */
:deep(.form-control) {
  background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%);
  border: 1px solid #e8f4ff;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(54, 153, 255, 0.1);
  transition: all 0.3s ease;
  padding: 0.75rem 1rem;
  color: #3f4254;
  font-weight: 500;
}

:deep(.form-control:hover) {
  background: linear-gradient(135deg, #e8f4ff 0%, #f1f3ff 100%);
  border-color: #3699ff;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(54, 153, 255, 0.15);
}

:deep(.form-control:focus) {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-color: #3699ff;
  box-shadow: 0 0 0 0.2rem rgba(54, 153, 255, 0.15), 0 4px 12px rgba(54, 153, 255, 0.2);
  transform: translateY(-1px);
  outline: none;
}

:deep(.form-control::placeholder) {
  color: #a1a5b7;
  font-weight: 400;
}

/* Stili per select */
:deep(.form-select) {
  background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%);
  border: 1px solid #e8f4ff;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(54, 153, 255, 0.1);
  transition: all 0.3s ease;
  padding: 0.75rem 1rem;
  color: #3f4254;
  font-weight: 500;
}

:deep(.form-select:hover) {
  background: linear-gradient(135deg, #e8f4ff 0%, #f1f3ff 100%);
  border-color: #3699ff;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(54, 153, 255, 0.15);
}

:deep(.form-select:focus) {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-color: #3699ff;
  box-shadow: 0 0 0 0.2rem rgba(54, 153, 255, 0.15), 0 4px 12px rgba(54, 153, 255, 0.2);
  outline: none;
}

/* Stili per header della tabella */
:deep(thead th) {
  background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%);
  border-bottom: 2px solid #e9ecef;
  padding: 1rem 1.25rem;
  font-weight: 700;
  font-size: 0.8rem;
  color: #495057;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  vertical-align: middle;
  white-space: nowrap;
  text-align: center;
  transition: all 0.3s ease;
}

/* Centra l'ultima colonna (AZIONI) */
:deep(thead th:last-child) {
  text-align: center !important;
}

:deep(thead th:hover) {
  background: linear-gradient(135deg, #e8f4ff 0%, #d9ecff 100%);
}

/* Stili per celle body */
:deep(tbody td) {
  padding: 1rem 1.25rem;
  vertical-align: middle;
  border-bottom: 1px solid #f1f3f4;
  color: #495057;
  font-weight: 500;
  font-size: 1rem;
  text-align: center;
  transition: all 0.25s ease;
}

/* Centra l'ultima colonna (AZIONI) */
:deep(tbody td:last-child) {
  text-align: center !important;
}

/* Hover righe */
:deep(tbody tr) {
  transition: all 0.25s ease;
  background-color: #ffffff;
  border-bottom: 1px solid #f1f3f4;
}

:deep(tbody tr:hover) {
  background: linear-gradient(90deg, #f8f9fa 0%, #ffffff 100%) !important;
  box-shadow: 0 2px 8px rgba(54, 153, 255, 0.08);
  transform: translateX(2px);
}

/* Stili per paginazione */
:deep(.pagination) {
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  justify-content: center;
  align-items: center;
}

:deep(.pagination .page-item) {
  list-style: none;
}

:deep(.pagination .page-link) {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: 1px solid #dee2e6;
  color: #6c757d;
  border-radius: 0.5rem;
  padding: 0.5rem 0.85rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

:deep(.pagination .page-link:hover) {
  background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%);
  border-color: #3699ff;
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(54, 153, 255, 0.25);
}

:deep(.pagination .page-item.active .page-link) {
  background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%);
  border-color: #3699ff;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(54, 153, 255, 0.3);
}

:deep(.pagination .page-item.disabled .page-link) {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Stili per bottoni della tabella */
:deep(.btn) {
  transition: all 0.3s ease;
  border-radius: 0.5rem;
  font-weight: 600;
}

:deep(.btn:hover) {
  transform: translateY(-2px);
}

:deep(.btn-primary) {
  background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%);
  border: none;
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(54, 153, 255, 0.25);
}

:deep(.btn-primary:hover) {
  background: linear-gradient(135deg, #2b7ce6 0%, #0aa39a 100%);
  box-shadow: 0 4px 12px rgba(54, 153, 255, 0.35);
}

/* Animazioni per icone */
:deep(.ki-duotone) {
  transition: all 0.3s ease;
}

:deep(th:hover .ki-duotone) {
  transform: scale(1.1);
}

/* Badge e tag */
:deep(.badge) {
  padding: 0.35rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

:deep(.badge:hover) {
  transform: scale(1.05);
}

/* Checkbox styling */
:deep(.form-check-input) {
  transition: all 0.3s ease;
  border-radius: 0.375rem;
}

:deep(.form-check-input:checked) {
  background-color: #3699ff;
  border-color: #3699ff;
  box-shadow: 0 2px 8px rgba(54, 153, 255, 0.3);
}

:deep(.form-check-input:focus) {
  border-color: #3699ff;
  box-shadow: 0 0 0 0.2rem rgba(54, 153, 255, 0.25);
}

/* Loading state */
:deep(.spinner-border) {
  color: #3699ff;
}

/* Empty state */
:deep(.dataTables_empty) {
  padding: 2rem;
  text-align: center;
  color: #a1a5b7;
  font-weight: 500;
  font-size: 1rem;
}

/* Link styling */
:deep(a) {
  color: #495057 !important;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
}

:deep(a:hover) {
  color: #3699ff !important;
  font-weight: 600;
}

/* Prima colonna link */
:deep(tbody td:nth-child(1)) {
  color: #181c32;
  font-weight: 500;
  font-size: 1rem;
}

:deep(tbody td:nth-child(1) a) {
  color: #181c32 !important;
  text-decoration: none !important;
  font-weight: 700;
  transition: all 0.2s ease;
}

:deep(tbody td:nth-child(1) a:hover) {
  color: #3699ff !important;
  text-decoration: none !important;
  transform: translateY(-1px);
}

/* Bottone copia */
:deep(.btn-copy) {
  opacity: 0;
  transition: all 0.2s ease;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
}

:deep(tbody tr:hover .btn-copy) {
  opacity: 1;
}

:deep(.btn-copy:hover) {
  transform: scale(1.1);
}

/* Avatar styling */
:deep(.symbol-label) {
  border-radius: 0.75rem !important;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

:deep(tbody tr:hover .symbol-label) {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.25);
}

/* Badge stato specifici */
:deep(.badge-light-success) {
  background: linear-gradient(135deg, #e8fff5 0%, #d4f7e8 100%);
  color: #1bc5bd;
  border: 1px solid #1bc5bd;
}

:deep(.badge-light-warning) {
  background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%);
  color: #ffa800;
  border: 1px solid #ffa800;
}

:deep(.badge-light-info) {
  background: linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%);
  color: #3699ff;
  border: 1px solid #3699ff;
}

:deep(.badge-light-primary) {
  background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
  color: #8950fc;
  border: 1px solid #8950fc;
}

:deep(.badge-light-secondary) {
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  color: #7e8299;
  border: 1px solid #7e8299;
}

/* Bottoni azione moderni */
:deep(.action-buttons) {
  gap: 0.75rem !important;
}

:deep(.btn-action) {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.25rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.875rem;
  border: none;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-decoration: none;
}

:deep(.btn-action::before) {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

:deep(.btn-action:hover::before) {
  left: 100%;
}

:deep(.btn-action .btn-icon) {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

:deep(.btn-action .btn-label) {
  font-weight: 700;
  letter-spacing: 0.3px;
  transition: all 0.3s ease;
}

/* Bottone Info/Dettagli */
:deep(.btn-action-info) {
  background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(54, 153, 255, 0.3);
}

:deep(.btn-action-info:hover) {
  background: linear-gradient(135deg, #2b7ce6 0%, #0aa39a 100%);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(54, 153, 255, 0.4);
  color: #ffffff;
}

:deep(.btn-action-info:hover .btn-icon) {
  transform: scale(1.15) rotate(5deg);
}

:deep(.btn-action-info:active) {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(54, 153, 255, 0.3);
}

/* Bottone Elimina */
:deep(.btn-action-danger) {
  background: linear-gradient(135deg, #f64e60 0%, #d63447 100%);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(246, 78, 96, 0.35);
}

:deep(.btn-action-danger:hover) {
  background: linear-gradient(135deg, #d63447 0%, #b92838 100%);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(246, 78, 96, 0.5);
  color: #ffffff;
}

:deep(.btn-action-danger:hover .btn-icon) {
  transform: scale(1.15) rotate(-5deg);
  animation: shake 0.5s ease;
}

:deep(.btn-action-danger:active) {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(246, 78, 96, 0.35);
}

/* Animazione shake */
@keyframes shake {
  0%, 100% { transform: rotate(0deg) scale(1.15); }
  25% { transform: rotate(-5deg) scale(1.15); }
  75% { transform: rotate(5deg) scale(1.15); }
}

/* Spinner loading nei bottoni */
:deep(.spinner-border-sm) {
  width: 1rem;
  height: 1rem;
  border-width: 0.15rem;
}
</style>