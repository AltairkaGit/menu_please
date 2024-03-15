import { Block } from "@shared/ui/block"

export const Cooker = ({name}: {name: string}) => (
    <Block corners="full" className="light-block self-start py-1 px-3">От {name}</Block>
)