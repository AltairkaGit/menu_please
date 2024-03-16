import { AmountedDish, Meal } from "@entities/dish/api"
import { useChangeAmountMutation, useDeleteDishMutation } from "../service"
import { DishPortionControl as UI } from "@entities/dish-list/ui/dish-portion-control"
import { useState } from "react"
import { useDebounceCallback } from "usehooks-ts"
import { useDebouncedCallback } from "use-debounce"

export const DishPortionControl = ({id, meal, dish}: {id: number, meal: Meal, dish: AmountedDish}) => {
    const [amount, setAmount] = useState<number>(dish.amount)
    const [changeAmount, {isLoading: changePending}] = useChangeAmountMutation()
    const [deleteDish, {isLoading: delPending}] = useDeleteDishMutation()
    const pending = changePending || delPending
    const debouncedChange = useDebouncedCallback((amount) => {
        changeAmount({id, body: {amount, meal, dishId: dish.id}}).unwrap()
    }, 2000)

    const increase = async () => {
        try {
            setAmount(prev => {
                const next = prev + 1
                debouncedChange.cancel()
                debouncedChange(next)
                return next
            })
        } catch (err) {

        }
    }
    const decrease = async () => {
        try {
            setAmount(prev => {
                const next = prev - 1
                debouncedChange.cancel()
                debouncedChange(next)
                return next
            })
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