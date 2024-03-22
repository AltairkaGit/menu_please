import { Meal } from "@entities/dish/api"
import { Cooker } from "@entities/dish/ui/cooker"
import { Ratio } from "@entities/dish/ui/ratio"
import { Block } from "@shared/kit/block"
import { MealLabel } from "@shared/meal-label/common"
import { motion } from "framer-motion"

const mealsMap = {
    [Meal.breakfast]: 'Завтрак',
    [Meal.lunch]: 'Обед',
    [Meal.dinner]: 'Ужин'
}

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

export const DishViewver = ({kind, name, recipe, cooker, picture, meals, p, f, c} : {
    kind: string, 
    name: string, 
    recipe: string, 
    cooker: string, 
    picture: string, 
    meals: Meal[], 
    p: number, 
    f: number, 
    c: number
}) => (
    <motion.div className="flex justify-between">
        <motion.div className="flex gap-14">
            <motion.img src={picture} className="w-[37.5rem] h-[37.5rem] scale-110 -translate-y-8" variants={pictureVariants} initial="init" animate="in" exit="out" transition={{duration: 0.5}} />
            <motion.div className="flex flex-col gap-20 w-[28rem]" variants={listVariants} initial="init" animate="in" exit="out">
                <motion.div className="flex flex-col gap-3" variants={itemVariants} transition={{duration: 0.5}}>
                    <motion.div className="flex justify-between">
                        <motion.h2 className="font-display">{kind}</motion.h2>
                        <Cooker name={cooker} />
                    </motion.div>                
                    <motion.h2 className="font-serif">{name}</motion.h2>
                </motion.div>
                <motion.article className="text-pretty text-3xl font-medium" variants={itemVariants} transition={{duration: 0.5}}>
                    {recipe}
                </motion.article>
                <motion.div variants={itemVariants} transition={{duration: 0.5}} className="text-3xl">
                    <Ratio row proteins={p.toString()} fats={f.toString()} carbo={c.toString()} />
                </motion.div>
            </motion.div>
        </motion.div>
        <motion.div className="flex flex-col justify-between shrink-0 mx-6">
            <motion.div className="flex flex-col gap-6" variants={listVariants} initial="init" animate="in" exit="out">
                <motion.h3 variants={itemVariants} transition={{duration: 0.5}}>Рекомендуем на:</motion.h3>
                { meals.map(meal => <motion.div key={meal} variants={itemVariants} transition={{duration: 0.5}}>
                    <MealLabel>{mealsMap[meal]}</MealLabel>
                </motion.div>) }
            </motion.div>
            <motion.div variants={itemVariants} initial="init" animate="in" exit="out" transition={{duration: 0.5}}>
                <Block className="dark-block aspect-video cursor-pointer hover:scale-105 transition-transform"/>
            </motion.div>            
        </motion.div>
    </motion.div>
)