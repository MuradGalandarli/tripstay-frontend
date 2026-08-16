import { useEffect, useState } from "react";

import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

import { useAppSelector } from "../../../shared/hooks/useAppSelector";

import {
  useCreateConversationMutation,
  useGetMessagesQuery,
} from "../api/chatApi";

interface ChatWindowProps {
  propertyId: number;
}

interface ChatMessage {
  id: number;
  conversationId: number;
  senderId: string;
  content: string;
  isRead: boolean;
  readAt: string | null;
}

export default function ChatWindow({
  propertyId,
}: ChatWindowProps) {

 
  const accessToken = useAppSelector(
    (state) => state.auth.accessToken
  );

  const currentUserId = useAppSelector(
    (state) => state.auth.user?.id
  );

 
  const [
    conversationId,
    setConversationId,
  ] = useState<number | null>(null);

  const [
    messageText,
    setMessageText,
  ] = useState("");

  const [
    connection,
    setConnection,
  ] = useState<HubConnection | null>(null);

  const [
    isConnected,
    setIsConnected,
  ] = useState(false);

  const [
    isSending,
    setIsSending,
  ] = useState(false);

  
  const [
    realtimeMessages,
    setRealtimeMessages,
  ] = useState<ChatMessage[]>([]);

  
  const [
    createConversation,
    {
      isLoading: isCreatingConversation,
      error: conversationError,
    },
  ] = useCreateConversationMutation();

  
  useEffect(() => {
    if (!propertyId) {
      return;
    }

    const createConversationHandler = async () => {
      try {
        console.log(
          "Creating conversation..."
        );

        const response =
          await createConversation(
            propertyId
          ).unwrap();

        console.log(
          "Conversation created:",
          response
        );

        setConversationId(
          response.conversationId
        );

      } catch (error) {
        console.error(
          "Conversation creation error:",
          error
        );
      }
    };

    createConversationHandler();

  }, [
    propertyId,
    createConversation,
  ]);

  useEffect(() => {

    if (!accessToken) {
      console.log(
        "SIGNALR: access token yoxdur"
      );

      return;
    }

    console.log(
      "SIGNALR: connection yaradılır"
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

   
    const receiveMessage = (
      message: ChatMessage
    ) => {

      console.log(
        "================================"
      );

      console.log(
        "MESSAGE RECEIVED FROM SERVER"
      );

      console.log(
        "MESSAGE:",
        message
      );

      console.log(
        "================================"
      );

   
      if (
        message.conversationId !==
        conversationId
      ) {
        console.log(
          "Message başqa conversation-a aiddir:",
          message.conversationId
        );

        return;
      }

  
      setRealtimeMessages(
        (previousMessages) => {

          // Eyni mesaj iki dəfə gəlməsin
          const alreadyExists =
            previousMessages.some(
              (item) =>
                item.id === message.id
            );

          if (alreadyExists) {
            return previousMessages;
          }

          return [
            ...previousMessages,
            message,
          ];
        }
      );
    };

    newConnection.on(
      "ReceiveMessage",
      receiveMessage
    );

 
    const startConnection =
      async () => {

        try {

          console.log(
            "SIGNALR CONNECTION STARTING..."
          );

          await newConnection.start();

          console.log(
            "SIGNALR CONNECTED"
          );

          setConnection(
            newConnection
          );

          setIsConnected(true);

        } catch (error) {

          console.error(
            "SIGNALR CONNECTION ERROR:",
            error
          );

          setConnection(null);
          setIsConnected(false);
        }
      };

    startConnection();

 
    newConnection.onreconnecting(
      (error) => {

        console.log(
          "SIGNALR RECONNECTING:",
          error
        );

        setIsConnected(false);
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

        setIsConnected(true);
      }
    );

  
    newConnection.onclose(
      (error) => {

        console.log(
          "SIGNALR CONNECTION CLOSED:",
          error
        );

        setConnection(null);
        setIsConnected(false);
      }
    );

  
    return () => {

      console.log(
        "SIGNALR CLEANUP"
      );

      newConnection.off(
        "ReceiveMessage",
        receiveMessage
      );

      if (
        newConnection.state !==
        "Disconnected"
      ) {
        newConnection.stop();
      }

      setConnection(null);
      setIsConnected(false);
    };

  }, [accessToken, conversationId]);

 
  const {
    data: messages = [],
    isLoading: isLoadingMessages,
  } =
    useGetMessagesQuery(
      conversationId!,
      {
        skip:
          conversationId === null,
      }
    );

 
  const allMessages: ChatMessage[] = [
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

 
  const sendMessage = async () => {

    if (!conversationId) {

      console.log(
        "Conversation ID yoxdur"
      );

      return;
    }

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
      connection.state !==
      "Connected"
    ) {

      console.log(
        "SignalR connected deyil:",
        connection.state
      );

      return;
    }

    try {

      setIsSending(true);

      console.log(
        "================================"
      );

      console.log(
        "MESSAGE SENDING"
      );

      console.log(
        "Conversation:",
        conversationId
      );

      console.log(
        "Content:",
        messageText.trim()
      );

      console.log(
        "================================"
      );

     
      await connection.invoke(
        "SendMessage",
        conversationId,
        messageText.trim()
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

    if (
      event.key === "Enter"
    ) {

      event.preventDefault();

      sendMessage();
    }
  };


  if (
    isCreatingConversation
  ) {

    return (
      <div className="p-6">
        Conversation yaradılır...
      </div>
    );
  }

 
  if (conversationError) {

    return (
      <div className="p-6 text-red-500">
        Conversation yaratmaq mümkün olmadı.
      </div>
    );
  }

 
  return (

    <div className="flex h-[600px] w-full max-w-2xl flex-col rounded-xl border bg-white">

 
      <div className="flex items-center justify-between border-b p-4">

        <div>

          <h2 className="font-semibold">
            Chat
          </h2>

          {conversationId && (

            <p className="text-xs text-gray-400">
              Conversation #{conversationId}
            </p>

          )}

        </div>


        <div className="text-xs">

          {isConnected ? (

            <span className="text-green-500">
              ● Connected
            </span>

          ) : (

            <span className="text-red-500">
              ● Not connected
            </span>

          )}

        </div>

      </div>

    
      <div className="flex-1 overflow-y-auto p-4">

        {isLoadingMessages ? (

          <div className="text-center text-gray-400">
            Mesajlar yüklənir...
          </div>

        ) : allMessages.length === 0 ? (

          <div className="flex h-full items-center justify-center text-gray-400">
            Hələ mesaj yoxdur
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
                      className={`max-w-[70%] rounded-lg p-3 ${
                        isMine
                          ? "bg-black text-white"
                          : "bg-gray-100 text-black"
                      }`}
                    >

                      <p>
                        {message.content}
                      </p>

                      {message.isRead && (

                        <span
                          className={`text-xs ${
                            isMine
                              ? "text-gray-300"
                              : "text-gray-400"
                          }`}
                        >
                          Read
                        </span>

                      )}

                    </div>

                  </div>

                );
              }
            )}

          </div>

        )}

      </div>

      <div className="flex gap-2 border-t p-4">

        <input
          value={messageText}
          onChange={(event) =>
            setMessageText(
              event.target.value
            )
          }
          onKeyDown={
            handleKeyDown
          }
          placeholder="Mesaj yaz..."
          disabled={!isConnected}
          className="flex-1 rounded-lg border px-4 py-2 outline-none focus:ring-2"
        />

        <button
          type="button"
          onClick={sendMessage}
          disabled={
            !isConnected ||
            !messageText.trim() ||
            isSending
          }
          className="rounded-lg bg-black px-5 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >

          {isSending
            ? "Göndərilir..."
            : "Göndər"}

        </button>

      </div>

    </div>
  );
}