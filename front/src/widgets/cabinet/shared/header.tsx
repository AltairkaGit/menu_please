import { motion } from "framer-motion"
import { ReactNode } from "react"
import { Label } from "@shared/ui/label"
import clsx from "clsx"

const LabelLogo = () => {
    return <Label className="dark-block font-display mx-auto">Menu, please</Label>
}

export const Header = ({LeftLabel, RightLabel} : {LeftLabel: ReactNode, RightLabel: ReactNode}) => {
    return (
        <motion.nav className={clsx("w-full absolute top-0 left-0 px-10 lg:px-24 pt-8 pb-2 flex", !LeftLabel && "lg:pl-[20.5rem]", !RightLabel && "lg:pr-[20.5rem]")} >
            {LeftLabel}
            <LabelLogo />
            {RightLabel}
        </motion.nav>
    )
}