import { motion } from "framer-motion"
import { AmountedDish } from "../api"

const variants = {
    init: {opacity: 0, scale: 0.5, rotate: "60deg"},
    in: {opacity: 1, scale: 1.2, rotate: 0}, 
    out: {opacity: 0, scale: 0.5, rotate: "60deg"},
}

export const RollingDishPicture = ({dish}: {dish: AmountedDish}) => (
     <motion.img src={dish.picture}
        initial="init" animate="in" exit="out"
        className="w-80 h-80 lg:w-[27rem] lg:h-[27rem]"
        variants={variants} transition={{duration: 0.5}}/> 
)