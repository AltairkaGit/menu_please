import { motion } from "framer-motion"
import { AmountedDish, Meal } from "../api"

const variants = {
    init: {opacity: 0, scale: 0.5, rotate: "60deg"},
    in: {opacity: 1, scale: 1.2, rotate: 0}, 
    out: {opacity: 0, scale: 0.5, rotate: "60deg"}
}

export const RollingDishPicture = ({dish, meal}: {dish: AmountedDish, meal: Meal}) => {
    return <motion.img key={`${dish.id}-${meal}-picture`} src={dish.picture}
        className="w-80 h-80 lg:w-[27rem] lg:h-[27rem]"
        variants={variants} transition={{duration: 0.5}}/> 
}