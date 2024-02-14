import React, { useEffect, useState } from 'react'
import { MenuItemModel } from '../../../Interfaces'
import MenuItemCard from './MenuItemCard'
import { useGetMenuItemsQuery } from '../../../Api/menuItemApi'
import { useDispatch } from 'react-redux'
import { setMenuItem } from '../../../Storage/Redux/menuItemSlice'
import { MainLoader } from '../Common'

type Props = {}

const MenuItemList = (props: Props) => {
	//const [menuItems, setMenuItems] = useState<MenuItemModel[]>([])
	const dispatch = useDispatch()

	const { data, isLoading } = useGetMenuItemsQuery(null)

	useEffect(() => {
		if (!isLoading) {
			dispatch(setMenuItem(data.result))
		}
	}, [isLoading])

	if (isLoading) {
		return <MainLoader />
	}

	return (
		<div className='container row'>
			{data.result.length > 0 &&
				data.result.map((menuItem: MenuItemModel, i: number) => (
					<MenuItemCard menuItem={menuItem} key={i} />
				))}
		</div>
	)
}

export default MenuItemList
