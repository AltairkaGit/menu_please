import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import configurations from '@src/configurations';
import { User } from '@modules/user/model/user.model';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { Dish } from '@modules/dish/model/dish.model';
import { UploadModule } from '../upload/upload.module';
import { DishModule } from '../dish/dish.module';
import { DishListModule } from '../dish-list/dish-list.module';
import { DishList } from '../dish-list/model/dish-list.model';
import { DishListDishes } from '../dish-list/model/dish-list-dishes.model';
import { Tutorial } from '../dish/model/tutorial.model';
import { DishCategory } from '../dish/model/dish-category.model';

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
          User,
          Dish,
          DishList,
          DishCategory,
          DishListDishes,
          Tutorial
        ]
      })
    }),
    UserModule,
    AuthModule,
    UploadModule,
    DishModule,
    DishListModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
