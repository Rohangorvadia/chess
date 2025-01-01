import { Chess } from "chess.js";
import { INIT_GAME, GAME_OVER, MOVE } from "./messages.js";

export class Game {
  player1;
  player2;
  board;
  moves = [];
  startTime;

  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.moves = [];
    this.startTime = new Date();
    this.player1.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: { color: "white" },
      })
    );
    this.player2.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: { color: "black" },
      })
    );
  }

  makeMove(socket, move) {
    // validate the type of move using zod

    // validate the move : DONE
    // is the move valid : DONE

    // is it the users move
    // this will stop black from moving when it is not their turn
    if (this.board.turn() === "w" && socket !== this.player1) {
      // this will send a message to opponent if they try to move when it is not their turn
      this.player2.send(
        JSON.stringify({
          type: "It is not your turn",
        })
      );
      return;
    }
    // this will stop white from moving when it is not their turn
    if (this.board.turn() === "b" && socket !== this.player2) {
      this.player1.send(
        JSON.stringify({
          type: "It is not your turn",
        })
      );
      return;
    }

    try {
      this.board.move(move);
    } catch (e) {
      console.log(e);
      return;
    }
    // update the board
    //  push the move  : WE DONT NEED TO DO THIS TWO BEACUSE WE ARE USING THE CHESS.JS LIBRARY

    if (this.board.isGameOver()) {
      this.player1.send(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: this.board.turn(),
          },
        })
      );
      this.player1.send(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: this.board.turn(),
          },
        })
      );
    }

    if (this.board.turn() === "b") {
      this.player2.send(JSON.stringify({ type: MOVE, payload: move }));
    } else {
      this.player1.send(JSON.stringify({ type: MOVE, payload: move }));
    }
    // check if the game is over
    // send the updated board to the users
  }
}
