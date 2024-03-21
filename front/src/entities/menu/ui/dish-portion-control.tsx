import { Block } from "@shared/kit/block"
import { Button } from "@shared/kit/button"
import { Cross } from "@static/icons/cross"
import { MinusSm } from "@static/icons/minus-sm"
import { PlusSm } from "@static/icons/plus-sm"
import { motion } from "framer-motion"

export const DishPortionControl = ({ amount, disabled, increase, decrease, remove } : 
    {amount: number, increase: () => any, decrease: () => any, remove: () => any, disabled: boolean}
) => (
    <Block className="flex gap-4 light-block self-start items-center" variants={{in: {opacity: 1}, out: {opacity: 0}}} initial="out" animate="in" exit="out" transition={{duration: 0.5}}>
        <Button className="light-block h-8" disabled={disabled} onClick={amount > 1 ? decrease : remove}>{amount > 1 ? <MinusSm /> : <Cross /> }</Button>
        <motion.div className="px-6 text-xl font-medium">{amount < 10 ? `${amount * 100} г.` : `${amount / 10} кг.` }</motion.div>
        <Button className=" light-block h-8" disabled={disabled} onClick={increase}><PlusSm /></Button>
    </Block>
)