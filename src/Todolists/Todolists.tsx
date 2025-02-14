import { useAppSelector } from "@/common/hooks/useAppSelector";
import { selectTodolists } from "@/model/todolists-selectors";
import { TodolistItem } from "@/TodolistItem/TodolistItem";
import { Grid2 as Grid, Paper } from "@mui/material";

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists);
  return (
    <>
      {todolists.map(tl => {
        return (
          <Grid key={tl.id}>
            <Paper sx={{ p: '0 20px 20px 20px' }}>
              <TodolistItem
                todolist={tl}
              />
            </Paper>
          </Grid>
        );
      }
      )}
    </>
  );
};