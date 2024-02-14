export default interface apiResponse {
	data?: {
		statusCode?: number
		isSuccess?: boolean
		errorMessages?: Array<string>
		result: {
			//this will not give any suggestions
			[key: string]: string
		}
	}
	error?: any
}
