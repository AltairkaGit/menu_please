import { Cooker } from "@entities/dish/ui/cooker"
import { DishViewerTemplate } from "@entities/dish/ui/dish-viewer-template"
import { dishService } from "@features/dish/service"
import { useAppSelector } from "@shared/hooks"
import { CreateButton, DishData, KindInput, MealCheckboxes, NameInput, PicturePicker, RatioInput, RecipeInput, useDishForm } from "@shared/kit/dish-create-kit"
import { motion } from "framer-motion"
import { useRef } from "react"
import { SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"


export const DishCreator = () => {
    const navigate = useNavigate()
    const {register, handleSubmit} = useDishForm()
    const cooker = useAppSelector(state => state.auth.username)
    const [createDish, {isLoading}] = dishService.useCreateDishMutation()
    const picture = useRef<any>(null)
    const onSubmit: SubmitHandler<DishData> = async (data) => {
        try {
            await createDish({...data, picture}).unwrap()
            return navigate("/studio", {replace: true})
        } catch(err) {
        }        
    }
    
    return <motion.form onSubmit={handleSubmit(onSubmit)} className="pt-6">
        <DishViewerTemplate 
            picture={<PicturePicker initial={null} pictureRef={picture} register={register} />}
            kind={<KindInput register={register} />}
            cooker={<Cooker name={cooker} />}
            name={<NameInput register={register} />}
            recipe={<RecipeInput register={register} />}
            ratio={<RatioInput register={register} />}
            meals={MealCheckboxes({register, init: {}})}
            buttons={[<CreateButton disabled={isLoading}  key="createButton"/>]}
        />
    </motion.form>
}