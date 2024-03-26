import { Cooker } from "@entities/dish/ui/cooker"
import { DishViewerTemplate } from "@entities/dish/ui/dish-viewer-template"
import { useAppSelector } from "@shared/hooks"
import { KindInput, MealCheckboxes, NameInput, PicturePicker, RatioInput, RecipeInput, useDishForm } from "@shared/kit/dish-create-kit"
import { motion } from "framer-motion"


export const DishCreator = () => {
    const {register, handleSubmit} = useDishForm()
    const cooker = useAppSelector(state => state.auth.username)

    
    return <motion.div className="pt-6">
        <DishViewerTemplate 
            picture={<PicturePicker register={register} />}
            kind={<KindInput register={register} />}
            cooker={<Cooker name={cooker} />}
            name={<NameInput register={register} />}
            recipe={<RecipeInput register={register} />}
            ratio={<RatioInput register={register} />}
            meals={MealCheckboxes({register})}
            buttons={[]}
        />
    </motion.div>
}