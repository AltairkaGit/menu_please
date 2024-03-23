import { Dish } from "../api"
import { motion } from "framer-motion"
import { Ratio } from "./ratio"
import { ReactNode } from "react"
import { Cooker } from "./cooker"

const variants = {
    init: {
        opacity: 0, 
        x: "-1rem"
    },
    in: {
        opacity: 1, 
        x: 0
    }, 
    out: {
        opacity: 0, 
        x: "-1rem"
    }
}

export const DishCardTab = ({children}: {children: ReactNode}) => (
    <motion.div className="hidden xl:flex rounded-3xl p-4 pt-0 justify-between light-block w-96 xl:h-[18rem] xl:w-128" variants={variants}>
        {children}
    </motion.div>
)

const LandscapeCard = ({dish, buttons}: {dish: Dish, buttons: ReactNode[]}) => (
    <DishCardTab>
        <motion.div className="dark-block rounded-b-2xl flex flex-col gap-8 pt-4 mx-5 pb-12 text-center text-2xl shrink-0">
            {dish.kind}
            <motion.img src={dish.picture} className="scale-150 w-28 xl:w-36" />
        </motion.div>
        <motion.div className="pt-4 flex flex-col justify-between items-end gap-3">
            <motion.div className="text-2xl flex flex-col text-right gap-3">
                {dish.name}
                <Cooker name={dish.cooker.name} className="self-end" />
            </motion.div>
            <motion.div className="flex flex-col gap-4">
                <Ratio proteins={`${dish.proteins}`} carbo={`${dish.carbohydrates}`} fats={`${dish.fats}`} />
                <motion.div className="flex justify-between">
                    {buttons}
                </motion.div>
            </motion.div>
        </motion.div>
    </DishCardTab>
)

const AlbumCard = ({dish, buttons}: {dish: Dish, buttons: ReactNode[]}) => (
    <DishCardTab>
        album
    </DishCardTab>
)

export const DishCard = ({dish, buttons}: {dish: Dish, buttons: ReactNode[]}) => <>
    <LandscapeCard dish={dish} buttons={buttons} />
</>