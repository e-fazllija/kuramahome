<template>
  <!--begin::Navbar-->
  <div class="app-navbar flex-shrink-0">
    <!--begin::Chat button-->
    <div class="app-navbar-item ms-1 ms-md-3">
      <button
        class="chat-toggle-btn"
        title="Messaggi"
        @click="toggleChat"
      >
        <KTIcon icon-name="message-text-2" icon-class="fs-3 text-primary" />
        <span v-if="chatStore.totalUnread > 0" class="chat-badge">
          {{ chatStore.totalUnread > 99 ? '99+' : chatStore.totalUnread }}
        </span>
      </button>
    </div>
    <!--end::Chat button-->

    <!--begin::User menu-->
    <div class="app-navbar-item ms-1 ms-md-4" id="kt_header_user_menu_toggle">
      <!--begin::Menu wrapper-->
      <div
        class="cursor-pointer d-flex align-items-center justify-content-center w-35px h-35px rounded-circle bg-light-primary"
        data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
      >
        <KTIcon icon-name="user" icon-class="fs-3" />
      </div>
      <KTUserMenu />
      <!--end::Menu wrapper-->
    </div>
    <!--end::User menu-->
  </div>
  <!--end::Navbar-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onMounted, onUnmounted } from "vue";
import KTSearch from "@/layouts/main-layout/search/Search.vue";
import KTUserMenu from "@/layouts/main-layout/menus/UserAccountMenu.vue";
import KTThemeModeSwitcher from "@/layouts/main-layout/theme-mode/ThemeModeSwitcher.vue";
import { ThemeModeComponent } from "@/assets/ts/layout";
import { useThemeStore } from "@/stores/theme";
import { useChatStore } from "@/stores/chat";

export default defineComponent({
  name: "header-navbar",
  components: {
    KTSearch,
    KTUserMenu,
    KTThemeModeSwitcher,
  },
  setup() {
    const themeStore = useThemeStore();
    const chatStore = useChatStore();

    const themeMode = computed(() => {
      if (themeStore.mode === "system") {
        return ThemeModeComponent.getSystemMode();
      }
      return themeStore.mode;
    });

    function toggleChat() {
      if (chatStore.isPanelOpen) {
        chatStore.closePanel();
      } else {
        chatStore.isPanelOpen = true;
        if (!chatStore.conversations.length) {
          chatStore.loadConversations();
        }
      }
    }

    onMounted(async () => {
      await chatStore.initHub();
      await chatStore.loadConversations();
    });

    onUnmounted(() => {
      chatStore.disconnectHub();
    });

    return {
      themeMode,
      getAssetPath,
      chatStore,
      toggleChat,
    };
  },
});
</script>
