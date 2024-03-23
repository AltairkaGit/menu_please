import { LoginFormUI } from "@entities/entrance/ui/login-form"
import { Role } from "@shared/user-roles"
import { ReactNode } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { authService } from "../service"
import { useNavigate } from "react-router-dom"

type Inputs = {
    email: string,
    password: string
}

const loginHooks = {
    [Role.user]: authService.useLoginUserMutation,
    [Role.cook]: authService.useLoginCookerMutation 
}

const nextPage = {
    [Role.user]: '/dashboard',
    [Role.cook]: '/studio'
}

export const LoginForm = ({ children, role } : { children: ReactNode, role: Role }) => {
    const navigate = useNavigate()
    const {register, handleSubmit, formState: { errors }} = useForm<Inputs>()
    const [login, _] = loginHooks[role]()
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            await login(data).unwrap()
            return navigate(nextPage[role], {replace: true})
        } catch(err) {
        }        
    }

    return <LoginFormUI role={role} register={register} onSubmit={handleSubmit(onSubmit)}>
        {children}
    </LoginFormUI>
}