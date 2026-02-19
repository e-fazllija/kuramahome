<template>
  <!--begin::Footer-->
  <div v-if="footerDisplay" id="kt_app_footer" class="app-footer">
    <!--begin::Footer container-->
    <div
      class="app-container d-flex flex-column flex-md-row flex-center flex-md-stack py-3"
      :class="{
        'container-fluid': footerWidthFluid,
        'container-xxl': !footerWidthFluid,
      }"
    >
      <!--begin::Copyright-->
      <div class="text-dark order-2 order-md-1">
        <span class="text-muted fw-semibold me-1">2024</span>
        <a
          href="https://keenthemes.com"
          target="_blank"
          class="text-gray-800 text-hover-primary"
          >MiraiHome</a
        >
      </div>
      <!--end::Copyright-->
      <!--begin::Menu-->
      <ul class="menu menu-gray-600 menu-hover-primary fw-semibold order-1">
        <li class="menu-item">
          <a href="https://www.iubenda.com/privacy-policy/35616219" target="_blank" class="text-muted me-3">Privacy Policy</a>
        </li>
        <li class="menu-item">
          <a href="https://www.iubenda.com/privacy-policy/35616219/cookie-policy" target="_blank" class="text-muted me-3">Cookie Policy</a>
        </li>
        <li class="menu-item">
          <router-link
            to="/faq"
            target="_blank"
            class="menu-link px-2"
            >FAQ</router-link>
        </li>
      </ul>
      <!--end::Menu-->
    </div>
    <!--end::Footer container-->
  </div>
  <!--end::Footer-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { footerDisplay, footerWidthFluid } from "@/core/helpers/config";

export default defineComponent({
  name: "theme-footer",
  components: {},
  setup() {
    return {
      footerWidthFluid,
      footerDisplay,
    };
  },
});
</script>
