import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DishList } from './model/dish-list.model';
import { AppError } from '@src/common/errors';
import { DishListDishes } from './model/dish-list-dishes.model';
import { Meal } from '../dish/model/dish.model';
import { DishListDto, MealDishes } from './dto';
import { DishService } from '../dish/dish.service';
import { DishPreviewDto } from '../dish/dto';

@Injectable()
export class DishListService {
    constructor(
        private readonly dishService: DishService,
        @InjectModel(DishList) private readonly dishListRepository: typeof DishList,
        @InjectModel(DishListDishes) private readonly dishListDishesRepository: typeof DishListDishes
    ) {}

    async getPlainDishList(dishListId: number) : Promise<DishList> {
        const list = await this.dishListRepository.findOne({where: {id: dishListId}});
        if (!list) throw new BadRequestException(AppError.NO_DISH_LIST);
        return list;
    }

    async getDishList(dishListId: number) : Promise<DishListDto> {
        const rows = await this.dishListDishesRepository.findAll({where: {dishListId}, attributes: ["dishId", "meal"]});
        if (!rows) throw new BadRequestException(AppError.NO_DISH_LIST);
        const res = new DishListDto();
        res.id = dishListId;
        const unique = new Set<number>();
        rows.forEach(r => { unique.add(r.dishId) });
        const dishes = await this.dishService.getDishesByIds([...unique.values()]);
        const dishesPreviews = await this.dishService.getDishesPreviewDto(dishes);
        const view = new Map(dishesPreviews.map(preview => [preview.id, preview]));
        const meal = new Map<Meal, (DishPreviewDto)[]>();
        rows.forEach(row => {
            if (!meal.has(row.meal)) meal.set(row.meal, []);
            const preview = view.get(row.dishId);
            if (preview) meal.get(row.meal)?.push(preview);
        });
        const mealDishes : MealDishes[] = [];
        [...meal.keys()].forEach(k => {
            const dishes = meal.get(k)
            if (dishes) {
                const row = new MealDishes()
                row.meal = k;
                row.dishes = dishes;
                mealDishes.push(row)
            }            
        })
        res.mealDishes = mealDishes;
        return res;
    }

    async getAllOwnerDishLists(ownerId: number) {
        const listIds = await this.dishListRepository.findAll({where: {ownerId}, attributes: ["id"]});
        return await Promise.all(listIds.map(dishList => this.getDishList(dishList.id)));
    }

    async createDishList(ownerId: number) {
        return await this.dishListRepository.create({ ownerId });
    }

    async deleteDishList(dishListId: number) {
        return await this.dishListRepository.destroy({where: {id: dishListId}});
    }

    async addDishInList(dishListId: number, dishId: number, meal: Meal) {
        this.dishService.getDish(dishId);
        const record = await this.dishListDishesRepository.findOne({
            where: {dishListId, dishId, meal}
        });
        if (record) throw new BadRequestException(AppError.DISH_ALREADY_IN_LIST_AS_MEAL);
        return await this.dishListDishesRepository.create({
            dishListId,
            dishId,
            meal
        });
    }

    async renoveDishFromList(dishListId: number, dishId: number, meal: Meal) {
        const record = await this.dishListDishesRepository.findOne({
            where: {dishListId, dishId, meal}
        });
        if (!record) throw new BadRequestException(AppError.NO_DISH_IN_LIST_AS_MEAL);
        return await this.dishListDishesRepository.destroy({
            where: {dishListId, dishId, meal}
        });
    }
}
