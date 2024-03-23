import { Dish, Meal } from "@entities/dish/api"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { createUrl } from "@shared/base-api"
import { URLSearchParams } from "url"


interface SearchParams {
    take: number
    skip?: number 
    meal: Meal
    query?: string
    sort?: string 
    ord?: string
}

export const dishService = createApi({
    reducerPath: 'service/dish',
    baseQuery: fetchBaseQuery({ baseUrl: createUrl('dish'), credentials: "include" }),
    tagTypes: ['Dish'],
    endpoints: (builder) => ({
        search: builder.query<Dish[], SearchParams>({
            query: (queryParams) => ({
                url: `?meal=${queryParams.meal}&skip=${queryParams.skip ?? 0}&take=${queryParams.take ?? 0}`,
                method: 'GET',
            }),
            serializeQueryArgs: ({ queryArgs }) => {
                const newQueryArgs = { ...queryArgs }
                if (newQueryArgs.skip) delete newQueryArgs.skip
                return newQueryArgs
            },
            merge: (currentCache, newItems) => {
            if (currentCache) {
                return {
                ...currentCache,
                ...newItems,
                }
            }
            return newItems
            }
        }),
        getDishById: builder.query<Dish, number>({
            query: (id) => ({
                url: `/${id}`,
                method: 'GET',
            }),
            providesTags: (result) => result ? [({type: 'Dish', id: result.id})] : ['Dish']
        }),
        getAllCookerDishes: builder.query<Dish[], number>({
            query: (cookerId) => ({
                url: `/cooker/${cookerId}`,
                method: 'GET',
            }),
            providesTags: (result) => result ? result.map(item => ({type: 'Dish', id: item.id})) : ['Dish']
        })
    })
})

export const {
    useSearchQuery,
    useGetDishByIdQuery,
    useGetAllCookerDishesQuery
} = dishService