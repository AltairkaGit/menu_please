import { motion } from "framer-motion"
import { ReactNode } from "react"
import { Link } from "react-router-dom"

export const EntraceLink = ({to, children}: {
    to: string,
    children: ReactNode
}) => {
    return <motion.div whileHover={{scale: 1.05}} className="transition-link" layout variants={{in: {y: 0, opacity: '0.6'}, out: {y: '100%', opacity: 0}}}>
        <Link to={to}>{children}</Link>
    </motion.div>
}