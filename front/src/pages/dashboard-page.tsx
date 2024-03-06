import { Label } from '@shared/ui/label'
import { Header } from '@widgests/header'
import { motion } from 'framer-motion'


const LeftLabel = <Label className="light-block" >Ваши меню</Label>

export const DashboardPage = () => {
    return (
        <>
        <Header leftLabel={LeftLabel} />
        <motion.div className="pt-32">
            Dashboard page
        </motion.div>
        </>
        
    )
}