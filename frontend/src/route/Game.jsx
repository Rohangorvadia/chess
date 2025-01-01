import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { ChessBoard } from "../components/ChessBoard";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";
import { Testing } from "../components/Testing";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const Game = () => {
  const socket = useSocket();
  // chess is main object to handle chess game
  const [chess, setChess] = useState(new Chess());
  // board is the current state of the chess board
  const [board, setBoard] = useState(chess.board());
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      switch (message.type) {
        case INIT_GAME: {
          // we only initialize the game once then at every move we update the board

          // here if we uncomment this line then the game will be reset every time so second player will not be able to play
          // setChess(new Chess());
          setBoard(chess.board());
          setStarted(true);
          break;
        }
        case MOVE: {
          const move = message.payload;
          // we make the move in chess object and update the board
          chess.move(move);
          setBoard(chess.board());
          break;
        }
        case GAME_OVER: {
          break;
        }
      }
    };
  }, [socket]);

  if (!socket) {
    return <div>Connecting...</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="pt-10 max-w-fit">
        <div className="grid grid-cols-6 gap-4 w-full">
          <div className="bg-gray-800 p-4 w-full col-span-4 flex justify-center">
            <ChessBoard
              chess={chess}
              setBoard={setBoard}
              board={board}
              socket={socket}
            />
          </div>
          <div className="bg-inherit p-4 w-full col-span-2 flex justify-center">
            <div className="pt-72">
              {!started && (
                <Button
                  onClick={() => {
                    socket.send(JSON.stringify({ type: INIT_GAME }));
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <Testing
        chess={chess}
        setBoard={setBoard}
        board={board}
        socket={socket}
      /> */}
    </div>
  );
};
