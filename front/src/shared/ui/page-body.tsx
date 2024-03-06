import { ReactNode } from "react"
import { motion } from "framer-motion"

export const PageBody = ({children} : {children?: ReactNode}) => {
    return <motion.div className="pt-32">
        {children}
    </motion.div>
}