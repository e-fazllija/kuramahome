<template>
  <div class="kt-loading-overlay">
    <div class="kt-loading-content">
      <div class="kt-loading-spinner">
        <div class="kt-spinner-ring"></div>
        <div class="kt-spinner-ring"></div>
        <div class="kt-spinner-ring"></div>
        <div class="kt-spinner-ring"></div>
      </div>
      <div class="kt-loading-text">
        <span class="kt-loading-label">Loading data...</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "kt-loading",
  components: {},
});
</script>

<!-- CSS moved to global file: datatable.css -->
