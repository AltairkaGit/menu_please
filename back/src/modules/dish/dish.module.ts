import { Module } from '@nestjs/common';
import { DishService } from './dish.service';
import { DishController } from './dish.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dish } from './model/dish.model';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [SequelizeModule.forFeature([Dish]), UploadModule],
  providers: [DishService],
  controllers: [DishController]
})
export class DishModule {}
