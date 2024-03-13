import { ReactNode } from "react"
import { Link } from "react-router-dom"
import { Block } from "@shared/ui/block"
import { twMerge } from "tailwind-merge"

export const EmptyList = ({id, DeleteButton}: {id: number, DeleteButton: ReactNode}) => (
    <Block className={twMerge("flex w-full light-block mt-11 box-border min-h-80 justify-between items-center gap-5")}>
        <Link to={`./dish-list/${id}`}>
            Меню пусто, нажмите, чтобы начать
        </Link>
        {DeleteButton}
    </Block>
)