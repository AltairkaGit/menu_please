import { Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { DishService } from './dish.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateDishFormDto } from './dto';
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
    async getDish(@Param('id') dishId: number) {
        const dish = await this.dishService.getDish(dishId);
        return this.dishService.getDishDto(dish);
    }

    @Get('cooker/:id')
    async getDishesByCooker(@Param('id') cookerId: number) {
        const dishes = await this.dishService.getCookerDishes(cookerId);
        return await Promise.all(dishes.map(d => this.dishService.getDishDto(d)));
    }

    @Get()
    async getDishes(@Query() query: {
        take: number, 
        skip: number,
        kind: string, 
        name: string,
        ord: keyof Dish,
        dir: 'asc' | 'desc',
        meal: Meal
    }) {
        const {rows, count} = await this.dishService.getDishes(query);
        return await Promise.all(rows.map(d => this.dishService.getDishDto(d)));
    }

    @Post()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.Cooker)
    @UseInterceptors(FileInterceptor('file'))
    async createDish(@UploadedFile(
        new ParseFilePipeBuilder()
            .addFileTypeValidator({
                fileType: 'png',
            })
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
            }),
    ) picture: Express.Multer.File, @Body() body: CreateDishFormDto, @Req() req: any) {
        const { user } = req;
        const dish = await this.dishService.createDish(picture, body, user.userId);
        return this.dishService.getDishDto(dish);
    }

    @Put(":id")
    @UseGuards(JwtGuard, RolesGuard, DishOwnerGuard)
    @Roles(Role.Cooker)
    @UseInterceptors(FileInterceptor('file'))
    async updateDish(@Body() body: CreateDishFormDto, @Req() req: any, @Param('id') dishId: number, @UploadedFile(
        new ParseFilePipeBuilder()
            .addFileTypeValidator({
                fileType: 'png',
            })
            .build({
                fileIsRequired: false,
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
            }),
    ) picture?: Express.Multer.File) {
        const { user } = req;
        const dish = await this.dishService.updateDish(body, user.userId, dishId, picture);
        return this.dishService.getDishDto(dish);
    }

    @Delete(":id")
    @UseGuards(JwtGuard, RolesGuard, DishOwnerGuard)
    @Roles(Role.Cooker)
    async deleteDish(@Param('id') dishId: number) {
        const dish = await this.dishService.getDish(dishId);
        return await this.dishService.removeDish(dish);
    }

}
