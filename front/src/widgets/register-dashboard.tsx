import { SubmitHandler, useForm } from "react-hook-form"
import { RegisterForm } from "@entities/entrance/ui/register-form"
import { DashboardLoginLink } from "@entities/entrance/ui/dashboard-login-link"
import { StudioRegisterLink } from "@entities/entrance/ui/studio-register-link"

type Inputs = {
    name: string,
    email: string,
    password: string,
}

export const RegisterDashboard = () => {
    const {register, handleSubmit, formState: { errors }} = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    return <RegisterForm title="Регистрация" register={register} onSubmit={handleSubmit(onSubmit)} >
        <DashboardLoginLink />
        <StudioRegisterLink />
    </RegisterForm>
}