import { StudioLoginLink } from "@entities/entrance/ui/studio-login-link"
import { DashboardRegisterLink } from "@entities/entrance/ui/dashboard-register-link"
import { RegisterForm } from "@features/auth/ui/register-form"
import { Role } from "@shared/user-roles"

export const RegisterStudio = () => (
    <RegisterForm role={Role.cook}>
        <StudioLoginLink />
        <DashboardRegisterLink />
    </RegisterForm>
)