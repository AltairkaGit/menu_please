import { ReactNode } from "react"
import { motion } from "framer-motion"
import clsx from "clsx"

const Round = ({active, className = ""}: {active: boolean, className?: string}) => (
    <motion.div className={clsx("mb-[0.1rem] w-3 h-3 rounded-full", className)}
        variants={{
            "dark": {background: "#000000", color: "#FFFFFF"},
            "light": {background: "#FFFFFF", color: "#000000"}
        }}
        animate={active ? "light" : "dark"} 
        transition={{duration: 0.25}}/>
)

export const MealLabel = ({listId, children, active, innerClassName, outerClassName}
    : {listId: number, children: ReactNode, active: boolean, innerClassName?: string, outerClassName?: string}) => {
    const className = "rounded-full text-xl flex w-full items-center justify-between align-middle transition-colors z-9"
    const content = <>
        <Round active={active} />
        <motion.div className="flex">
            {children}
        </motion.div>
        <Round active className="invisible" />
    </>

    return <motion.div className={clsx(className, "light-block", !active ? "px-4 py-2" : '', outerClassName)} transition={{duration: 0.25}}>
        { active ? <motion.div layoutId={`mealLabel-${listId}`} className={clsx(className, "dark-block z-10", active ? "px-4 py-2" : '', innerClassName)}>{content}</motion.div> : content }
    </motion.div>

}