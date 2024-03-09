import { selectIsAuth } from "@entities/entrance/model/auth-slice"
import { useRetreiveUserQuery } from "@features/auth/service"
import Cookies from "js-cookie"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

export const PrivateRoutes = () => {
    const {data, error, isLoading} = useRetreiveUserQuery()
    const authCookie = Cookies.get('auth')
    if (authCookie == "true") return <Outlet/>
    const isAuth = useSelector(selectIsAuth)
    
    return (
        isAuth ? <Outlet/> : <Navigate to='/'/>
    )
}