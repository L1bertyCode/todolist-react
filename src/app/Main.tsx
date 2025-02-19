import { CreateItemForm } from "@/common/components"

import { Button, Container, Grid2 as Grid } from "@mui/material"

import { Todolists } from "@/features/Todolists/ui/Todolists"
import { useAppDispatch } from "@/common/hooks"
import { addTodolistTC } from "@/features/Todolists/model/todolists-reducer"
import { setAppErrorAC } from "./app-reducer"

export const Main = () => {
  const dispatch = useAppDispatch()

  const createTodolist = (title: string) => {
    dispatch(addTodolistTC(title))
    // const action = createTodolistAC(title)
    // dispatch(action)
    // dispatchToTasks(createTodolistToTasksAC(todolistId));
  }
  return (
    <Container maxWidth={"lg"}>
      <Grid container sx={{ mb: "30px" }}>
        <CreateItemForm onCreateItem={createTodolist} />
      </Grid>
      <Button onClick={() => dispatch(setAppErrorAC("TEST ERROR MESSAGE"))}>CLick error</Button>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
