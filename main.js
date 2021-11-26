const PLAYERS = {
    playerOne: {
        name: 'Player One',
        token: 'X',
        points: 0,
        activePlayer: true,
    },
    playerTwo: {
        name: 'Player Two',
        token: 'O',
        points: 0,
        activePlayer: false,
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

const currentGameState = [null, null, null, null, null, null, null, null, null];
let winningState = false;
const bottomBanner = document.getElementById('bottom-banner');
const activePlayerColor = 'green';
const winnerColor = 'red';
const playerOneDiv = document.getElementById('player-one');
const playerTwoDiv = document.getElementById('player-two');
const modal = document.getElementById('popup-modal');

function assignChosenValue(event) {
    if (event.target.textContent === '') {
        let chosenIndex = Number(event.target.id.slice(-2));
        currentGameState[chosenIndex - 1] = getActivePlayer().token;

        const para = document.createElement('p');
        const node = document.createTextNode(getActivePlayer().token);
        para.appendChild(node);
        para.classList.add('displayValue');
        event.target.appendChild(para);
        checkGameEndConditions();
    }
}

function checkGameEndConditions() {
    const boxes = document.querySelectorAll('.box');
    if (checkEndWinningState(boxes, currentGameState)) {
        setTimeout(function () {
            endGame(getActivePlayer().token);
        }, 1);
    } else if (checkDrawState(currentGameState)) {
        setTimeout(function () {
            endGame();
        }, 1);
    } else {
        updateActivePlayer();
    }
}
function checkEndWinningState(boxes, currentGameState) {
    for (condition of WINNING_CONDITIONS) {
        if (
            currentGameState[condition[0]] === getActivePlayer().token &&
            currentGameState[condition[1]] === getActivePlayer().token &&
            currentGameState[condition[2]] === getActivePlayer().token
        ) {
            changeColor(condition, boxes);
            return true;
        }
    }
    return false;
}

function changeColor(condition, boxes) {
    for (let i = 0; i < 3; i++) {
        boxes[condition[i]].style.backgroundColor = winnerColor;
    }
}

function checkDrawState(boxes) {
    for (index in boxes) {
        if (boxes[index] === null) {
            return false;
        }
    }
    return true;
}

function endGame(activePlayer = false) {
    let winningPlayer;
    if (activePlayer === false) {
        bottomBanner.textContent = `It's a draw`;
        playerOneDiv.style.backgroundColor = winnerColor;
        playerTwoDiv.style.backgroundColor = winnerColor;
    } else {
        for (let player in PLAYERS) {
            if (PLAYERS[player].token === activePlayer) {
                winningPlayer = player;
                if(player === 'playerOne') {
                    playerOneDiv.style.backgroundColor = winnerColor;
                    playerTwoDiv.style.backgroundColor = null;
                } else {
                    playerTwoDiv.style.backgroundColor = winnerColor;
                    playerOneDiv.style.backgroundColor = null;
                }
            }
        }
        bottomBanner.innerHTML = `<span id="active-player">${PLAYERS[winningPlayer].name}</span> wins`;
    }
    winningState = true;
    bottomBanner.style.color = winnerColor;
    updatePoints(winningPlayer);
}

function updatePoints(winningPlayer) {
    if (winningPlayer === 'playerOne') {
        PLAYERS.playerOne.points += 1;
    } else if (winningPlayer === 'playerTwo') {
        PLAYERS.playerTwo.points += 1;
    }
    updateDOM();
}

function resetBoard() {
    const boxes = document.querySelectorAll('.box');
    for (box of boxes) {
        box.textContent = '';
        box.style.backgroundColor = null;
    }
    bottomBanner.innerHTML = `Current Player: <span id="active-player">${PLAYERS.playerOne.name}</span>`;
    bottomBanner.style.color = null;
    PLAYERS.playerOne.activePlayer = true;
    PLAYERS.playerTwo.activePlayer = false;
    winningState = false;

    for (let index in currentGameState) {
        currentGameState[index] = null;
    }

    playerOneDiv.style.backgroundColor = null;
    playerTwoDiv.style.backgroundColor = null;
}

function updateDOM() {
    document.getElementById('player-one-points').textContent =PLAYERS.playerOne.points;
    document.getElementById('player-two-points').textContent = PLAYERS.playerTwo.points;
    document.getElementById('player-one-name').textContent = PLAYERS.playerOne.name;
    document.getElementById('player-two-name').textContent = PLAYERS.playerTwo.name;

    if (!winningState) {
        document.getElementById('active-player').textContent = getActivePlayer().name;
    }
}

function updateActivePlayer() {
    const activePlayerUI = document.querySelector('#active-player');
    if (PLAYERS['playerOne'].activePlayer) {
        PLAYERS['playerOne'].activePlayer = false;
        PLAYERS['playerTwo'].activePlayer = true;
        playerOneDiv.style.backgroundColor = activePlayerColor;
        playerTwoDiv.style.backgroundColor = null;
        activePlayerUI.textContent = PLAYERS.playerTwo.name;
    } else {
        PLAYERS['playerTwo'].activePlayer = false;
        PLAYERS['playerOne'].activePlayer = true;
        activePlayerUI.textContent = PLAYERS.playerOne.name;
        playerTwoDiv.style.backgroundColor = activePlayerColor;
        playerOneDiv.style.backgroundColor = null;
    }
}

function getActivePlayer() {
    for (let player in PLAYERS) {
        if (PLAYERS[player].activePlayer) {
            return PLAYERS[player];
        }
    }
}

function updateNavBar() {
    let navBar = document.getElementById('nav-links');
    if (navBar.style.display === 'block') {
        updateElementDisplay(navBar, 'none');;
    } else {
        updateElementDisplay(navBar, 'block');
    }
}

function updateElementDisplay(e, state) {
    e.style.display = state;
}

function updateBoardIconState(playerOneNewIcon, playerTwoNewIcon) {
    const boxes = document.querySelectorAll('.box');
    for(let index in currentGameState) {
        const curBox = currentGameState[index];
        if (curBox !== null) {
            let replaceValue;
            if(curBox === PLAYERS.playerOne.token) {
                replaceValue = playerOneNewIcon;
            } else {
                replaceValue = playerTwoNewIcon;
            }
            boxes[index].textContent = '';
            const para = document.createElement('p');
            const node = document.createTextNode(replaceValue);
            para.appendChild(node);
            para.classList.add('displayValue');
            boxes[index].appendChild(para);
        }
    }
}

function setupListeners() {
    const modalIcon = document.querySelector('.modal-content-icon');
    const modalName = document.querySelector('.modal-content-name');

    const hamburgerNav = document.querySelector('.icon');
    hamburgerNav.addEventListener('click', function () {
        updateNavBar();
    });

    const boxWrapper = document.querySelector('#wrapper');
    boxWrapper.addEventListener('click', function (event) {
        if (event.target.classList.contains('box')) {
            if (!winningState) {
                assignChosenValue(event);
            }
        }
    });

    const resetScore = document.getElementById('reset-score');
    resetScore.addEventListener('click', function () {
        PLAYERS.playerOne.points = 0;
        PLAYERS.playerTwo.points = 0;
        resetBoard();
        updateDOM();
    });

    const resetBoardButton = document.getElementById('reset-board');
    resetBoardButton.addEventListener('click', function () {
        resetBoard();
    });

    const updateNameNav = document.getElementById('submit-name');
    updateNameNav.addEventListener('click', function (event) {
        updateElementDisplay(modal, 'block');
        updateElementDisplay(modalName, 'block');
        updateElementDisplay(modalIcon, 'none');
    });

    const updateNameBtn = document.querySelector('.submit-modal-name');
    updateNameBtn.addEventListener('click', function () {
        const playerOneNameInput = document.getElementById('player-one-chosen-name');
        const playerTwoNameInput = document.getElementById('player-two-chosen-name');

        if (playerOneNameInput.value !== '' && playerTwoNameInput !== '') {
            PLAYERS.playerOne.name = playerOneNameInput.value;
            PLAYERS.playerTwo.name = playerTwoNameInput.value;
            document.querySelector('#active-player').textContent = getActivePlayer().name;
            updateDOM();
            updateNavBar();
            updateElementDisplay(modal, 'none');
        } else {
            alert('Enter a valid entry for both players');
        }
    });

    const updateIconNav = document.getElementById('submit-icons');
    updateIconNav.addEventListener('click', function (event) {
        updateElementDisplay(modal, 'block');
        updateElementDisplay(modalName, 'none');
        updateElementDisplay(modalIcon, 'block');
    });

    const updateIconBtn = document.querySelector('.submit-modal-icon');
    updateIconBtn.addEventListener('click', function () {
        const playerOneIconInput = document.getElementById('player-one-icon');
        const playerTwoIconInput = document.getElementById('player-two-icon');
        if (playerOneIconInput.value !== '' && playerTwoIconInput !== '') {
            updateBoardIconState(playerOneIconInput.value, playerTwoIconInput.value);
            PLAYERS.playerOne.token = playerOneIconInput.value;
            PLAYERS.playerTwo.token = playerTwoIconInput.value;
            document.getElementById('p-one-icon').textContent = PLAYERS.playerOne.token;
            document.getElementById('p-two-icon').textContent = PLAYERS.playerTwo.token;
            updateElementDisplay(modal, 'none');
            updateNavBar();
        } else {
            alert('Enter a valid entry for both players!');
        }
    });

    const closeModalBtn = document.querySelectorAll('.close-modal');
    for (let closeButton of closeModalBtn) {
        closeButton.addEventListener('click', function () {
            updateElementDisplay(modal, 'none');
            updateNavBar();
        });
    }
}

setupListeners();