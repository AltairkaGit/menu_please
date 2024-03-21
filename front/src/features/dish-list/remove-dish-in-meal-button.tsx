import { Meal } from "@entities/dish/api"
import { useDeleteDishMutation } from "@features/menu/service"
import { Button } from "@shared/kit/button"
import { ReactNode } from "react"

export const RemoveDishInMealButton = ({id, dishId, meal, children}: {id: number, dishId: number, meal: Meal, children: ReactNode}) => {
    const [deleteDishInMeal, _] = useDeleteDishMutation()
    const data = {
        id,
        body: {
            dishId,
            meal
        }
    }

    return <Button onClick={() => deleteDishInMeal(data)}>{children}</Button>
}