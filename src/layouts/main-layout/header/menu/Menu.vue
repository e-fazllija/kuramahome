<template>
  <!--begin::Menu wrapper-->
  <div
    class="app-header-menu app-header-mobile-drawer align-items-stretch"
    data-kt-drawer="true"
    data-kt-drawer-name="app-header-menu"
    data-kt-drawer-activate="{default: true, lg: false}"
    data-kt-drawer-overlay="true"
    data-kt-drawer-width="225px"
    data-kt-drawer-direction="end"
    data-kt-drawer-toggle="#kt_app_header_menu_toggle"
    data-kt-swapper="true"
    data-kt-swapper-mode="{default: 'append', lg: 'prepend'}"
    data-kt-swapper-parent="{default: '#kt_app_body', lg: '#kt_app_header_wrapper'}"
  >
    <!--begin::Menu-->
    <div
      class="menu menu-rounded menu-column menu-lg-row my-5 my-lg-0 align-items-stretch fw-semibold px-2 px-lg-0"
      id="kt_app_header_menu"
      data-kt-menu="true"
    >
      <!-- Menu Items from MainMenuConfig -->
      <template v-for="(item, i) in MainMenuConfig" :key="i">
        <template v-for="(menuItem, j) in item.pages" :key="j">
          <div v-if="menuItem.heading" class="menu-item me-0 me-lg-2">
            <router-link 
              v-if="menuItem.route && !isSubscriptionRequired(menuItem.route)" 
              class="menu-link py-3" 
              active-class="active" 
              :to="menuItem.route"
            >
              <span v-if="menuItem.keenthemesIcon" class="menu-icon me-0">
                <KTIcon :icon-name="menuItem.keenthemesIcon" icon-class="fs-2" />
              </span>
              <span class="menu-title">{{ translate(menuItem.heading) }}</span>
            </router-link>
            <!-- Menu item disabilitato quando abbonamento scaduto -->
            <div 
              v-else-if="menuItem.route && isSubscriptionRequired(menuItem.route) && subscriptionExpired"
              class="menu-link py-3 disabled"
              :class="{ 'subscription-expired': subscriptionExpired }"
              @click="handleSubscriptionExpiredClick"
            >
              <span v-if="menuItem.keenthemesIcon" class="menu-icon me-0">
                <KTIcon :icon-name="menuItem.keenthemesIcon" icon-class="fs-2" />
              </span>
              <span class="menu-title">{{ translate(menuItem.heading) }}</span>
            </div>
            <!-- Menu item normale quando abbonamento attivo -->
            <router-link 
              v-else-if="menuItem.route" 
              class="menu-link py-3" 
              active-class="active" 
              :to="menuItem.route"
            >
              <span v-if="menuItem.keenthemesIcon" class="menu-icon me-0">
                <KTIcon :icon-name="menuItem.keenthemesIcon" icon-class="fs-2" />
              </span>
              <span class="menu-title">{{ translate(menuItem.heading) }}</span>
            </router-link>
          </div>
        </template>
      </template>
    </div>
    <!--end::Menu-->
  </div>
  <!--end::Menu wrapper-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, computed } from "vue";
import KTMenuPages from "@/layouts/main-layout/header/menu/MenuPages.vue";
import { version } from "@/core/helpers/documentation";
import { headerMenuDisplay } from "@/core/helpers/config";
import MainMenuConfig from "@/core/config/MainMenuConfig";
import { useAuthStore } from "@/stores/auth";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "header-menu",
  components: {
    KTMenuPages,
  },
  setup() {
    const { t, te } = useI18n();
    const authStore = useAuthStore();

    // Filter menu items based on user role
    MainMenuConfig[0].pages = MainMenuConfig[0].pages.filter(x => x.roleEnabled.includes(authStore.user.Role))

    // Controllo se l'abbonamento è scaduto
    const subscriptionExpired = computed(() => authStore.isSubscriptionExpired);
    
    // Route che richiedono abbonamento attivo
    const subscriptionRequiredRoutes = [
      '/dashboard/clients',
      '/dashboard/requests', 
      '/dashboard/properties',
      '/dashboard/documentations',
      '/dashboard/calendar',
      '/dashboard/agencies',
      '/dashboard/agents',
    ];
    
    // Verifica se una route richiede abbonamento attivo
    const isSubscriptionRequired = (route: string) => {
      return subscriptionRequiredRoutes.includes(route);
    };
    
    // Gestisce il click su menu item quando abbonamento scaduto
    const handleSubscriptionExpiredClick = () => {
      // Reindirizza alla pagina abbonamento
      window.location.href = '/subscription';
    };

    const translate = (text: string) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };

    return {
      version,
      headerMenuDisplay,
      getAssetPath,
      MainMenuConfig,
      translate,
      subscriptionExpired,
      isSubscriptionRequired,
      handleSubscriptionExpiredClick,
    };
  },
});
</script>

<style scoped>
/* CSS moved to global file: layout.css */

/* Stili per menu items disabilitati quando abbonamento scaduto */
.menu-link.disabled {
  cursor: not-allowed;
  opacity: 0.5;
  pointer-events: none;
}

.menu-link.subscription-expired {
  cursor: pointer;
  opacity: 0.7;
  position: relative;
}

.menu-link.subscription-expired:hover {
  opacity: 0.9;
  background-color: rgba(255, 193, 7, 0.1);
}

.menu-link.subscription-expired::after {
  content: "🔒";
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
}

/* Only menu-item specific styling */
.menu-item {
  position: relative;
}
</style>
