<template>
  <div class="kt-table-responsive">
    <div class="kt-table-container">
      <table
        :class="[
          loading && 'kt-table-loading',
          'kt-table-modern align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
        ]"
      >
        <TableHeadRow
          @onSort="onSort"
          @onSelect="selectAll"
          :checkboxEnabledValue="check"
          :checkboxEnabled="checkboxEnabled"
          :sort-label="sortLabel"
          :sort-order="sortOrder"
          :header="header"
        />
        <TableBodyRow
          v-if="data.length !== 0"
          @onSelect="itemsSelect"
          :currentlySelectedItems="selectedItems"
          :data="data"
          :header="header"
          :checkbox-enabled="checkboxEnabled"
          :checkbox-label="checkboxLabel"
        >
          <template v-for="(_, name) in $slots" :key="name" v-slot:[name]="{ row: item }">
            <slot :name="name" :row="item" />
          </template>
        </TableBodyRow>
        <template v-else>
          <tr class="kt-empty-state-row">
            <td colspan="7" class="kt-empty-state-cell">
              <div class="kt-empty-state-content">
                <div class="kt-empty-state-title">No Data Available</div>
                <div class="kt-empty-state-subtitle">{{ emptyTableText }}</div>
              </div>
            </td>
          </tr>
        </template>
        <Loading v-if="loading" />
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import TableHeadRow from "@/components/kt-datatable/table-partials/table-content/table-head/TableHeadRow.vue";
import TableBodyRow from "@/components/kt-datatable/table-partials/table-content/table-body/TableBodyRow.vue";
import Loading from "@/components/kt-datatable/table-partials/Loading.vue";
import type { Sort } from "@/components/kt-datatable/table-partials/models";

export default defineComponent({
  name: "table-body",
  props: {
    header: { type: Array, required: true },
    data: { type: Array, required: true },
    emptyTableText: { type: String, default: "No data found" },
    sortLabel: { type: String, required: false, default: null },
    sortOrder: {
      type: String as () => "asc" | "desc",
      required: false,
      default: "asc",
    },
    checkboxEnabled: { type: Boolean, required: false, default: false },
    checkboxLabel: { type: String, required: false, default: "id" },
    loading: { type: Boolean, required: false, default: false },
  },
  emits: ["on-sort", "on-items-select"],
  components: {
    TableHeadRow,
    TableBodyRow,
    Loading,
  },
  setup(props, { emit }) {
    const selectedItems = ref<Array<unknown>>([]);
    const allSelectedItems = ref<Array<unknown>>([]);
    const check = ref<boolean>(false);

    watch(
      () => props.data,
      () => {
        selectedItems.value = [];
        allSelectedItems.value = [];
        check.value = false;
        // eslint-disable-next-line
        props.data.forEach((item: any) => {
          if (item[props.checkboxLabel]) {
            allSelectedItems.value.push(item[props.checkboxLabel]);
          }
        });
      }
    );

    // eslint-disable-next-line
    const selectAll = (checked: any) => {
      check.value = checked;
      if (checked) {
        selectedItems.value = [
          ...new Set([...selectedItems.value, ...allSelectedItems.value]),
        ];
      } else {
        selectedItems.value = [];
      }
    };

    //eslint-disable-next-line
    const itemsSelect = (value: any) => {
      selectedItems.value = [];
      //eslint-disable-next-line
      value.forEach((item:any) => {
        if (!selectedItems.value.includes(item)) selectedItems.value.push(item);
      });
    };

    const onSort = (sort: Sort) => {
      emit("on-sort", sort);
    };

    watch(
      () => [...selectedItems.value],
      (currentValue) => {
        if (currentValue) {
          emit("on-items-select", currentValue);
        }
      }
    );

    onMounted(() => {
      selectedItems.value = [];
      allSelectedItems.value = [];
      check.value = false;
      // eslint-disable-next-line
      props.data.forEach((item: any) => {
        if (item[props.checkboxLabel]) {
          allSelectedItems.value.push(item[props.checkboxLabel]);
        }
      });
    });

    return {
      onSort,
      selectedItems,
      selectAll,
      itemsSelect,
      check,
    };
  },
});
</script>

<style lang="scss" scoped>
.kt-table-responsive {
  position: relative;
  overflow-x: auto !important;
  overflow-y: visible;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: 100%;
  display: block;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c8cd;
    border-radius: 4px;
    transition: background 0.2s ease;

    &:hover {
      background: #a8b2ba;
    }
  }
}

.kt-table-container {
  min-height: 200px;
  background: #ffffff;
  border-radius: 0.5rem;
  /* Allow container to expand beyond parent width when table is wider */
  width: auto;
  min-width: 100%;
}

.kt-table-modern {
  margin: 0;
  border-collapse: separate;
  border-spacing: 0;
  width: auto !important;
  min-width: 100%;
  /* Use fixed layout to respect column widths, or auto to let content determine */
  table-layout: auto;
  display: table;

  thead {
    th {
      background: #f8f9fa;
      border-bottom: 1px solid #e9ecef;
      padding: 0.75rem 1rem;
      font-weight: 600;
      font-size: 0.875rem;
      color: #495057;
      text-align: left;
      vertical-align: middle;
      white-space: nowrap;
    }
  }

  tbody {
    tr {
      transition: background-color 0.15s ease;

      &:hover {
        background: #f8f9fa;
      }

      td {
        padding: 0.75rem 1rem;
        border-bottom: 1px solid #f1f3f4;
        color: #495057;
        font-size: 0.875rem;
        vertical-align: middle;
        /* Ensure cells match header width */
        white-space: nowrap;
      }
    }
  }

  .kt-empty-state-row {
    .kt-empty-state-cell {
      padding: 2rem !important;
      text-align: center;
      color: #6c757d;

      .kt-empty-state-content {
        .kt-empty-state-title {
          font-size: 1rem;
          font-weight: 500;
          margin-bottom: 0.25rem;
          color: #495057;
        }

        .kt-empty-state-subtitle {
          font-size: 0.875rem;
          opacity: 0.8;
        }
      }
    }
  }
}

.kt-table-loading {
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    z-index: 100;
  }
}

/* Dark mode support for scrollbar */
@media (prefers-color-scheme: dark) {
  .kt-table-responsive {
    &::-webkit-scrollbar-track {
      background: #2C2C2C;
    }

    &::-webkit-scrollbar-thumb {
      background: #666666;

      &:hover {
        background: #AAAAAA;
      }
    }
  }
}

@media (max-width: 768px) {
  .kt-table-responsive {
    .kt-table-modern {
      font-size: 0.8rem;

      th, td {
        padding: 0.5rem !important;
      }
    }
  }
}
</style>
