import { useEffect, useState } from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

import { useParams } from "react-router-dom";

import { useAppSelector } from "../../../shared/hooks/useAppSelector";

import {
  useGetMessagesQuery,
} from "../api/chatApi";

interface Message {
  id: number;
  conversationId: number;
  senderId: string;
  content: string;
  isRead: boolean;
  readAt?: string | null;
}

const MessageWindow = () => {

  const { conversationId } = useParams<{
    conversationId: string;
  }>();

  const currentConversationId =
    Number(conversationId);

  const accessToken = useAppSelector(
    (state) => state.auth.accessToken
  );

  const currentUserId = useAppSelector(
    (state) => state.auth.user?.id
  );

 
  const [connection, setConnection] =
    useState<HubConnection | null>(null);

  const [messageText, setMessageText] =
    useState("");

  const [realtimeMessages, setRealtimeMessages] =
    useState<Message[]>([]);

  const [isSending, setIsSending] =
    useState(false);

  if (!currentConversationId) {

    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">
          Conversation tapılmadı.
        </p>
      </div>
    );

  }

  const {
    data: messages = [],
    isLoading,
    isError,
  } = useGetMessagesQuery(
    currentConversationId
  );

 
  useEffect(() => {

    if (!accessToken) {

      console.log(
        "SignalR: access token yoxdur"
      );

      return;
    }

    if (!currentConversationId) {
      return;
    }

    console.log(
      "SIGNALR CONNECTION YARADILIR"
    );

    console.log(
      "Conversation ID:",
      currentConversationId
    );

    const newConnection =
      new HubConnectionBuilder()
        .withUrl(
          "https://localhost:7016/hubs/chat",
          {
            accessTokenFactory: () =>
              accessToken,
          }
        )
        .withAutomaticReconnect()
        .configureLogging(
          LogLevel.Information
        )
        .build();

   
    newConnection.on(
      "ReceiveMessage",
      (message: Message) => {

        console.log(
          "================================"
        );

        console.log(
          "MESSAGE RECEIVED"
        );

        console.log(
          "MESSAGE:",
          message
        );

        console.log(
          "CURRENT CONVERSATION:",
          currentConversationId
        );

        console.log(
          "================================"
        );

   
        if (
          message.conversationId !==
          currentConversationId
        ) {

          console.log(
            "Bu mesaj başqa conversation-a aiddir."
          );

          return;
        }

        setRealtimeMessages(
          (previousMessages) => {

            const exists =
              previousMessages.some(
                (item) =>
                  item.id === message.id
              );

            if (exists) {
              return previousMessages;
            }

            return [
              ...previousMessages,
              message,
            ];

          }
        );

      }
    );

    const startConnection = async () => {

      try {

        console.log(
          "SIGNALR CONNECTION STARTING..."
        );

        await newConnection.start();

        console.log(
          "================================"
        );

        console.log(
          "SIGNALR CONNECTED"
        );

        console.log(
          "Conversation:",
          currentConversationId
        );

        console.log(
          "================================"
        );

        setConnection(
          newConnection
        );

      } catch (error) {

        console.error(
          "SIGNALR CONNECTION ERROR:",
          error
        );

      }

    };

    startConnection();

    newConnection.onreconnecting(
      (error) => {

        console.log(
          "SIGNALR RECONNECTING:",
          error
        );

        setConnection(null);

      }
    );

   
    newConnection.onreconnected(
      (connectionId) => {

        console.log(
          "SIGNALR RECONNECTED:",
          connectionId
        );

        setConnection(
          newConnection
        );

      }
    );

    newConnection.onclose(
      (error) => {

        console.log(
          "SIGNALR CONNECTION CLOSED:",
          error
        );

        setConnection(null);

      }
    );

  
    return () => {

      console.log(
        "SIGNALR CLEANUP"
      );

      newConnection.stop();

      setConnection(null);

    };

  }, [
    accessToken,
    currentConversationId,
  ]);

  
  const sendMessage = async () => {

    if (!messageText.trim()) {
      return;
    }

    if (!connection) {

      console.log(
        "SignalR connection yoxdur"
      );

      return;
    }

    if (
      connection.state !== "Connected"
    ) {

      console.log(
        "SignalR connected deyil:",
        connection.state
      );

      return;
    }

    try {

      setIsSending(true);

      const content =
        messageText.trim();

      console.log(
        "================================"
      );

      console.log(
        "SENDING MESSAGE"
      );

      console.log(
        "Conversation ID:",
        currentConversationId
      );

      console.log(
        "Content:",
        content
      );

      console.log(
        "================================"
      );

     

      await connection.invoke(
        "SendMessage",
        currentConversationId,
        content
      );

      console.log(
        "MESSAGE SENT SUCCESSFULLY"
      );

      setMessageText("");

    } catch (error) {

      console.error(
        "MESSAGE SEND ERROR:",
        error
      );

    } finally {

      setIsSending(false);

    }

  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {

    if (event.key === "Enter") {

      event.preventDefault();

      sendMessage();

    }

  };

  const allMessages: Message[] = [
    ...messages,
    ...realtimeMessages.filter(
      (realtimeMessage) =>
        !messages.some(
          (message) =>
            message.id ===
            realtimeMessage.id
        )
    ),
  ];

  
  return (

    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">

      <div className="flex h-[650px] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">

      
        <div className="flex items-center justify-between border-b px-6 py-4">

          <div>

            <h2 className="text-lg font-semibold">
              Mesajlar
            </h2>

            <p className="text-xs text-gray-400">
              Conversation #{currentConversationId}
            </p>

          </div>

          <div>

            {connection ? (

              <span className="text-sm text-green-500">
                ● Online
              </span>

            ) : (

              <span className="text-sm text-gray-400">
                ● Connecting...
              </span>

            )}

          </div>

        </div>

      
        <div className="flex-1 overflow-y-auto bg-gray-50 p-6">

          {isLoading ? (

            <div className="flex h-full items-center justify-center">

              <p className="text-gray-400">
                Mesajlar yüklənir...
              </p>

            </div>

          ) : isError ? (

            <div className="flex h-full items-center justify-center">

              <p className="text-red-500">
                Mesajları yükləmək mümkün olmadı.
              </p>

            </div>

          ) : allMessages.length === 0 ? (

            <div className="flex h-full items-center justify-center">

              <p className="text-gray-400">
                Hələ mesaj yoxdur.
              </p>

            </div>

          ) : (

            <div className="space-y-3">

              {allMessages.map(
                (message) => {

                  const isMine =
                    message.senderId ===
                    currentUserId;

                  return (

                    <div
                      key={message.id}
                      className={`flex ${
                        isMine
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >

                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                          isMine
                            ? "bg-black text-white"
                            : "bg-white text-gray-800 shadow-sm"
                        }`}
                      >

                        <p className="text-sm">
                          {message.content}
                        </p>

                        <div
                          className={`mt-1 text-right text-[10px] ${
                            isMine
                              ? "text-gray-300"
                              : "text-gray-400"
                          }`}
                        >

                          {message.isRead
                            ? "✓✓"
                            : "✓"}

                        </div>

                      </div>

                    </div>

                  );

                }
              )}

            </div>

          )}

        </div>

        <div className="flex gap-3 border-t bg-white p-4">

          <input
            type="text"
            value={messageText}
            onChange={(event) =>
              setMessageText(
                event.target.value
              )
            }
            onKeyDown={
              handleKeyDown
            }
            disabled={!connection}
            placeholder={
              connection
                ? "Mesaj yaz..."
                : "Bağlantı gözlənilir..."
            }
            className="flex-1 rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-black"
          />

          <button
            type="button"
            onClick={sendMessage}
            disabled={
              !connection ||
              !messageText.trim() ||
              isSending
            }
            className="rounded-xl bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
          >

            {isSending
              ? "Göndərilir..."
              : "Göndər"}

          </button>

        </div>

      </div>

    </div>

  );
};

export default MessageWindow;