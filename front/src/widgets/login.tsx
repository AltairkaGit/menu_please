import { SubmitHandler, useForm } from "react-hook-form"
import { motion } from 'framer-motion'

type Inputs = {
    email: string,
    password: string
}

export const Login = () => {
    const {register, handleSubmit, formState} = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    return (
        <motion.form onSubmit={handleSubmit(onSubmit)}>

        </motion.form>
    )
}