import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//https://redmangoapi01.azurewebsites.net/index.html
const orderApi = createApi({
	reducerPath: 'orderApi',
	baseQuery: fetchBaseQuery({
		// baseUrl: 'https://localhost:7255/api',
		baseUrl: 'https://redmangoapi01.azurewebsites.net/api/',
	}),
	tagTypes: ['Orders'],
	endpoints: (builder) => ({
		createOrder: builder.mutation({
			query: (orderDetails) => ({
				url: 'order',
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: orderDetails,
			}),
			invalidatesTags: ['Orders'],
		}),
		getAllOrders: builder.query({
			query: (userId) => ({
				url: 'order',
				params: { userId: userId },
			}),
			providesTags: ['Orders'],
		}),
		getOrderDetails: builder.query({
			query: (id) => ({
				url: `order/${id}`,
			}),
			providesTags: ['Orders'],
		}),
	}),
})

export const {
	useCreateOrderMutation,
	useGetAllOrdersQuery,
	useGetOrderDetailsQuery,
} = orderApi
export default orderApi
