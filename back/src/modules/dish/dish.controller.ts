import { Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { DishService } from './dish.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddDishCategoryDto, AddDishTutorialDto, CreateDishFormDto, DeleteDishDto, RemoveDishCategoryDto, RemoveDishTutorialDto, UpdateDishGeneralDto, UpdateDishRecipeDto } from './dto';
import { JwtGuard } from '@src/guards/jwt-guard';
import { Roles } from '@src/guards/roles.decorator';
import { Role } from '@src/guards/role.enum';
import { RolesGuard } from '@src/guards/roles-guard';
import { DishOwnerGuard } from '@src/modules/dish/dish-owner-guard';
import { Dish, Meal } from './model/dish.model';

@Controller('dish')
export class DishController {
    constructor(private readonly dishService: DishService) {}

    @Get(':id')
    getDish(@Param('id') dishId: number) {
        return this.dishService.getDish(dishId);
    }

    @Get('cooker/:id')
    getDishesByCooker(@Param('id') cookerId: number) {
        return this.dishService.getCookerDishes(cookerId);
    }

    @Get()
    getDishes(@Query() query: {
        take: number, 
        skip: number, 
        search: string, 
        ord: keyof Dish,
        dir: 'asc' | 'desc',
        meal: Meal
    }) {
        return this.dishService.getDishes(query)
    }

    @Post()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.Cooker)
    @UseInterceptors(FileInterceptor('file'))
    createDish(@UploadedFile(
        new ParseFilePipeBuilder()
            .addFileTypeValidator({
                fileType: 'png',
            })
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
            }),
    ) picture: Express.Multer.File, @Body() body: CreateDishFormDto, @Req() req: any) {
        const { user } = req;
        return this.dishService.createDish(picture, body, user.id);
    }

    @Delete()
    @UseGuards(JwtGuard, RolesGuard, DishOwnerGuard)
    @Roles(Role.Cooker)
    async deleteDish(@Body() { id }: DeleteDishDto) {
        const dish = await this.dishService.getDish(id);
        return await this.dishService.removeDish(dish);
    }

    @Put('tutorial')
    @UseGuards(JwtGuard, RolesGuard, DishOwnerGuard)
    @Roles(Role.Cooker)
    async addTutorial(@Body() { id, url }: AddDishTutorialDto) {
        const dish = await this.dishService.getDish(id);
        return await this.dishService.addTutorial(dish, url);
    }

    @Delete('tutorial')
    @UseGuards(JwtGuard, RolesGuard, DishOwnerGuard)
    @Roles(Role.Cooker)
    async removeTutorial(@Body() { id, url }: RemoveDishTutorialDto) {
        const dish = await this.dishService.getDish(id);
        return await this.dishService.removeTutorial(dish, url);
    }

    @Put('meal')
    @UseGuards(JwtGuard, RolesGuard, DishOwnerGuard)
    @Roles(Role.Cooker)
    async addCategory(@Body() { id, category }: AddDishCategoryDto) {
        const dish = await this.dishService.getDish(id);
        return await this.dishService.addDishCategory(dish, category);
    }

    @Delete('meal')
    @UseGuards(JwtGuard, RolesGuard, DishOwnerGuard)
    @Roles(Role.Cooker)
    async removeCategory(@Body() { id, category }: RemoveDishCategoryDto) {
        const dish = await this.dishService.getDish(id);
        return await this.dishService.removeDishCategory(dish, category);
    }

    @Put('general')
    @UseGuards(JwtGuard, RolesGuard, DishOwnerGuard)
    @Roles(Role.Cooker)
    async updateGeneral(@Body() dto: UpdateDishGeneralDto) {
        const dish = await this.dishService.getDish(dto.id);
        return await this.dishService.updateDishGeneral(dish, dto);
    }

    @Put('recipe')
    @UseGuards(JwtGuard, RolesGuard, DishOwnerGuard)
    @Roles(Role.Cooker)
    async updateRecipe(@Body() dto: UpdateDishRecipeDto) {
        const dish = await this.dishService.getDish(dto.id);
        return await this.dishService.updateDishRecipe(dish, dto.recipe);
    }
}
