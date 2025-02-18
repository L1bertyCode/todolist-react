import { nanoid } from "@reduxjs/toolkit";

import {
  addTodolistAC,
  changeTodolistFilterAC,
  DomainTodolist,
  removeTodolistAC,
  todolistsReducer,
  updateTodolistTitleAC,
} from "../todolists-reducer";

import { beforeEach, expect, test } from "vitest";

let todolistId1: string;
let todolistId2: string;
let startState: DomainTodolist[] = [];

beforeEach(() => {
  todolistId1 = nanoid();
  todolistId2 = nanoid();

  startState = [
    { id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0 },
    { id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0 },
  ];
});

test("correct todolist should be deleted", () => {
  // 2. Действие
  // const action = {
  //   type: 'delete_todolist',
  //   payload: {
  //     id: todolistId1,
  //   },
  // } as const;
  const endState = todolistsReducer(startState, removeTodolistAC({ todolistId: todolistId1 }));

  // 3. Проверка, что действие измененило state соответствующим образом
  // в массиве останется один тудулист
  expect(endState.length).toBe(1);
  // удалится нужный тудулист, не любой
  expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be created", () => {
  const title = "New todolist";
  const newTodolist: DomainTodolist = {
    id: nanoid(), title: title, filter: "all", addedDate: "", order: 0
  };
  const endState = todolistsReducer(startState, addTodolistAC({ todolist: newTodolist }));

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(title);
});

test("correct todolist should change its title", () => {
  const title = "New title";
  const endState = todolistsReducer(startState, updateTodolistTitleAC({ id: todolistId2, title }));

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(title);
});

test("correct todolist should change its filter", () => {
  const filter = "completed";
  const endState = todolistsReducer(startState, changeTodolistFilterAC({ id: todolistId2, filter }));

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(filter);
});
