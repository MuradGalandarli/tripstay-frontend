import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

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

  const accessToken =
    useAppSelector(
      (state) =>
        state.auth.accessToken
    );

  const currentUserId =
    useAppSelector(
      (state) =>
        state.auth.user?.id
    );


  const [
    messageText,
    setMessageText,
  ] = useState("");


  const [
    connection,
    setConnection,
  ] = useState<HubConnection | null>(
    null
  );


  const [
    localMessages,
    setLocalMessages,
  ] = useState<Message[]>([]);


  const messagesEndRef =
    useRef<HTMLDivElement | null>(
      null
    );


  const {
    data: messages = [],
    isLoading,
    isFetching,
    error,
    refetch,
  } =
    useGetMessagesQuery(
      currentConversationId,
      {
        skip:
          !currentConversationId ||
          currentConversationId <= 0,

        refetchOnMountOrArgChange: true,
      }
    );


  useEffect(() => {

    if (
      !currentConversationId ||
      currentConversationId <= 0
    ) {
      return;
    }

    setLocalMessages([]);

    refetch();

  }, [
    currentConversationId,
    refetch,
  ]);


  useEffect(() => {

    if (!messages) {
      return;
    }

    const history =
      messages as Message[];

    setLocalMessages(
      (previousMessages) => {

        const messageMap =
          new Map<number, Message>();


        history.forEach(
          (message) => {

            messageMap.set(
              message.id,
              message
            );

          }
        );


        previousMessages.forEach(
          (message) => {

            if (
              message.conversationId ===
              currentConversationId
            ) {

              messageMap.set(
                message.id,
                message
              );

            }

          }
        );


        return Array.from(
          messageMap.values()
        ).sort(
          (a, b) =>
            a.id - b.id
        );

      }
    );

  }, [
    messages,
    currentConversationId,
  ]);


  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [
    localMessages,
  ]);


  useEffect(() => {

    if (!accessToken) {

      console.log(
        "SignalR: access token yoxdur"
      );

      return;
    }


    if (
      !currentConversationId ||
      currentConversationId <= 0
    ) {

      console.log(
        "SignalR: conversation ID yoxdur"
      );

      return;
    }


    const newConnection =
      new HubConnectionBuilder()
        .withUrl(
          "https://www.airbnb.somee.com/hubs/chat",
          
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


    const receiveMessage =
      (message: Message) => {

        if (
          message.conversationId !==
          currentConversationId
        ) {

          return;
        }


        setLocalMessages(
          (previousMessages) => {

            const exists =
              previousMessages.some(
                (item) =>
                  item.id ===
                  message.id
              );


            if (exists) {

              return previousMessages;

            }


            return [
              ...previousMessages,
              message,
            ].sort(
              (a, b) =>
                a.id - b.id
            );

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

          await newConnection.start();

          console.log(
            "SIGNALR CONNECTED"
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
      () => {

        setConnection(
          null
        );

      }
    );


    newConnection.onreconnected(
      () => {

        setConnection(
          newConnection
        );

      }
    );


    newConnection.onclose(
      () => {

        setConnection(
          null
        );

      }
    );


    return () => {

      newConnection.off(
        "ReceiveMessage",
        receiveMessage
      );


      if (
        newConnection.state !==
        "Disconnected"
      ) {

        newConnection
          .stop()
          .catch(() => {});

      }


      setConnection(
        null
      );

    };

  }, [
    accessToken,
    currentConversationId,
  ]);


  const sendMessage =
    async () => {

      if (
        !currentConversationId
      ) {

        return;
      }


      if (
        !messageText.trim()
      ) {

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
          "SignalR connected deyil"
        );

        return;
      }


      try {

        await connection.invoke(
          "SendMessage",
          currentConversationId,
          messageText.trim()
        );


        setMessageText("");

      } catch (error) {

        console.error(
          "MESSAGE SEND ERROR:",
          error
        );

      }

    };


  const handleKeyDown =
    (
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
    !currentConversationId ||
    currentConversationId <= 0
  ) {

    return (

      <div className="flex min-h-screen items-center justify-center">

        <p className="text-gray-400">
          Conversation seçilməyib.
        </p>

      </div>

    );

  }

  return (

    <div className="min-h-screen w-full bg-gray-50">

  
      <div className="flex min-h-screen w-full items-center justify-center p-6">

    
        <div className="flex h-[600px] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border bg-white shadow-lg">


          <div className="flex items-center justify-between border-b px-5 py-4">

            <div>

              <h2 className="font-semibold text-gray-900">
                Mesajlar
              </h2>

              <p className="text-xs text-gray-400">
                Conversation #{currentConversationId}
              </p>

            </div>


            <div>

              {connection ? (

                <span className="text-xs font-medium text-green-500">
                  ● Online
                </span>

              ) : (

                <span className="text-xs text-gray-400">
                  ● Connecting...
                </span>

              )}

            </div>

          </div>


          <div className="flex-1 overflow-y-auto bg-gray-50 p-5">

            {(
              isLoading ||
              isFetching
            ) ? (

              <div className="flex h-full items-center justify-center">

                <p className="text-sm text-gray-400">
                  Mesajlar yüklənir...
                </p>

              </div>

            ) : error ? (

              <div className="flex h-full items-center justify-center">

                <p className="text-sm text-red-500">
                  Mesajları yükləmək mümkün olmadı.
                </p>

              </div>

            ) : localMessages.length === 0 ? (

              <div className="flex h-full items-center justify-center">

                <p className="text-sm text-gray-400">
                  Hələ mesaj yoxdur.
                </p>

              </div>

            ) : (

              <div className="space-y-3">

                {localMessages.map(
                  (message) => {

                  const isMine =
    Number(message.senderId) === currentUserId;

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
                          className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                            isMine
                              ? "bg-black text-white"
                              : "bg-white text-gray-800 shadow-sm"
                          }`}
                        >

                          <p className="break-words text-sm">
                            {message.content}
                          </p>


                          {message.isRead && (

                            <div
                              className={`mt-1 text-[10px] ${
                                isMine
                                  ? "text-gray-300"
                                  : "text-gray-400"
                              }`}
                            >
                              Read
                            </div>

                          )}

                        </div>

                      </div>

                    );

                  }
                )}


                <div
                  ref={messagesEndRef}
                />

              </div>

            )}

          </div>

          <div className="flex gap-2 border-t bg-white p-4">

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
              disabled={!connection}
              className="flex-1 rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
            />


            <button
              type="button"
              onClick={
                sendMessage
              }
              disabled={
                !connection ||
                !messageText.trim()
              }
              className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Göndər
            </button>

          </div>

        </div>

      </div>

    </div>

  );

};


export default MessageWindow;