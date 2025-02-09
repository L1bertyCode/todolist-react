import { Todolist } from "../App";

export type DeleteTodolistAction = {
  type: 'delete_todolist';
  payload: {
    id: string;
  };
};

type Actions = DeleteTodolistAction;

const initialState: Todolist[] = [];

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
  switch (action.type) {
    case 'delete_todolist': {
      return state.filter(tl => tl.id !== action.payload.id);
    }
    default:
      return state;
  }
};