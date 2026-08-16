import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

let chatConnection: HubConnection | null = null;

export const createChatConnection = (
  accessToken: string
): HubConnection => {

  if (chatConnection) {
    return chatConnection;
  }

  chatConnection =
    new HubConnectionBuilder()
      .withUrl(
        "https://localhost:7016/hubs/chat",
        {
          accessTokenFactory: () => {
            console.log(
              "SignalR token göndərilir"
            );

            return accessToken;
          },
        }
      )
      .withAutomaticReconnect()
      .configureLogging(
        LogLevel.Information
      )
      .build();

  return chatConnection;
};

export const getChatConnection =
  (): HubConnection | null => {
    return chatConnection;
  };

export const clearChatConnection =
  (): void => {
    chatConnection = null;
  };