import { useGetDishByIdQuery } from '@features/dish/service'
import { Header } from '@shared/header'
import { Label } from '@shared/kit/label'
import { UserProfile } from '@widgests/cabinet/dashboard/user-profile'
import { BackButton } from '@widgests/cabinet/shared/back-button'
import { DishViewver } from '@widgests/dish/dish-viewer'
import { motion } from 'framer-motion'
import { ScrollRestoration, useParams } from 'react-router-dom'

const LeftLabel = <Label className="light-block" leftButton={<BackButton />}>Блюдо</Label>

export const DishPage = () => {
    const params = useParams()
    const {data: dish} = useGetDishByIdQuery(Number(params["id"]) ?? 0)

    return <>
        <Header LeftLabel={LeftLabel} RightLabel={<UserProfile/>} />
        <motion.div className="pt-32 pb-8 xl:pb-0 relative">
            <DishViewver 
                kind={dish?.kind ?? ''}
                name={dish?.name ?? ''}
                recipe={dish?.recipe ?? ''}
                cooker={dish?.cooker.name ?? ''}
                picture={dish?.picture ?? ''}
                meals={dish?.categories ?? []}
                p={dish?.proteins ?? 0}
                f={dish?.fats ?? 0}
                c={dish?.carbohydrates ?? 0}
            />
            <ScrollRestoration />
        </motion.div>
    </>
}