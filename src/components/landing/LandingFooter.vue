<template>
  <footer class="footer">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-6">
          <div class="footer-brand">
            <img :src="getAssetPath('media/logos/kurama-home-logos/logo-menu.png')" alt="MiraiHome" height="30" class="logo-light" />
            <img :src="getAssetPath('media/logos/kurama-home-logos/logo-menu-bianco.png')" alt="MiraiHome" height="30" class="logo-dark" />
            <span class="ms-2 text-muted">© 2024 MiraiHome. Tutti i diritti riservati.</span>
          </div>
        </div>
        <div class="col-md-6 text-md-end">
          <div class="footer-links">
            <router-link to="/sign-in" class="text-muted me-3">Accedi</router-link>
            <router-link to="/sign-up" class="text-muted">Registrati</router-link>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getAssetPath } from "@/core/helpers/assets";

export default defineComponent({
  name: "landing-footer",
  setup() {
    return {
      getAssetPath,
    };
  },
});
</script>

