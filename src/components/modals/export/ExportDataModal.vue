<template>
  <div class="modal fade" :id="modalId" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <form class="modal-content export-modal card-palette modal-shell" @submit.prevent="handleSubmit">
        <div class="modal-header card-palette-header modal-header-accent">
          <div>
            <h3 class="modal-title fw-bold mb-1 text-palette-primary">{{ title }}</h3>
            <p class="text-palette-secondary mb-0" v-if="description">{{ description }}</p>
          </div>
          <!--begin::Close-->
          <div
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>

        <div class="modal-body">
          <div class="row g-4">
            <div class="col-12 col-md-4">
              <label class="form-label d-flex align-items-center gap-2">
                Da data
                <span
                  class="text-primary"
                  role="img"
                  data-bs-toggle="tooltip"
                  :title="dateTooltip"
                >
                  <i class="ki-duotone ki-information fs-6"></i>
                </span>
              </label>
              <input
                type="date"
                class="form-control form-control-lg"
                :value="state.fromDate ?? ''"
                @input="updateField('fromDate', ($event.target as HTMLInputElement).value || null)"
              />
            </div>

            <div class="col-12 col-md-4">
              <label class="form-label">A data</label>
              <input
                type="date"
                class="form-control form-control-lg"
                :value="state.toDate ?? ''"
                @input="updateField('toDate', ($event.target as HTMLInputElement).value || null)"
              />
            </div>

            <div class="col-12 col-md-4">
              <label class="form-label">Formato file</label>
              <select
                class="form-select form-select-lg"
                :value="state.format || 'excel'"
                @change="updateField('format', ($event.target as HTMLSelectElement).value)"
              >
                <option value="excel">Excel (.xlsx)</option>
                <option value="csv">CSV (.csv)</option>
              </select>
            </div>

            <div
              v-for="field in fields"
              :key="field.key || `${field.minKey}-${field.maxKey}`"
              class="col-12"
              :class="field.type === 'range' ? 'col-md-6' : 'col-md-4'"
            >
              <label class="form-label d-flex align-items-center gap-2">
                <span>{{ field.label }}</span>
                <span
                  v-if="field.tooltip"
                  class="text-primary"
                  data-bs-toggle="tooltip"
                  :title="field.tooltip"
                >
                  <i class="ki-duotone ki-information fs-6"></i>
                </span>
              </label>

              <template v-if="field.type === 'text' && field.key">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  :placeholder="field.placeholder"
                  :value="state[field.key] ?? ''"
                  @input="updateField(field.key, ($event.target as HTMLInputElement).value)"
                />
              </template>

              <template v-else-if="field.type === 'number' && field.key">
                <input
                  type="number"
                  class="form-control form-control-lg"
                  :placeholder="field.placeholder"
                  :value="state[field.key] ?? ''"
                  @input="updateNumberField(field.key, ($event.target as HTMLInputElement).value)"
                />
              </template>

              <template v-else-if="field.type === 'checkbox' && field.key">
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :id="`${modalId}-${field.key}`"
                    :checked="!!state[field.key]"
                    @change="updateField(field.key, ($event.target as HTMLInputElement).checked)"
                  />
                  <label class="form-check-label" :for="`${modalId}-${field.key}`">
                    {{ field.placeholder || "Attiva" }}
                  </label>
                </div>
              </template>

              <template v-else-if="field.type === 'select' && field.key">
                <select
                  class="form-select form-select-lg"
                  :value="state[field.key] ?? ''"
                  @change="updateField(field.key, ($event.target as HTMLSelectElement).value || '')"
                >
                  <option value="">{{ field.placeholder || "Tutti" }}</option>
                  <option
                    v-for="option in field.options || []"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </template>

              <template v-else-if="field.type === 'multiselect' && field.key">
                <Multiselect
                  :model-value="state[field.key] ?? []"
                  :options="field.options || []"
                  mode="tags"
                  :placeholder="field.placeholder || 'Seleziona'"
                  @update:model-value="value => updateField(field.key!, value)"
                />
              </template>

              <template v-else-if="field.type === 'range' && field.minKey && field.maxKey">
                <div class="row g-2">
                  <div class="col">
                    <input
                      type="number"
                      class="form-control form-control-lg"
                      :placeholder="field.minPlaceholder || 'Da'"
                      :value="state[field.minKey] ?? ''"
                      @input="updateNumberField(field.minKey!, ($event.target as HTMLInputElement).value)"
                    />
                  </div>
                  <div class="col">
                    <input
                      type="number"
                      class="form-control form-control-lg"
                      :placeholder="field.maxPlaceholder || 'A'"
                      :value="state[field.maxKey] ?? ''"
                      @input="updateNumberField(field.maxKey!, ($event.target as HTMLInputElement).value)"
                    />
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">
            Chiudi
          </button>
          <button type="submit" class="btn btn-primary" :disabled="loading">
            <span v-if="!loading">
              Esporta {{ entityLabel }}
              <i class="ki-duotone ki-arrow-right fs-4 ms-2"></i>
            </span>
            <span v-else class="d-flex align-items-center gap-2">
              <KTSpinner size="sm" :inline="true" />
              Preparazione...
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import type { PropType } from "vue";
import Multiselect from "@vueform/multiselect";
import { Tooltip } from "bootstrap";
import KTSpinner from "@/components/Spinner.vue";
import type { ExportFieldDefinition } from "@/types/export";
import "@/assets/css/export-modal.css";

export default defineComponent({
  name: "ExportDataModal",
  components: {
    Multiselect,
    KTSpinner,
  },
  props: {
    modelValue: {
      type: Object as PropType<Record<string, any>>,
      required: true,
    },
    modalId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: "Esporta dati",
    },
    description: {
      type: String,
      default: "Seleziona i filtri desiderati prima di esportare i dati.",
    },
    entityLabel: {
      type: String,
      default: "record",
    },
    fields: {
      type: Array as PropType<ExportFieldDefinition[]>,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    dateTooltip: {
      type: String,
      default: "Filtra per data di creazione dal giorno selezionato.",
    },
  },
  emits: ["update:modelValue", "export"],
  setup(props, { emit }) {
    const state = computed(() => props.modelValue ?? {});

    const ensureFormat = () => {
      if (!state.value.format) {
        emit("update:modelValue", {
          ...state.value,
          format: "excel",
        });
      }
    };

    const updateField = (key: string, value: any) => {
      emit("update:modelValue", {
        ...state.value,
        [key]: value,
      });
    };

    const updateNumberField = (key: string, rawValue: string) => {
      if (!key) return;
      const parsed = rawValue === "" ? null : Number(rawValue);
      emit("update:modelValue", {
        ...state.value,
        [key]: parsed,
      });
    };

    const handleSubmit = () => {
      emit("export", { ...state.value });
    };

    onMounted(() => {
      ensureFormat();
      const element = document.getElementById(props.modalId);
      if (!element) {
        return;
      }

      const tooltipTriggerList = Array.from(
        element.querySelectorAll("[data-bs-toggle='tooltip']")
      ) as HTMLElement[];
      tooltipTriggerList.forEach((tooltipTriggerEl) => {
        new Tooltip(tooltipTriggerEl);
      });
    });

    return {
      state,
      updateField,
      updateNumberField,
      handleSubmit,
    };
  },
});
</script>

