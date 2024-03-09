import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtGuard } from "@src/guards/jwt-guard";
import { UserDto } from "../auth/dto";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @UseGuards(JwtGuard)
    async retreiveUser(@Req() req: any) {
        const { user: imposter } = req;
        const user = await this.userService.findUserById(imposter.userId)
        return new UserDto(user)
    }

}