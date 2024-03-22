import { AmountedDish } from "@entities/dish/api"
import { Cooker } from "@entities/dish/ui/cooker"
import { DishDetailsButton } from "@entities/dish/ui/details-button"
import { motion } from "framer-motion"
import { twMerge } from "tailwind-merge"

const variants = {
    init: {opacity: 0, y: "1rem"}, 
    in: {opacity: 1, y: 0}, 
    out: {opacity: 0, y: "1rem"}
}

export const DishSummary = ({dish, className}: {dish: AmountedDish, className?: string}) => (
    <motion.div className={twMerge("flex flex-col gap-4", className)} variants={variants} transition={{duration: 0.5}}>
        <motion.div className="flex justify-between">
            <motion.div className="font-display text-4xl lg:text-5xl">{dish.kind}</motion.div>
            <DishDetailsButton id={dish.id} />
        </motion.div>
        <motion.div className="text-3xl lg:text-4xl font-medium uppercase">{dish.name}</motion.div>
        <Cooker name={dish.cooker.name} />
    </motion.div>
)