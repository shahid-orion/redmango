import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const shoppingCartApi = createApi({
	reducerPath: 'shoppingCartApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://redmangoapi01.azurewebsites.net/api/',
	}),
	tagTypes: ['ShoppingCarts'],
	endpoints: (builder) => ({
		getShoppingCart: builder.query({
			query: (userId) => ({
				url: `shoppingcart`,
				params: {
					userId: userId,
				},
			}),
			providesTags: ['ShoppingCarts'],
		}),
		updateShoppingCart: builder.mutation({
			query: ({ userId, menuItemId, updateQuantityBy }) => ({
				url: 'shoppingcart',
				method: 'POST',
				params: {
					userId: userId,
					menuItemId: menuItemId,
					updateQuantityBy: updateQuantityBy,
				},
			}),
			invalidatesTags: ['ShoppingCarts'],
		}),
	}),
})

export const { useGetShoppingCartQuery, useUpdateShoppingCartMutation } =
	shoppingCartApi
export default shoppingCartApi
