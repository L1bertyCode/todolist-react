import { TaskStatus } from "@/common/enums"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { fetchTasksTC } from "@/features/Todolists/model/tasks-reducer"
import { selectTasks } from "@/features/Todolists/model/tasks-selectors"
import { DomainTodolist } from "@/features/Todolists/model/todolists-reducer"
import { TaskItem } from "@/features/Todolists/ui/TodolistItem/Tasks/TaskItem/TaskItem"
import { List } from "@mui/material"
import { useEffect } from "react"

type Props = {
  todolist: DomainTodolist
}
export const Tasks = ({ todolist }: Props) => {
  const tasks = useAppSelector(selectTasks)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(todolist.id))
  }, [dispatch, todolist.id])

  let filtredTasks = tasks[todolist.id]
  if (todolist.filter === "completed") {
    filtredTasks = tasks[todolist.id].filter((t) => t.status === TaskStatus.Completed)
  }
  if (todolist.filter === "active") {
    filtredTasks = tasks[todolist.id].filter((t) => t.status === TaskStatus.New)
  }
  return (
    <>
      {filtredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filtredTasks &&
            filtredTasks.map((t) => {
              return <TaskItem key={t.id} task={t} todolistId={todolist.id} />
            })}
        </List>
      )}
    </>
  )
}
