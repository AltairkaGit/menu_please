import { Button } from "@shared/ui/button"
import { PlusMd } from "@static/icons/plus-md"

export const NewMenuButton = ({onClick} : {onClick: () => any}) => <Button whileTap={{scale: 0.975}} className="light-block !w-full !h-auto py-3" onClick={onClick}>
        <PlusMd />
    </Button>