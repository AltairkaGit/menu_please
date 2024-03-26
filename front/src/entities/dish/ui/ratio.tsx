import { Block } from "@shared/kit/block"
import { motion } from "framer-motion"
import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

const RatioUnit = ({title, value, row}: {title: string, value: string | ReactNode, row?: boolean}) => {
    return (
        <motion.div className={twMerge("flex gap-1", row ? 'flex-row' : 'flex-col' )}>
            <motion.div className="text-center min-w-6">{title}</motion.div>
            <Block className="text-center light-block w-14 font-normal">
                <motion.div>
                    {value}
                </motion.div>
            </Block>
        </motion.div>
    )
}

export const Ratio = ({proteins, fats, carbo, row}: {
    proteins: string | ReactNode, 
    fats: string | ReactNode, 
    carbo: string | ReactNode, 
    row?: boolean, 
}) => (
    <motion.div className="flex gap-4">
        <RatioUnit row={row} title="Б" value={proteins} />
        <RatioUnit row={row} title="Ж" value={fats} />
        <RatioUnit row={row} title="У" value={carbo} />
    </motion.div>
)