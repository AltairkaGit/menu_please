import { AmountedDish, Meal } from "@entities/dish/api"
import { motion } from "framer-motion"
import { twMerge } from "tailwind-merge"
import { DishList } from "@entities/dish-list/api"
import { MealList } from "./item"

export const MenuListWide = ({ currentDish, currentMeal, dishList, display } : {
    currentDish: AmountedDish,
    currentMeal: Meal,
    dishList: DishList,
    display: string
}) => (
    <motion.div className={twMerge('flex grow mx-auto gap-8 self-stretch relative', display)}>
        <MealList listId={dishList.id} active={currentMeal == Meal.breakfast} dishes={dishList.breakfast} title='Завтрак' className='min-w-44 max-w-72' currentDishId={currentDish.id} />
        <MealList listId={dishList.id} active={currentMeal == Meal.lunch} dishes={dishList.lunch} title='Обед' className='min-w-44 max-w-72' currentDishId={currentDish.id} />
        <MealList listId={dishList.id} active={currentMeal == Meal.dinner} dishes={dishList.dinner} title='Ужин' className='min-w-44 max-w-72' currentDishId={currentDish.id} /> 
    </motion.div>
)
