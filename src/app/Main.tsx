import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { CreateItemForm } from "@/CreateItemForm/CreateItemForm";

import { Container, Grid2 as Grid, } from "@mui/material";

import { createTodolistAC } from "@/model/todolists-reducer";
import { Todolists } from "@/Todolists/Todolists";


export const Main = () => {
  const dispatch = useAppDispatch();


  const createTodolist = (title: string) => {
    const action = createTodolistAC(title);
    dispatch(action);
    // dispatchToTasks(createTodolistToTasksAC(todolistId));
  };
  return (
    <Container maxWidth={"lg"} >
      <Grid container sx={{ mb: '30px' }}>
        <CreateItemForm createItem={createTodolist} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  );
};