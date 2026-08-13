import { baseApi } from "../../../shared/api/baseApi";


export const propertyDetailApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
     getPropertyDetail:builder.query({
        query:(propertyDetailId)=>({
            url: `/property/get-property-detail?propertyDetailId=${propertyDetailId}`,
            method:"GET",
            
        })
     })
    })
})

export const { useGetPropertyDetailQuery } = propertyDetailApi;