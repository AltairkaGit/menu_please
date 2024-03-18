import { Meal } from "@entities/dish/api"
import { useState } from "react"

export const useDishSearchModal = () => {
    const [isOpen, setOpen] = useState<boolean>(false)
    const [meal, setMeal] = useState<Meal>()
    const [id, setId] = useState<number>() 
    
    const open = (id: number, meal: Meal) => {
        setOpen(true)
        setMeal(meal)
        setId(id)
    }

    const close = (id: number, meal: Meal) => {
        setOpen(false)
        setMeal(undefined)
        setId(id)
    }

    return {open, close, isOpen, meal, id}
}