import { instance } from "@/common/instance";
import type { Todolist } from "./todolistsApi.types";
import { BaseResponse } from "@/common/types";
import { DomainTodolist } from "../model/todolists-reducer";

export const todolistsApi = {
  getTodolists() {
    return instance.get<DomainTodolist[]>("/todo-lists");
  },

  changeTodolistTitle(payload: { id: string; title: string; }) {
    const { title, id } = payload;
    return instance.put<BaseResponse>(`/todo-lists/${id}`, { title });
  },

  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist; }>>(`/todo-lists`, { title });
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${id}`);
  },
};
