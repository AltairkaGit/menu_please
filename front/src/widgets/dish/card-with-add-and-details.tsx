import { Dish, Meal } from "@entities/dish/api"
import { CalorieesSqared } from "@entities/dish/ui/calories-sqared"
import { DishCard } from "@entities/dish/ui/card"
import { DishDetailsSqaredButton } from "@entities/dish/ui/details-sqared-button"
import { AddDishInMealSqaredButton } from "@widgests/dish/add-dish-in-meal-sqared"
import { RemoveDishInMealSqaredButton } from "./remove-dish-in-meal-sqared"

export const DishCardWithAddAndDetails = ({dish, listId, meal, isInMeal} : {dish: Dish, listId: number, meal: Meal, isInMeal: boolean}) => (
    <DishCard key={dish.id} dish={dish} buttons={
        [
            <CalorieesSqared key="calories" calories={dish.calories} />,
            <DishDetailsSqaredButton key="details" id={dish.id} />,
            isInMeal 
                ? <RemoveDishInMealSqaredButton key="remove" id={listId} dishId={dish.id} meal={meal} />
                : <AddDishInMealSqaredButton key="add" id={listId} dishId={dish.id} meal={meal} />,                    
        ]} 
    />
)