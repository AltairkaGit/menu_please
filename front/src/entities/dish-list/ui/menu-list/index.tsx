import { AmountedDish, Meal } from "@entities/dish/api"
import { MenuListWide } from "./menu-list-wide"

export const MenuList = (props : {
    id: number,
    i: number
    sequence: {meal:Meal, dish: AmountedDish}[], 
    breakfast: AmountedDish[],
    lunch: AmountedDish[],
    dinner: AmountedDish[]
}) => (<>
     <MenuListWide {...props} />
</>)