import { AnimationProps, MotionStyle, TargetAndTransition, Variants, motion } from "framer-motion"
import { ReactNode } from "react"
import { Corners, CornersMap } from "./corners"
import { twMerge } from "tailwind-merge"

export const Block = ({ children, className, whileTap, whileHover, corners = '', style = {}, variants, initial, animate, exit, transition} : {
    children?: ReactNode,
    className?: string,
    corners?: Corners,
    whileTap?: TargetAndTransition,
    whileHover?: TargetAndTransition,
    style?: MotionStyle,
    variants?: Variants,
    initial?: string,
    animate?: string,
    exit?: string,
    transition?: AnimationProps["transition"]
}) => {
    return <motion.div 
        whileTap={whileTap}  
        whileHover={whileHover}
        variants={variants} 
        initial={initial} 
        animate={animate} 
        exit={exit} 
        style={style}
        transition={transition}
        className={twMerge(
            "text-sm",
            CornersMap[corners],
            className 
        )}>
        {children}
    </motion.div>
}