import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DishList } from './model/dish-list.model';
import { AppError } from '@src/common/errors';
import { DishListDishes } from './model/dish-list-dishes.model';
import { Meal } from '../dish/model/dish.model';

@Injectable()
export class DishListService {
    constructor(
        @InjectModel(DishList) private readonly dishListRepository: typeof DishList,
        @InjectModel(DishListDishes) private readonly dishListDishesRepository: typeof DishListDishes
    ) {}

    async getDishList(dishListId: number) : Promise<DishList> {
        const list =  await this.dishListRepository.findOne({where: {id: dishListId}});
        if (!list) throw new BadRequestException(AppError.NO_DISH_LIST);
        return list;
    }

    async getAllOwnerDishLists(ownerId: number) {
        console.log('ownerId', ownerId);
        const lists = await this.dishListDishesRepository.findAll({
            where: {
                ownerId
            },
            include: [{
                association: 'dish',
                where: {
                    cookerId: ownerId
                }
            }],
            group: ['dishListId', 'meal']
        });
        console.log(lists);
    }

    async createDishList(ownerId: number) {
        return await this.dishListRepository.create({
            ownerId
        });
    }

    async deleteDishList(dishListId: number) {
        return await this.dishListRepository.destroy({
            where: {
                id: dishListId
            }
        });
    }

    async addDishInList(dishListId: number, dishId: number, meal: Meal) {
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
