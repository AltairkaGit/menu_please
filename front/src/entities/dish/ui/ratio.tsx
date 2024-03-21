import { Block } from "@shared/kit/block"
import { motion } from "framer-motion"
import { twMerge } from "tailwind-merge"

const RatioUnit = ({title, value, row}: {title: string, value: string, row?: boolean}) => {
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

export const Ratio = ({proteins, fats, carbo, row}: {proteins: string, fats: string, carbo: string, row?: boolean}) => (
    <motion.div key={`${proteins}-${fats}-${carbo}`} className="flex gap-4">
        <RatioUnit row={row} title="Б" value={proteins} />
        <RatioUnit row={row} title="Ж" value={fats} />
        <RatioUnit row={row} title="У" value={carbo} />
    </motion.div>
)