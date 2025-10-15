<template>
  <!--begin::Pricing Layout -->
  <div class="pricing-layout-wrapper">
    <!--begin::Content-->
    <router-view></router-view>
    <!--end::Content-->
  </div>
  <!--end::Pricing Layout -->
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import LayoutService from "@/core/services/LayoutService";
import { useBodyStore } from "@/stores/body";

export default defineComponent({
  name: "pricing-layout",
  setup() {
    const store = useBodyStore();

    onMounted(() => {
      LayoutService.emptyElementClassesAndAttributes(document.body);

      store.addBodyClassname("app-blank");
      store.addBodyClassname("bg-body");
    });

    return {};
  },
});
</script>

<style scoped>
.pricing-layout-wrapper {
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow-x: hidden;
}
</style>

