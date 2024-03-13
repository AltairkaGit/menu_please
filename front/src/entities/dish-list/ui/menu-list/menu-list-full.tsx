import { AmountedDish, Meal } from "@entities/dish/api"
import { motion } from "framer-motion"
import { MealLabel } from "../meal-label"
import { twMerge } from "tailwind-merge"

const MealList = ({listId, dishes, active, title, className, currentDishId}: 
    {listId: number, dishes: AmountedDish[], active: boolean, title: string, className?: string, currentDishId?: number}
) => {
    return <motion.div className={twMerge("pt-6 flex-1 relative", className)}>
        <MealLabel listId={listId} active={active} innerClassName="flex">{title}</MealLabel>
        {dishes.map((dish) => <motion.div key={dish.id} className="mt-4 text-wrap text-center leading-4">
            {dish.name}
            {active && currentDishId == dish.id  ? (
                <motion.div className="h-px w-1/2 ml-[25%] dark-block mt-1 z-10 absolute" layoutId={`underline${listId}`}/>
              ) : null}
        </motion.div>)}
    </motion.div>
}

export const MenuListFull = ({ currentDish, currentMeal, breakfast, lunch, dinner, id } : {
    id: number,
    currentDish: AmountedDish,
    currentMeal: Meal,
    breakfast: AmountedDish[],
    lunch: AmountedDish[],
    dinner: AmountedDish[]
}) => (
    <motion.div className='flex grow mx-auto gap-8 self-stretch relative'>
        <MealList listId={id} active={currentMeal == Meal.breakfast} dishes={breakfast} title='Завтрак' className='w-44' currentDishId={currentDish.id} />
        <MealList listId={id} active={currentMeal == Meal.lunch} dishes={lunch} title='Обед' className='w-44' currentDishId={currentDish.id} />
        <MealList listId={id} active={currentMeal == Meal.dinner} dishes={dinner} title='Ужин' className='w-44' currentDishId={currentDish.id} /> 
    </motion.div>
)