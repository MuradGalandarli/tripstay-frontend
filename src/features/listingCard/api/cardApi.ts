import { baseApi } from "../../../shared/api/baseApi";
import type { PropertyByCityDto } from "../types/listingCardType";

export const cardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCard: builder.query({
      query: () => ({
        url: "Property/get-all-property",
        method: "GET",
      }),
      keepUnusedDataFor: 86400,
    }),

   getPropertiesByCities: builder.query<PropertyByCityDto[], number[]>({
  query: (cityIds) => ({
    url: `/Property/get-properties-by-cities?${cityIds
      .map((id) => `cityIds=${id}`)
      .join("&")}`,
    method: "GET",
  }),
  keepUnusedDataFor: 86400,
}),




  }),
});

export const { useGetAllCardQuery, useGetPropertiesByCitiesQuery } = cardApi;
