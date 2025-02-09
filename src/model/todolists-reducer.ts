import { v1 } from "uuid";
import { Todolist } from "../App";



type Actions = DeleteTodolistAction | CreateTodolistAction;

const initialState: Todolist[] = [];

export const deleteTodolistAC = (id: string) => {
  return { type: 'delete_todolist', payload: { id } } as const;
};

export const createTodolistAC = (title: string) => {
  return { type: 'create_todolist', payload: { title } } as const;
};


export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
  switch (action.type) {
    case 'delete_todolist': {
      return state.filter(tl => tl.id !== action.payload.id);
    }
    case 'create_todolist': {
      return [...state, { id: v1(), title: action.payload.title, filter: "all" }];
    }
    default:
      return state;
  }
};

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>;
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>;