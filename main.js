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

const PLAYER_BOARD = [
    null, null, null, null, null, null, null, null, null
];

const bottomBanner = document.getElementById('bottom-banner');

let winningState = false;

let activePlayer = PLAYERS.playerOne;

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', function () {
    resetBoard();
});


const boxWrapper = document.querySelector('#wrapper');
boxWrapper.addEventListener('click', function (event) {
    if (event.target.classList.contains('box')) {
        if(!winningState) {
            assignChosenValue(event);
        }
    }
});

function assignChosenValue(event) {
    if(event.target.textContent === '') {
        const para = document.createElement('p');
        const node = document.createTextNode(activePlayer);
        para.classList.add('displayValue');
        para.appendChild(node);
        event.target.appendChild(para);
        checkWinCondition();
    }
}

function checkWinCondition() {
    const boxes = document.querySelectorAll('.box');
    if (checkEndWinningState(boxes)) {
        setTimeout(function () {
            endGame(activePlayer);
        }, 1);
    } else if (checkDrawState(boxes)) {
        setTimeout(function () {
            endGame(false);
        }, 1);
    } else {
        changeActivePlayer();
    }
}

function checkEndWinningState(boxes) {
    for (condition of WINNING_CONDITIONS) {
        if (
            boxes[condition[0]].textContent === activePlayer &&
            boxes[condition[1]].textContent === activePlayer &&
            boxes[condition[2]].textContent === activePlayer
        ) {
            changeColor(condition, boxes);
            return true;
        }
    }
    return false;
}

function changeColor(condition, boxes) {
    for(let i = 0; i < 3; i++) {
        boxes[condition[i]].style.color = "red";
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

function checkDrawState(boxes) {
    for(index in boxes) {
        if(boxes[index].textContent === '') {
            return false;
        }
    }
    return true;
}

function endGame(activePlayer) {
    let winningPlayer;
    if (activePlayer === false) {
        bottomBanner.textContent = "It was a draw";
    } else {
        for(let player in PLAYERS) {
            if(PLAYERS[player] === activePlayer) {
                winningPlayer = player;
            } else {
                winingPlayer = undefined;
            }
        }
        bottomBanner.textContent = `${winningPlayer} wins`;
        winningState = true;
    }
    bottomBanner.style.fontSize = '30px';
    bottomBanner.style.color = "red";
}

function resetBoard() {
    const boxes = document.querySelectorAll('.box');
    for (box of boxes) {
        box.textContent = '';
        box.style.color = null;
    }
    bottomBanner.textContent = '';
    winningState = false;
}