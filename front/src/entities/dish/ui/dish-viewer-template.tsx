import { motion } from "framer-motion"
import { ReactNode } from "react"
import { Meal } from "../api"
import { Block } from "@shared/kit/block"
import { Triangle } from "@static/icons/triangle"

const pictureVariants = {
    init: {rotate: "60deg", opacity: 0, scale: 0.5},
    in: {rotate: 0, opacity: 1, scale: 1},
    out: {rotate: "60deg", opacity: 0, scale: 0.5},
}

const listVariants = {
    in: {transition: {staggerChildren: 0.1}},
    out: {transition: {staggerChildren: 0.1, staggerDirection: -1}}
}

const itemVariants = {
    init: {y: "-1rem", opacity: 0},
    in: {y: 0, opacity: 1},
    out: {y: "1rem", opacity: 0},
}

const defaultButtons = [
    <Block className="dark-block aspect-video cursor-pointer hover:scale-105 transition-transform h-36 xl:h-auto flex justify-center items-center">
        <Triangle />
    </Block>
]

export const DishViewerTemplate = ({
    picture, kind, cooker, name, recipe, ratio, meals, buttons = defaultButtons
}: {
    picture: ReactNode,
    kind: ReactNode,
    cooker: ReactNode,
    name: ReactNode,
    recipe: ReactNode,
    ratio: ReactNode,
    meals: ReactNode[],
    buttons?: ReactNode[]
}) => (
    <motion.div className="flex flex-col gap-12 xl:flex-row justify-between">
        <motion.div className="flex flex-col items-center lg:items-start lg:flex-row gap-4 lg:gap-14">
            <motion.div variants={pictureVariants} className="min-w-96 max-w-96 lg:min-w-[30rem] lg:max-w-[37.5rem] aspect-square" initial="init" animate="in" exit="out" transition={{duration: 0.5}}>
                {picture}
            </motion.div>
            <motion.div className="flex flex-col items-center lg:items-start gap-20 w-auto md:w-[28rem]" variants={listVariants} initial="init" animate="in" exit="out">
                <motion.div className="flex flex-col gap-3 text-3xl xl:text-5xl font-medium" variants={itemVariants} transition={{duration: 0.5}}>
                    <motion.div className="flex justify-between gap-4">
                        {kind}
                        {cooker}
                    </motion.div>
                    <motion.div className="text-center md:text-left">
                        {name}
                    </motion.div>
                </motion.div>
                <motion.div className="text-pretty text-center lg:text-left text-2xl xl:text-3xl font-medium w-full" variants={itemVariants} transition={{duration: 0.5}}>
                    {recipe}
                </motion.div>                
                <motion.div variants={itemVariants} className="text-2xl xl:text-3xl" transition={{duration: 0.5}}>
                    {ratio}
                </motion.div>
            </motion.div>
        </motion.div>
        <motion.div className="flex items-center lg:items-start flex-col gap-4 lg:flex-row xl:flex-col justify-between shrink md:shrink-0 mx-6">
            <motion.div className="flex flex-col gap-6" variants={listVariants} initial="init" animate="in" exit="out">
                <motion.h3 variants={itemVariants} transition={{duration: 0.5}}>Рекомендуем на:</motion.h3>
                { meals.map((meal, i) => <motion.div key={i} variants={itemVariants} transition={{duration: 0.5}}>
                    {meal}
                </motion.div>) }
            </motion.div>
            <motion.div variants={listVariants} className="flex flex-col gap-3  xl:w-full" initial="init" animate="in" exit="out">
                { buttons.map((button, i) => <motion.div key={i} variants={itemVariants} transition={{duration: 0.5}}>
                    {button}
                </motion.div>) }
            </motion.div>           
        </motion.div>
    </motion.div>
)