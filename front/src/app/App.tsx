import { MainPage } from "@pages/main-page"
import { Login } from "@widgests/login"
import { MainWidget } from "@widgests/main"
import { AnimatePresence } from "framer-motion"
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, useLocation } from "react-router-dom"


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" >
      <Route path="" element={<MainPage />}>
        <Route path="" element={<MainWidget />} />
        <Route path="login" element={<Login />} />
        <Route path="register">
          <Route path="/dashboard" element={}/>
          <Route path="/studio" element={}/>
        </Route>
      </Route>
      <Route path="/dashboard">
        <Route path ="" />
        <Route path="/studio" />
      </Route>
    </Route>
    
  )
)


const App = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <RouterProvider router={router} key={location.pathname} />
    </AnimatePresence>
  )
}

export default App