// import { Route, Routes } from 'react-router-dom'
import { Footer, Header } from '../Component/Layout'
import {
	AccessDenied,
	AllOrders,
	AuthenticationTest,
	AuthenticationTestAdmin,
	Home,
	Login,
	MenuItemDetails,
	MenuItemList,
	MenuItemUpsert,
	MyOrders,
	NotFound,
	OrderConfirmed,
	OrderDetails,
	// OrderDetails,
	Payment,
	Register,
	ShoppingCart,
} from '../Pages'
import { useDispatch, useSelector } from 'react-redux'
import { useGetShoppingCartQuery } from '../Api/shoppingCartApi'
import { useEffect, useState } from 'react'
import { setShoppingCart } from '../Storage/Redux/shoppingCartSlice'
import { userModel } from '../Interfaces'
import jwtDecode from 'jwt-decode'
import { setLoggedInUser } from '../Storage/Redux/userAuthSlice'
import { RootState } from '../Storage/Redux/store'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import '../index.css'

function App() {
	const [skip, setSkip] = useState(true)
	const userData: userModel = useSelector(
		(state: RootState) => state.userAuthStore
	)
	const dispatch = useDispatch()

	const { data, isLoading } = useGetShoppingCartQuery(
		userData.id
		// {skip:skip}
	)

	useEffect(() => {
		const localToken = localStorage.getItem('token')
		if (localToken) {
			const { fullName, id, email, role }: userModel = jwtDecode(localToken)
			dispatch(setLoggedInUser({ fullName, id, email, role }))
		}
	}, [])

	useEffect(() => {
		if (!isLoading) {
			dispatch(setShoppingCart(data.result?.cartItems))
		}
	}, [data])

	// useEffect(() => {
	// 	if (userData.id) {
	// 		setSkip(false)
	// 	}
	// }, [userData])

	return (
		<div>
			<Header />
			<div className='pb-5'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route
						path='/menuItemDetails/:menuItemId'
						element={<MenuItemDetails />}
					/>

					<Route path='/authentication' element={<AuthenticationTest />} />
					<Route path='/authorization' element={<AuthenticationTestAdmin />} />
					<Route path='/accessDenied' element={<AccessDenied />} />

					<Route path='/payment' element={<Payment />} />
					<Route path='order/orderConfirmed/:id' element={<OrderConfirmed />} />
					<Route path='order/myOrders' element={<MyOrders />} />
					<Route path='order/allOrders' element={<AllOrders />} />
					<Route path='order/orderDetails/:id' element={<OrderDetails />} />

					<Route path='/menuItem/menuitemlist' element={<MenuItemList />} />
					<Route
						path='/menuItem/menuitemupsert/:id'
						element={<MenuItemUpsert />}
					/>
					<Route path='/menuItem/menuitemupsert' element={<MenuItemUpsert />} />

					<Route path='/ShoppingCart' element={<ShoppingCart />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</div>
			<Footer />
		</div>
	)
}

export default App
