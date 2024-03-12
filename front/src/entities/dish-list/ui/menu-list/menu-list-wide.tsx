import { AmountedDish, Meal } from "@entities/dish/api"
import { MealList } from "../meal-list"
import { motion } from "framer-motion"

export const MenuListWide = ({sequence, breakfast, lunch, dinner, id, i} : {
    id: number,
    i: number
    sequence: {meal:Meal, dish: AmountedDish}[], 
    breakfast: AmountedDish[],
    lunch: AmountedDish[],
    dinner: AmountedDish[]
}) => (
    <motion.div className='hidden xl:flex grow mx-auto gap-8 self-stretch relative'>
        <MealList listId={id} active={sequence[i].meal == Meal.breakfast} dishes={breakfast} title='Завтрак' className='min-w-44 max-w-72' currentDishId={sequence[i].dish.id} />
        <MealList listId={id} active={sequence[i].meal == Meal.lunch} dishes={lunch} title='Обед' className='min-w-44 max-w-72' currentDishId={sequence[i].dish.id} />
        <MealList listId={id} active={sequence[i].meal == Meal.dinner} dishes={dinner} title='Ужин' className='min-w-44 max-w-72' currentDishId={sequence[i].dish.id} /> 
    </motion.div>
)