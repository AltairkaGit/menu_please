import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
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

    @Get('id/:id')
    @UseGuards(JwtGuard, DishListOwnerGuard)
    async getDishList(@Param('id') dishListId: number) {
        return await this.dishListService.getDishList(dishListId);
    }

    @Post()
    @UseGuards(JwtGuard)
    async createDishList(@Req() req: any) {
        const { user } = req;
        return await this.dishListService.createDishList(user.userId);
    }

    @Delete('id/:id')
    @UseGuards(JwtGuard, DishListOwnerGuard)
    async deleteDishList(@Param('id') dishListId: number) {
        return await this.dishListService.deleteDishList(dishListId);
    }
    
    @Post('id/:id/dish')
    @UseGuards(JwtGuard, DishListOwnerGuard)
    async addDishInList(@Body() {dishId, meal}: { dishId: number, meal: Meal }, @Param('id') dishListId: number) {
        return await this.dishListService.addDishInList(dishListId, dishId, meal);
    }

    @Delete('id/:id/dish')
    @UseGuards(JwtGuard, DishListOwnerGuard)
    async removeDishFromList(@Body() {dishId, meal}: { dishId: number, meal: Meal }, @Param('id') dishListId: number) {
        return await this.dishListService.renoveDishFromList(dishListId, dishId, meal);
    }

}
