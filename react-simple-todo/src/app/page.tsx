"use client";

import TodoItem from "@/components/TodoItem";
import { ToDo } from "@/types";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import Config from "@/config.json"

function retrieveFromLocalStorage(): ToDo[]{
  const todosJson = localStorage.getItem(Config.LOCAL_STORAGE_KEY);

  if (todosJson){
    return JSON.parse(todosJson)
  }

  return [];
}

function todosAsMap(todos: ToDo[]): Map<number, ToDo> {
  const map = new Map<number, ToDo>();

  todos.forEach((todo) => {
    map.set(todo.id, todo);
  });

  return map;
}

export default function Home() {
  const [todos, setTodos] = useState<Map<number, ToDo>>(todosAsMap(retrieveFromLocalStorage()));
  const nextId = useRef(todos.size > 0 ? Math.max(...Array.from(todos.keys())) + 1 : 0);

  useEffect(() => { localStorage.setItem(Config.LOCAL_STORAGE_KEY, JSON.stringify(Array.from(todos.values())))}, [todos]);

  function handleNewTodo(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const newTodoContent: string = formData.get("newTodo") as string;

    // TODO errors written on the page instead of alerts
    if (newTodoContent === "") {
      alert("Todo cannot be empty.");
      return;
    }

    const newTodo: ToDo = {
      id: nextId.current++,
      isCompleted: false,
      content: newTodoContent,
    };

    setTodos(new Map(todos).set(newTodo.id, newTodo));
  }

  function handleTodoEdit(id: number, newContent: string): void {
    if (newContent === "") {
      return;
    }

    const todo: ToDo | undefined = todos.get(id);

    if (todo === undefined) {
      console.error(`Todo with ID ${id} does not exist!`);
      return;
    }

    todo.content = newContent;

    setTodos(new Map(todos).set(id, todo));
  }

  function handleStatusChange(id: number, newStatus: boolean): void {
    const todo: ToDo | undefined = todos.get(id);

    if (todo === undefined) {
      console.error(`Todo with ID ${id} does not exist!`);
      return;
    }

    todo.isCompleted = newStatus;

    setTodos(new Map(todos).set(id, todo));
  }

  function handleRemove(id: number): void {
    if (!todos.delete(id)) {
      console.error(`Error when deleting todo #${id}`);
    }

    setTodos(new Map(todos));
  }

  return (
    <>
      <ul>
        {Array.from(todos, ([id, todo]) => (
          <li key={id}>
            <TodoItem
              todo={todo}
              onEdit={(newContent: string) => handleTodoEdit(id, newContent)}
              onToggleCompletion={(newStatus: boolean) =>
                handleStatusChange(id, newStatus)
              }
              onRemove={() => handleRemove(id)}
            />
          </li>
        ))}
      </ul>
      <form onSubmit={handleNewTodo}>
        <input type="text" name="newTodo" className="text-black" />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}
