import { DataTypes } from "sequelize";
import { Column, Model, Table } from "sequelize-typescript";

@Table({
    tableName: 'tutorials'
})
export class Tutorial extends Model {
    @Column(DataTypes.STRING)
    url: string

    @Column
    dishId: number
}