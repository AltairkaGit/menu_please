import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto';
import { LoginUserDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('register/user')
    registerUser(@Body() dto: CreateUserDto) {
        return this.authService.registerUser(dto);
    }

    @Post('register/cooker')
    registerCooker(@Body() dto: CreateUserDto) {
        return this.authService.registerCooker(dto);
    }

    @Post('login/user')
    loginUser(@Body() dto: LoginUserDto) {
        return this.authService.loginUser(dto);

    }

    @Post('login/cooker')
    loginCooker(@Body() dto: LoginUserDto) {
        return this.authService.loginCooker(dto);
    }

}
