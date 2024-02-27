import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto';
import { LoginUserDto } from './dto';
import { Response } from 'express';

@Controller('')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('register/user')
    async registerUser(@Body() dto: CreateUserDto, @Res() res: Response) {
        const { user, token } = await this.authService.registerUser(dto);
        res.cookie('token', token, {httpOnly: true});
        res.status(200);
        res.send(user);
    }

    @Post('register/cooker')
    async registerCooker(@Body() dto: CreateUserDto, @Res() res: Response) {
        const { user: cooker, token } = await this.authService.registerCooker(dto);
        res.cookie('token', token, {httpOnly: true});
        res.status(200);
        res.send(cooker);
    }

    @Post('login/user')
    async loginUser(@Body() dto: LoginUserDto, @Res() res: Response) {
        const { user, token } = await this.authService.loginUser(dto);
        res.cookie('token', token, {httpOnly: true});
        res.status(200);
        res.send(user);
    }

    @Post('login/cooker')
    async loginCooker(@Body() dto: LoginUserDto, @Res() res: Response) {
        const { user: cooker, token } = await this.authService.loginCooker(dto);
        res.cookie('token', token, {httpOnly: true});
        res.status(200);
        res.send(cooker);
    }
}
