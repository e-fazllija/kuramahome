<template>
  <div class="kt-table-footer">
    <div class="kt-footer-content">
      <!-- Items per page selector - hidden on mobile -->
      <div class="kt-items-per-page d-none d-md-flex" v-if="itemsPerPageDropdownEnabled">
        <label class="kt-items-label">Mostra:</label>
        <TableItemsPerPageSelect
          v-model:itemsPerPage="itemsCountInTable"
          :items-per-page-dropdown-enabled="itemsPerPageDropdownEnabled"
        />
      </div>

      <!-- Pagination info -->
      <div class="kt-pagination-info">
        <span class="kt-info-text">
          {{ getShowingRange() }} di {{ count }}
        </span>
      </div>

      <!-- Enhanced Pagination -->
      <div class="kt-pagination-wrapper" v-if="pageCount > 1">
        <TablePagination
          :total-pages="pageCount"
          :total="count"
          :per-page="itemsPerPage"
          :current-page="page"
          @page-change="pageChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TableItemsPerPageSelect from "@/components/kt-datatable/table-partials/table-content/table-footer/TableItemsPerPageSelect.vue";
import TablePagination from "./table-content/table-footer/TablePagination.vue";
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  watch,
  type WritableComputedRef,
} from "vue";

export default defineComponent({
  name: "table-footer",
  components: {
    TableItemsPerPageSelect,
    TablePagination,
  },
  props: {
    count: { type: Number, required: false, default: 5 },
    itemsPerPage: { type: Number, default: 5 },
    itemsPerPageDropdownEnabled: {
      type: Boolean,
      required: false,
      default: true,
    },
    currentPage: { type: Number, required: false, default: 1 },
  },
  emits: ["update:itemsPerPage", "page-change"],
  setup(props, { emit }) {
    const page = ref(props.currentPage);
    const inputItemsPerPage = ref(props.itemsPerPage);

    watch(
      () => props.count,
      () => {
        page.value = 1;
      }
    );

    watch(
      () => inputItemsPerPage.value,
      () => {
        page.value = 1;
      }
    );

    onMounted(() => {
      inputItemsPerPage.value = props.itemsPerPage;
    });

    const pageChange = (newPage: number) => {
      page.value = newPage;
      emit("page-change", page.value);
    };

    const itemsCountInTable: WritableComputedRef<number> = computed({
      get(): number {
        return props.itemsPerPage;
      },
      set(value: number): void {
        inputItemsPerPage.value = value;
        emit("update:itemsPerPage", value);
      },
    });

    const pageCount = computed(() => {
      return Math.ceil(props.count / itemsCountInTable.value);
    });

    const getShowingRange = () => {
      const start = (page.value - 1) * itemsCountInTable.value + 1;
      const end = Math.min(page.value * itemsCountInTable.value, props.count);
      return `${start}-${end}`;
    };

    return {
      pageChange,
      pageCount,
      page,
      itemsCountInTable,
      inputItemsPerPage,
      getShowingRange,
    };
  },
});
</script>

<!-- CSS moved to global file: datatable.css -->
