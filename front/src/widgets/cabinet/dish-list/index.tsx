import { DishList } from "@entities/dish-list/api"
import { AmountedDish, Meal } from "@entities/dish/api"
import { Ratio } from "@entities/dish/ui/ratio"
import { calcMealCalories } from "@features/dish-list/calc-meal-calories"
import { calcMealNutrientsRatio } from "@features/dish-list/calc-meal-nutrients"
import { Block } from "@shared/ui/block"
import { Cooking } from "@static/icons/cooking"
import { motion } from "framer-motion"
import { useState } from "react"

const meals = {
    [Meal.breakfast]: 'завтрак',
    [Meal.lunch]: 'обед',
    [Meal.dinner]: 'ужин',
}

export const DishListWidget = ({dishList} : {dishList: DishList}) => {
    const [meal, setMeal] = useState<Meal>(Meal.breakfast)
    const [dish, setDish] = useState<AmountedDish>(dishList.breakfast[0])
    const calories = calcMealCalories(dishList[meal])
    const { p, f, c } = calcMealNutrientsRatio(dishList[meal])

    return (
        <Block className="flex gap-12 h-[48rem]">
            <motion.div className="flex-1 flex-grow-[7] flex flex-col justify-between">
                <motion.div className="flex gap-8">
                    <motion.img src={dish.picture} className="w-[27rem] h-[27rem]" />
                    <motion.div className="flex flex-col justify-between">
                        <motion.div>

                        </motion.div>
                        
                    </motion.div>
                </motion.div>
                
            </motion.div>
            <motion.div className="flex-1 flex-grow-[4] flex flex-col justify-between items-center">
                <motion.div>
                    <Block className="flex light-block py-2 px-8 justify-between text-st items-center">
                        <motion.div>
                            Рецепт:
                        </motion.div>
                        <Cooking />
                    </Block>
                    <motion.div className="my-8 px-8 text-2xl text-justify">
                        {dish.recipe}
                    </motion.div>
                </motion.div>
                <motion.div className="text-2xl">
                    <Ratio row proteins={`${dish.proteins}`} fats={`${dish.fats}`} carbo={`${dish.carbohydrates}`} />
                </motion.div>
                <Block className="light-block w-full px-12 py-6 flex flex-col justify-between min-h-64">
                    <motion.div className="text-2xl">
                        Ваш {meals[meal]}:
                    </motion.div>
                    <motion.div className="text-2xl flex flex-col gap-4">
                        Калорийнсть: {calories} кал.
                        <Ratio row proteins={`${p}%`} fats={`${f}%`} carbo={`${c}%`} />
                    </motion.div>
                </Block>
            </motion.div>
        </Block>
    )
}