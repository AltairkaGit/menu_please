import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./model/user.model";
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from "./dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private readonly userRepository: typeof User) {}

    async hashPassword(password: string) {
        return bcrypt.hash(password, 12);
    }

    async findUserByEmail(email: string) {
        return this.userRepository.findOne({where: {email, type: 'user'}});
    }

    async findCookerByEmail(email: string) {
        return this.userRepository.findOne({where: {email, type: 'cooker'}});
    }

    async createUser(dto: CreateUserDto) : Promise<User> {
        dto.password = await this.hashPassword(dto.password);
        const user = await this.userRepository.create({
            username: dto.username,
            email: dto.email,
            password: dto.password,
            type: 'user'
        });
        return user;
    }

    async createCooker(dto: CreateUserDto) : Promise<User> {        
        dto.password = await this.hashPassword(dto.password);
        const cooker = await this.userRepository.create({
            username: dto.username,
            email: dto.email,
            password: dto.password,
            type: 'cooker'
        });
        return cooker;
    }


}