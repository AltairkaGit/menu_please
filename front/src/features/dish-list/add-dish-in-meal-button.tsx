import { Meal } from "@entities/dish/api"
import { useAddDishMutation } from "@features/menu/service"
import { Button } from "@shared/kit/button"
import { ReactNode } from "react"

export const AddDishInMealButton = ({id, dishId, meal, children}: {id: number, dishId: number, meal: Meal, children: ReactNode}) => {
    const [addDishInMeal, _] = useAddDishMutation()
    const data = {
        id,
        body: {
            dishId,
            meal
        }
    }

    return <Button onClick={() => addDishInMeal(data)}>{children}</Button>
}