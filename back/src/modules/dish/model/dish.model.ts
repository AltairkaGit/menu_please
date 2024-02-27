import { DataTypes } from "sequelize";
import { Column, Model, Table } from "sequelize-typescript";

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
}