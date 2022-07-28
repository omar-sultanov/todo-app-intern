import React from "react";
import { useTodo } from "../../../contexts/TodoContext";
import { ITodoItem } from "../../../models/Item";
import Item from "./Item";

let filtered = null;

function List() {
  const { todos, filter } = useTodo();
  filtered = todos;
  if (filter !== "all") {
    filtered = todos.filter((todo:ITodoItem) =>
        filter === "active" ? todo.completed === false : todo.completed === true
      );
  }
  return (
    <ul className="todo-list">
      {filtered.map((todo:ITodoItem) => (
        <Item key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default List;
