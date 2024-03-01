import { Module } from '@nestjs/common';
import { DishListService } from './dish-list.service';
import { DishListController } from './dish-list.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dish } from '../dish/model/dish.model';
import { DishCategory } from '../dish/model/dish-category.model';
import { DishList } from './model/dish-list.model';
import { DishListDishes } from './model/dish-list-dishes.model';
import { Tutorial } from '../dish/model/tutorial.model';
import { User } from '../user/model/user.model';
import { DishModule } from '../dish/dish.module';

@Module({
  imports: [DishModule, SequelizeModule.forFeature([Dish, DishCategory, DishList, DishListDishes, Tutorial, User])],
  providers: [DishListService],
  controllers: [DishListController]
})
export class DishListModule {}
