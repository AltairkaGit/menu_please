import clsx from "clsx"
import { motion } from "framer-motion"
import { ReactNode } from "react"

export const Button = ({ onClick, children, className, corners, shadow } : {
    onClick: () => {},
    children: ReactNode,
    className: string,
    corners?: 'lg' | '3xl' | 'full',
    shadow?: 'st' | 'lr' | 'ex',
}) => {
    return <motion.button className={clsx(
        "w-[58px] h-58-px",
        "rounded", corners && '-' + corners,
        shadow && "shadow-" + shadow,
        className 
    )}>
        {children}
    </motion.button>
}