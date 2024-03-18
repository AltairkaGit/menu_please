import { DishList } from "@entities/dish-list/api"
import { AmountedDish, Meal } from "@entities/dish/api"
import { useMemo, useState } from "react"
import { useInterval } from "usehooks-ts"

const transformInSequence = (dishList: DishList)  => {
    const { breakfast, lunch, dinner } = dishList
    return [
        ...(breakfast.length ? breakfast.map(dish => ({meal: Meal.breakfast, dish})) : []),
        ...(lunch.length ? lunch.map(dish => ({meal: Meal.lunch, dish})) : []),
        ...(dinner.length ? dinner.map(dish => ({meal: Meal.dinner, dish})) : []),
    ]
}

export const useChangeDishInterval = (dishList: DishList, intervalMs: number) => {
    const sequence = useMemo(() => transformInSequence(dishList), [dishList])
    const [i, setI] = useState<number>(0)

    const [meal, setMeal] = useState<Meal>(sequence[0].meal)
    const [dish, setDish] = useState<AmountedDish>(sequence[0].dish)

    useInterval(() => {
        setI(i => {
            const prev = i
            const next = i+1 == sequence.length ? 0 : i+1
            setDish(sequence[next].dish)
            if (sequence[prev].meal != sequence[next].meal) setMeal(sequence[next].meal)
            return next
        })
    }, intervalMs)

    return { i, currentMeal: meal, currentDish: dish }
}