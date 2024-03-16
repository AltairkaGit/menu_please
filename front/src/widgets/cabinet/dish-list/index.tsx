import { DishList } from "@entities/dish-list/api"
import { selectDishList, selectDishLists } from "@entities/dish-list/model/dishListSlice"
import { AmountedDish, Meal } from "@entities/dish/api"
import { Cooker } from "@entities/dish/ui/cooker"
import { DishDetailsButton } from "@entities/dish/ui/details-button"
import { Ratio } from "@entities/dish/ui/ratio"
import { DishTab } from "@entities/dish/ui/tab"
import { MealLabel } from "@entities/meal-label/active"
import { MealTab } from "@entities/meal-label/tab"
import { calcMealCalories } from "@features/dish-list/calc-meal-calories"
import { calcMealNutrientsRatio } from "@features/dish-list/calc-meal-nutrients"
import { useGetQuery } from "@features/dish-list/service"
import { AddDishTab } from "@features/dish-list/ui/add-dish-in-meal-button"
import { DishPortionControl } from "@features/dish-list/ui/dish-portion-control"
import { useAppSelector } from "@shared/hooks"
import { Block } from "@shared/ui/block"
import { Cooking } from "@static/icons/cooking"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { useSelector } from "react-redux"

const DishSummary = ({dish}: {dish: AmountedDish}) => (
    <motion.div className="flex flex-col gap-4" variants={{in: {opacity: 1, y: 0}, out: {opacity: 0, y: "1rem"}}} initial="out" animate="in" exit="out" transition={{duration: 0.5}}>
        <motion.div className="flex justify-between gap-24">
            <motion.div className="font-display text-5xl">{dish.kind}</motion.div>
            <DishDetailsButton id={dish.id} />
        </motion.div>
        <motion.div className="text-4xl font-medium uppercase">{dish.name}</motion.div>
        <Cooker name={dish.cooker.name} />
    </motion.div>
)

const meals = {
    [Meal.breakfast]: 'завтрак',
    [Meal.lunch]: 'обед',
    [Meal.dinner]: 'ужин',
}

const MealSummary = ({meal, calories, p, f, c} : {meal: Meal, calories: number, p: number, f: number, c: number}) => (
    <AnimatePresence mode="wait">
        <Block key={meal} className="light-block w-full px-12 py-6 flex flex-col justify-between min-h-64">
            <motion.div className="text-2xl" variants={{in: {opacity: 1, y: 0}, out: {opacity: 0, y: "1rem"}}} initial="out" animate="in" exit="out" transition={{duration: 0.5}}>
                Ваш {meals[meal]}:
            </motion.div>
            <motion.div className="text-2xl flex flex-col gap-4">
                <motion.div variants={{in: {opacity: 1, y: 0}, out: {opacity: 0, y: "1rem"}}} initial="out" animate="in" exit="out" transition={{duration: 0.5}}>
                    Калорийнсть: {calories} кал.
                </motion.div>
                <Ratio row proteins={`${p || 0}%`} fats={`${f || 0}%`} carbo={`${c || 0}%`} />
            </motion.div>
        </Block>
    </AnimatePresence>    
)

const UI = ({dishList}: {dishList: DishList}) => {
    const [meal, setMeal] = useState<Meal>(Meal.breakfast)
    const [dish, setDish] = useState<AmountedDish>(dishList.breakfast[0])

    const calories = calcMealCalories(dishList[meal])
    const pfc = calcMealNutrientsRatio(dishList[meal])

    const setMealTab = (meal: Meal) => {
        setMeal(meal)
        setDish(dishList[meal][0])
    } 

    return (
        <Block className="flex gap-12 min-h-[48rem]">
            <motion.div className="flex-1 flex-grow-[7] flex flex-col justify-between">
                <motion.div className="flex gap-14">
                    {dish ? <AnimatePresence mode="wait">
                        <motion.img key={`${dish.id}-${meal}-picture`} src={dish.picture} className="w-[27rem] h-[27rem]" variants={{in: {opacity: 1, scale: 1.2, rotate: 0}, out: {opacity: 0, scale: 0.5, rotate: "60deg"}}} initial="out" animate="in" exit="out" transition={{duration: 0.5}}/>    
                        <motion.div key={`${dish.id}-${meal}-summary`} className="flex flex-col justify-between grow">
                            <DishSummary dish={dish} />
                            <DishPortionControl key={`${dish.id}-${meal}-control`} id={dishList.id} dish={dish} meal={meal} />
                        </motion.div>
                    </AnimatePresence> : null}
                </motion.div>
                <motion.div className="flex flex-col gap-7">
                    <AnimatePresence mode="wait">
                        <motion.div key={meal} className="flex gap-4">
                            {dish && dishList[meal].map(item => <DishTab key={`${item.id}-${meal}`} dish={item} currentDish={dish} setDish={setDish} />)}
                            <AddDishTab id={dishList.id} meal={meal} />
                        </motion.div>    
                    </AnimatePresence>
                    <motion.div className="flex gap-12">
                        <MealTab setMeal={setMealTab} currentMeal={meal} meal={Meal.breakfast}>Завтрак</MealTab>
                        <MealTab setMeal={setMealTab} currentMeal={meal} meal={Meal.lunch}>Обед</MealTab>
                        <MealTab setMeal={setMealTab} currentMeal={meal} meal={Meal.dinner}>Ужин</MealTab>
                    </motion.div>
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
                        {dish ? <>
                        <Ratio key={dish.id} row proteins={`${dish.proteins}`} fats={`${dish.fats}`} carbo={`${dish.carbohydrates}`} />
                        </> : null}
                    </AnimatePresence>                                      
                    <MealSummary calories={calories} meal={meal} {...pfc} />
                </motion.div>
            </motion.div>
        </Block>
    )
}

export const DishListEditor = ({id} : {id: number}) => {
    const {data, isError} = useGetQuery(id || 0)
    if (isError) return <motion.div className="text-center text-4xl">Ой, что-то пошло не так</motion.div>
    const lists = useAppSelector(selectDishLists)
    if (!data) return null
    const dishList = lists.find(list => list.id == data.id)
    if (!dishList) return null

    return <UI dishList={dishList} />
}