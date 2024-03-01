import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadService } from '../upload/upload.service';
import { CreateDishFormDto, DishDto, UpdateDishGeneralDto } from './dto';
import { Dish, Meal } from './model/dish.model';
import { InjectModel } from '@nestjs/sequelize';
import { Tutorial } from './model/tutorial.model';
import { DishCategory } from './model/dish-category.model';
import { AppError } from '@src/common/errors';
import { Op } from 'sequelize';

@Injectable()
export class DishService {
    constructor(
        private readonly uploadService: UploadService,
        @InjectModel(Dish) private readonly dishRepository: typeof Dish,
        @InjectModel(DishCategory) private readonly dishCategoryRepository: typeof DishCategory,
        @InjectModel(Tutorial) private readonly tutorialRepository: typeof Tutorial
    ) {}

    async getDish(id: number) : Promise<Dish> {
        const dish = await this.dishRepository.findByPk(id);
        if (!dish) throw new BadRequestException(AppError.NO_DISH);
        return dish;
    }

    async getCookerDishes(cookerId: number) : Promise<Dish[]> {
        return await this.dishRepository.findAll({
            where: {
                cookerId
            }
        });
    }

    async getDishes({ take, skip, search, ord, dir, meal}: {
        take: number, 
        skip: number, 
        search: string, 
        ord: keyof Dish,
        dir: 'asc' | 'desc',
        meal: Meal
    }) : Promise<{rows: Dish[], count: number}> {
        return await this.dishRepository.findAndCountAll({
            include: [{
                association: 'categories',
                where: { meal }
            }],
            where: {
                name: {[Op.like]: '%' + search + '%'},
            },
            order: [[
                ord, dir
            ]],
            limit: take,
            offset: skip
        })
    }

    async createDish(picture: Express.Multer.File, {categories, tutorials, ...body}: CreateDishFormDto, cookerId: number) : Promise<DishDto> {
        console.log(categories)
        const url = await this.uploadService.uploadLocally(picture.originalname, picture.buffer);
        const dish = await this.dishRepository.create({
            picture: url,
            name: body.name,
            proteins: Number(body.proteins),
            fats: Number(body.fats),
            carbohydrates: Number(body.carbohydrates),
            recipe: body.recipe,
            cookerId
        });
        await Promise.all(categories.map(meal => this.addDishCategory(dish, meal)));
        tutorials && await Promise.all(tutorials.map(url => this.addTutorial(dish, url)));
        return new DishDto(dish, categories, tutorials);
    }

    async removeDish(dish: Dish) : Promise<void> {
        await this.dishRepository.destroy({
            where: {
                dishId: dish.id
            }
        });
    }

    async addTutorial(dish: Dish, url: string) : Promise<Tutorial> {
        return this.tutorialRepository.create({
            dishId: dish.id,
            url
        });
    }

    async addDishCategory(dish: Dish, meal: Meal) : Promise<DishCategory> {
        return this.dishCategoryRepository.create({
            dishId: dish.id,
            meal: meal.toLocaleString()
        });
    }

    async removeTutorial(dish: Dish, url: string) : Promise<void> {
        await this.tutorialRepository.destroy({
            where: {
                dishId: dish.id,
                url
            }
        });
        return
    }

    async removeDishCategory(dish: Dish, meal: Meal) : Promise<void> {
        await this.dishCategoryRepository.destroy({
            where: {
                dishId: dish.id,
                meal
            }
        });
    }

    async updateDishGeneral(dish: Dish, dto: UpdateDishGeneralDto) : Promise<Dish> {
        dish.picture = dto.picture;
        dish.name = dto.name;
        dish.proteins = dto.proteins;
        dish.fats = dto.fats;
        dish.carbohydrates = dto.carbohydrates;
        return await dish.save();
    }

    async updateDishRecipe(dish: Dish, recipe: string) : Promise<Dish> {
        dish.recipe = recipe;
        return await dish.save();
    }

}
