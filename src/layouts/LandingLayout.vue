<template>
  <!--begin::Landing Layout -->
  <div class="landing-layout">
    <router-view></router-view>
  </div>
  <!--end::Landing Layout -->
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import LayoutService from "@/core/services/LayoutService";
import { useBodyStore } from "@/stores/body";

export default defineComponent({
  name: "landing-layout",
  components: {},
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
