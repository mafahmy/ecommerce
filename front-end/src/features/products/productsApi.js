import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({

    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: ""
    }),
    endpoints:(builder) => ({
        getAllProducts: builder.query({
            query:() => '/api/products'
            
        }),
        getProduct: builder.query({
            query:(id) => `/api/products/${id}`
        })
    })
})

export const { useGetAllProductsQuery, useGetProductQuery } = productsApi;