import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '@modules/user/user.service';
import { CreateUserDto } from '../user/dto';
import { AppError } from '@src/common/errors';
import { LoginUserDto } from './dto';
import * as bcrypt from 'bcrypt';
import { User } from '../user/model/user.model';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService
    ) {}

    async registerUser(dto: CreateUserDto) : Promise<{user: User, token: string}> {
        const existUser = await this.userService.findUserByEmail(dto.email);
        if (existUser) throw new BadRequestException(AppError.USER_ALREADY_EXIST);
        const user = await this.userService.createUser(dto);
        const token = await this.tokenService.generateToken({role: user.type, userId: user.id})
        return {user, token};
    }

    async registerCooker(dto: CreateUserDto) : Promise<{user: User, token: string}> {
        const existUser = await this.userService.findCookerByEmail(dto.email);
        if (existUser) throw new BadRequestException(AppError.COOKER_ALREADY_EXIST);
        const cooker = await this.userService.createCooker(dto);
        const token = await this.tokenService.generateToken({role: cooker.type, userId: cooker.id})
        return {user: cooker, token};
    }

    async loginUser(dto: LoginUserDto) : Promise<{user: User, token: string}> {
        const user = await this.userService.findUserByEmail(dto.email);
        if (!user) throw new BadRequestException(AppError.INCORRECT_CREDENTIALS);
        const validatePassword = bcrypt.compare(dto.password, user.password);
        if (!validatePassword) throw new BadRequestException(AppError.INCORRECT_CREDENTIALS);
        const token = await this.tokenService.generateToken({role: user.type, userId: user.id})
        return {user, token};
    }

    async loginCooker(dto: LoginUserDto) : Promise<{user: User, token: string}> {
        const cooker = await this.userService.findCookerByEmail(dto.email);
        if (!cooker) throw new BadRequestException(AppError.INCORRECT_CREDENTIALS);
        const validatePassword = bcrypt.compare(dto.password, cooker.password);
        if (!validatePassword) throw new BadRequestException(AppError.INCORRECT_CREDENTIALS);
        const token = await this.tokenService.generateToken({role: cooker.type, userId: cooker.id})
        return {user: cooker, token};
    }
}
