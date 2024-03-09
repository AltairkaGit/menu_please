import { Credentials, RegisterData, UserData } from '@entities/entrance/api'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createUrl } from '@shared/base-api'

export const authService = createApi({
    reducerPath: 'service/auth',
    baseQuery: fetchBaseQuery({ baseUrl: createUrl(), credentials: "include" }),
    endpoints: (builder) => ({
        retreiveUser: builder.query<UserData, void>({
            query: () => ({
                url: 'user',
                method: 'GET'
            })
        }),
        loginUser: builder.mutation<UserData, Credentials>({
            query: (credentials) => ({
                url: 'login/user',
                method: 'POST',
                body: credentials,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        }),
        loginCooker: builder.mutation<UserData, Credentials>({
            query: (credentials) => ({
                url: 'login/cooker',
                method: 'POST',
                body: credentials,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: 'logout',
                method: 'DELETE',
            })
        }),
        registerUser: builder.mutation<UserData, RegisterData>({
            query: (data) => ({
                url: 'register/user',
                method: 'POST',
                body: data,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        }),
        registerCooker: builder.mutation<UserData, RegisterData>({
            query: (data) => ({
                url: 'register/user',
                method: 'POST',
                body: data,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        }),
    })
})

export const { 
    useLoginUserMutation, 
    useRegisterUserMutation,
    useLoginCookerMutation,
    useRegisterCookerMutation,
    useLogoutMutation, 
    useRetreiveUserQuery,
} = authService