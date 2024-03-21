import { Block } from "./block"

export const Round = ({className, r}: {className: string, r: string}) => {
    return <Block corners="full" className={className} style={{width: r, height: r}} />
}