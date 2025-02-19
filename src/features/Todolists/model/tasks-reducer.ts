// import { createTodolistAC, deleteTodolistAC } from "./todolists-reducer"
// import { createAction, createReducer, nanoid } from "@reduxjs/toolkit"

import type { TasksState } from "@/app/App";
import { Dispatch } from "@reduxjs/toolkit";
import { tasksApi } from "../api/tasksApi";
import { DomainTask, UpdateTaskModel } from "../api/tasksApi.types";
import { ResultCode, TaskStatus } from "@/common/enums";
import { RootState } from "@/app/store";
import { CreateTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer";
import { setAppErrorAC, setAppStatusAC } from "@/app/app-reducer";


const initialState: TasksState = {};

export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[]; }) => {
  return {
    type: 'SET-TASKS',
    payload,
  } as const;
};

export const addTaskAC = (payload: { task: DomainTask; }) => {
  return { type: "ADD-TASK", payload } as const;
};

export const removeTaskAC = (payload: { taskId: string, todolistId: string; }) => {
  return {
    type: 'REMOVE-TASK',
    payload,
  } as const;
};

export const changeTaskStatusAC = (payload: { taskId: string, todolistId: string; status: TaskStatus; }) => {
  return {
    type: "CHANGE-TASK-STATUS",
    payload
  } as const;
};
export const changeTaskTitleAC = (payload: { taskId: string, todolistId: string; title: string; }) => {
  return {
    type: "CHANGE-TASK-TITLE",
    payload
  } as const;
};
export const updateTaskAC = (payload: { taskId: string, todolistId: string; title?: string, status?: TaskStatus; }) => {
  return {
    type: "UPDATE-TASK",
    payload
  } as const;
};


export type SetTasksActionType = ReturnType<typeof setTasksAC>;
export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>;


type ActionsType = SetTasksActionType | AddTaskActionType | RemoveTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | UpdateTaskActionType | RemoveTodolistActionType | CreateTodolistActionType;



export const tasksReducer = (
  state: TasksState = initialState,
  action: ActionsType
): TasksState => {
  switch (action.type) {
    case 'SET-TASKS': {
      const stateCopy = { ...state };
      stateCopy[action.payload.todolistId] = action.payload.tasks;
      return stateCopy;
    }
    case 'ADD-TASK': {
      const newTask = action.payload.task;
      return { ...state, [newTask.todoListId]: [newTask, ...state[newTask.todoListId]] };
    }
    case 'REMOVE-TASK': {
      return {
        ...state,
        [action.payload.todolistId]: [...state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)],
      };
    }
    case 'CHANGE-TASK-STATUS': {
      return {
        ...state,
        [action.payload.todolistId]: [...state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? { ...t, status: action.payload.status } : t)],
      };
    }
    case 'CHANGE-TASK-TITLE': {
      return {
        ...state,
        [action.payload.todolistId]: [...state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? { ...t, title: action.payload.title } : t)],
      };
    }
    case 'UPDATE-TASK': {
      return {
        ...state,
        [action.payload.todolistId]: [...state[action.payload.todolistId].map(t => t.id === action.payload.taskId ?
          {
            ...t,
            title: action.payload?.title || t.title,
            status: action.payload?.status !== undefined ? action.payload.status : t.status

          }
          : t)],
      };
    }
    default: {
      return state;
    }
  }
};


export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'));
  tasksApi.getTasks(todolistId).then(res => {
    dispatch(setAppStatusAC('succeeded'));
    const tasks = res.data.items;
    dispatch(setTasksAC({ todolistId, tasks }));
  });
};

export const removeTaskTC =
  (arg: { taskId: string; todolistId: string; }) => (dispatch: Dispatch) => {
    tasksApi.deleteTask(arg).then(() => {
      dispatch(removeTaskAC(arg));
    });
  };

export const addTaskTC = (arg: { title: string, todolistId: string; }) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'));
  tasksApi.createTask(arg).then((res) => {
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(addTaskAC({ task: res.data.data.item }));
      dispatch(setAppStatusAC('succeeded'));
    } else {
      if (res.data.messages.length) {
        dispatch(setAppErrorAC(res.data.messages[0]));
      } else {
        dispatch(setAppErrorAC('Some error occurred'));
      }
      dispatch(setAppStatusAC('failed'));
    }
  })
    .catch((error) => {
      dispatch(setAppErrorAC(error.message));
      dispatch(setAppStatusAC("failed"));
    });
};
export const changeTaskStatusTC =
  (arg: { taskId: string; status: TaskStatus; todolistId: string; }) =>
    (dispatch: Dispatch, getState: () => RootState) => {
      const { taskId, todolistId, status } = arg;

      const allTasksFromState = getState().tasks;
      const tasksForCurrentTodolist = allTasksFromState[todolistId];
      const task = tasksForCurrentTodolist.find(t => t.id === taskId);

      if (task) {
        const model: UpdateTaskModel = {
          status,
          title: task.title,
          deadline: task.deadline,
          description: task.description,
          priority: task.priority,
          startDate: task.startDate,
        };

        tasksApi.updateTask({ taskId, todolistId, model }).then(() => {
          dispatch(changeTaskStatusAC(arg));
        });
      }
    };

