import { Label } from '@shared/ui/label'
import { motion } from 'framer-motion'
import { Header } from '@widgests/cabinet/shared/header'
import { UserProfile } from '@widgests/cabinet/dashboard/user-profile'
import { ScrollRestoration, useParams } from 'react-router-dom'
import { BackButton } from '@widgests/cabinet/shared/back-button'
import { DishListEditor } from '@widgests/cabinet/dish-list'

const LeftLabel = <Label className="light-block" leftButton={<BackButton />}>Меню</Label>

export const DishListPage = () => {
    const { id } = useParams()

    return <>
        <Header LeftLabel={LeftLabel} RightLabel={<UserProfile/>} />
        <motion.div className="pt-32">
            <DishListEditor id={Number(id)} />
            <ScrollRestoration />
        </motion.div>
    </>
}