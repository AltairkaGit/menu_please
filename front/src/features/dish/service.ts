import { Dish, Meal } from "@entities/dish/api"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { createUrl } from "@shared/base-api"
import { DishData } from "@shared/kit/dish-create-kit"
import { MutableRefObject } from "react"

interface SearchParams {
    take: number
    skip?: number 
    meal: Meal
    query?: string
    sort?: string 
    ord?: string
}

interface DishForm extends DishData {
    picture: MutableRefObject<any>
}

const dishFormToFormData = (data: DishForm) => {
    const fd = new FormData()
    fd.append("file", data.picture.current as Blob)
    fd.append("name", data.name)
    fd.append("kind", data.kind)
    fd.append("recipe", data.recipe)
    fd.append("proteins", `${data.p}`)
    fd.append("fats", `${data.f}`)
    fd.append("carbohydrates", `${data.c}`)
    data.meal_breakfast && fd.append("categories", "breakfast")
    data.meal_lunch && fd.append("categories", "lunch")
    data.meal_dinner && fd.append("categories", "dinner")
    return fd
}

export const dishService = createApi({
    reducerPath: 'service/dish',
    baseQuery: fetchBaseQuery({ baseUrl: createUrl('dish'), credentials: "include" }),
    tagTypes: ['Dish'],
    endpoints: (builder) => ({
        search: builder.query<Dish[], SearchParams>({
            query: (qp) => ({
                url: `?meal=${qp.meal}&skip=${qp.skip ?? 0}&take=${qp.take ?? 0}&ord=${qp.ord ?? "createdAt"}&dir=${qp.sort ?? "desc"}`,
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
        }),
        createDish: builder.mutation<Dish, DishForm>({
            query: (data) => {               
                return {
                    url: '',
                    method: 'POST',
                    body: dishFormToFormData(data)
                }
            }
        }),
        updateDish: builder.mutation<Dish, DishForm & {id: number}>({
            query: (data) => {               
                return {
                    url: `/${data.id}`,
                    method: 'PUT',
                    body: dishFormToFormData(data)
                }
            },
            invalidatesTags: (result) => result ? [({type: 'Dish', id: result.id})] : ['Dish']
        }),
        deleteDish: builder.mutation<Dish, number>({
            query: (id) => {               
                return {
                    url: `/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: (result) => result ? [({type: 'Dish', id: result.id})] : ['Dish']
        })
    })
})

export const {
    useSearchQuery,
    useGetDishByIdQuery,
    useGetAllCookerDishesQuery,
    useCreateDishMutation,
    useUpdateDishMutation,
    useDeleteDishMutation
} = dishService