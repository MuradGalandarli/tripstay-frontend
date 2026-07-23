import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import { baseQuery } from "./baseQuery";
import { logoutAction, setAccessToken } from "../../features/auth/slice/authSlice";

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  
  if (result.error?.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: "Auth/refresh",
        method: "POST",
        credentials:"include"
      },
      api,
      extraOptions,
    );
debugger;

    if (refreshResult.data) {
        const accessToken = refreshResult.data as string;

      api.dispatch(setAccessToken(accessToken));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logoutAction());
    }
  }

  return result;
};
