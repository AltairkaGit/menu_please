import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('jwt_secret'),
        signOptions: {
          expiresIn: configService.get('jwt_expires')
        }
      }),
      inject: [ConfigService],
    }),
  ],  
  providers: [TokenService, JwtService],
  controllers: [],
  exports: [TokenService]
})
export class TokenModule {}
