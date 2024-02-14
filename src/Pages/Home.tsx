import React from 'react'
import { MenuItemList } from '../Component/Page/MenuItems'

type Props = {}

const Home = (props: Props) => {
	return (
		<div>
			<div className='container p-2'>
				<MenuItemList />
			</div>
		</div>
	)
}

export default Home
