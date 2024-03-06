import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "@shared/store"

interface AuthState {
    username: string,
    userId: number,
    role: 'user' | 'cook',
}

const initialState : AuthState = {
    username: '',
    userId: -1,
    role: 'user'
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state, action) => {
            
        }
    }
})

export const selectIsAuth = (state: RootState) => state.auth.userId >= 0

export default authSlice.reducer