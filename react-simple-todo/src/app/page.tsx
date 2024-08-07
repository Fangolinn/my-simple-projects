"use client";

import React, { FormEvent, useEffect, useState } from "react";

type ToDo = {
  completed: boolean;
  content: string;
};

let testToDos: ToDo[] = [
  { completed: false, content: "aaa" },
  { completed: true, content: "bbb" },
];

export default function Home() {
  const [todos, setTodos] = useState<ToDo[]>(testToDos);

  const handleNewTodo = (e: FormEvent<HTMLFormElement>): void => {
    console.log("submit");

    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const newTodo: ToDo = { completed: false, content: formData.get("newTodo") as string };

    setTodos([...todos, newTodo]);
  };

  const todosJSX = todos.map((todo) => (
    <li key={todo.content}>
      <input
        type="checkbox"
        defaultChecked={todo.completed}
        id={todo.content}
      />
      <label htmlFor={todo.content}>{todo.content}</label>
    </li>
  ));

  return (
    <>
      <ul>{todosJSX}</ul>
      <form onSubmit={handleNewTodo}>
        <input
          type="text"
          name="newTodo"
          id="newTodo"
          className="text-black"
        />
        <input type="submit" value="Submit"/>
      </form>
    </>
  );
}
