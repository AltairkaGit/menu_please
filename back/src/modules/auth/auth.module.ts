import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '@modules/user/user.module';
import { AuthService } from './auth.service';
import { TokenModule } from '../token/token.module';

@Module({
    imports: [UserModule, TokenModule],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}
