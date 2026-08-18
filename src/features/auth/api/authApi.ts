import { baseApi } from "../../../shared/api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "Auth/login",
        method: "POST",
        body,
        credentials: "include",
      }),
    }),

    register: builder.mutation({
      query: (body) => ({
        url: "Auth/register",
        method: "Post",
        body,
        credentials: "include",
      }),
    }),
    refresh: builder.mutation<string,void>({
      query: () => ({
        url: "Auth/refresh",
        method: "POST",
        credentials: "include",
      }),
    }),

    logout: builder.mutation<void,void>({
      query: () => ({
        url: "Auth/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshMutation,
  useLogoutMutation,
} = authApi;
