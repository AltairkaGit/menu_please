import { AmountedDish } from "@entities/dish/api"
import { MealLabel } from "./menu-label"
import { motion } from "framer-motion"
import { twMerge } from "tailwind-merge"

export const MealList = ({listId, dishes, active, title, className, currentDishId}: 
    {listId: number, dishes: AmountedDish[], active: boolean, title: string, className?: string, currentDishId?: number}
) => {
    return <motion.div className={twMerge("pt-6 flex-1 relative", className)}>
        <MealLabel listId={listId} active={active} innerClassName="flex">{title}</MealLabel>
        {dishes.map((dish) => <motion.div key={dish.id} className="mt-4 text-wrap text-center leading-4">
            {dish.name}
            {active && currentDishId == dish.id  ? (
                <motion.div className="h-px w-1/2 ml-[25%] dark-block mt-1 z-10 absolute" layoutId={`underline${listId}-wide`}/>
              ) : null}
        </motion.div>)}
    </motion.div>
}