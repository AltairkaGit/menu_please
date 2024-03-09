import { ReactNode } from "react"
import { motion } from "framer-motion"

export const EntraceForm = ({children, onSubmit} : {children: ReactNode, onSubmit: React.FormEventHandler<HTMLFormElement>}) => (
    <motion.form className="form" initial="out" animate="in" exit="out" onSubmit={onSubmit}>
        { children }
    </motion.form>
)