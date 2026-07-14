import {
    fetchBaseQuery,
    type BaseQueryFn,
    type FetchArgs,
    type FetchBaseQueryError
} from "@reduxjs/toolkit/query/react";

import { baseQuery } from "./baseQuery";
import { logout, setAccessToken } from "../../features/auth/slice/authSlice";


export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (
    args,
    api,
    extraOptions
) => {

    let result = await baseQuery(
        args,
        api,
        extraOptions
    );


    if (result.error?.status === 401) {

        const refreshResult = await baseQuery(
            {
                url: "/auth/refresh",
                method: "POST",
            },
            api,
            extraOptions
        );


        if (refreshResult.data) {

            const data = refreshResult.data as {
                accessToken: string;
            };


            api.dispatch(
                setAccessToken(
                    data.accessToken
                )
            );


            result = await baseQuery(
                args,
                api,
                extraOptions
            );

        } 
        else {

            api.dispatch(logout());

        }
    }


    return result;
};