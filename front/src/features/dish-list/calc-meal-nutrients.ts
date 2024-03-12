import { AmountedDish } from "@entities/dish/api"

export const calcMealNutrients = (dishes: AmountedDish[]) => {
    let p = 0
    let f = 0
    let c = 0
    dishes.forEach(dish => {
        p += dish.proteins
        f += dish.fats
        c += dish.carbohydrates
    })
    return { p, f, c }
}

export const calcMealNutrientsRatio = (dishes: AmountedDish[]) => {
    const {p, f, c} = calcMealNutrients(dishes)
    const total = p + f + c
    const pr = Math.round(p * 100 / total)
    const cr = Math.round(c * 100 / total)
    const fr = 100 - pr - cr
    return { p: pr, f: fr, c: cr }
}
