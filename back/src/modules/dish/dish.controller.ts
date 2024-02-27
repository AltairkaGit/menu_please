import { Body, Controller, HttpStatus, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { DishService } from './dish.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateDishFormDto } from './dto';

@Controller('dish')
export class DishController {
    constructor(private readonly dishService: DishService) {}


    @Post()
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
