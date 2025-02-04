import { FilterType, Task } from "../App";
import { Button } from "../Button/Button";

interface TodolistItemProps {
  title: string;
  tasks: Task[];
  deleteTask: (taskId: string) => void;
  filterTasks: (filter: FilterType) => void;
}
export const TodolistItem = ({ title, tasks, deleteTask, filterTasks }: TodolistItemProps) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <Button title={"+"} />
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map(t => (
            <li key={t.id + "----" + self.crypto.randomUUID()}>
              <input type="checkbox" checked={t.isDone} />
              <span>{t.title}</span>
              <Button title={"x"} onClick={() => deleteTask(t.id)} />
            </li>
          )
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