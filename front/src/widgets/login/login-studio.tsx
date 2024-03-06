import { SubmitHandler, useForm } from "react-hook-form"
import { LoginForm } from "@entities/entrance/ui/login-form"
import { StudioRegisterLink } from "@entities/entrance/ui/studio-register-link"
import { DashboardLoginLink } from "@entities/entrance/ui/dashboard-login-link"

type Inputs = {
    email: string,
    password: string
}

export const LoginStudio = () => {
    const {register, handleSubmit, formState: { errors }} = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    return <LoginForm title="Вход в студию" register={register} onSubmit={handleSubmit(onSubmit)} >
        <StudioRegisterLink />
        <DashboardLoginLink />
    </LoginForm>
}