import { UseFormRegister } from "react-hook-form"
import { motion } from "framer-motion"
import { Input } from "./input"
import { Button } from "./button"
import { ReactNode } from "react"
import { EntraceForm } from "./form"
import { Role } from "@shared/user-roles"

const titles = {
    [Role.user]: 'Вход в кабинет',
    [Role.cook]: 'Вход в cтудию'
}

export const LoginFormUI = ({ role, onSubmit, register, children }: {
    role: Role,
    onSubmit: React.FormEventHandler<HTMLFormElement>,
    register: UseFormRegister<any>,
    children?: ReactNode
}) => {
    return (
        <EntraceForm onSubmit={onSubmit}>
            <motion.h2 layout variants={{in: {y: 0, opacity: 1}, out: {y: '20%', opacity: 0}}}>{titles[role]}</motion.h2>
            <Input register={register} name="email" placeholder="Email:" required />
            <Input register={register} name="password" placeholder="Пароль:" required type="password" />
            <Button>Войти</Button>
            { children }
        </EntraceForm>
    )
}