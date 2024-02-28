import { Module } from '@nestjs/common';
import { DishListService } from './dish-list.service';

@Module({
  providers: [DishListService]
})
export class DishListModule {}
