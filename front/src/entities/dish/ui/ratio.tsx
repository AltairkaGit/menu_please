import { Block } from "@shared/ui/block"
import { motion } from "framer-motion"

const RatioUnit = ({title, value}: {title: string, value: string}) => {
    return (
        <motion.div className="flex gap-1 flex-col">
            <motion.div className="text-center min-w-6">{title}</motion.div>
            <Block className="text-center light-block w-14 font-normal">{value}</Block>
        </motion.div>
    )
}

export const Ratio = ({proteins, fats, carbo}: {proteins: string, fats: string, carbo: string}) => (
    <motion.div className="flex gap-4">
        <RatioUnit title="Б" value={proteins} />
        <RatioUnit title="Ж" value={fats} />
        <RatioUnit title="У" value={carbo} />
    </motion.div>
)