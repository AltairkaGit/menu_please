import { AmountedDish } from "@entities/dish/api"
import { MealLabel } from "./menu-label"
import { motion } from "framer-motion"
import { twMerge } from "tailwind-merge"

export const MealList = ({listId, dishes, title, className, currentDishId}: 
    {listId: number, dishes: AmountedDish[], title: string, className?: string, currentDishId?: number}
) => {
    return <motion.div className={twMerge("pt-6 flex-1 mx-auto relative", className)}>
        <MealLabel listId={listId}>{title}</MealLabel>
        {dishes.map((dish) => <motion.div key={dish.id} className="mt-4 text-wrap text-center leading-4">
            {dish.name}
            {currentDishId == dish.id  ? (
                <motion.div className="h-px w-1/2 ml-[25%] dark-block mt-1 z-10 absolute" layoutId={`underline${listId}`}/>
              ) : null}
        </motion.div>)}
    </motion.div>
}