import type { TasksState } from '../App';
import { CreateTodolistAction, DeleteTodolistAction } from './todolists-reducer';

const initialState: TasksState = {};


export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
  switch (action.type) {
    case 'create_todolist': {
      return { ...state, [action.payload.id]: [] };
    }
    case 'delete_todolist': {
      delete state[action.payload.id];
      return { ...state };
    }
    default:
      return state;
  }
};

type Actions = CreateTodolistAction | DeleteTodolistAction;