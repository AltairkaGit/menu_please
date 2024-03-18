import { Meal } from "@entities/dish/api"
import { DishList } from "@features/dish-list/ui"
import { AnimatePresence, motion } from "framer-motion"

interface Form {
    query: string
    dir: 'asc' | 'desc'
    ord: string,
    meal: Meal
}

export const DishSearchModal = () => {


    return (
        <AnimatePresence mode="wait">
            <motion.div className="absolute z-20 top-24 -bottom-4 light-block -left-4 -right-4 bg-opacity-95 backdrop-blur-sm rounded-3xl p-12"
                layout transition={{duration: 0.25}}
                initial={{scale: 0.3, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
                exit={{scale: 0.3, opacity: 0}}
            >
                <DishList meal={Meal.breakfast} />
            </motion.div>
        </AnimatePresence>
        
    )

}