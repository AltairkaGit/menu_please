import { AmountedDish, Meal } from "@entities/dish/api"
import { DishTab } from "@entities/dish/ui/tab"
import { AddDishTab } from "@features/menu/ui/add-dish-in-meal-button"
import { AnimatePresence, motion } from "framer-motion"

export const MealDishes = ({dishes, dish, meal, openModal, setDish}: 
    { dishes: AmountedDish[], dish: AmountedDish, meal: Meal, openModal: () => any, setDish: (dish: AmountedDish) => any}
) => (
    <AnimatePresence mode="wait">
        <motion.div key={meal} className="flex p-3 gap-4 overflow-x-auto">
            {dish && dishes.map(item => <DishTab key={`${item.id}-${meal}`} dish={item} currentDish={dish} setDish={setDish} />)}
            <AddDishTab key={meal} openModal={openModal} />
        </motion.div>    
    </AnimatePresence>
)