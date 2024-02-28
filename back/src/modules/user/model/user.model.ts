import { DishList } from "@src/modules/dish-list/model/dish-list.model";
import { Dish } from "@src/modules/dish/model/dish.model";
import { DataTypes, NonAttribute } from "sequelize";
import { Column, HasMany, Model, Table } from "sequelize-typescript";

@Table({
    tableName: 'customers'
})
export class User extends Model {
    @Column(DataTypes.STRING(40))
    username: string

    @Column(DataTypes.STRING(40))
    email: string

    @Column(DataTypes.STRING(75))
    password: string

    @Column(DataTypes.STRING(12))
    type: 'cooker' | 'user'

    @HasMany(() => DishList, 'ownerId')
    dishLists: NonAttribute<DishList[]>

    @HasMany(() => Dish, 'cookerId')
    cookedDishes: NonAttribute<Dish[]>
}