import { useState } from "react";
import { MOVE } from "../route/Game";
import { use } from "react";

export const ChessBoard = ({ chess, setBoard, board, socket }) => {
  const [from, setFrom] = useState(null);
  const [color, setColor] = useState("w");

  const handleSquareClick = (squareRepresentation, square) => {
    if (from === squareRepresentation) {
      setFrom(null);
      return;
    }
    if (!from) {
      setFrom(squareRepresentation); // Set "from" position
    } else {
      socket.send(
        JSON.stringify({
          type: MOVE,
          payload: {
            move: {
              from,
              to: squareRepresentation,
            },
          },
        })
      );
      chess.move({ from, to: squareRepresentation }); // Perform the move
      setBoard(chess.board()); // Update the board
      setFrom(null); // Reset "from"
    }
  };

  const handleRightClick = (e, squareRepresentation) => {
    if (e.type === "contextmenu") {
      e.preventDefault();
      console.log("right click");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="text-white col-span-11">
        {board.map((row, i) => (
          <div className="flex" key={i}>
            {row.map((square, j) => {
              const squareRepresentation =
                String.fromCharCode(97 + j) + (8 - i);

              return (
                <div
                  key={j}
                  onClick={() =>
                    handleSquareClick(squareRepresentation, square)
                  }
                  onContextMenu={(e) => {
                    handleRightClick(e, squareRepresentation);
                  }}
                  className={`relative w-20 h-20 flex justify-center  ${
                    color === "w"
                      ? (i + j) % 2 === 0
                        ? "bg-gray-400"
                        : "bg-gray-300"
                      : (i + j) % 2 === 1
                      ? "bg-gray-400"
                      : "bg-gray-300"
                  }`}
                >
                  {/* Rank notation */}
                  {j === 0 && (
                    <div className="pt-5 absolute left-1 top-1 transform -translate-y-1/2 text-sm text-gray-700">
                      {color === "w" ? 8 - i : i + 1}
                    </div>
                  )}
                  {/* File notation */}
                  {i === 7 && (
                    <div className="absolute bottom-1 right-1 transform -translate-x-1/2 text-sm text-gray-700">
                      {String.fromCharCode(color === "w" ? 97 + j : 104 - j)}
                    </div>
                  )}
                  {/* Chess piece */}
                  {square ? (
                    <img
                      className="max-w-16 max-h-16 pt-2"
                      src={`./${
                        color === "w"
                          ? square.color === "b"
                            ? square.type
                            : `${square.type.toUpperCase()}w`
                          : square.color === "w"
                          ? square.type
                          : `${square.type.toUpperCase()}w`
                      }.svg`}
                      // alt={`${square.color} ${square.type}`}
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="ml-4 mt-3">
        <button
          onClick={() => {
            color === "b" ? setColor("w") : setColor("b");
          }}
          className=" text-white"
          title="flip board"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
