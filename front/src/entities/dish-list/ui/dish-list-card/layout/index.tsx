import { ReactNode } from "react"
import { motion } from 'framer-motion'
import { Block } from "@shared/ui/block"
import { twMerge } from "tailwind-merge"
import { Link } from "react-router-dom"

export interface LayoutProps {
    id: number
    className: string
    Picture: ReactNode
    Summary: ReactNode
    MenuLists: ReactNode
    DeleteButton: ReactNode
}

export const RowLayout = ({id, className, Picture, Summary, MenuLists, DeleteButton}: LayoutProps) => (
    <Block className={twMerge("flex w-full light-block mt-11 box-border min-h-80 justify-between items-center gap-5", className)}>
        <Link to={`./dish-list/${id}`} className="flex grow gap-5">
            <Block className='dark-block w-8 h-auto shrink-0 self-stretch' />
            {Picture}
            {Summary}
            {MenuLists}
        </Link>
        {DeleteButton}
    </Block>
)

export const ColLayout = ({id, className, Picture, Summary, MenuLists, DeleteButton}: LayoutProps) => (
    <Block className={twMerge("flex w-full light-block mt-11 box-border min-h-80 flex-col justify-between items-center gap-3", className)}>
        <Link to={`./dish-list/${id}`}>
            <Block className='dark-block h-4 shrink-0 self-stretch' />
            <motion.div className="grow">
                {Picture}
                {Summary}
                {DeleteButton}
            </motion.div>
            {MenuLists}
        </Link>
    </Block>
)