<template>
  <!--begin::App-->
  <div class="d-flex flex-column flex-root app-root" id="kt_app_root">
    <!--begin::Logo Fixed-->
    <div class="fixed-logo">
      <router-link to="/" class="logo-container">
        <img
          alt="Logo"
          :src="getAssetPath('media/logos/TH-40.png')"
          class="logo-image"
        />
      </router-link>
    </div>
    <!--end::Logo Fixed-->
    <!--begin::Page-->
    <div class="app-page flex-column flex-column-fluid" id="kt_app_page">
      <KTHeader />
      <!--begin::Wrapper-->
      <div class="app-wrapper flex-column flex-row-fluid no-sidebar" id="kt_app_wrapper">
        <!-- <KTSidebar /> -->
        <!--begin::Main-->
        <div class="app-main flex-column flex-row-fluid no-sidebar-main" id="kt_app_main">
          <!--begin::Content wrapper-->
          <div class="d-flex flex-column flex-column-fluid">
            <KTToolbar />
            <div id="kt_app_content" class="app-content flex-column-fluid">
              <KTContent></KTContent>
            </div>
          </div>
          <!--end::Content wrapper-->
          <KTFooter />
        </div>
        <!--end:::Main-->
      </div>
      <!--end::Wrapper-->
    </div>
    <!--end::Page-->
  </div>
  <!--end::App-->

  <KTDrawers />
  <KTScrollTop />
  <KTModals />
  <KTCustomize />
</template>

<script lang="ts">
import {
  defineComponent,
  nextTick,
  onBeforeMount,
  onMounted,
  watch,
} from "vue";
import KTHeader from "@/layouts/main-layout/header/Header.vue";
import KTSidebar from "@/layouts/main-layout/sidebar/Sidebar.vue";
import KTContent from "@/layouts/main-layout/content/Content.vue";
import KTToolbar from "@/layouts/main-layout/toolbar/Toolbar.vue";
import KTFooter from "@/layouts/main-layout/footer/Footer.vue";
import KTDrawers from "@/layouts/main-layout/drawers/Drawers.vue";
import KTModals from "@/layouts/main-layout/modals/Modals.vue";
import KTScrollTop from "@/layouts/main-layout/extras/ScrollTop.vue";
import KTCustomize from "@/layouts/main-layout/extras/Customize.vue";
import { useRoute } from "vue-router";
import { reinitializeComponents } from "@/core/plugins/keenthemes";
import LayoutService from "@/core/services/LayoutService";
import { getAssetPath } from "@/core/helpers/assets";
import { themeMode } from "@/core/helpers/config";

export default defineComponent({
  name: "default-layout",
  components: {
    KTHeader,
    KTSidebar,
    KTContent,
    KTToolbar,
    KTFooter,
    KTDrawers,
    KTScrollTop,
    KTModals,
    KTCustomize,
  },
  setup() {
    const route = useRoute();

    onBeforeMount(() => {
      LayoutService.init();
    });

    onMounted(() => {
      nextTick(() => {
        reinitializeComponents();
      });
    });

    watch(
      () => route.path,
      () => {
        nextTick(() => {
          reinitializeComponents();
        });
      }
    );

    return {
      themeMode,
      getAssetPath,
    };
  },
});
</script>

<style scoped>
/* Remove sidebar spacing when sidebar is hidden */
.no-sidebar {
  margin-left: 0 !important;
}

.no-sidebar-main {
  padding-left: 0 !important;
  margin-left: 0 !important;
}

/* Make content full width */
:deep(.app-content) {
  max-width: 100% !important;
}

/* Logo fisso sulla sinistra, aderisce all'header */
.fixed-logo {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background: transparent;
  pointer-events: none;
}

.fixed-logo a {
  pointer-events: auto;
}

.logo-container {
  display: block;
  width: 245px;
  height: 80px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.logo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Dark mode per il logo */
[data-bs-theme="dark"] .logo-container {
  background: rgba(30, 30, 45, 0.25);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* Allunga il layout a tutta la pagina */
.app-root {
  height: 100vh !important;
  min-height: 100vh !important;
}

.app-page {
  height: 100vh !important;
  min-height: 100vh !important;
}

.app-wrapper {
  height: calc(100vh - 80px) !important;
  min-height: calc(100vh - 80px) !important;
  margin-top: 80px !important;
}

.app-main {
  height: 100% !important;
  min-height: 100% !important;
}

/* Assicura che il contenuto occupi tutto lo spazio disponibile */
:deep(.app-content) {
  height: 100% !important;
  min-height: calc(100vh - 160px) !important;
}

/* Rimuovi margini e padding che potrebbero limitare l'altezza */
:deep(.app-container) {
  height: 100% !important;
}

:deep(#kt_app_content_container) {
  height: 100% !important;
  min-height: 100% !important;
}
</style>
