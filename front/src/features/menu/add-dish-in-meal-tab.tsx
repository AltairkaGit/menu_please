import { AddDishTab as UI } from "@entities/dish/ui/tab"

export const AddDishTab = ({openModal}: {openModal: () => any}) => {    
    return <UI showModal={openModal} />
}