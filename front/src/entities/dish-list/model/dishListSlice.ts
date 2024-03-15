import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { DishList } from "../api"
import { RootState } from "@shared/store"
import { dishListService } from "@features/dish-list/service"


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
        remove: (state, {payload: listId}: PayloadAction<number>) => void state.lists.splice(state.lists.findIndex((list) => list.id == listId), 1)
    },
    extraReducers: (builder) => {
        builder.addMatcher(dishListService.endpoints.getAll.matchFulfilled, (state, {payload}) => void state.lists.splice(0, state.lists.length, ...payload))
        builder.addMatcher(dishListService.endpoints.get.matchFulfilled, (state, {payload}) => {
            const idx = state.lists.findIndex(list => list.id == payload.id)
            if (idx >= 0) state.lists.splice(idx, 1, payload) 
            else state.lists.push(payload)
        })
        builder.addMatcher(dishListService.endpoints.create.matchFulfilled, (state, {payload}) => void state.lists.push(payload))
    }
})

export const selectDishLists = (state: RootState) => state.dishList.lists

export default dishListSlice