import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { DishList } from "../api"
import { RootState } from "@shared/store"
import { dishListService } from "@features/dish-list/service"
import { Meal } from "@entities/dish/api"
import { useSelector } from "react-redux"


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
        increase: (state, {payload}: PayloadAction<{id: number, meal: Meal, dishId: number}>) => void state.lists.find() //increase and decrease here, remove local state from controller
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
            const list = state.lists.find(list => list.id == id)
            if (!list) return
            const dish = list[meal].find(item => item.id == dishId)
            if (!dish) list[meal].push(action.payload)
        })
    }
})

export const selectDishLists = (state: RootState) => state.dishList.lists
export const selectDishList = (state: RootState, id: number) => state.dishList.lists.find(list => list.id == id) ?? {id: 0, breakfast: [], lunch: [], dinner: []}

export default dishListSlice