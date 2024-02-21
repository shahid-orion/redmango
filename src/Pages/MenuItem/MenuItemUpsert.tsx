import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { inputHelper, toastNotification } from '../../Helper'
import {
	useCreateMenuItemMutation,
	useGetMenuItemByIdQuery,
	useUpdateMenuItemMutation,
} from '../../Api/menuItemApi'
import { useNavigate, useParams } from 'react-router-dom'
import { MainLoader } from '../../Component/Page/Common'
import { SD_Categories } from '../../Utility/SD'

const Categories = [
	SD_Categories.APPETIZER,
	SD_Categories.BEVERAGES,
	SD_Categories.DESSERT,
	SD_Categories.ENTREE,
]
const menuItemData = {
	name: '',
	description: '',
	specialTag: '',
	category: Categories[0],
	price: '',
}

const MenuItemUpsert = () => {
	const [imageToStore, setImageToStore] = useState<any>()
	const [imageToDisplay, setImageToDisplay] = useState<string>('')

	const [menuItemInputs, setMenuItemInputs] = useState(menuItemData)
	const [isLoading, setIsLoading] = useState(false)

	const navigate = useNavigate()
	const { id } = useParams()

	const [createMenuItem] = useCreateMenuItemMutation()
	const [updateMenuItem] = useUpdateMenuItemMutation()
	const { data } = useGetMenuItemByIdQuery(id)

	useEffect(() => {
		if (data && data.result) {
			const tempData = {
				name: data.result.name,
				description: data.result.description,
				specialTag: data.result.specialTag,
				category: data.result.category,
				price: data.result.price,
			}
			setMenuItemInputs(tempData)
			setImageToDisplay(data.result.image)
		}
	}, [data])

	const handleMenuItemInput = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const tempData = inputHelper(e, menuItemInputs)
		setMenuItemInputs(tempData)
	}

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files && e.target.files[0]

		if (file) {
			const imageType = file.type.split('/')[1]
			const validImageTypes = ['jpeg', 'png', 'jpg']

			const isImageTypeValid = validImageTypes.filter((e) => e === imageType)

			if (file.size > 1000 * 1024) {
				setImageToStore('')
				toastNotification('File must be less than 5MB', 'error')
				return
			} else if (isImageTypeValid.length === 0) {
				setImageToStore('')
				toastNotification('File must be jpeg, jpg or png', 'error')
				return
			}

			const reader = new FileReader()
			reader.readAsDataURL(file)
			setImageToStore(file)
			reader.onload = (e) => {
				const imgUrl = e.target?.result as string
				setImageToDisplay(imgUrl)
			}
		}
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsLoading(true)
		if (!imageToStore && !id) {
			toastNotification('Please upload an image', 'error')
			setIsLoading(false)
			return
		}

		const formData = new FormData()

		formData.append('Name', menuItemInputs.name)
		formData.append('Description', menuItemInputs.description)
		formData.append('SpecialTag', menuItemInputs.specialTag ?? '')
		formData.append('Category', menuItemInputs.category)
		formData.append('Price', menuItemInputs.price)
		if (imageToDisplay) formData.append('File', imageToStore)

		let response

		if (id) {
			//update
			formData.append('Id', id)
			response = await updateMenuItem({ data: formData, id })
			toastNotification('Menu Item updated successfully', 'success')
		} else {
			//create
			response = await createMenuItem(formData)
			toastNotification('Menu Item created successfully', 'success')
		}

		if (response) {
			setIsLoading(false)
			navigate('/menuItem/menuitemlist')
		}

		setIsLoading(false)
	}

	return (
		<div className='container border mt-5 p-5 bg-light'>
			{isLoading && <MainLoader />}
			<h3 className='px-2 text-success'>
				{id ? 'Edit Menu Item' : 'Add Menu Item'}
			</h3>
			<form method='post' encType='multipart/form-data' onSubmit={handleSubmit}>
				<div className='row mt-3'>
					<div className='col-md-7'>
						<input
							type='text'
							className='form-control'
							placeholder='Enter Name'
							name='name'
							value={menuItemInputs.name}
							onChange={handleMenuItemInput}
							required
						/>
						<textarea
							className='form-control mt-3'
							placeholder='Enter Description'
							name='description'
							rows={10}
							value={menuItemInputs.description}
							onChange={handleMenuItemInput}
						></textarea>
						<input
							type='text'
							className='form-control mt-3'
							placeholder='Enter Special Tag'
							name='specialTag'
							value={menuItemInputs.specialTag}
							onChange={handleMenuItemInput}
						/>
						<select
							className='form-control mt-3 form-select'
							required
							// placeholder='Enter Price'
							name='category'
							value={menuItemInputs.price}
							onChange={handleMenuItemInput}
						>
							{Categories.map((category) => (
								<option value={category}>{category}</option>
							))}
						</select>
						<input
							type='number'
							className='form-control mt-3'
							required
							placeholder='Enter Price'
							name='price'
							value={menuItemInputs.price}
							onChange={handleMenuItemInput}
						/>
						<input
							type='file'
							className='form-control mt-3'
							onChange={handleFileChange}
						/>
						<div className='row'>
							<div className='col-6'>
								<button
									type='submit'
									style={{ width: '50%' }}
									className='btn btn-success form-control mt-3'
								>
									{id ? 'Update' : 'Create'}
								</button>
							</div>
							<div className='col-6'>
								<button
									onClick={() => navigate('/menuItem/menuitemlist')}
									className='btn btn-secondary form-control mt-3'
								>
									Back to Menu Items
								</button>
							</div>
						</div>
					</div>
					<div className='col-md-5 text-center mt-2 mt-md-0'>
						<img
							src={imageToDisplay}
							style={{ width: '100%', borderRadius: '30px' }}
							alt=''
						/>
					</div>
				</div>
			</form>
		</div>
	)
}

export default MenuItemUpsert
