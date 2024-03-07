import { User } from "@src/modules/user/model/user.model"
import { IsNumber, IsString } from "class-validator"

export class LoginUserDto {
    @IsString()
    email: string

    @IsString()
    password: string
}

export class UserDto {
    constructor (user: User) {
        this.id = user.id
        this.username = user.username
        this.email = user.email
        this.role = user.type
    }
    @IsNumber()
    id: number

    @IsString()
    username: string
    
    @IsString()
    email: string

    @IsString()
    role: string
}