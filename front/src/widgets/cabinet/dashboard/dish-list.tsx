import { selectDishLists } from "@entities/dish-list/model/dishListSlice"
import { DishListCard } from "@entities/dish-list/ui/card"
import { useGetAllQuery } from "@features/dish-list/service"
import { useSelector } from "react-redux"

export const DishList = () => {
    useGetAllQuery()
    const dishLists = useSelector(selectDishLists)

    return dishLists?.map(dishList => <DishListCard key={dishList.id} dishList={dishList} />)
    
}