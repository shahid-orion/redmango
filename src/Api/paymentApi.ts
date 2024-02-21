import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//https://redmangoapi01.azurewebsites.net/index.html
const paymentApi = createApi({
	reducerPath: 'paymentApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://redmangoapi01.azurewebsites.net/api/',
		//authorization token
		prepareHeaders: (headers: Headers, api) => {
			const token = localStorage.getItem('token')
			token && headers.append('Authorization', 'Bearer ' + token)
		},
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
