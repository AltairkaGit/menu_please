import { ReactNode } from "react"
import { Link } from "react-router-dom"

export const DishCreateLink = ({children}: {children: ReactNode}) => (
    <Link to={`/dish-create`}>{children}</Link>
)