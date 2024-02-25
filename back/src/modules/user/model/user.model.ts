import { DataTypes } from "sequelize";
import { Column, Model, Table } from "sequelize-typescript";

@Table
export class User extends Model {
    @Column(DataTypes.STRING(40))
    username: string

    @Column(DataTypes.STRING(40))
    email: string

    @Column(DataTypes.STRING(75))
    password: string
}