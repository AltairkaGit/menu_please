import { AnimatePresence, motion } from "framer-motion"
import { twMerge } from "tailwind-merge"

export const Picture = ({i, src, className}: {i: number, src: string, className?: string}) => (
    <motion.div className={twMerge("w-24 md:w-44 lg:w-64", className)}>
        <AnimatePresence mode="popLayout">
            <motion.img key={src} src={src} variants={{in: {opacity: 1, scale: 1}, out: {opacity: 0, scale: 0.8}}} 
                initial="out" animate="in" exit="out" layout transition={{duration: .25}} 
                className="w-full aspect-square"/>
        </AnimatePresence>
    </motion.div> 
)