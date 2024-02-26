import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: (req: Request) => req.cookies['token'],
            ignoreExpiration: false,
            secretOrKey: configService.get('jwt_secret')
        })
    }

    async validate(payload: any) {
        return {...payload}
    }
}