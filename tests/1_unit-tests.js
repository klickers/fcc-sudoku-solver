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
        assert.equal(
            solver.solve(
                "5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3"
            ),
            "568913724342687519197254386685479231219538467734162895926345178473891652851726943"
        );
        assert.equal(
            solver.solve(
                "..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1"
            ),
            "218396745753284196496157832531672984649831257827549613962415378185763429374928561"
        );
        assert.equal(
            solver.solve(
                ".7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6"
            ),
            "473891265851726394926345817568913472342687951197254638734162589685479123219538746"
        );
        assert.equal(
            solver.solve(
                "82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51"
            ),
            "827549163531672894649831527496157382218396475753284916962415738185763249374928651"
        );
        done();
    });
});
