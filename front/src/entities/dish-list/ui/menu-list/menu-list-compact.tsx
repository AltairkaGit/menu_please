import { AmountedDish, Meal } from "@entities/dish/api"
import { motion } from "framer-motion"
import { MealLabel } from "../meal-label"
import { twMerge } from "tailwind-merge"

const MealList = ({listId, dishes, title, className, currentDishId}: 
    {listId: number, dishes: AmountedDish[], title: string, className?: string, currentDishId?: number}
) => {
    return <motion.div className={twMerge("pt-6 relative", className)}>
        <MealLabel listId={listId} innerClassName="flex">{title}</MealLabel>
        {dishes.map((dish) => (
            <motion.div key={dish.id} className="mt-4 text-wrap text-center leading-4">
                {dish.name}
                {currentDishId == dish.id  ? (
                    <motion.div className="h-px w-1/2 ml-[25%] dark-block mt-1 z-10 absolute" layoutId={`underline${listId}-comp`}/>
                ) : null}
            </motion.div>
        ))}
    </motion.div>
}

const mealToTitle = {
    [Meal.breakfast]: 'Завтрак',
    [Meal.lunch]: 'Обед',
    [Meal.dinner]: 'Ужин'
}

export const MenuListCompact = ({ currentDish, currentMeal, breakfast, lunch, dinner, id } : {
    id: number,
    currentDish: AmountedDish,
    currentMeal: Meal,
    breakfast: AmountedDish[],
    lunch: AmountedDish[],
    dinner: AmountedDish[]
}) => {
    const mealToDishes = {
        [Meal.breakfast]: breakfast,
        [Meal.lunch]: lunch,
        [Meal.dinner]: dinner
    }
    let dishes = mealToDishes[currentMeal]
    let title = mealToTitle[currentMeal]
    return (
        <motion.div className='flex grow mx-auto self-stretch relative'>
            <MealList listId={id} dishes={dishes} title={title} currentDishId={currentDish.id} /> 
        </motion.div>
    )
}