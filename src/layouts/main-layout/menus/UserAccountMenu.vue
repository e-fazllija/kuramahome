<template>
  <!--begin::Menu-->
  <div
    class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold py-4 fs-6 w-275px"
    data-kt-menu="true"
  >
    <!--begin::Menu item-->
    <div v-if="user" class="menu-item px-3">
      <div class="menu-content d-flex align-items-center px-3">
        <!--begin::Avatar-->
        <!-- <div class="symbol symbol-50px me-5">
          <img alt="Logo" :src="getAssetPath('media/logos/TH-3.jpg')" />
        </div> -->
        <!--end::Avatar-->

        <!--begin::Username-->
        <div class="d-flex flex-column">
          <div class="fw-bold d-flex align-items-center fs-5">
            {{ user.Name }} {{ user.LastName }}
            <span class="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2"
              >{{ user.Role }}</span
            >
          </div>
          <a href="#" class="fw-semobold text-muted text-hover-primary fs-7"
            >{{ user.Email }}</a
          >
        </div>
        <!--end::Username-->
      </div>
    </div>
    <!--end::Menu item-->

    <!--begin::Menu item-->
    <!-- <div class="menu-item px-5">
      <router-link to="/pages/profile/overview" class="menu-link px-5">
        My Profile
      </router-link>
    </div> -->
    <!--end::Menu item-->

    <!--begin::Menu item-->
    <!-- <div class="menu-item px-5">
      <router-link to="/pages/profile/overview" class="menu-link px-5">
        <span class="menu-text">My Projects</span>
        <span class="menu-badge">
          <span class="badge badge-light-danger badge-circle fw-bold fs-7"
            >3</span
          >
        </span>
      </router-link>
    </div> -->
    <!--end::Menu item-->

    <!--begin::Menu separator-->
    <div class="separator my-2"></div>
    <!--end::Menu separator-->

    <!--begin::Menu item-->
    <div v-if="user.Id != undefined" class="menu-item px-5 my-1">
      <router-link :to="{ name: 'profile_details', params: { id: user.Id }}" class="menu-link px-5">
        Impostazioni
      </router-link>
    </div>
    <!--end::Menu item-->

    <!--begin::Menu item-->
    <div class="menu-item px-5">
      <a @click="signOut()" class="menu-link px-5"> Sign Out </a>
    </div>
    <!--end::Menu item-->
  </div>
  <!--end::Menu-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "kt-user-menu",
  components: {},
  setup() {
    const router = useRouter();
    const i18n = useI18n();
    const store = useAuthStore();
    const loggedUser = store.user;
    
    i18n.locale.value = localStorage.getItem("lang")
      ? (localStorage.getItem("lang") as string)
      : "en";


    const signOut = () => {
      store.logout();
      router.push({ name: "sign-in" });
    };

    const setLang = (lang: string) => {
      localStorage.setItem("lang", lang);
      i18n.locale.value = lang;
    };

    const currentLanguage = computed(() => {
      return i18n.locale.value;
    });

    const user = computed(() => {
      return loggedUser;
    });

    return {
      signOut,
      setLang,
      currentLanguage,
      getAssetPath,
      user
    };
  },
});
</script>
