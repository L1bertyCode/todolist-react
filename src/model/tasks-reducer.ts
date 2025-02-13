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


type Actions = CreateTodolistAction | DeleteTodolistAction | DeleteTaskAction |
  CreateTaskAction |
  ChangeTaskStatusAction |
  ChangeTaskTitleAction;

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
    case "change_task_status": {
      return {
        ...state,
        [action.payload.todolistId]:
          [
            ...state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? { ...t, isDone: action.payload.isDone } : t)
          ]
      };
    }
    case "change_task_title": {
      return {
        ...state,
        [action.payload.todolistId]: [
          ...state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? { ...t, title: action.payload.title } : t)
        ]
      };
    }
    default:
      return state;
  }
};

