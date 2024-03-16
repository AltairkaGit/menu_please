import { Block } from "@shared/ui/block"
import { AmountedDish } from "../api"
import { twMerge } from "tailwind-merge"
import { motion } from "framer-motion"
import { PlusMd } from "@static/icons/plus-md"

export const DishTab = ({ dish, currentDish, setDish }: { dish: AmountedDish, currentDish: AmountedDish, setDish: (dish: AmountedDish) => any }) => {
        const active = dish==currentDish
        return <motion.div className={twMerge("w-56 h-56 relative flex justify-center")}
            layout initial={{x: "-1rem", opacity: 0}} animate={{x: 0, opacity: 1}} exit={{x: "1rem", opacity: 0}} transition={{duration: 0.5}}
        >
            {active ? <motion.div layoutId="dish-tab" className="absolute w-full h-full rounded-3xl light-block z-9" /> : null }
            <Block corners="lg" className="absolute right-4 top-4 flex items-center justify-center px-1 z-10 light-block">{dish.amount}x</Block>
            <motion.button onClick={() => setDish(dish)} className={twMerge("flex flex-col items-center justify-between w-full z-10")}>
                <motion.img src={dish.picture} className="w-32 h-32 my-auto" />
                <motion.div className="text-lg px-2">{dish.name}</motion.div>
                <motion.div className="text-base px-2 mb-2">{dish.amount * dish.calories} кал.</motion.div>
            </motion.button>
        </motion.div>
}

export const AddDishTab = ({showModal}: {showModal: () => any}) => {
    return <motion.button whileTap={{scale: 0.9}} onClick={showModal} className="w-56 h-56 flex justify-center items-center flex-col gap-3 hover:light-block rounded-3xl"
        layout initial={{x: "-1rem", opacity: 0}} animate={{x: 0, opacity: 1}} exit={{x: "1rem", opacity: 0}} transition={{duration: 0.5}}
    >
        <PlusMd />
        Добавить
    </motion.button>
} 