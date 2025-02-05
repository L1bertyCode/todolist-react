import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValues, Task, Todolist } from "../App";
import { Button } from "../Button/Button";

interface TodolistItemProps {
  todolist: Todolist;
  tasks: Task[];
  deleteTask: (todolistId: string, taskId: string) => void;
  filterTasks: (todolistId: string, filter: FilterValues) => void;
  createTask: (todolistId: string, title: string) => void;
  chnageTaskStatus: (todolistId: string, taksId: string, isDone: boolean) => void;
  deleteTodolist: (todolistId: string) => void;
}

export const TodolistItem = ({
  todolist,
  tasks,
  deleteTask,
  filterTasks,
  createTask,
  chnageTaskStatus,
  deleteTodolist
}: TodolistItemProps) => {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [error, setError] = useState<string | null>("");

  const createTaskHandler = () => {
    if (taskTitle.trim() !== "") {
      createTask(todolist.id, taskTitle);
      setTaskTitle("");
    } else {
      setError('Title is required');
    }
  };

  const changeFilterHandler = (filter: FilterValues) => {
    filterTasks(todolist.id, filter);
  };

  return (
    <div>
      <div className={'container'}>
        <h3>{todolist.title}</h3>
        <Button title={"x"} onClick={() => deleteTodolist(todolist.id)} />
      </div>
      <div>
        <input
          className={`input ${error && "error"}`}
          value={taskTitle}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTaskTitle(e.currentTarget.value);
            setError(null);

          }}
          onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              createTaskHandler();
            }
          }}
        />
        <Button title={"+"} onClick={createTaskHandler} />
        {error && <div className={'error-message'}>{error}</div>}
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map(t => {
            const deleteTaskHadler = () => deleteTask(todolist.id, t.id);
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
                <span>{t.title}</span>
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