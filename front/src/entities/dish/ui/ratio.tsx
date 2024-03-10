import { Block } from "@shared/ui/block"
import { motion } from "framer-motion"

const RatioUnit = ({title, value}: {title: string, value: string}) => {
    return (
        <motion.div className="flex gap-1">
            <motion.div className="text-left min-w-6">{title}</motion.div>
            <Block className="text-center light-block w-16 font-normal">{value}</Block>
        </motion.div>
    )
}

export const Ratio = ({proteins, fats, carbo}: {proteins: string, fats: string, carbo: string}) => {
    return (
        <motion.div className="flex w-full justify-between">
            <RatioUnit title="Б" value={proteins} />
            <RatioUnit title="Ж" value={fats} />
            <RatioUnit title="У" value={carbo} />
        </motion.div>
    )
}