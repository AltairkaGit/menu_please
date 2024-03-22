import { selectDishList, selectDishListMealDish, selectDishLists } from "@entities/menu/model/dishListSlice"
import { AmountedDish, Meal } from "@entities/dish/api"
import { Ratio } from "@entities/dish/ui/ratio"
import { calcMealCalories } from "@features/menu/calc-meal-calories"
import { calcMealNutrientsRatio } from "@features/menu/calc-meal-nutrients"
import { useGetQuery } from "@features/menu/service"
import { DishPortionControl } from "@widgests/cabinet/menu/dish-portion-control"
import { useAppSelector } from "@shared/hooks"
import { Block } from "@shared/kit/block"
import { Cooking } from "@static/icons/cooking"
import { AnimatePresence, motion, useIsPresent } from "framer-motion"
import { useEffect, useState } from "react"
import { DishSummary } from "./dish-summary"
import { MealSummary } from "./meal-summary"
import { MealTabs } from "./meal-tabs"
import { MealDishes } from "./meal-dishes"
import { useDishSearchModal } from "@features/dish-search-modal/use-dish-search-modal"
import { DishSearchModal } from "./dish-search-modal"
import { useSearchParams } from "react-router-dom"
import { RollingDishPicture } from "@entities/dish/ui/rolling-picture"

const variants = {
    init: {opacity: 0, y: "1rem"}, 
    in: {opacity: 1, y: 0}, 
    out: {opacity: 0, y: "1rem"}
}

const UI = ({id, meal, dish, dishes, pfc, calories, openDishSearch, setMeal, setDishId}: {
    id: number
    dish: AmountedDish | undefined,
    meal: Meal
    dishes: AmountedDish[], 
    pfc: {p: number, f: number, c: number},
    calories: number,
    openDishSearch: () => any,
    setMeal: (meal: Meal) => any,
    setDishId: (dish: number) => any
}) => (
    <Block className="flex flex-col xl:flex-row gap-12 min-h-[48rem]">
        <motion.div  className="flex-1 flex-grow-[7] flex flex-col justify-between">
            <motion.div className="flex flex-col items-center md:items-stretch md:flex-row gap-14">
                <AnimatePresence mode="wait">
                {dish ? <RollingDishPicture key={`${dish.id}-${meal}-picture`} dish={dish} /> : null }
                {dish ?
                    <motion.div key={`${dish.id}-${meal}-summary`} initial="init" animate="in" exit="out" className="flex flex-col justify-between grow">
                        <DishSummary className="!hidden md:!flex" dish={dish} />
                        <DishPortionControl id={id} dish={dish} meal={meal} />
                    </motion.div>               
                 : null}
                </AnimatePresence>
            </motion.div>
            <motion.div className="flex flex-col gap-7">
                <AnimatePresence mode="wait">
                    <MealDishes key={meal} dishes={dishes} dish={dish} meal={meal} openModal={openDishSearch} setDishId={setDishId} />
                </AnimatePresence>
                <MealTabs meal={meal} setMeal={setMeal} />
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
                <AnimatePresence mode="wait">
                {dish ? 
                    <motion.div key={`${dish.id}-${meal}-recipe`} className="my-8 px-8 text-2xl text-justify" variants={variants} initial="init" animate="in" exit="out" transition={{duration: 0.5}}>
                        {dish.recipe}
                    </motion.div>   
                 : null}
                 </AnimatePresence>             
            </motion.div>
            <motion.div className="text-2xl w-full flex flex-col gap-8 items-center">
                <AnimatePresence mode="wait">
                {dish ? 
                    <motion.div key={`${dish.id}-${meal}-pfc`} variants={variants} initial="init" animate="in" exit="out" transition={{duration: 0.5}}>
                        <Ratio row proteins={`${dish.proteins}`} fats={`${dish.fats}`} carbo={`${dish.carbohydrates}`} />
                    </motion.div>
                 : null}          
                 </AnimatePresence>                          
                <MealSummary calories={calories} meal={meal} {...pfc} />
            </motion.div>
        </motion.div>
    </Block>
)

export const DishListEditor = ({id} : {id: number}) => {
    const dishSearchModal = useDishSearchModal()

    const [searchParams, setSearchParams] = useSearchParams()
    const currentMeal = searchParams.get('meal') as Meal ?? Meal.breakfast
    const [meal, setMeal] = useState<Meal>(currentMeal)

    const {isError} = useGetQuery(id || 0)    
    const dishList = useAppSelector(selectDishList(id))
    const dishes = dishList && dishList[meal]

    const currentDishId = dishes ? dishes[0]?.id : undefined
    const [dishId, setDishId] = useState<number | undefined>(currentDishId)
    const dish = useAppSelector(selectDishListMealDish(id, meal, dishId))

    useEffect(() => {
        if (!dish) {
            if (currentDishId)
                setDishId(currentDishId)
            else if (dishes) {
                let possibleOption = undefined
                for (let dish of dishes) {
                    if (dish) {
                        possibleOption = dish.id
                        break
                    }
                }
                setDishId(possibleOption)
            }
        }
    }, [currentDishId, meal, dish])

    const setMealTab = (meal: Meal) => {
        setMeal(meal)
        setSearchParams({"meal": meal})
    }

    if (isError) return <motion.div className="text-center text-4xl">Ой, что-то пошло не так</motion.div>
    if (!dishes) return null    

    return <>
            <UI id={id} meal={meal} dish={dish} dishes={dishes} 
                pfc={calcMealNutrientsRatio(dishes)} 
                calories={calcMealCalories(dishes)}
                openDishSearch={() => dishSearchModal.open(id, meal)}
                setMeal={setMealTab}
                setDishId={setDishId}
            />
        <DishSearchModal meal={dishSearchModal.meal} listId={dishSearchModal.id} isOpen={dishSearchModal.isOpen} close={dishSearchModal.close} />
    </>
}