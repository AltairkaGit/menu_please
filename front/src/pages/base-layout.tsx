import { motion } from "framer-motion"
import { Outlet } from "react-router-dom"

export const BaseLayout = () => {
    return (
        <motion.main className="min-h-dvh px-10 xl:px-24 w-full relative">
            <Outlet/>
        </motion.main>
    )
}