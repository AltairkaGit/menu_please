import { Meal } from "@entities/dish/api"
import { AddDishInMealButton } from "@features/dish-list/add-dish-in-meal-button"
import { PlusSqaredButton } from "@shared/kit/plus-sqared-button"

export const AddDishInMealSqaredButton = ({id, dishId, meal}: {id: number, dishId: number, meal: Meal}) => (
    <AddDishInMealButton id={id} dishId={dishId} meal={meal}>
        <PlusSqaredButton />
    </AddDishInMealButton>
)