import { UseFormRegister } from "react-hook-form"
import { motion } from "framer-motion"
import { Meal } from "@entities/dish/api"
import { useForm } from "react-hook-form"
import { Ratio } from "@entities/dish/ui/ratio"

interface DishData {
    kind: string, 
    name: string, 
    recipe: string,
    picture: string, 
    meals: Meal[], 
    p: number, 
    f: number, 
    c: number
}

export const useDishForm = () => {
    const { register, handleSubmit } = useForm<DishData>()
    return { register, handleSubmit }
}

export const NameInput = ({register}: {register: UseFormRegister<any>}) => (
    <motion.input type="text" placeholder="Название:" {...register("name", {required: true})} />
)

export const KindInput = ({register}: {register: UseFormRegister<any>}) => (
    <motion.input type="text" placeholder="Категория:" {...register("kind", {required: true})} />
)

export const RecipeInput = ({register}: {register: UseFormRegister<any>}) => (
    <motion.textarea placeholder="Рецепт:" {...register("recipe", {required: true})} />
)

export const RatioInput = ({register}: {register: UseFormRegister<any>}) => (
    <Ratio />
)


const PicturePicker = ({register}: {register: UseFormRegister<any>}) => {

    return <motion.div>

        <motion.input type="file" accept="image/png" />
    </motion.div>
}