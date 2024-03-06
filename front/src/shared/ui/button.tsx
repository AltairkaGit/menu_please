import clsx from "clsx"
import { motion } from "framer-motion"
import { ReactNode } from "react"
import { Corners, TCorners } from "./corners"

export const Button = ({ onClick, children, className, corners = ''} : {
    onClick: () => any,
    children: ReactNode,
    className?: string,
    corners?: TCorners
}) => {
    return <motion.button onClick={onClick} className={clsx(
        "w-[58px] h-[58px] flex justify-center items-center",
        Corners[corners],
        className 
    )}>
        {children}
    </motion.button>
}