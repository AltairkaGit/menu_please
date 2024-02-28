import { Body, Controller, HttpStatus, ParseFilePipeBuilder, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { DishService } from './dish.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateDishFormDto } from './dto';
import { JwtGuard } from '@src/guards/jwt-guard';
import { Roles } from '@src/guards/roles.decorator';
import { Role } from '@src/guards/role.enum';
import { RolesGuard } from '@src/guards/roles-guard';

@Controller('dish')
export class DishController {
    constructor(private readonly dishService: DishService) {}

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
    ) picture: Express.Multer.File, @Body() body: CreateDishFormDto) {
        return this.dishService.createDish(picture, body);
    }
}
