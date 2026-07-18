import {baseApi} from "../../../shared/api/baseApi"


    export const languageApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getLanguages: builder.query({
            query: () => ({
                url: "Language/get-all-language",
                method: "GET",
                credentials: "include"
            }),
             keepUnusedDataFor: 86400,
        }),
    }),
});

export const { useGetLanguagesQuery } = languageApi;