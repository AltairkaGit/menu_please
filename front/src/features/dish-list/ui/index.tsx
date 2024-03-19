import { Meal } from "@entities/dish/api"
import { DishCard } from "@entities/dish/ui/card"
import { useSearchQuery } from "@features/dish/service"
import { Button } from "@shared/ui/button"
import { ArrowFront } from "@static/icons/arrow-front"
import { PlusSm } from "@static/icons/plus-sm"
import { AnimatePresence, motion } from "framer-motion"

const variants = {
    in: {transition:{staggerChildren: 0.05, delayChildren: 0.25}}, 
    out: {transition: {staggerChildren: 0.07, staggerDirection: -1}}
}

export const DishList = ({meal}: {meal: Meal}) => {
    const {data} = useSearchQuery({skip:0, take: 10, meal})

    return (
        <motion.div className="flex flex-wrap gap-14 justify-center" variants={variants}>
                {data?.map(dish => <DishCard key={dish.id} dish={dish} buttons={
                    [
                        <Button key="details" className="light-block" onClick={() => {}}><ArrowFront /></Button>,
                        <Button key="plus" className="dark-block" onClick={() => {}}><PlusSm className="fill-white" /></Button>
                    ]} />)}
        </motion.div>
    )
}