import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadService } from '../upload/upload.service';
import { CreateDishFormDto, DishDto } from './dto';
import { Dish, Meal } from './model/dish.model';
import { InjectModel } from '@nestjs/sequelize';
import { Tutorial } from './model/tutorial.model';
import { DishCategory } from './model/dish-category.model';
import { AppError } from '@src/common/errors';
import { Op } from 'sequelize';
import { UserService } from '../user/user.service';

@Injectable()
export class DishService {
    constructor(
        private readonly uploadService: UploadService,
        private readonly userService: UserService,
        @InjectModel(Dish) private readonly dishRepository: typeof Dish,
        @InjectModel(DishCategory) private readonly dishCategoryRepository: typeof DishCategory,
        @InjectModel(Tutorial) private readonly tutorialRepository: typeof Tutorial
    ) {}

    async getDishDto(dish: Dish) {
        const categories = (await this.dishCategoryRepository.findAll({where: {dishId: dish.id}})).map(m => m.meal);
        const tutorials = (await this.tutorialRepository.findAll({where: {dishId: dish.id}})).map(t => t.url);
        const cooker = await this.userService.findUserById(dish.cookerId);
        return new DishDto(dish, categories, tutorials[0], cooker);
    }

    async getDishesDto(dishes: Dish[]) {
        return Promise.all(dishes.map(d => this.getDishDto(d)));
    }

    async getDish(id: number) : Promise<Dish> {
        const dish = await this.dishRepository.findByPk(id);
        if (!dish) throw new BadRequestException(AppError.NO_DISH);
        return dish;
    }

    async getDishesByIds(ids: number[]) : Promise<Dish[]> {
        return await this.dishRepository.findAll({ where: {id: {[Op.in]: ids}}});
    } 

    async getCookerDishes(cookerId: number) : Promise<Dish[]> {
        return await this.dishRepository.findAll({where: { cookerId } });
    }

    async getDishes({ take, skip, meal, ord = 'name', dir = 'asc', name = '', kind = ''}: {
        take: number, 
        skip: number,
        meal: Meal
        kind?: string
        name?: string, 
        ord?: keyof Dish,
        dir?: 'asc' | 'desc',        
    }) : Promise<{rows: Dish[], count: number}> {
        return await this.dishRepository.findAndCountAll({
            include: [{
                association: 'categories',
                where: { meal }
            }],
            where: {
                kind: {[Op.like]: '%' + kind + '%'},
                name: {[Op.like]: '%' + name + '%'},
            },
            order: [[
                ord, dir
            ]],
            limit: take,
            offset: skip
        })
    }

    async createDish(picture: Express.Multer.File, {categories, tutorial, ...body}: CreateDishFormDto, cookerId: number) : Promise<Dish> {
        const url = await this.uploadService.uploadLocally(picture.originalname, picture.buffer);
        const dish = await this.dishRepository.create({
            picture: url,
            kind: body.kind,
            name: body.name,
            proteins: Number(body.proteins),
            fats: Number(body.fats),
            carbohydrates: Number(body.carbohydrates),
            recipe: body.recipe,
            cookerId: cookerId,            
        });
        await Promise.all(categories.map(meal => this.addDishCategory(dish, meal)));
        tutorial && await this.addTutorial(dish, tutorial);
        return dish;
    }

    async updateDish(picture: Express.Multer.File, {categories, tutorial, ...body}: CreateDishFormDto, cookerId: number, dishId: number) : Promise<Dish> {
        const dish = await this.dishRepository.findOne({where: {id: dishId}});
        if (!dish) throw new BadRequestException(AppError.NO_DISH);
        const url = await this.uploadService.uploadLocally(picture.originalname, picture.buffer);
        dish.picture = url;
        dish.kind = body.kind;
        dish.name = body.name;
        dish.proteins = Number(body.proteins);
        dish.fats = Number(body.fats);
        dish.carbohydrates = Number(body.carbohydrates);
        dish.recipe = body.recipe;
        dish.cookerId = cookerId;
        await dish.save();
        const dishCategories = await this.dishCategoryRepository.findAll({where: {dishId}});
        await Promise.all(dishCategories?.map(c => this.removeDishCategory(dish, c.meal)));
        await Promise.all(categories?.map(meal => this.addDishCategory(dish, meal)));
        await this.updateTutorial(dish, tutorial);
        return dish;
    }

    async removeDish(dish: Dish) : Promise<void> {
        await this.dishRepository.destroy({
            where: {
                dishId: dish.id
            }
        });
    }

    async addTutorial(dish: Dish, url: string) : Promise<Dish> {
        if (url) await this.tutorialRepository.create({
            dishId: dish.id,
            url
        });
        return dish.save();
    }

    async updateTutorial(dish: Dish, url: string) : Promise<Dish> {
        const tutorial = await this.tutorialRepository.findOne({where: {dishId: dish.id}});
        if (!tutorial) return this.addTutorial(dish, url);
        if (url) {
            tutorial.url = url;
            tutorial.save();
        }
        else await this.removeTutorial(dish, url);
        return dish.save();
        
    }

    async addDishCategory(dish: Dish, meal: Meal) : Promise<Dish> {
        const category = await this.dishCategoryRepository.findOne({where: {dishId: dish.id, meal}});
        if (category) throw new BadRequestException(AppError.DISH_ALREADY_HAS_THE_MEAL);
        await this.dishCategoryRepository.create({
            dishId: dish.id,
            meal: meal.toLocaleString()
        });
        return dish.save();
    }

    async removeTutorial(dish: Dish, url: string) : Promise<void> {
        await this.tutorialRepository.destroy({
            where: {
                dishId: dish.id,
                url
            }
        });
    }

    async removeDishCategory(dish: Dish, meal: Meal) : Promise<void> {
        await this.dishCategoryRepository.destroy({
            where: {
                dishId: dish.id,
                meal
            }
        });
    }

}
