import { DishList } from "@entities/menu/api"
import { DishListCard as DishListCardUI } from "@entities/menu/ui/menu-card"
import { useDeleteMutation } from "@features/menu/service"
import { useAppDispatch } from "@shared/hooks"
import dishListSlice from "@entities/menu/model/dishListSlice"

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