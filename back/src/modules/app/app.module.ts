import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import configurations from '@src/configurations';
import { User } from '@modules/user/model/user.model';
import { UserService } from '@modules/user/user.service';
import { UserController } from '@modules/user/user.controller';
import { AuthController } from '@modules/auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations]
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('db_source'),
        port: configService.get('db_port'),
        database: configService.get('db_name'),
        username: configService.get('db_user'),
        password: configService.get('db_password'),
        synchronize: true,
        autoLoadModels: true,
        schema: 'please',
        models: [
          User
        ]
      })
    }),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
