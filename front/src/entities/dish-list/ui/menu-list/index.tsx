import { AmountedDish, Meal } from "@entities/dish/api"
import { MenuListWide } from "./menu-list-wide"

export const MenuList = (props : {
    id: number,
    currentDish: AmountedDish,
    currentMeal: Meal, 
    breakfast: AmountedDish[],
    lunch: AmountedDish[],
    dinner: AmountedDish[]
}) => (<>
     <MenuListWide {...props} />
</>)