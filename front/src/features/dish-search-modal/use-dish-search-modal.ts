import { Meal } from "@entities/dish/api"
import { useState } from "react"

export const useDishSearchModal = () => {
    const [isOpen, setOpen] = useState<boolean>(false)
    const [meal, setMeal] = useState<Meal>(Meal.breakfast)
    const [id, setId] = useState<number>(0) 
    
    const open = (id: number, meal: Meal) => {
        setOpen(true)
        setMeal(meal)
        setId(id)
    }

    const close = () => {
        setOpen(false)
    }

    return {open, close, isOpen, meal, id}
}