import { useAppDispatch } from "@/common/hooks"
import { CreateItemForm } from "@/common/components"

import { Container, Grid2 as Grid } from "@mui/material"

import { createTodolistAC } from "@/features/Todolists/model/todolists-reducer"
import { Todolists } from "@/features/Todolists/ui/Todolists"

export const Main = () => {
  const dispatch = useAppDispatch()

  const createTodolist = (title: string) => {
    const action = createTodolistAC(title)
    dispatch(action)
    // dispatchToTasks(createTodolistToTasksAC(todolistId));
  }
  return (
    <Container maxWidth={"lg"}>
      <Grid container sx={{ mb: "30px" }}>
        <CreateItemForm onCreateItem={createTodolist} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
