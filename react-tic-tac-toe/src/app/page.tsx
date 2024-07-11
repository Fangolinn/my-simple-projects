import Board from "@/components/Board";

export default function Game() {
  return (
    <div className="flex items-center flex-col">
      <div className="text-3xl font-bold my-3">Tic-Tac-Toe</div>
      <Board/>
    </div>
  );
}
