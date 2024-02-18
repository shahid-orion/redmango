import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { RootState } from '../../Storage/Redux/store'
import { cartItemModel, userModel } from '../../Interfaces'
import {
	setLoggedInUser,
	emptyUserState,
} from '../../Storage/Redux/userAuthSlice'
import { useState } from 'react'
import { MainLoader, MiniLoader } from '../Page/Common'
import { SD_Role } from '../../Utility/SD'

let logo = require('../../Assets/Images/mango.png')
type Props = {}

const Header = (props: Props) => {
	const [loading, setLoading] = useState(false)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const shoppingCartFromStore: cartItemModel[] = useSelector(
		(state: RootState) => state.shoppingCartStore.cartItems ?? []
	)

	const userData: userModel = useSelector(
		(state: RootState) => state.userAuthStore
	)

	//logout
	const handleLogout = () => {
		setLoading(true)
		localStorage.removeItem('token')

		dispatch(setLoggedInUser({ ...emptyUserState }))

		navigate('/')
		setLoading(false)
	}

	return (
		<div>
			<nav className='navbar navbar-expand-lg bg-dark navbar-dark'>
				<div className='container-fluid'>
					<NavLink className='nav-link' aria-current='page' to='/'>
						<img
							src={logo}
							alt='redmango'
							className='m-1'
							width={50}
							height={50}
						/>
					</NavLink>

					<button
						className='navbar-toggler'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#navbarSupportedContent'
						aria-controls='navbarSupportedContent'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div className='collapse navbar-collapse' id='navbarSupportedContent'>
						<ul className='navbar-nav me-auto mb-2 mb-lg-0 w-100'>
							<li className='nav-item'>
								<NavLink className='nav-link' aria-current='page' to='/'>
									<i className='bi bi-house-door'></i>
								</NavLink>
							</li>

							{userData.role == SD_Role.ADMIN ? (
								<li className='nav-item dropdown'>
									<a
										className='nav-link dropdown-toggle'
										href='/'
										role='button'
										data-bs-toggle='dropdown'
										aria-expanded='false'
									>
										Admin Panel
									</a>
									<ul className='dropdown-menu'>
										<li
											className='dropdown-item'
											style={{ cursor: 'pointer' }}
											onClick={() => navigate('order/myorders')}
										>
											My Orders
										</li>
										<li
											className='dropdown-item'
											style={{ cursor: 'pointer' }}
											onClick={() => navigate('order/allOrders')}
										>
											All Orders
										</li>
									</ul>
								</li>
							) : (
								<li className='nav-item'>
									<NavLink
										className='nav-link'
										aria-current='page'
										to='/order/myOrders'
									>
										Orders
									</NavLink>
								</li>
							)}

							{/* <li className='nav-item'>
								<NavLink
									className='nav-link'
									aria-current='page'
									to='/authentication'
								>
									Authentication
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink
									className='nav-link'
									aria-current='page'
									to='/authorization'
								>
									Authorization
								</NavLink>
							</li> */}

							<li className='nav-item'>
								<NavLink
									className='nav-link'
									aria-current='page'
									to='/shoppingCart'
								>
									<i className='bi bi-cart3'></i>
									{userData.id && ` (${shoppingCartFromStore.length})`}
								</NavLink>
							</li>

							<div className='d-flex' style={{ marginLeft: 'auto' }}>
								{userData.id && (
									<>
										<li className='nav-item'>
											<button
												className='nav-link active'
												style={{
													cursor: 'pointer',
													background: 'transparent',
													border: 0,
												}}
											>
												Welcome, {userData.fullName} !
											</button>
										</li>
										{loading && <MainLoader />}
										<li className='nav-item'>
											<button
												className='btn btn-success btn-outlined rounded-pill text-white mx-2'
												style={{
													border: 'none',
													height: '2.5rem',
													width: '6.5rem',
												}}
												onClick={handleLogout}
											>
												Logout
											</button>
										</li>
									</>
								)}

								{!userData.id && (
									<>
										<li className='nav-item text-white'>
											<NavLink className='nav-link' to='/register'>
												Register
											</NavLink>
										</li>
										<li className='nav-item text-white'>
											<NavLink
												className='btn btn-success btn-outlined rounded-pill text-white mx-2'
												style={{
													border: 'none',
													height: '2.5rem',
													width: '6.5rem',
												}}
												to='/login'
											>
												Login
											</NavLink>
										</li>
									</>
								)}
							</div>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	)
}

export default Header
