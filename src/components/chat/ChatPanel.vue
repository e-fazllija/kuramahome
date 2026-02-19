<template>
  <!-- Overlay -->
  <div
    class="chat-overlay"
    :class="{ visible: chatStore.isPanelOpen }"
    @click="chatStore.closePanel()"
  ></div>

  <!-- Sliding panel -->
  <div class="chat-panel" :class="{ open: chatStore.isPanelOpen }">
    <ConversationList
      @select="handleSelectConversation"
      @new-conversation="showNewConvModal = true"
    />
    <ChatWindow />
  </div>

  <!-- New conversation modal -->
  <NewConversationModal
    :visible="showNewConvModal"
    @close="showNewConvModal = false"
    @created="handleConversationCreated"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useChatStore } from "@/stores/chat";
import ConversationList from "@/components/chat/ConversationList.vue";
import ChatWindow from "@/components/chat/ChatWindow.vue";
import NewConversationModal from "@/components/chat/NewConversationModal.vue";
import type { ConversationDto } from "@/core/data/chat";

export default defineComponent({
  name: "ChatPanel",
  components: { ConversationList, ChatWindow, NewConversationModal },
  setup() {
    const chatStore = useChatStore();
    const showNewConvModal = ref(false);

    async function handleSelectConversation(id: number) {
      await chatStore.openConversation(id);
    }

    async function handleConversationCreated(conv: ConversationDto) {
      await chatStore.openConversation(conv.Id);
    }

    return { chatStore, showNewConvModal, handleSelectConversation, handleConversationCreated };
  },
});
</script>
