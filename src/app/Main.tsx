import { CreateItemForm } from "@/common/components"

import {  Container, Grid2 as Grid } from "@mui/material"

import { Todolists } from "@/features/Todolists/ui/Todolists"
import { useAppDispatch } from "@/common/hooks"
import { addTodolistTC } from "@/features/Todolists/model/todolists-reducer"

export const Main = () => {
  const dispatch = useAppDispatch()

  const createTodolist = (title: string) => {
    dispatch(addTodolistTC(title))
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
