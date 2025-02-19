import { RequestStatus, ThemeMode } from "./app-reducer";
import { RootState } from "./store";

export const selectThemeMode = (state: RootState): ThemeMode => state.app.themeMode;

export const selectAppStatus = (state: RootState): RequestStatus => state.app.status;

export const selectAppError = (state: RootState) => state.app.error;
