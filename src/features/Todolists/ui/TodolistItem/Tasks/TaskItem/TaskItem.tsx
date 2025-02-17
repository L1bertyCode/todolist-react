// import { changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC } from "@/features/Todolists/model/tasks-reducer"

import { useAppDispatch } from "@/common/hooks"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import { getListItemSx } from "./TaskItem.styles"
import { Checkbox, IconButton, ListItem } from "@mui/material"
import { ChangeEvent } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import { DomainTask } from "@/features/Todolists/api/tasksApi.types"
import { TaskStatus } from "@/common/enums"
import {
  removeTaskTC,
  updateTaskTC,
} from "@/features/Todolists/model/tasks-reducer"

type Props = {
  task: DomainTask
  todolistId: string
}

export const TaskItem = ({ task, todolistId }: Props) => {
  const dispatch = useAppDispatch()

  const deleteTask = () => {
    dispatch(removeTaskTC({ todolistId, taskId: task.id }))
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
  
    
    dispatch(updateTaskTC({ taskId: task.id, status, todolistId }))
    // const newStatusValue = e.currentTarget.checked
    // dispatch(changeTaskStatusAC({ todolistId, taskId: task.id, isDone: newStatusValue }))
  }

  const changeTaskTitle = (title: string) => {
    dispatch(updateTaskTC({ taskId: task.id, title, todolistId }))
    // dispatch(changeTaskTitleAC({ todolistId, taskId: task.id, title }))
  }

  return (
    <ListItem sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox checked={task.status === TaskStatus.Completed} onChange={changeTaskStatus} />
        <EditableSpan value={task.title} onChange={changeTaskTitle} />
      </div>
      <IconButton onClick={deleteTask}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
