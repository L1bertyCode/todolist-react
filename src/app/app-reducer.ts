export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
export type ThemeMode = "dark" | "light";
type InitialState = typeof initialState;


const initialState = {
  themeMode: "light" as ThemeMode,
  status: 'idle' as RequestStatus,
  error: null as string | null,
};

export const changeThemeModeAC = (payload: { themeMode: ThemeMode; }) => {
  return { type: 'CHANGE-THEME', payload } as const;
};

export const setAppStatusAC = (status: RequestStatus) => {
  return {
    type: 'SET-STATUS', payload: {
      status: status
    }
  } as const;
};

export const setAppErrorAC = (error: string | null) => {
  return {
    type: 'SET-ERROR',
    payload: { error },
  } as const;
};

type ChnageThemeActionType = ReturnType<typeof changeThemeModeAC>;
type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;


type ActionsType = SetAppStatusActionType | ChnageThemeActionType | SetAppErrorActionType;


export const appReducer = (
  state: InitialState = initialState,
  action: ActionsType
): InitialState => {
  switch (action.type) {
    case 'CHANGE-THEME':
      return { ...state, themeMode: action.payload.themeMode };

    case 'SET-STATUS':
      return { ...state, status: action.payload.status };

    case 'SET-ERROR':
      return { ...state, error: action.payload.error };

    default:
      return state;
  }
};
