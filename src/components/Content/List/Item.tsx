import React from "react";
import { StringLocale } from "yup/lib/locale";
import { useTodo } from "../../../contexts/TodoContext";
import { ITodoItem } from "../../../models/Item";

function Item({ todo }:{todo:ITodoItem}) {
  const { destroyTodo, toggleTodo } = useTodo();
  const onChange = (id:string) => toggleTodo(id);
  const onDestroy = (id:string) => destroyTodo(id);
  console.log(todo)
  return (
    <li key={todo.id} className={todo.completed ? "completed" : ""}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => onChange(todo.id)}
        />
        <label>{todo.text}</label>
        <button className="destroy" onClick={() => onDestroy(todo.id)}></button>
      </div>
    </li>
  );
}

export default Item;
