import { AmountedDish, Meal } from "@entities/dish/api"
import { MealList } from "./meal-list"
import { motion } from "framer-motion"

export const MenuListWide = ({ currentDish, currentMeal, breakfast, lunch, dinner, id } : {
    id: number,
    currentDish: AmountedDish,
    currentMeal: Meal,
    breakfast: AmountedDish[],
    lunch: AmountedDish[],
    dinner: AmountedDish[]
}) => (
    <motion.div className='hidden xl:flex grow mx-auto gap-8 self-stretch relative'>
        <MealList listId={id} active={currentMeal == Meal.breakfast} dishes={breakfast} title='Завтрак' className='min-w-44 max-w-72' currentDishId={currentDish.id} />
        <MealList listId={id} active={currentMeal == Meal.lunch} dishes={lunch} title='Обед' className='min-w-44 max-w-72' currentDishId={currentDish.id} />
        <MealList listId={id} active={currentMeal == Meal.dinner} dishes={dinner} title='Ужин' className='min-w-44 max-w-72' currentDishId={currentDish.id} /> 
    </motion.div>
)