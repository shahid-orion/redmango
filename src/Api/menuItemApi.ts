import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//https://redmangoapi01.azurewebsites.net/index.html
const menuItemApi = createApi({
	reducerPath: 'meuItemApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://redmangoapi01.azurewebsites.net/api/',
	}),
	tagTypes: ['MenuItems'],
	endpoints: (builder) => ({
		getMenuItems: builder.query({
			query: () => ({
				url: 'menuitem',
			}),
			providesTags: ['MenuItems'],
		}),
		getMenuItemById: builder.query({
			query: (id) => ({
				url: `menuitem/${id}`,
			}),
			providesTags: ['MenuItems'],
		}),
	}),
})

export const { useGetMenuItemsQuery, useGetMenuItemByIdQuery } = menuItemApi
export default menuItemApi
