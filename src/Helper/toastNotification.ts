import { toast, TypeOptions } from 'react-toastify'

//TypeOptions = 'info' | 'success' | 'warning' | 'error' | 'default';
const toastNotification = (message: string, type: TypeOptions) => {
	toast(message, {
		type: type,
		position: 'top-right',
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: 'dark',
		//transition: Bounce,
	})
}

export default toastNotification
