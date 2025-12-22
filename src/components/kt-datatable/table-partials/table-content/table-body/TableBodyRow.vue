<template>
  <tbody>
    <template v-for="(row, i) in data" :key="i">
      <tr>
        <td v-if="checkboxEnabled" class="checkbox-cell py-3 px-3">
          <div
            class="form-check form-check-sm form-check-custom form-check-solid checkbox-wrapper"
          >
            <input
              class="form-check-input checkbox-input"
              type="checkbox"
              :value="row[checkboxLabel]"
              v-model="selectedItems"
              @change="onChange"
            />
          </div>
        </td>
        <template v-for="(properties, j) in header" :key="j">
          <td :class="{ 
            'text-end': j === header.length - 1 && properties.textAlign !== 'center',
            'text-center': properties.textAlign === 'center',
            'py-3': true,
            'px-3': true,
          }">
            <slot :name="`${properties.columnLabel}`" :row="row">
              {{ row }}
            </slot>
          </td>
        </template>
      </tr>
    </template>
  </tbody>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "table-body-row",
  components: {},
  props: {
    header: { type: Array as () => Array<any>, required: true },
    data: { type: Array as () => Array<any>, required: true },
    currentlySelectedItems: { type: Array, required: false, default: () => [] },
    checkboxEnabled: { type: Boolean, required: false, default: false },
    checkboxLabel: {
      type: String as () => string,
      required: false,
      default: "id",
    },
  },
  emits: ["on-select"],
  setup(props, { emit }) {
    const selectedItems = ref<Array<any>>([]);

    watch(
      () => [...props.currentlySelectedItems],
      (currentValue) => {
        if (props.currentlySelectedItems.length !== 0) {
          selectedItems.value = [
            ...new Set([...selectedItems.value, ...currentValue]),
          ];
        } else {
          selectedItems.value = [];
        }
      }
    );

    const onChange = () => {
      emit("on-select", selectedItems.value);
    };

    return {
      selectedItems,
      onChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.checkbox-cell {
  width: 30px;
  min-width: 30px;
  max-width: 30px;
  padding: 0.875rem 0.5rem !important;
  text-align: center;
  vertical-align: middle;
  display: flex;
  align-items: center;
  justify-content: center;

  .checkbox-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
  }

  .checkbox-input {
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

// Ensure proper alignment with header checkbox
tbody {
  tr {
    td.checkbox-cell {
      position: relative;

      .form-check {
        position: relative;
        width: 16px;
        height: 16px;
        margin: 0 auto;
      }
    }
  }
}

// Responsive adjustments
@media (max-width: 768px) {
  .checkbox-cell {
    width: 40px;
    min-width: 40px;
    max-width: 40px;
    padding: 0.5rem 0.25rem !important;
  }
}
</style>
