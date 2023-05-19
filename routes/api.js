"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
    let solver = new SudokuSolver();

    app.route("/api/check").post((req, res) => {
        const { puzzle, coordinate, value } = req.body;

        if (!puzzle || !coordinate || !value)
            res.json({ error: "Required field(s) missing" });
        else if (solver.validate(puzzle) != "Puzzle string is valid")
            res.json(solver.validate(puzzle));
        else if (value > 9 || value < 1) res.json({ error: "Invalid value" });

        const row = coordinate.charCodeAt(0) - 65;
        const column = coordinate.charAt(1) - 1;

        if (row > 8 || row < 0 || column > 8 || column < 0)
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

        if (conflicts.length == 0) res.json({ valid: true });
        res.json({ valid: false, conflict: conflicts });
    });

    app.route("/api/solve").post((req, res) => {
        return res.json(solver.solve(req.body.puzzle));
    });
};
