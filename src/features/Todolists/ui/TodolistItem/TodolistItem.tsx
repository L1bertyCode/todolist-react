import { useAppDispatch } from "@/common/hooks"
import { createTaskAC } from "@/features/Todolists/model/tasks-reducer"
import { TodolistTitle } from "@/features/Todolists/ui/TodolistItem/TodolistTitle/TodolistTitle"
import { FilterButtons } from "@/features/Todolists/ui/TodolistItem/FilterButtons/FilterButtons"
import { Todolist } from "@/app/App"
import { Tasks } from "@/features/Todolists/ui/TodolistItem/Tasks/Tasks"
import { CreateItemForm } from "@/common/components"

interface TodolistItemProps {
  todolist: Todolist
}

export const TodolistItem = ({ todolist }: TodolistItemProps) => {
  const dispatch = useAppDispatch()

  const createTask = (title: string) => {
    dispatch(createTaskAC({ todolistId: todolist.id, title: title }))
  }
  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTask} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
