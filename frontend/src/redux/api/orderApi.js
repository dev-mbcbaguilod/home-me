import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({baseUrl: "/api"}),
    tagTypes: ["Order", "AdminOrders"],
    endpoints: (builder) => ({
        createNewOrder: builder.mutation({
            query(body) {
                return {
                    url: "/orders/new",
                    method: "POST",
                    body,
                }
            }
        }),
        myOrders: builder.query({
            query: () => `/me/orders`
        }),
        orderDetails: builder.query({
            query: (id) => `/orders/${id}`,
            provideTags: ["Order"]
        }),
        getAdminOrders: builder.query({
            query: () => `/admin/orders`,
            provideTags: ["AdminOrders"]
        }),
        updateOrder: builder.mutation({
            query({id, body}) {
                return {
                    url: `/admin/orders/${id}`,
                    method: "PUT",
                    body,
                }
            },
            invalidatesTags: ["Order"],
        }),
        deleteOrder: builder.mutation({
            query(id) {
                return {
                    url: `/admin/orders/${id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["AdminOrders"],
        }),
    }),
});

export const { 
    useCreateNewOrderMutation, 
    useMyOrdersQuery, 
    useOrderDetailsQuery,
    useGetAdminOrdersQuery,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
} = orderApi;