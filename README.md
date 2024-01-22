# Tic-tac-toe-odin
This code implements a simple Tic-Tac-Toe game using HTML, CSS, and JavaScript. The game structure follows the Module Pattern, where the functionality is organized into two main modules: gameboard and game.

createPlayer(name, symbol)
This function creates a player object with a given name and symbol.

gameboard Module
This module handles the game board, drawing the UI, updating moves, checking for a win or draw, and resetting the board.

drawBoard(): Draws the game board UI by creating HTML elements for each cell.

render(player): Updates the UI to reflect the current state of the game board.

updateMoves(player, id): Updates the internal moves array and calls render.

checkWin(player): Checks if the current player has won the game.

resetBoard(): Resets the game board and clears the moves.

updateAnnouncer(string): Updates the message displayed on the UI.

checkDraw(): Checks if the game is a draw.

game Module
This module manages the game state, including players, scores, starting and restarting the game, handling player turns, and updating the score display.

startGame(): Initializes the game by setting up event listeners, creating players, and starting the game loop.

restartGame(): Handles the restart functionality, resetting players and scores.

playerSwitch(): Switches the current player.

resetPlayerIndex(): Resets the player index to the default.

markBoard(): Listens for cell clicks and updates the game board accordingly.

setScoreCounter(): Updates the score display.

drawScoreUpdate(): Increments both players' scores in case of a draw.

scoreCounter(name): Increments the score for the specified player.

toggleInputsAndScore(): Toggles the display of input and score containers.

timeout(): Handles a timeout after a game round, resetting the board and hiding an overlay.

Execution Flow:
Clicking the "Start Game" button initializes players, draws the board, and sets up event listeners.
Players take turns clicking cells to make their moves.
The game checks for a win or draw after each move.
If the game ends, the scores are updated, and the board is reset after a timeout.
Clicking the "Restart Game" button resets the entire game.
