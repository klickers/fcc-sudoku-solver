"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
    let solver = new SudokuSolver();

    app.route("/api/check").post((req, res) => {
        const puzzle = req.body.puzzle;
        const coordinate = req.body.coordinate;
        const originalValue = req.body.value;
        let value = parseInt(originalValue);

        if ((!puzzle || !coordinate || !originalValue) && value != 0)
            res.json({ error: "Required field(s) missing" });
        else if (solver.validate(puzzle) != "Puzzle string is valid")
            res.json(solver.validate(puzzle));
        else if (!/^[123456789]$/.test(value))
            res.json({ error: "Invalid value" });

        const row = coordinate.charCodeAt(0) - 65;
        const column = coordinate.charAt(1) - 1;

        if (
            row > 8 ||
            row < 0 ||
            column > 8 ||
            column < 0 ||
            coordinate.length > 2
        )
            res.json({ error: "Invalid coordinate" });

        let conflicts = [];

        if (
            solver.checkRowPlacement(puzzle, row, column, value) !==
            "Row placement is valid"
        )
            conflicts.push("row");
        if (
            solver.checkColPlacement(puzzle, row, column, value) !==
            "Column placement is valid"
        )
            conflicts.push("column");
        if (
            solver.checkRegionPlacement(puzzle, row, column, value) !==
            "Region placement is valid"
        )
            conflicts.push("region");

        if (
            conflicts.length == 0 ||
            solver.findRows(puzzle)[row][column] == value
        )
            res.json({ valid: true });

        res.json({ valid: false, conflict: conflicts });
    });

    app.route("/api/solve").post((req, res) => {
        return res.json(solver.solve(req.body.puzzle));
    });
};
