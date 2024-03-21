import { DishList } from "@entities/dish-list/api"
import { Block } from "@shared/kit/block"
import { Button } from "@shared/kit/button"
import { Cross } from "@static/icons/cross"
import { useChangeDishInterval } from "@features/menu/use-change-dish-interval"
import { motion } from 'framer-motion'
import { ReactNode } from "react"
import { Picture } from "./picture"
import { Summary } from "./summary"
import { MenuList } from "../menu-list"
import { Link } from "react-router-dom"

const checkIsEmpty = (dishList: DishList) => dishList.breakfast.length == 0 && dishList.lunch.length == 0 && dishList.dinner.length == 0

const CardTemplate = ({ id, children, deleteList } : { id: number, children: ReactNode, deleteList: () => any}) => (
    <Block className="flex w-full flex-col lg:flex-row light-block mt-11 box-border min-h-80 justify-between items-center gap-5 pb-0 md:pb-12 lg:pb-0">
        <Block className='hidden md:block dark-block w-auto h-4 lg:w-8 lg:h-auto shrink-0 self-stretch' />
        <Link className="flex w-full flex-col lg:flex-row " to={`/dish-list/${id}`}>
            {children}
        </Link>
        <Button className="dark-block w-8 h-auto self-stretch hidden lg:flex" onClick={deleteList}><Cross className="stroke-white" /></Button>
    </Block>
)

const EmptyList = ({id, deleteList}: {id: number, deleteList: () => any}) => (
    <CardTemplate id={id} deleteList={deleteList}>
        <Link className="m-auto text-2xl flex gap-3" to={`/dish-list/${id}`}>
            Список пока пуст, выберите меню
            <Button className="dark-block w-8 h-8 flex lg:hidden" onClick={deleteList}><Cross className="stroke-white" /></Button>
        </Link>
    </CardTemplate>
)

export const DishListCard = ({dishList, deleteList}: {dishList: DishList, deleteList: () => any, order: number}) => {
    if (checkIsEmpty(dishList)) return <EmptyList id={dishList.id} deleteList={deleteList} />
    const {id } = dishList
    const {i, currentDish, currentMeal} = useChangeDishInterval(dishList, 1000)

    return (
        <CardTemplate id={id} deleteList={deleteList}>
            <Block className="md:hidden h-20 w-full dark-block relative">
                <Picture i={i} src={currentDish.picture} className="absolute left-1/2 -translate-x-1/2 -translate-y-12" />
            </Block>
            <motion.div className="flex gap-2 self-stretch lg:items-center justify-between p-8 lg:p-0 lg:justify-start">
                <Picture i={i} src={currentDish.picture} className="hidden md:flex" />       
                <Summary dishList={dishList} />
                <Button className="dark-block w-8 h-8 flex lg:hidden" onClick={deleteList}><Cross className="stroke-white" /></Button>
            </motion.div>
            <MenuList dishList={dishList} currentDish={currentDish} currentMeal={currentMeal} />
        </CardTemplate>
    )
}