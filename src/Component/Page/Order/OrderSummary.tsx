import React from 'react'
import { orderSummaryProps } from './orderSummaryProps'
import { cartItemModel } from '../../../Interfaces'
import { getStatusColor } from '../../../Helper'
import { useNavigate } from 'react-router-dom'
import { SD_Role, SD_Status } from '../../../Utility/SD'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Storage/Redux/store'

const OrderSummary = ({ data, userInput }: orderSummaryProps) => {
	const badgeTypeColor = getStatusColor(data.status!)
	const navigate = useNavigate()
	const userData = useSelector((state: RootState) => state.userAuthStore)

	let nextStatus
	switch (data.status) {
		case SD_Status.CONFIRMED:
			nextStatus = { color: 'info', value: SD_Status.BEING_COOKED }
			break
		case SD_Status.BEING_COOKED:
			nextStatus = { color: 'warning', value: SD_Status.READY_FOR_PICKUP }
			break
		case SD_Status.READY_FOR_PICKUP:
			nextStatus = { color: 'success', value: SD_Status.COMPLETED }
			break
		default:
			nextStatus = { color: '', value: null }
			break
	}

	return (
		<div>
			{' '}
			<div className='d-flex justify-content-between align-items-center'>
				<h3 className='text-success'>Order Summary</h3>
				<span className={`btn btn-outline-${badgeTypeColor}`}>
					{data.status}
				</span>
			</div>
			{/* <h3 className='text-success'>Order Summary</h3> */}
			<div className='mt-3'>
				<div className='border py-3 px-2'>Name : {userInput.name}</div>
				<div className='border py-3 px-2'>Email : {userInput.email} </div>
				<div className='border py-3 px-2'>Phone : {userInput.phoneNumber}</div>
				<div className='border py-3 px-2'>
					<h4 className='text-success'>Menu Items</h4>
					<div className='p-3'>
						{data.cartItems?.map((cartItem: cartItemModel, i: number) => {
							return (
								<div className='d-flex' key={i}>
									<div className='d-flex w-100 justify-content-between'>
										<p>{cartItem.menuItem?.name}</p>
										<p>
											${cartItem.menuItem?.price} x {cartItem.quantity} =
										</p>
									</div>
									<p style={{ width: '70px', textAlign: 'right' }}>
										$
										{(cartItem.menuItem?.price ?? 0) * (cartItem.quantity ?? 0)}
									</p>
								</div>
							)
						})}

						<hr />
						<h4 className='text-danger' style={{ textAlign: 'right' }}>
							${data.cartTotal?.toFixed(2)}
						</h4>
					</div>
				</div>
			</div>
			<div className='d-flex justify-content-between align-items-center mt-3'>
				<button className='btn btn-secondary' onClick={() => navigate(-1)}>
					Back to Orders
				</button>
				{userData.role === SD_Role.ADMIN && (
					<div className='d-flex'>
						<button
							className='btn btn-danger mx-2'
							onClick={() => navigate(-1)}
						>
							Cancel
						</button>
						<button
							className={`btn btn-${nextStatus.color}`}
							onClick={() => navigate(-1)}
						>
							{nextStatus.value}
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default OrderSummary
