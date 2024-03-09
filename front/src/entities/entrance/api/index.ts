import { Role } from "@shared/user-roles"

export interface UserData {
    id: number
    username: string
    email: string
    role: Role
}

export interface Credentials {email: string, password: string}

export interface RegisterData {username: string, email: string, password: string}