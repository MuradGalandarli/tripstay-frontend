import { baseApi } from "../../../shared/api/baseApi";

export interface CreateConversationResponse {
  conversationId: number;
}

export interface MessageDto {
  id: number;
  conversationId: number;
  senderId: string;
  content: string;
  isRead: boolean;
  readAt: string | null;
}

export interface SendMessageRequest {
  conversationId: number;
  content: string;
}

export interface ConversationListDto {
  conversationId: number;
  propertyId: number;
  otherUserId: string;
  otherUserName: string;
}

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createConversation: builder.mutation<
      CreateConversationResponse,
      number
    >({
      query: (propertyId) => ({
        url: "Chat/conversation",
        method: "POST",
        body: {
          propertyId,
        },
      }),
    }),

    getMessages: builder.query<
      MessageDto[],
      number
    >({
      query: (conversationId) => ({
        url: `/Chat/conversation/${conversationId}/messages`,
        method: "GET",
      }),
    }),

    sendMessage: builder.mutation<
      MessageDto,
      SendMessageRequest
    >({
      query: (body) => ({
        url: "/Chat/message",
        method: "POST",
        body,
      }),
    }),

getMyConversations:
  builder.query<
    ConversationListDto[],
    void
  >({
    query: () => ({
      url: "/Chat/conversations",
      method: "GET",
    }),
  }),


  }),
});

export const {
  useCreateConversationMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
  useGetMyConversationsQuery,
} = chatApi;