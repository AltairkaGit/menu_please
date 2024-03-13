import { Button } from "@shared/ui/button"
import { Cross } from "@static/icons/cross"
import { twMerge } from "tailwind-merge"


export const DeleteListButton = ({deleteList, className}: {
    deleteList: () => any, className?: string
}) =><Button className={twMerge("dark-block h-auto self-stretch shrink-0", className)} onClick={deleteList}><Cross /></Button>