const players = { 
    playerOne: 'X',
    playerTwo: 'O',
};

let activePlayer = players.playerOne;

const boxWrapper = document.querySelector('#wrapper');
boxWrapper.addEventListener('click', function (event) {
    if (event.target.classList.contains('box')) {
        event.target.textContent = activePlayer; //TODO add style and don't let overwrite
        checkWinCondition();
    }
});

function changeActivePlayer() {
    const activePlayerUI = document.querySelector('#active-player');
    if (activePlayer === players.playerOne) {
        activePlayer = players.playerTwo;
        activePlayerUI.textContent = 'Player Two';
    } else {
        activePlayer = players.playerOne;
        activePlayerUI.textContent = 'Player One';
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

    if (checkEndState(results)) {
        setTimeout(function(){endGame(activePlayer)},1);
    } else {
        changeActivePlayer();
    }
}

function checkEndState(results) {
    if (
        results.box1.player === results.box2.player &&
        results.box2.player === results.box3.player &&
        results.box1.player != '' &&
        results.box2.player != '' &&
        results.box3.player != ''
    ) {
        return true;
    } else if (
        results.box4.player === results.box5.player &&
        results.box5.player === results.box6.player &&
        results.box3.player != '' &&
        results.box4.player != '' &&
        results.box5.player != ''
    ) {
        return true;
    } else if (         
        results.box7.player === results.box8.player &&
        results.box8.player === results.box9.player &&
        results.box7.player != '' &&
        results.box8.player != '' &&
        results.box9.player != ''

    ){
        return true;
    } else if (
        results.box1.player === results.box5.player &&
        results.box5.player === results.box9.player &&
        results.box1.player != '' &&
        results.box5.player != '' &&
        results.box9.player != ''
    ) {
        return true;
    } else {
        return false;
    }
}

function endGame() {
    alert(`${activePlayer} wins`);
    resetBoard();
}

function resetBoard() {
    const boxes = document.querySelectorAll('.box');
    for(box of boxes) {
        box.textContent = '';
    }
}