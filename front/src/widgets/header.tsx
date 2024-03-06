import { motion } from "framer-motion"
import { ReactNode } from "react"
import { Label } from "@shared/ui/label"
import clsx from "clsx"
import { LogoutButton } from "@features/auth/ui/logout-button"
import { ProfileButton } from "@features/auth/ui/profile-button"

const LabelProfile = () => {
    const name = 'Кирилл'
    return <Label className="light-block" corners="full" leftButton={<LogoutButton />} rightButton={<ProfileButton />} >{name}</Label>
}

const LabelLogo = () => {
    return <Label className="dark-block font-display mx-auto">Menu, please</Label>
}

export const Header = ({leftLabel} : {leftLabel: ReactNode}) => {
    return (
        <motion.nav className={clsx("w-full absolute top-0 left-0 px-24 pt-8 pb-2 flex", !leftLabel && "pl-[328px]")} >
            {leftLabel}
            <LabelLogo />
            <LabelProfile />
        </motion.nav>
    )
}