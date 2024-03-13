import { DishList } from "@entities/dish-list/api"
import { Block } from "@shared/ui/block"
import { Button } from "@shared/ui/button"
import { Cross } from "@static/icons/cross"
import { useChangeDishInterval } from "./use-change-dish-interval"
import { motion } from 'framer-motion'
import { ReactNode } from "react"
import { Picture } from "./picture"
import { Summary } from "./summary"
import { MenuList } from "../menu-list"

const checkIsEmpty = (dishList: DishList) => dishList.breakfast.length == 0 && dishList.lunch.length == 0 && dishList.dinner.length == 0

const CardTemplate = ({ id, children, deleteList } : { id: number, children: ReactNode, deleteList: () => any}) => (
    <Block className="flex w-full light-block mt-11 box-border min-h-80 justify-between items-center gap-5">
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

export const DishListCard = ({dishList, deleteList}: {dishList: DishList, deleteList: () => any, order: number}) => {
    if (checkIsEmpty(dishList)) return <EmptyList id={dishList.id} deleteList={deleteList} />

    const {id } = dishList
    const {i, currentDish, currentMeal} = useChangeDishInterval(dishList, 1000)

    return (
        <CardTemplate id={id} deleteList={deleteList}>
            <motion.div className="flex gap-2 self-stretch items-center">
                <Picture i={i} src={currentDish.picture} />       
                <Summary dishList={dishList} />
            </motion.div>            
            <MenuList dishList={dishList} currentDish={currentDish} currentMeal={currentMeal} />
        </CardTemplate>
    )
}