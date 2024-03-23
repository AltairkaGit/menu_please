import { DishCreateLink } from "@features/dish/create-link"
import { DishCardTab } from "./card"
import { PlusLg } from "@static/icons/plus-lg"
import { Block } from "@shared/kit/block"

export const CreateDishTab = () => (
    <DishCreateLink>
        <DishCardTab>
            <Block whileHover={{scale: 0.8}} className="w-full h-full flex flex-col justify-center items-center">
                <PlusLg />
                <Block className="translate-y-8 text-2xl font-medium">Добавить</Block>
            </Block>            
        </DishCardTab>
    </DishCreateLink>
)