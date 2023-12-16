let gameboard = (() => {
    let moves = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let render = () => {
        for (let i = 0; i < 9; i += 3) {
            console.log(moves[i] + " " + moves[i + 1] + " " + moves[i + 2]);
        }
    }

    let checkWin = () => {
        if (moves[0] === moves[1] && moves[1] === moves[2] ||
            moves[3] === moves[4] && moves[4] === moves[5] ||
            moves[6] === moves[7] && moves[7] === moves[8]) {
            console.log("rows end");
            resetBoard();
        }
        if (moves[0] === moves[4] && moves[4] === moves[8] ||
            moves[2] === moves[4] && moves[4] === moves[6]) {
            console.log("diagonals end");
            resetBoard();
        }
        if (moves[0] === moves[3] && moves[3] === moves[6] ||
            moves[1] === moves[4] && moves[4] === moves[7] ||
            moves[2] === moves[5] && moves[5] === moves[8]) {
            console.log("columns end");
            resetBoard();
        }
    }

    let markBoard = (playerSymbol) => {
        let move = prompt("enter move: ");
        moves[move] = playerSymbol;
        render();
    }

    let resetBoard = () => {
        moves = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
        console.log("new game");
        render();
    }
    return {
        render,
        checkWin,
        markBoard
    }
})();

const Player = function (name, symbol) {
    const playerSymbol = symbol;
    const markBoard = () => {
        gameboard.markBoard(playerSymbol);
        gameboard.checkWin();
    }

    return {
        markBoard
    }
}

let player1 = Player('me', 'x');
let player2 = Player('you', 'o');