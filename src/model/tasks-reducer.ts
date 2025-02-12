import { v1 } from 'uuid';
import type { TasksState } from '../App';
import { CreateTodolistAction, DeleteTodolistAction } from './todolists-reducer';

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

export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>;
export type CreateTaskAction = ReturnType<typeof createTaskAC>;


type Actions = CreateTodolistAction | DeleteTodolistAction | DeleteTaskAction |
  CreateTaskAction;

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
  switch (action.type) {
    case 'create_todolist': {
      return { ...state, [action.payload.id]: [] };
    }
    case 'delete_todolist': {
      delete state[action.payload.id];
      return { ...state };
    }
    case 'delete_task': {
      return {
        ...state,
        [action.payload.todolistId]: [...state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)]
      };
    }
    case "create_task": {
      return {
        ...state,
        [action.payload.todolistId]: [
          { id: v1(), title: action.payload.title, isDone: false },
          ...state[action.payload.todolistId]
        ]
      };
    }
    default:
      return state;
  }
};

