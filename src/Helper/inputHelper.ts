import { ChangeEvent } from 'react'

const inputHelper = (
	e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	data: any
) => {
	const tempData = { ...data }

	tempData[e.target.name] = e.target.value

	return tempData
}

export default inputHelper
