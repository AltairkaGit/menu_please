import { UseFormRegister } from "react-hook-form"
import { motion } from "framer-motion"

export const Input = ({register, name, placeholder, type = 'text', required = false} : {
    register: UseFormRegister<any>,
    name: string,
    placeholder?: string,
    type?: string,
    required?: boolean
}) => {
    return (
        <motion.input layout variants={{in: {y: 0, opacity: 1}, out: {y: '30%', opacity: 0}}}
            className="input" 
            {...register(name, {required})} 
            type={type}
            placeholder={placeholder ?? name} 
        />
    )
}