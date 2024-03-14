import { AmountedDish, Meal } from "@entities/dish/api"
import { motion } from "framer-motion"
import { twMerge } from "tailwind-merge"
import { DishList } from "@entities/dish-list/api"
import { MealList } from "./item"

const titles = {
    [Meal.breakfast]: 'Завтрак',
    [Meal.lunch]: 'Обед',
    [Meal.dinner]: 'Ужин'
}

export const MenuListCompact = ({ currentDish, currentMeal, dishList, display } : {
    currentDish: AmountedDish,
    currentMeal: Meal,
    dishList: DishList,
    display: string
}) => {
    return <motion.div className={twMerge('flex grow mx-auto gap-8 self-stretch relative', display)}>
        <MealList currentMeal={currentMeal} listId={dishList.id} dishes={dishList[currentMeal]} 
            title={titles[currentMeal]} className='w-52' currentDishId={currentDish.id} />
    </motion.div>
}

