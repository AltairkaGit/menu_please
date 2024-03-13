import { ReactNode } from "react"
import { Round } from "./round"
import { motion } from "framer-motion"

export const MealLabel = ({listId, children}
    : {listId: number, children: ReactNode }) => {
    const className = "rounded-full text-xl flex w-full items-center justify-between align-middle transition-colors light-block px-4 py-2"

    return <motion.div className={className} transition={{duration: 0.25}}
        layout variants={{in: {}, out: {}}}
        initial="out" animate="in" exit="out"
    >
        <Round className="dark-block" />
        <motion.div className="flex"
            layout variants={{in: {opacity: 1}, out: {opacity: 0}}}
            initial="out" animate="in" exit="out"
        >
            {children}
        </motion.div>
        <Round className="invisible" />
    </motion.div>
}