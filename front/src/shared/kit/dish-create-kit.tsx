import { UseFormRegister } from "react-hook-form"
import { AnimatePresence, motion } from "framer-motion"
import { Dish, Meal } from "@entities/dish/api"
import { useForm } from "react-hook-form"
import { Ratio } from "@entities/dish/ui/ratio"
import { PlusLg } from "@static/icons/plus-lg"
import { Cross } from "@static/icons/cross"
import { MutableRefObject, ReactNode, Ref, useEffect, useState } from "react"
import clsx from "clsx"
import { PlusSm } from "@static/icons/plus-sm"
import { twMerge } from "tailwind-merge"

export interface DishData {
    kind: string, 
    name: string, 
    recipe: string,
    file: string,
    p: number, 
    f: number, 
    c: number,
    meal_breakfast: boolean,
    meal_lunch: boolean,
    meal_dinner: boolean,
}

export const useDishForm = (initial?: Dish) => {
    
    const { register, handleSubmit, ...rest } = useForm<DishData>()
    return { register, handleSubmit, rest }
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
    const proteins = register("p", {required: true})
    const fats = register("f", {required: true})
    const carbo = register("c", {required: true})

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

const mealToValue = {
    [Meal.breakfast]:'Завтрак',
    [Meal.lunch]:'Обед',
    [Meal.dinner]:'Ужин',
}

const MealCheckbox = ({register, meal, init = false}: {register: UseFormRegister<any>, meal: Meal, init?: boolean}) => {
    const name = `meal_${meal}`
    const field = register(name)
    const [checked, setChecked] = useState(init)
    
    useEffect(() => {
        setChecked(init)
    }, [init])

    const className = twMerge(
        "transition-all duration-500 cursor-pointer justify-between px-5 rounded-full items-center flex box-border text-center py-2 text-xl select-none w-full",
        checked ? "dark-block" : "light-block"
    )
    return <motion.div className="relative">
        <motion.label onClick={(e) => void setChecked(!checked)} className={className} 
            htmlFor={`${meal}Picker`} whileHover={{scale: 0.98}} whileTap={{scale: 0.95}}>
            <motion.div className={twMerge("w-3 h-3 rounded-full transition-all duration-500", checked ? "light-block" : "dark-block")} />  
            {mealToValue[meal]}
            <PlusSm className={twMerge("transition-all duration-500", checked ? "rotate-45 fill-white" : "")} />            
        </motion.label>
        <motion.input className="absolute invisible top-0 right-0" type="checkbox" id={`${meal}Picker`} {...field} />
    </motion.div>
}

export const MealCheckboxes = ({register, init}: {register: UseFormRegister<any>, init: { breakfast?: boolean, lunch?: boolean, dinner?: boolean}}) => [
    <MealCheckbox init={init.breakfast} key={Meal.breakfast} register={register} meal={Meal.breakfast} />,
    <MealCheckbox init={init.lunch} key={Meal.lunch} register={register} meal={Meal.lunch} />,
    <MealCheckbox init={init.dinner} key={Meal.dinner} register={register} meal={Meal.dinner} />,
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


export const PicturePicker = ({register, pictureRef, initial}: {register: UseFormRegister<any>, pictureRef: MutableRefObject<any>, initial: string | null}) => {
    const [picture, setPicture] = useState<any>(initial)
    const field = register("file")
    field.onChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            const picture = e.target.files[0]
            setPicture(URL.createObjectURL(picture))
            pictureRef.current = picture
            console.log(picture)
          }
    }

    const clearPicture = () => {
        const picture = null
        setPicture(picture)
        pictureRef.current = picture
    }

    useEffect(() => {
        if (initial) setPicture(initial)
    }, [initial])

    return <motion.div className={clsx("flex items-center justify-center relative rounded-2xl w-[40rem] h-[40rem]")}>
        <AnimatePresence mode="wait">        
        {
            picture && <motion.img key="picture" className="scale-110" src={picture} variants={variants} animate="in" initial="init" exit="out" transition={{duration: 0.5}} />
        }
        {
            picture && <motion.button key="delete" onClick={clearPicture} className="absolute top-5 right-5 dark-block rounded-full p-3" transition={{duration: 0.5}}
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

const Button = ({disabled, children, type, className}: {disabled: boolean, children: ReactNode, type: "button" | "submit", className: string}) => (
    <motion.button disabled={disabled} type={type} className={twMerge("box-border text-3xl w-full rounded-lg  px-5 py-4", className)} whileHover={{scale: 0.98}} whileTap={{scale: 0.95}} >
        {children}
    </motion.button>
)

export const CreateButton = ({disabled}: {disabled: boolean}) => (
    <Button disabled={disabled} type="submit" className="dark-block">
        Создать
    </Button>
)

export const UpdateButton = ({disabled}: {disabled: boolean}) => (
    <motion.button form="update-dish-form" type="submit" className={twMerge("box-border text-3xl w-full rounded-lg dark-block px-5 py-4")} whileHover={{scale: 0.98}} whileTap={{scale: 0.95}} >
        Сохранить
    </motion.button>
)

export const DeleteButton = ({disabled, remove}: {disabled: boolean, remove: () => any}) => (
    <Button disabled={disabled} type="button" className="bg-red-600 transition-colors duration-500 text-white">
        Удалить
    </Button>
)