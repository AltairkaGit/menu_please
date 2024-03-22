import { AmountedDish } from "../api"
import { twMerge } from "tailwind-merge"
import { AnimatePresence, motion } from "framer-motion"
import { PlusMd } from "@static/icons/plus-md"
import { Button } from "@shared/kit/button"

const variants = {
    init: {x: "-1rem", opacity: 0},
    in: {x: 0, opacity: 1} ,
    out: {x: "1rem", opacity: 0}
}

const variantsCounter = {
    init: {scale: 0.5, opacity: 0},
    in: {scale: 1, opacity: 1},
    out: {scale: 0.5, opacity: 0}
}

const variantsCalories = {
    init: {opacity: 0, scale: 1.1},
    in: {opacity: 1, scale: 1},
    out: {opacity: 0, scale: 1.1}
}

export const DishTab = ({ dish, currentDish, setDishId }: { dish: AmountedDish, currentDish?: AmountedDish, setDishId: (dish: number) => any }) => {
        const active = dish==currentDish
        return <motion.div className={twMerge("w-56 h-56 relative flex justify-center shrink-0")}
            variants={variants} transition={{duration: 0.5}}
        >
            {active ? <motion.div layoutId="dish-tab" className="absolute w-full h-full rounded-3xl light-block z-9" /> : null }
            <AnimatePresence mode="wait">
                <motion.div key={dish.amount} className="rounded-lg absolute right-4 top-4 flex items-center justify-center px-1 z-10 light-block"
                    variants={variantsCounter} transition={{duration: 0.25}}>
                    {dish.amount}x
                </motion.div>
            </AnimatePresence>            
            <Button corners="3xl" onClick={() => setDishId(dish.id)} className={twMerge("flex w-full h-full flex-col items-center justify-between z-10")}>
                <motion.img src={dish.picture} className="w-32 h-32 my-auto" />
                <motion.div className="text-lg px-2">{dish.name}</motion.div>
                <AnimatePresence mode="wait">
                    <motion.div key={dish.amount} layout variants={variantsCalories} transition={{duration: 0.5}}
                    className="text-base px-2 mb-2">{dish.amount * dish.calories} кал.</motion.div>
                </AnimatePresence>
            </Button>
        </motion.div>
}

export const AddDishTab = ({showModal}: {showModal: () => any}) => (
    <motion.button whileTap={{scale: 0.9}} onClick={showModal} className="w-56 h-56 shrink-0 flex justify-center items-center flex-col gap-3 hover:light-block rounded-3xl"
        layout variants={variants} transition={{duration: 0.5}}
    >
        <PlusMd />
        Добавить
    </motion.button>
)