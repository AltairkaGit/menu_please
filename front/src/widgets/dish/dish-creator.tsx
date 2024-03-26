import { Cooker } from "@entities/dish/ui/cooker"
import { DishViewerTemplate } from "@entities/dish/ui/dish-viewer-template"
import { dishService } from "@features/dish/service"
import { useAppSelector } from "@shared/hooks"
import { DishData, KindInput, MealCheckboxes, NameInput, PicturePicker, RatioInput, RecipeInput, SubmitButton, useDishForm } from "@shared/kit/dish-create-kit"
import { motion } from "framer-motion"
import { SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"


export const DishCreator = () => {
    const navigate = useNavigate()
    const {register, handleSubmit} = useDishForm()
    const cooker = useAppSelector(state => state.auth.username)
    const [createDish, {isLoading}] = dishService.useCreateDishMutation()
    const onSubmit: SubmitHandler<DishData> = async (data) => {
        try {
            await createDish(data).unwrap()
            return navigate("/studio", {replace: true})
        } catch(err) {
        }        
    }
    
    return <motion.form onSubmit={handleSubmit(onSubmit)} className="pt-6">
        <DishViewerTemplate 
            picture={<PicturePicker register={register} />}
            kind={<KindInput register={register} />}
            cooker={<Cooker name={cooker} />}
            name={<NameInput register={register} />}
            recipe={<RecipeInput register={register} />}
            ratio={<RatioInput register={register} />}
            meals={MealCheckboxes({register})}
            buttons={[<SubmitButton disabled={isLoading}  key="submitButton" />]}
        />
    </motion.form>
}