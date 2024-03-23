import { Meal } from "@entities/dish/api"
import { Cooker } from "@entities/dish/ui/cooker"
import { DishViewerTemplate } from "@entities/dish/ui/dish-viewer-template"
import { Ratio } from "@entities/dish/ui/ratio"
import { MealLabel } from "@shared/meal-label/common"
import { motion } from "framer-motion"

const mealsMap = {
    [Meal.breakfast]: 'Завтрак',
    [Meal.lunch]: 'Обед',
    [Meal.dinner]: 'Ужин'
}

export const DishViewer = ({kind, name, recipe, cooker, picture, meals, p, f, c} : {
    kind: string, 
    name: string, 
    recipe: string, 
    cooker: string, 
    picture: string, 
    meals: Meal[], 
    p: number, 
    f: number, 
    c: number
}) => (
    <DishViewerTemplate 
        picture={<motion.img src={picture} className="w-[37.5rem] h-[37.5rem] scale-110 -translate-y-8" />}
        kind={<motion.h2 className="font-display">{kind}</motion.h2>}
        cooker={<Cooker name={cooker} />}
        name={ <motion.h2 className="font-serif">{name}</motion.h2>}
        recipe={<motion.article className="text-pretty text-3xl font-medium">{recipe}</motion.article>}
        ratio={<motion.div className="text-3xl"><Ratio row proteins={`${p}`} fats={`${f}`} carbo={`${c}`} /></motion.div>}
        meals={meals.map(meal => <MealLabel>{mealsMap[meal]}</MealLabel>)}
    />
)