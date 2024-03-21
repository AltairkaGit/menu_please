import { motion } from "framer-motion"
import { ReactNode } from "react"
import { Label } from "@shared/kit/label"
import clsx from "clsx"

export const HeaderWide = ({LeftLabel, RightLabel} : {LeftLabel: ReactNode, RightLabel: ReactNode}) => {
    return (
        <motion.nav className={clsx("hidden xl:flex w-full absolute z-10 top-0 left-0 px-24 pt-8 pb-2", !LeftLabel && "lg:pl-[20.5rem]", !RightLabel && "lg:pr-[20.5rem]")} >
            {LeftLabel}
            <Label className="dark-block font-display mx-auto">Menu, please</Label>
            {RightLabel}
        </motion.nav>
    )
}