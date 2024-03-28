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
        picture={<motion.img src={picture} className="w-full h-full"/>}
        kind={<motion.div className="font-display">{kind}</motion.div>}
        cooker={<Cooker name={cooker} />}
        name={ <motion.div className="font-serif">{name}</motion.div>}
        recipe={<motion.article>{recipe}</motion.article>}
        ratio={<motion.div><Ratio row proteins={`${p}`} fats={`${f}`} carbo={`${c}`} /></motion.div>}
        meals={meals.map(meal => <MealLabel>{mealsMap[meal]}</MealLabel>)}
    />
)