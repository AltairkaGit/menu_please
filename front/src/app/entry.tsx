import { BaseLayout } from "@pages/base-layout"
import { DashboardPage } from "@pages/dashboard-page"
import { DishListPage } from "@pages/dish-list-page"
import { DishPage } from "@pages/dish-page"
import { MainPage } from "@pages/main-page"
import { StudioPage } from "@pages/studio-page"
import { PrivateRoutes } from "@shared/private-routes"
import { LoginDashboard } from "@widgests/login/login-dashboard"
import { LoginStudio } from "@widgests/login/login-studio"
import { RegisterDashboard } from "@widgests/register/register-dashboard"
import { RegisterStudio } from "@widgests/register/register-studio"
import { AnimatePresence } from "framer-motion"
import { Route, Routes, createBrowserRouter, createRoutesFromElements, useLocation } from "react-router-dom"


const App = () => {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" >
          <Route path="" element={<MainPage />}>
            <Route path="" element={<LoginDashboard />} />
            <Route path="login/studio" element={<LoginStudio />} />
            <Route path="register/dashboard" element={<RegisterDashboard />}/>
            <Route path="register/studio" element={<RegisterStudio />}/>
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route element={<BaseLayout />}>
              <Route path="dish/:id" element={<DishPage/>} />
              <Route path="dashboard" element={<DashboardPage/>} />
              <Route path="dish-list/:id" element={<DishListPage />} />
              <Route path="studio" element={<StudioPage />} />
            </Route>
          </Route>          
        </Route>   
      </Routes>
    </AnimatePresence>
  )
}

export const router = createBrowserRouter(createRoutesFromElements(<Route path="*" element={<App />} />))