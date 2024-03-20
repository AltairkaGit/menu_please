import { ReactNode } from "react"
import { motion } from "framer-motion"

export const PageBody = ({children} : {children?: ReactNode}) => {
    return <motion.div className="my-32">
        {children}
    </motion.div>
}