export const changeTaskTitleTC =
  (arg: { taskId: string; title: string; todolistId: string; }) =>
    (dispatch: Dispatch, getState: () => RootState) => {
      const { taskId, todolistId, title } = arg;

      const allTasksFromState = getState().tasks;
      const tasksForCurrentTodolist = allTasksFromState[todolistId];
      const task = tasksForCurrentTodolist.find(t => t.id === taskId);

      if (task) {
        const model: UpdateTaskModel = {
          title,
          status: task.status,
          deadline: task.deadline,
          description: task.description,
          priority: task.priority,
          startDate: task.startDate,
        };

        tasksApi.updateTask({ taskId, todolistId, model }).then(() => {
          dispatch(changeTaskTitleAC(arg));
        });
      }
    };
export const updateTaskTC =
  (arg: { taskId: string; title?: string; status?: TaskStatus, todolistId: string; }) =>
    (dispatch: Dispatch, getState: () => RootState) => {
      const { taskId, todolistId, title, status } = arg;

      const allTasksFromState = getState().tasks;
      const tasksForCurrentTodolist = allTasksFromState[todolistId];
      const task = tasksForCurrentTodolist.find(t => t.id === taskId);

      if (task) {
        const model: UpdateTaskModel = {
          title: title || task.title,
          status: status !== undefined ? status : task.status,
          deadline: task.deadline,
          description: task.description,
          priority: task.priority,
          startDate: task.startDate,
        };

        tasksApi.updateTask({ taskId, todolistId, model }).then(res => {
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(updateTaskAC(arg));
          } else {
            if (res.data.messages.length) {
              dispatch(setAppErrorAC(res.data.messages[0]));
            } else {
              dispatch(setAppErrorAC('Some error occurred'));
            }
            dispatch(setAppStatusAC('failed'));
          }
        })
          .catch(error => {
            dispatch(setAppErrorAC(error.message));
            dispatch(setAppStatusAC('failed'));
          });
      }
    };

// export const deleteTaskAC = createAction<{ todolistId: string; taskId: string }>("tasks/deleteTask")
// export const createTaskAC = createAction<{ todolistId: string; title: string }>("tasks/createTask")

// export const changeTaskStatusAC = createAction<{ todolistId: string; taskId: string; isDone: boolean }>(
//   "tasks/changeTaskStatus",
// )

// export const changeTaskTitleAC = createAction<{ todolistId: string; taskId: string; title: string }>(
//   "tasks/changeTaskTitle",
// )

// export const tasksReducer = createReducer(initialState, (builder) => {
// builder.addCase(createTodolistAC, (state, action) => {
//   state[action.payload.id] = []
// })
// builder.addCase(deleteTodolistAC, (state, action) => {
//   delete state[action.payload.id]
// })

// builder.addCase(deleteTaskAC, (state, action) => {
//   const index = state[action.payload.todolistId].findIndex((t) => t.id === action.payload.taskId)
//   if (index !== -1) {
//     state[action.payload.todolistId].splice(index, 1)
//   }
// })

// builder.addCase(createTaskAC, (state, action) => {
//   state[action.payload.todolistId].unshift({ id: nanoid(), title: action.payload.title, isDone: false })
// })

// builder.addCase(changeTaskStatusAC, (state, action) => {
//   function changeEl(el: { id: string; title: string; isDone: boolean }) {
//     if (el.id === action.payload.taskId) {
//       return el
//     }
//   }
//   const t = state[action.payload.todolistId].find(changeEl)
//   if (t) {
//     t.isDone = action.payload.isDone
//   }
// })
// builder.addCase(changeTaskTitleAC, (state, action) => {
//   function changeEl(el: { id: string; title: string; isDone: boolean }) {
//     if (el.id === action.payload.taskId) {
//       return el
//     }
//   }
//   const t = state[action.payload.todolistId].find(changeEl)
//   if (t) {
//     t.title = action.payload.title
//   }
// })
// });
