import { AmountedDishDto } from "@src/modules/dish/dto"

export class DishListDto {
    id: number
    breakfast: AmountedDishDto[]
    lunch: AmountedDishDto[]
    dinner: AmountedDishDto[]
}