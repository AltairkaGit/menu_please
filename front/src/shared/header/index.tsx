import { ReactNode } from "react"
import { HeaderWide } from "./header-wide"
import { HeaderSmall } from "./header-small"

export const Header = (props : {LeftLabel: ReactNode, RightLabel: ReactNode}) => {
    return (<>
        <HeaderWide {...props} />
        <HeaderSmall />
    </>)
}