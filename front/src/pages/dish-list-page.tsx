import { Label } from '@shared/kit/label'
import { motion } from 'framer-motion'
import { Header } from '@shared/header'
import { UserProfile } from '@widgests/cabinet/dashboard/user-profile'
import { ScrollRestoration, useParams } from 'react-router-dom'
import { BackButton } from '@widgests/cabinet/shared/back-button'
import { DishListEditor } from '@widgests/cabinet/menu'

const LeftLabel = <Label className="light-block" leftButton={<BackButton />}>Меню</Label>

export const DishListPage = () => {
    const { id } = useParams()

    return <>
        <Header LeftLabel={LeftLabel} RightLabel={<UserProfile/>} />
        <motion.div className="pt-32 pb-8 xl:pb-0 relative">
            <DishListEditor id={Number(id)} />
            <ScrollRestoration />
        </motion.div>
    </>
}