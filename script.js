
const audioHit = document.getElementById('audioHit');
const audioMiss = document.getElementById('audioMiss');

function a() {
    audioHit.play();
    setTimeout(function () {
        audioHit.pause();
        audioHit.currentTime = 450;
    }, 1430);
};

function b() {
    audioMiss.play();
    setTimeout(function () {
        audioMiss.pause();
        audioMiss.currentTime = 400;
    }, 1430);
};



// *dispalyMessageView from MessageArea

let view = {
    displayMessage: function (msg) {
        let messegeArea = document.getElementById("messageArea");
        messegeArea.innerHTML = msg;
    },
    displayHit: function (location) {
        let cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },
    displayMiss (location) {
        let cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }

};

// *locationShips
let model = {
    bordSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,
    ships: [ 
        { locations: ['10', '20', '30'], hits: ['', '', ''] },
        { locations: ['32', '33', '34'], hits: ['', '', ''] },
        { locations: ['64', '65', '66'], hits: ['', '', ''] } ],
    fire: function(guess) {
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            let index = ship.locations.indexOf(guess);
            if (index >= 0) {
                a();
                ship.hits[index] = 'hit';
                view.displayHit(guess);
                view.displayMessage('HIT!');
                if (this.isSunk(ship)) {
                    view.displayMessage('You sank my battleship!');
                    this.shipsSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage('You missed.');
        b();
        return false;
    }, 
    isSunk: function (ship) {
        for (let i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== 'hit') {
                return false;
            }
        }
        return true;
    }
};

// *parse

function parseGuess(guess) {
    let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    if (guess === null || guess.length !== 2) {
        alert('Oops, please enter a letter and a number on the board.');
    } else {
        firstChar = guess.charAt(0);
        let row = alphabet.indexOf(firstChar); 
        let column = guess.charAt(1);
        if (isNaN(row) || isNaN(column)) {
            alert('Oops, that isn\'t on the board.');
        } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
            alert('Oops, that\'s off the board!');
        } else {
            return row + column;
        }
    }
    return null;
};

// *controller

let controller = {
    guesses: 0,

    processGuess: function(guess) {
        let location = parseGuess(guess);
        if (location) {
            this.guesses++;
            let hit = model.fire(location);
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage('You sank all my battleship, in' + this.guesses + ' guesses');
            }
        }
    }
};


function handleKeyPress(e) {
    let fireButton = document.getElementById('fireButton');
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
};

function handleFireButton() {
    let guessInput = document.getElementById('guessInput');
    let guess = guessInput.value;
    controller.processGuess(guess);
    guessInput.value = '';
};

function init() {
// *buttonPress    
    let fireButton = document.getElementById('fireButton');
    fireButton.onclick = handleFireButton;
// *enterPress
    let guessInput = document.getElementById('guessInput');
    guessInput.onkeypress = handleKeyPress;
};

window.onload = init;

