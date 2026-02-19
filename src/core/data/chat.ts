import ApiService from "@/core/services/ApiService";
import { useAuthStore } from "@/stores/auth";

const store = useAuthStore();

export interface ConversationDto {
  Id: number;
  Title?: string;
  Type: number; // 1=Direct, 2=Broadcast, 3=System
  CreatedByUserId: string;
  CreationDate: string;
  UpdateDate: string;
  LastMessage?: MessageDto;
  UnreadCount: number;
  Participants: ParticipantDto[];
}

export interface ParticipantDto {
  UserId: string;
  FirstName: string;
  LastName: string;
  Role: string;
  Color: string;
  IsMonitor: boolean;
}

export interface MessageDto {
  Id: number;
  ConversationId: number;
  SenderId: string;
  SenderFirstName: string;
  SenderLastName: string;
  SenderColor: string;
  Content: string;
  Type: number;
  IsDeleted: boolean;
  CreationDate: string;
  Attachments: MessageAttachmentDto[];
  ReadByUserIds: string[];
}

export interface MessageAttachmentDto {
  Id: number;
  FileName: string;
  FileUrl: string;
  FileSize: number;
  ContentType: string;
}

export interface ContactDto {
  Id: string;
  FirstName: string;
  LastName: string;
  Role: string;
  Color: string;
  CompanyName?: string;
}

export interface CreateConversationDto {
  Title?: string;
  Type: number;
  ParticipantIds: string[];
  InitialMessage?: string;
}

export interface SendMessageDto {
  ConversationId: number;
  Content: string;
  Type?: number;
}

export interface MarkReadDto {
  ConversationId: number;
  LastMessageId: number;
}

export const getConversations = (): Promise<ConversationDto[]> =>
  ApiService.get("Conversations/GetAll", "")
    .then(({ data }) => data as ConversationDto[])
    .catch(({ response }) => {
      store.setError(response?.data?.Message, response?.status);
      throw new Error(response?.data?.Message);
    });

export const getConversationById = (id: number): Promise<ConversationDto> =>
  ApiService.get(`Conversations/GetById?id=${id}`, "")
    .then(({ data }) => data as ConversationDto)
    .catch(({ response }) => {
      store.setError(response?.data?.Message, response?.status);
      throw new Error(response?.data?.Message);
    });

export const createConversation = (dto: CreateConversationDto): Promise<ConversationDto> =>
  ApiService.post("Conversations/Create", dto)
    .then(({ data }) => data as ConversationDto)
    .catch(({ response }) => {
      store.setError(response?.data?.Message, response?.status);
      throw new Error(response?.data?.Message);
    });

export const getMessages = (
  conversationId: number,
  page = 1,
  pageSize = 30
): Promise<MessageDto[]> =>
  ApiService.get(
    `Conversations/GetMessages?conversationId=${conversationId}&page=${page}&pageSize=${pageSize}`,
    ""
  )
    .then(({ data }) => data as MessageDto[])
    .catch(({ response }) => {
      store.setError(response?.data?.Message, response?.status);
      throw new Error(response?.data?.Message);
    });

export const getContacts = (): Promise<ContactDto[]> =>
  ApiService.get("Conversations/GetContacts", "")
    .then(({ data }) => data as ContactDto[])
    .catch(({ response }) => {
      store.setError(response?.data?.Message, response?.status);
      throw new Error(response?.data?.Message);
    });

export const getMonitoringConversations = (): Promise<ConversationDto[]> =>
  ApiService.get("Conversations/GetMonitoring", "")
    .then(({ data }) => data as ConversationDto[])
    .catch(({ response }) => {
      store.setError(response?.data?.Message, response?.status);
      throw new Error(response?.data?.Message);
    });

export const getUnreadCount = (): Promise<number> =>
  ApiService.get("Conversations/GetUnreadCount", "")
    .then(({ data }) => data as number)
    .catch(() => 0);

export const markRead = (dto: MarkReadDto): Promise<void> =>
  ApiService.post("Conversations/MarkRead", dto)
    .then(() => undefined)
    .catch(({ response }) => {
      store.setError(response?.data?.Message, response?.status);
      throw new Error(response?.data?.Message);
    });
