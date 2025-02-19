import "./App.css"

import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

import { selectThemeMode } from "./app-selectors"
import { getTheme } from "@/common/theme"
import { Header } from "@/common/components/Header"
import { Main } from "./Main"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { useEffect } from "react"

import { fetchTodolistsThunk } from "@/features/Todolists/model/todolists-reducer"
import { DomainTask } from "@/features/Todolists/api/tasksApi.types"
import { ErrorSnackbar } from "@/common/components/ErrorSnackbar"

export type TodolistType = {
  id: string
  title: string
  filter: FilterValues
}

export interface Task {
  id: string
  title: string
  isDone: boolean
}

export type TasksState = Record<string, DomainTask[]>

export type FilterValues = "all" | "active" | "completed"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsThunk)
  }, [dispatch])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Main />
      <ErrorSnackbar />
    </ThemeProvider>
  )
}
