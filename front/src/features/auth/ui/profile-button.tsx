import { Button } from "@shared/ui/button"
import { User } from "@static/icons/user"

export const ProfileButton = () => {
    const onClick = () => {}
    return <Button onClick={onClick} corners="full" className="light-block">
        <User />
    </Button>
}
