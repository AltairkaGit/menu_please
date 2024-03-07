import { DishPreviewDto } from "@src/modules/dish/dto"
import { Meal } from "@src/modules/dish/model/dish.model"

export class MealDishes {
    meal: Meal
    dishes: DishPreviewDto[]
}

export class DishListDto {
    id: number
    mealDishes: MealDishes[]
}