import { NewListButtonUI } from "@entities/menu/ui/new-list"
import { useCreateMutation } from "./service"

export const NewListButton = () => {
    const [createList, _] = useCreateMutation()
    const onClick = async () => {
        try {
            await createList().unwrap()
        } catch (err) {
        }
    }

    return <NewListButtonUI onClick={onClick} />
}