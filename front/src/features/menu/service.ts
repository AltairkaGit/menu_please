import { AddDishInList, ChangeDishAmountInList, DishList, RemoveDishFromList } from '@entities/menu/api'
import { AmountedDish } from '@entities/dish/api'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createUrl } from '@shared/base-api'

export const dishListService = createApi({
    reducerPath: 'service/dishList',
    baseQuery: fetchBaseQuery({ baseUrl: createUrl('dish-list'), credentials: "include" }),
    tagTypes: ['DishList'],
    endpoints: (builder) => ({        
        getAll: builder.query<DishList[], void>({
            query: () => ({
                url: 'all',
                method: 'GET',
            }),
            providesTags: (result) => 
                result ? result.map(item => ({type: 'DishList', id: item.id})) : ['DishList']
        }),
        get: builder.query<DishList, number>({
            query: (id) => ({
                url: 'id/' + id,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{type: 'DishList', id}]
        }),
        create: builder.mutation<DishList, void>({
            query: () => ({
                url: '',
                method: 'POST',
            })
        }),
        delete: builder.mutation<void, number>({
            query: (id) => ({
                url: 'id/' + id,
                method: 'DELETE',
            })
        }),
        addDish: builder.mutation<AmountedDish, AddDishInList>({
            query: (data) => ({
                url: `id/${data.id}/dish`,
                method: 'POST',
                body: data.body,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        }),
        deleteDish: builder.mutation<void, RemoveDishFromList>({
            query: (data) => ({
                url: `id/${data.id}/dish`,
                method: 'DELETE',
                body: data.body,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        }),
        changeAmount: builder.mutation<AmountedDish, ChangeDishAmountInList>({
            query: (data) => ({
                url:  `id/${data.id}/dish`,
                method: 'PUT',
                body: data.body,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        })
    })
})

export const {
    useGetQuery,
    useGetAllQuery,
    useCreateMutation,
    useDeleteMutation,
    useAddDishMutation,
    useDeleteDishMutation,
    useChangeAmountMutation
} = dishListService