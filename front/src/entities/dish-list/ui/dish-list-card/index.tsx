import { DishList } from "@entities/dish-list/api"
import { DishListCardWide } from "./card-wide"

const checkIsEmpty = (dishList: DishList) => dishList.breakfast.length == 0 && dishList.lunch.length == 0 && dishList.dinner.length == 0

export const DishListCard = (props: {dishList: DishList, deleteList: () => any, order: number}) => (<>
    <DishListCardWide {...props} isEmpty={checkIsEmpty(props.dishList)} />
    
</>)