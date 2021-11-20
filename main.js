const PLAYERS = {
    playerOne: 'X',
    playerTwo: 'O',
};

const WINNING_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let activePlayer = PLAYERS.playerOne;

const boxWrapper = document.querySelector('#wrapper');
boxWrapper.addEventListener('click', function (event) {
    if (event.target.classList.contains('box')) {
        assignChosenValue(event);
    }
});

function assignChosenValue(event) {
    if(event.target.textContent === '') {
        event.target.textContent = activePlayer;
        checkWinCondition();
    }
}

function checkWinCondition() {
    const boxes = document.querySelectorAll('.box');
    const results = {};
    for (let i = 0; i < 9; i++) {
        results[`box${i + 1}`] = {
            player: boxes[i].textContent,
        };
    }

    if (checkEndWinningState()) {
        setTimeout(function () {
            endGame(activePlayer);
        }, 1);
    } else if (checkDrawState(results)) {
        setTimeout(function () {
            endGame(false);
        }, 1);
    } else {
        changeActivePlayer();
    }
}

function checkEndWinningState(results) {
    const boxes = document.querySelectorAll('.box');
    for (condition of WINNING_CONDITIONS) {
        if (
            boxes[condition[0]].textContent === activePlayer &&
            boxes[condition[1]].textContent === activePlayer &&
            boxes[condition[2]].textContent === activePlayer
        ) {
            return true;
        }
    }
}

function changeActivePlayer() {
    const activePlayerUI = document.querySelector('#active-player');
    if (activePlayer === PLAYERS.playerOne) {
        activePlayer = PLAYERS.playerTwo;
        activePlayerUI.textContent = 'Player Two';
    } else {
        activePlayer = PLAYERS.playerOne;
        activePlayerUI.textContent = 'Player One';
    }
}

function checkDrawState(results) {
    if (
        results.box1.player !== '' &&
        results.box2.player !== '' &&
        results.box3.player !== '' &&
        results.box4.player !== '' &&
        results.box5.player !== '' &&
        results.box6.player !== '' &&
        results.box7.player !== '' &&
        results.box8.player !== '' &&
        results.box9.player !== ''
    ) {
        return true;
    }
}

function endGame(activePlayer) {
    let winningPlayer;

    if (activePlayer === false) {
        alert('It was a draw');
    } else {
        for(let player in PLAYERS) {
            if(PLAYERS[player] === activePlayer) {
                winningPlayer = player;
            } else {
                winningPlayer = player;
            }
        }
        alert(`${activePlayer} wins`);
    }
    resetBoard();
}

function resetBoard() {
    const boxes = document.querySelectorAll('.box');
    for (box of boxes) {
        box.textContent = '';
    }
}