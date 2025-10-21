<template>
  <!--begin::Header-->
  <div v-if="headerDisplay" id="kt_app_header" class="app-header header-transparent">
    <!--begin::Header container-->
    <div
      class="app-container d-flex align-items-center"
      :class="{
        'container-fluid': headerWidthFluid,
        'container-xxl': !headerWidthFluid,
      }"
    >
      <!--begin::Logo-->
      <div class="d-none d-lg-flex align-items-center me-3">
        <router-link to="/dashboard">
          <img
            alt="Logo"
            :src="getAssetPath('media/logos/kurama-home-logos/logo-menu.png')"
            style="height: 50px;"
          />
        </router-link>
      </div>
      <!--end::Logo-->

      <!--begin::Mobile logo-->
      <div class="d-flex d-lg-none align-items-center me-3">
        <router-link to="/">
          <img
            alt="Logo"
            :src="getAssetPath('media/logos/kurama-home-logos/logo-menu.png')"
            class="h-50px"
          />
        </router-link>
      </div>
      <!--end::Mobile logo-->

      <!--begin::Header wrapper-->
      <div
        class="d-flex align-items-center flex-grow-1"
        id="kt_app_header_wrapper"
      >
        <KTHeaderMenu />
        <div class="d-flex align-items-center ms-auto">
          <KTHeaderNavbar />
          <!--begin::Header menu toggle-->
          <button 
            class="btn btn-icon btn-active-color-primary w-35px h-35px d-lg-none me-2"
            @click="toggleMobileMenu"
            type="button"
          >
            <KTIcon icon-name="text-align-left" icon-class="fs-1" />
          </button>
          <!--end::Header menu toggle-->
          
        </div>
      </div>
      <!--end::Header wrapper-->

    </div>
    <!--end::Header container-->
  </div>
  <!--end::Header-->

  <!--begin::Mobile Menu Drawer-->
  <Teleport to="body">
    <Transition name="mobile-menu-overlay">
      <div 
        v-if="isMobileMenuOpen" 
        class="mobile-menu-overlay"
        @click="closeMobileMenu"
      ></div>
    </Transition>
    <Transition name="mobile-menu-drawer">
      <div 
        v-if="isMobileMenuOpen" 
        class="mobile-menu-drawer"
      >
        <!--begin::Mobile Menu Header-->
        <div class="mobile-menu-header">
          <div class="d-flex align-items-center">
            <img
              alt="Logo"
              :src="getAssetPath('media/logos/kurama-home-logos/logo-menu.png')"
              style="height: 50px;"
            />
          </div>
          <button 
            class="btn btn-icon btn-sm btn-active-color-primary"
            @click="closeMobileMenu"
            type="button"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </button>
        </div>
        <!--end::Mobile Menu Header-->

        <!--begin::Mobile Menu Content-->
        <div class="mobile-menu-content">
          <template v-for="(item, i) in filteredMenuConfig" :key="i">
            <template v-for="(menuItem, j) in item.pages" :key="j">
              <router-link 
                v-if="menuItem.heading && menuItem.route" 
                :to="menuItem.route"
                class="mobile-menu-item"
                active-class="active"
                @click="closeMobileMenu"
              >
                <span v-if="menuItem.keenthemesIcon" class="mobile-menu-icon">
                  <KTIcon :icon-name="menuItem.keenthemesIcon" icon-class="fs-2" />
                </span>
                <span class="mobile-menu-title">{{ translate(menuItem.heading) }}</span>
              </router-link>
            </template>
          </template>
        </div>
        <!--end::Mobile Menu Content-->
      </div>
    </Transition>
  </Teleport>
  <!--end::Mobile Menu Drawer-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, computed, ref } from "vue";
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
import MainMenuConfig from "@/core/config/MainMenuConfig";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "layout-header",
  components: {
    KTHeaderMenu,
    KTHeaderNavbar,
  },
  setup() {
    const authStore = useAuthStore();
    const { t, te } = useI18n();
    const isMobileMenuOpen = ref(false);
    
    const userFullName = computed(() => {
      const user = authStore.user;
      if (user && user.Name && user.LastName) {
        return `${user.Name} ${user.LastName}`;
      }
      return user?.Name || user?.LastName || "Utente";
    });

    // Filter menu items based on user role
    const filteredMenuConfig = computed(() => {
      return MainMenuConfig.map(section => ({
        ...section,
        pages: section.pages?.filter(item => 
          item.roleEnabled?.includes(authStore.user.Role)
        ) || []
      }));
    });

    const translate = (text: string) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
      // Prevent body scroll when menu is open
      if (isMobileMenuOpen.value) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    const closeMobileMenu = () => {
      isMobileMenuOpen.value = false;
      document.body.style.overflow = '';
    };

    return {
      layout,
      headerWidthFluid,
      headerDisplay,
      themeMode,
      getAssetPath,
      headerDesktopFixed,
      headerMobileFixed,
      userFullName,
      isMobileMenuOpen,
      filteredMenuConfig,
      translate,
      toggleMobileMenu,
      closeMobileMenu,
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

/* ========================================
   MOBILE MENU STYLES
   ======================================== */

/* Mobile Menu Overlay */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1050;
  backdrop-filter: blur(4px);
}

/* Mobile Menu Drawer */
.mobile-menu-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  max-width: 85vw;
  background: #ffffff;
  z-index: 1051;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

[data-bs-theme="dark"] .mobile-menu-drawer {
  background: #1e1e2d;
}

/* Mobile Menu Header */
.mobile-menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e9ecef;
  flex-shrink: 0;
}

[data-bs-theme="dark"] .mobile-menu-header {
  border-bottom-color: #2a2a3c;
}

/* Mobile Menu Content */
.mobile-menu-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

/* Mobile Menu Item */
.mobile-menu-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 0.65rem;
  background: #f8f9fa;
  color: #495057;
  text-decoration: none;
  transition: all 0.2s ease;
  font-weight: 500;
  font-size: 0.95rem;
}

.mobile-menu-item:hover {
  background: #e9ecef;
  color: #3699ff;
  transform: translateX(4px);
}

.mobile-menu-item.active {
  background: linear-gradient(135deg, #3699ff 0%, #2e7fd3 100%);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(54, 153, 255, 0.25);
}

[data-bs-theme="dark"] .mobile-menu-item {
  background: #2a2a3c;
  color: #f5f8fa;
}

[data-bs-theme="dark"] .mobile-menu-item:hover {
  background: #3a3a4c;
  color: #3699ff;
}

[data-bs-theme="dark"] .mobile-menu-item.active {
  background: linear-gradient(135deg, #3699ff 0%, #2e7fd3 100%);
  color: #ffffff;
}

/* Mobile Menu Icon */
.mobile-menu-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: 1rem;
  background: rgba(54, 153, 255, 0.1);
  border-radius: 0.5rem;
  flex-shrink: 0;
}

.mobile-menu-item.active .mobile-menu-icon {
  background: rgba(255, 255, 255, 0.2);
}

/* Mobile Menu Title */
.mobile-menu-title {
  flex: 1;
  font-weight: 600;
}

/* CSS moved to global file: layout.css */
</style>
