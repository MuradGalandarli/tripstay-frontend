import {baseApi} from "../../../shared/api/baseApi"

export interface LanguageType {
  id: number;
  code: string;
  name: string;
  countryName: string;
}

    export const languageApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
       getLanguages: builder.query<{ data: LanguageType[] }, void>({
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