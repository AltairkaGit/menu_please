import { Block } from "@shared/ui/block"
import { Button } from "@shared/ui/button"
import { MinusMd } from "@static/icons/minus-md"
import { PlusMd } from "@static/icons/plus-md"
import { motion } from "framer-motion"

export const DishPortionControl = ({ amount, disabled, increase, decrease, remove } : 
    {amount: number, increase: () => any, decrease: () => any, remove: () => any, disabled: boolean}
) => (
    <Block className="flex gap-4 light-block self-start items-center" variants={{in: {opacity: 1, y: 0}, out: {opacity: 0, y: "1rem"}}} initial="out" animate="in" exit="out" transition={{duration: 0.5}}>
        <Button className="light-block h-8 py-1 px-4" disabled={disabled} onClick={amount > 1 ? decrease : remove}>{amount > 1 ? <MinusMd /> : <PlusMd className="rotate-45" /> }</Button>
        <motion.div className="px-6 text-xl font-medium">{amount < 10 ? `${amount * 100} г.` : `${amount / 10} кг.` }</motion.div>
        <Button className=" light-block h-8 py-1 px-4" disabled={disabled} onClick={increase}><PlusMd /></Button>
    </Block>
)