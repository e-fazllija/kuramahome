<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top" :class="{ 'navbar-scrolled': isScrolled }">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <div class="navbar-brand-wrapper">
          <img :src="getAssetPath('media/logos/kurama-home-logos/logo-menu.png')" alt="MiraiHome" class="navbar-logo" />
        </div>
      </router-link>
      
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto align-items-center">
          <li class="nav-item">
            <a class="nav-link" href="#find-your-property" @click="handleAnchorClick">
              <span class="nav-link-text">Cerca il tuo immobile</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#features" @click="handleAnchorClick">
              <span class="nav-link-text">Funzionalità</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#pricing" @click="handleAnchorClick">
              <span class="nav-link-text">Piani</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#how-it-works" @click="handleAnchorClick">
              <span class="nav-link-text">Come Funziona</span>
            </a>
          </li>
          <!-- <li class="nav-item">
            <a class="nav-link" href="#testimonials" @click="handleAnchorClick">
              <span class="nav-link-text">Recensioni</span>
            </a>
          </li> -->
          <li class="nav-item">
            <a class="nav-link" href="#faq" @click="handleAnchorClick">
              <span class="nav-link-text">FAQ</span>
            </a>
          </li>
          <li class="nav-item nav-divider"></li>
          <li class="nav-item">
            <button 
              class="btn-theme-switcher" 
              @click="toggleTheme"
              :aria-label="currentTheme === 'dark' ? 'Passa alla modalità chiara' : 'Passa alla modalità scura'"
            >
              <svg v-if="currentTheme === 'light'" class="theme-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
              <svg v-else class="theme-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            </button>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-login" to="/sign-in">
              <span class="nav-link-text">Accedi</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, nextTick, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getAssetPath } from "@/core/helpers/assets";
import { useThemeStore } from "@/stores/theme";

export default defineComponent({
  name: "landing-navbar",
  setup() {
    const isScrolled = ref(false);
    const route = useRoute();
    const router = useRouter();
    const themeStore = useThemeStore();

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 50;
    };

    const scrollToAnchor = (hash: string) => {
      nextTick(() => {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    };

    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        
        // Se siamo su una pagina diversa dalla landing, naviga prima alla landing
        if (route.path !== '/') {
          router.push({ path: '/', hash: href }).then(() => {
            scrollToAnchor(href);
          });
          return;
        }

        // Se siamo già sulla landing, fai scroll smooth
        scrollToAnchor(href);
      }
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial state

      // Se siamo sulla landing e c'è un hash nell'URL, scrolla alla sezione
      if (route.path === '/' && route.hash) {
        scrollToAnchor(route.hash);
      }
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    const currentTheme = computed(() => {
      const mode = themeStore.mode;
      if (!mode || mode === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return mode;
    });

    const toggleTheme = () => {
      const newTheme = currentTheme.value === 'dark' ? 'light' : 'dark';
      themeStore.setThemeMode(newTheme);
    };

    return {
      getAssetPath,
      isScrolled,
      handleAnchorClick,
      currentTheme,
      toggleTheme,
    };
  },
});
</script>

