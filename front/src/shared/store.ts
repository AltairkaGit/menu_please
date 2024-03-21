import dishListSlice from "@entities/menu/model/dishListSlice"
import authSlice from "@entities/entrance/model/auth-slice"
import { authService } from "@features/auth/service"
import { dishService } from "@features/dish/service"
import { dishListService } from "@features/menu/service"
import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"

const rootReducer = combineSlices(
  authService, 
  authSlice, 
  dishListService, 
  dishListSlice, 
  dishService
)
export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware()
        .concat(authService.middleware)
        .concat(dishListService.middleware)
        .concat(dishService.middleware)
    },
    preloadedState,
  })

  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

export type AppStore = typeof store

export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
