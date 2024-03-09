import { authService } from "@features/auth/service"
import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "@shared/store"
import { UserData } from "./auth-api"
import { Role } from "@shared/user-roles"

interface AuthState {
    username: string,
    userId: number,
    role: Role,
}

const initialState : AuthState = {
    username: '',
    userId: -1,
    role: Role.user
}

const strToRole = {
    "user": Role.user,
    "cooker": Role.cook
}

const setAuthState = (state: AuthState, payload: UserData) => {
    state.userId = payload.id
    state.role = strToRole[payload.role]
    state.username = payload.username
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addMatcher(authService.endpoints.retreiveUser.matchFulfilled, (state, {payload}) => setAuthState(state, payload))
        builder.addMatcher(authService.endpoints.loginCooker.matchFulfilled, (state, {payload}) => setAuthState(state, payload))
        builder.addMatcher(authService.endpoints.loginUser.matchFulfilled, (state, {payload}) => setAuthState(state, payload))
        builder.addMatcher(authService.endpoints.registerUser.matchFulfilled, (state, {payload}) => setAuthState(state, payload))
        builder.addMatcher(authService.endpoints.registerCooker.matchFulfilled, (state, {payload}) => setAuthState(state, payload))
        builder.addMatcher(authService.endpoints.logout.matchFulfilled, (state) => state = initialState)
    }
})

export const selectIsAuth = (state: RootState) => state.auth.userId >= 0
export const selectUsername = (state: RootState) => state.auth.username

export default authSlice