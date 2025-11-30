<template>
  <RouterView />
</template>

<script lang="ts">
import { defineComponent, nextTick, onBeforeMount, onMounted } from "vue";
import { RouterView } from "vue-router";
import { useConfigStore } from "@/stores/config";
import { useThemeStore } from "@/stores/theme";
import { useBodyStore } from "@/stores/body";
import { useAuthStore } from "@/stores/auth";
import { themeConfigValue } from "@/core/helpers/config";
import { initializeComponents } from "@/core/plugins/keenthemes";

export default defineComponent({
  name: "app",
  components: {
    RouterView,
  },
  setup() {
    const configStore = useConfigStore();
    const themeStore = useThemeStore();
    const bodyStore = useBodyStore();
    const authStore = useAuthStore();

    onBeforeMount(async () => {
      /**
       * Overrides the layout config using saved data from localStorage
       * remove this to use static config (@/core/config/DefaultLayoutConfig.ts)
       */
      await configStore.overrideLayoutConfig();

      /**
       *  Sets a mode from configuration
       */
      themeStore.setThemeMode(themeConfigValue.value);

      /**
       * Verifica l'autenticazione solo all'avvio dell'app o al refresh
       * Non viene chiamato ad ogni cambio di route
       */
      //await authStore.verifyAuth();
    });

    onMounted(() => {
      nextTick(() => {
        initializeComponents();

        bodyStore.removeBodyClassName("page-loading");
      });
    });
  },
});
</script>

<style lang="scss">
@import "bootstrap-icons/font/bootstrap-icons.css";
@import "apexcharts/dist/apexcharts.css";
@import "quill/dist/quill.snow.css";
@import "animate.css";
@import "sweetalert2/dist/sweetalert2.css";
@import "nouislider/dist/nouislider.css";
@import "@fortawesome/fontawesome-free/css/all.min.css";
@import "socicon/css/socicon.css";
@import "line-awesome/dist/line-awesome/css/line-awesome.css";
@import "dropzone/dist/dropzone.css";
@import "@vueform/multiselect/themes/default.css";
@import "prism-themes/themes/prism-shades-of-purple.css";
@import "element-plus/dist/index.css";

// Main demo style scss
@import "assets/keenicons/duotone/style.css";
@import "assets/keenicons/outline/style.css";
@import "assets/keenicons/solid/style.css";
@import "assets/sass/element-ui.dark";
@import "assets/sass/plugins";
@import "assets/sass/style";

// Custom CSS imports
@import "assets/css/dark-mode.css";
@import "assets/css/buttons.css";
@import "assets/css/layout.css";
@import "assets/css/auth-layout.css";
@import "assets/css/wizard.css";
@import "assets/css/modal-base.css";
@import "assets/css/modal-forms.css";
@import "assets/css/modal-forms-dark.css";
@import "assets/css/modal-buttons.css";
@import "assets/css/form-datetime.css";
@import "assets/css/form-controls.css";
@import "assets/css/widgets.css";
@import "assets/css/pricing.css";
@import "assets/css/landing-page.css";
@import "assets/css/faq.css";
@import "assets/css/spinner.css";
@import "assets/css/property-search.css";

#app {
  display: contents;
}
</style>
