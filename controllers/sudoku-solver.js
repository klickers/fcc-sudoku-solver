class SudokuSolver {
    validate(puzzleString) {
        if (!/^[\d.]+$/.test(puzzleString))
            return "error: puzzle string contains invalid characters";
        if (puzzleString.length !== 81)
            return "error: puzzle string is not 81 characters long";
        return "Puzzle string is valid";
    }

    checkRowPlacement(puzzleString, row, column, value) {
        let rows = puzzleString.match(/.{1,9}/g);
        if (rows[row].includes(value))
            return "error: row already includes value";
        return "Row placement is valid";
    }

    checkColPlacement(puzzleString, row, column, value) {}

    checkRegionPlacement(puzzleString, row, column, value) {}

    solve(puzzleString) {}
}

module.exports = SudokuSolver;
