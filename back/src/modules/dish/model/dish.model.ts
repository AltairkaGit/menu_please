import { User } from "@src/modules/user/model/user.model";
import { DataTypes, NonAttribute } from "sequelize";
import { BelongsTo, Column, HasMany, Model, NotNull, Table } from "sequelize-typescript";
import { Tutorial } from "./tutorial.model";
import { DishCategory } from "./dish-category.model";

export enum Meal {
    breakfast,
    lunch,
    dinner
}

@Table({
    tableName: 'dishes'
})
export class Dish extends Model {
    @Column(DataTypes.TEXT)
    picture: string

    @Column(DataTypes.STRING(36))
    name: string

    @Column(DataTypes.INTEGER)
    proteins: number

    @Column(DataTypes.INTEGER)
    fats: number

    @Column(DataTypes.INTEGER)
    carbohydrates: number

    @Column(DataTypes.TEXT)
    recipe: string

    @HasMany(() => DishCategory, 'dishId')
    categories: NonAttribute<DishCategory[]>

    @HasMany(() => Tutorial, 'dishId')
    tutorials: NonAttribute<Tutorial[]>

    @BelongsTo(() => User, 'cookerId')
    cooker: NonAttribute<User>

    @NotNull
    cookerId: number
}