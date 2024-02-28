import { Dish, Meal } from "@src/modules/dish/model/dish.model";
import { NonAttribute } from "sequelize";
import { Column, HasOne, Model, Table } from "sequelize-typescript";
import { DishList } from "./dish-list.model";

@Table({
    tableName: 'dish_list_dishes'
})
export class DishListDishes extends Model {
    @Column
    dishListId: number

    @Column
    dishId: number

    @Column
    meal: Meal

    @HasOne(() => DishList)
    dishList: NonAttribute<DishList>

    @HasOne(() => Dish)
    dish: NonAttribute<Dish>
}