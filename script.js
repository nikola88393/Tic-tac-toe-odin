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
            setTimeout(() => {
                container.appendChild(cell)
            }, i * 50);
            // container.appendChild(cell);
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
            game.scoreCounter(player.name);
            game.timeout();
        }
        else if (moves[0] && moves[0] === moves[4] && moves[4] === moves[8] ||
            moves[2] && moves[2] === moves[4] && moves[4] === moves[6]) {
            updateAnnouncer(`${player.name} wins!`);
            game.scoreCounter(player.name);
            game.timeout();

        }
        else if (moves[0] && moves[0] === moves[3] && moves[3] === moves[6] ||
            moves[1] && moves[1] === moves[4] && moves[4] === moves[7] ||
            moves[2] && moves[2] === moves[5] && moves[5] === moves[8]) {
            updateAnnouncer(`${player.name} wins!`);
            game.scoreCounter(player.name);
            game.timeout();

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
        let announcers = document.querySelectorAll('.announcer');
        announcers.forEach(announcer => {
            announcer.innerHTML = string
        })
    }

    let checkDraw = () => {
        if (moves.every(move => move !== "")) {
            updateAnnouncer("It's a draw!");
            game.drawScoreUpdate();
            game.timeout();

        }
    }

    return {
        drawBoard,
        resetBoard,
        updateAnnouncer,
        updateMoves
    }
})();

let game = (function () {
    let currentPlayerIndex = 1;
    //roudns[0] = player1 score; rounds[1] = player2 score
    let score = [0, 0];

    let players = [];

    let startGame = () => {
        let startButton = document.getElementById('startGameButton');

        let startButtonClickHandler = () => {
            players.splice(0, 2);

            players = [
                createPlayer(document.getElementById('player1').value, 'X'),//'❌'
                createPlayer(document.getElementById('player2').value, 'O'),//'⭕'
            ];

            gameboard.drawBoard();
            toggleInputsAndScore();
            // Timeout needed to be added so that functions below get executed after the timeout in drawBoard() has ended
            setTimeout(() => {
                setScoreCounter();
                markBoard();
            }, 450);
        };

        startButton.addEventListener('click', startButtonClickHandler);

        restartGame();
    };

    let restartGame = () => {
        let restartButton = document.getElementById('restartGameButton');

        let restartButtonClickHandler = () => {
            players.splice(0, 2);
            score = [0, 0];
            document.querySelector('.player1Score').innerHTML = '';
            document.querySelector('.player2Score').innerHTML = '';

            let container = document.querySelector('.board');
            container.innerHTML = '';
            let introText = document.createElement('div');
            introText.setAttribute('class', 'introText');
            introText.innerHTML = "Enter player names and click start game";
            container.appendChild(introText);
            gameboard.updateAnnouncer('Player1 is always first');
            gameboard.resetBoard();
            toggleInputsAndScore();
        };

        restartButton.addEventListener('click', restartButtonClickHandler);
    }

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

    let setScoreCounter = () => {
        let player1Score = document.querySelector('.player1Score');
        let player2Score = document.querySelector('.player2Score');

        player1Score.innerHTML = `${players[0].name}: ${score[0]}`;
        player2Score.innerHTML = `${players[1].name}: ${score[1]}`;
    }

    let drawScoreUpdate = () => {
        score[0] += 1;
        score[1] += 1;
        setScoreCounter();
    }

    let scoreCounter = (name) => {
        let player1Score = document.querySelector('.player1Score');
        let player2Score = document.querySelector('.player2Score');

        if (players[0].name === name) {
            score[0] += 1;
        }
        else if (players[1].name === name) {
            score[1] += 1;
        }
        setScoreCounter();
    }

    let toggleInputsAndScore = () => {
        let inputContainer = document.querySelector('.inputContainer');
        let inputContainerStyle = window.getComputedStyle(inputContainer);
        inputContainer.style.display = (inputContainerStyle.getPropertyValue('display') === 'flex') ? 'none' : 'flex';

        let scoreContainer = document.querySelector('.scoreBoard');
        let scoreContainerStyle = window.getComputedStyle(scoreContainer);
        scoreContainer.style.display = (scoreContainerStyle.getPropertyValue('display') === 'none') ? 'flex' : 'none';
    };


    let timeout = () => {
        let overlay = document.querySelector('.overlay')
        overlay.style.display = 'flex';

        setTimeout(gameboard.resetBoard, 2000);
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 2000);
        // gameboard.updateAnnouncer();
    }

    return {
        startGame,
        resetPlayerIndex,
        timeout,
        scoreCounter,
        drawScoreUpdate
    }
})();

game.startGame();




