import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { LanguageState } from "../types/LanguageSelectorsType"

const initialState: LanguageState = {
  languageCode: "en",
  languageName: "English",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<LanguageState>) {
      state.languageCode = action.payload.languageCode;
      state.languageName = action.payload.languageName;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
