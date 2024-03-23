import { Dish } from "@entities/dish/api"
import { CalorieesSqared } from "@entities/dish/ui/calories-sqared"
import { DishCard } from "@entities/dish/ui/card"
import { DishEditButton } from "@entities/dish/ui/edit-button"

export const DishCardWithEdit = ({dish} : {dish: Dish}) => (
    <DishCard key={dish.id} dish={dish} buttons={
        [
            <CalorieesSqared key="calories" calories={dish.calories} />,
            <DishEditButton key="edit" dishId={dish.id} />
        ]} 
    />
)