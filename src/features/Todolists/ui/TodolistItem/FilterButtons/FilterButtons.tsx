import { FilterValues } from "@/app/App"
import { useAppDispatch } from "@/common/hooks"
// import { changeTodolistFilterAC } from "@/features/Todolists/model/todolists-reducer"
import { containerSx } from "@/common/styles"
import { changeTodolistFilterAC, DomainTodolist } from "@/features/Todolists/model/todolists-reducer"
import { Box, Button } from "@mui/material"

type Props = {
  todolist: DomainTodolist
}

export const FilterButtons = ({ todolist }: Props) => {
  const { id, filter = "all" } = todolist

  const dispatch = useAppDispatch()

  const changeFilter = (filter: FilterValues) => {
    dispatch(changeTodolistFilterAC({ id, filter }))
  }

  return (
    <Box sx={containerSx}>
      <Button variant={filter === "all" ? "outlined" : "text"} color={"inherit"} onClick={() => changeFilter("all")}>
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "text"}
        color={"primary"}
        onClick={() => changeFilter("active")}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "text"}
        color={"secondary"}
        onClick={() => changeFilter("completed")}
      >
        Completed
      </Button>
    </Box>
  )
}
