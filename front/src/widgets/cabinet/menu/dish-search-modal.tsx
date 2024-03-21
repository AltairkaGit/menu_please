import { Meal } from "@entities/dish/api"
import { DishListForModal } from "@widgests/dish/dish-list-for-modal"
import { AnimatePresence, motion } from "framer-motion"
import { ReactNode, useEffect } from "react"

const variants = {
    in: {
        display: 'block'
    },
    out: {
        display: 'none'
    }
}

const Modal = ({isOpen, body} : {isOpen: boolean, body: ReactNode}) => (
    <AnimatePresence mode="wait">
            <motion.div animate={isOpen ? "in" : "out"} variants={variants} className="absolute z-20 top-28 h-[85dvh] light-block -left-4 -right-4 rounded-3xl p-12  overflow-y-auto">
                {body}
            </motion.div>
        </AnimatePresence>
)

interface Search {
    query: string
    dir: 'asc' | 'desc'
    ord: string,
    meal: Meal
}


export const DishSearchModal = ({listId, meal, isOpen, close}: {listId: number, meal: Meal, isOpen: boolean, close: () => any}) => {
    useEffect(() => {
        const handler = (e: any) => {
            if (e.key == "Escape") close()
        }
        document.addEventListener("keydown", handler)
        return () => document.removeEventListener("keydown", handler)
    }, [])

    return (
        <Modal isOpen={isOpen} 
        
            body={<DishListForModal listId={listId} meal={meal} />}
        />             
    )

}