/**
 * @jest-environment jsdom
 */

// the js file with the game code
const { game, newGame, showScore } = require("../game");

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
    test("should clear the computer sequence array", () => {
        expect(game.currentGame.length).toBe(0);
    });
    test("should display 0 for element with id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
});