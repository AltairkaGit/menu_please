import { LabelLogo } from "@widgests/label-logo"
import { LabelProfile } from "@widgests/label-profile"
import { motion } from "framer-motion"
import { ReactNode, useState } from "react"
import { Outlet } from "react-router-dom"

export const CabinetLayout = () => {
    const [leftButton, setLeftButton] = useState<ReactNode>()
    return (
        <motion.main className="min-h-dvh px-24 w-full">
            <motion.header>
                {leftButton}
                <LabelLogo />
                <LabelProfile />
            </motion.header>
            <Outlet context={{leftButton, setLeftButton}} />
        </motion.main>
    )
}