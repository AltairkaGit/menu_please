import { StudioRegisterLink } from "@entities/entrance/ui/studio-register-link"
import { DashboardLoginLink } from "@entities/entrance/ui/dashboard-login-link"
import { LoginForm } from "@features/auth/ui/login-form"
import { Role } from "@shared/user-roles"

export const LoginStudio = () => (
    <LoginForm role={Role.cook}>
        <StudioRegisterLink />
        <DashboardLoginLink />
    </LoginForm>
)