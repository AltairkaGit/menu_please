import { Block } from "@shared/kit/block"
import { motion } from "framer-motion"

export const CalorieesSqared = ({calories}: {calories: number}) => (
    <Block className="light-block w-[3.625rem] flex flex-col items-center justify-center">
        <motion.p>{calories}</motion.p>
        <motion.p>кал</motion.p>                            
    </Block>
)