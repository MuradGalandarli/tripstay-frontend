import { baseApi } from "../../../shared/api/baseApi";


export const favoriteApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        addFavorite : builder.mutation({
          query:(propertyId)=>({
            url:"Favorite",
            method:"POST",
            body:{propertyId}
          })
        }),
        deleteFavorite:builder.mutation({
            query:(propertyId)=>({
                url:`Favorite/${propertyId}`,
                method:"DELETE"
            })
        }),
        getAllFavorite:builder.query({
            query:()=>({
                url:"Favorite",
                method : "GET"
            })
        })
    })
})

export const { useAddFavoriteMutation, useGetAllFavoriteQuery, useDeleteFavoriteMutation } = favoriteApi;


