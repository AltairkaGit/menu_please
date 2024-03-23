import { ReactNode } from "react"
import { Link } from "react-router-dom"

export const DishEditLink = ({dishId, children}: {dishId: number, children: ReactNode}) => (
    <Link to={`/dish-edit/${dishId}`}>{children}</Link>
)