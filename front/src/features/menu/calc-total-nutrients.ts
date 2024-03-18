import { AmountedDish } from "@entities/dish/api"
import { calcMealNutrients } from "./calc-meal-nutrients"

export const calcTotalNutrientsRatio = ({breakfast, lunch, dinner} : {breakfast: AmountedDish[], lunch: AmountedDish[], dinner: AmountedDish[]}) => {
    let p = 0, f = 0, c = 0
    let n;
    n = calcMealNutrients(breakfast)
    p += n.p; f += n.f; c += n.c;
    n = calcMealNutrients(lunch)
    p += n.p; f += n.f; c += n.c;
    n = calcMealNutrients(dinner)
    p += n.p; f += n.f; c += n.c;

    const total = p + f + c
    const pr = Math.round(p * 100 / total)
    const cr = Math.round(c * 100 / total)
    const fr = 100 - pr - cr
    
    return { p: pr, f: fr, c: cr }
}