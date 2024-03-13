import { AnimatePresence, motion } from "framer-motion"
import { twMerge } from "tailwind-merge"

export const Picture = ({i, src, className}: {i: number, src: string, className?: string}) => (
    <motion.div className={twMerge("min-w-44 max-w-80", className)}>
        <AnimatePresence mode="popLayout">
            <motion.img key={i} src={src} variants={{in: {opacity: 1, scale: 1}, out: {opacity: 0, scale: 0.8}}} 
                initial="out" animate="in" exit="out" layout transition={{duration: .25}} 
                className="w-full aspect-square"/>
        </AnimatePresence>
    </motion.div> 
)