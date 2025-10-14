<template>
  <!--begin::Logo-->
  <div class="app-sidebar-logo px-15" id="kt_app_sidebar_logo">
    <!--begin::Logo image-->
    <router-link to="/" class="logo-link d-flex align-items-center">
      <div class="logo-container">
        <!-- Logo per dark theme -->
        <img
          v-if="
            (layout === 'dark-sidebar' ||
            (themeMode === 'dark' && layout === 'light-sidebar')) &&
            !isSidebarMinimized
          "
          alt="ThinkHome Logo"
          :src="getAssetPath('media/logos/TH-6.jpg')"
          class="logo-image logo-default"
        />
        <!-- Logo per light theme -->
        <img
          v-if="themeMode === 'light' && layout === 'light-sidebar' && !isSidebarMinimized"
          alt="ThinkHome Logo"
          :src="getAssetPath('media/logos/TH-4.jpg')"
          class="logo-image logo-default"
        />
        <!-- Logo minimizzato -->
        <img
          v-if="isSidebarMinimized"
          alt="ThinkHome Logo"
          :src="getAssetPath('media/logos/default-small.svg')"
          class="logo-image logo-minimize"
        />

        <!-- Overlay per effetti hover -->
        <div class="logo-overlay"></div>
      </div>
    </router-link>
    <!--end::Logo image-->
  </div>
  <!--end::Logo-->
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getAssetPath } from "@/core/helpers/assets";
import { layout, themeMode } from "@/core/helpers/config";

interface IProps {
  sidebarRef: HTMLElement | null;
}

const props = defineProps<IProps>();

// Computed property per controllare se la sidebar è minimizzata
const isSidebarMinimized = computed(() => {
  return document.body.getAttribute('data-kt-app-sidebar-minimize') === 'on';
});
</script>

<style scoped lang="scss">
.logo-link {
  text-decoration: none;
  transition: transform 0.3s ease, filter 0.3s ease;

  &:hover {
    transform: scale(1.02);

    .logo-image {
      filter: brightness(1.05) contrast(1.05);
    }
  }
}

.logo-container {
  position: relative;
  overflow: hidden;
}

.logo-image {
  max-width: 100%;
  height: auto;
  transition: filter 0.3s ease;

  &.logo-default {
    width: 150px;
    height: 50px;
    object-fit: contain;
  }

  &.logo-minimize {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }
}

.logo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.logo-link:hover .logo-overlay {
  opacity: 1;
}

// Tema scuro
.app-sidebar-logo[data-bs-theme="dark"] {
  .logo-image {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
}

// Miglioramento dell'accessibilità
.logo-link {
  &:focus-visible {
    outline: 2px solid #007bff;
    outline-offset: 2px;
    border-radius: 4px;
  }
}

// Responsive design
@media (max-width: 768px) {
  .app-sidebar-logo {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }

  .logo-image.logo-default {
    width: 120px;
    height: 40px;
  }
}
</style>






