import { AnimatePresence, motion } from "framer-motion"
import { Round } from "./round"

export const MealLabel = ({children}
    : { children: string }) => {
    const className = "rounded-full text-xl flex w-full items-center justify-between align-middle transition-colors light-block px-4 py-2"

    return <AnimatePresence mode="wait">
        <motion.div key={children} className={className}
        initial="out" animate="in" exit="ex"
        >
            <Round className="dark-block" />
            <motion.div className="flex" layout variants={{in: {opacity: 1}, out: {opacity: 0}, ex: {opacity: 0}}} transition={{duration: 0.5}}>
                {children}
            </motion.div>
            <Round className="invisible" />
        </motion.div>
    </AnimatePresence>
}