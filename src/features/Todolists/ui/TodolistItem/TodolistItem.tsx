import { CreateItemForm } from "../../../../common/components/CreateItemForm/CreateItemForm";

import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { createTaskAC } from "@/features/Todolists/model/tasks-reducer";
import { TodolistTitle } from "@/features/Todolists/ui/TodolistItem/TodolistTitle/TodolistTitle";
import { FilterButtons } from "@/features/Todolists/ui/TodolistItem/FilterButtons/FilterButtons";
import { Todolist } from "@/app/App";
import { Tasks } from "@/features/Todolists/ui/TodolistItem/Tasks/Tasks";


interface TodolistItemProps {
  todolist: Todolist;
}

export const TodolistItem = ({
  todolist,
}: TodolistItemProps) => {
  const dispatch = useAppDispatch();

  const createTask = (title: string) => {
    dispatch(createTaskAC({ todolistId: todolist.id, title: title }));
  };
  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onChange={createTask} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div >
  );
};