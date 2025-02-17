// import { FilterValues, Todolist } from "../../../app/App";
// import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";

import { Dispatch } from 'redux'
import { FilterValues } from "@/app/App";
import { Todolist } from "../api/todolistsApi.types";
import { todolistsApi } from '../api/todolistsApi';
import { RootState } from '@/app/store';


export type DomainTodolist = Todolist & {
  filter: FilterValues
}

const initialState: DomainTodolist[] = [];

export const setTodolistsAC = (todolists: DomainTodolist[]) => {
  return { type: 'SET-TODOLISTS', todolists } as const
}
export const addTodolistAC = (payload:{todolist:DomainTodolist}) => {
  return { 
    type: 'CREATE-TODOLIST', payload 
  } as const
}
 
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
 
export type CreateTodolistActionType = ReturnType<typeof addTodolistAC>

type ActionsType= SetTodolistsActionType|CreateTodolistActionType


export const todolistsReducer = (
  state: DomainTodolist[] = initialState,
  action: ActionsType
): DomainTodolist[] => {
  switch (action.type) {
    case 'SET-TODOLISTS': {
      return action.todolists.map(tl => ({ ...tl }))
    }
    case 'CREATE-TODOLIST': {
      return [
        ...state,
        action.payload.todolist
      ]
    }
    default :{
      return state
    }
  }
}

 
export const fetchTodolistsThunk = (dispatch: Dispatch, getState: () => RootState) => {
  // внутри санки можно делать побочные эффекты (запросы на сервер)
  todolistsApi.getTodolists().then(res => {
    // и диспатчить экшены (action) или другие санки (thunk)
    console.log("getState()",getState());
    
    dispatch(setTodolistsAC(res.data))
  })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  // todolistsApi.createTodolist(title).then(res => {
  //   dispatch(addTodolistAC({todolist:res.data.data.item}))

  // })
}




// export const deleteTodolistAC = createAction<{ id: string; }>("todolists/deleteTodolist");

// export const createTodolistAC = createAction("todolists/createTodolist", (title: string) => {
//   return { payload: { title, id: nanoid() } };
// });

// export const changeTodolistTitleAC = createAction<{ id: string; title: string; }>("todolists/changeTodolistTitle");

// export const changeTodolistFilterAC = createAction<{ id: string; filter: FilterValues; }>(
//   "todolists/changeTodolistFilter",
// );

// export const setTodolistsAC = createAction<{ todolists: Todolist[]; }>(
//   "todolists/setTodolist",
  
// );


// export const todolistsReducer = createReducer(initialState, (builder) => {
//   builder.addCase(deleteTodolistAC, (state, action) => {
//     const index = state.findIndex((todolist) => todolist.id === action.payload.id);
//     if (index !== -1) {
//       state.splice(index, 1);
//     }
//   });
//   builder.addCase(createTodolistAC, (state, action) => {
//     state.push({ ...action.payload, filter: "all" });
//   });
//   builder.addCase(changeTodolistTitleAC, (state, action) => {
//     const index = state.findIndex((todolist) => todolist.id === action.payload.id);
//     if (index !== -1) {
//       state[index].title = action.payload.title;
//     }
//   });
//   builder.addCase(changeTodolistFilterAC, (state, action) => {
//     const todolist = state.find((todolist) => todolist.id === action.payload.id);
//     if (todolist) {
//       todolist.filter = action.payload.filter;
//     }
//     builder.addCase(setTodolistsAC, (state, action) => {
//       state = action.payload.todolists;
//       console.log(state);
//     });
//   });
// });
