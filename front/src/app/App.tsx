import { MainPage } from "@pages/main-page"
import { LoginDashboard } from "@widgests/login-dashboard"
import { LoginStudio } from "@widgests/login-studio"
import { RegisterDashboard } from "@widgests/register-dashboard"
import { RegisterStudio } from "@widgests/register-studio"
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
          <Route path="dashboard" />
          <Route path="studio" />
        </Route>   
      </Routes>
    </AnimatePresence>
  )
}

export const router = createBrowserRouter(createRoutesFromElements(<Route path="*" element={<App />} />))