import { Button } from "@shared/kit/button"
import { PlusMd } from "@static/icons/plus-md"

export const NewListButtonUI = ({onClick} : {onClick: () => any}) => <Button whileTap={{scale: 0.9}} className="light-block !w-full !h-auto py-3" onClick={onClick}>
        <PlusMd />
    </Button>