import { motion } from 'framer-motion'
import { DishList } from "@entities/dish-list/api"
import { Block } from '@shared/ui/block'
import { calcTotalCalories } from '@features/dish-list/calc-total-calories'

export const DishListCard = ({dishList}: {dishList: DishList}) => {
    const totalCalories = calcTotalCalories(dishList)

    return (
        <Block className="w-full light-block mt-11 p-3 box-border min-h-80">
            Всего калорий: {totalCalories}
        </Block>
    )
}