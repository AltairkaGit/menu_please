import { Button } from "@shared/ui/button"
import { Logout } from "@static/icons/logout"
import { useLogoutMutation } from "../service"

export const LogoutButton = () => {
    const [logout, {isLoading}] = useLogoutMutation()
    const onClick = () => logout()
    
    return <Button onClick={onClick} disabled={isLoading} corners="full" className="light-block">
        <Logout />
    </Button>
}