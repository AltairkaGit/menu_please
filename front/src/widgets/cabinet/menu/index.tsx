import { DishList } from "@entities/dish-list/api"
import { selectDishLists } from "@entities/dish-list/model/dishListSlice"
import { AmountedDish, Meal } from "@entities/dish/api"
import { Ratio } from "@entities/dish/ui/ratio"
import { calcMealCalories } from "@features/menu/calc-meal-calories"
import { calcMealNutrientsRatio } from "@features/menu/calc-meal-nutrients"
import { useGetQuery } from "@features/menu/service"
import { DishPortionControl } from "@features/menu/ui/dish-portion-control"
import { useAppSelector } from "@shared/hooks"
import { Block } from "@shared/ui/block"
import { Cooking } from "@static/icons/cooking"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { DishSummary } from "./dish-summary"
import { MealSummary } from "./meal-summary"
import { MealTabs } from "./meal-tabs"
import { MealDishes } from "./meal-dishes"
import { useDishSearchModal } from "@features/dish-search-modal/use-dish-search-modal"
import { DishSearchModal } from "@features/dish-search-modal/ui"

const UI = ({dishList, openDishSearch}: {dishList: DishList, openDishSearch: (id: number, meal: Meal) => any}) => {
    const [meal, setMeal] = useState<Meal>(Meal.breakfast)
    const [dish, setDish] = useState<AmountedDish>(dishList.breakfast[0])

    useEffect(() => {
        const d = dishList[meal].find(item => item.id == dish.id)
        d && setDish(d)
    }, [dishList])

    let calories = calcMealCalories(dishList[meal])
    let pfc = calcMealNutrientsRatio(dishList[meal])

    const setMealTab = (meal: Meal) => {
        setMeal(meal)
        setDish(dishList[meal][0])
    } 

    const openModal = () => openDishSearch(dishList.id, meal)

    return (
        <Block className="flex flex-col xl:flex-row gap-12 min-h-[48rem]">
            <motion.div className="flex-1 flex-grow-[7] flex flex-col justify-between">
                <motion.div className="flex flex-col items-center md:items-stretch md:flex-row gap-14">
                    {dish ? <AnimatePresence mode="wait">
                        <motion.img key={`${dish.id}-${meal}-picture`} src={dish.picture} className="w-80 h-80 lg:w-[27rem] lg:h-[27rem]" variants={{in: {opacity: 1, scale: 1.2, rotate: 0}, out: {opacity: 0, scale: 0.5, rotate: "60deg"}}} initial="out" animate="in" exit="out" transition={{duration: 0.5}}/>    
                        <motion.div key={`${dish.id}-${meal}-summary`} className="flex flex-col justify-between grow">
                            <DishSummary className="!hidden md:!flex" dish={dish} />
                            <DishPortionControl key={`${dish.id}-${meal}-control`} id={dishList.id} dish={dish} meal={meal} />
                        </motion.div>
                    </AnimatePresence> : null}
                </motion.div>
                <motion.div className="flex mt-8 flex-col gap-7">
                    <MealDishes dishes={dishList[meal]} dish={dish} meal={meal} openModal={openModal} setDish={setDish} />
                    <MealTabs meal={meal} setMeal={setMealTab} />
                </motion.div>
            </motion.div>
            <motion.div className="flex-1 flex-grow-[4] flex flex-col justify-between items-center">
                <motion.div className="self-stretch">
                    <Block className="flex light-block py-2 px-8 justify-between text-st items-center">
                        <motion.div>
                            Рецепт:
                        </motion.div>
                        <Cooking />
                    </Block>
                        {dish ? <AnimatePresence mode="wait">
                        <motion.div key={dish.id} className="my-8 px-8 text-2xl text-justify" variants={{in: {opacity: 1, y: 0}, out: {opacity: 0, y: "1rem"}}} initial="out" animate="in" exit="out" transition={{duration: 0.5}}>
                            {dish.recipe}
                        </motion.div>
                        </AnimatePresence> : null}
                </motion.div>
                <motion.div className="text-2xl w-full flex flex-col gap-8 items-center">
                    <AnimatePresence mode="wait">
                        {dish ? <AnimatePresence mode="wait">
                        <Ratio key={dish.id} row proteins={`${dish.proteins}`} fats={`${dish.fats}`} carbo={`${dish.carbohydrates}`} />
                        </AnimatePresence> : null}
                    </AnimatePresence>                                      
                    <MealSummary calories={calories} meal={meal} {...pfc} />
                </motion.div>
            </motion.div>
        </Block>
    )
}

export const DishListEditor = ({id} : {id: number}) => {
    const {data, isError} = useGetQuery(id || 0)
    const dishSearchModal = useDishSearchModal()
    if (isError) return <motion.div className="text-center text-4xl">Ой, что-то пошло не так</motion.div>
    const lists = useAppSelector(selectDishLists)
    if (!data) return null
    const dishList = lists.find(list => list.id == data.id)
    if (!dishList) return null

    return <>        
        <UI dishList={dishList} openDishSearch={dishSearchModal.open} />
        <DishSearchModal isOpen={dishSearchModal.isOpen} close={dishSearchModal.close} />
    </> 
}