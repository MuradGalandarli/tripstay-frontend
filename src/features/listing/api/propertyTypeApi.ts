import { baseApi } from "../../../shared/api/baseApi";
import type {
  PropertyType,
  AmenityType,
  CityType,
  CountryType,
} from "../types/PropertyType";

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

    getCity: builder.query<CityType[], void>({
      query: () => ({
        url: "City/get-all-city",
        method: "GET",
        credentials: "include",
      }),
      keepUnusedDataFor: 86400,
    }),

getCountry:builder.query<CountryType,void>({
  query:()=>({
    url:"Country/get-all-country",
    method:"GET",
    credentials:"include"
  }),
  keepUnusedDataFor:86400
}),

createProperty : builder.mutation<any,FormData>({
  query:(formData) =>({
    url:"Property/create-property",
    method:"POST",
    body:formData

  })
})






  }),
});

export const { useGetPropertyTypeQuery,
   useGetAmenityQuery,
   useGetCityQuery,
   useGetCountryQuery,
  useCreatePropertyMutation
  } = propertyTypeApi;
