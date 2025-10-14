<template>
  <!--begin::Header-->
  <div v-if="headerDisplay" id="kt_app_header" class="app-header header-transparent">
    <!--begin::Header container-->
    <div
      class="app-container d-flex align-items-stretch justify-content-between"
      :class="{
        'container-fluid': headerWidthFluid,
        'container-xxl': !headerWidthFluid,
      }"
    >
      <template v-if="layout !== 'light-header' && layout !== 'dark-header' && layout !== 'light-sidebar' && layout !== 'dark-sidebar'">
        <!--begin::sidebar mobile toggle-->
        <div
          class="d-flex align-items-center d-lg-none ms-n3 me-1 me-md-2"
          v-tooltip
          title="Show sidebar menu"
        >
          <div
            class="btn btn-icon btn-active-color-primary w-35px h-35px"
            id="kt_app_sidebar_mobile_toggle"
          >
            <KTIcon icon-name="abstract-14" icon-class="fs-2 fs-md-1" />
          </div>
        </div>
        <!--end::sidebar mobile toggle-->
        <!--begin::Mobile logo-->
        <div class="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
          <router-link to="/" class="d-lg-none">
            <img
              alt="Logo"
              :src="getAssetPath('media/logos/default-small.svg')"
              class="h-30px"
            />
          </router-link>
        </div>
        <!--end::Mobile logo-->
      </template>
      <!--begin::Header wrapper-->
      <div
        class="d-flex align-items-stretch flex-lg-grow-1"
        id="kt_app_header_wrapper"
      >
        <KTHeaderMenu />
        <div class="d-flex align-items-center">
          <KTHeaderNavbar />
        </div>
      </div>
      <!--end::Header wrapper-->
    </div>
    <!--end::Header container-->
  </div>
  <!--end::Header-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, computed } from "vue";
import KTHeaderMenu from "@/layouts/main-layout/header/menu/Menu.vue";
import KTHeaderNavbar from "@/layouts/main-layout/header/Navbar.vue";
import {
  headerDisplay,
  headerWidthFluid,
  layout,
  themeMode,
  headerDesktopFixed,
  headerMobileFixed,
} from "@/core/helpers/config";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "layout-header",
  components: {
    KTHeaderMenu,
    KTHeaderNavbar,
  },
  setup() {
    const authStore = useAuthStore();
    
    const userFullName = computed(() => {
      const user = authStore.user;
      if (user && user.Name && user.LastName) {
        return `${user.Name} ${user.LastName}`;
      }
      return user?.Name || user?.LastName || "Utente";
    });


    return {
      layout,
      headerWidthFluid,
      headerDisplay,
      themeMode,
      getAssetPath,
      headerDesktopFixed,
      headerMobileFixed,
      userFullName,
    };
  },
});
</script>

<style scoped>
.welcome-message {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.15rem;
  padding: 0.4rem 0.9rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: 1px solid #dee2e6;
  border-radius: 0.65rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.welcome-message:hover {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  border-color: #3699ff;
}

.welcome-text {
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: #6c757d;
  text-transform: uppercase;
  line-height: 1;
}

.user-name {
  font-size: 0.85rem;
  font-weight: 700;
  color: #495057;
  line-height: 1.2;
}

/* Dark Mode */
[data-bs-theme="dark"] .welcome-message {
  background: linear-gradient(135deg, #1e1e2d 0%, #2a2a3c 100%);
  border-color: #3a3a4c;
}

[data-bs-theme="dark"] .welcome-message:hover {
  border-color: #3699ff;
}

[data-bs-theme="dark"] .welcome-text {
  color: #a1a5b7;
}

[data-bs-theme="dark"] .user-name {
  color: #f5f8fa;
}

/* Header con sfondo trasparente */
.header-transparent {
  background: rgba(255, 255, 255, 0.25) !important;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  height: 80px !important;
}

/* Dark mode per l'header */
[data-bs-theme="dark"] .header-transparent {
  background: rgba(30, 30, 45, 0.25) !important;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
