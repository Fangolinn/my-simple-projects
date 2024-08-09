import { ToDo } from "@/types";
import { useRef } from "react";

type Props = {
  todo: ToDo;
  onEdit: (newContent: string) => void;
  onToggleCompletion: (newStatus: boolean) => void;
  onRemove: () => void;
};

function TodoItem(props: Readonly<Props>) {
  const htmlId = useRef(`todo-item-${props.todo.id.toString()}`);

  function handleEdit(): void {
    props.onEdit(prompt("Input new todo content.") as string);
  }

  function handleStatusChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e.target.type !== "checkbox") {
      console.error(
        `Todo status change handler triggered on element which is not a 'checkbox' -> ${e.target.tagName} type=${e.target.type}`
      );
    }

    props.onToggleCompletion(e.target.checked);
  }

  return (
    <>
      <input
        type="checkbox"
        defaultChecked={props.todo.isCompleted}
        id={htmlId.current}
        onChange={handleStatusChange}
      />
      <label
        htmlFor={htmlId.current}
        className={props.todo.isCompleted ? "line-through" : ""}
      >
        {props.todo.content}
      </label>
      <input
        type="button"
        value="edit"
        className="border-2 mx-4"
        onClick={handleEdit}
      />
      <input
        type="button"
        value="remove"
        className="border-2 mx-4"
        onClick={props.onRemove}
      />
    </>
  );
}

export default TodoItem;
