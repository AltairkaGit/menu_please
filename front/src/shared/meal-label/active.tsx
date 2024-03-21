import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"
import { motion } from "framer-motion"
import { Round } from "./round-active"

export const MealLabel = ({listId, children, active, innerClassName, outerClassName}
    : {listId: number, children: ReactNode, active?: boolean, innerClassName?: string, outerClassName?: string}) => {
    const className = "rounded-full text-xl flex w-full items-center justify-between align-middle transition-colors z-9"
    const content = <>
        <Round active={active} />
        <motion.div className="flex">
            {children}
        </motion.div>
        <Round active className="invisible" />
    </>

    return <motion.div className={twMerge(className, "light-block", !active ? "px-4 py-2" : '', outerClassName)} transition={{duration: 0.25}}>
        { active ? <motion.div layoutId={`mealLabel-${listId}-wide`} className={twMerge(className, "dark-block z-10", active ? "px-4 py-2" : '', innerClassName)}>{content}</motion.div> : content }
    </motion.div>
}