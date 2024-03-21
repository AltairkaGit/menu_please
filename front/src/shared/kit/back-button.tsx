import { Button } from "@shared/kit/button"
import { ArrowBack } from "@static/icons/arrow-back"
import { useNavigate } from "react-router-dom"

export const BackButton = () => {
    const navigate = useNavigate()
    const goBack = () => navigate(-1)

    return <Button onClick={goBack} className="light-block">
        <ArrowBack />
    </Button>
}