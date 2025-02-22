// import { changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC } from "@/features/Todolists/model/tasks-reducer"

import { useAppDispatch } from "@/common/hooks"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import { getListItemSx } from "./TaskItem.styles"
import { Checkbox, IconButton, ListItem } from "@mui/material"
import { ChangeEvent } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import { DomainTask } from "@/features/Todolists/api/tasksApi.types"
import { TaskStatus } from "@/common/enums"
import { removeTaskTC, updateTaskTC } from "@/features/Todolists/model/tasks-reducer"
import { DomainTodolist } from "@/features/Todolists/model/todolists-reducer"

type Props = {
  task: DomainTask
  todolistId: string
  todolist: DomainTodolist
}

export const TaskItem = ({ task, todolistId, todolist }: Props) => {
  const dispatch = useAppDispatch()

  const deleteTask = () => {
    dispatch(removeTaskTC({ todolistId, taskId: task.id }))
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New

    dispatch(updateTaskTC({ taskId: task.id, status, todolistId }))
  }

  const changeTaskTitle = (title: string) => {
    dispatch(updateTaskTC({ taskId: task.id, title, todolistId }))
  }

  return (
    <ListItem sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox
          disabled={todolist.entityStatus === "loading"}
          checked={task.status === TaskStatus.Completed}
          onChange={changeTaskStatus}
        />
        <EditableSpan value={task.title} onChange={changeTaskTitle} disabled={todolist.entityStatus === "loading"} />
      </div>
      <IconButton onClick={deleteTask} disabled={todolist.entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
