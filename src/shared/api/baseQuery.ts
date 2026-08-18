import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../app/store";

export const baseQuery = fetchBaseQuery({
  
  baseUrl: "https://www.airbnb.somee.com/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    const language = (getState()as RootState).language.languageCode

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    headers.set("Content-Type", "application/json");
    headers.set("Accept-Language", language);

    return headers;
  },
});
