import { DishPageLink } from "@features/dish/dish-page-link"
import { Block } from "@shared/kit/block"
import { ArrowFront } from "@static/icons/arrow-front"
import { twMerge } from "tailwind-merge"

export const DishDetailsButton = ({id, className}: {id: number, className?: string}) => (
    <DishPageLink id={id}>
        <Block className={twMerge("flex flex-col light-block px-2 py-4 items-center text-xs gap-1 font-medium", className)}>
            Подробно
            <ArrowFront />
        </Block>
    </DishPageLink>
)