import { Task } from "../App";
import { Button } from "../Button/Button";

interface TodolistItemProps {
  title: string;
  tasks: Task[];
}
export const TodolistItem = ({ title, tasks }: TodolistItemProps) => {
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
              <input type="checkbox" checked={t.isDone} /> <span>{t.title}</span>
            </li>
          )
          )}
        </ul>
      )}
      <div>
        <Button title={'All'} />
        <Button title={'Active'} />
        <Button title={'Completed'} />
      </div>
    </div>
  );
};