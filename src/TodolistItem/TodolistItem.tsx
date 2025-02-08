import { ChangeEvent } from "react";
import { FilterValues, Task, Todolist } from "../App";

import { CreateItemForm } from "../CreateItemForm/CreateItemForm";
import { EditableSpan } from "../EditableSpan/EditableSpan";

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { Box, Checkbox } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { containerSx, getListItemSx } from "./TodolistItem.styles";


interface TodolistItemProps {
  todolist: Todolist;
  tasks: Task[];
  deleteTask: (todolistId: string, taskId: string) => void;
  filterTasks: (todolistId: string, filter: FilterValues) => void;
  createTask: (todolistId: string, title: string) => void;
  chnageTaskStatus: (todolistId: string, taksId: string, isDone: boolean) => void;
  deleteTodolist: (todolistId: string) => void;
  changeTaskTitle: (todolistId: string, taksId: string, title: string) => void;
  changeTodolistTitle: (todolistId: string, title: string) => void;
}

export const TodolistItem = ({
  todolist,
  tasks,
  deleteTask,
  filterTasks,
  createTask,
  chnageTaskStatus,
  deleteTodolist,
  changeTaskTitle,
  changeTodolistTitle
}: TodolistItemProps) => {

  const createTaskHandler = (title: string) => {
    createTask(todolist.id, title);

  };
  const changeFilterHandler = (filter: FilterValues) => {
    filterTasks(todolist.id, filter);
  };

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle(todolist.id, title);
  };

  const deleteTodolistHandler = () => deleteTodolist(todolist.id);
  return (
    <div>
      <div className=
        {'container'}>
        <h3>

          <EditableSpan
            changeItem={changeTodolistTitleHandler}
            value={todolist.title}
          />
        </h3>
        <IconButton onClick={deleteTodolistHandler}>
          <DeleteIcon />
        </IconButton>
      </div>

      <CreateItemForm createItem={createTaskHandler} />
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasks.map(t => {
            const deleteTaskHandler = () => deleteTask(todolist.id, t.id);

            const changeTaskTitleHandler = (title: string) => {
              changeTaskTitle(todolist.id, t.id, title);
            };
            return (
              <ListItem
                key={t.id + "----" + self.crypto.randomUUID()}
                sx={getListItemSx(t.isDone)}
              >
                <Checkbox checked={t.isDone} onChange={(e: ChangeEvent<HTMLInputElement>) => chnageTaskStatus(todolist.id, t.id, e.currentTarget.checked)} />

                <EditableSpan changeItem={changeTaskTitleHandler} value={t.title} />
                <IconButton onClick={deleteTaskHandler}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            );
          }
          )}
        </List>
      )}

      <Box sx={containerSx}>
        <Button variant={todolist.filter === 'all' ? 'outlined' : 'text'}
          color={'inherit'}
          onClick={() => changeFilterHandler('all')}>
          All
        </Button>
        <Button
          variant={todolist.filter === 'active' ? 'outlined' : 'text'}
          color={'primary'}
          onClick={() => changeFilterHandler('active')}>
          Active
        </Button>
        <Button variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
          color={'secondary'}
          onClick={() => changeFilterHandler('completed')}>
          Completed
        </Button>
      </Box>
    </div >
  );
};