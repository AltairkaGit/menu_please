import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./model/user.model";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { Dish } from "../dish/model/dish.model";
import { DishList } from "../dish-list/model/dish-list.model";
import { DishListDishes } from "../dish-list/model/dish-list-dishes.model";
import { Tutorial } from "../dish/model/tutorial.model";
import { DishCategory } from "../dish/model/dish-category.model";

@Module({
    imports: [SequelizeModule.forFeature([User, Dish, DishCategory, DishList, DishListDishes, Tutorial])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}