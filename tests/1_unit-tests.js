const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
let solver = new Solver();

const puzzlesAndSolutions = require("../controllers/puzzle-strings.js");

suite("Unit Tests", () => {
    test("Logic handles a valid puzzle string of 81 characters", function (done) {
        assert.equal(
            solver.validate(
                "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
            ),
            "Puzzle string is valid"
        );
        done();
    });

    test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", function (done) {
        assert.equal(
            solver.validate(
                "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.3#."
            ),
            "error: puzzle string contains invalid characters"
        );
        done();
    });

    test("Logic handles a puzzle string that is not 81 characters in length", function (done) {
        assert.equal(
            solver.validate("1.5..2.84..63.12.7.2..5.....9..1....8.2"),
            "error: puzzle string is not 81 characters long"
        );
        done();
    });

    test("Logic handles a valid row placement", function (done) {
        assert.equal(
            solver.checkRowPlacement(
                "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
                0,
                1,
                3
            ),
            "Row placement is valid"
        );
        done();
    });

    test("Logic handles an invalid row placement", function (done) {
        assert.equal(
            solver.checkRowPlacement(
                "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
                0,
                1,
                5
            ),
            "error: row already includes value"
        );
        done();
    });

    test("Logic handles a valid column placement", function (done) {
        assert.equal(
            solver.checkColPlacement(
                "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
                0,
                1,
                3
            ),
            "Column placement is valid"
        );
        done();
    });

    test("Logic handles an invalid column placement", function (done) {
        assert.equal(
            solver.checkColPlacement(
                "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
                0,
                0,
                8
            ),
            "error: column already includes value"
        );
        done();
    });

    test("Logic handles a valid region placement", function (done) {
        assert.equal(
            solver.checkRegionPlacement(
                "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
                3,
                4,
                5
            ),
            "Region placement is valid"
        );
        done();
    });

    test("Logic handles an invalid region placement", function (done) {
        assert.equal(
            solver.checkRegionPlacement(
                "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
                3,
                4,
                3
            ),
            "error: region already includes value"
        );
        done();
    });

    test("Valid puzzle strings pass the solver", function (done) {
        assert.equal(
            solver.solve(
                "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
            ),
            "135762984946381257728459613694517832812936745357824196473298561581673429269145378"
        );
        done();
    });

    test("Invalid puzzle strings fail the solver", function (done) {
        assert.equal(
            solver.solve(
                "155..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
            ),
            "Puzzle string is not valid"
        );
        assert.equal(
            solver.solve(
                "1.5..2.84..63.12.x.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
            ),
            "error: puzzle string contains invalid characters"
        );
        assert.equal(
            solver.solve(
                "1.5..2.84..63.12..2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
            ),
            "error: puzzle string is not 81 characters long"
        );
        done();
    });

    test("Solver returns the expected solution for an incomplete puzzle", function (done) {
        puzzlesAndSolutions.puzzlesAndSolutions.forEach((puzzle) =>
            assert.equal(solver.solve(puzzle[0]), puzzle[1])
        );
        done();
    });
});
