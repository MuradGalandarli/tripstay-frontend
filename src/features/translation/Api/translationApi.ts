import { baseApi } from "../../../shared/api/baseApi"


export const translationApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
           getTranslation: builder.query<any, void>({
            query:()=>({
                url:"/TranslationContent/get-all-translationContent",
                method:"GET",
                credentials:"include"
            }),
            keepUnusedDataFor:86400,
        }),
    }),
})

export const { useGetTranslationQuery } = translationApi;