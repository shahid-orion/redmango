import React from 'react'
import { MenuItemList } from '../Component/Page/Home'
import { Banner } from '../Component/Page/Common'

type Props = {}

const Home = (props: Props) => {
	return (
		<div>
			<Banner />
			<div className='container p-2'>
				<MenuItemList />
			</div>
		</div>
	)
}

export default Home
