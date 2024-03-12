import { DishList } from "@entities/dish-list/api"
import { DishListCardUI } from "@entities/dish-list/ui/card"
import { useDeleteMutation } from "../service"
import { useAppDispatch } from "@shared/hooks"
import dishListSlice from "@entities/dish-list/model/dishListSlice"

export const DishListCard = ({order, dishList} : {order: number, dishList: DishList}) => {
    const [deleteDishList, _] = useDeleteMutation()
    const dispatch = useAppDispatch()
    const { remove } = dishListSlice.actions
    const deleteList = async () => {
        try {
            await deleteDishList(dishList.id).unwrap()
            dispatch(remove(dishList.id))
        } catch (err) {
                
        }
    }

    return <DishListCardUI order={order} dishList={dishList} deleteList={deleteList} />
}