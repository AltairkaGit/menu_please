import { DashboardRegisterLink } from "@entities/entrance/ui/dashboard-register-link"
import { StudioLoginLink } from "@entities/entrance/ui/studio-login-link"
import { LoginForm } from "@features/auth/ui/login-form"
import { Role } from "@shared/user-roles"


export const LoginDashboard = () => (
    <LoginForm role={Role.user}>
        <DashboardRegisterLink />
        <StudioLoginLink />
    </LoginForm>
)