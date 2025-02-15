import { instance } from "@/common/instance";
import { GetTasksResponse } from "./tasksApi.types";

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`);
  },
};
