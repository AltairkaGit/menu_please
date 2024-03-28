import { Block } from "@shared/kit/block"
import { twMerge } from "tailwind-merge"

export const Cooker = ({name, className}: {name: string, className?: string}) => (
    <Block corners="full" className={twMerge("light-block self-start py-1 px-3 text-nowrap", className)}>От {name}</Block>
)