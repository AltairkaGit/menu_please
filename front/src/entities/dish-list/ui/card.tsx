import { AnimatePresence, motion } from 'framer-motion'
import { DishList } from "@entities/dish-list/api"
import { Block } from '@shared/ui/block'
import { calcTotalCalories } from '@features/dish-list/calc-total-calories'
import { useMemo, useState } from 'react'
import { Meal } from '@entities/dish/api'
import { useInterval } from 'usehooks-ts'
import { Ratio } from '@entities/dish/ui/ratio'
import { Button } from '@shared/ui/button'
import { Cross } from '@static/icons/cross'

const transformInSequence = (dishList: DishList) => {
    return [
        ...dishList.breakfast.map(dish => ({meal: Meal.breakfast, dish})),
        ...dishList.lunch.map(dish => ({meal: Meal.lunch, dish})),
        ...dishList.dinner.map(dish => ({meal: Meal.dinner, dish})),
    ]
}

export const DishListCard = ({dishList, deleteList}: {dishList: DishList, deleteList: () => any}) => {
    const sequence = useMemo(() => transformInSequence(dishList), [dishList])
    const totalCalories = useMemo(() => calcTotalCalories(dishList), [dishList])
    
    const [meal, setMeal] = useState<Meal>(sequence[0].meal)
    const [i, setI] = useState<number>(0)
    useInterval(() => {
        setI(i => {
            const prev = i
            const next = i+1 == sequence.length ? 0 : i+1
            if (sequence[prev].meal != sequence[next].meal) setMeal(sequence[next].meal)
            return next
        })
    }, 4000)

    const content = sequence ? <>
        <motion.div className='flex gap-7'>
            <Block className='dark-block w-full h-8 md:w-8 md:h-full' />
            <AnimatePresence mode='wait'>
                <motion.img key={i} src={sequence[i].dish.picture} variants={{in: {opacity: 1, x: 0}, out: {opacity: 0, x: "-8%"}}} 
                    initial="out" animate="in" exit="out" layout transition={{duration: 1.25}} 
                    className="w-44 h-44 md:w-64 md:h-64 lg:w-80 lg:h-80"/>
            </AnimatePresence>
            <motion.div key={"summary"} className="p-3 flex flex-col justify-between w-full md:w-80 mb-8">
                <motion.div className="mt-3 text-3xl"> Ваше меню: </motion.div>
                <motion.div className="text-2xl">
                    <motion.div className="mb-3"> Калорийность: {totalCalories} </motion.div>
                    <Ratio proteins={sequence[i].dish.proteins.toString() + '%'} 
                        fats={sequence[i].dish.fats.toString() + '%'} 
                        carbo={sequence[i].dish.carbohydrates.toString() + '%'}
                    />
                </motion.div>

            </motion.div>
        </motion.div>
        <motion.div className="flex gap-3">
            <Button className="h-full dark-block" onClick={deleteList}><Cross /></Button>
        </motion.div>
    </> : 
    <motion.h2 className="m-auto">
        Список пока пуст, выберите меню
    </motion.h2>
    
    return (
        <Block className="w-full light-block mt-11 box-border min-h-80 flex justify-between">
            {content}
        </Block>
    )
}