<template>
  <div class="kt-table-footer">
    <div class="kt-footer-content">
      <!-- Items per page selector -->
      <div class="kt-items-per-page" v-if="itemsPerPageDropdownEnabled">
        <label class="kt-items-label">Show:</label>
        <TableItemsPerPageSelect
          v-model:itemsPerPage="itemsCountInTable"
          :items-per-page-dropdown-enabled="itemsPerPageDropdownEnabled"
        />
        <span class="kt-items-text">entries</span>
      </div>

      <!-- Pagination info -->
      <div class="kt-pagination-info">
        <span class="kt-info-text">
          Showing {{ getShowingRange() }} of {{ count }} entries
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

<style lang="scss" scoped>
.kt-table-footer {
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
  padding: 1rem 1.5rem;
  border-radius: 0 0 0.5rem 0.5rem;

  .kt-footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;

    .kt-items-per-page {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .kt-items-label {
        font-size: 0.875rem;
        font-weight: 500;
        color: #495057;
        margin: 0;
      }

      .kt-items-text {
        font-size: 0.875rem;
        color: #6c757d;
        margin-left: 0.5rem;
      }
    }

    .kt-pagination-info {
      .kt-info-text {
        font-size: 0.875rem;
        color: #495057;
        font-weight: 500;
        background: #ffffff;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        border: 1px solid #e9ecef;
      }
    }

    .kt-pagination-wrapper {
      display: flex;
      align-items: center;
    }
  }
}

:deep(.pagination) {
  margin: 0;
  gap: 0.25rem;

  .page-item {
    .page-link {
      border: 1px solid #e9ecef;
      border-radius: 0.25rem;
      padding: 0.5rem 0.75rem;
      color: #495057;
      font-weight: 500;
      transition: all 0.15s ease;
      min-width: 40px;
      text-align: center;
      background: #ffffff;

      &:hover {
        background: #f8f9fa;
        color: #007bff;
        border-color: #dee2e6;
      }

      &:focus {
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
      }

      i {
        font-size: 0.75rem;
      }
    }

    &.active .page-link {
      background: #007bff;
      color: white;
      border-color: #007bff;
    }

    &.disabled .page-link {
      color: #6c757d;
      background: #f8f9fa;
      border-color: #e9ecef;
    }
  }
}

:deep(.form-select) {
  border: 1px solid #e9ecef;
  border-radius: 0.25rem;
  padding: 0.5rem 2rem 0.5rem 1rem;
  font-size: 0.875rem;
  background-position: right 0.75rem center;
  transition: all 0.15s ease;
  background-color: #ffffff;
  color: #495057;

  &:hover {
    border-color: #ced4da;
  }

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  option {
    padding: 0.25rem 0.5rem;
  }
}

@media (max-width: 768px) {
  .kt-table-footer {
    padding: 1rem;
    text-align: center;

    .kt-footer-content {
      flex-direction: column;
      gap: 1rem;

      .kt-items-per-page {
        order: 2;
      }

      .kt-pagination-info {
        order: 1;
      }

      .kt-pagination-wrapper {
        order: 3;
        width: 100%;
        justify-content: center;
      }
    }
  }

  :deep(.pagination) {
    flex-wrap: wrap;
    justify-content: center;

    .page-item {
      margin: 0.125rem;
    }
  }
}
</style>
