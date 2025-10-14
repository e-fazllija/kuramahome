<template>
  <!--begin::sidebar menu-->
  <div class="app-sidebar-menu overflow-hidden flex-column-fluid">
    <!--begin::Menu wrapper-->
    <div 
      id="kt_app_sidebar_menu_wrapper" 
      class="app-sidebar-wrapper hover-scroll-overlay-y my-3 px-3" 
      data-kt-scroll="true"
      data-kt-scroll-activate="true" 
      data-kt-scroll-height="auto"
      data-kt-scroll-dependencies="#kt_app_sidebar_logo, #kt_app_sidebar_footer"
      data-kt-scroll-wrappers="#kt_app_sidebar_menu" 
      data-kt-scroll-offset="5px" 
      data-kt-scroll-save-state="true"
    >
      <!--begin::Menu-->
      <div 
        id="#kt_app_sidebar_menu" 
        class="professional-menu menu menu-column menu-rounded menu-sub-indention" 
        data-kt-menu="true"
      >
        <template v-for="(item, i) in MainMenuConfig" :key="i">
          <!-- Section Heading -->
          <div v-if="item.heading" class="menu-section pt-3 pb-2">
            <div class="menu-section-content">
              <span class="menu-section-heading fw-semibold text-uppercase fs-8 text-muted">
                {{ translate(item.heading) }}
              </span>
            </div>
          </div>
          
          <!-- Menu Items -->
          <template v-for="(menuItem, j) in item.pages" :key="j">
            <!-- Simple Menu Item -->
            <template v-if="menuItem.heading">
              <div class="menu-item mb-1">
                <router-link 
                  v-if="menuItem.route" 
                  class="menu-link professional-menu-link" 
                  active-class="active" 
                  :to="menuItem.route"
                >
                  <!-- Icon -->
                  <span v-if="menuItem.keenthemesIcon || menuItem.bootstrapIcon" class="menu-icon">
                    <i v-if="sidebarMenuIcons === 'bootstrap'" :class="menuItem.bootstrapIcon" class="bi fs-5"></i>
                    <KTIcon v-else-if="sidebarMenuIcons === 'keenthemes'" :icon-name="menuItem.keenthemesIcon"
                      icon-class="fs-4" />
                  </span>
                  
                  <!-- Title -->
                  <span class="menu-title">{{ translate(menuItem.heading) }}</span>
                  
                  <!-- Badge for notifications -->
                  <span v-if="getMenuBadge(menuItem.route)" class="menu-badge badge badge-sm badge-circle">
                    {{ getMenuBadge(menuItem.route) }}
                  </span>
                </router-link>
              </div>
            </template>
            
            <!-- Accordion Menu Item -->
            <div 
              v-if="menuItem.sectionTitle && menuItem.route" 
              :class="{ show: hasActiveChildren(menuItem.route) }"
              class="menu-item menu-accordion mb-1" 
              data-kt-menu-sub="accordion" 
              data-kt-menu-trigger="click"
            >
              <span class="menu-link professional-menu-link">
                <!-- Icon -->
                <span v-if="menuItem.keenthemesIcon || menuItem.bootstrapIcon" class="menu-icon">
                  <i v-if="sidebarMenuIcons === 'bootstrap'" :class="menuItem.bootstrapIcon" class="bi fs-5"></i>
                  <KTIcon v-else-if="sidebarMenuIcons === 'keenthemes'" :icon-name="menuItem.keenthemesIcon"
                    icon-class="fs-4" />
                </span>
                
                <!-- Title -->
                <span class="menu-title">{{ translate(menuItem.sectionTitle) }}</span>
                
                <!-- Arrow -->
                <span class="menu-arrow"></span>
              </span>
              
              <!-- Submenu -->
              <div :class="{ show: hasActiveChildren(menuItem.route) }" class="menu-sub menu-sub-accordion">
                <template v-for="(item2, k) in menuItem.sub" :key="k">
                  <!-- Submenu Item -->
                  <div v-if="item2.heading" class="menu-item">
                    <router-link v-if="item2.route" class="menu-link submenu-link" active-class="active" :to="item2.route">
                      <span class="menu-bullet">
                        <span class="bullet bullet-dot"></span>
                      </span>
                      <span class="menu-title">{{ translate(item2.heading) }}</span>
                    </router-link>
                  </div>
                  
                  <!-- Nested Accordion -->
                  <div 
                    v-if="item2.sectionTitle && item2.route" 
                    :class="{ show: hasActiveChildren(item2.route) }"
                    class="menu-item menu-accordion" 
                    data-kt-menu-sub="accordion" 
                    data-kt-menu-trigger="click"
                  >
                    <span class="menu-link submenu-link">
                      <span class="menu-bullet">
                        <span class="bullet bullet-dot"></span>
                      </span>
                      <span class="menu-title">{{ translate(item2.sectionTitle) }}</span>
                      <span class="menu-arrow"></span>
                    </span>
                    
                    <div :class="{ show: hasActiveChildren(item2.route) }" class="menu-sub menu-sub-accordion">
                      <template v-for="(item3, l) in item2.sub" :key="l">
                        <div v-if="item3.heading" class="menu-item">
                          <router-link v-if="item3.route" class="menu-link nested-link" active-class="active" :to="item3.route">
                            <span class="menu-bullet">
                              <span class="bullet bullet-dot"></span>
                            </span>
                            <span class="menu-title">{{ translate(item3.heading) }}</span>
                          </router-link>
                        </div>
                      </template>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </template>
      </div>
      <!--end::Menu-->
    </div>
    <!--end::Menu wrapper-->
  </div>
  <!--end::sidebar menu-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import MainMenuConfig from "@/core/config/MainMenuConfig";
