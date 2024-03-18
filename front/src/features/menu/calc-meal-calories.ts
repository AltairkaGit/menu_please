import { AmountedDish } from "@entities/dish/api"

export const calcMealCalories = (meal: AmountedDish[]) => meal.reduce((acc, cur) => acc + cur.calories * cur.amount, 0)