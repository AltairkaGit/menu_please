import clsx from "clsx"
import { AnimationProps, MotionStyle, TargetAndTransition, Variants, motion } from "framer-motion"
import { ReactNode } from "react"
import { Corners, CornersMap } from "./corners"

export const Block = ({ children, className, whileTap, corners = '', style = {}, variants, initial, animate, exit, transition} : {
    children?: ReactNode,
    className?: string,
    corners?: Corners,
    whileTap?: TargetAndTransition,
    style?: MotionStyle,
    variants?: Variants,
    initial?: string,
    animate?: string,
    exit?: string,
    transition?: AnimationProps["transition"]
}) => {
    return <motion.div 
        whileTap={whileTap}  
        variants={variants} 
        initial={initial} 
        animate={animate} 
        exit={exit} 
        style={style}
        transition={transition}
        className={clsx(
            "text-sm",
            CornersMap[corners],
            className 
        )}>
        {children}
    </motion.div>
}