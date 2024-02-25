import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./model/user.model";



@Module({
    imports: [SequelizeModule.forFeature([User])],
    controllers: [],
    providers: []
})
export class userModule {}