import clsx from "clsx"
import { TargetAndTransition, motion } from "framer-motion"
import { ReactNode } from "react"
import { Corners, TCorners } from "./corners"

export const Button = ({ onClick, children, className, whileTap, disabled = false, corners = ''} : {
    onClick: () => any,
    children: ReactNode,
    className?: string,
    corners?: TCorners,
    whileTap?: TargetAndTransition,
    disabled?: boolean
}) => {
    return <motion.button disabled={disabled} onClick={onClick} whileTap={whileTap} className={clsx(
        "w-[3.625rem] h-[3.625rem] flex justify-center items-center",
        Corners[corners],
        className 
    )}>
        {children}
    </motion.button>
}