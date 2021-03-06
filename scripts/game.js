// game object
let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    choices: ["button1", "button2", "button3", "button4"],
    turnNumber: 0,
    lastButton: "",
    turnInProgress: false,
}

function newGame() {
    game.score = 0;
    game.playerMoves = [];
    game.currentGame = [];
    // check if el has data-listener of true, if not then add event listener
    // on click, call lightsOn function, passing the element id
    // add the el id to the playerMoves array
    for(let circle of document.getElementsByClassName("circle")) {
        if (circle.getAttribute("data-listener") !== "true") {
            circle.addEventListener("click", (e) => {
                // check currentGame array length, to check if game in play, 
                // and turnInProg is false - no click allowed when computer showing its sequence
                if (game.currentGame.length > 0 && !game.turnInProgress) {
                    let move = e.target.getAttribute("id");
                    // set lastButton value to the id of the button clicked
                    game.lastButton = move;
                    lightsOn(move);
                    game.playerMoves.push(move);
                    playerTurn();
                }
            });
            // finally set the data-listener to true after event listener added
            circle.setAttribute("data-listener", "true");
        }
    }
    showScore();
    addTurn();
}

function addTurn() {
    game.playerMoves = [];
    // get random selection from choices array, push this to currentGame array
    // using random number between 0 and 3, using that as index number from choices array
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
    showTurns();
}

function showScore() {
    document.getElementById("score").innerText = game.score;
}

// add class to element then remove after 400ms
function lightsOn(circ) {
    document.getElementById(circ).classList.add("light");
    setTimeout(() => {
        document.getElementById(circ).classList.remove("light");
    }, 400);
}

function showTurns() {
    // turnInProgress true while computer shows sequence, set to false after
    game.turnInProgress = true;
    game.turnNumber = 0; 
    let turns = setInterval(() => {
        // lightsOn with interval, so gap between each step in sequence
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if(game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
            game.turnInProgress = false;
        }
    }, 800);
}

function playerTurn() {
    // length of playerMoves array minus one = index of last element
    let i = game.playerMoves.length - 1;
    // compare this with same index in currentGame array - if answer is correct they will match
    if (game.currentGame[i] === game.playerMoves[i]) {
        // if length of both arrays match, then we are at the end of the game, increment score
        if (game.currentGame.length === game.playerMoves.length) {
            game.score ++;
            showScore();
            addTurn();
        }
    } else {
        alert("Wrong move!");
        newGame();
    }
}

// export so that can use in test file
module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn };