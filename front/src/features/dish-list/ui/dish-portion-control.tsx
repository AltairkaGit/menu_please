import { AmountedDish, Meal } from "@entities/dish/api"
import { useChangeAmountMutation, useDeleteDishMutation } from "../service"
import { DishPortionControl as UI } from "@entities/dish-list/ui/dish-portion-control"
import { useState } from "react"
import { useDebounceCallback } from "usehooks-ts"

export const DishPortionControl = ({id, meal, dish}: {id: number, meal: Meal, dish: AmountedDish}) => {
    const [amount, setAmount] = useState<number>(dish.amount)
    const [changeAmount, {isLoading: changePending}] = useChangeAmountMutation()
    const [deleteDish, {isLoading: delPending}] = useDeleteDishMutation()
    const pending = changePending || delPending
    const debouncedChange = useDebounceCallback(async () => {
        if (!pending) await changeAmount({id, body: {amount, meal, dishId: dish.id}})
    }, 1500)

    const increase = async () => {
        try {
            setAmount(prev => prev + 1)
            debouncedChange()
        } catch (err) {

        }
    }
    const decrease = async () => {
        try {
            setAmount(prev => prev - 1)
            debouncedChange()
        } catch (err) {

        }
    }
    const remove = async () => {
        try {
            deleteDish({id, body: {meal, dishId: dish.id}}).unwrap()
        } catch (err) {
        }
    }



    return <UI disabled={pending} amount={amount} increase={increase} decrease={decrease} remove={remove} />
    
}