import { Meal } from "@entities/dish/api"
import { RemoveDishInMealButton } from "@features/dish-list/remove-dish-in-meal-button"
import { CrossSqaredButton } from "@shared/kit/cross-sqared-button"

export const RemoveDishInMealSqaredButton = ({id, dishId, meal}: {id: number, dishId: number, meal: Meal}) => (
    <RemoveDishInMealButton id={id} dishId={dishId} meal={meal}>
        <CrossSqaredButton />
    </RemoveDishInMealButton>
)