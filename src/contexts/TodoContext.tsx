import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ITodoItem } from "../models/Item";

interface ICreateContext{
  todos:ITodoItem[]
  setTodos:any
  addTodo: (text:string) => void
  toggleTodo: (id:string) => void
  destroyTodo: (id:string) => void
  filter:string,
  setFilter:any,
}

const TodoContext = createContext<ICreateContext | undefined>(undefined);

export const TodoProvider = ({ children }:{children:any}) => {
  const [filter, setFilter] = useState<string>("all");
  const [todos, setTodos] = useState<ITodoItem[]>([
    {
      id: uuidv4(),
      text: "Learn React",
      completed: false,
    },
  ]);
  const addTodo = (text:string) =>
    setTodos((prev) => [...prev, { id: uuidv4(), completed: false, text }]);

  const toggleTodo = (id:string) => {
    const cloned_todos = [...todos];

    const itemIndex = cloned_todos.findIndex((todo) => todo.id === id);
    const item = todos[itemIndex];
    item.completed = !item.completed;

    setTodos(cloned_todos);
  };
  const destroyTodo = (id:string) => {
    const cloned_todos = [...todos];
    const ItemIndex = cloned_todos.findIndex((todo) => todo.id === id);
    cloned_todos.splice(ItemIndex, 1);
    setTodos(cloned_todos);
  };

  const values = {
    todos,
    setTodos,
    addTodo,
    toggleTodo,
    destroyTodo,
    filter,
    setFilter,
  };

  return <TodoContext.Provider value={values}>{children}</TodoContext.Provider>;
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodo hook must be call inside TodoProvider component");
  }
  return context;
};
