import { baseApi } from "../../../shared/api/baseApi"


export const cardApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        getAllCard:builder.query({
            query:()=>({
                url:"Property/get-all-property",
                method:"GET"
            }),
             keepUnusedDataFor:86400,
        })
    })
})

export const { useGetAllCardQuery } = cardApi;