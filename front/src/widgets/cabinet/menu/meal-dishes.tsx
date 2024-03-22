import { AmountedDish, Meal } from "@entities/dish/api"
import { DishTab } from "@entities/dish/ui/tab"
import { AddDishTab } from "@features/menu/add-dish-in-meal-tab"
import { motion } from "framer-motion"

const variants = {
    init: {transition: {staggerChildren: 0.1, staggerDirection: -1}},
    in: {transition: {staggerChildren: 0.1, staggerDirection: 1}}, 
    out: {transition: {staggerChildren: 0.1, staggerDirection: -1}}
}

export const MealDishes = ({dishes, dish, meal, openModal, setDishId}: 
    { dishes: AmountedDish[], dish?: AmountedDish, meal: Meal, openModal: () => any, setDishId: (dishId: number) => any}
) => (
    <motion.div className="flex p-3 gap-4 min-w-[764px] max-w-[1050px] overflow-x-auto" 
        variants={variants} initial="init" animate="in" exit="out">
        {dishes.map(item => <DishTab key={`${item.id}-${meal}`} dish={item} currentDish={dish} setDishId={setDishId} />)}
        <AddDishTab key={`${meal}-add`} openModal={openModal} />
    </motion.div> 
)