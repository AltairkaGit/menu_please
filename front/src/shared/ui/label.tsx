import { motion } from "framer-motion"
import { ReactNode } from "react"
import { Block, Corners } from "./block"
import { twMerge } from "tailwind-merge"

export const Label = ({children, leftButton, rightButton, className, corners = ''} : {
    children: ReactNode,
    leftButton?: ReactNode,
    rightButton?: ReactNode,
    corners?: Corners,
    className?: string,
}) => {

    return <Block corners={corners} className={twMerge(
        "text-st h-[3.625rem] text overflow-hidden flex items-center w-[20.5rem]",
        !leftButton && "pl-[3.625rem]",
        !rightButton && "pr-[3.625rem]",
        className)}
    >
        {leftButton}
        <motion.div className="flex-1 text-center">
            {children}
        </motion.div>
        {rightButton}
    </Block>
}