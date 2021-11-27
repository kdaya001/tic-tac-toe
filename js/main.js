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
const activePlayerColor = 'orange';
const winnerColor = 'green';
const playerOneDiv = document.getElementById('player-one');
const playerTwoDiv = document.getElementById('player-two');
const modal = document.getElementById('popup-modal');
const resetBoardBtn = document.getElementById('reset-board');

//creates the token for the active players choice
function updateBoxData(data) {
    const para = document.createElement('p');
    const node = document.createTextNode(data);
    para.appendChild(node);
    para.classList.add('displayValue');
    return para;
}

//check if any of the win conditions are triggered
function checkEndWinningState(boxes, currentGameState) {
    for (condition of WINNING_CONDITIONS) {
        if (
            currentGameState[condition[0]] === getActivePlayer().token &&
            currentGameState[condition[1]] === getActivePlayer().token &&
            currentGameState[condition[2]] === getActivePlayer().token
        ) {
            for (let i = 0; i < 3; i++) {
                boxes[condition[i]].style.backgroundColor = winnerColor;
                boxes[condition[i]].childNodes[0].classList.add('blink');
            }
            return true;
        }
    }
    return false;
}

//check if the game ends in a draw/tie
function checkDrawState(boxes) {
    for (index in boxes) {
        if (boxes[index] === null) {
            return false;
        }
    }
    return true;
}

