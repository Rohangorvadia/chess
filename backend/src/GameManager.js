import { Game } from "./Game.js";
import { INIT_GAME, MOVE } from "./messages.js";

export class GameManager {
  games = [];
  users = [];
  pandingUser = null;
  constructor() {
    this.games = [];
    this.pandingUser = null;
    this.users = [];
  }

  addUser(socket) {
    this.users.push(socket);
    this.addHandler(socket); // add the handler for the socket
  }

  removeUser(socket) {
    this.users = this.users.filter((user) => user !== socket);
    // stop the game becaause the user left
  }

  addHandler(socket) {
    socket.on("message", (data) => {
      const message = JSON.parse(data.toString());
      if (message.type === INIT_GAME) {
        if (this.pandingUser) {
          const game = new Game(this.pandingUser, socket);
          this.games.push(game);
          this.pandingUser = null;
          // start game
        } else {
          this.pandingUser = socket;
        }
      }

      if (message.type === MOVE) {
        const game = this.games.find(
          (game) => game.player1 === socket || game.player2 === socket
        );
        if (game) {
          game.makeMove(socket, message.payload.move);
        }
      }
    });
  }
}
