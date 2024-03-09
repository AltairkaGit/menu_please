import { DashboardLoginLink } from "@entities/entrance/ui/dashboard-login-link"
import { StudioRegisterLink } from "@entities/entrance/ui/studio-register-link"
import { RegisterForm } from "@features/auth/ui/register-form"
import { Role } from "@shared/user-roles"

export const RegisterDashboard = () => (
    <RegisterForm role={Role.user}>
        <DashboardLoginLink />
        <StudioRegisterLink />
    </RegisterForm>
)