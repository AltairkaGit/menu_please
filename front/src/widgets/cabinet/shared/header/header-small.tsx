import { motion } from "framer-motion"
import { Label } from "@shared/ui/label"

export const HeaderSmall = () => {
    return (
        <motion.nav className="flex xl:hidden w-full absolute top-0 left-0 px-10 pt-8 pb-2">
            <Label corners="lg" className="w-full font-display dark-block">
                Menu, please
            </Label>
        </motion.nav>
    )
}