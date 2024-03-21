import { selectDishLists } from "@entities/menu/model/dishListSlice"
import * as DishListService from "@features/menu/service"
import { DishListCard } from "@widgests/cabinet/menu/dish-list-card"
import { useSelector } from "react-redux"

export const DishList = () => {
    DishListService.useGetAllQuery(undefined, {refetchOnFocus: false, refetchOnReconnect: false})
    const dishLists = useSelector(selectDishLists)

    return dishLists?.map((dishList, i) => <DishListCard order={i} key={dishList.id} dishList={dishList} />)
    
}