import { sidebarMenuIcons } from "@/core/helpers/config";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "sidebar-menu",
  components: {},
  setup() {
    const { t, te } = useI18n();
    const route = useRoute();
    const scrollElRef = ref<null | HTMLElement>(null);
    const authStore = useAuthStore();

    // Filter menu items based on user role
    MainMenuConfig[0].pages = MainMenuConfig[0].pages.filter(x => x.roleEnabled.includes(authStore.user.Role))

    // Professional badges for business notifications
    const menuBadges = ref<Record<string, string>>({
      '/requests': '3', // Richieste in sospeso
      '/clients': '2', // Nuovi clienti
    });

    onMounted(() => {
      if (scrollElRef.value) {
        scrollElRef.value.scrollTop = 0;
      }
    });

    const translate = (text: string) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };

    const hasActiveChildren = (match: string) => {
      return route.path.indexOf(match) !== -1;
    };

    const getMenuBadge = (route: string) => {
      return menuBadges.value[route] || null;
    };

    return {
      hasActiveChildren,
      MainMenuConfig,
      sidebarMenuIcons,
      translate,
      getAssetPath,
      getMenuBadge,
    };
  },
});
</script>

<style scoped>
/* Professional Real Estate Menu Styling */
.professional-menu {
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

/* Menu Section Styling */
.menu-section {
  margin-bottom: 12px;
}

.menu-section-content {
  padding: 0 4px;
}

.menu-section-heading {
  color: var(--bs-gray-600);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.75px;
  margin-bottom: 8px;
  display: block;
  padding-left: 12px;
}

/* Professional Menu Link Styling */
.professional-menu-link {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: 8px;
  text-decoration: none;
  color: var(--bs-gray-700);
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  margin-bottom: 1px;
  border-left: 3px solid transparent;
  background: transparent;
}

.professional-menu-link:hover {
  color: var(--bs-gray-800);
  background: var(--bs-gray-50);
  border-left-color: var(--bs-gray-400);
}

.professional-menu-link.active {
  color: var(--bs-primary);
  background: rgba(62, 151, 255, 0.08);
  border-left-color: var(--bs-primary);
  font-weight: 600;
}

/* Icon Styling */
.menu-icon {
  width: 20px;
  height: 20px;
  margin-right: 12px;
  color: var(--bs-gray-600);
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.professional-menu-link:hover .menu-icon {
  color: var(--bs-gray-700);
}

.professional-menu-link.active .menu-icon {
  color: var(--bs-primary);
}

/* Title Styling */
.menu-title {
  flex: 1;
  font-weight: 500;
  line-height: 1.4;
}

.professional-menu-link.active .menu-title {
  font-weight: 600;
}

/* Professional Badge */
.menu-badge {
  font-size: 0.65rem;
  font-weight: 600;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
}

/* Arrow Styling */
.menu-arrow {
  margin-left: auto;
  transition: transform 0.2s ease;
}

.menu-accordion.show .menu-arrow {
  transform: rotate(90deg);
}

/* Submenu Styling */
.menu-sub {
  background: var(--bs-gray-50);
  margin: 4px 0 4px 32px;
  border-radius: 6px;
  padding: 4px 0;
  border-left: 2px solid var(--bs-gray-200);
}

.submenu-link {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  text-decoration: none;
  color: var(--bs-gray-600);
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border-radius: 4px;
  margin: 1px 8px;
}

.submenu-link:hover {
  color: var(--bs-gray-800);
  background: rgba(0, 0, 0, 0.02);
}

.submenu-link.active {
  color: var(--bs-primary);
  background: rgba(62, 151, 255, 0.08);
  font-weight: 600;
}

/* Bullet Styling */
.menu-bullet {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bullet-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--bs-gray-400);
  transition: all 0.2s ease;
}

.submenu-link:hover .bullet-dot {
  background: var(--bs-gray-600);
}

.submenu-link.active .bullet-dot {
  background: var(--bs-primary);
  transform: scale(1.2);
}

/* Nested Links */
.nested-link {
  padding: 6px 16px;
  font-size: 0.8rem;
  margin-left: 16px;
}

.nested-link .bullet-dot {
  width: 3px;
  height: 3px;
}

/* Dark Mode Adjustments */
[data-bs-theme="dark"] .professional-menu-link {
  color: var(--bs-gray-300);
}

[data-bs-theme="dark"] .professional-menu-link:hover {
  color: var(--bs-gray-100);
  background: rgba(255, 255, 255, 0.03);
}

[data-bs-theme="dark"] .professional-menu-link.active {
  color: var(--bs-primary);
  background: rgba(62, 151, 255, 0.15);
}

[data-bs-theme="dark"] .menu-icon {
  color: var(--bs-gray-400);
}

[data-bs-theme="dark"] .professional-menu-link:hover .menu-icon {
  color: var(--bs-gray-200);
}

[data-bs-theme="dark"] .professional-menu-link.active .menu-icon {
  color: var(--bs-primary);
}

[data-bs-theme="dark"] .menu-sub {
  background: var(--bs-gray-800);
  border-left-color: var(--bs-gray-700);
}

[data-bs-theme="dark"] .submenu-link {
  color: var(--bs-gray-400);
}

[data-bs-theme="dark"] .submenu-link:hover {
  color: var(--bs-gray-200);
  background: rgba(255, 255, 255, 0.05);
}

[data-bs-theme="dark"] .submenu-link.active {
  color: var(--bs-primary);
  background: rgba(62, 151, 255, 0.2);
}

[data-bs-theme="dark"] .menu-section-heading {
  color: var(--bs-gray-500);
}

[data-bs-theme="dark"] .bullet-dot {
  background: var(--bs-gray-600);
}

[data-bs-theme="dark"] .submenu-link:hover .bullet-dot {
  background: var(--bs-gray-400);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .professional-menu-link {
    padding: 8px 10px;
    font-size: 0.85rem;
  }
  
  .menu-icon {
    width: 18px;
    height: 18px;
    margin-right: 10px;
  }
  
  .menu-sub {
    margin-left: 28px;
  }
}

@media (max-width: 768px) {
  .professional-menu-link {
    padding: 7px 8px;
  }
  
  .menu-icon {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
  
  .menu-title {
    font-size: 0.8rem;
  }
  
  .submenu-link {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
}

/* Professional Focus States */
.professional-menu-link:focus,
.submenu-link:focus {
  outline: 2px solid var(--bs-primary);
  outline-offset: -2px;
}

/* Smooth Transitions */
.professional-menu-link,
.submenu-link,
.menu-icon,
.bullet-dot,
.menu-arrow {
  transition: all 0.2s ease;
}

/* Business-appropriate spacing */
.menu-item {
  margin-bottom: 2px;
}

.menu-item:last-child {
  margin-bottom: 0;
}

</style>
