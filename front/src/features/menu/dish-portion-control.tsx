import { AmountedDish, Meal } from "@entities/dish/api"
import { useChangeAmountMutation, useDeleteDishMutation } from "./service"
import { DishPortionControl as UI } from "@entities/menu/ui/dish-portion-control"
import { useDebouncedCallback } from "use-debounce"
import { useAppDispatch } from "@shared/hooks"
import { decreaseDishAmount, increaseDishAmount } from "@entities/menu/model/dishListSlice"

export const DishPortionControl = ({id, meal, dish}: {id: number, meal: Meal, dish: AmountedDish}) => {
    const dispatch = useAppDispatch()
    const [changeAmount, {isLoading: changePending}] = useChangeAmountMutation()
    const [deleteDish, {isLoading: delPending}] = useDeleteDishMutation()
    const pending = changePending || delPending
    const debouncedChange = useDebouncedCallback((amount) => {
        changeAmount({id, body: {amount, meal, dishId: dish.id}}).unwrap()
    }, 500)

    const increase = async () => {
        try {
            dispatch(increaseDishAmount({id, meal, dishId: dish.id}))
            debouncedChange(dish.amount + 1)
        } catch (err) {

        }
    }
    const decrease = async () => {
        try {
            dispatch(decreaseDishAmount({id, meal, dishId: dish.id}))
            debouncedChange(dish.amount - 1)
        } catch (err) {

        }
    }
    const remove = async () => {
        try {
            deleteDish({id, body: {meal, dishId: dish.id}}).unwrap()
        } catch (err) {
        }
    }



    return <UI disabled={pending} amount={dish.amount} increase={increase} decrease={decrease} remove={remove} />
    
}