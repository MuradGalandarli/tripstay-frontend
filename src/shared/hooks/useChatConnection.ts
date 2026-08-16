import { useEffect } from "react";

import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

import {
  createChatConnection,
  clearChatConnection,
} from "../../features/chat/signalr/chatConnection";

import {
  addMessage,
  setConnectionStatus,
} from "../../features/chat/slice/chatSlice";

import type { ChatMessage } from "../../features/chat/types/chatTypes";

export const useChatConnection = () => {
  const dispatch = useAppDispatch();

  const accessToken = useAppSelector(
    (state) => state.auth.token
  );

  useEffect(() => {
    console.log(
      "CHAT TOKEN EXISTS:",
      !!accessToken
    );

    if (!accessToken) {
      console.log(
        "CHAT: TOKEN YOXDUR"
      );

      return;
    }

    console.log(
      "CHAT: CONNECTION YARADILIR"
    );

    const connection =
      createChatConnection(accessToken);

    const receiveMessage = (
      message: ChatMessage
    ) => {
      console.log(
        "RECEIVED MESSAGE:",
        message
      );

      dispatch(
        addMessage(message)
      );
    };

    connection.on(
      "ReceiveMessage",
      receiveMessage
    );

    const start = async () => {
      try {
        console.log(
          "CHAT CONNECTION STATE:",
          connection.state
        );

        if (
          connection.state ===
          "Disconnected"
        ) {
          await connection.start();

          console.log(
            "CHAT SIGNALR CONNECTED"
          );

          dispatch(
            setConnectionStatus(true)
          );
        }
      } catch (error) {
        console.error(
          "CHAT SIGNALR ERROR:",
          error
        );

        dispatch(
          setConnectionStatus(false)
        );
      }
    };

    start();

    return () => {
      connection.off(
        "ReceiveMessage",
        receiveMessage
      );

      if (
        connection.state !==
        "Disconnected"
      ) {
        connection.stop();
      }

      clearChatConnection();

      dispatch(
        setConnectionStatus(false)
      );
    };
  }, [
    accessToken,
    dispatch,
  ]);
};