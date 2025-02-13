import type { TasksState } from '../app/App';
import { createTodolistAC, CreateTodolistAction, deleteTodolistAC, DeleteTodolistAction } from './todolists-reducer';
import { createReducer } from '@reduxjs/toolkit';

const initialState: TasksState = {};




export const deleteTaskAC = ({ todolistId, taskId }: { todolistId: string, taskId: string; }) => {
  return {
    type: "delete_task",
    payload: {
      todolistId: todolistId,
      taskId: taskId,
    }
  } as const;
};

export const createTaskAC = ({ todolistId, title }: { todolistId: string, title: string; }) => {
  return {
    type: "create_task",
    payload: {
      todolistId: todolistId,
      title: title
    }
  } as const;
};

export const changeTaskStatusAC = ({ todolistId, taskId, isDone }: { todolistId: string, taskId: string, isDone: boolean; }) => {
  return {
    type: "change_task_status",
    payload: {
      todolistId: todolistId, taskId: taskId,
      isDone: isDone
    }
  } as const;
};

export const changeTaskTitleAC = ({ todolistId, taskId, title }: { todolistId: string, taskId: string, title: string; }) => {
  return {
    type: "change_task_title",
    payload: {
      todolistId: todolistId, taskId: taskId,
      title: title
    }
  } as const;
};


export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>;
export type CreateTaskAction = ReturnType<typeof createTaskAC>;
export type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>;
export type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>;


export type Actions = CreateTodolistAction | DeleteTodolistAction | DeleteTaskAction |
  CreateTaskAction |
  ChangeTaskStatusAction |
  ChangeTaskTitleAction;

export const tasksReducer = createReducer(initialState, builder => {
  builder
    .addCase(createTodolistAC, (state, action) => {
      state[action.payload.id] = [];
    });
  builder
    .addCase(deleteTodolistAC, (state, action) => {
      delete state[action.payload.id];
    });
});