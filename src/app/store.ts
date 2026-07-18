import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { baseApi } from "../shared/api/baseApi";
import authReducer from "../features/auth/slice/authSlice";
import languageReducer from "../features/language/slice/languageSlice"


export const store = configureStore({
  
  reducer: {
   auth: authReducer,
   language: languageReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;