import clsx from "clsx"
import { motion } from "framer-motion"
import { ReactNode } from "react"
import { Block, Corners } from "./block"

export const Label = ({children, leftButton, rightButton, className, corners = ''} : {
    children: ReactNode,
    leftButton?: ReactNode,
    rightButton?: ReactNode,
    corners?: Corners,
    className?: string,
}) => {

    return <Block corners={corners} className={clsx(
        "max-w-[20.5rem] h-[3.625rem] text-st overflow-hidden flex items-center",
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