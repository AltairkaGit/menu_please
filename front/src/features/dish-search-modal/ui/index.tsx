import { Meal } from "@entities/dish/api"
import { DishList } from "@features/dish-list/ui"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect } from "react"

interface Search {
    query: string
    dir: 'asc' | 'desc'
    ord: string,
    meal: Meal
}

const variants = {
    in: {
        display: 'block'
    },
    out: {
        display: 'none'
    }
}

export const DishSearchModal = ({isOpen, close}: {isOpen: boolean, close: () => any}) => {
    useEffect(() => {
        const handler = (e: any) => {
            if (e.key == "Escape") close()
        }
        document.addEventListener("keydown", handler)
        return () => document.removeEventListener("keydown", handler)
    }, [])

    return (
        <AnimatePresence mode="wait">
            <motion.div animate={isOpen ? "in" : "out"} variants={variants} className="absolute z-20 top-28 h-[85dvh] light-block -left-4 -right-4 rounded-3xl p-12  overflow-y-auto">
                <DishList meal={Meal.breakfast} />
            </motion.div>
        </AnimatePresence>
              
    )

}