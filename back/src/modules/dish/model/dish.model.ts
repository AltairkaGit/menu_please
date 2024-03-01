import { DataTypes, NonAttribute } from "sequelize";
import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { Tutorial } from "./tutorial.model";
import { DishCategory } from "./dish-category.model";

export enum Meal {
    breakfast = "breakfast",
    lunch = "lunch",
    dinner = "dinner"
}

@Table({
    tableName: 'dishes'
})
export class Dish extends Model {
    @Column(DataTypes.TEXT)
    picture: string

    @Column(DataTypes.STRING(20))
    kind: string

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

    @Column(DataTypes.INTEGER)
    cookerId: number

    @HasMany(() => DishCategory, 'dishId')
    categories: NonAttribute<DishCategory[]>

    @HasMany(() => Tutorial, 'dishId')
    tutorials: NonAttribute<Tutorial[]>
    
}