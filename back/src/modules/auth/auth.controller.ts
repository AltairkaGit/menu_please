import { Body, Controller, Delete, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto';
import { LoginUserDto, UserDto } from './dto';
import { Response } from 'express';

@Controller('')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    private prepareSignInCookie(token: string, res: Response) {
        res.cookie('token', token, {expires: new Date(Date.now() + 432000000), httpOnly: true});
        res.cookie('auth', true, {expires: new Date(Date.now() + 432000000),  httpOnly: false});
    }

    private prepareSignOutCookie(res: Response) {
        res.clearCookie('token');
        res.cookie('auth', false, {expires: new Date(Date.now() + 432000000),  httpOnly: false});
    }

    @Post('register/user')
    async registerUser(@Body() dto: CreateUserDto, @Res() res: Response) {
        const { user, token } = await this.authService.registerUser(dto);
        this.prepareSignInCookie(token, res)
        res.status(200);
        res.send(new UserDto(user));
    }

    @Post('register/cooker')
    async registerCooker(@Body() dto: CreateUserDto, @Res() res: Response) {
        const { user: cooker, token } = await this.authService.registerCooker(dto);
        this.prepareSignInCookie(token, res)
        res.status(200);
        res.send(new UserDto(cooker));
    }

    @Post('login/user')
    async loginUser(@Body() dto: LoginUserDto, @Res() res: Response) {
        const { user, token } = await this.authService.loginUser(dto);
        this.prepareSignInCookie(token, res)
        res.status(200);
        res.send(new UserDto(user));
    }

    @Post('login/cooker')
    async loginCooker(@Body() dto: LoginUserDto, @Res() res: Response) {
        const { user: cooker, token } = await this.authService.loginCooker(dto);
        this.prepareSignInCookie(token, res)
        res.status(200);
        res.send(new UserDto(cooker));
    }

    @Delete('logout')
    async logout(@Res() res: Response) {
        this.prepareSignOutCookie(res)
        res.status(200);
        res.send();
    }
}
