import { BelongsTo, Column, Model, Table } from "sequelize-typescript";
import { Dish, Meal } from "./dish.model";
import { NonAttribute } from "sequelize";

@Table({
    tableName: 'dish_category'
})
export class DishCategory extends Model {
    @Column
    dishId: number

    @Column
    meal: Meal

    @BelongsTo(() => Dish)
    dish: NonAttribute<Dish>
}