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
    return <motion.div onClick={onClick} className={clsx(className,
        "w-[20.5rem] h-[3.625rem] text-st overflow-hidden flex items-center",
        !leftButton && "pl-[3.625rem]",
        !rightButton && "pr-[3.625rem]",
        Corners[corners], className)}
    >
        {leftButton}
        <motion.div className="flex-1 text-center">
            {children}
        </motion.div>
        {rightButton}
    </motion.div>
}