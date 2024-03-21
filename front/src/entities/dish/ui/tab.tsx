import { AmountedDish } from "../api"
import { twMerge } from "tailwind-merge"
import { AnimatePresence, motion } from "framer-motion"
import { PlusMd } from "@static/icons/plus-md"
import { Button } from "@shared/kit/button"

export const DishTab = ({ dish, currentDish, setDish }: { dish: AmountedDish, currentDish: AmountedDish, setDish: (dish: AmountedDish) => any }) => {
        const active = dish==currentDish
        return <motion.div className={twMerge("w-56 h-56 relative flex justify-center shrink-0")}
            layout initial={{x: "-1rem", opacity: 0}} animate={{x: 0, opacity: 1}} exit={{x: "1rem", opacity: 0}} transition={{duration: 0.5}}
        >
            {active ? <motion.div layoutId="dish-tab" className="absolute w-full h-full rounded-3xl light-block z-9" /> : null }
            <AnimatePresence mode="wait">
                <motion.div key={dish.amount} className="rounded-lg absolute right-4 top-4 flex items-center justify-center px-1 z-10 light-block"
                    initial={{scale: 0.5, opacity: 0}} animate={{scale: 1, opacity: 1}} exit={{scale: 0.5, opacity: 0}} transition={{duration: 0.25}}>
                    {dish.amount}x
                </motion.div>
            </AnimatePresence>            
            <Button corners="3xl" onClick={() => setDish(dish)} className={twMerge("flex w-full h-full flex-col items-center justify-between z-10")}>
                <motion.img src={dish.picture} className="w-32 h-32 my-auto" />
                <motion.div className="text-lg px-2">{dish.name}</motion.div>
                <AnimatePresence mode="wait">
                    <motion.div key={dish.amount} layout initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.5}}
                    className="text-base px-2 mb-2">{dish.amount * dish.calories} кал.</motion.div>
                </AnimatePresence>
            </Button>
        </motion.div>
}

export const AddDishTab = ({showModal}: {showModal: () => any}) => {
    return <motion.button whileTap={{scale: 0.9}} onClick={showModal} className="w-56 h-56 shrink-0 flex justify-center items-center flex-col gap-3 hover:light-block rounded-3xl"
        layout initial={{x: "-1rem", opacity: 0}} animate={{x: 0, opacity: 1}} exit={{x: "1rem", opacity: 0}} transition={{duration: 0.5}}
    >
        <PlusMd />
        Добавить
    </motion.button>
} 