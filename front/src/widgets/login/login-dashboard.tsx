import { DashboardRegisterLink } from "@entities/entrance/ui/dashboard-register-link"
import { LoginForm } from "@entities/entrance/ui/login-form"
import { StudioLoginLink } from "@entities/entrance/ui/studio-login-link"
import { SubmitHandler, useForm } from "react-hook-form"

type Inputs = {
    email: string,
    password: string
}

export const LoginDashboard = () => {
    const {register, handleSubmit, formState: { errors }} = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    return <LoginForm title="Вход в кабинет" register={register} onSubmit={handleSubmit(onSubmit)}>
        <DashboardRegisterLink />
        <StudioLoginLink />
    </LoginForm>
}