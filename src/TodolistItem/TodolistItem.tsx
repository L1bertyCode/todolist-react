import { ChangeEvent } from "react";
import { FilterValues, Todolist } from "../app/App";

import { CreateItemForm } from "../CreateItemForm/CreateItemForm";
import { EditableSpan } from "../EditableSpan/EditableSpan";

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { Box, Checkbox } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { containerSx, getListItemSx } from "./TodolistItem.styles";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC } from "@/model/tasks-reducer";
import { changeTodolistFilterAC } from "@/model/todolists-reducer";
import { selectTasks } from "@/model/tasks-selectors";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { TodolistTitle } from "@/common/components/TodolistTitle/TodolistTitle";


interface TodolistItemProps {
  todolist: Todolist;
}

export const TodolistItem = ({
  todolist,
}: TodolistItemProps) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);

  const createTask = (title: string) => {
    dispatch(createTaskAC({ todolistId: todolist.id, title: title }));
  };
  const filterTasks = (filter: FilterValues) => {
    dispatch(changeTodolistFilterAC({ id: todolist.id, filter }));
  };

  let filtredTasks = tasks[todolist.id];
  if (todolist.filter === "completed") {
    filtredTasks = tasks[todolist.id].filter(t => t.isDone);
  }
  if (todolist.filter === "active") {
    filtredTasks = tasks[todolist.id].filter(t => !t.isDone);
  }
  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm createItem={createTask} />
      {filtredTasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filtredTasks.map(t => {
            const deleteTask = () => {
              dispatch(
                deleteTaskAC({ todolistId: todolist.id, taskId: t.id })
              );
            };

            const changeTaskTitle = (title: string) => {
              dispatch(changeTaskTitleAC({ todolistId: todolist.id, taskId: t.id, title: title }));
            };
            const chnageTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
              dispatch(changeTaskStatusAC({ todolistId: todolist.id, taskId: t.id, isDone: e.currentTarget.checked }));
            };
            return (
              <ListItem
                key={t.id + "----" + self.crypto.randomUUID()}
                sx={getListItemSx(t.isDone)}
              >
                <Checkbox checked={t.isDone} onChange={chnageTaskStatus} />

                <EditableSpan onChange={changeTaskTitle} value={t.title} />
                <IconButton onClick={deleteTask}>
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
          onClick={() => filterTasks('all')}>
          All
        </Button>
        <Button
          variant={todolist.filter === 'active' ? 'outlined' : 'text'}
          color={'primary'}
          onClick={() => filterTasks('active')}>
          Active
        </Button>
        <Button variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
          color={'secondary'}
          onClick={() => filterTasks('completed')}>
          Completed
        </Button>
      </Box>
    </div >
  );
};