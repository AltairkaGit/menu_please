import { DishPageLink } from "@features/dish/dish-page-link"
import { Block } from "@shared/kit/block"
import { ArrowFront } from "@static/icons/arrow-front"
import { twMerge } from "tailwind-merge"


export const DishDetailsSqaredButton = ({id, className}: {id: number, className?: string}) => (
    <DishPageLink id={id}>
        <Block className={twMerge("flex light-block items-center justify-center w-[3.625rem] h-[3.625rem]", className)}>
            <ArrowFront />
        </Block>
    </DishPageLink>
)