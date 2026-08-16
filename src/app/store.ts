import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { baseApi } from "../shared/api/baseApi";
import authReducer from "../features/auth/slice/authSlice";
import languageReducer from "../features/language/slice/languageSlice"
import propertyReducer from "../features/listing/slice/propertySlice"
import favoriteReducer from "../features/fovorite/slice/favoriteSlice"
import chatReducer from "../features/chat/slice/chatSlice";

export const store = configureStore({
  
  reducer: {
   auth: authReducer,
   language: languageReducer,
   property: propertyReducer,
   favorite: favoriteReducer,
   chat: chatReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



