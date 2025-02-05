import { useState } from 'react';
import './App.css';
import { TodolistItem } from './TodolistItem/TodolistItem';
import { v1 } from 'uuid';

export type Todolist = {
  id: string;
  title: string;
  filter: FilterValues;
};


export interface Task {
  id: string,
  title: string,
  isDone: boolean;
}

export type TasksState = Record<string, Task[]>;

export type FilterValues = "all" | "active" | "completed";

export const App = () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodolists] = useState<Todolist[]>([
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ]);


  const [tasks, setTasks] = useState<TasksState>({
    [todolistId1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
  });


  const deleteTask = (todolistId: string, taskId: string) => {
    setTasks({ ...tasks, [todolistId]: [...tasks[todolistId].filter(t => t.id !== taskId)] });
  };

  const filterTasks = (todolistId: string, filter: FilterValues) => {
    setTodolists([...todolists.map(tl => tl.id === todolistId ? { ...tl, filter } : tl)]);
  };

  const createTask = (todolistId: string, title: string) => {
    setTasks({ ...tasks, [todolistId]: [{ id: v1(), title, isDone: false }, ...tasks[todolistId]] });
  };

  const chnageTaskStatus = (todolistId: string, taksId: string, isDone: boolean) => {
    setTasks({ ...tasks, [todolistId]: [...tasks[todolistId].map(t => t.id === taksId ? { ...t, isDone } : t)] });
  };

  const deleteTodolist = (todolistId: string) => {
    setTodolists([...todolists.filter(tl => tl.id !== todolistId)]);
    delete tasks[todolistId];
  };

  return (
    <div className="app">
      {todolists.map(tl => {
        let filtredTasks = tasks[tl.id];
        if (tl.filter === "completed") {
          filtredTasks = tasks[tl.id].filter(t => t.isDone);
        }
        if (tl.filter === "active") {
          filtredTasks = tasks[tl.id].filter(t => !t.isDone);
        }
        return (
          <TodolistItem
            todolist={tl}
            key={tl.id}
            deleteTask={deleteTask}
            filterTasks={filterTasks}
            createTask={createTask}
            chnageTaskStatus={chnageTaskStatus}
            tasks={filtredTasks}
            deleteTodolist={deleteTodolist}
          />
        );
      }
      )}
    </div>
  );
};
