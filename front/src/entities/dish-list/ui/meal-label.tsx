import { Block } from "@shared/ui/block"
import { Round } from "@shared/ui/dumb-round"
import { ReactNode } from "react"
import { motion } from "framer-motion"
import clsx from "clsx"

export const MealLabel = ({children, className}: {children: ReactNode, className?: string}) => {
    return (
        <Block corners="full" className={clsx("text-xl px-4 py-2 flex w-full items-center justify-between align-middle", className)}>
            <Round className='dark-block mb-[0.1rem]' r="0.75rem" />
            <motion.div className="flex">
                {children}
            </motion.div>
            <Round className='dark-block mb-[0.1rem] invisible' r="0.75rem" />
        </Block>
    )
}