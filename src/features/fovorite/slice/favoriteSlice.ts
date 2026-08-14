import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FavoriteState {
  favoriteIds: number[];
}

const initialState: FavoriteState = {
  favoriteIds: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavoriteLocal: (state, action: PayloadAction<number>) => {
      if (!state.favoriteIds.includes(action.payload)) {
        state.favoriteIds.push(action.payload);
      }
    },

    removeFavoriteLocal: (state, action: PayloadAction<number>) => {
      state.favoriteIds = state.favoriteIds.filter(
        (id) => id !== action.payload
      );
    },
  },
});

export const {
  addFavoriteLocal,
  removeFavoriteLocal,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;