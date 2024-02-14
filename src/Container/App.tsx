import { Route, Routes } from 'react-router-dom'
import { Footer, Header } from '../Component/Layout'
import {
	Home,
	Login,
	MenuItemDetails,
	NotFound,
	Register,
	ShoppingCart,
} from '../Pages'
import { useDispatch } from 'react-redux'
import { useGetShoppingCartQuery } from '../Api/shoppingCartApi'
import { useEffect } from 'react'
import { setShoppingCart } from '../Storage/Redux/shoppingCartSlice'

function App() {
	const dispatch = useDispatch()

	const { data, isLoading } = useGetShoppingCartQuery(
		'85f5cbd1-9ef2-4a7e-922f-825fae5c2dc5'
	)

	useEffect(() => {
		if (!isLoading) {
			// console.log(data.result)
			dispatch(setShoppingCart(data.result?.cartItems))
		}
	}, [data])

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
