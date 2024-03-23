import { DishViewerTemplate } from "@entities/dish/ui/dish-viewer-template"
import { useDishForm } from "@shared/kit/dish-create-kit"
import { motion } from "framer-motion"


export const DishCreator = () => {
    const form = useDishForm()


    
    return <DishViewerTemplate 
        picture={<motion.img src={picture} className="w-[37.5rem] h-[37.5rem] scale-110 -translate-y-8" />}
        kind={<motion.h2 className="font-display">{kind}</motion.h2>}
        cooker={<Cooker name={cooker} />}
        name={ <motion.h2 className="font-serif">{name}</motion.h2>}
        recipe={<motion.article className="text-pretty text-3xl font-medium">{recipe}</motion.article>}
        ratio={<motion.div className="text-3xl"><Ratio row proteins={`${p}`} fats={`${f}`} carbo={`${c}`} /></motion.div>}
        meals={meals.map(meal => <MealLabel>{mealsMap[meal]}</MealLabel>)}
    />
}