import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DishList } from './model/dish-list.model';
import { AppError } from '@src/common/errors';
import { DishListDishes } from './model/dish-list-dishes.model';
import { Meal } from '../dish/model/dish.model';
import { DishListDto } from './dto';
import { DishService } from '../dish/dish.service';
import { AmountedDishDto, DishDto } from '../dish/dto';

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
        const dishesDto = await this.dishService.getAmountedDishesDto(dishes);
        const view = new Map(dishesDto.map(dto => [dto.id, dto]));
        const meal = new Map<Meal, AmountedDishDto[]>();
        rows.forEach(row => {
            !meal.has(row.meal) && meal.set(row.meal, []);
            const dto = view.get(row.dishId)
            dto && meal.get(row.meal)?.push(dto);
        });
        res.breakfast = meal.get(Meal.breakfast) ?? []
        res.lunch = meal.get(Meal.lunch) ?? []
        res.dinner = meal.get(Meal.dinner) ?? []
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
        await this.dishListRepository.destroy({where: {id: dishListId}});
    }

    async addDishInList(dishListId: number, dishId: number, meal: Meal) {
        let record = await this.dishListDishesRepository.findOne({
            where: {dishListId, dishId, meal}
        });
        if (record) throw new BadRequestException(AppError.DISH_ALREADY_IN_LIST_AS_MEAL);
        record = await this.dishListDishesRepository.create({
            dishListId,
            dishId,
            meal,
            amount: 1
        });
        const dish = await this.dishService.getDish(dishId);
        return this.dishService.getAmountedDishDto(dish, record.amount);
    }
    
    async changeAmount(dishListId: number, dishId: number, meal: Meal, amount: number) {
        const record = await this.dishListDishesRepository.findOne({
            where: {dishListId, dishId, meal}
        });
        if (!record) throw new BadRequestException(AppError.NO_DISH_IN_LIST_AS_MEAL);
        if (amount <= 0) throw new BadRequestException(AppError.NOT_POSITIVE_MEAL_AMOUNT);
        record.amount = amount;
        await record.save();
        const dish = await this.dishService.getDish(dishId);
        return this.dishService.getAmountedDishDto(dish, record.amount);
    }

    async removeDishFromList(dishListId: number, dishId: number, meal: Meal) {
        const record = await this.dishListDishesRepository.findOne({
            where: {dishListId, dishId, meal}
        });
        if (!record) throw new BadRequestException(AppError.NO_DISH_IN_LIST_AS_MEAL);
        await this.dishListDishesRepository.destroy({
            where: {dishListId, dishId, meal}
        });
    }
}
