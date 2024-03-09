import { Credentials, RegisterData, UserData } from '@entities/entrance/api'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createUrl } from '@shared/base-api'

export const dishListService = createApi({
    reducerPath: 'service/dish-list',
    baseQuery: fetchBaseQuery({ baseUrl: createUrl('dish-list'), credentials: "include" }),
    endpoints: (builder) => ({        
        getAll: builder.mutation<UserData, Credentials>({
            query: (credentials) => ({
                url: 'login/user',
                method: 'POST',
                body: credentials,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        }),
        create: builder.mutation<UserData, Credentials>({
            query: (credentials) => ({
                url: 'login/cooker',
                method: 'POST',
                body: credentials,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        }),
        delete: builder.mutation<void, void>({
            query: () => ({
                url: 'logout',
                method: 'DELETE',
            })
        }),
        addDish: builder.mutation<UserData, RegisterData>({
            query: (data) => ({
                url: 'register/user',
                method: 'POST',
                body: data,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        }),
        deleteDish: builder.mutation<UserData, RegisterData>({
            query: (data) => ({
                url: 'register/user',
                method: 'POST',
                body: data,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        }),
        changeAmount: builder.mutation<UserData, RegisterData>({
            query: (data) => ({
                url: 'register/user',
                method: 'POST',
                body: data,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        })
    })
})

export const {

} = dishListService