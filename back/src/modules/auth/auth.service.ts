import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '@modules/user/user.service';
import { CreateUserDto } from '../user/dto';
import { AppError } from '@src/common/errors';
import { LoginUserDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async registerUser(dto: CreateUserDto) : Promise<CreateUserDto> {
        const existUser = await this.userService.findUserByEmail(dto.email);
        if (existUser) throw new BadRequestException(AppError.USER_ALREADY_EXIST); 
        return this.userService.createUser(dto);
    }

    async registerCooker(dto: CreateUserDto) : Promise<CreateUserDto> {
        const existUser = await this.userService.findCookerByEmail(dto.email);
        if (existUser) throw new BadRequestException(AppError.COOKER_ALREADY_EXIST);
        return this.userService.createCooker(dto);
    }

    async loginUser(dto: LoginUserDto) {
        const user = await this.userService.findUserByEmail(dto.email);
        if (!user) throw new BadRequestException(AppError.INCORRECT_CREDENTIALS);
        const validatePassword = bcrypt.compare(dto.password, user.password);
        if (!validatePassword) throw new BadRequestException(AppError.INCORRECT_CREDENTIALS);
        return user;
    }

    async loginCooker(dto: LoginUserDto) {
        const cooker = await this.userService.findCookerByEmail(dto.email);
        if (!cooker) throw new BadRequestException(AppError.INCORRECT_CREDENTIALS);
        const validatePassword = bcrypt.compare(dto.password, cooker.password);
        if (!validatePassword) throw new BadRequestException(AppError.INCORRECT_CREDENTIALS);
        return cooker;
    }
}
