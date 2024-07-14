function Cell({
  state,
  moveHandler,
}: Readonly<{ state: string; moveHandler: () => void }>) {
  return (
    <button
      className="border-[var(--foreground-rgb)] border-2 aspect-square flex justify-center items-center"
      onClick={moveHandler}
      disabled={state != ""}
    >
      {state}
    </button>
  );
}

export default Cell;
