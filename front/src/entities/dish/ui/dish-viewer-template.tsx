import { motion } from "framer-motion"
import { ReactNode } from "react"
import { Meal } from "../api"
import { Block } from "@shared/kit/block"

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

export const DishViewerTemplate = ({
    picture, kind, cooker, name, recipe, ratio, meals
}: {
    picture: ReactNode,
    kind: ReactNode,
    cooker: ReactNode,
    name: ReactNode,
    recipe: ReactNode,
    ratio: ReactNode,
    meals: ReactNode[]
}) => (
    <motion.div className="flex justify-between">
        <motion.div className="flex gap-14">
            <motion.div variants={pictureVariants} initial="init" animate="in" exit="out" transition={{duration: 0.5}}>
                {picture}
            </motion.div>
            <motion.div className="flex flex-col gap-20 w-[28rem]" variants={listVariants} initial="init" animate="in" exit="out">
                <motion.div className="flex flex-col gap-3" variants={itemVariants} transition={{duration: 0.5}}>
                    <motion.div className="flex justify-between">
                        {kind}
                        {cooker}
                    </motion.div>                
                    {name}
                </motion.div>
                <motion.div className="text-pretty text-3xl font-medium" variants={itemVariants} transition={{duration: 0.5}}>
                    {recipe}
                </motion.div>                
                <motion.div variants={itemVariants} transition={{duration: 0.5}}>
                    {ratio}
                </motion.div>
            </motion.div>
        </motion.div>
        <motion.div className="flex flex-col justify-between shrink-0 mx-6">
            <motion.div className="flex flex-col gap-6" variants={listVariants} initial="init" animate="in" exit="out">
                <motion.h3 variants={itemVariants} transition={{duration: 0.5}}>Рекомендуем на:</motion.h3>
                { meals.map(meal => <motion.div variants={itemVariants} transition={{duration: 0.5}}>
                    {meal}
                </motion.div>) }
            </motion.div>
            <motion.div variants={itemVariants} initial="init" animate="in" exit="out" transition={{duration: 0.5}}>
                <Block className="dark-block aspect-video cursor-pointer hover:scale-105 transition-transform"/>
            </motion.div>            
        </motion.div>
    </motion.div>
)