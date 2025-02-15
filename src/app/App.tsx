import "./App.css"

import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

import { selectThemeMode } from "./app-selectors"
import { getTheme } from "@/common/theme"
import { Header } from "@/common/components/Header"
import { Main } from "./Main"
import { useAppSelector } from "@/common/hooks"

export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}

export interface Task {
  id: string
  title: string
  isDone: boolean
}

export type TasksState = Record<string, Task[]>

export type FilterValues = "all" | "active" | "completed"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Main />
    </ThemeProvider>
  )
}
