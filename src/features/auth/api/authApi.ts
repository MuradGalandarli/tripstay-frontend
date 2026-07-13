import { baseApi } from "../../../shared/api/baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        login : builder.mutation({
            query: (body)=>({
                url: "Auth/login",
                method: "POST",
                body,
                credentials : "include"
                
            }),
        }),


    })
})

export const {  useLoginMutation } = authApi;