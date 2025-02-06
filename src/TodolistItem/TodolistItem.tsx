import { ChangeEvent } from "react";
import { FilterValues, Task, Todolist } from "../App";
import { Button } from "../Button/Button";
import { CreateItemForm } from "../CreateItemForm/CreateItemForm";
import { EditableSpan } from "../EditableSpan/EditableSpan";

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
  return (
    <div>
      <div className=
        {'container'}>
        <EditableSpan
          changeItem={changeTodolistTitleHandler}
          value={todolist.title}
        />
        <Button title={"x"} onClick={() => deleteTodolist(todolist.id)} />
      </div>

      <CreateItemForm createItem={createTaskHandler} />
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map(t => {
            const deleteTaskHadler = () => deleteTask(todolist.id, t.id);

            const changeTaskTitleHandler = (title: string) => {
              changeTaskTitle(todolist.id, t.id, title);
            };
            return (
              <li
                key={t.id + "----" + self.crypto.randomUUID()}
                className={t.isDone ? 'is-done' : ''}
              >
                <input
                  type="checkbox"
                  checked={t.isDone}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => chnageTaskStatus(todolist.id, t.id, e.currentTarget.checked)}
                />
                <EditableSpan changeItem={changeTaskTitleHandler} value={t.title} />
                <Button title={"x"} onClick={deleteTaskHadler} />
              </li>
            );
          }
          )}
        </ul>
      )}
      <div>
        <Button
          className={todolist.filter === 'all' ? 'active-filter' : ''}
          title={'All'}
          onClick={() => changeFilterHandler("all")}
        />
        <Button
          className={todolist.filter === 'active' ? 'active-filter' : ''}
          title={'Active'}
          onClick={() => changeFilterHandler("active")}
        />
        <Button
          className={todolist.filter === 'completed' ? 'active-filter' : ''}
          title={'Completed'}
          onClick={() => changeFilterHandler("completed")}
        />
      </div>
    </div>
  );
};