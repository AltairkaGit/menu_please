import { motion } from "framer-motion"
import { twMerge } from "tailwind-merge"

export const Round = ({className = "", animation}: {className?: string, animation?: any}) => (
    <motion.div {...animation} className={twMerge("mb-[0.1rem] w-3 h-3 rounded-full", className)} />
)