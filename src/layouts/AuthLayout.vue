<template>
  <!--begin::Authentication Layout -->
  <div class="auth-background-container">
    <!--begin::Background Image-->
    <div 
      class="auth-background-image"
      :style="`background-image: url('${getAssetPath('media/logos/kurama-home-logos/testfull.png')}');`"
    ></div>
    <!--end::Background Image-->

    <!--begin::Auth Card-->
    <div class="auth-card">
      <!--begin::Form-->
      <router-view></router-view>
      <!--end::Form-->
    </div>
    <!--end::Auth Card-->
  </div>
  <!--end::Authentication Layout -->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted } from "vue";
import LayoutService from "@/core/services/LayoutService";
import { useBodyStore } from "@/stores/body";

export default defineComponent({
  name: "auth-layout",
  components: {},
  setup() {
    const store = useBodyStore();

    onMounted(() => {
      LayoutService.emptyElementClassesAndAttributes(document.body);

      store.addBodyClassname("app-blank");
      store.addBodyClassname("bg-body");
    });

    return {
      getAssetPath,
    };
  },
});
</script>
