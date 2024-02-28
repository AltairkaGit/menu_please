import { Module } from '@nestjs/common';
import { DishService } from './dish.service';
import { DishController } from './dish.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dish } from './model/dish.model';
import { UploadModule } from '../upload/upload.module';
import { DishList } from '../dish-list/model/dish-list.model';
import { DishListDishes } from '../dish-list/model/dish-list-dishes.model';
import { Tutorial } from './model/tutorial.model';
import { User } from '../user/model/user.model';
import { DishCategory } from './model/dish-category.model';
import { DishOwnerGuard } from './dish-owner-guard';

@Module({
  imports: [SequelizeModule.forFeature([Dish, DishCategory, DishList, DishListDishes, Tutorial, User]), UploadModule],
  providers: [DishService, DishOwnerGuard],
  controllers: [DishController]
})
export class DishModule {}