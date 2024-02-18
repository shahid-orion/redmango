import React, { FormEvent, useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { toastNotification } from '../../../Helper'
import { orderSummaryProps } from '../Order/orderSummaryProps'
import { apiResponse, cartItemModel } from '../../../Interfaces'
import { useCreateOrderMutation } from '../../../Api/orderApi'
import { SD_Status } from '../../../Utility/SD'
import { useNavigate } from 'react-router-dom'
import { MainLoader } from '../Common'

const PaymentForm = ({ data, userInput }: orderSummaryProps) => {
	const navigate = useNavigate()
	const [createOrder] = useCreateOrderMutation()
	const [isProcessing, setIsProcessing] = useState(false)
	const stripe = useStripe()
	const elements = useElements()

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (!stripe || !elements) {
			return
		}

		setIsProcessing(true)

		const result = await stripe.confirmPayment({
			//`Elements` instance that was used to create the Payment Element
			elements,
			confirmParams: {
				return_url: 'https://example.com/order/123/complete',
			},
			redirect: 'if_required',
		})

		if (result.error) {
			toastNotification('An unexpected error occurred', 'error')
			setIsProcessing(false)
		} else {
			//create an order
			let grandTotal = 0
			let totalItems = 0

			const orderDetailsDTO: any = []
			data.cartItems?.forEach((item: cartItemModel) => {
				const tempOrderDetail: any = {}
				tempOrderDetail['menuItemId'] = item.menuItem?.id
				tempOrderDetail['quantity'] = item.quantity
				tempOrderDetail['itemName'] = item.menuItem?.name
				tempOrderDetail['price'] = item.menuItem?.price
				orderDetailsDTO.push(tempOrderDetail)

				grandTotal += item.quantity! * item.menuItem?.price!
				totalItems += item.quantity!
			})

			const response: apiResponse = await createOrder({
				pickupName: userInput.name,
				pickupPhoneNumber: userInput.phoneNumber,
				pickupEmail: userInput.email,
				totalItems: totalItems,
				orderTotal: grandTotal,
				orderDetailsDTO: orderDetailsDTO,
				applicationUserId: data.userId,
				stripePaymentIntentId: data.stripePaymentIntentId,
				status:
					result.paymentIntent.status === 'succeeded'
						? SD_Status.CONFIRMED
						: SD_Status.PENDING,
			})

			if (response.data?.result.status === SD_Status.CONFIRMED) {
				navigate(`/order/orderConfirmed/${response.data.result.orderHeaderId}`)
			} else {
				navigate('/failed')
			}
		}
		setIsProcessing(false)
	}

	return (
		<form onSubmit={handleSubmit}>
			{/* {isProcessing && <MainLoader />} */}
			<PaymentElement />
			<button
				className='btn btn-success mt-5 w-100'
				disabled={!stripe || isProcessing}
			>
				<span id='button-text'>
					{isProcessing ? 'Processing...' : 'Submit Order'}
				</span>
			</button>
		</form>
	)
}

export default PaymentForm
