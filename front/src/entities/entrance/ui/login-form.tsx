import { UseFormRegister } from "react-hook-form"
import { motion } from "framer-motion"
import { Input } from "./input"
import { Button } from "./button"
import { ReactNode } from "react"

export const LoginForm = ({ title, onSubmit, register, children }: {
    title: string,
    onSubmit: React.FormEventHandler<HTMLFormElement>,
    register: UseFormRegister<any>,
    children?: ReactNode
}) => {
    return (
        <motion.form initial="out" animate="in" exit="out" className="form" onSubmit={onSubmit}>
            <motion.h2 layout variants={{in: {y: 0, opacity: 1}, out: {y: '20%', opacity: 0}}}>{title}</motion.h2>
            <Input register={register} name="email" placeholder="Email:" required />
            <Input register={register} name="password" placeholder="Пароль:" required type="password" />
            <Button>Войти</Button>
            { children }
        </motion.form>
    )
}