export interface ChatMessage {
  id: number;
  conversationId: number;
  senderId: string;
  content: string;
  isRead: boolean;
  readAt: string | null;
}