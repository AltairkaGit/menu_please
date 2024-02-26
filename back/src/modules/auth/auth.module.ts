import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '@modules/user/user.module';
import { AuthService } from './auth.service';
import { TokenModule } from '../token/token.module';
import { JwtStrategy } from '@src/strategies';

@Module({
    imports: [UserModule, TokenModule],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}
