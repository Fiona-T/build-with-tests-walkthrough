/**
 * @jest-environment jsdom
 */

// the js file with the game code
const { beforeEach, test, expect } = require("@jest/globals");
const { game, newGame, showScore, addTurn, lightsOn, showTurns } = require("../game");

// below were added automatically??
// const { test, expect } = require("@jest/globals");
// const { describe } = require("yargs");
// const { test, expect, beforeAll } = require("@jest/globals");
// const { describe } = require("yargs");

// to load index.html into jest mock DOM
beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

// tests for game object
describe("game object contains correct keys", () => {
    test("score key exists", () => {
        expect("score" in game).toBe(true);
    });
    test("currentGame key exists", () => {
        expect("currentGame" in game).toBe(true);
    });
    test("playerMoves key exists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    test("choices key exists", () => {
        expect("choices" in game).toBe(true);
    });
    test("choices contains correct ids", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
    test("turnNumber key exists", () => {
        expect("turnNumber" in game).toBe(true);
    });
});

// tests for newGame function
describe("newGame function works correctly", () => {
    // before running the test, set values then call the function
    // as newGame is meant to clear the score to 0, and empty the arrays
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ["button1", "button2"];
        game.currentGame = ["button1", "button2"];
        document.getElementById("score").innerText = "42";
        newGame();
    });
    test("should set the game score to 0", () => {
        expect(game.score).toEqual(0);
    });
    // test("should set the playerMoves to empty array", () => {
    //     expect(game.playerMoves).toEqual([]);
    // });
    test("should clear the player moves array", () => {
        expect(game.playerMoves.length).toBe(0);
    });
    // test("should set the currentGame to empty array", () => {
    //     expect(game.currentGame).toEqual([]);
    // });
    // test("should clear the computer sequence array", () => {
    //     expect(game.currentGame.length).toBe(0);
    // });
    test("should be one element in the computer sequence array", () => {
        expect(game.currentGame.length).toBe(1);
    });
    test("should display 0 for element with id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
    test("data-listener attribute should be set to true on each circle", () => {
        const elements = document.getElementsByClassName("circle");
        // loop through to check data-listener attribute = true
        for(let element of elements) {
            expect(element.getAttribute("data-listener")).toEqual("true");
        }
        expect(document.getElementById("score").innerText).toEqual(0);
    });
});

// tests for lightsUp function
describe("gameplay works correctly", () => {
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test("addTurn adds a new turn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test("should add correct class to light up the buttons", () => {
        // there will always be at least one el in currentGame array, get the 1st one
        let button = document.getElementById(game.currentGame[0]);
        // call lightsOn function using that element
        lightsOn(game.currentGame[0]);
        // expect it to have the class attached
        expect(button.classList).toContain("light");
    });
    test("showTurns should update game.turnNumber", () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
});