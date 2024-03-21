import { Meal } from "@entities/dish/api"
import { motion } from "framer-motion"
import { DishCardWithAddAndDetails } from "@widgests/dish/card-with-add-and-details"
import { useSearchQuery } from "@features/dish/service"

const variants = {
    in: {transition:{staggerChildren: 0.05, delayChildren: 0.25}}, 
    out: {transition: {staggerChildren: 0.07, staggerDirection: -1}}
}

export const DishListForModal = ({listId, meal}: {listId: number, meal: Meal}) => {
    const { data } = useSearchQuery({skip:0, take: 10, meal})

    return (
        <motion.div className="flex flex-wrap gap-14 justify-center" variants={variants}>
            {data?.map(dish => <DishCardWithAddAndDetails listId={listId} meal={meal} dish={dish} />)}
        </motion.div>
    )
}