import { SubmitHandler, useForm } from "react-hook-form"
import { RegisterForm } from "@entities/entrance/ui/register-form"
import { StudioLoginLink } from "@entities/entrance/ui/studio-login-link"
import { DashboardRegisterLink } from "@entities/entrance/ui/dashboard-register-link"

type Inputs = {
    name: string,
    email: string,
    password: string,
}

export const RegisterStudio = () => {
    const {register, handleSubmit, formState: { errors }} = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    return <RegisterForm title="Регистрация в студии" register={register} onSubmit={handleSubmit(onSubmit)} >
        <StudioLoginLink />
        <DashboardRegisterLink />
    </RegisterForm>
}