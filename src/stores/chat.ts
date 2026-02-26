import { ref, computed } from "vue";
import { defineStore } from "pinia";
import {
  getConversations,
  getMessages,
  getContacts,
  getUnreadCount,
  createConversation,
  markRead,
  type ConversationDto,
  type MessageDto,
  type ContactDto,
  type CreateConversationDto,
  type MarkReadDto,
} from "@/core/data/chat";
import { chatHubService } from "@/core/services/ChatHubService";
import { useAuthStore } from "@/stores/auth";

export const useChatStore = defineStore("chat", () => {
  const conversations = ref<ConversationDto[]>([]);
  const activeConversationId = ref<number | null>(null);
  const messagesByConversation = ref<Record<number, MessageDto[]>>({});
  const contacts = ref<ContactDto[]>([]);
  const totalUnread = ref(0);
  const isLoading = ref(false);
  const isPanelOpen = ref(false);
  const isHubConnected = ref(false);

  const authStore = useAuthStore();

  const activeConversation = computed(() =>
    conversations.value.find((c) => c.Id === activeConversationId.value) ?? null
  );

  const activeMessages = computed(() =>
    activeConversationId.value
      ? messagesByConversation.value[activeConversationId.value] ?? []
      : []
  );

  const sortedConversations = computed(() =>
    [...conversations.value].sort(
      (a, b) => new Date(b.UpdateDate).getTime() - new Date(a.UpdateDate).getTime()
    )
  );

  async function initHub() {
    if (isHubConnected.value) return;
    await chatHubService.start();
    isHubConnected.value = chatHubService.isConnected;

    chatHubService.onReceiveMessage((message) => {
      addMessageToConversation(message);
      updateConversationLastMessage(message);
      if (message.SenderId !== authStore.user.Id) {
        updateUnreadCount(message.ConversationId, 1);
      }
    });

    chatHubService.onNewConversation((conversation) => {
      const existing = conversations.value.find((c) => c.Id === conversation.Id);
      if (!existing) {
        conversations.value.unshift(conversation);
      }
    });

    chatHubService.onMessagesRead(({ ConversationId, LastMessageId, UserId }) => {
      const msgs = messagesByConversation.value[ConversationId];
      if (!msgs) return;
      msgs.forEach((m) => {
        if (m.Id <= LastMessageId && !m.ReadByUserIds.includes(UserId)) {
          m.ReadByUserIds.push(UserId);
        }
      });
      if (UserId === authStore.user.Id) {
        const conv = conversations.value.find((c) => c.Id === ConversationId);
        if (conv) conv.UnreadCount = 0;
        recalcTotalUnread();
      }
    });

    chatHubService.onConversationUpdated(({ ConversationId, LastMessage }) => {
      const conv = conversations.value.find((c) => c.Id === ConversationId);
      if (conv) {
        conv.LastMessage = LastMessage;
        conv.UpdateDate = LastMessage.CreationDate;
      }
    });
  }

  async function loadConversations() {
    try {
      isLoading.value = true;
      conversations.value = await getConversations();
      recalcTotalUnread();
    } finally {
      isLoading.value = false;
    }
  }

  async function loadMessages(conversationId: number) {
    try {
      isLoading.value = true;
      const msgs = await getMessages(conversationId);
      messagesByConversation.value[conversationId] = msgs;
    } finally {
      isLoading.value = false;
    }
  }

  async function loadContacts() {
    contacts.value = await getContacts();
  }

  async function openConversation(conversationId: number) {
    activeConversationId.value = conversationId;
    isPanelOpen.value = true;

    if (!messagesByConversation.value[conversationId]) {
      await loadMessages(conversationId);
    }

    const conv = conversations.value.find((c) => c.Id === conversationId);
    if (conv && conv.UnreadCount > 0) {
      const msgs = messagesByConversation.value[conversationId];
      if (msgs && msgs.length > 0) {
        const lastMsg = msgs[msgs.length - 1];
        await markAsRead({ ConversationId: conversationId, LastMessageId: lastMsg.Id });
      }
    }
  }

  async function sendMessage(conversationId: number, content: string) {
    const dto = { ConversationId: conversationId, Content: content, Type: 1 };

    // Aggiunta ottimistica: mostra il messaggio subito, prima della risposta del server
    const tempMsg: MessageDto = {
      Id: Date.now(), // ID temporaneo, sarà sovrascritto dall'echo del server
      ConversationId: conversationId,
      SenderId: authStore.user.Id,
      SenderFirstName: authStore.user.FirstName,
      SenderLastName: authStore.user.LastName,
      SenderColor: authStore.user.Color ?? "#666",
      Content: content,
      Type: 1,
      IsDeleted: false,
      CreationDate: new Date().toISOString(),
      Attachments: [],
      ReadByUserIds: [authStore.user.Id],
    };
    addMessageToConversation(tempMsg);
    updateConversationLastMessage(tempMsg);

    await chatHubService.sendMessage(dto);
  }

  async function markAsRead(dto: MarkReadDto) {
    await markRead(dto);
    const conv = conversations.value.find((c) => c.Id === dto.ConversationId);
    if (conv) conv.UnreadCount = 0;
    recalcTotalUnread();
  }

  async function startNewConversation(dto: CreateConversationDto): Promise<ConversationDto> {
    const conversation = await createConversation(dto);
    const existing = conversations.value.find((c) => c.Id === conversation.Id);
    if (!existing) {
      conversations.value.unshift(conversation);
    }
    await chatHubService.joinConversation(conversation.Id);
    return conversation;
  }

  function addMessageToConversation(message: MessageDto) {
    if (!messagesByConversation.value[message.ConversationId]) {
      messagesByConversation.value[message.ConversationId] = [];
    }
    const msgs = messagesByConversation.value[message.ConversationId];

    // Se arriva l'echo dal server per un messaggio già aggiunto ottimisticamente,
    // sostituiamo quello temporaneo (Id > 1e12) con quello reale che ha lo stesso contenuto e sender
    const tempIndex = msgs.findIndex(
      (m) => m.Id > 1e12 && m.SenderId === message.SenderId && m.Content === message.Content
    );
    if (tempIndex !== -1) {
      msgs.splice(tempIndex, 1, message);
      return;
    }

    const alreadyExists = msgs.some((m) => m.Id === message.Id);
    if (!alreadyExists) {
      msgs.push(message);
    }
  }

  function updateConversationLastMessage(message: MessageDto) {
    const conv = conversations.value.find((c) => c.Id === message.ConversationId);
    if (conv) {
      conv.LastMessage = message;
      conv.UpdateDate = message.CreationDate;
    }
  }

  function updateUnreadCount(conversationId: number, delta: number) {
    if (activeConversationId.value === conversationId && isPanelOpen.value) return;
    const conv = conversations.value.find((c) => c.Id === conversationId);
    if (conv) {
      conv.UnreadCount = (conv.UnreadCount ?? 0) + delta;
      recalcTotalUnread();
    }
  }

  function recalcTotalUnread() {
    totalUnread.value = conversations.value.reduce((sum, c) => sum + (c.UnreadCount ?? 0), 0);
  }

  function closePanel() {
    isPanelOpen.value = false;
    activeConversationId.value = null;
  }

  async function disconnectHub() {
    await chatHubService.stop();
    isHubConnected.value = false;
  }

  return {
    conversations,
    activeConversationId,
    messagesByConversation,
    contacts,
    totalUnread,
    isLoading,
    isPanelOpen,
    isHubConnected,
    activeConversation,
    activeMessages,
    sortedConversations,
    initHub,
    loadConversations,
    loadMessages,
    loadContacts,
    openConversation,
    sendMessage,
    markAsRead,
    startNewConversation,
    closePanel,
    disconnectHub,
  };
});
