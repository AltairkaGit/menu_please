import { Meal } from "@entities/dish/api"
import { useNavigate } from "react-router-dom"

export const NavigateMeal = (id: number) => {
    const navigate = useNavigate()

    return (meal: Meal) => navigate(`/dish-list/${id}/${meal}`)
}