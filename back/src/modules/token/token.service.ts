import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    async generateToken(dto: CreateTokenDto) : Promise<string> {
        const payload = dto;
        return await this.jwtService.signAsync(payload, {
            secret: this.configService.get('jwt_secret'),
            expiresIn: this.configService.get('jwt_expires')
        });
    }
}
