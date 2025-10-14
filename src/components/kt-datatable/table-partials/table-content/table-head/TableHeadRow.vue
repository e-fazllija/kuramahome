<template>
  <thead>
    <tr class="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
      <th v-if="checkboxEnabled" class="header-checkbox-cell">
        <div
          class="form-check form-check-sm form-check-custom form-check-solid header-checkbox-wrapper"
        >
          <input
            class="form-check-input header-checkbox-input"
            type="checkbox"
            v-model="checked"
            @change="selectAll()"
          />
        </div>
      </th>
      <template v-for="(column, i) in header" :key="i">
        <th
          :class="{
            'text-end': i === header.length - 1,
            'text-center': column.textAlign === 'center',
          }"
          @click="onSort(column.columnLabel, column.sortEnabled)"
          :style="{
            minWidth: column.columnWidth ? `${column.columnWidth}px` : '0',
            width: 'auto',
            cursor: column.sortEnabled ? 'pointer' : 'auto',
          }"
        >
          {{ column.columnName }}
          <span
            v-if="
              columnLabelAndOrder.label === column.columnLabel &&
              column.sortEnabled
            "
            v-html="sortArrow"
          ></span>
        </th>
      </template>
    </tr>
  </thead>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import type { Sort } from "@/components/kt-datatable/table-partials/models";

export default defineComponent({
  name: "table-head-row",
  props: {
    checkboxEnabledValue: { type: Boolean, required: false, default: false },
    checkboxEnabled: { type: Boolean, required: false, default: false },
    sortLabel: { type: String, required: false, default: null },
    sortOrder: {
      type: String as () => "asc" | "desc",
      required: false,
      default: "asc",
    },
    header: { type: Array as () => Array<any>, required: true },
  },
  emits: ["on-select", "on-sort"],
  components: {},
  setup(props, { emit }) {
    const checked = ref<boolean>(false);
    const columnLabelAndOrder = ref<Sort>({
      label: props.sortLabel,
      order: props.sortOrder,
    });

    watch(
      () => props.checkboxEnabledValue,
      (currentValue) => {
        checked.value = currentValue;
      }
    );

    const selectAll = () => {
      emit("on-select", checked.value);
    };

    const onSort = (label: string, sortEnabled: boolean) => {
      if (sortEnabled) {
        if (columnLabelAndOrder.value.label === label) {
          if (columnLabelAndOrder.value.order === "asc") {
            columnLabelAndOrder.value.order = "desc";
          } else {
            if (columnLabelAndOrder.value.order === "desc") {
              columnLabelAndOrder.value.order = "asc";
            }
          }
        } else {
          columnLabelAndOrder.value.order = "asc";
          columnLabelAndOrder.value.label = label;
        }
        emit("on-sort", columnLabelAndOrder.value);
      }
    };

    const sortArrow = computed(() => {
      return columnLabelAndOrder.value.order === "asc"
        ? '<i class="ki-outline ki-arrow-up fs-8"></i>'
        : '<i class="ki-outline ki-arrow-down fs-8"></i>';
    });

    return {
      onSort,
      selectAll,
      checked,
      sortArrow,
      columnLabelAndOrder,
    };
  },
});
</script>

<style lang="scss" scoped>
thead {
  position: relative;

  tr {
    background: linear-gradient(135deg, var(--bs-gray-50) 0%, var(--bs-gray-100) 100%);

    th {
      position: relative;
      transition: all 0.2s ease;
      cursor: pointer;
      user-select: none;

      &:hover {
        background: var(--bs-gray-200);
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      // Sortable columns
      &[style*="cursor: pointer"] {
        position: relative;

        &:after {
          content: "";
          position: absolute;
          right: 0.5rem;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 4px solid var(--bs-gray-400);
          opacity: 0.3;
          transition: all 0.2s ease;
        }

        &.sort-asc:after {
          border-bottom: 4px solid var(--bs-primary);
          border-top: none;
          opacity: 1;
          transform: translateY(-50%) rotate(0deg);
        }

        &.sort-desc:after {
          border-top: 4px solid var(--bs-primary);
          border-bottom: none;
          opacity: 1;
          transform: translateY(-50%) rotate(0deg);
        }
      }

      // Checkbox column
      &.header-checkbox-cell {
        width: 30px;
        min-width: 30px;
        max-width: 30px;
        text-align: center;
        vertical-align: middle;
        padding: 0.875rem 0.5rem !important;

        .header-checkbox-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0;
        }

        .header-checkbox-input {
          margin: 0;
          transform: scale(1.1);
          border-radius: 4px;
          border: 1px solid var(--bs-gray-300);
          width: 16px;
          height: 16px;

          &:checked {
            background-color: var(--bs-primary);
            border-color: var(--bs-primary);
          }

          &:focus {
            box-shadow: 0 0 0 2px rgba(54, 153, 255, 0.1);
          }
        }
      }

      // Professional styling for other checkboxes
      .form-check-input:not(.header-checkbox-input) {
        transform: scale(1.2);
        transition: all 0.2s ease;

        &:hover {
          transform: scale(1.3);
          box-shadow: 0 0 0 2px rgba(54, 153, 255, 0.2);
        }
      }
    }
  }
}

// Enhanced checkbox styling for header
.form-check-input {
  border-radius: 6px !important;
  border: 2px solid var(--bs-gray-300);

  &:checked {
    background-color: var(--bs-primary) !important;
    border-color: var(--bs-primary) !important;
    box-shadow: 0 0 0 3px rgba(54, 153, 255, 0.1);
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba(54, 153, 255, 0.1);
  }
}

// Column hover effects
th {
  .column-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .sort-indicator {
      margin-left: 0.5rem;
      opacity: 0.5;
      transition: all 0.2s ease;

      &.active {
        opacity: 1;
        color: var(--bs-primary);
        transform: scale(1.1);
      }
    }
  }

  &:hover .sort-indicator {
    opacity: 0.8;
  }
}

// Real estate specific header styling
.kt-real-estate-header {
  th {
    background: var(--bs-gray-50);
    font-weight: 600;
  }
}
</style>
