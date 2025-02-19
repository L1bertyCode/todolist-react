// import { createTaskAC } from "@/features/Todolists/model/tasks-reducer"

import { useAppDispatch } from "@/common/hooks"
import { TodolistTitle } from "@/features/Todolists/ui/TodolistItem/TodolistTitle/TodolistTitle"
import { FilterButtons } from "@/features/Todolists/ui/TodolistItem/FilterButtons/FilterButtons"
import { Tasks } from "@/features/Todolists/ui/TodolistItem/Tasks/Tasks"
import { CreateItemForm } from "@/common/components"
import { DomainTodolist } from "../../model/todolists-reducer"
import { addTaskTC } from "../../model/tasks-reducer"

interface TodolistItemProps {
  todolist: DomainTodolist
}

export const TodolistItem = ({ todolist }: TodolistItemProps) => {
  const dispatch = useAppDispatch()

  const createTask = (title: string) => {
    dispatch(addTaskTC({ todolistId: todolist.id, title: title }))
  }
  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTask} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
