import { DishList } from "@entities/dish-list/api"
import { EmptyList } from "./empty-list"
import { useChangeDishInterval } from "./use-change-dish-interval"
import { Picture } from "./picture"
import { Summary } from "./summary"
import { MenuListFull } from "../menu-list/menu-list-full"
import { ColLayout, RowLayout } from "./layout"
import { ReactNode } from "react"
import { MenuListCompact } from "../menu-list/menu-list-compact"

interface CardProps {
    id: number
    Picture: ReactNode
    Summary: ReactNode
    MenuLists: ReactNode
    DeleteButton: ReactNode
}

const CardXL = ({id, Picture, Summary, MenuLists, DeleteButton}: CardProps) => (
    <RowLayout id={id} className="hidden xl:flex"
        Picture={Picture}
        Summary={Summary}
        MenuLists={MenuLists}
        DeleteButton={DeleteButton}
    />
)

const CardLG = ({id, Picture, Summary, MenuLists, DeleteButton}: CardProps) => (
    <RowLayout id={id} className="hidden lg:flex xl:hidden"
        Picture={Picture}
        Summary={Summary}
        MenuLists={MenuLists}
        DeleteButton={DeleteButton}
    />
)

const CardMD = ({id, Picture, Summary, MenuLists, DeleteButton}: CardProps) => (
    <ColLayout id={id} className="hidden md:flex lg:hidden"
        Picture={Picture}
        Summary={Summary}
        MenuLists={MenuLists}
        DeleteButton={DeleteButton}
    />
)

const checkIsEmpty = (dishList: DishList) => dishList.breakfast.length == 0 && dishList.lunch.length == 0 && dishList.dinner.length == 0

export const DishListCard = ({dishList, DeleteListButton}: { dishList: DishList, DeleteListButton: ReactNode }) => {
    if (checkIsEmpty(dishList)) return <EmptyList id={dishList.id} DeleteButton={DeleteListButton} />
    
    const {id, breakfast, lunch, dinner} = dishList
    const {i, currentDish, currentMeal} = useChangeDishInterval(dishList, 1000)
    const picture = <Picture i={i} src={currentDish.picture} />
    const summary = <Summary dishList={dishList} />
    const menuListFull = <MenuListFull id={id} currentDish={currentDish} currentMeal={currentMeal} breakfast={breakfast} lunch={lunch} dinner={dinner} />
    const menuListCompact = <MenuListCompact id={id} currentDish={currentDish} currentMeal={currentMeal} breakfast={breakfast} lunch={lunch} dinner={dinner} />

    return <>
        <CardXL id={id} DeleteButton={DeleteListButton} Picture={picture} Summary={summary} MenuLists={menuListFull} />
        {/* <CardLG id={id} DeleteButton={DeleteListButton} Picture={picture} Summary={summary} MenuLists={menuListCompact} /> */}
        {/* <CardMD id={id} DeleteButton={DeleteListButton} Picture={picture} Summary={summary} MenuLists={menuListFull} /> */}
    </>
}