import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterType, Task } from "../App";
import { Button } from "../Button/Button";

interface TodolistItemProps {
  title: string;
  tasks: Task[];
  deleteTask: (taskId: string) => void;
  filterTasks: (filter: FilterType) => void;
  createTask: (title: string) => void;
  chnageTaskStatus: (taksId: string, isDone: boolean) => void;
}

export const TodolistItem = ({
  title,
  tasks,
  deleteTask,
  filterTasks,
  createTask,
  chnageTaskStatus
}: TodolistItemProps) => {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [error, setError] = useState<string | null>("");

  const createTaskHandler = () => {
    if (taskTitle.trim() !== "") {
      createTask(taskTitle);
      setTaskTitle("");
    } else {
      setError('Title is required');
    }
  };

  return (
    <div>
      <h3>{title}</h3>
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
            const deleteTaskHadler = () => deleteTask(t.id);
            return (
              <li key={t.id + "----" + self.crypto.randomUUID()}>
                <input
                  type="checkbox"
                  checked={t.isDone}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => chnageTaskStatus(t.id, e.currentTarget.checked)}
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
        <Button title={'All'} onClick={() => filterTasks("all")} />
        <Button title={'Active'} onClick={() => filterTasks("active")} />
        <Button title={'Completed'} onClick={() => filterTasks("completed")} />
      </div>
    </div>
  );
};