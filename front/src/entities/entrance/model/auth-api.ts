import { createUrl } from "@shared/base-api"
import { Role } from "@shared/user-roles"
import axios from "axios"

const LoginUrl = createUrl('login')
const RegisterUrl = createUrl('register')
const LogoutUrl = createUrl('logout')
const UserUrl = createUrl('user')

export interface UserData {
    id: number
    username: string
    email: string
    role: Role
}

export interface Credentials {email: string, password: string}

export interface RegisterData {username: string, email: string, password: string}

export const AuthAPI = {
    retreiveUser: async () => {
        const response = await axios.get<UserData>(UserUrl)
        return response.data
    },
    loginUser: async (credentials: Credentials) => {
        const response = await axios.post<UserData>(LoginUrl + '/user', credentials)
        return response.data
    },
    loginCook: async (credentials: Credentials) => {
        const response = await axios.post<UserData>(LoginUrl + '/cooker', credentials)
        return response.data
    },
    logout: async () => {
        await axios.delete(LogoutUrl)
    },
    registerUser: async (data: RegisterData) => {
        const response = await axios.post<UserData>(RegisterUrl + '/user', data)
        return response.data
    },
    registerCook: async (data: RegisterData) => {
        const response = await axios.post<UserData>(RegisterUrl + '/cooker', data)
        return response.data
    }
}