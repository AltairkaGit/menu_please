import clsx from "clsx"
import { motion } from "framer-motion"
import { ReactNode } from "react"
import { Corners, TCorners } from "./corners"

export const Label = ({children, leftButton, rightButton, className, onClick, corners = ''} : {
    children: ReactNode,
    leftButton?: ReactNode,
    rightButton?: ReactNode,
    corners?: TCorners,
    className?: string,
    onClick?: () => void
}) => {
    return <motion.div onClick={onClick} className={clsx(
        "w-[328px] h-[58px] text-st font-sans overflow-hidden flex items-center",
        !leftButton && "pl-[58px]",
        !rightButton && "pr-[58px]",
        Corners[corners], 
        className)}
    >
        {leftButton}
        <motion.div className="flex-1 text-center">
            {children}
        </motion.div>
        {rightButton}
    </motion.div>
}