import React from 'react'
import { withAuth } from '../../HOC'
import { useSelector } from 'react-redux'
import { RootState } from '../../Storage/Redux/store'
import { useGetAllOrdersQuery } from '../../Api/orderApi'
import { MainLoader } from '../../Component/Page/Common'
import { orderHeaderModel } from '../../Interfaces'
import { OrderList } from '../../Component/Page/Order'

type Props = {}

const MyOrders = (props: Props) => {
	const userId = useSelector((state: RootState) => state.userAuthStore.id)
	const { data, isLoading } = useGetAllOrdersQuery(userId)

	return (
		<>
			{isLoading && <MainLoader />}
			{!isLoading && (
				<OrderList isLoading={isLoading} orderData={data.result} />
			)}
		</>
	)
}

export default withAuth(MyOrders)
