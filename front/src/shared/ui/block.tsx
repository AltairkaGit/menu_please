import clsx from "clsx"
import { MotionStyle, TargetAndTransition, motion } from "framer-motion"
import { ReactNode } from "react"

const CornersMap = {
    '': 'rounded-md',
    'lg': 'rounded-lg',
    '3xl': 'rounded-3xl',
    'full': 'rounded-full'
}

export type Corners = ''| 'lg' | '3xl' | 'full'

export const Block = ({ children, className, whileTap, corners = '', style = {}} : {
    children?: ReactNode,
    className?: string,
    corners?: Corners,
    whileTap?: TargetAndTransition,
    style?: MotionStyle
}) => {
    return <motion.div whileTap={whileTap} style={style} className={clsx(
        "test-st",
        CornersMap[corners],
        className 
    )}>
        {children}
    </motion.div>
}