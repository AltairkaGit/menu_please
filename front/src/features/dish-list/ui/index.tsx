import { Meal } from "@entities/dish/api"
import { DishCard } from "@entities/dish/ui/card"
import { useSearchQuery } from "@features/dish/service"
import { Button } from "@shared/ui/button"

export const DishList = ({meal}: {meal: Meal}) => {
    const {data} = useSearchQuery({skip:0, take: 10, meal})

    return data?.map(dish => <DishCard key={dish.id} dish={dish} buttons={[<Button key="plus" onClick={() => console.log()}>+</Button>]} />)
}