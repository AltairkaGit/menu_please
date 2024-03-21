import { ReactNode } from "react"
import { Link } from "react-router-dom"

export const DishPageLink = ({id, children}: {id: number, children: ReactNode}) => (
    <Link to={`/dish/${id}`}>{children}</Link>
)