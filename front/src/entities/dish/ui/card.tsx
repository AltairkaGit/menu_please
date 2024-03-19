import { Dish } from "../api"
import { AnimatePresence, motion } from "framer-motion"
import { Ratio } from "./ratio"
import { ReactNode } from "react"
import { Block } from "@shared/ui/block"
import { Cooker } from "./cooker"

const variants = {
    in: {
        opacity: 1, 
        x: 0
    }, 
    out: {
        opacity: 0, 
        x: "-1rem"
    }
}

export const DishCard = ({dish, buttons}: {dish: Dish, buttons: ReactNode[]}) => {
    return (
            <motion.div className="rounded-3xl p-4 pt-0 flex justify-between light-block w-96: lg:w-128" variants={variants}>
                <motion.div className="dark-block rounded-b-2xl flex flex-col gap-12 pt-4 mx-4 pb-12 text-center text-3xl">
                    {dish.kind}
                    <motion.img src={dish.picture} className="scale-150 w-36" />
                </motion.div>
                <motion.div className="pt-4 flex flex-col justify-between items-end">
                    <motion.div className="text-2xl">
                        {dish.name}
                        <Cooker name={dish.cooker.name} className="self-end" />
                    </motion.div>
                    <motion.div className="flex flex-col gap-4">
                        <Ratio proteins={`${dish.proteins}`} carbo={`${dish.carbohydrates}`} fats={`${dish.fats}`} />
                        <motion.div className="flex justify-between">
                            <Block className="light-block w-[3.625rem] flex flex-col items-center justify-center">
                                <motion.p>{dish.calories}</motion.p>
                                <motion.p>кал</motion.p>                            
                            </Block>
                            {buttons}
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
    )
}