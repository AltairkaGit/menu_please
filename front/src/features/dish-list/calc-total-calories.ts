import { DishList } from "@entities/dish-list/api"
import { calcMealCalories } from "./calc-meal-calories"

export const calcTotalCalories = (list: DishList) => calcMealCalories(list.breakfast) + calcMealCalories(list.lunch) + calcMealCalories(list.dinner)