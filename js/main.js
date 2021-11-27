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
const playerOneBox = document.getElementById('player-one');
const playerTwoBox = document.getElementById('player-two');
const modal = document.getElementById('popup-modal');
const resetBoardBtn = document.getElementById('reset-board');
const boxes = document.querySelectorAll('.box');

//check if any of the win conditions are triggered
function checkWinCondition() {
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
function checkDrawCondition() {
    return currentGameState.includes(null) ? false : true;
}

//performs the end game logic for either winner OR tie/draw
function handleEndGame(activePlayer = false, storedRefreshState = false) {
    let winningPlayer;

    if (!activePlayer) {
        playAudio('draw', storedRefreshState);
        bottomBanner.textContent = `It's a draw`;
        playerOneBox.style.backgroundColor = winnerColor;
        playerTwoBox.style.backgroundColor = winnerColor;
    } else {
        playAudio('win', storedRefreshState)
        for (let player in PLAYERS) {
            if (PLAYERS[player].token === activePlayer) {
                winningPlayer = player;
                if (player === 'playerOne') {
                    playerOneBox.style.backgroundColor = winnerColor;
                    playerTwoBox.style.backgroundColor = null;
                } else {
                    playerTwoBox.style.backgroundColor = winnerColor;
                    playerOneBox.style.backgroundColor = null;
                }
            }
        }
        bottomBanner.innerHTML = `<span id="active-player">${PLAYERS[winningPlayer].name}</span> wins`;
    }
    resetBoardBtn.textContent = 'Play Again';
    winningState = true;
    bottomBanner.style.color = winnerColor;
    if (!storedRefreshState) {
        updatePoints(winningPlayer);
    }
    storeSession();
}

//play the audio file for either draw or win condition 
function playAudio(condition, storedRefreshState) {
    if(condition === 'win' && !storedRefreshState) {
        const audioContext = new AudioContext();
        let winSFX = new Audio('./sounds/sfx-win.wav');
        winSFX.play();
    } else if (condition === 'draw' && !storedRefreshState) {
        let drawSFX = new Audio('./sounds/sfx-draw.wav');
        drawSFX.play();
    }
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
function handleBoardReset() {
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

    playerOneBox.style.backgroundColor = null;
    playerTwoBox.style.backgroundColor = null;

    resetBoardBtn.textContent = 'Reset Board';
    handleActivePlayerColor();
    storeSession();
}

//creates the token for the active players choice
function updateBoxData(data) {
    const para = document.createElement('p');
    const node = document.createTextNode(data);
    para.appendChild(node);
    para.classList.add('displayValue');
    return para;
}

//logic to update the DOM for the player details
function updateDOM() {
    document.getElementById('player-one-points').textContent = PLAYERS.playerOne.points;
    document.getElementById('player-two-points').textContent = PLAYERS.playerTwo.points;
    document.getElementById('player-one-name').textContent = PLAYERS.playerOne.name;
    document.getElementById('player-two-name').textContent = PLAYERS.playerTwo.name;
    document.getElementById('p-one-icon').textContent = PLAYERS.playerOne.token;
    document.getElementById('p-two-icon').textContent = PLAYERS.playerTwo.token;

    if (!winningState) {
        document.getElementById('active-player').textContent = getActivePlayer().name;
    }
    storeSession();
}

//Update active player status
function updateActivePlayer() {
    const activePlayerUI = document.querySelector('#active-player');
    if (PLAYERS['playerOne'].activePlayer) {
        PLAYERS['playerOne'].activePlayer = false;
        PLAYERS['playerTwo'].activePlayer = true;
        activePlayerUI.textContent = PLAYERS.playerTwo.name;
    } else {
        PLAYERS['playerTwo'].activePlayer = false;
        PLAYERS['playerOne'].activePlayer = true;
        activePlayerUI.textContent = PLAYERS.playerOne.name;
    }
    handleActivePlayerColor();
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
function handlePointsReset() {
    PLAYERS.playerOne.points = 0;
    PLAYERS.playerTwo.points = 0;
}

function handleActivePlayerColor() {
    if(PLAYERS['playerTwo'].activePlayer) {
        playerTwoBox.style.backgroundColor = activePlayerColor;
        playerOneBox.style.backgroundColor = null;
    } else {
        playerOneBox.style.backgroundColor = activePlayerColor;
        playerTwoBox.style.backgroundColor = null;
    }
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

                if (checkWinCondition()) {
                    handleEndGame(getActivePlayer().token);
                } else if (checkDrawCondition()) {
                    handleEndGame();
                } else {
                    updateActivePlayer();
                }
            }
        }
        storeSession();
    });

    const resetScore = document.getElementById('reset-score');
    resetScore.addEventListener('click', function () {
        handlePointsReset();
        updateDOM();
    });

    const resetBoardButton = document.getElementById('reset-board');
    resetBoardButton.addEventListener('click', function () {
        handleBoardReset();
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
            playerTwoNameInput.value = '';
            playerOneNameInput.value = '';
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
            playerOneIconInput.value = '';
            playerTwoIconInput.value = '';
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
        handleBoardReset();
        PLAYERS.playerOne.name = 'Player One';
        PLAYERS.playerOne.token = 'X';
        PLAYERS.playerTwo.name = 'Player Two';
        PLAYERS.playerTwo.token = 'O';
        handlePointsReset();
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
    let storedRefreshState = sessionStorage.getItem('refreshState');

    for (let item in storedPlayerSessionData) {
        PLAYERS[item] = storedPlayerSessionData[item];
    }

    for (let index in storedGameState) {
        currentGameState[index] = storedGameState[index];
    }

    updateBoardIconState(PLAYERS.playerOne.token, PLAYERS.playerTwo.token);

    if (checkWinCondition(boxes, currentGameState)) {
        handleEndGame(getActivePlayer().token, storedRefreshState);
    } else if(checkDrawCondition(boxes)) {
        handleEndGame(false, storedRefreshState);
    } else {
        handleActivePlayerColor();
    }
    updateDOM();
}

setupListeners();