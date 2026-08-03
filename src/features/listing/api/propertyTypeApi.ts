import { baseApi } from "../../../shared/api/baseApi";
import type { PropertyType, AmenityType } from "../types/PropertyType";

export const propertyTypeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPropertyType: builder.query<PropertyType[], void>({
      query: () => ({
        url: "PropertyType/get-all-propertyType",
        method: "GET",
        credentials: "include",
      }),
      keepUnusedDataFor: 86400,
    }),
    
    getAmenity: builder.query<AmenityType[], void>({
      query: () => ({
        url: "/Amenity/get-all-amenity",
        method: "GET",
        credentials: "include",
      }),
      keepUnusedDataFor: 86400,
    }),


  }),
});

export const { useGetPropertyTypeQuery, useGetAmenityQuery } = propertyTypeApi;
