import { Label } from '@shared/ui/label'
import { motion } from 'framer-motion'
import { Header } from '@widgests/cabinet/shared/header'
import { UserProfile } from '@widgests/cabinet/dashboard/user-profile'
import { Navigate, ScrollRestoration, useParams } from 'react-router-dom'
import { BackButton } from '@widgests/cabinet/shared/back-button'
import { useAppSelector } from '@shared/hooks'
import { DishListWidget } from '@widgests/cabinet/dish-list'

const LeftLabel = <Label className="light-block" leftButton={<BackButton />}>Меню</Label>

export const DishListPage = () => {
    const { id } = useParams()
    const dishList = useAppSelector((state) => state.dishList.lists.find(list => list.id === Number(id)))
    if (!dishList) return <Navigate to={'/dashboard'} />

    return <>
        <Header LeftLabel={LeftLabel} RightLabel={<UserProfile/>} />
        <motion.div className="pt-32">
            <DishListWidget dishList={dishList} />
            <ScrollRestoration />
        </motion.div>
    </>
}