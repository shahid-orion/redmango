import React, { ChangeEvent, FormEvent, useState } from 'react'
import { SD_Role } from '../Utility/SD'
import { inputHelper, toastNotification } from '../Helper'
import { useRegisterUserMutation } from '../Api/authApi'
import { apiResponse } from '../Interfaces'
import { useNavigate } from 'react-router-dom'
import { MainLoader } from '../Component/Page/Common'

type Props = {}

const Register = (props: Props) => {
	//
	const [registerUser] = useRegisterUserMutation()
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	const [userInput, setUserInput] = useState({
		userName: '',
		password: '',
		role: '',
		name: '',
	})

	//using common user inputs
	const handleUserInput = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const tempdata = inputHelper(e, userInput)
		setUserInput(tempdata)
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)

		const response: apiResponse = await registerUser({
			userName: userInput.userName,
			password: userInput.password,
			name: userInput.name,
			role: userInput.role,
		})

		if (response.data) {
			toastNotification('Registration successful! Please login', 'success')
			navigate('/login')
		} else if (response.error) {
			toastNotification(response?.error?.data?.errorsMessages[0], 'error')
		}

		setLoading(false)
	}

	return (
		<div className='container text-center'>
			{loading && <MainLoader />}
			<form method='post' onSubmit={handleSubmit}>
				<h1 className='mt-5'>Register</h1>
				<div className='mt-5'>
					<div className='col-sm-6 offset-sm-3 col-xs-12 mt-4'>
						<input
							type='text'
							className='form-control'
							placeholder='Enter Username'
							name='userName'
							value={userInput.userName}
							onChange={handleUserInput}
							required
						/>
					</div>
					<div className='col-sm-6 offset-sm-3 col-xs-12 mt-4'>
						<input
							type='text'
							className='form-control'
							placeholder='Enter Name'
							name='name'
							value={userInput.name}
							onChange={handleUserInput}
							required
						/>
					</div>
					<div className='col-sm-6 offset-sm-3 col-xs-12 mt-4'>
						<input
							type='password'
							className='form-control'
							placeholder='Enter Password'
							name='password'
							value={userInput.password}
							onChange={handleUserInput}
							required
						/>
					</div>
					<div className='col-sm-6 offset-sm-3 col-xs-12 mt-4'>
						<select
							className='form-control form-select'
							name='role'
							value={userInput.role}
							onChange={handleUserInput}
							required
						>
							<option value=''>--Select Role--</option>
							<option value={`${SD_Role.CUSTOMER}`}>Customer</option>
							<option value={`${SD_Role.ADMIN}`}>Admin</option>
						</select>
					</div>
				</div>
				<div className='mt-5'>
					<button type='submit' className='btn btn-success' disabled={loading}>
						Register
					</button>
				</div>
			</form>
		</div>
	)
}

export default Register
