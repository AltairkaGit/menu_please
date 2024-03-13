import { DishList } from "@entities/dish-list/api"
import { Ratio } from "@entities/dish/ui/ratio"
import { calcTotalCalories } from "@features/dish-list/calc-total-calories"
import { calcTotalNutrientsRatio } from "@features/dish-list/calc-total-nutrients"
import { motion } from "framer-motion"
import { useMemo } from "react"

export const Summary = ({dishList} : {dishList: DishList}) => {
    const { breakfast, lunch, dinner } = dishList
    const totalCalories = useMemo(() => calcTotalCalories(dishList), [dishList])
    const { p, f, c } = useMemo(() => calcTotalNutrientsRatio({breakfast, lunch, dinner}), [dishList])

    return (
        <motion.div className="p-3 flex flex-col justify-between w-full md:w-72 mb-8 self-stretch">
            <motion.div className="mt-3 text-3xl">Ваше меню</motion.div>
            <motion.div className="text-2xl">
                <motion.div className="mb-3"> Всего: {totalCalories} кал.</motion.div>
                <Ratio proteins={p + '%'}  fats={f + '%'} carbo={c + '%'} />
            </motion.div>
        </motion.div>
    )
}