import { BelongsTo, Column, Model, Table } from "sequelize-typescript";
import { Dish, Meal } from "./dish.model";
import { DataTypes } from "sequelize";

@Table({
    tableName: 'dish_category'
})
export class DishCategory extends Model {
    @Column
    dishId: number

    @Column(DataTypes.STRING(12))
    meal: Meal
}