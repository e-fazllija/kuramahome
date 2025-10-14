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

<style lang="scss" scoped>
.kt-loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  border-radius: 12px;
  animation: kt-fade-in 0.3s ease;

  .kt-loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 2rem;
    background: var(--bs-body-bg);
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--bs-border-color);
  }

  .kt-loading-spinner {
    position: relative;
    width: 48px;
    height: 48px;

    .kt-spinner-ring {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 3px solid transparent;
      border-top: 3px solid var(--bs-primary);
      border-radius: 50%;
      animation: kt-spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;

      &:nth-child(1) {
        animation-delay: -0.45s;
      }

      &:nth-child(2) {
        animation-delay: -0.3s;
      }

      &:nth-child(3) {
        animation-delay: -0.15s;
      }
    }
  }

  .kt-loading-text {
    color: var(--bs-gray-600);
    font-weight: 400;

    .kt-loading-label {
      font-size: 0.8rem;
    }
  }
}

// Professional real estate loading state
.kt-real-estate-loading {
  .kt-loading-content {
    background: var(--bs-body-bg);
    border: 1px solid var(--bs-border-color);
  }
}

// Animations
@keyframes kt-fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes kt-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}


// Dark mode support
@media (prefers-color-scheme: dark) {
  .kt-loading-overlay {
    background: rgba(0, 0, 0, 0.8);

    .kt-loading-content {
      background: var(--bs-gray-800);
      border-color: var(--bs-gray-600);

      .kt-loading-text {
        color: var(--bs-gray-300);
      }
    }
  }
}
</style>
