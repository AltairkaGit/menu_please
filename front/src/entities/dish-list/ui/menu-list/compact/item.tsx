import { AmountedDish, Meal } from "@entities/dish/api"
import { MealLabel } from "./menu-label"
import { AnimatePresence, motion } from "framer-motion"
import { twMerge } from "tailwind-merge"

export const MealList = ({listId, dishes, title, className, currentDishId, currentMeal}: 
    {listId: number, dishes: AmountedDish[], title: string, className?: string, currentDishId?: number, currentMeal: Meal}
) => {
    return <motion.div initial="out" animate="in" exit="ex" className={twMerge("pt-6 flex-1 mx-auto", className)}>
        <MealLabel>{title}</MealLabel>
        <AnimatePresence mode="wait">
            <motion.div initial="out" animate="in" exit="ex" key={currentMeal} transition={{staggerChildren: 0.5 / dishes.length}}>
                {dishes.map((dish) => <motion.div key={dish.id} 
                    className="mt-4 w-full text-wrap text-center leading-4"
                    variants={{in: {opacity: 1, x: 0}, out: {opacity: 0, x: "-0.5rem"}, ex: {opacity: 0, x: "0.5rem"}}}>
                    {dish.name}
                </motion.div>)}
            </motion.div>
        </AnimatePresence>
    </motion.div>
}