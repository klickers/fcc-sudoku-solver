class SudokuSolver {
    validate(puzzleString) {
        if (!puzzleString) return { error: "Required field missing" };
        else if (!/^[\d.]+$/.test(puzzleString))
            return { error: "Invalid characters in puzzle" };
        else if (puzzleString.length !== 81)
            return { error: "Expected puzzle to be 81 characters long" };
        return "Puzzle string is valid";
    }

    findRows(puzzleString) {
        return puzzleString.match(/.{1,9}/g);
    }

    checkRowPlacement(puzzleString, row, column, value) {
        let rows = this.findRows(puzzleString);
        if (rows[row].includes(value))
            return "error: row already includes value";
        return "Row placement is valid";
    }

    checkColPlacement(puzzleString, row, column, value) {
        for (let i = column; i < puzzleString.length; i += 9)
            if (puzzleString[i] == value)
                return "error: column already includes value";
        return "Column placement is valid";
    }

    checkRegionPlacement(puzzleString, row, column, value) {
        const BOUNDS = { 0: 0, 1: 0, 2: 0, 3: 3, 4: 3, 5: 3, 6: 6, 7: 6, 8: 6 };
        let rows = this.findRows(puzzleString),
            rowStart = BOUNDS[row],
            colStart = BOUNDS[column];

        for (let i = rowStart; i < rowStart + 3; i++)
            for (let j = colStart; j < colStart + 3; j++)
                if (rows[i][j] == value)
                    return "error: region already includes value";
        return "Region placement is valid";
    }

    solve(puzzleString) {
        if (this.validate(puzzleString) !== "Puzzle string is valid")
            return this.validate(puzzleString);

        let rows = this.findRows(puzzleString);

        for (let i = 0; i < rows.length; i++) {
            rows[i] = rows[i].split("");
            for (let j = 0; j < rows[i].length; j++) {
                if (rows[i][j] == ".") {
                    let choices = [];
                    for (let k = 1; k <= 9; k++) {
                        if (
                            this.checkRowPlacement(puzzleString, i, j, k) ==
                                "Row placement is valid" &&
                            this.checkColPlacement(puzzleString, i, j, k) ==
                                "Column placement is valid" &&
                            this.checkRegionPlacement(puzzleString, i, j, k) ==
                                "Region placement is valid"
                        )
                            choices.push(k);
                    }
                    if (choices.length == 1) rows[i][j] = choices[0];
                    else if (choices.length == 0)
                        return { error: "Puzzle cannot be solved" };
                }
            }
            rows[i] = rows[i].join("");
        }

        if (/[.]/.test(rows.join(""))) return this.solve(rows.join(""));
        return { solution: rows.join("") };
    }
}

module.exports = SudokuSolver;
