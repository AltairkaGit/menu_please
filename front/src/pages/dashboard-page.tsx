import { useBackButton } from '@features/navbar/use-back-button'
import { motion } from 'framer-motion'

export const DashboardPage = () => {
    useBackButton()

    return (
        <motion.div>
            Dashboard page
        </motion.div>
    )
}