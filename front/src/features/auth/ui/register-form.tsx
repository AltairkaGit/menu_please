import { RegisterFormUI } from "@entities/entrance/ui/register-form"
import { Role } from "@shared/user-roles"
import { ReactNode } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

type Inputs = {
    name: string,
    email: string,
    password: string,
}

export const RegisterForm = ({ role, children } : { role: Role, children: ReactNode }) => {
    const {register, handleSubmit, formState: { errors }} = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    return <RegisterFormUI role={role} register={register} onSubmit={handleSubmit(onSubmit)} >
        {children}
    </RegisterFormUI>
}