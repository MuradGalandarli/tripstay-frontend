import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type { ChatMessage } from "../types/chatTypes";

interface ChatState {
  messages: ChatMessage[];
  isConnected: boolean;
}

const initialState: ChatState = {
  messages: [],
  isConnected: false,
};

const chatSlice = createSlice({
  name: "chat",

  initialState,

  reducers: {
    addMessage: (
      state,
      action: PayloadAction<ChatMessage>
    ) => {
      const exists = state.messages.some(
        (message) =>
          message.id === action.payload.id
      );

      if (!exists) {
        state.messages.push(
          action.payload
        );
      }
    },

    setConnectionStatus: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isConnected =
        action.payload;
    },

    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const {
  addMessage,
  setConnectionStatus,
  clearMessages,
} = chatSlice.actions;

export default chatSlice.reducer;