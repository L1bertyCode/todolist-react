import { Main } from "@/app/Main"

import { Route, Routes } from "react-router"
import { Page404 } from "../components/Page404/Page404"
import { Login } from "@/features/auth/ui/Login/Login"
export const Path = {
  Main: "/",
  Login: "login",
  NotFound: "*",
} as const

export const Routing = () => {
  return (
    <Routes>
      <Route path={Path.Main} element={<Main />} />
      <Route path={Path.Login} element={<Login />} />
      <Route path={Path.NotFound} element={<Page404 />} />
    </Routes>
  )
}
