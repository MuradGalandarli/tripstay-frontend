import { fetchBaseQuery  } from '@reduxjs/toolkit/query/react'



export const baseQuery = fetchBaseQuery({
    baseUrl: "https://localhost:7000/api",

    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        headers.set("Content-Type", "application/json");

        return headers;
    },
});