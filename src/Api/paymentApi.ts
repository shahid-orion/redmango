import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//https://redmangoapi01.azurewebsites.net/index.html
const paymentApi = createApi({
	reducerPath: 'paymentApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://redmangoapi01.azurewebsites.net/api/',
	}),
	endpoints: (builder) => ({
		initiatePayment: builder.mutation({
			query: (userId) => ({
				url: 'payment',
				method: 'POST',
				params: {
					userId: userId,
				},
			}),
		}),
	}),
})

export const { useInitiatePaymentMutation } = paymentApi
export default paymentApi
