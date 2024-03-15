import { motion } from "framer-motion"
import { twMerge } from "tailwind-merge"

export const Round = ({active, className = ""}: {active?: boolean, className?: string}) => (
    <motion.div className={twMerge("mb-[0.1rem] w-3 h-3 rounded-full", className)}
        variants={{
            "dark": {background: "#000000", color: "#FFFFFF"},
            "light": {background: "#FFFFFF", color: "#000000"}
        }}
        animate={active ? "light" : "dark"} 
        transition={{duration: 0.25}}/>
)