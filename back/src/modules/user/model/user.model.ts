import { DataTypes } from "sequelize";
import { Column, Model, Table } from "sequelize-typescript";

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
}