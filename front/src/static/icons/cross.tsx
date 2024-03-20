import { motion } from "framer-motion"
import { twMerge } from "tailwind-merge"

export const Cross = ({className}: {className?: string}) => <motion.svg width="17" height="17" className={twMerge("stroke-black", className)} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.24784 16.1707L15.7435 1.67504M15.7435 16.1707L1.24784 1.67504" strokeWidth="2"/>
</motion.svg>

