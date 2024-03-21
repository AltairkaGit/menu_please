import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit"
import { DishList } from "../api"
import { RootState } from "@shared/store"
import { dishListService } from "@features/menu/service"
import { AmountedDish, Meal } from "@entities/dish/api"


interface DishListState {
    lists: DishList[]
}

const initialState : DishListState = {
    lists: []
}

export const dishListSlice = createSlice({
    name: 'dishList',
    initialState,
    reducers: {
        remove: (state, {payload: listId}: PayloadAction<number>) => void state.lists.splice(state.lists.findIndex((list) => list.id == listId), 1),
        increaseDishAmount: (state, {payload}: PayloadAction<{id: number, meal: Meal, dishId: number}>) => {
            const list = state.lists.find(list => list.id == payload.id)
            if (!list) return
            const dish = list[payload.meal].find(dish => dish.id == payload.dishId)
            if (!dish) return
            dish.amount++
        },
        decreaseDishAmount: (state, {payload}: PayloadAction<{id: number, meal: Meal, dishId: number}>) => {
            const list = state.lists.find(list => list.id == payload.id)
            if (!list) return
            const dish = list[payload.meal].find(dish => dish.id == payload.dishId)
            if (!dish) return
            dish.amount--
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(dishListService.endpoints.getAll.matchFulfilled, (state, {payload}) => void state.lists.splice(0, state.lists.length, ...payload))
        builder.addMatcher(dishListService.endpoints.get.matchFulfilled, (state, {payload}) => {
            const idx = state.lists.findIndex(list => list.id == payload.id)
            if (idx >= 0) state.lists.splice(idx, 1, payload) 
            else state.lists.push(payload)
        })
        builder.addMatcher(dishListService.endpoints.create.matchFulfilled, (state, {payload}) => void state.lists.push(payload))
        builder.addMatcher(dishListService.endpoints.changeAmount.matchFulfilled, (state, action) => {
            const {id, body} = action.meta.arg.originalArgs
            const {meal, dishId} = body
            const list = state.lists.find(list => list.id == id)
            if (!list) return
            const dishIdx = list[meal].findIndex(item => item.id == dishId)
            if (dishIdx >= 0) list[meal].splice(dishIdx, 1, action.payload)
        })
        builder.addMatcher(dishListService.endpoints.deleteDish.matchFulfilled, (state, action) => {
            const {id, body} = action.meta.arg.originalArgs
            const {meal, dishId} = body
            const list = state.lists.find(list => list.id == id)
            if (!list) return
            const idx = list[meal].findIndex(item => item.id == dishId)
            if (idx >= 0) list[meal].splice(idx, 1)
        })
        builder.addMatcher(dishListService.endpoints.addDish.matchFulfilled, (state, action) => {
            const {id, body} = action.meta.arg.originalArgs
            const {meal, dishId} = body
            state.lists = state.lists.map(list => {
                if (list.id == id && !list[meal].find(dish => dish.id == dishId))
                    list[meal].push(action.payload)
                return list
            })
        })
    }
})

export const selectDishLists = (state: RootState) => state.dishList.lists
export const selectDishList = (id: number) => createSelector((state: RootState) => state.dishList.lists.find(list => list.id == id), (list) => list)
export const selectDishListMealDish = (id: number, meal: Meal, dishId?: number) => createSelector(
    (state: RootState) => state.dishList.lists.find(list => list.id == id),
    (list) => {
        const dishes = list ? list[meal] : []
        return dishes.find(dish => dish.id == dishId)
    }
)

export const {
    increaseDishAmount,
    decreaseDishAmount
} = dishListSlice.actions

export default dishListSlice