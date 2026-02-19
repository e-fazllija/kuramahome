import * as signalR from "@microsoft/signalr";
import { getToken } from "@/core/services/JwtService";
import ApiService from "@/core/services/ApiService";
import type { MessageDto, MarkReadDto, SendMessageDto, ConversationDto } from "@/core/data/chat";

function getHubUrl(): string {
  // ApiService baseURL is e.g. "https://localhost:7267/api/"
  // The hub lives at root level: "https://localhost:7267/hubs/chat"
  const base = ApiService.axiosInstance?.defaults?.baseURL ?? "";
  return base.replace(/\/api\/?$/, "") + "/hubs/chat";
}

type MessageHandler = (message: MessageDto) => void;
type ConversationUpdatedHandler = (data: { ConversationId: number; LastMessage: MessageDto }) => void;
type MessagesReadHandler = (data: { UserId: string; ConversationId: number; LastMessageId: number }) => void;
type NewConversationHandler = (conversation: ConversationDto) => void;
type JoinConversationGroupHandler = (conversationId: number) => void;

class ChatHubService {
  private connection: signalR.HubConnection | null = null;
  private messageHandlers: MessageHandler[] = [];
  private conversationUpdatedHandlers: ConversationUpdatedHandler[] = [];
  private messagesReadHandlers: MessagesReadHandler[] = [];
  private newConversationHandlers: NewConversationHandler[] = [];
  private joinConversationGroupHandlers: JoinConversationGroupHandler[] = [];
  private _isConnected = false;

  public get isConnected(): boolean {
    return this._isConnected;
  }

  async start(): Promise<void> {
    if (this.connection && this._isConnected) return;

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(getHubUrl(), {
        accessTokenFactory: () => getToken() ?? "",
        transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.LongPolling,
      })
      .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
      .configureLogging(signalR.LogLevel.Warning)
      .build();

    this.registerHandlers();

    this.connection.onreconnecting(() => {
      this._isConnected = false;
    });

    this.connection.onreconnected(() => {
      this._isConnected = true;
    });

    this.connection.onclose(() => {
      this._isConnected = false;
    });

    try {
      await this.connection.start();
      this._isConnected = true;
    } catch (err) {
      console.error("Errore connessione SignalR:", err);
      this._isConnected = false;
    }
  }

  async stop(): Promise<void> {
    if (this.connection) {
      await this.connection.stop();
      this._isConnected = false;
    }
  }

  async sendMessage(dto: SendMessageDto): Promise<void> {
    if (!this.connection || !this._isConnected) return;
    await this.connection.invoke("SendMessage", dto);
  }

  async markRead(dto: MarkReadDto): Promise<void> {
    if (!this.connection || !this._isConnected) return;
    await this.connection.invoke("MarkRead", dto);
  }

  async joinConversation(conversationId: number): Promise<void> {
    if (!this.connection || !this._isConnected) return;
    await this.connection.invoke("JoinConversation", conversationId);
  }

  onReceiveMessage(handler: MessageHandler): void {
    this.messageHandlers.push(handler);
  }

  onConversationUpdated(handler: ConversationUpdatedHandler): void {
    this.conversationUpdatedHandlers.push(handler);
  }

  onMessagesRead(handler: MessagesReadHandler): void {
    this.messagesReadHandlers.push(handler);
  }

  onNewConversation(handler: NewConversationHandler): void {
    this.newConversationHandlers.push(handler);
  }

  onJoinConversationGroup(handler: JoinConversationGroupHandler): void {
    this.joinConversationGroupHandlers.push(handler);
  }

  removeAllHandlers(): void {
    this.messageHandlers = [];
    this.conversationUpdatedHandlers = [];
    this.messagesReadHandlers = [];
    this.newConversationHandlers = [];
    this.joinConversationGroupHandlers = [];
  }

  private registerHandlers(): void {
    if (!this.connection) return;

    this.connection.on("ReceiveMessage", (message: MessageDto) => {
      this.messageHandlers.forEach((h) => h(message));
    });

    this.connection.on("ConversationUpdated", (data: { ConversationId: number; LastMessage: MessageDto }) => {
      this.conversationUpdatedHandlers.forEach((h) => h(data));
    });

    this.connection.on("MessagesRead", (data: { UserId: string; ConversationId: number; LastMessageId: number }) => {
      this.messagesReadHandlers.forEach((h) => h(data));
    });

    this.connection.on("NewConversation", (conversation: ConversationDto) => {
      this.newConversationHandlers.forEach((h) => h(conversation));
    });

    this.connection.on("JoinConversationGroup", async (conversationId: number) => {
      await this.joinConversation(conversationId);
      this.joinConversationGroupHandlers.forEach((h) => h(conversationId));
    });
  }
}

export const chatHubService = new ChatHubService();
