import { Button } from "@shared/ui/button"
import { Logout } from "@static/icons/logout"

export const LogoutButton = () => {
    const onClick = () => {}
    return <Button onClick={onClick} corners="full" className="light-block">
        <Logout />
    </Button>
}