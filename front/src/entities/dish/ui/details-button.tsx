import { Block } from "@shared/ui/block";
import { ArrowFront } from "@static/icons/arrow-front";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export const DishDetailsButton = ({id, className}: {id: number, className?: string}) => (
    <Link to={`/dish/${id}`}>
        <Block className={twMerge("flex flex-col light-block px-2 py-4 items-center text-xs gap-1 font-medium", className)}>
            Подробно
            <ArrowFront />
        </Block>
    </Link>
)