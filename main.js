const PLAYERS = {
    playerOne: {
        name: "Player One",
        token: 'X',
    },
    playerTwo: {
        name: "Player Two",
        token: 'O',
    },
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

const bottomBanner = document.getElementById('bottom-banner');

let winningState = false;

let activePlayer = PLAYERS.playerOne.token;

const resetBoardButton = document.getElementById('reset-board');
resetBoardButton.addEventListener('click', function () {
    resetBoard();
});

const changeName = document.getElementById('submit-name');
changeName.addEventListener('click', function (event) {
    const playerOneNameInput = document.getElementById('player-one-chosen-name');
    const playerTwoNameInput = document.getElementById('player-two-chosen-name');

    if(event.target.textContent === "Update Player Names") {
        playerOneNameInput.removeAttribute('type', 'hidden');
        playerTwoNameInput.removeAttribute('type', 'hidden');

        event.target.textContent = "Update";
    } else {
        if (playerOneNameInput.value !== '' && playerTwoNameInput !== '') {
            let currentPlayer = document.getElementById('active-player');
            if(currentPlayer.textContent === PLAYERS.playerOne.name) {
                currentPlayer.textContent = playerOneNameInput.value;
            } else if (currentPlayer.textContent === PLAYERS.playerTwo.name) {
                currentPlayer.textContent = playerTwoNameInput.value;
            }
            PLAYERS.playerOne.name = playerOneNameInput.value;
            PLAYERS.playerTwo.name = playerTwoNameInput.value;

            document.getElementById('player-one-name').textContent = PLAYERS.playerOne.name;
            document.getElementById('player-two-name').textContent = PLAYERS.playerTwo.name;

            playerOneNameInput.setAttribute('type', 'hidden');
            playerTwoNameInput.setAttribute('type', 'hidden');
            playerOneNameInput.value = '';
            playerTwoNameInput.value = '';
            event.target.textContent = "Update Player Names";
        } else {
            alert('Enter a valid entry');
        }
    }
});

const resetScore = document.getElementById('reset-score');
resetScore.addEventListener('click', function() {
    const playerOneScore = document.getElementById('player-one-points');
    const playerTwoScore = document.getElementById('player-two-points');
    playerOneScore.textContent = 0;
    playerTwoScore.textContent = 0;
    resetBoard();
});

const boxWrapper = document.querySelector('#wrapper');
boxWrapper.addEventListener('click', function (event) {
    if (event.target.classList.contains('box')) {
        if (!winningState) {
            assignChosenValue(event);
        }
    }
});

function assignChosenValue(event) {
    if (event.target.textContent === '') {
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
            endGame();
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
    for (let i = 0; i < 3; i++) {
        boxes[condition[i]].style.color = 'red';
    }
}

function changeActivePlayer() {
    const activePlayerUI = document.querySelector('#active-player');
    if (activePlayer === PLAYERS.playerOne.token) {
        activePlayer = PLAYERS.playerTwo.token;
        activePlayerUI.textContent = 'Player Two';
    } else {
        activePlayer = PLAYERS.playerOne.token;
        activePlayerUI.textContent = 'Player One';
    }
}

function checkDrawState(boxes) {
    for (index in boxes) {
        if (boxes[index].textContent === '') {
            return false;
        }
    }
    return true;
}

function endGame(activePlayer = false) {
    let winningPlayer;
    if (activePlayer === false) {
        bottomBanner.textContent = `It's a draw`;
    } else {
        for (let player in PLAYERS) {
            if (PLAYERS[player].token === activePlayer) {
                winningPlayer = player;
            }
        }
        bottomBanner.textContent = `${PLAYERS[winningPlayer].name} wins`;
        winningState = true;
    }
    bottomBanner.style.color = 'red';
    updatePoints(winningPlayer);
}

function updatePoints(winningPlayer) {
    const playerOnePoints = document.getElementById('player-one-points');
    const playerTwoPoints = document.getElementById('player-two-points');
    let points;
    if(winningPlayer === 'playerOne') {
        points = Number(playerOnePoints.textContent) + 1;
        playerOnePoints.textContent = points;
    } else if (winningPlayer === 'playerTwo') {
        points = Number(playerTwoPoints.textContent) + 1;
        playerTwoPoints.textContent = points;
    }
}

function resetBoard() {
    const boxes = document.querySelectorAll('.box');
    for (box of boxes) {
        box.textContent = '';
        box.style.color = null;
    }
    bottomBanner.innerHTML = 'Current Player: <span id="active-player">PlayerOne</span>';
    bottomBanner.style.color = null;
    bottomBanner.style.fontSize = null;
    activePlayer = PLAYERS.playerOne.token;
    winningState = false;
}
