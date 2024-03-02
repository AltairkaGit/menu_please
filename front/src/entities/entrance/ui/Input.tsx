import { UseFormRegister } from "react-hook-form"

export const Input = ({register, name, required} : {
    register: UseFormRegister<any>,
    name: string,
    required: boolean
}) => {
    return (
        <input className="" {...register(name, {required})} />
    )
}