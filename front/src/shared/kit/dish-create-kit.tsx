import { UseFormRegister } from "react-hook-form"
import { AnimatePresence, motion } from "framer-motion"
import { Meal } from "@entities/dish/api"
import { useForm } from "react-hook-form"
import { Ratio } from "@entities/dish/ui/ratio"
import { PlusLg } from "@static/icons/plus-lg"
import { Cross } from "@static/icons/cross"
import { useState } from "react"
import clsx from "clsx"

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
    <motion.input className="box-border rounded-lg p-2 light-block text-3xl font-serif font-medium placeholder:text-[#3a3a3a]" type="text" placeholder="Название:" {...register("name", {required: true})} />
)

export const KindInput = ({register}: {register: UseFormRegister<any>}) => (
    <motion.input className="box-border rounded-lg p-2 light-block text-3xl font-display placeholder:text-[#3a3a3a] w-80" type="text" placeholder="Категория:" {...register("kind", {required: true})} />
)

export const RecipeInput = ({register}: {register: UseFormRegister<any>}) => (
    <motion.textarea className="box-border rounded-lg p-2 light-block text-2xl font-serif font-medium w-full h-64 resize-none placeholder:text-[#3a3a3a]" placeholder="Рецепт:" {...register("recipe", {required: true})} />
)

const ratioInputClassName = "box-border w-[92%] h-[92%] text-center focus:placeholder:text-transparent"

export const RatioInput = ({register}: {register: UseFormRegister<any>}) => {
    const proteins = register("proteins", {required: true})
    const fats = register("fats", {required: true})
    const carbo = register("carbohydrates", {required: true})

    return (
        <motion.div className="text-xl font-medium">
            <Ratio 
                proteins={<motion.input className={ratioInputClassName} type="number" placeholder="0" min={0} max={100} {...proteins} />}
                fats={<motion.input className={ratioInputClassName} type="number" placeholder="0" min={0} max={100} {...fats} />}
                carbo={<motion.input className={ratioInputClassName} type="number" placeholder="0" min={0} max={100} {...carbo} />}
                row
            />
        </motion.div>
    )
}

const mealCheckboxClass = "select-none"

export const MealCheckboxes = ({register}: {register: UseFormRegister<any>}) => [
    <motion.label className={mealCheckboxClass} key="breakfast" htmlFor="breakfastPicker">
        Завтрак
        <motion.input type="checkbox" id="breakfastPicker" value="breakfast" {...register("meal")} />
    </motion.label>,
    <motion.label className={mealCheckboxClass} key="lunch" htmlFor="lunchPicker">
        Обед
        <motion.input type="checkbox" id="lunchPicker" value="lunch" {...register("meal")} />
    </motion.label>,
    <motion.label className={mealCheckboxClass} key="dinner" htmlFor="dinnerPicker">
        Ужин
        <motion.input type="checkbox" id="dinnerPicker" value="dinner" {...register("meal")} />
    </motion.label>,
]

const variants = {
    init: {
        opacity: 0,
        scale: 0.5,
    },
    in: {
        opacity: 1,
        scale: 1.1,
        rotate: 0
    },
    out: {
        opacity: 0,
        scale: 0.5,
    }
}


export const PicturePicker = ({register}: {register: UseFormRegister<any>}) => {
    const [picture, setPicture] = useState<any>(null)
    const field = register("picture", {required: true})
    field.onChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            setPicture(URL.createObjectURL(e.target.files[0]))
          }
    }

    const clearPicture = () => {
        setPicture(null)
    }

    return <motion.div className={clsx("flex items-center justify-center relative rounded-2xl w-[40rem] h-[40rem]")}>
        <AnimatePresence mode="wait">        
        {
            picture && <motion.img className="scale-110" src={picture} variants={variants} animate="in" initial="init" exit="out" transition={{duration: 0.5}} />
        }
        {
            picture && <motion.button onClick={clearPicture} className="absolute top-5 right-5 dark-block rounded-full p-3" transition={{duration: 0.5}}
                    whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} variants={variants} animate="in" initial="init" exit="out" >
                    <Cross className="stroke-white" />
                </motion.button>
        
        }
        {
            !picture && <motion.label className="flex flex-col gap-5 items-center justify-center rounded-full w-[35rem] h-[35rem] light-block cursor-pointer" 
                    htmlFor="picturePicker" whileHover={{scale: 0.98}} whileTap={{scale: 0.95}} transition={{duration: 0.5}}
                    variants={variants} animate="in" initial="init" exit="out" >
                    <PlusLg />
                    <motion.div className="text-2xl font-medium">
                        Фото 600х600
                    </motion.div>
                </motion.label>                        
            
        }
        </AnimatePresence>
        <motion.input className="invisible absolute pointer-events-none" id="picturePicker" type="file" accept="image/png" {...field} />
    </motion.div>
    
}

export const submitButton = () => {

}