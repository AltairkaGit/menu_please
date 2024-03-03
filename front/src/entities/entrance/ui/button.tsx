import { ReactNode } from "react"
import { motion } from 'framer-motion'

export const Button = ({onClick, children} : {
    onClick?: () => any,
    children: ReactNode
}) => {
    return (
        <motion.button layout variants={{in: {y: 0, opacity: 1}, out: {y: '30%', opacity: 0}}} whileHover={{scale: 1.05}} whileTap={{scale: 0.95}} className="btn" onClick={onClick}>
            {children}
        </motion.button>
    )
}