//performs the end game logic for either winner OR tie/draw
function endGame(activePlayer = false, storedRefreshState = false) {
    let winningPlayer;

    if (activePlayer === false) {
        if (!storedRefreshState) {
            let drawSFX = new Audio('./sounds/sfx-draw.wav');
            drawSFX.play();
        }
        bottomBanner.textContent = `It's a draw`;
        playerOneDiv.style.backgroundColor = winnerColor;
        playerTwoDiv.style.backgroundColor = winnerColor;
    } else {
        for (let player in PLAYERS) {
            if (!storedRefreshState) {
                let winSFX = new Audio('./sounds/sfx-win.wav');
                winSFX.play();
            }
            if (PLAYERS[player].token === activePlayer) {
                winningPlayer = player;
                if (player === 'playerOne') {
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
    resetBoardBtn.textContent = 'New Game';
    winningState = true;
    bottomBanner.style.color = winnerColor;
    if (!storedRefreshState) {
        updatePoints(winningPlayer);
    }
    storeSession();
}

//adds a point to the winner
function updatePoints(winningPlayer) {
    if (winningPlayer === 'playerOne') {
        PLAYERS.playerOne.points += 1;
    } else if (winningPlayer === 'playerTwo') {
        PLAYERS.playerTwo.points += 1;
    }
    updateDOM();
}

//logic for board reset
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

    resetBoardBtn.textContent = 'Reset Board';
    storeSession();
}

//logic to update the DOM for the player details
function updateDOM() {
    document.getElementById('player-one-points').textContent =
        PLAYERS.playerOne.points;
    document.getElementById('player-two-points').textContent =
        PLAYERS.playerTwo.points;
    document.getElementById('player-one-name').textContent =
        PLAYERS.playerOne.name;
    document.getElementById('player-two-name').textContent =
        PLAYERS.playerTwo.name;
    document.getElementById('p-one-icon').textContent = PLAYERS.playerOne.token;
    document.getElementById('p-two-icon').textContent = PLAYERS.playerTwo.token;

    if (!winningState) {
        document.getElementById('active-player').textContent =
            getActivePlayer().name;
    }
    storeSession();
}

//Update active player status
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

//get the active player
function getActivePlayer() {
    for (let player in PLAYERS) {
        if (PLAYERS[player].activePlayer) {
            return PLAYERS[player];
        }
    }
}

//either hide or display the hamburger navigation bar links
function updateNavBar() {
    let navBar = document.getElementById('nav-links');
    if (navBar.style.display === 'block') {
        updateElementDisplay(navBar, 'none');
    } else {
        updateElementDisplay(navBar, 'block');
    }
}

//function for updating the display state of any element
function updateElementDisplay(e, state) {
    e.style.display = state;
}

//logic for updating the game board icons
function updateBoardIconState(playerOneNewIcon, playerTwoNewIcon) {
    const boxes = document.querySelectorAll('.box');
    for (let index in currentGameState) {
        const curBox = currentGameState[index];
        if (curBox !== null) {
            let replaceValue;
            if (curBox === PLAYERS.playerOne.token) {
                replaceValue = playerOneNewIcon;
                currentGameState[index] = playerOneNewIcon;
            } else {
                replaceValue = playerTwoNewIcon;
                currentGameState[index] = playerTwoNewIcon;
            }
            boxes[index].textContent = '';
            boxes[index].appendChild(updateBoxData(replaceValue));
        }
    }
}

//logic for reseting player poins back to 0
function resetPlayerPoints() {
    PLAYERS.playerOne.points = 0;
    PLAYERS.playerTwo.points = 0;
}

//initialisation/setup function that is called on load
function setupListeners() {
    const modalIcon = document.querySelector('.modal-content-icon');
    const modalName = document.querySelector('.modal-content-name');

    const hamburgerNav = document.querySelector('.icon');
    hamburgerNav.addEventListener('click', function () {
        updateNavBar();
    });

    const boxWrapper = document.querySelector('#wrapper');
    boxWrapper.addEventListener('click', function (event) {
        if (event.target.classList.contains('box') && !winningState) {
            if (event.target.textContent === '') {
                let chosenIndex = Number(event.target.id.slice(-2));
                let activePlayerToken = getActivePlayer().token;
                currentGameState[chosenIndex - 1] = activePlayerToken;
                event.target.appendChild(updateBoxData(activePlayerToken));
                storeSession();

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
        }
    });

    const resetScore = document.getElementById('reset-score');
    resetScore.addEventListener('click', function () {
        resetPlayerPoints();
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
        const playerOneNameInput = document.getElementById(
            'player-one-chosen-name'
        );
        const playerTwoNameInput = document.getElementById(
            'player-two-chosen-name'
        );

        if (playerOneNameInput.value !== '' && playerTwoNameInput !== '') {
            PLAYERS.playerOne.name = playerOneNameInput.value;
            PLAYERS.playerTwo.name = playerTwoNameInput.value;
            document.querySelector('#active-player').textContent =
                getActivePlayer().name;
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
        if (playerOneIconInput.value !== '' && playerTwoIconInput.value !== '') {
            updateBoardIconState(
                playerOneIconInput.value,
                playerTwoIconInput.value
            );
            PLAYERS.playerOne.token = playerOneIconInput.value;
            PLAYERS.playerTwo.token = playerTwoIconInput.value;
            updateDOM();
            updateElementDisplay(modal, 'none');
            updateNavBar();
        } else {
            alert('Enter a valid entry for both players!');
        }
        storeSession();
    });

    const closeModalBtn = document.querySelectorAll('.close-modal');
    for (let closeButton of closeModalBtn) {
        closeButton.addEventListener('click', function () {
            updateElementDisplay(modal, 'none');
            updateNavBar();
        });
    }

    const resetGame = document.getElementById('reset-game');
    resetGame.addEventListener('click', function () {
        resetBoard();
        PLAYERS.playerOne.name = 'Player One';
        PLAYERS.playerOne.token = 'X';
        PLAYERS.playerTwo.name = 'Player Two';
        PLAYERS.playerTwo.token = 'O';
        resetPlayerPoints();
        updateDOM();
        storeSession();
    });
}

//function for session storage
function storeSession() {
    sessionStorage.setItem('players', JSON.stringify(PLAYERS));
    sessionStorage.setItem('gameState', JSON.stringify(currentGameState));
    sessionStorage.setItem('refreshState', true);
    sessionStorage.setItem('autosave', true);
}

//logic for retriving session storage on reload
if (sessionStorage.getItem('autosave')) {
    let storedPlayerSessionData = JSON.parse(sessionStorage.getItem('players'));
    let storedGameState = JSON.parse(sessionStorage.getItem('gameState'));
    const boxes = document.querySelectorAll('.box');
    let storedRefreshState = sessionStorage.getItem('refreshState');

    for (let item in storedPlayerSessionData) {
        PLAYERS[item] = storedPlayerSessionData[item];
    }

    for (let index in storedGameState) {
        currentGameState[index] = storedGameState[index];
    }

    updateBoardIconState(PLAYERS.playerOne.token, PLAYERS.playerTwo.token);

    if (checkEndWinningState(boxes, currentGameState)) {
        endGame(getActivePlayer().token, storedRefreshState);
    }
    updateDOM();
}

setupListeners();