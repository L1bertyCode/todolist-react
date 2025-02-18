// import { FilterValues, Todolist } from "../../../app/App";
// import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";

import { Dispatch } from 'redux'
import { FilterValues } from "@/app/App";
import { Todolist } from "../api/todolistsApi.types";
import { todolistsApi } from '../api/todolistsApi';
import { RootState } from '@/app/store';


export type DomainTodolist = Todolist & {
  filter?: FilterValues
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

export const removeTodolistAC = (payload:{todolistId:string}) => {
  return { 
    type: 'REMOVE-TODOLIST', payload 
  } as const
}
export const updateTodolistTitleAC = (payload:{id:string,title:string}) => {
  return { 
    type: 'UPDATE-TODOLIST-TITLE', payload 
  } as const
}
export const changeTodolistFilterAC = (payload:{id:string,filter:FilterValues}) => {
  return { 
    type: 'CHANGE-TODOLIST-FILTER', payload 
  } as const
}
 
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
 
export type CreateTodolistActionType = ReturnType<typeof addTodolistAC>
 
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
 
export type UpdateTodolistTitleActionType = ReturnType<typeof updateTodolistTitleAC>
 
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

type ActionsType= SetTodolistsActionType|CreateTodolistActionType|RemoveTodolistActionType|UpdateTodolistTitleActionType|ChangeTodolistFilterActionType


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
    case 'REMOVE-TODOLIST': {
      return [
        ...state.filter(tl=>tl.id!==action.payload.todolistId)
      ]
    }
    case 'UPDATE-TODOLIST-TITLE': {
      return [
        ...state.map(tl=>tl.id===action.payload.id?{...tl,title:action.payload.title}:tl)
      ]
    }
    case 'CHANGE-TODOLIST-FILTER': {
      return [
        ...state.map(tl=>tl.id===action.payload.id?{...tl,filter:action.payload.filter}:tl)
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
  todolistsApi.createTodolist(title).then(res => {
    dispatch(addTodolistAC({todolist:res.data.data.item}))
  })
}
export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
  todolistsApi.deleteTodolist(id).then(()=>{
    dispatch(removeTodolistAC({todolistId:id}));
  })
}

export const updateTodolistTitleTC =
  (arg: { id: string; title: string }) => (dispatch: Dispatch) => {
    todolistsApi.changeTodolistTitle(arg).then(()=>dispatch(updateTodolistTitleAC(arg))
    )
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
