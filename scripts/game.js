// game object
let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    choices: ["button1", "button2", "button3", "button4"],
}

function newGame() {
    game.score = 0;
    game.playerMoves = [];
    game.currentGame = [];
    showScore();
    addTurn();
}

function addTurn() {
    game.playerMoves = [];
    // get random selection from choices array, push this to currentGame array
    // using random number between 0 and 3, using that as index number from choices array
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
    // showTurns();
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

// export so that can use in test file
module.exports = { game, newGame, showScore, addTurn, lightsOn };