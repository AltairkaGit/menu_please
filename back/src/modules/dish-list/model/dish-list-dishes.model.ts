import { Dish, Meal } from "@src/modules/dish/model/dish.model";
import { NonAttribute } from "sequelize";
import { Column, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { DishList } from "./dish-list.model";

@Table({
    tableName: 'dish_list_dishes'
})
export class DishListDishes extends Model {
    @PrimaryKey
    @Column
    dishListId: number

    @PrimaryKey
    @Column
    dishId: number

    @PrimaryKey
    @Column
    meal: Meal

    @HasOne(() => DishList, 'id')
    dishList: NonAttribute<DishList>

    @HasOne(() => Dish, 'id')
    dish: NonAttribute<Dish>
}