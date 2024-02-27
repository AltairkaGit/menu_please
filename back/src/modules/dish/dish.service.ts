import { Injectable } from '@nestjs/common';
import { UploadService } from '../upload/upload.service';
import { CreateDishFormDto } from './dto';
import { Dish } from './model/dish.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class DishService {
    constructor(
        private readonly uploadService: UploadService,
        @InjectModel(Dish) private readonly dishRepository: typeof Dish
    ) {}

    async createDish(picture: Express.Multer.File, body: CreateDishFormDto) : Promise<Dish> {
        const url = await this.uploadService.uploadLocally(picture.originalname, picture.buffer);
        const dish = await this.dishRepository.create({
            picture: url,
            name: body.name,
            proteins: Number(body.proteins),
            fats: Number(body.fats),
            carbohydrates: Number(body.carbohydrates),
            recipe: body.recipe
        })
        return dish
    }

    

}
