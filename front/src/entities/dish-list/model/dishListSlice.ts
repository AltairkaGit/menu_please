import { createSlice } from "@reduxjs/toolkit"
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
    },
    extraReducers: (builder) => {
        builder.addMatcher(dishListService.endpoints.getAll.matchFulfilled, (state, {payload}) => void state.lists.push(...payload))
    }
})

export const selectDishLists = (state: RootState) => state.dishList.lists

export default dishListSlice