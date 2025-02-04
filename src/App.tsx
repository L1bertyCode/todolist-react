import { useState } from 'react';
import './App.css';
import { TodolistItem } from './TodolistItem/TodolistItem';

export interface Task {
  id: string,
  title: string,
  isDone: boolean;
}
export type FilterType = "all" | "active" | "completed";

export const App = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: 'HTML&CSS', isDone: true },
    { id: "2", title: 'JS', isDone: true },
    { id: "3", title: 'ReactJS', isDone: false },
  ]);


  const deleteTask = (taskId: string) => {
    setTasks([...tasks.filter(t => t.id !== taskId)]);
  };

  const filterTasks = (filter: FilterType) => {
    setFilter(filter);
  };


  let filtredTasks = tasks;
  if (filter === "completed") {
    filtredTasks = tasks.filter(t => t.isDone);
  }
  if (filter === "active") {
    filtredTasks = tasks.filter(t => !t.isDone);
  }

  return (
    <div className="app">
      <TodolistItem
        filterTasks={filterTasks}
        deleteTask={deleteTask} title="What to learn" tasks={filtredTasks} />
    </div>
  );
};
