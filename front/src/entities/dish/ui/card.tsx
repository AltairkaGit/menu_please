import { Dish } from "../api"
import { motion } from "framer-motion"
import { Ratio } from "./ratio"
import { ReactNode } from "react"
import { Block } from "@shared/ui/block"
import { Cooker } from "./cooker"

export const DishCard = ({dish, buttons}: {dish: Dish, buttons: ReactNode[]}) => {
    return (
        <motion.div className="rounded-3xl p-4 pt-0 flex gap-4">
            <motion.div className="dark-block rounded-b-3xl flex flex-col pt-4 mx-4 pb-12 text-center">
                {dish.kind}
                <motion.img src={dish.picture} className="scale-125" />
            </motion.div>
            <motion.div className="pt-4 flex flex-col justify-between items-end">
                <motion.div>
                    {dish.name}
                    <Cooker name={dish.cooker.name} />
                </motion.div>
                <motion.div>
                    <Ratio proteins={`${dish.proteins}`} carbo={`${dish.carbohydrates}`} fats={`${dish.fats}`} />
                    <motion.div className="flex justify-between">
                        <Block className="light-block">{dish.calories} кал.</Block>
                        {buttons}
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}