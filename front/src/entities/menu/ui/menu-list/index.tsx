import { AmountedDish, Meal } from "@entities/dish/api"
import { DishList } from "@entities/dish-list/api"
import { MenuListWide } from "./wide"
import { MenuListCompact } from "./compact"
import { motion } from "framer-motion"

export const MenuList = (props : {
    currentDish: AmountedDish,
    currentMeal: Meal,
    dishList: DishList
}) => <motion.div className="mx-auto md:px-4 self-stretch">
    <MenuListWide display="hidden md:flex lg:hidden xl:flex" {...props} />
    <MenuListCompact display="hidden md:hidden lg:flex xl:hidden" {...props} />
</motion.div>