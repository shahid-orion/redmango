import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//https://redmangoapi01.azurewebsites.net/index.html
//https://localhost:7255/swagger/index.html
const menuItemApi = createApi({
	reducerPath: 'meuItemApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://localhost:7255/api/',
		// baseUrl: 'https://redmangoapi01.azurewebsites.net/api/',
		prepareHeaders: (headers: Headers, api) => {
			const token = localStorage.getItem('token')
			token && headers.append('Authorization', 'Bearer ' + token)
		},
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
		//create
		createMenuItem: builder.mutation({
			query: (data) => ({
				url: 'menuitem/',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['MenuItems'],
		}),
		//update
		updateMenuItem: builder.mutation({
			query: ({ data, id }) => ({
				url: 'menuitem/' + id,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['MenuItems'],
		}),
		//delete
		deleteMenuItem: builder.mutation({
			query: (id) => ({
				url: 'menuitem/' + id,
				method: 'DELETE',
			}),
			invalidatesTags: ['MenuItems'],
		}),
	}),
})

export const {
	useGetMenuItemsQuery,
	useGetMenuItemByIdQuery,
	useCreateMenuItemMutation,
	useUpdateMenuItemMutation,
	useDeleteMenuItemMutation,
} = menuItemApi
export default menuItemApi
