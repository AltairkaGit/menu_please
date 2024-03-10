import { AmountedDish, Meal } from "@entities/dish/api"

export interface DishList {
    id: number
    breakfast: AmountedDish[]
    lunch: AmountedDish[]
    dinner: AmountedDish[]
}

interface DishManipulation<T> {
    id: number,
    body: T
}

interface DishAndMeal {
    dishId: number
    meal: Meal
}

export type AddDishInList = DishManipulation<DishAndMeal>

export type RemoveDishFromList = DishManipulation<DishAndMeal>

export type ChangeDishAmountInList = DishManipulation<DishAndMeal & { amount: number }>