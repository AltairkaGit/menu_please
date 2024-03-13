import { AmountedDish, Meal } from "@entities/dish/api"
import { DishList } from "@entities/dish-list/api"
import { MenuListWide } from "./wide"
import { MenuListCompact } from "./compact"

export const MenuList = (props : {
    currentDish: AmountedDish,
    currentMeal: Meal,
    dishList: DishList
}) => <>
    <MenuListWide display="hidden md:flex lg:hidden xl:flex" {...props} />
    <MenuListCompact display="hidden md:hidden lg:flex xl:hidden" {...props} />
</>