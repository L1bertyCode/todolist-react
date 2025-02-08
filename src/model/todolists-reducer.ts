import { Todolist } from "../App";

type Actions = {
  type: string;
  payload: any;
};

const initialState: Todolist[] = [];

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
  switch (action.type) {
    case 'delete_todolist': {
      return state; // логика удаления тудулиста
    }
    default:
      return state;
  }
};