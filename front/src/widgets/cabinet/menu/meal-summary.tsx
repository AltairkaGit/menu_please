import { Meal } from "@entities/dish/api"
import { Ratio } from "@entities/dish/ui/ratio"
import { Block } from "@shared/ui/block"
import { AnimatePresence } from "framer-motion"
import { motion } from "framer-motion"

const meals = {
    [Meal.breakfast]: 'завтрак',
    [Meal.lunch]: 'обед',
    [Meal.dinner]: 'ужин',
}

export const MealSummary = ({meal, calories, p, f, c} : {meal: Meal, calories: number, p: number, f: number, c: number}) => (
    <AnimatePresence mode="wait">
        <Block key={`${meal}-${calories}`} className="light-block w-full px-6 md:px-12 py-6 flex flex-col justify-between min-h-64">
            <motion.div className="text-2xl" variants={{in: {opacity: 1, y: 0}, out: {opacity: 0, y: "1rem"}}} initial="out" animate="in" exit="out" transition={{duration: 0.5}}>
                Ваш {meals[meal]}:
            </motion.div>
            <motion.div className="text-2xl flex flex-col gap-4">
                <motion.div variants={{in: {opacity: 1, y: 0}, out: {opacity: 0, y: "1rem"}}} initial="out" animate="in" exit="out" transition={{duration: 0.5}}>
                    Калорийнсть: {calories} кал.
                </motion.div>
                <Ratio row proteins={`${p || 0}%`} fats={`${f || 0}%`} carbo={`${c || 0}%`} />
            </motion.div>
        </Block>
    </AnimatePresence>    
)