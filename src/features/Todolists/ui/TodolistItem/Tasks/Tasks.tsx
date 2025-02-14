import { Todolist } from "@/app/App";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { selectTasks } from "@/features/Todolists/model/tasks-selectors";
import { TaskItem } from "@/features/Todolists/ui/TodolistItem/Tasks/TaskItem/TaskItem";
import { List } from "@mui/material";



type Props = {
  todolist: Todolist;
};
export const Tasks = ({ todolist }: Props) => {

  const tasks = useAppSelector(selectTasks);

  let filtredTasks = tasks[todolist.id];
  if (todolist.filter === "completed") {
    filtredTasks = tasks[todolist.id].filter(t => t.isDone);
  }
  if (todolist.filter === "active") {
    filtredTasks = tasks[todolist.id].filter(t => !t.isDone);
  }
  return (
    <>
      {filtredTasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filtredTasks.map(t => {
            return (
              <TaskItem
                key={t.id}
                task={t}
                todolistId={todolist.id} />
            );
          }
          )}
        </List>
      )}
    </>
  );
}

