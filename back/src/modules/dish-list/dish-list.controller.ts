import { Body, Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { DishListService } from './dish-list.service';
import { JwtGuard } from '@src/guards/jwt-guard';
import { DishListOwnerGuard } from './dish-list-owner-guard';
import { Meal } from '../dish/model/dish.model';

@Controller('dish-list')
export class DishListController {
    constructor(
        private readonly dishListService: DishListService
    ) {}
    
    @Get('all')
    @UseGuards(JwtGuard)
    async getAllDishLists(@Req() req: any) {
        const { user } = req;
        return await this.dishListService.getAllOwnerDishLists(user.userId);
    }

    @Get()
    @UseGuards(JwtGuard, DishListOwnerGuard)
    async getDishList(@Body() { dishListId }: {dishListId: number }) {
        return await this.dishListService.getDishList(dishListId);
    }

    @Post()
    @UseGuards(JwtGuard)
    async createDishList(@Req() req: any) {
        const { user } = req;
        return await this.dishListService.createDishList(user.userId);
    }

    @Delete()
    @UseGuards(JwtGuard, DishListOwnerGuard)
    async deleteDishList(@Body() {dishListId}: {dishListId: number}) {
        return await this.dishListService.deleteDishList(dishListId);
    }
    
    @Post()
    @UseGuards(JwtGuard, DishListOwnerGuard)
    async addDishInList(@Body() {dishListId, dishId, meal}: { dishListId: number, dishId: number, meal: Meal }) {
        return await this.dishListService.addDishInList(dishListId, dishId, meal);
    }

    @Delete()
    @UseGuards(JwtGuard, DishListOwnerGuard)
    async removeDishFromList(@Body() {dishListId, dishId, meal}: { dishListId: number, dishId: number, meal: Meal }) {
        return await this.dishListService.renoveDishFromList(dishListId, dishId, meal);
    }

}
