import { Cooker } from "@entities/dish/ui/cooker"
import { DishViewerTemplate } from "@entities/dish/ui/dish-viewer-template"
import { dishService, useGetDishByIdQuery } from "@features/dish/service"
import { useAppSelector } from "@shared/hooks"
import { DishData, KindInput, MealCheckboxes, NameInput, PicturePicker, RatioInput, RecipeInput, SubmitButton, useDishForm } from "@shared/kit/dish-create-kit"
import { motion } from "framer-motion"
import { useRef } from "react"
import { SubmitHandler } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"


export const DishEditor = () => {
    const params = useParams()
    const id = Number(params["dishId"] ?? 0)
    const {data: dish} = useGetDishByIdQuery(id)
    const navigate = useNavigate()
    const {register, handleSubmit} = useDishForm(dish)
    const cooker = useAppSelector(state => state.auth.username)
    const [updateDish, updating] = dishService.useUpdateDishMutation()
    const [deleteDish, deleting] = dishService.useDeleteDishMutation()
    const isLoading = updating.isLoading || deleting.isLoading
    const picture = useRef<any>(null)
    const onSubmit: SubmitHandler<DishData> = async (data) => {
        try {
            await updateDish({id, ...data, picture}).unwrap()
            return navigate("/studio", {replace: true})
        } catch(err) {
        }        
    }
    
    return <motion.form onSubmit={handleSubmit(onSubmit)} className="pt-6">
        <DishViewerTemplate 
            picture={<PicturePicker pictureRef={picture} register={register} />}
            kind={<KindInput register={register} />}
            cooker={<Cooker name={cooker} />}
            name={<NameInput register={register} />}
            recipe={<RecipeInput register={register} />}
            ratio={<RatioInput register={register} />}
            meals={MealCheckboxes({register})}
            buttons={[<SubmitButton disabled={isLoading}  key="submitButton">Обновить</SubmitButton>]}
        />
    </motion.form>
}