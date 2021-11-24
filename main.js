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

//Event listener for if the Reset Board button is clicked
const resetBoardButton = document.getElementById('reset-board');
resetBoardButton.addEventListener('click', function () {
    resetBoard();
});

//event listener for if Update Player names is selected
const changeName = document.getElementById('submit-name');
changeName.addEventListener('click', function (event) {
    const playerOneNameInput = document.getElementById(
        'player-one-chosen-name'
    );
    const playerTwoNameInput = document.getElementById(
        'player-two-chosen-name'
    );

    if (event.target.textContent === 'Update Player Names') {
        playerOneNameInput.removeAttribute('type', 'hidden');
        playerTwoNameInput.removeAttribute('type', 'hidden');
        event.target.textContent = 'Update';
    } else {
        if (playerOneNameInput.value !== '' && playerTwoNameInput !== '') {
            PLAYERS.playerOne.name = playerOneNameInput.value;
            PLAYERS.playerTwo.name = playerTwoNameInput.value;
            document.querySelector('#active-player').textContent = getActivePlayer().name;
            updateDOM();

            playerOneNameInput.setAttribute('type', 'hidden');
            playerTwoNameInput.setAttribute('type', 'hidden');
            playerOneNameInput.value = '';
            playerTwoNameInput.value = '';
            event.target.textContent = 'Update Player Names';
        } else {
            alert('Enter a valid entry for both players');
        }
    }
});

//Event listener for if reset score is selected
const resetScore = document.getElementById('reset-score');
resetScore.addEventListener('click', function () {
    PLAYERS.playerOne.points = 0;
    PLAYERS.playerTwo.points = 0;
    resetBoard();
    updateDOM();
});

//event listener to add click function for the game board
const boxWrapper = document.querySelector('#wrapper');
boxWrapper.addEventListener('click', function (event) {
    if (event.target.classList.contains('box')) {
        if (!winningState) {
            assignChosenValue(event);
        }
    }
});

//function to assign value to the board AND game state
function assignChosenValue(event) {
    if (event.target.textContent === '') {

        let num = Number(event.target.id.slice(-2));
        currentGameState[num - 1] = getActivePlayer().token;

        const para = document.createElement('p');
        const node = document.createTextNode(getActivePlayer().token);
        para.appendChild(node);
        para.classList.add('displayValue');
        event.target.appendChild(para);
        checkGameEndConditions();
    }
}

//Function to check end conditions
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

//Function to check if a win condition has been met
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

//function to change the color of the boxes
function changeColor(condition, boxes) {
    for (let i = 0; i < 3; i++) {
        boxes[condition[i]].style.backgroundColor = 'red';
    }
}

//Function to check if there is a draw/tie
function checkDrawState(boxes) {
    for (index in boxes) {
        if (boxes[index] === null) {
            return false;
        }
    }
    return true;
}

//Function to trigger end game functionality if a draw or winner condition is met
function endGame(activePlayer = false) {
    const bottomBanner = document.getElementById('bottom-banner');
    let winningPlayer;
    if (activePlayer === false) {
        bottomBanner.textContent = `It's a draw`;
    } else {
        for (let player in PLAYERS) {
            if (PLAYERS[player].token === activePlayer) {
                winningPlayer = player;
            }
        }
        bottomBanner.innerHTML = `<span id="active-player">${PLAYERS[winningPlayer].name}</span> wins`;
    }
    winningState = true;
    bottomBanner.style.color = 'red';
    updatePoints(winningPlayer);
}

//function to update the points in the DOM
function updatePoints(winningPlayer) {
    if (winningPlayer === 'playerOne') {
        PLAYERS.playerOne.points += 1;
    } else if (winningPlayer === 'playerTwo') {
        PLAYERS.playerTwo.points += 1;
    }
    updateDOM();
}

//function to reset the board
function resetBoard() {
    const boxes = document.querySelectorAll('.box');
    for (box of boxes) {
        box.textContent = '';
        box.style.backgroundColor = null;
    }
    bottomBanner.innerHTML =
        `Current Player: <span id="active-player">${PLAYERS.playerOne.name}</span>`;
    bottomBanner.style.color = null;
    PLAYERS.playerOne.activePlayer = true;
    PLAYERS.playerTwo.activePlayer = false;
    winningState = false;

    for (let index in currentGameState) {
        currentGameState[index] = null;
    }
}

function updateDOM() {
    document.getElementById('player-one-points').textContent = PLAYERS.playerOne.points;
    document.getElementById('player-two-points').textContent = PLAYERS.playerTwo.points;
    document.getElementById('player-one-name').textContent = PLAYERS.playerOne.name;
    document.getElementById('player-two-name').textContent = PLAYERS.playerTwo.name;
    
    if(!winningState) {
        document.getElementById('active-player').textContent = getActivePlayer().name;
    }
}

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
}

function getActivePlayer() {
    for(let player in PLAYERS) {
        if(PLAYERS[player].activePlayer) {
            return PLAYERS[player];
        }
    }
}

const moreOptions = document.getElementById('more-options');
moreOptions.addEventListener('click', function(event) {
    let options = document.getElementById('hidden-options')
        options.classList.toggle('hidden');
        if(options.classList.contains('hidden')) {
            event.target.textContent = "More Options";
        } else {
            event.target.textContent = "Hide";
        }
});