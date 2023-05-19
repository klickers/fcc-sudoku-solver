const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
let solver = new Solver();

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
});
