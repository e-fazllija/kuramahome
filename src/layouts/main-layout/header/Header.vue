<template>
  <!--begin::Header-->
  <header v-if="headerDisplay" id="kt_app_header" class="app-header header-elegant position-fixed top-0 start-0 end-0 z-index-1030">
    <!--begin::Header container-->
    <div
      class="app-container d-flex align-items-center h-100"
      :class="{
        'container-fluid': headerWidthFluid,
        'container-xxl': !headerWidthFluid,
      }"
    >
      <!--begin::Logo-->
      <div class="d-none d-lg-flex align-items-center me-4">
        <router-link to="/dashboard" class="text-decoration-none">
          <img
            alt="Logo"
            :src="getAssetPath('media/logos/kurama-home-logos/logo-menu.png')"
            class="header-logo"
          />
        </router-link>
      </div>
      <!--end::Logo-->

      <!--begin::Mobile logo-->
      <div class="d-flex d-lg-none align-items-center me-3">
        <router-link to="/" class="text-decoration-none">
          <img
            alt="Logo"
            :src="getAssetPath('media/logos/kurama-home-logos/logo-menu.png')"
            class="header-logo-mobile"
          />
        </router-link>
      </div>
      <!--end::Mobile logo-->

      <!--begin::Header wrapper-->
      <div
        class="d-flex align-items-center flex-grow-1 w-100"
        id="kt_app_header_wrapper"
      >
        <KTHeaderMenu />

        
      </div>
      <!--end::Header wrapper-->
      <!--begin::Right side-->
      <div class="d-flex align-items-center ms-auto gap-2">
          <!--begin::Theme toggle-->
          <button 
            class="btn btn-icon btn-active-color-primary theme-toggle-btn"
            @click="toggleTheme"
            type="button"
            :aria-label="currentThemeMode === 'dark' ? 'Passa a modalità light' : 'Passa a modalità dark'"
            :title="currentThemeMode === 'dark' ? 'Passa a modalità light' : 'Passa a modalità dark'"
          >
            <KTIcon 
              :icon-name="currentThemeMode === 'dark' ? 'night-day' : 'moon'" 
              icon-class="fs-2" 
            />
          </button>
          <!--end::Theme toggle-->
          <KTHeaderNavbar />
          <!--begin::Mobile menu toggle-->
          <button 
            class="btn btn-icon btn-active-color-primary d-lg-none"
            :class="{
              'btn-active': isMobileMenuOpen
            }"
            @click="toggleMobileMenu"
            type="button"
            aria-label="Toggle mobile menu"
          >
            <KTIcon 
              :icon-name="isMobileMenuOpen ? 'cross' : 'text-align-left'" 
              icon-class="fs-2" 
            />
          </button>
          <!--end::Mobile menu toggle-->
        </div>
        <!--end::Right side-->
    </div>
    <!--end::Header container-->
  </header>
  <!--end::Header-->

  <!--begin::Mobile Menu Drawer-->
  <Teleport to="body">
    <Transition name="mobile-menu-overlay">
      <div 
        v-if="isMobileMenuOpen" 
        class="mobile-menu-overlay position-fixed top-0 start-0 end-0 bottom-0"
        @click="closeMobileMenu"
        aria-label="Close menu"
      ></div>
    </Transition>
    <Transition name="mobile-menu-drawer">
      <aside 
        v-if="isMobileMenuOpen" 
        class="mobile-menu-drawer position-fixed top-0 end-0 bottom-0 d-flex flex-column"
        role="complementary"
        aria-label="Mobile navigation menu"
      >
        <!--begin::Mobile Menu Header-->
        <div class="mobile-menu-header d-flex align-items-center justify-content-between border-bottom">
          <router-link to="/dashboard" class="text-decoration-none" @click="closeMobileMenu">
            <img
              alt="Logo"
              :src="getAssetPath('media/logos/kurama-home-logos/logo-menu.png')"
              class="header-logo"
            />
          </router-link>
          <button 
            class="btn btn-icon btn-sm btn-active-color-primary"
            @click="closeMobileMenu"
            type="button"
            aria-label="Close menu"
          >
            <KTIcon icon-name="cross" icon-class="fs-2" />
          </button>
        </div>
        <!--end::Mobile Menu Header-->

        <!--begin::Mobile Menu Content-->
        <nav class="mobile-menu-content flex-grow-1 overflow-auto">
          <template v-for="(item, i) in filteredMenuConfig" :key="i">
            <template v-for="(menuItem, j) in item.pages" :key="j">
              <router-link 
                v-if="menuItem.heading && menuItem.route" 
                :to="menuItem.route"
                class="mobile-menu-item d-flex align-items-center justify-content-center text-decoration-none rounded"
                active-class="active"
                @click="closeMobileMenu"
              >
                <span class="mobile-menu-title fw-semibold">{{ translate(menuItem.heading) }}</span>
              </router-link>
            </template>
          </template>
        </nav>
        <!--end::Mobile Menu Content-->
      </aside>
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
import { useThemeStore } from "@/stores/theme";
import { useConfigStore } from "@/stores/config";
import { ThemeModeComponent } from "@/assets/ts/layout";

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
    const storeTheme = useThemeStore();
    const storeConfig = useConfigStore();
    
    const userFullName = computed(() => {
      const user = authStore.user;
      if (user && user.FirstName && user.LastName) {
        return `${user.FirstName} ${user.LastName}`;
      }
      return user?.FirstName || user?.LastName || "Utente";
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

    // Theme mode management
    const currentThemeMode = computed(() => {
      if (storeTheme.mode === "system") {
        return ThemeModeComponent.getSystemMode();
      }
      return storeTheme.mode;
    });

    const toggleTheme = () => {
      const currentMode = storeTheme.mode;
      let newMode: "light" | "dark" | "system";
      
      if (currentMode === "system") {
        // Se è system, determina il tema corrente e passa all'opposto
        const systemMode = ThemeModeComponent.getSystemMode();
        newMode = systemMode === "dark" ? "light" : "dark";
      } else {
        // Se è light o dark, passa all'opposto
        newMode = currentMode === "dark" ? "light" : "dark";
      }
      
      storeConfig.setLayoutConfigProperty("general.mode", newMode);
      storeTheme.setThemeMode(newMode);
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
      currentThemeMode,
      toggleTheme,
    };
  },
});
</script>

<style scoped>
/* Header logo styles */
.header-logo {
  height: 50px;
  transition: transform 0.3s ease;
}

.header-logo:hover {
  transform: scale(1.05);
}

.header-logo-mobile {
  height: 45px;
  transition: transform 0.3s ease;
}

.header-logo-mobile:hover {
  transform: scale(1.05);
}

/* CSS moved to global file: layout.css */
</style>
