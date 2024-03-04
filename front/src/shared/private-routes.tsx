import { Navigate, Outlet,  } from "react-router-dom"

export const PrivateRoutes = () => {
    const {isAuth} = {isAuth: true}

    return (
        isAuth ? <Outlet/> : <Navigate to='/'/>
    )
}