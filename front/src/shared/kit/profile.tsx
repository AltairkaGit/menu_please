import { selectUsername } from "@entities/entrance/model/auth-slice"
import { LogoutButton } from "@features/auth/ui/logout-button"
import { Button } from "@shared/kit/button"
import { Label } from "@shared/kit/label"
import { ReactNode } from "react"
import { useSelector } from "react-redux"

const ProfileButton = ({Icon} : {Icon : ReactNode}) => {
    const onClick = () => {}
    return <Button onClick={onClick} corners="full" className="light-block">
        {Icon}
    </Button>
}

export const LabelProfile = ({Icon} : {Icon : ReactNode}) => {
    const name = useSelector(selectUsername)
    
    return <Label className="light-block" 
        corners="full" 
        leftButton={<LogoutButton />} 
        rightButton={<ProfileButton Icon={Icon} />}>
        {name}
    </Label>
}