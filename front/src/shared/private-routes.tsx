import { selectIsAuth } from "@entities/entrance/model/auth-slice"
import { useRetreiveUserQuery } from "@features/auth/service"
import Cookies from "js-cookie"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

export const PrivateRoutes = () => {
    useRetreiveUserQuery()
    const isAuth = useSelector(selectIsAuth)
    const authCookie = Cookies.get('auth')
    if (authCookie == "true") return <Outlet/>
    return isAuth ? <Outlet/> : <Navigate to='/'/>
}