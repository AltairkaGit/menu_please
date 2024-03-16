import { Meal } from "@entities/dish/api"
import { AddDishTab as UI } from "@entities/dish/ui/tab"

export const AddDishTab = ({id, meal}: {id: number, meal: Meal}) => {
    const showModal = () => {console.log('show modal') }
    
    return <UI key={meal} showModal={showModal} />
}