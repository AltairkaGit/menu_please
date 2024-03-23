import { motion } from "framer-motion"
import { useGetAllCookerDishesQuery } from "@features/dish/service"
import { useAppSelector } from "@shared/hooks"
import { DishCardWithEdit } from "@widgests/dish/card-with-edit"
import { CreateDishTab } from "@entities/dish/ui/create-tab"

const variants = {
    in: {transition: {staggerChildren: 0.05, staggerDirection: 1}}, 
    out: {transition: {staggerChildren: 0.05, staggerDirection: -1}}
}

export const CookerDishes = () => {
    const cookerId = useAppSelector(state => state.auth.userId)
    const { data } = useGetAllCookerDishesQuery(cookerId)

    return (
        <motion.div className="flex flex-wrap gap-14" variants={variants} initial="init" animate="in" exit="out">
            <CreateDishTab />
            {data?.map(dish => <DishCardWithEdit key={dish.id} dish={dish} />)}
        </motion.div>
    )
}