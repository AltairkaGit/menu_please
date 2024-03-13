import { motion } from 'framer-motion'
import { DishList } from "@entities/dish-list/api"
import { Block } from '@shared/ui/block'
import { ReactNode } from 'react'
import { Button } from '@shared/ui/button'
import { Cross } from '@static/icons/cross'
import { MenuList } from '../menu-list'
import { useChangeDishInterval } from './use-change-dish-interval'
import { Picture } from './picture'
import { Summary } from './summary'

const CardTemplate = ({ id, children, deleteList } : { id: number, children: ReactNode, deleteList: () => any}) => (
    <Block className="hidden xl:flex w-full light-block mt-11 box-border min-h-80 justify-between items-center gap-5">
        <Block className='dark-block w-8 h-auto shrink-0 self-stretch' />
        {children}
        <Button className="dark-block h-auto self-stretch" onClick={deleteList}><Cross /></Button>
    </Block>
)

const EmptyList = ({id, deleteList}: {id: number, deleteList: () => any}) => (
    <CardTemplate id={id} deleteList={deleteList}>
        <motion.h2 className="m-auto">
            Список пока пуст, выберите меню
        </motion.h2>
    </CardTemplate>
)

export const DishListCardWide = ({dishList, deleteList, isEmpty} : {
    dishList: DishList, 
    deleteList: () => any,
    isEmpty: boolean
}) => {
    if (isEmpty) return <EmptyList id={dishList.id} deleteList={deleteList} />

    const {id, breakfast, lunch, dinner} = dishList
    const {i, currentDish, currentMeal} = useChangeDishInterval(dishList, 1000)
    
    return (
        <CardTemplate id={id} deleteList={deleteList}>
            <Picture i={i} src={currentDish.picture} />       
            <Summary dishList={dishList} />
            <MenuList id={id} currentDish={currentDish} currentMeal={currentMeal} breakfast={breakfast} lunch={lunch} dinner={dinner} />
        </CardTemplate>
    )
}