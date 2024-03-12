import { AnimatePresence, motion } from 'framer-motion'
import { DishList } from "@entities/dish-list/api"
import { Block } from '@shared/ui/block'
import { calcTotalCalories } from '@features/dish-list/calc-total-calories'
import { ReactNode, useMemo, useState } from 'react'
import { Meal } from '@entities/dish/api'
import { useInterval } from 'usehooks-ts'
import { Ratio } from '@entities/dish/ui/ratio'
import { Button } from '@shared/ui/button'
import { Cross } from '@static/icons/cross'
import { MealList } from './meal-list'
import { calcTotalNutrientsRatio } from '@features/dish-list/calc-total-nutrients'
import { MenuList } from './menu-list'

const transformInSequence = (dishList: DishList) => {
    return [
        ...(dishList.breakfast.length == 0 ? [] : dishList.breakfast.map(dish => ({meal: Meal.breakfast, dish}))),
        ...(dishList.lunch.length == 0 ? [] : dishList.lunch.map(dish => ({meal: Meal.lunch, dish}))),
        ...(dishList.dinner.length == 0 ? [] : dishList.dinner.map(dish => ({meal: Meal.dinner, dish}))),
    ]
}

const CardTemplate = ({children, deleteList} : {children: ReactNode, deleteList: () => any}) => (
    <Block className="w-full light-block mt-11 box-border min-h-80 flex justify-between items-center gap-5">
        <Block className='dark-block w-auto h-8 md:w-8 md:h-auto shrink-0 self-stretch' />
        {children}
        <Button className="dark-block h-auto self-stretch" onClick={deleteList}><Cross /></Button>
    </Block>
)

export const DishListCardUI = ({dishList, deleteList, order}: {dishList: DishList, deleteList: () => any, order: number}) => {
    const sequence = useMemo(() => transformInSequence(dishList), [dishList])

    if (sequence.length == 0) return <CardTemplate deleteList={deleteList}>
        <motion.h2 className="m-auto">
            Список пока пуст, выберите меню
        </motion.h2>
    </CardTemplate>

    const {id, breakfast, lunch, dinner} = dishList
    const totalCalories = useMemo(() => calcTotalCalories(dishList), [dishList])
    const {p, f, c} = useMemo(() => calcTotalNutrientsRatio({breakfast, lunch, dinner}), [dishList])

    const [meal, setMeal] = useState<Meal>(sequence[0].meal)
    const [i, setI] = useState<number>(0)
    useInterval(() => {
        setI(i => {
            const prev = i
            const next = i+1 == sequence.length ? 0 : i+1
            if (sequence[prev].meal != sequence[next].meal) setMeal(sequence[next].meal)
            return next
        })
    }, 1000)
    
    return <CardTemplate deleteList={deleteList}>
        <motion.div className="w-44 md:w-64 lg:w-80">
            <AnimatePresence mode="popLayout">
                <motion.img key={i} src={sequence[i].dish.picture} variants={{in: {opacity: 1, scale: 1}, out: {opacity: 0, scale: 0.8}}} 
                    initial="out" animate="in" exit="out" layout transition={{duration: .25}} 
                    className="w-full aspect-square"/>
            </AnimatePresence>
        </motion.div>        
        <motion.div key={"summary"} className="p-3 flex flex-col justify-between w-full md:w-72 mb-8 self-stretch">
            <motion.div className="mt-3 text-3xl">Ваше меню:</motion.div>
            <motion.div className="text-2xl">
                <motion.div className="mb-3"> Всего: {totalCalories} кал.</motion.div>
                <Ratio proteins={p + '%'}  fats={f + '%'} carbo={c + '%'} />
            </motion.div>
        </motion.div>
        <MenuList id={id} sequence={sequence} i={i} breakfast={breakfast} lunch={lunch} dinner={dinner} />
    </CardTemplate>
}