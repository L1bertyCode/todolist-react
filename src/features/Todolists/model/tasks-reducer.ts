import type { TasksState } from "../../../app/App"
import { createTodolistAC, deleteTodolistAC } from "./todolists-reducer"
import { createAction, createReducer, nanoid } from "@reduxjs/toolkit"

const initialState: TasksState = {}

export const deleteTaskAC = createAction<{ todolistId: string; taskId: string }>("tasks/deleteTask")
export const createTaskAC = createAction<{ todolistId: string; title: string }>("tasks/createTask")

export const changeTaskStatusAC = createAction<{ todolistId: string; taskId: string; isDone: boolean }>(
  "tasks/changeTaskStatus",
)

export const changeTaskTitleAC = createAction<{ todolistId: string; taskId: string; title: string }>(
  "tasks/changeTaskTitle",
)

export const tasksReducer = createReducer(initialState, (builder) => {
  builder.addCase(createTodolistAC, (state, action) => {
    state[action.payload.id] = []
  })
  builder.addCase(deleteTodolistAC, (state, action) => {
    delete state[action.payload.id]
  })

  builder.addCase(deleteTaskAC, (state, action) => {
    const index = state[action.payload.todolistId].findIndex((t) => t.id === action.payload.taskId)
    if (index !== -1) {
      state[action.payload.todolistId].splice(index, 1)
    }
  })

  builder.addCase(createTaskAC, (state, action) => {
    state[action.payload.todolistId].unshift({ id: nanoid(), title: action.payload.title, isDone: false })
  })

  builder.addCase(changeTaskStatusAC, (state, action) => {
    function changeEl(el: { id: string; title: string; isDone: boolean }) {
      if (el.id === action.payload.taskId) {
        return el
      }
    }
    const t = state[action.payload.todolistId].find(changeEl)
    if (t) {
      t.isDone = action.payload.isDone
    }
  })
  builder.addCase(changeTaskTitleAC, (state, action) => {
    function changeEl(el: { id: string; title: string; isDone: boolean }) {
      if (el.id === action.payload.taskId) {
        return el
      }
    }
    const t = state[action.payload.todolistId].find(changeEl)
    if (t) {
      t.title = action.payload.title
    }
  })
})
