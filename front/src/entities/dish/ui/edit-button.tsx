import { DishEditLink } from "@features/dish/dish-edit-link"
import { Block } from "@shared/kit/block"

export const DishEditButton = ({dishId}: {dishId: number}) => (
    <DishEditLink dishId={dishId}>
        <Block className="flex grow dark-block px-[0.86rem] py-4 items-center justify-center text-base">
            Редактировать
        </Block>
    </DishEditLink>
)