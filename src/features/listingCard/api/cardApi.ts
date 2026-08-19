
import { baseApi } from "../../../shared/api/baseApi";


export interface PropertyDto {
  id: number;
  title: string;
  imageUrl: string;
  address: string;
  pricePerNight: number;
}

export interface PropertyByCityDto {
  id: number;
  cityId: number;
  cityName: string;
  properties: PropertyDto[];
}



export const cardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllCard: builder.query<{ data: PropertyDto[] }, void>({
      query: () => ({
        url: "Property/get-all-property",
        method: "GET",
      }),
       providesTags: ["Properties"],
      keepUnusedDataFor: 86400,
    }),

    getPropertiesByCities: builder.query<
      { data: PropertyByCityDto[] },
      number[]
    >({
      query: (cityIds) => ({
        url: `/Property/get-properties-by-cities?${cityIds
          .map((id) => `cityIds=${id}`)
          .join("&")}`,
        method: "GET",
      }),
       providesTags: ["Properties"],
      keepUnusedDataFor: 86400,
    }),

  }),
});

export const {
  useGetAllCardQuery,
  useGetPropertiesByCitiesQuery,
} = cardApi;
