import { Button } from "@shared/ui/button"
import { Label } from "@shared/ui/label"
import { Logout } from "@static/icons/logout"
import { ReactNode } from "react"

const ProfileButton = ({Icon} : {Icon : ReactNode}) => {
    const onClick = () => {}
    return <Button onClick={onClick} corners="full" className="light-block">
        {Icon}
    </Button>
}

const LogoutButton = () => {
    const onClick = () => {}
    return <Button onClick={onClick} corners="full" className="light-block">
        <Logout />
    </Button>
}

export const LabelProfile = ({Icon} : {Icon : ReactNode}) => {
    const name = 'Кирилл'
    
    return <Label className="light-block" 
        corners="full" 
        leftButton={<LogoutButton />} 
        rightButton={<ProfileButton 
        Icon={Icon} />} >
        {name}
    </Label>
}