import { useEffect, useMemo, useState } from "react";

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
import { useNavigate } from "react-router-dom";

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

    const navigator = useNavigate();

    const accessToken = useAppSelector(
        (state) => state.auth.accessToken
    );

    const currentUserId = useAppSelector(
        (state) => state.auth.user?.id
    );

    const [conversationId, setConversationId] =
        useState<number | null>(null);

    const [messageText, setMessageText] =
        useState("");

    const [connection, setConnection] =
        useState<HubConnection | null>(null);

    const [isConnected, setIsConnected] =
        useState(false);

    const [isSending, setIsSending] =
        useState(false);

    const [realtimeMessages, setRealtimeMessages] =
        useState<ChatMessage[]>([]);

    
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

        const createConversationHandler =
            async () => {

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

   
    const {
        data: messages = [],
        isLoading: isLoadingMessages,
        isError: isMessagesError,
    } = useGetMessagesQuery(
        conversationId!,
        {
            skip:
                conversationId === null ||
                conversationId <= 0,

        
            refetchOnMountOrArgChange: true,
        }
    );

    useEffect(() => {

        if (!accessToken) {
            navigator("/login")
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
                   "https://www.airbnb.somee.com/api/hubs/chat",
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
                "CHAT WINDOW - MESSAGE RECEIVED"
            );

            console.log(
                "MESSAGE:",
                message
            );

            console.log(
                "CURRENT CONVERSATION:",
                conversationId
            );

            console.log(
                "================================"
            );

            if (
                message.conversationId !==
                conversationId
            ) {

                console.log(
                    "Message başqa conversation-a aiddir"
                );

                return;
            }

            setRealtimeMessages(
                (previousMessages) => {

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

    }, [
        accessToken,
        conversationId,
    ]);

   
    useEffect(() => {

        setRealtimeMessages([]);

    }, [conversationId]);

    const allMessages =
        useMemo(() => {

            const historyMessages =
                messages as ChatMessage[];

            const result = [
                ...historyMessages,
            ];

            realtimeMessages.forEach(
                (realtimeMessage) => {

                    const exists =
                        result.some(
                            (message) =>
                                message.id ===
                                realtimeMessage.id
                        );

                    if (!exists) {

                        result.push(
                            realtimeMessage
                        );

                    }

                }
            );

            return result.sort(
                (a, b) =>
                    a.id - b.id
            );

        }, [
            messages,
            realtimeMessages,
        ]);

   
    const sendMessage =
        async () => {

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
                    "CHAT WINDOW - MESSAGE SENDING"
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

    if (isCreatingConversation) {

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

        <div className="flex h-[600px] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border bg-white shadow-sm">


            <div className="flex items-center justify-between border-b px-5 py-4">

                <div>

                    <h2 className="font-semibold text-gray-900">
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
                            ● Online
                        </span>

                    ) : (

                        <span className="text-red-500">
                            ● Offline
                        </span>

                    )}

                </div>

            </div>

            <div className="flex-1 overflow-y-auto bg-gray-50 p-5">

                {isLoadingMessages ? (

                    <div className="flex h-full items-center justify-center">

                        <p className="text-gray-400">
                            Mesajlar yüklənir...
                        </p>

                    </div>

                ) : isMessagesError ? (

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
    Number(message.senderId) === currentUserId;
                                return (

                                    <div
                                        key={message.id}
                                        className={`flex ${isMine
                                                ? "justify-end"
                                                : "justify-start"
                                            }`}
                                    >

                                        <div
                                            className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${isMine
                                                    ? "rounded-br-md bg-black text-white"
                                                    : "rounded-bl-md bg-white text-gray-900 shadow-sm"
                                                }`}
                                        >

                                            <p className="break-words text-sm">
                                                {message.content}
                                            </p>

                                            {message.isRead &&
                                                isMine && (

                                                    <p className="mt-1 text-right text-[10px] text-gray-300">
                                                        Read
                                                    </p>

                                                )}

                                        </div>

                                    </div>

                                );

                            }
                        )}

                    </div>

                )}

            </div>

            <div className="border-t bg-white p-4">

                <div className="flex gap-2">

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
                        className="flex-1 rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-black"
                    />

                    <button
                        type="button"
                        onClick={sendMessage}
                        disabled={
                            !isConnected ||
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
}