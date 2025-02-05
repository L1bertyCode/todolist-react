import { useState } from 'react';
import './App.css';
import { TodolistItem } from './TodolistItem/TodolistItem';
import { v1 } from 'uuid';

export interface Task {
  id: string,
  title: string,
  isDone: boolean;
}
export type FilterType = "all" | "active" | "completed";

export const App = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [tasks, setTasks] = useState<Task[]>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
  ]);


  const deleteTask = (taskId: string) => {
    setTasks([...tasks.filter(t => t.id !== taskId)]);
  };

  const filterTasks = (filter: FilterType) => {
    setFilter(filter);
  };

  const createTask = (title: string) => {
    setTasks([{ id: v1(), title, isDone: false }, ...tasks]);
  };

  const chnageTaskStatus = (taksId: string, isDone: boolean) => {
    setTasks([...tasks.map(t => t.id === taksId ? { ...t, isDone } : t)]);
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
        deleteTask={deleteTask}
        filterTasks={filterTasks}
        createTask={createTask}
        chnageTaskStatus={chnageTaskStatus}
        title="What to learn" tasks={filtredTasks} />
    </div>
  );
};
