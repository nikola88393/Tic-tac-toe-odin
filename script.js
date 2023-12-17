function createPlayer(name, symbol) {
    return {
        name: name,
        symbol: symbol
    }
}

let gameboard = (function () {
    let moves = ["", "", "", "", "", "", "", "", ""];

    let drawBoard = () => {
        let container = document.querySelector('.board');
        container.innerHTML = "";
        for (let i = 0; i < 9; i++) {
            let cell = document.createElement('div');
            cell.setAttribute('class', `cell`);
            cell.setAttribute('id', `cell${i}`);
            cell.innerHTML = moves[i];
            container.appendChild(cell);
        }
    }

    let render = (player) => {
        let cells = document.querySelectorAll('.cell');
        let i = 0;
        cells.forEach(cell => {
            cell.innerHTML = moves[i++];
        })
        checkWin(player);
    }

    let updateMoves = (player, id) => {
        moves[id] = player.symbol;

        render(player);
    }

    let checkWin = (player) => {
        if (moves[0] && moves[0] === moves[1] && moves[1] === moves[2] ||
            moves[3] && moves[3] === moves[4] && moves[4] === moves[5] ||
            moves[6] && moves[6] === moves[7] && moves[7] === moves[8]) {
            updateAnnouncer(`${player.name} wins!`);
            resetBoard();
        }
        else if (moves[0] && moves[0] === moves[4] && moves[4] === moves[8] ||
            moves[2] && moves[2] === moves[4] && moves[4] === moves[6]) {
            updateAnnouncer(`${player.name} wins!`);
            resetBoard();
        }
        else if (moves[0] && moves[0] === moves[3] && moves[3] === moves[6] ||
            moves[1] && moves[1] === moves[4] && moves[4] === moves[7] ||
            moves[2] && moves[2] === moves[5] && moves[5] === moves[8]) {
            updateAnnouncer(`${player.name} wins!`);
            resetBoard();
        }
        else {
            checkDraw();
        }
    }

    let resetBoard = () => {
        moves = ["", "", "", "", "", "", "", "", ""];
        let cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.innerHTML = "";
        })
        game.resetPlayerIndex();
    }

    let updateAnnouncer = (string = "Have fun!") => {
        let annoucner = document.querySelector('.announcer');
        annoucner.innerHTML = string;
    }

    let checkDraw = () => {
        if (moves.every(move => move !== "")) {
            updateAnnouncer("It's a draw!");
            resetBoard();
        }
    }

    return {
        drawBoard,
        render,
        checkWin,
        resetBoard,
        updateAnnouncer,
        updateMoves
    }
})();

let game = (function () {
    let currentPlayerIndex = 1;

    let players = [];

    let startGame = () => {
        let startButton = document.getElementById('startGameButton');

        let startButtonClickHandler = () => {
            players = [
                createPlayer(document.getElementById('player1').value, 'X'),
                createPlayer(document.getElementById('player2').value, 'O')
            ];

            gameboard.drawBoard();

            startButton.removeEventListener('click', startButtonClickHandler);

            markBoard();
        };

        startButton.addEventListener('click', startButtonClickHandler);
    };

    let playerSwitch = () => {
        currentPlayerIndex = (currentPlayerIndex === 1) ? 0 : 1;
    }

    let resetPlayerIndex = () => {
        currentPlayerIndex = 1;
    }

    let markBoard = () => {
        let cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                let cellID = parseInt(cell.id.slice(4));
                if (cell.innerHTML === '') {
                    playerSwitch();
                    gameboard.updateAnnouncer();
                    gameboard.updateMoves(players[currentPlayerIndex], cellID);
                }
                else {
                    gameboard.updateAnnouncer('cannot fill taken spaces');
                }
            })
        })
    }

    return {
        startGame,
        markBoard,
        resetPlayerIndex
    }
})();

game.startGame();




