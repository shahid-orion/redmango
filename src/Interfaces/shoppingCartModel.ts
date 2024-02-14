import cartItemModel from './cartItemModel'

export default interface shoppingCartModel {
	id?: number
	userId?: string
	cartItems?: cartItemModel[]
	cartTotal?: number
	sripePaymentIntentId?: any
	clientSecret?: any
}
