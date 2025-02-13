import { useState } from 'react';
import './App.css';
import { TodolistItem } from '../TodolistItem/TodolistItem';
import { CreateItemForm } from '../CreateItemForm/CreateItemForm';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { containerSx } from '../TodolistItem/TodolistItem.styles';
import { NavButton } from '../NavButton/NavButton';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import CssBaseline from '@mui/material/CssBaseline';
import { changeTodolistFilterAC, changeTodolistTitleAC, createTodolistAC, deleteTodolistAC } from '../model/todolists-reducer';
import { changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC } from '../model/tasks-reducer';
import { useAppDispatch } from '../common/hooks/useAppDispatch';
import { useAppSelector } from '../common/hooks/useAppSelector';
import { selectTodolists } from '../model/todolists-selectors';
import { selectTasks } from '../model/tasks-selectors';

type ThemeMode = 'dark' | 'light';

export type Todolist = {
  id: string;
  title: string;
  filter: FilterValues;
};


export interface Task {
  id: string,
  title: string,
  isDone: boolean;
}

export type TasksState = Record<string, Task[]>;

export type FilterValues = "all" | "active" | "completed";

export const App = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: '#087EA4',
      },
    },
  });
  const changeMode = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  // const todolistId1 = v1();
  // const todolistId2 = v1();


  const todolists = useAppSelector(selectTodolists);
  const tasks = useAppSelector(selectTasks);

  const dispatch = useAppDispatch();


  const deleteTask = (todolistId: string, taskId: string) => {
    // setTasks({ ...tasks, [todolistId]: [...tasks[todolistId].filter(t => t.id !== taskId)] });
    dispatch(
      deleteTaskAC({ todolistId: todolistId, taskId: taskId })
    );
  };

  const filterTasks = (todolistId: string, filter: FilterValues) => {
    // setTodolists([...todolists.map(tl => tl.id === todolistId ? { ...tl, filter } : tl)]);
    dispatch(changeTodolistFilterAC({ id: todolistId, filter }));
  };

  const createTask = (todolistId: string, title: string) => {
    // setTasks({ ...tasks, [todolistId]: [{ id: v1(), title, isDone: false }, ...tasks[todolistId]] });
    dispatch(createTaskAC({ todolistId: todolistId, title: title }));
  };

  const chnageTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    // setTasks({ ...tasks, [todolistId]: [...tasks[todolistId].map(t => t.id === taksId ? { ...t, isDone } : t)] });
    dispatch(changeTaskStatusAC({ todolistId: todolistId, taskId: taskId, isDone: isDone }));
  };

  const deleteTodolist = (todolistId: string) => {
    // setTodolists([...todolists.filter(tl => tl.id !== todolistId)]);
    // delete tasks[todolistId];
    dispatch(deleteTodolistAC({ id: todolistId }));
  // dispatchToTasks(deleteTodolistAC(deleteTodolistToTasksAC(todolistId)));
};

const createTodolist = (title: string) => {
  // const todolistId = v1();
  // setTodolists([...todolists, { id: todolistId, title, filter: "all" }]);
  // setTasks({ ...tasks, [todolistId]: [] });
  const action = createTodolistAC(title);
  // const todolistId = action.payload.id;
  dispatch(action);

  // dispatchToTasks(createTodolistToTasksAC(todolistId));
};

const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
  // setTasks({ ...tasks, [todolistId]: [...tasks[todolistId].map(t => t.id === taskId ? { ...t, title } : t)] });
  dispatch(changeTaskTitleAC({ todolistId: todolistId, taskId: taskId, title: title }));
};
const changeTodolistTitle = (todolistId: string, title: string) => {
  // setTodolists([...todolists.map(tl => tl.id === todolistId ? { ...tl, title: title } : tl)]);
  dispatch(changeTodolistTitleAC({ id: todolistId, title }));
};

return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AppBar position="static" sx={{ mb: '30px' }}>
      <Toolbar>
        <Container maxWidth={'lg'} sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            <NavButton color="inherit">Sign in</NavButton>
            <NavButton color="inherit">Sign up</NavButton>
            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
            <Switch color={'default'} onChange={changeMode} />
          </div>
        </Container>
      </Toolbar>
    </AppBar>
    <Container maxWidth={"lg"} >
      <Grid container sx={{ mb: '30px' }}>
        <CreateItemForm createItem={createTodolist} />
      </Grid>
      <Grid container spacing={4}>
        {todolists.map(tl => {
          let filtredTasks = tasks[tl.id];
          if (tl.filter === "completed") {
            filtredTasks = tasks[tl.id].filter(t => t.isDone);
          }
          if (tl.filter === "active") {
            filtredTasks = tasks[tl.id].filter(t => !t.isDone);
          }
          return (
            <Grid key={tl.id}>
              <Paper sx={{ p: '0 20px 20px 20px' }}>
                <TodolistItem
                  todolist={tl}
                  key={tl.id}
                  deleteTask={deleteTask}
                  filterTasks={filterTasks}
                  createTask={createTask}
                  chnageTaskStatus={chnageTaskStatus}
                  tasks={filtredTasks}
                  deleteTodolist={deleteTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                />
              </Paper>
            </Grid>
          );
        }
        )}
      </Grid>
    </Container>
  </ThemeProvider>

);
};
