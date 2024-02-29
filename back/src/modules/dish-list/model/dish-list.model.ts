import { Dish } from "@src/modules/dish/model/dish.model";
import { NonAttribute } from "sequelize";
import { BelongsToMany, Column, Model, NotNull, Table } from "sequelize-typescript";
import { DishListDishes } from "./dish-list-dishes.model";


@Table({
    tableName: 'dish_list'
})
export class DishList extends Model {
    @BelongsToMany(() => Dish, {
        through: () => DishListDishes,
        foreignKey: 'dishListId',
        otherKey: 'dishId'
      })
    dishes: NonAttribute<Dish[]>

    @Column
    cookerId: number
}