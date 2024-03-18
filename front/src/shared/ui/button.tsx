import { TargetAndTransition, motion } from "framer-motion"
import { ReactNode } from "react"
import { Block } from "./block"
import { twMerge } from "tailwind-merge"
import { Corners, CornersMap } from "./corners"

export const Button = ({ onClick, children, className, whileTap, disabled = false, corners = ''} : {
    onClick: () => any,
    children: ReactNode,
    className?: string,
    corners?: Corners,
    whileTap?: TargetAndTransition,
    disabled?: boolean
}) => {
    return <motion.button className={twMerge("w-[3.625rem] h-[3.625rem] flex items-center justify-center outline-1 cursor-pointer", CornersMap[corners], className)}
        disabled={disabled} onClick={onClick} whileTap={whileTap ?? {scale: 0.8}}>
            {children}
    </motion.button>
}