import { twMerge } from "tailwind-merge"
import { motion } from "framer-motion"
import { Round } from "./round-active"
import { Meal } from "@entities/dish/api"

export const MealTab = ({children, setMeal, currentMeal, meal}
    : {children: string, setMeal: (meal: Meal) => any, currentMeal: Meal, meal: Meal,}) => {
    const className = "rounded-full text-xl flex w-full items-center justify-between align-middle transition-colors z-9"
    const active = meal == currentMeal
    const content = <>
        <Round active={active} />
        <motion.div className="flex">
            {children}
        </motion.div>
        <Round active className="invisible" />
    </>

    return <motion.button onClick={() => setMeal(meal)} className={twMerge(className, "light-block", !active ? "px-4 py-2" : '')} transition={{duration: 0.25}}>
        { active ? <motion.div layoutId={`meal-tab`} className={twMerge(className, "dark-block z-10", active ? "px-4 py-2" : '')}>{content}</motion.div> : content }
    </motion.button>
}