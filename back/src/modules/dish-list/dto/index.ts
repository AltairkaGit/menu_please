import { DishDto } from "@src/modules/dish/dto"

export class DishListDto {
    id: number
    breakfast: DishDto[]
    lunch: DishDto[]
    dinner: DishDto[]
}