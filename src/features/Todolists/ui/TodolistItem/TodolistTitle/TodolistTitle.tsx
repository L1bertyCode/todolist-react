import { useAppDispatch } from "@/common/hooks"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
// import { changeTodolistTitleAC, deleteTodolistAC } from "@/features/Todolists/model/todolists-reducer"
import { IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import s from "./TodolistTitle.module.css"
import { DomainTodolist, removeTodolistTC, updateTodolistTitleTC } from "@/features/Todolists/model/todolists-reducer"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist

  const dispatch = useAppDispatch()

  const deleteTodolist = () => {
    dispatch(removeTodolistTC(id))

  }

  const changeTodolistTitle = (title: string) => {
    dispatch(updateTodolistTitleTC({ title, id }))
  }

  return (
    <div className={s.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitle} disabled={entityStatus === "loading"} />
      </h3>
      <IconButton onClick={deleteTodolist} disabled={entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
