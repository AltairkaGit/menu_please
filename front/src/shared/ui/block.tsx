import clsx from "clsx"
import { TargetAndTransition, motion } from "framer-motion"
import { ReactNode } from "react"

const CornersMap = {
    '': 'rounded-md',
    'lg': 'rounded-lg',
    '3xl': 'rounded-3xl',
    'full': 'rounded-full'
}

export type Corners = ''| 'lg' | '3xl' | 'full'

export const Block = ({ children, className, whileTap, corners = ''} : {
    children?: ReactNode,
    className?: string,
    corners?: Corners,
    whileTap?: TargetAndTransition
}) => {
    return <motion.div whileTap={whileTap} className={clsx(
        "test-st",
        CornersMap[corners],
        className 
    )}>
        {children}
    </motion.div>
}