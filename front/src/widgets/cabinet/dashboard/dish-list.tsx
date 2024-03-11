import { selectDishLists } from "@entities/dish-list/model/dishListSlice"
import { useGetAllQuery } from "@features/dish-list/service"
import { DishListCard } from "@features/dish-list/ui/dish-list-card"
import { useSelector } from "react-redux"

export const DishList = () => {
    useGetAllQuery()
    const dishLists = useSelector(selectDishLists)

    return dishLists?.map((dishList, i) => <DishListCard order={i} key={dishList.id} dishList={dishList} />)
    
}