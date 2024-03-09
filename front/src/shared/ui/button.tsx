import clsx from "clsx"
import { TargetAndTransition, motion } from "framer-motion"
import { ReactNode } from "react"
import { Block, Corners } from "./block"

export const Button = ({ onClick, children, className, whileTap, disabled = false, corners = ''} : {
    onClick: () => any,
    children: ReactNode,
    className?: string,
    corners?: Corners,
    whileTap?: TargetAndTransition,
    disabled?: boolean
}) => {
    return <Block corners={corners} className={clsx("w-[3.625rem] h-[3.625rem] flex items-center justify-center", className)}>
        <motion.button disabled={disabled} onClick={onClick} whileTap={whileTap ?? {scale: 0.8}} className="w-full h-full flex justify-center items-center">
            {children}
        </motion.button>
    </Block>
}