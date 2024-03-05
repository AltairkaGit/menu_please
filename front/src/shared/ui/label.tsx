import clsx from "clsx"
import { motion } from "framer-motion"
import { ReactNode } from "react"

export const Label = ({children, leftButton, rightButton, corners, shadow, className, onClick} : {
    children: ReactNode,
    leftButton?: ReactNode,
    rightButton?: ReactNode,
    corners?: 'lg' | '3xl' | 'full',
    shadow?: 'st' | 'lr' | 'ex',
    className?: string,
    onClick?: () => void
}) => {
    return <motion.div onClick={onClick} className={clsx(
        "w-[326px] h-[58px] text-st font-sans overflow-hidden",
        shadow && "shadow-" + shadow,
        !leftButton && "pl-[58px]",
        !rightButton && "pr-[58px]",
        "rounded", corners && '-' + corners, 
        className)}
    >
        {leftButton}
        {children}
        {rightButton}
    </motion.div>
}