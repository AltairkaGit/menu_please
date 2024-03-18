import { Meal } from "@entities/dish/api"
import { MealTab } from "@entities/meal-label/tab"
import { motion } from "framer-motion"

export const MealTabs = ({setMeal, meal} : {setMeal: (meal: Meal) => any, meal: Meal}) => (
    <motion.div className="flex flex-col gap-6 md:flex-row md:gap-12">
        <MealTab setMeal={setMeal} currentMeal={meal} meal={Meal.breakfast}>Завтрак</MealTab>
        <MealTab setMeal={setMeal} currentMeal={meal} meal={Meal.lunch}>Обед</MealTab>
        <MealTab setMeal={setMeal} currentMeal={meal} meal={Meal.dinner}>Ужин</MealTab>
    </motion.div>
)