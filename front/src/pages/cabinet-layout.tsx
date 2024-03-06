import { motion } from "framer-motion"
import { Outlet } from "react-router-dom"

export const CabinetLayout = () => {
    return (
        <motion.main className="min-h-dvh px-24 w-full relative">
            <Outlet/>
        </motion.main>
    )
}