import { DishList } from "@entities/dish-list/api"
import { DishListCardUI } from "@entities/dish-list/ui/card"
import { useDeleteMutation } from "../service"

export const DishListCard = ({order, dishList} : {order: number, dishList: DishList}) => {
    const [deleteDishList, _] = useDeleteMutation()

    return <DishListCardUI order={order} dishList={dishList} deleteList={() => deleteDishList(dishList.id)} />
}