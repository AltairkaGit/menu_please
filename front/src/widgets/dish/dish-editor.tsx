import { Meal } from "@entities/dish/api"
import { Cooker } from "@entities/dish/ui/cooker"
import { DishViewerTemplate } from "@entities/dish/ui/dish-viewer-template"
import { dishService, useGetDishByIdQuery } from "@features/dish/service"
import { useAppSelector } from "@shared/hooks"
import { DeleteButton, DishData, KindInput, MealCheckboxes, NameInput, PicturePicker, RatioInput, RecipeInput, UpdateButton, useDishForm } from "@shared/kit/dish-create-kit"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { SubmitHandler } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"


export const DishEditor = () => {
    const params = useParams()
    const id = Number(params["dishId"] ?? 0)
    const {data: dish} = useGetDishByIdQuery(id)
    const {register, handleSubmit, rest} = useDishForm(dish)
    const navigate = useNavigate()    
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
    const onDelete = async () => {
        try {
            await deleteDish(id).unwrap()
            return navigate("/studio", {replace: true})
        } catch(err) {
        }        
    }
    const [meals, setMeals] = useState<{breakfast: boolean, lunch: boolean, dinner: boolean}>({
        breakfast: false,
        lunch: false,
        dinner: false,
    })
    useEffect(() => {
        if (dish) {
            const meals = {
                breakfast: !dish?.categories.find(meal => meal == Meal.breakfast),
                lunch: !dish?.categories.find(meal => meal == Meal.lunch),
                dinner: !dish?.categories.find(meal => meal == Meal.dinner),
            }
            setMeals(meals)
            rest.setValue("kind", dish.kind)
            rest.setValue("name", dish.name)
            rest.setValue("recipe", dish.recipe)
            rest.setValue("p", dish.proteins)
            rest.setValue("f", dish.fats)
            rest.setValue("c", dish.carbohydrates)
            rest.setValue("file", dish.picture)
            rest.setValue("meal_breakfast", meals.breakfast)
            rest.setValue("meal_lunch", meals.lunch)
            rest.setValue("meal_dinner", meals.dinner)
            const fetchAndSetFile = async () => {
                const res = await fetch(dish.picture, {mode: 'no-cors'})
                const blob = await res.blob()
                const mimeType = 'image/png'
                const file = new File([blob], `file-${Math.random() * 10000000}-${Math.random() * 100000}`, { type: mimeType });
                picture.current = file
            }
            fetchAndSetFile()
        }
        
    }, [dish])
    const onInvalid = (errors: any) => console.error(errors)

    return <motion.form onSubmit={handleSubmit(onSubmit, onInvalid)} id="update-dish-form" className="pt-6">
        <DishViewerTemplate
            picture={<PicturePicker initial={dish?.picture ?? null} pictureRef={picture} register={register} />}
            kind={<KindInput register={register} />}
            cooker={<Cooker name={cooker} />}
            name={<NameInput register={register} />}
            recipe={<RecipeInput register={register} />}
            ratio={<RatioInput register={register} />}
            meals={MealCheckboxes({register, init: meals})}
            buttons={dish ? [
                <DeleteButton remove={onDelete} disabled={isLoading}  key="deleteButton" />,
                <UpdateButton disabled={isLoading} key="updateButton" />
            ] : []}
        />
    </motion.form>
}