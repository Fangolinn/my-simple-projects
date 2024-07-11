function Cell({ state, moveHandler }: any) {
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
