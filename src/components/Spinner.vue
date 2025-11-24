<template>
  <div 
    v-if="centered" 
    class="kt-spinner-container"
    :class="{ 'kt-spinner-centered': centered }"
  >
    <div class="kt-spinner-wrapper">
      <div 
        class="kt-spinner" 
        :class="spinnerClasses"
        role="status"
        aria-label="Loading"
      >
        <span class="kt-spinner-visually-hidden">Loading...</span>
      </div>
      <span v-if="text" class="kt-spinner-text">{{ text }}</span>
    </div>
  </div>
  <div 
    v-else
    class="kt-spinner" 
    :class="spinnerClasses"
    v-bind="$attrs"
    role="status"
    :aria-label="text || 'Loading'"
  >
    <span class="kt-spinner-visually-hidden">{{ text || 'Loading...' }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "KTSpinner",
  inheritAttrs: false,
  props: {
    size: {
      type: String as () => "sm" | "md" | "lg",
      default: "md",
      validator: (value: string) => ["sm", "md", "lg"].includes(value),
    },
    centered: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: "",
    },
    inline: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const spinnerClasses = computed(() => {
      return {
        "kt-spinner-sm": props.size === "sm",
        "kt-spinner-md": props.size === "md",
        "kt-spinner-lg": props.size === "lg",
        "kt-spinner-inline": props.inline && !props.centered,
      };
    });

    return {
      spinnerClasses,
    };
  },
});
</script>

<style scoped>
/* Stili moveti in spinner.css */
</style>

